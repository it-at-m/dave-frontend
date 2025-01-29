<template>
  <v-sheet
    ref="sheet"
    :min-height="height"
  >
    <v-tabs
      v-model="activeTab"
      fixed-tabs
      bg-color="grey-darken-1"
      slider-color="grey-lighten-1"
      stacked
      color="white"
      class="text-grey-lighten-1"
    >
      <!-- Kopfzeile -->
      <v-tab :value="TAB_BELASTUNGSPLAN">
        <v-icon icon="mdi-arrow-decision" />
        Belastungsplan
      </v-tab>
      <v-tab :value="TAB_GANGLINIE">
        <v-icon icon="mdi-chart-histogram" />
        Ganglinie
      </v-tab>
      <v-tab :value="TAB_LISTENAUSGABE">
        <v-icon icon="mdi-table" />
        Listenausgabe
      </v-tab>
      <v-tab :value="TAB_HEATMAP">
        <v-icon icon="mdi-chart-bubble" />
        Heatmap
      </v-tab>
    </v-tabs>
    <v-tabs-window
      v-model="activeTab"
      class="d-flex flex-column align-stretch"
      @update:model-value="changeTab"
    >
      <!-- Inhalte -->
      <v-tabs-window-item :value="TAB_BELASTUNGSPLAN">
        <v-sheet
          :max-height="contentHeight"
          width="100%"
          class="overflow-y-auto"
        >
          <banner-messtelle-tabs
            v-if="
              belastungsplanDataDTO.ladeBelastungsplanMessquerschnittDataDTOList
                .length === 0
            "
            :message="globalInfoMessage.NO_DATA_AVAILABLE"
          />
          <banner-messtelle-tabs
            v-else-if="!hasSelectedVerkehrsarten"
            :message="globalInfoMessage.NO_BELASTUNGSPLAN"
          />
          <belastungsplan-messquerschnitt-card
            v-else-if="
              belastungsplanDataDTO.ladeBelastungsplanMessquerschnittDataDTOList
            "
            ref="belastungsplanCard"
            :belastungsplan-data="belastungsplanDataDTO"
            :dimension="contentHeight"
            @print="storeSvg($event)"
          />
        </v-sheet>
      </v-tabs-window-item>
      <v-tabs-window-item :value="TAB_GANGLINIE">
        <v-sheet
          :min-height="contentHeight"
          :max-height="contentHeight"
          width="100%"
          class="overflow-y-auto"
        >
          <banner-messtelle-tabs
            v-if="isGreaterThanFiveYears"
            :message="globalInfoMessage.ZEITRAUM_GROESSER_FUENF_JAHRE"
          />
          <banner-messtelle-tabs
            v-else-if="zaehldatenSteplineDTO.xaxisDataFirstChart.length === 0"
            :message="globalInfoMessage.NO_DATA_AVAILABLE"
          />
          <step-line-card
            v-else
            ref="steplineCard"
            :zaehldaten-stepline="zaehldatenSteplineDTO"
          />
        </v-sheet>
        <progress-loader v-model="chartDataLoading" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="TAB_LISTENAUSGABE">
        <v-sheet
          :max-height="contentHeight"
          width="97%"
        >
          <banner-messtelle-tabs
            v-if="isGreaterThanFiveYears"
            :message="globalInfoMessage.ZEITRAUM_GROESSER_FUENF_JAHRE"
          />
          <banner-messtelle-tabs
            v-else-if="listenausgabeDTO.length === 0"
            :message="globalInfoMessage.NO_DATA_AVAILABLE"
          />
          <messwerte-listenausgabe
            v-else
            :listenausgabe-data="listenausgabeDTO"
            :height="contentHeight"
          />
        </v-sheet>
        <progress-loader v-model="chartDataLoading" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="TAB_HEATMAP">
        <v-sheet
          :max-height="contentHeight"
          width="100%"
          class="overflow-y-auto"
        >
          <banner-messtelle-tabs
            v-if="isGreaterThanFiveYears"
            :message="globalInfoMessage.ZEITRAUM_GROESSER_FUENF_JAHRE"
          />
          <banner-messtelle-tabs
            v-else-if="zaehldatenHeatmapDTO.xaxisDataFirstChart.length === 0"
            :message="globalInfoMessage.NO_DATA_AVAILABLE"
          />
          <heatmap-card
            v-else
            ref="heatmapCard"
            :zaehldaten-heatmap="zaehldatenHeatmapDTO"
          />
        </v-sheet>
        <progress-loader v-model="chartDataLoading" />
      </v-tabs-window-item>
    </v-tabs-window>

    <!-- Speed Dial alles außer Listenausgabe-->
    <speed-dial
      :is-listenausgabe="isTabListenausgabe"
      :is-not-heatmap="isNotTabHeatmap"
      :loading-file="loadingFile"
      @add-chart-to-pdf-report="addChartToPdfReport"
      @save-graph-as-image="saveGraphAsImage"
      @open-pdf-report-dialog="openPdfReportDialog"
      @generate-csv="generateCsv"
      @generate-pdf="generatePdf"
    />
    <pdf-report-menue-messstelle
      v-model="pdfReportDialog"
      @close="closePdfReportDialog"
    />
  </v-sheet>
