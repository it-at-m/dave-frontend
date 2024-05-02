<template>
    <v-container
        fluid
        class="pa-0"
    >
        <v-row no-gutters>
            <v-col cols="3">
                <v-sheet
                    :min-height="leftHeightVh"
                    width="100%"
                    color="grey lighten-3"
                    class="d-flex flex-column"
                >
                    <!-- Basisinformation zur Zählstelle -->
                    <zaehlstelle-info
                        :height="headerHeightVh"
                        :minheight="headerHeightVh"
                        :nummer="zaehlstelle.nummer"
                        :kreuzungsname="kreuzungsname"
                        :stadtbezirk-nummer="`${zaehlstelle.stadtbezirkNummer}`"
                        :stadtbezirk="zaehlstelle.stadtbezirk"
                    ></zaehlstelle-info>
                    <!-- Information zur aktiven Zählung -->
                    <zaehlung-info
                        v-show="hasZaehlungen"
                        :kommentar-zaehlstelle="zaehlstelle.kommentar"
                    ></zaehlung-info>
                    <!-- Liste der nicht aktiven Zählungen, die zur Zählstelle gehören -->
                    <zaehlungen-timeline
                        v-show="hasZaehlungen"
                        :external-query="externalQuery"
                        :listheight="timelineHeightVh"
                    ></zaehlungen-timeline>
                </v-sheet>
            </v-col>
            <v-col cols="9">
                <zaehlstelle-map
                    :z-id="zaehlstelleId"
                    :latlng="latlng"
                    :zoom="17"
                    :height="headerHeightVh"
                    :minheight="headerHeightVh"
                    show-marker="true"
                    width="100%"
                    @zeahlart-ausgewaehlt="setZaehlart($event)"
                />
                <!-- Die Diagramme -->
                <zaehldaten-diagramme
                    :height="rightHeightVh"
                    :content-height="rightContentHeightVh"
                    :has-zaehlungen="hasZaehlungen"
                ></zaehldaten-diagramme>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// Komponenten
import ZaehlstelleInfo from "@/components/zaehlstelle/ZaehlstelleInfo.vue";
import ZaehlstelleMap from "@/components/map/ZaehlstelleMap.vue";
import ZaehlungInfo from "@/components/zaehlstelle/ZaehlungInfo.vue";
import ZaehldatenDiagramme from "@/components/zaehlstelle/ZaehldatenDiagramme.vue";
import ZaehlungenTimeline from "@/components/zaehlstelle/ZaehlungenTimeline.vue";

// Typen
/* eslint-disable no-unused-vars */
import ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
/* eslint-enable no-unused-vars */
// API Services
import ZaehlstellenService from "@/api/service/ZaehlstellenService";

@Component({
    components: {
        ZaehlstelleInfo,
        ZaehlstelleMap,
        ZaehlungInfo,
        ZaehldatenDiagramme,
        ZaehlungenTimeline,
    },
})
export default class ZaehlstelleView extends Vue {
    // Die Basisinformationen zur Zählstelle
    zaehlstelle: ZaehlstelleHeaderDTO = {} as ZaehlstelleHeaderDTO;
    // Prüfvariable, ob Zählungen vorhandern sind
    hasZaehlungen = true;

    externalQuery = "";

    /**
     * Die Daten zur Zählstelle und der ausgewählten Zählung wird über die
     * API geladen.
     */
    created() {
        // ID der Zählstelle aus der URL holen (oder Warnung ausgeben, falls keine vorhanden ist)
        const zaehlstelleId = this.$route.params.zaehlstelleId;

        // Die Informationen zur Zählstelle werden geladen
        ZaehlstellenService.getById(zaehlstelleId).then((zaehlstelle) => {
            const zaehlungen = new Array<LadeZaehlungDTO>();
            Object.assign(zaehlungen, zaehlstelle.zaehlungen);
            // Die Zählungen und id der aktiven Zählung werden an den Store übergeben.
            // Dort werden die Daten weiter verarbeitet.
            if (this.$store.getters["user/hasAuthorities"]) {
                this.$store.dispatch("setZaehlungen", {
                    zs: zaehlungen,
                    id: this.$route.params.zaehlungId,
                    isAnwender: this.$store.getters["user/isAnwender"],
                });
            } else {
                this.$store.dispatch("setZaehlungen", {
                    zs: zaehlungen,
                    id: this.$route.params.zaehlungId,
                    isAnwender: false,
                });
            }
            this.$store.commit("setZaehlstelle", zaehlstelle);
            this.zaehlstelle = zaehlstelle;
            // Prüft, ob die Zählstelle Zählungen hat. Falls nicht, werden auch keine
            // Diagramme angezeigt.
            if (zaehlungen.length === 0) {
                this.hasZaehlungen = false;
            }
            // die Zählungsoptionen werden zurück gesetzt
            if (!this.$store.getters.isHistory) {
                this.$store.dispatch("resetFilteroptions");
            }
        });
    }

