<template>
    <v-container
        fluid
        class="pa-0"
    >
        <v-row
            no-gutters
            style="background-color: #ef9a9a"
        >
            <!-- red lighten-3 -->
            <v-col
                v-if="zaehlung.sonderzaehlung"
                cols="12"
                lg="1"
                align-self="center"
                :class="isLarge ? '' : 'px-1'"
            >
                <sonderzaehlung-icon :large="isLarge" />
            </v-col>

            <v-col
                cols="12"
                :lg="getMaxCols"
            >
                <!-- Informationen über die ausgewählte Zählung -->
                <v-sheet
                    width="100%"
                    height="72"
                    color="white"
                    class="px-4 py-2 primary--text font-weight-regular"
                >
                    <v-row
                        class="pa-0 ma-0"
                        no-gutters
                    >
                        <v-col
                            cols="12"
                            lg="8"
                        >
                            <v-row no-gutters
                                ><span class="pb-0 text-truncate"
                                    >{{ $d(datum, "short", "de-DE") }} |
                                    {{ zaehlung.projektName }}</span
                                >
                            </v-row>
                            <v-row
                                no-gutters
                                class="ma-0"
                            >
                                <zaehlart-icon
                                    :zaehlart="zaehlung.zaehlart"
                                    color="primary"
                                ></zaehlart-icon>
                                <wetter-icon
                                    :wetter="zaehlung.wetter"
                                    color="primary"
                                ></wetter-icon>
                                <zaehldauer-icon
                                    :zaehldauer="zaehlung.zaehldauer"
                                    color="primary"
                                ></zaehldauer-icon>
                                <quelle-icon
                                    :quelle="zaehlung.quelle"
                                    color="primary"
                                ></quelle-icon>
                                <kommentar-info
                                    :kommentar-zaehlstelle="
                                        kommentarZaehlstelle
                                    "
                                    :kommentar-zaehlung="zaehlung.kommentar"
                                    :zaehlsituation="zaehlung.zaehlsituation"
                                    :zaehlsituation-erweitert="
                                        zaehlung.zaehlsituationErweitert
                                    "
                                ></kommentar-info>
                            </v-row>
                        </v-col>
                        <v-col
                            lg
                            class="hidden-md-and-down"
                        >
                            <v-spacer></v-spacer>
                        </v-col>
                        <v-col
                            lg
                            class="hidden-md-and-down"
                        >
                            <zaehlung-geometrie
                                height="60"
                                width="60"
                                active-color="#1565C0"
                                passive-color="#EEEEEE"
                                :knotenarme="knotenarme"
                            ></zaehlung-geometrie>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <!-- Informationen über die aktuellen Filter Optionen -->
            <v-sheet
                width="100%"
                min-height="50"
                color="grey darken-1"
                class="px-4 py-3"
            >
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col>
                        <h3 class="grey--text text--lighten-1">
                            Aktuelle Filtereinstellungen
                        </h3>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col
                        cols="1"
                        align-self="start"
                    >
                        <v-icon
                            small
                            color="grey lighten-1"
                            >mdi-clock-time-four-outline</v-icon
                        >
                    </v-col>
                    <v-col cols="10">
                        <span class="grey--text text--lighten-1"
                            >Zeitauswahl:
                            <span class="font-weight-medium white--text">{{
                                zeitblock
                            }}</span>
                            in
                            <span class="font-weight-medium white--text">{{
                                zeitintervall
                            }}</span>
                            Intervallen</span
                        >
                    </v-col>
                </v-row>
                <v-row
                    v-if="
                        isSpitzenstundeInZeitauswahlChosen &&
                        showSpitzenstundeInfo
                    "
                    no-gutters
                >
                    <v-col
                        cols="1"
                        align-self="start"
                    >
                        <v-icon
                            small
                            color="grey lighten-1"
                            >mdi-summit</v-icon
                        >
                    </v-col>
                    <v-col cols="10">
                        <span class="grey--text text--lighten-1"
                            >{{ options.zeitauswahl }}:
                            <span class="font-weight-medium white--text">
                                {{ startUhrzeitIntervalls }} -
                                {{ endeUhrzeitIntervalls }} Uhr
                            </span>
                        </span>
                    </v-col>
                </v-row>
                <v-row
                    v-for="(k, index) in sortedKnotenarme"
                    :key="k.nummer"
                    no-gutters
                    class="ma-0"
                >
                    <v-col cols="1">
                        <v-icon
                            v-if="index === 0"
                            small
                            color="grey lighten-1"
                            >mdi-arrow-decision</v-icon
                        >
                    </v-col>
                    <v-col cols="9">
                        <!-- Wird angezeigt in Viewport Größe lg und darüber -->
                        <span
                            v-if="options.vonIds.includes(k.nummer)"
                            class="text-caption font-weight-medium white--text hidden-md-and-down"
                            >von
                        </span>
                        <span
                            v-if="options.nachIds.includes(k.nummer)"
                            class="text-caption font-weight-medium white--text hidden-md-and-down"
                            >nach
                        </span>
                        <!-- Wird angezeigt in Viewport Größe md und drunter -->
                        <span
                            v-if="options.vonIds.includes(k.nummer)"
                            class="text-caption font-weight-medium white--text hidden-lg-and-up"
                            >v
                        </span>
                        <span
                            v-if="options.nachIds.includes(k.nummer)"
                            class="text-caption font-weight-medium white--text hidden-lg-and-up"
                            >n
                        </span>
                        <span class="text-caption grey--text text--lighten-1"
                            >{{ k.nummer }} {{ k.strassenname }}</span
                        >
                    </v-col>
                    <v-col cols="2">
                        <span
                            class="text-caption grey--text text--lighten-1 hidden-xl-only"
                            >[ {{ himmelsRichtungen.get(k.nummer).s }} ]</span
                        >
                        <span
                            class="text-caption grey--text text--lighten-1 hidden-lg-and-down"
                            >[ {{ himmelsRichtungen.get(k.nummer).l }} ]</span
                        >
                    </v-col>
                </v-row>
                <v-row
                    no-gutters
                    class="mt-2"
                >
                    <v-col cols="1"></v-col>
                    <v-col>
                        <optionsmenue :zaehlung="zaehlung"></optionsmenue>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