</template>
<script setup lang="ts">
import type CsvDTO from "@/types/common/CsvDTO";
import type LadeProcessedMessdatenDTO from "@/types/messstelle/LadeProcessedMessdatenDTO";
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import type LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import type LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";

import _ from "lodash";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import GenerateCsvService from "@/api/service/GenerateCsvService";
import GeneratePdfService from "@/api/service/GeneratePdfService";
import LadeMessdatenService from "@/api/service/LadeMessdatenService";
import ProgressLoader from "@/components/common/ProgressLoader.vue";
import BannerMesstelleTabs from "@/components/messstelle/charts/BannerMesstelleTabs.vue";
import BelastungsplanMessquerschnittCard from "@/components/messstelle/charts/BelastungsplanMessquerschnittCard.vue";
import MesswerteListenausgabe from "@/components/messstelle/charts/MesswerteListenausgabe.vue";
import SpeedDial from "@/components/messstelle/charts/SpeedDial.vue";
import PdfReportMenueMessstelle from "@/components/messstelle/PdfReportMenueMessstelle.vue";
import HeatmapCard from "@/components/zaehlstelle/charts/HeatmapCard.vue";
import StepLineCard from "@/components/zaehlstelle/charts/StepLineCard.vue";
import { useHistoryStore } from "@/store/HistoryStore";
import { useMessstelleStore } from "@/store/MessstelleStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useUserStore } from "@/store/UserStore";
import Erhebungsstelle from "@/types/enum/Erhebungsstelle";
import MessstelleHistoryItem from "@/types/history/MessstelleHistoryItem";
import { useDateUtils } from "@/util/DateUtils";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { useDownloadUtils } from "@/util/DownloadUtils";
import { useGlobalInfoMessage } from "@/util/GlobalInfoMessage";
import { useMessstelleUtils } from "@/util/MessstelleUtils";
import { useReportTools } from "@/util/ReportTools";

// Refactoring: Synergieeffekt mit ZaehldatenDiagramme nutzen

interface Props {
  height?: string;
  contentHeight?: string;
}

withDefaults(defineProps<Props>(), {
  height: "100%",
});

const REQUEST_PART_CHART_AS_BASE64_PNG = "chartAsBase64Png";
const BELASTUNGSPLAN_PNG_DIMENSION = 1400;
const REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG =
  "schematischeUebersichtAsBase64Png";

const chartDataLoading = ref(false);

const zaehldatenSteplineDTO = ref<LadeZaehldatenSteplineDTO>(
  DefaultObjectCreator.createDefaultLadeZaehldatenSteplineDTO()
);

const zaehldatenHeatmapDTO = ref<LadeZaehldatenHeatmapDTO>(
  DefaultObjectCreator.createDefaultLadeZaehldatenHeatmapDTO()
);

const listenausgabeDTO = ref<Array<LadeZaehldatumDTO>>([]);

const belastungsplanDataDTO = ref(
  DefaultObjectCreator.createDefaultBelastungsplanMessquerschnitteDTO()
);

const pdfReportDialog = ref(false);

const activeTab = ref(0);

const loadingFile = ref(false);

const TAB_BELASTUNGSPLAN = 0;
const TAB_GANGLINIE = 1;
const TAB_LISTENAUSGABE = 2;
const TAB_HEATMAP = 3;

const belastungsplanCard = ref<typeof BelastungsplanMessquerschnittCard>();
const steplineCard = ref<InstanceType<typeof StepLineCard> | null>();
const heatmapCard = ref<InstanceType<typeof HeatmapCard> | null>();
const belastungsplanSvg = ref<Blob>();
const belastungsplanPngBase64 = ref("");

const messstelleStore = useMessstelleStore();
const messstelleUtils = useMessstelleUtils();
const userStore = useUserStore();
const snackbarStore = useSnackbarStore();
const historyStore = useHistoryStore();
const route = useRoute();
const reportTools = useReportTools();
const downloadUtils = useDownloadUtils();
const globalInfoMessage = useGlobalInfoMessage();
const dateUtils = useDateUtils();

const messstelleId = computed(() => {
  return route.params.messstelleId as string;
});

const options = computed<MessstelleOptionsDTO>(() => {
  return messstelleStore.getFilteroptions;
});

