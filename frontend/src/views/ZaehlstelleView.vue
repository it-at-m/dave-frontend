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

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

import ZaehlstelleInfo from "@/components/zaehlstelle/ZaehlstelleInfo.vue";
import ZaehlstelleMap from "@/components/map/ZaehlstelleMap.vue";
import ZaehlungInfo from "@/components/zaehlstelle/ZaehlungInfo.vue";
import ZaehldatenDiagramme from "@/components/zaehlstelle/ZaehldatenDiagramme.vue";
import ZaehlungenTimeline from "@/components/zaehlstelle/ZaehlungenTimeline.vue";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import ZaehlstellenService from "@/api/service/ZaehlstellenService";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { useStore } from "@/util/useStore";
import { useVuetify } from "@/util/useVuetify";
import { useRoute } from "vue-router/composables";

const zaehlstelle = ref(
    DefaultObjectCreator.createDefaultZaehlstelleHeaderDTO()
);

const hasZaehlungen = ref(true);
const externalQuery = ref("");
const store = useStore();
const vuetify = useVuetify();
const route = useRoute();

// =============
// Höhenberechnungen
// =============
/**
 * Berechnet die Höhe der AppBar (65px) in "vh" (Höhe Viewport in Hundert)
 */
const appBarHeight = computed(() => {
    return 65 / (vuetify.breakpoint.height / 100);
});

/**
 * Berechnet die Höhe des Headers (fix 160px) in "vh" (Höhe Viewport in Hundert)
 */
const headerHeight = computed(() => {
    return 160 / (vuetify.breakpoint.height / 100);
});

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
const zInfoHeight = computed(() => {
    const z = store.getters.getAktiveZaehlung as LadeZaehlungDTO;
    let anzahlKnotenarme = 0;
    if (z.knotenarme) {
        anzahlKnotenarme = z.knotenarme.length;
    }
    return (
        (72 + 144 + anzahlKnotenarme * 24) / (vuetify.breakpoint.height / 100)
    );
});

/**
 * Die Liste der nicht aktiven Zählungen bekommt den Platz, der auf dem Bildschirm noch übrig ist. Entsprechend
 * werden zur Berechnung von 100 (volle Höhe) die Werte der Container abgezogen, die über der Timeline platziert
 * sind.
 *
 * Da die Scrollbar nur in der Liste der Zählungen angezeigt wird, muss noch die Höhe des Suchfeldes (56px) in
 * VH umgerechnet und abgezogen werden.
 */
const timelineHeight = computed(() => {
    return (
        100 -
        appBarHeight.value -
        headerHeight.value -
        zInfoHeight.value -
        56 / (vuetify.breakpoint.height / 100)
    );
});

// ===================
// Ab hier werden dann die VH Werte als String zurück gegeben
// ===================
/**
 * Wandelt die Header Höhe in VH um.
 */
const headerHeightVh = computed(() => {
    return headerHeight.value + "vh";
});

/**
 * Berechnet die Höhe der linken Spalte in "vh"
 */
const leftHeightVh = computed(() => {
    return 100 - appBarHeight.value + "vh";
});

/**
 * Berechnet die Höhe der Inhaltsfläche "vh" - ohne Karte
 */
const rightHeightVh = computed(() => {
    return 100 - headerHeight.value - appBarHeight.value + "vh";
});

/**
 * Berechnet die Höhe der Fläche unter den Tabs (72px hoch) in "vh"
 */
const rightContentHeightVh = computed(() => {
    const h =
        100 -
        headerHeight.value -
        appBarHeight.value -
        72 / (vuetify.breakpoint.height / 100);

    return h + "vh";
});

/**
 * Gibt die Höhe der Timeline als vh Wert zurück.
 */
const timelineHeightVh = computed(() => {
    return timelineHeight.value + "vh";
});

/**
 * Die Daten zur Zählstelle und der ausgewählten Zählung wird über die
 * API geladen.
 */

onMounted(() => {
    // ID der Zählstelle aus der URL holen (oder Warnung ausgeben, falls keine vorhanden ist)
    const zaehlstelleId = route.params.zaehlstelleId;
    // Die Informationen zur Zählstelle werden geladen
    ZaehlstellenService.getById(zaehlstelleId).then((loadedZaehlstelle) => {
        const zaehlungen = new Array<LadeZaehlungDTO>();
        Object.assign(zaehlungen, loadedZaehlstelle.zaehlungen);
        // Die Zählungen und id der aktiven Zählung werden an den Store übergeben.
        // Dort werden die Daten weiter verarbeitet.
        if (store.getters) {
            store.dispatch("setZaehlungen", {
                zs: zaehlungen,
                id: route.params.zaehlungId,
                isAnwender: store.getters,
            });
        } else {
            store.dispatch("setZaehlungen", {
                zs: zaehlungen,
                id: route.params.zaehlungId,
                isAnwender: false,
            });
        }

        store.commit("setZaehlstelle", loadedZaehlstelle);
        zaehlstelle.value = loadedZaehlstelle;
        // Prüft, ob die Zählstelle Zählungen hat. Falls nicht, werden auch keine
        // Diagramme angezeigt.
        if (zaehlungen.length === 0) {
            hasZaehlungen.value = false;
        }
        // die Zählungsoptionen werden zurück gesetzt
        if (!store.getters.isHistory) {
            store.dispatch("resetFilteroptions");
        }
    });
});

const zaehlstelleId = computed(() => {
    const zaehlstelleId: string = route.params.zaehlstelleId;
    if (!zaehlstelleId) {
        return "";
    }
    return zaehlstelleId;
});

const kreuzungsname = computed(() => {
    let kreuzungsname = "";
    let aktiveZaehlung: LadeZaehlungDTO = store.getters.getAktiveZaehlung;
    if (aktiveZaehlung) {
        kreuzungsname = aktiveZaehlung.kreuzungsname;
    }

    return kreuzungsname;
});

/**
 * Hier kommt das Event an, wenn jemand in der Karte eine bestimmte Zählart klickt
 */
const setZaehlart = (zaehlart: string) => {
    externalQuery.value = zaehlart;
};

const latlng = computed(() => {
    if (zaehlstelle.value.lat && zaehlstelle.value.lng) {
        return [zaehlstelle.value.lat, zaehlstelle.value.lng];
    }
    return [];
});
</script>