    get zaehlstelleId() {
        const zaehlstelleId: string = this.$route.params.zaehlstelleId;
        if (!zaehlstelleId) {
            return "";
        }
        return zaehlstelleId;
    }

    get kreuzungsname(): string {
        let kreuzungsname = "";
        let aktiveZaehlung: LadeZaehlungDTO =
            this.$store.getters.getAktiveZaehlung;
        if (aktiveZaehlung) {
            kreuzungsname = aktiveZaehlung.kreuzungsname;
        }
        return kreuzungsname;
    }

    /**
     * Erzeugt aus dem übergebenen Punkt ein Array aus lat und lon.
     */
    get latlng(): string[] {
        if (this.zaehlstelle.lat && this.zaehlstelle.lng) {
            return [this.zaehlstelle.lat, this.zaehlstelle.lng];
        }
        return [];
    }

    // =============
    // Höhenberechnungen
    // =============

    /**
     * Berechnet die Höhe der AppBar (65px) in "vh" (Höhe Viewport in Hundert)
     */
    get appBarHeight(): number {
        return 65 / (this.$vuetify.breakpoint.height / 100);
    }

    /**
     * Berechnet die Höhe des Headers (fix 160px) in "vh" (Höhe Viewport in Hundert)
     */
    get headerHeight(): number {
        return 160 / (this.$vuetify.breakpoint.height / 100);
    }

    /**
     * Berechnet die Höhe des Info Containers für die aktive Zählung. Die Höhe dieses
     * Fensters ist abhängig von der Anzahl der Knotenarme
     *
     * - Die Überschrift ist 72px hoch.
     * - Jeder Knotenarm ist 24px hoch.
     * - Der Container für die Optionseinstellungen ist leer 144px hoch.
     *
     * Beispiel mit 5 Knotenarmen:
     * (72px + 160px + 5*24px) / (breakpoint.height / 100)
     */
    get zInfoHeight(): number {
        const z = this.$store.getters.getAktiveZaehlung as LadeZaehlungDTO;
        let anzahlKnotenarme = 0;
        if (z.knotenarme) {
            anzahlKnotenarme = z.knotenarme.length;
        }
        return (
            (72 + 144 + anzahlKnotenarme * 24) /
            (this.$vuetify.breakpoint.height / 100)
        );
    }

    /**
     * Die Liste der nicht aktiven Zählungen bekommt den Platz, der auf dem Bildschirm noch übrig ist. Entsprechend
     * werden zur Berechnung von 100 (volle Höhe) die Werte der Container abgezogen, die über der Timeline platziert
     * sind.
     *
     * Da die Scrollbar nur in der Liste der Zählungen angezeigt wird, muss noch die Höhe des Suchfeldes (56px) in
     * VH umgerechnet und abgezogen werden.
     */
    get timelineHeight(): number {
        return (
            100 -
            this.appBarHeight -
            this.headerHeight -
            this.zInfoHeight -
            56 / (this.$vuetify.breakpoint.height / 100)
        );
    }

    // ===================
    // Ab hier werden dann die VH Werte als String zurück gegeben
    // ===================

    /**
     * Wandelt die Header Höhe in VH um.
     */
    get headerHeightVh(): string {
        return this.headerHeight + "vh";
    }

    /**
     * Berechnet die Höhe der linken Spalte in "vh"
     */
    get leftHeightVh(): string {
        return 100 - this.appBarHeight + "vh";
    }

    /**
     * Berechnet die Höhe der Inhaltsfläche "vh" - ohne Karte
     */
    get rightHeightVh(): string {
        return 100 - this.headerHeight - this.appBarHeight + "vh";
    }

    /**
     * Berechnet die Höhe der Fläche unter den Tabs (72px hoch) in "vh"
     */
    get rightContentHeightVh(): string {
        const h =
            100 -
            this.headerHeight -
            this.appBarHeight -
            72 / (this.$vuetify.breakpoint.height / 100);
        return h + "vh";
    }

    /**
     * Gibt die Höhe der Timeline als vh Wert zurück.
     */
    get timelineHeightVh(): string {
        return this.timelineHeight + "vh";
    }

    /**
     * Hier kommt das Event an, wenn jemand in der Karte eine bestimmte Zählart klickt
     */
    setZaehlart(zaehlart: string) {
        this.externalQuery = zaehlart;
    }
}
</script>