// Komponenten
import WetterIcon from "@/components/zaehlstelle/icons/WetterIcon.vue";
import QuelleIcon from "@/components/zaehlstelle/icons/QuelleIcon.vue";
import ZaehldauerIcon from "@/components/zaehlstelle/icons/ZaehldauerIcon.vue";
import ZaehlartIcon from "@/components/zaehlstelle/icons/ZaehlartIcon.vue";
import KommentarInfo from "@/components/zaehlstelle/KommentarInfo.vue";
import ZaehlungGeometrie from "@/components/zaehlstelle/ZaehlungGeometrie.vue";
import Optionsmenue from "@/components/zaehlstelle/optionsmenue/Optionsmenue.vue";

// Typen
/* eslint-disable no-unused-vars */
import LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";
import { ZaehldatenIntervallToBeschreibung } from "@/types/enum/ZaehldatenIntervall";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import { StartEndeUhrzeitIntervalls } from "@/store/modules/zaehlung";
/* eslint-enable no-unused-vars */
// Util
import _ from "lodash";
import SonderzaehlungIcon from "@/components/zaehlstelle/icons/SonderzaehlungIcon.vue";

@Component({
    components: {
        SonderzaehlungIcon,
        WetterIcon,
        QuelleIcon,
        ZaehldauerIcon,
        ZaehlartIcon,
        KommentarInfo,
        ZaehlungGeometrie,
        Optionsmenue,
    },
})
export default class ZaehlungInfo extends Vue {
    filter = false;

    private showSpitzenstundeInfo = false;

    private startUhrzeitIntervalls = "";

    private endeUhrzeitIntervalls = "";

    @Prop({ default: "" }) kommentarZaehlstelle?: string;