const hasSelectedVerkehrsarten = computed<boolean>(() => {
  return messstelleUtils.hasSelectedVerkehrsarten(options.value.fahrzeuge);
});

const isTabListenausgabe = computed<boolean>(() => {
  return TAB_LISTENAUSGABE === activeTab.value;
});
const isNotTabHeatmap = computed<boolean>(() => {
  return TAB_HEATMAP !== activeTab.value;
});

const isGreaterThanFiveYears = computed(() => {
  return dateUtils.isGreaterThanFiveYears(options.value.zeitraum);
});

watch(isGreaterThanFiveYears, () => {
  if (isGreaterThanFiveYears.value) {
    activeTab.value = TAB_BELASTUNGSPLAN;
  }
});

function changeTab() {
  messstelleStore.setActiveTab(activeTab.value);
}

watch(options, () => {
  loadProcessedChartData();
});
watch(belastungsplanSvg, () => {
  if (belastungsplanSvg.value) {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const dimension = BELASTUNGSPLAN_PNG_DIMENSION;
      canvas.width = dimension;
      canvas.height = dimension;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(image, 0, 0, dimension, dimension);
        // Image Asset erstellen und in Variable speichern
        belastungsplanPngBase64.value = canvas.toDataURL("image/jpg");
      }
    };
    image.src = URL.createObjectURL(belastungsplanSvg.value);
  }
});

function loadProcessedChartData() {
  chartDataLoading.value = true;
  LadeMessdatenService.ladeMessdatenProcessed(messstelleId.value, options.value)
    .then((processedZaehldaten: LadeProcessedMessdatenDTO) => {
      zaehldatenSteplineDTO.value = processedZaehldaten.zaehldatenStepline;
      zaehldatenHeatmapDTO.value = processedZaehldaten.zaehldatenHeatmap;
      listenausgabeDTO.value = processedZaehldaten.zaehldatenTable.zaehldaten;
      belastungsplanDataDTO.value =
        processedZaehldaten.belastungsplanMessquerschnitte;
      messstelleStore.setIncludedMeasuringDays(
        processedZaehldaten.includedMeasuringDays
      );
      messstelleStore.setRequestedMeasuringDays(
        processedZaehldaten.requestedMeasuringDays
      );
      setMaxRangeYAchse();
    })
    .catch((error) => {
      snackbarStore.showApiError(error);
      messstelleStore.setIncludedMeasuringDays(0);
      messstelleStore.setRequestedMeasuringDays(0);
    })
    .finally(() => {
      chartDataLoading.value = false;
      const messstelle: MessstelleInfoDTO = messstelleStore.getMessstelleInfo;
      historyStore.addHistoryItem(
        new MessstelleHistoryItem(
          messstelle.id,
          messstelle.mstId,
          messstelle.standort,
          _.cloneDeep(options.value)
        )
      );
    });
}

function setMaxRangeYAchse() {
  const ganglinieYAchse1MaxValue: number | null =
    options.value.ganglinieYAchse1MaxValue;
  if (
    ganglinieYAchse1MaxValue !== undefined &&
    ganglinieYAchse1MaxValue !== null &&
    ganglinieYAchse1MaxValue > 0
  ) {
    zaehldatenSteplineDTO.value.rangeMax = ganglinieYAchse1MaxValue;
  }

  const ganglinieYAchse2MaxValue: number | null =
    options.value.ganglinieYAchse2MaxValue;
  if (
    ganglinieYAchse2MaxValue !== undefined &&
    ganglinieYAchse2MaxValue !== null &&
    ganglinieYAchse2MaxValue > 0
  ) {
    zaehldatenSteplineDTO.value.rangeMaxPercent = ganglinieYAchse2MaxValue;
  }
}

/**
 * Fügt dem PDF Report das aktuell angezeigte Chart hinzu.
 */
function addChartToPdfReport(): void {
  if (activeTab.value === TAB_BELASTUNGSPLAN) {
    reportTools.addChartToPdfReport(
      Erhebungsstelle.MESSSTELLE,
      "Der",
      "Belastungsplan",
      belastungsplanPngBase64.value,
      false
    );
  }

  if (activeTab.value === TAB_GANGLINIE) {
    reportTools.addChartToPdfReport(
      Erhebungsstelle.MESSSTELLE,
      "Die",
      "Ganglinie",
      getGanglinieBase64(),
      true
    );
  }
  if (activeTab.value === TAB_HEATMAP) {
    reportTools.addChartToPdfReport(
      Erhebungsstelle.MESSSTELLE,
      "Die",
      "Heatmap",
      getHeatmapBase64(),
      true
    );
  }
  if (activeTab.value === TAB_LISTENAUSGABE) {
    reportTools.addDatatableToPdfReport(
      Erhebungsstelle.MESSSTELLE,
      "Die",
      "Datentabelle"
    );
  }
}

