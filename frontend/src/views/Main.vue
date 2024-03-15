<template>
    <v-sheet
        height="100%"
        width="100%"
    >
        <zaehlstelle-map
            ref="map"
            height="100%"
            width="100%"
            show-marker="true"
            :zoom="12"
        />

        <v-speed-dial
            v-model="fab"
            absolute
            bottom
            right
            open-on-hover
        >
            <template #activator>
                <v-btn
                    v-model="fab"
                    dark
                    fab
                    :color="fabColor"
                    :loading="creatingPicture || printingSearchResult"
                >
                    <v-icon v-if="fab"> mdi-close-thick </v-icon>
                    <v-icon v-else> mdi-plus-thick </v-icon>
                </v-btn>
            </template>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        fab
                        dark
                        small
                        color="secondary"
                        v-bind="attrs"
                        @click="printSearchResult"
                        v-on="on"
                    >
                        <v-icon>mdi-file-delimited</v-icon>
                    </v-btn>
                </template>
                <span>Suchergebnis als CSV herunterladen</span>
            </v-tooltip>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        fab
                        dark
                        small
                        color="secondary"
                        v-bind="attrs"
                        @click="takePicture"
                        v-on="on"
                    >
                        <v-icon>mdi-camera</v-icon>
                    </v-btn>
                </template>
                <span>Karte dem PDF Report hinzufügen</span>
            </v-tooltip>
        </v-speed-dial>
    </v-sheet>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import ZaehlstelleMap from "@/components/map/ZaehlstelleMap.vue";

import domtoimage from "dom-to-image-more";
import ImageAsset from "@/types/pdfreport/assets/ImageAsset";
/* eslint-disable no-unused-vars */
import ZaehlstelleKarteDTO from "@/types/zaehlstelle/ZaehlstelleKarteDTO";
import TooltipZaehlstelleDTO from "@/types/TooltipZaehlstelleDTO";
import AnzeigeKarteDTO from "@/types/AnzeigeKarteDTO";
import MessstelleKarteDTO from "@/types/MessstelleKarteDTO";
import TooltipMessstelleDTO from "@/types/TooltipMessstelleDTO";
import { messstelleStatusText } from "@/types/enum/MessstelleStatus";
import DaveUtils from "@/util/DaveUtils";
/* eslint-enable no-unused-vars */

@Component({
    components: { ZaehlstelleMap },
})
export default class App extends Vue {
    @Ref("map") readonly map!: any;

    fab = false;
    creatingPicture = false;
    printingSearchResult = false;

    mounted() {
        window.scrollTo(0, 0);
    }

    takePicture(): void {
        this.creatingPicture = true;

        domtoimage
            .toJpeg(this.map.$el, { quality: 0.95, cacheBust: true })
            .then((dataUrl: string) => {
                const image = new ImageAsset("Hauptkarte", dataUrl);
                image.width = 100;
                this.$store.dispatch("addAsset", image);
            })
            .finally(() => {
                this.creatingPicture = false;
            });
    }

    /**
     * Erzeugt aus dem Suchergebnis eine CSV-Datei und
     * bietet diese als Download an
     */
    printSearchResult(): void {
        this.printingSearchResult = true;
        const searchResult: Array<AnzeigeKarteDTO> = this.getSearchResult;
        const searchQuery: string = this.getSearchQuery;

        const zaehlstellenResult = searchResult.filter(
            (value: AnzeigeKarteDTO) => value.type === "zaehlstelle"
        ) as Array<ZaehlstelleKarteDTO>;

        const messstellenResult = searchResult.filter(
            (value: AnzeigeKarteDTO) => value.type === "messstelle"
        ) as Array<MessstelleKarteDTO>;

        if (zaehlstellenResult.length > 0) {
            this.printZaehlstellenOfSearchResult(
                zaehlstellenResult,
                searchQuery
            );
        }
        if (messstellenResult.length > 0) {
            this.printMessstellenOfSearchResult(messstellenResult, searchQuery);
        }

        this.printingSearchResult = false;
    }

