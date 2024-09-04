<template>
  <v-main class="dave-default">
    <zaehlstelle-map
      ref="map"
      height="100%"
      width="100%"
      :zoom="12"
    />

    <v-speed-dial
      v-model="speedDialOpen"
      location="top"
      open-on-hover
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          key="speedDial"
          :color="speedDialColor"
          :icon="speedDialOpen ? 'mdi-close-thick' : 'mdi-plus-thick'"
          size="large"
          elevation="6"
          location="bottom end"
          position="absolute"
          class="mr-4 mb-4"
          style="z-index: 400"
          :data-x="activatorProps"
          :loading="creatingPicture || printingSearchResult"
        />
      </template>
      <v-btn
        key="printSearchResult"
        v-tooltip:start="'Suchergebnis als CSV herunterladen'"
        icon="mdi-file-delimited"
        color="secondary"
        size="small"
        @click="printSearchResult"
      />
      <v-btn
        key="takePicture"
        v-tooltip:start="'Karte dem PDF Report hinzufügen'"
        icon="mdi-camera"
        color="secondary"
        size="small"
        @click="takePicture"
      />
    </v-speed-dial>
  </v-main>
</template>

<script lang="ts" setup>
import type AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";
import type MessstelleKarteDTO from "@/types/karte/MessstelleKarteDTO";
import type TooltipMessstelleDTO from "@/types/karte/TooltipMessstelleDTO";
import type TooltipZaehlstelleDTO from "@/types/karte/TooltipZaehlstelleDTO";
import type ZaehlstelleKarteDTO from "@/types/karte/ZaehlstelleKarteDTO";

import domtoimage from "dom-to-image-more";
import { computed, onMounted, ref } from "vue";

import ZaehlstelleMap from "@/components/map/ZaehlstelleMap.vue";
import { usePdfReportStore } from "@/store/PdfReportStore";
import { useSearchStore } from "@/store/SearchStore";
import { messstelleStatusText } from "@/types/enum/MessstelleStatus";
import ImageAsset from "@/types/pdfreport/assets/ImageAsset";
import { useDownloadUtils } from "@/util/DownloadUtils";

const pdfReportStore = usePdfReportStore();
const searchStore = useSearchStore();
const downloadUtils = useDownloadUtils();
const map = ref<InstanceType<typeof ZaehlstelleMap> | null>();
const speedDialOpen = ref(false);
const creatingPicture = ref(false);
const printingSearchResult = ref(false);

onMounted(() => {
  window.scrollTo(0, 0);
});

function takePicture() {
  if (map.value != null) {
    creatingPicture.value = true;
    domtoimage
      .toJpeg(map.value.$el, { quality: 0.95, cacheBust: true })
      .then((dataUrl: string) => {
        const image = new ImageAsset("Hauptkarte", dataUrl);
        image.width = 100;
        pdfReportStore.addAsset(image);
      })
      .finally(() => {
        creatingPicture.value = false;
      });
  }
}

/**
 * Erzeugt aus dem Suchergebnis eine CSV-Datei und
 * bietet diese als Download an
 */
function printSearchResult(): void {
  printingSearchResult.value = true;
  const searchResult: Array<AnzeigeKarteDTO> = getSearchResult.value;
  const searchQuery: string = getSearchQuery.value;

  const zaehlstellenResult = searchResult.filter(
    (value: AnzeigeKarteDTO) => value.type === "zaehlstelle"
  ) as Array<ZaehlstelleKarteDTO>;

  const messstellenResult = searchResult.filter(
    (value: AnzeigeKarteDTO) => value.type === "messstelle"
  ) as Array<MessstelleKarteDTO>;

  if (zaehlstellenResult.length > 0) {
    printZaehlstellenOfSearchResult(zaehlstellenResult, searchQuery);
  }
  if (messstellenResult.length > 0) {
    printMessstellenOfSearchResult(messstellenResult, searchQuery);
  }

  printingSearchResult.value = false;
}

function printMessstellenOfSearchResult(
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
  downloadUtils.downloadCsv(searchResultAsCsvString.join("\n"), filename);
}

function printZaehlstellenOfSearchResult(
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
  downloadUtils.downloadCsv(searchResultAsCsvString.join("\n"), filename);
}

const getSearchQuery = computed(() => {
  return searchStore.getLastSearchQuery;
});

const getSearchResult = computed(() => {
  return searchStore.getSearchResult;
});

const speedDialColor = computed(() => {
  return speedDialOpen.value ? "grey-darken-1" : "secondary";
});
</script>