/**
 * Speichert das aktuell offene Diagramm als Png bzw SVG (Kreuzung-Belastungsplan)
 */
function saveGraphAsImage(): void {
  loadingFile.value = true;
  let encodedUri = undefined;
  let type = "";

  switch (activeTab.value) {
    case TAB_GANGLINIE:
      type = "Ganglinie";
      encodedUri = getGanglinieBase64();
      break;
    case TAB_HEATMAP:
      type = "Heatmap";
      encodedUri = getHeatmapBase64();
      break;
    case TAB_BELASTUNGSPLAN:
      type = "Belastungsplan";
      if (belastungsplanSvg.value) {
        encodedUri = URL.createObjectURL(belastungsplanSvg.value);
      }
      break;
  }

  if (encodedUri && type) {
    reportTools.saveGraphAsImage(
      Erhebungsstelle.MESSSTELLE,
      type,
      options.value.zeitraum,
      encodedUri
    );
  }

  loadingFile.value = false;
}

function generateCsv() {
  loadingFile.value = true;
  const optionsDTO = _.cloneDeep(options.value);

  GenerateCsvService.generateCsvMst(messstelleId.value, optionsDTO)
    .then((result: CsvDTO) => {
      const filename = `${reportTools.getFileName(
        Erhebungsstelle.MESSSTELLE,
        "Listenausgabe",
        options.value.zeitraum
      )}.csv`;
      downloadUtils.downloadCsv(result.csvAsString, filename);
    })
    .catch((error) => {
      snackbarStore.showApiError(error);
    })
    .finally(() => (loadingFile.value = false));
}

/**
 * Base 64 String der Ganglinie
 */
function getGanglinieBase64(): string | undefined {
  return steplineCard?.value?.steplineForPdf?.chart?.getDataURL({
    pixelRatio: 2,
    backgroundColor: "#fff",
    excludeComponents: ["toolbox"],
  });
}

/**
 * Base 64 String der Heatmap
 */
function getHeatmapBase64(): string | undefined {
  return heatmapCard?.value?.heatmapChart?.chart?.getDataURL({
    pixelRatio: 2,
    backgroundColor: "#fff",
    excludeComponents: ["toolbox"],
  });
}

function storeSvg(svg: Blob): void {
  belastungsplanSvg.value = svg;
}

function openPdfReportDialog(): void {
  pdfReportDialog.value = true;
}

function closePdfReportDialog(): void {
  pdfReportDialog.value = false;
}

function generatePdf(): void {
  const formData = new FormData();
  let type = "";
  loadingFile.value = true;

  formData.append(
    "options",
    new Blob([JSON.stringify(options.value)], {
      type: "application/json",
    })
  );

  switch (activeTab.value) {
    case TAB_BELASTUNGSPLAN:
      if (belastungsplanSvg.value) {
        type = "belastungsplan";
        formData.append(
          REQUEST_PART_CHART_AS_BASE64_PNG,
          belastungsplanPngBase64.value
        );
      }
      break;
    case TAB_GANGLINIE:
      type = "ganglinie";
      formData.append(
        REQUEST_PART_CHART_AS_BASE64_PNG,
        new Blob([getGanglinieBase64() ?? ""], {
          type: "image/png",
        })
      );
      if (belastungsplanSvg.value) {
        formData.append(
          REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
          belastungsplanPngBase64.value
        );
      }
      break;
    case TAB_LISTENAUSGABE:
      type = "datentabelle";
      if (belastungsplanSvg.value) {
        formData.append(
          REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
          belastungsplanPngBase64.value
        );
      }
      break;
  }
  fetchPdf(formData, type);
}

function fetchPdf(formData: FormData, type: string) {
  formData.append("department", userStore.getDepartment);
  GeneratePdfService.postPdfCustomFetchTemplateMessstelle(
    type,
    messstelleId.value,
    formData
  )
    .then((blob) => {
      // Erster Buchstabe soll im Dateinamen groß geschrieben sein, also z. B. Ganglinie statt ganglinie.
      const typeForFilename: string =
        type.charAt(0).toUpperCase() + type.slice(1);

      // Beispiel: 251101K_15-11-2020_Belastungsplan.pdf
      const filename = `${reportTools.getFileName(
        Erhebungsstelle.MESSSTELLE,
        typeForFilename,
        options.value.zeitraum
      )}.pdf`;
      downloadUtils.downloadFile(blob, filename);
    })
    .catch((error) => snackbarStore.showApiError(error))
    .finally(() => (loadingFile.value = false));
}
</script>

<style scoped lang="scss">
@use "vuetify/settings" with (
  $tab-slider-size: 8px
);
</style>
