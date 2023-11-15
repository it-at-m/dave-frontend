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
import TooltipDTO from "@/types/TooltipDTO";
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
            .catch((error: any) => {
                console.warn(error);
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
        const searchResult: Array<ZaehlstelleKarteDTO> = this.getSearchResult;
        const searchQuery: string = this.getSearchQuery;
        let filenamePrefix = "Alle_Zaehlstellen";
        if (searchQuery && searchQuery.trim() !== "") {
            filenamePrefix = searchQuery.replace(/\s/g, "_");
        }

        const searchResultAsCsvString: Array<string> = [];
        // Suchbegriff hinzufügen
        searchResultAsCsvString.push(`Suchbegriff: ${searchQuery}`);
        // Headerzeile hinzufügen
        searchResultAsCsvString.push(
            "Zählstellennummer;Längengrad;Breitengrad;Stadtbezirksnummer;Stadtbezirk;Kreuzungsname;Anzahl der Zählungen;Datum der letzten Zählung"
        );

        // Baut für jede Zählstelle auf der karte eine eigene Zeile in der CSV zusammen
        searchResult.forEach((element: ZaehlstelleKarteDTO) => {
            const tooltip: TooltipDTO = element.tooltip;
            const elementAsCsvString: Array<string> = [];
            elementAsCsvString.push(tooltip.zaehlstellennnummer);
            elementAsCsvString.push(element.longitude);
            elementAsCsvString.push(element.latitude);
            elementAsCsvString.push(`${tooltip.stadtbezirknummer}`);
            elementAsCsvString.push(tooltip.stadtbezirk);
            elementAsCsvString.push(tooltip.kreuzungsname);
            elementAsCsvString.push(`${tooltip.anzahlZaehlungen}`);
            elementAsCsvString.push(tooltip.datumLetzteZaehlung);
            searchResultAsCsvString.push(elementAsCsvString.join(";"));
        });

        let csvContent =
            "data:text/csv;charset=utf-8," + searchResultAsCsvString.join("\n");

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${filenamePrefix}_Suchergebnis.csv`);
        document.body.appendChild(link); // Required for FF

        link.click();
        this.printingSearchResult = false;
    }

    get getSearchResult(): ZaehlstelleKarteDTO[] {
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