    printZaehlstellenOfSearchResult(
        searchResult: Array<ZaehlstelleKarteDTO>,
        searchQuery: string
    ): void {
        let filenamePrefix = "Alle_Zaehlstellen";
        if (searchQuery && searchQuery.trim() !== "") {
            filenamePrefix = `Zaehlstellen_${searchQuery.replace(/\s/g, "_")}`;
        }
        const filename = `${filenamePrefix}_Suchergebnis.csv`;

        const searchResultAsCsvString: Array<string> = [];
        // Suchbegriff hinzufügen
        searchResultAsCsvString.push(`Suchbegriff: ${searchQuery}`);
        // Headerzeile hinzufügen
        searchResultAsCsvString.push(
            "Zählstellennummer;Längengrad;Breitengrad;Stadtbezirksnummer;Stadtbezirk;Kreuzungsname;Anzahl der Zählungen;Datum der letzten Zählung"
        );

        // Baut für jede Zählstelle auf der karte eine eigene Zeile in der CSV zusammen
        searchResult.forEach((element: ZaehlstelleKarteDTO) => {
            const tooltip: TooltipZaehlstelleDTO = element.tooltip;
            const elementAsCsvString: Array<string> = [];
            elementAsCsvString.push(tooltip.zaehlstellennnummer);
            elementAsCsvString.push(element.longitude.toString());
            elementAsCsvString.push(element.latitude.toString());
            elementAsCsvString.push(`${tooltip.stadtbezirknummer}`);
            elementAsCsvString.push(tooltip.stadtbezirk);
            elementAsCsvString.push(tooltip.kreuzungsname);
            elementAsCsvString.push(`${tooltip.anzahlZaehlungen}`);
            elementAsCsvString.push(tooltip.datumLetzteZaehlung);
            searchResultAsCsvString.push(elementAsCsvString.join(";"));
        });
        DaveUtils.downloadCsv(searchResultAsCsvString.join("\n"), filename);
    }

    printMessstellenOfSearchResult(
        searchResult: Array<MessstelleKarteDTO>,
        searchQuery: string
    ): void {
        let filenamePrefix = "Alle_Messstellen";
        if (searchQuery && searchQuery.trim() !== "") {
            filenamePrefix = `Messstellen_${searchQuery.replace(/\s/g, "_")}`;
        }
        const filename = `${filenamePrefix}_Suchergebnis.csv`;

        const searchResultAsCsvString: Array<string> = [];
        // Suchbegriff hinzufügen
        searchResultAsCsvString.push(`Suchbegriff: ${searchQuery}`);
        // Headerzeile hinzufügen
        searchResultAsCsvString.push(
            "ID Messstelle;Längengrad;Breitengrad;Stadtbezirksnummer;Stadtbezirk;Standort MS;Status;Datum Aufbau;Datum Abbau;Letzter plausibler Messtag"
        );

        // Baut für jede Zählstelle auf der karte eine eigene Zeile in der CSV zusammen
        searchResult.forEach((element: MessstelleKarteDTO) => {
            const tooltip: TooltipMessstelleDTO = element.tooltip;
            const elementAsCsvString: Array<string> = [];
            elementAsCsvString.push(tooltip.mstId);
            elementAsCsvString.push(`${element.longitude}`);
            elementAsCsvString.push(`${element.latitude}`);
            elementAsCsvString.push(`${tooltip.stadtbezirknummer}`);
            elementAsCsvString.push(tooltip.stadtbezirk);
            elementAsCsvString.push(tooltip.standort);
            const statusAsText = messstelleStatusText.get(element.status);
            if (statusAsText) {
                elementAsCsvString.push(statusAsText);
            } else {
                elementAsCsvString.push(element.status);
            }
            elementAsCsvString.push(tooltip.realisierungsdatum);
            elementAsCsvString.push(tooltip.abbaudatum);
            elementAsCsvString.push(tooltip.datumLetztePlausibleMessung);
            searchResultAsCsvString.push(elementAsCsvString.join(";"));
        });
        DaveUtils.downloadCsv(searchResultAsCsvString.join("\n"), filename);
    }

    get getSearchResult(): AnzeigeKarteDTO[] {
        return this.$store.getters["search/result"];
    }

    get getSearchQuery(): string {
        return this.$store.getters["search/lastSearchQuery"];
    }

    get fabColor(): string {
        return this.fab ? "grey darken-1" : "secondary";
    }
}
</script>