    /**
     * Setzt die Start- und Endeuhrzeit des ersten und letzten Zeitintervalls
     * damit diese für die Spitzenstunde angezeigt werden kann.
     */
    @Watch("startEndeUhrzeitIntervalls", { immediate: true })
    showStartEndeUhrzeit(
        startEndeUhrzeitIntervalle: StartEndeUhrzeitIntervalls
    ) {
        this.startUhrzeitIntervalls =
            startEndeUhrzeitIntervalle.startUhrzeitIntervalls;
        this.endeUhrzeitIntervalls =
            startEndeUhrzeitIntervalle.endeUhrzeitIntervalls;
        this.showSpitzenstundeInfo = !(
            _.isEmpty(this.startUhrzeitIntervalls) ||
            _.isEmpty(this.endeUhrzeitIntervalls)
        );
    }

    /**
     * es muss für i18n ein Datumsobjekt erzeugt werden.
     */
    get datum(): Date {
        const d = this.zaehlung.datum;
        if (Date.parse(d)) {
            return new Date(d);
        }
        return new Date();
    }

    get zaehlung(): LadeZaehlungDTO {
        return this.$store.getters.getAktiveZaehlung;
    }

    get knotenarme(): LadeKnotenarmDTO[] | undefined {
        return this.$store.getters.getKnotenarme;
    }

    /**
     * Holt die sortierten Knotenarme aus dem Store.
     */
    get sortedKnotenarme(): LadeKnotenarmDTO[] | undefined {
        return this.$store.getters.getSortedKnotenarme;
    }

    /**
     * Die aktuell eingestellten Optionen werden aus dem Store geladen.
     */
    get options(): OptionsDTO {
        return this.$store.getters.getFilteroptions;
    }

    /**
     * Holt die lesbare Schreibweise für einen Zeitblock.
     */
    get zeitblock(): string | undefined {
        // Wenn es sich um keine 24h Zählung handelt, dann darf nicht der Zeitblock 0 - 24 Uhr angezeigt werden, sondern Tageswert
        if (
            this.zaehlung.zaehldauer !== Zaehldauer.DAUER_24_STUNDEN &&
            this.options.zeitblock === Zeitblock.ZB_00_24
        ) {
            return "Tageswert";
        }

        // Wurde ein stündlicher Zeitblock ausgewählt?
        if (zeitblockStuendlichInfo.has(this.options.zeitblock)) {
            return zeitblockStuendlichInfo.get(this.options.zeitblock)?.text;
        }

        // Wurde ein anderer Zeitblock ausgewählt
        if (zeitblockInfo.has(this.options.zeitblock)) {
            return zeitblockInfo.get(this.options.zeitblock)?.text;
        }

        // als Default wird der 24h Zeitblock zurück und eine Warnung aus gegeben
        console.warn(
            "Es wurde in den Optionen kein passender Zeitblock gefunden."
        );
        return zeitblockInfo.get(Zeitblock.ZB_00_24)?.text;
    }

    /**
     * Holt die lesbare Schreibweise für das Zeitintervall.
     */
    get zeitintervall(): string | undefined {
        return ZaehldatenIntervallToBeschreibung.get(this.options.intervall);
    }

    /**
     * Gibt die Himmelsrichtungen als Map zurück.
     */
    get himmelsRichtungen(): Map<number, any> {
        return new Map([
            [1, { l: "Nord", s: "N" }],
            [2, { l: "Ost", s: "O" }],
            [3, { l: "Süd", s: "S" }],
            [4, { l: "West", s: "W" }],
            [5, { l: "Nord-Ost", s: "NO" }],
            [6, { l: "Süd-Ost", s: "SO" }],
            [7, { l: "Süd-West", s: "SW" }],
            [8, { l: "Nord-West", s: "NW" }],
        ]);
    }

    get isSpitzenstundeInZeitauswahlChosen(): boolean {
        return (
            this.options.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ ||
            this.options.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
            this.options.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
        );
    }

    get startEndeUhrzeitIntervalls(): StartEndeUhrzeitIntervalls {
        return this.$store.getters.getStartEndeUhrzeitIntervalls;
    }

    get isLarge(): boolean {
        return this.$vuetify.breakpoint.name === "xl";
    }

    get getMaxCols(): number {
        return this.zaehlung.sonderzaehlung ? 11 : 12;
    }
}
</script>