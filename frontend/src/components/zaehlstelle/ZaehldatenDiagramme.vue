<template>
  <v-sheet
    ref="sheet"
    :min-height="height"
  >
    <v-banner
      v-if="!hasZaehlungen"
      single-line
    >
      <v-icon
        color="error"
        size="36"
        icon="mdi-alert-decagram-outline"
      />
      Zu dieser Zählstelle sind aktuell noch keine Zählungen im System
      vorhanden.
    </v-banner>
    <v-tabs
      v-if="hasZaehlungen"
      v-model="activeTab"
      fixed-tabs
      bg-color="quaternary"
      slider-color="tertiary"
      stacked
      color="white"
      class="text-grey-lighten-1"
      @update:model-value="changeTab"
    >
      <!-- Kopfzeile -->
      <v-tab :value="ZaehldatenTab.BELASTUNGSPLAN">
        <v-icon icon="mdi-arrow-decision" />
        Belastungsplan
      </v-tab>
      <v-tab :value="ZaehldatenTab.GANGLINIE">
        <v-icon icon="mdi-chart-histogram" />
        Ganglinie
      </v-tab>
      <v-tab :value="ZaehldatenTab.LISTENAUSGABE">
        <v-icon icon="mdi-table" />
        Listenausgabe
      </v-tab>
      <v-tab :value="ZaehldatenTab.HEATMAP">
        <v-icon icon="mdi-chart-bubble" />
        Heatmap
      </v-tab>
      <v-tab :value="ZaehldatenTab.DRILLDOWN">
        <v-icon icon="mdi-database-arrow-down-outline" />
        Drill-Down
      </v-tab>
      <v-tab :value="ZaehldatenTab.ZEITREIHE" v-if="!selectedZaehlung.dauerzaehlung">
        <v-icon icon="mdi-timer-sand" />
        Zeitreihe
      </v-tab>
    </v-tabs>

    <v-tabs-window
      v-if="hasZaehlungen"
      v-model="activeTab"
      class="d-flex flex-column align-stretch"
    >
      <!-- Inhalte -->
      <v-tabs-window-item :value="ZaehldatenTab.BELASTUNGSPLAN">
        <v-sheet
          :max-height="contentHeight"
          width="100%"
          class="overflow-y-auto"
        >
          <div v-if="hasSelectedVerkehrsarten">
            <belastungsplan-kreuzung-svg
              v-show="!belastungsplanDTO.kreisverkehr"
              :dimension="contentHeight"
              :data="belastungsplanDTO"
              @print="storeSvg($event)"
              @print-schema="storeSvgSchematischeUebersicht($event)"
            />

            <belastungsplan-card
              v-show="belastungsplanDTO.kreisverkehr"
              ref="belastungsplanCard"
              :dimension="contentHeight"
              :belastungsplan-data="belastungsplanDTO"
              :loaded="false"
              :zaehlung-id="zaehlungsId"
            />
          </div>
          <v-banner v-else>
            <v-icon
              color="error"
              size="36"
              icon="mdi-alert-decagram-outline"
            />
            <p class="ml-2">
              {{ globalInfoMessage.NO_BELASTUNGSPLAN }}
            </p>
          </v-banner>
        </v-sheet>
        <progress-loader v-model="chartDataLoading" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="ZaehldatenTab.GANGLINIE">
        <v-sheet
          :min-height="contentHeight"
          :max-height="contentHeight"
          width="100%"
          class="overflow-y-auto"
        >
          <step-line-card
            ref="steplineCard"
            :zaehldaten-stepline="zaehldatenSteplineDTO"
          />
        </v-sheet>
        <progress-loader v-model="chartDataLoading" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="ZaehldatenTab.LISTENAUSGABE">
        <v-sheet
          :max-height="contentHeight"
          width="94%"
        >
          <zaehldaten-listenausgabe
            class="mx-10 border-thin"
            :listenausgabe-data="listenausgabeDTO"
            :height="contentHeight"
          />
        </v-sheet>
        <progress-loader v-model="chartDataLoading" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="ZaehldatenTab.HEATMAP">
        <v-sheet
          :min-height="contentHeight"
          :max-height="contentHeight"
          width="100%"
          class="overflow-y-auto"
        >
          <heatmap-card
            ref="heatmapCard"
            :zaehldaten-heatmap="zaehldatenHeatmap"
          />
        </v-sheet>
        <progress-loader v-model="chartDataLoading" />
      </v-tabs-window-item>
      
      <v-tabs-window-item :value="ZaehldatenTab.DRILLDOWN">
        <v-sheet
          :min-height="contentHeight"
          :max-height="contentHeight"
          width="100%"
          class="overflow-y-auto"
        >
          <drill-down-table
            v-if="drillDownDTO"
            :drill-down-data="drillDownDTO"
            :height="contentHeight"
          />

        </v-sheet>
      </v-tabs-window-item>

      <v-tabs-window-item :value="ZaehldatenTab.ZEITREIHE" v-if="!selectedZaehlung.dauerzaehlung">
        <v-sheet
          :min-height="contentHeight"
          :max-height="contentHeight"
          width="100%"
          class="overflow-y-auto"
        >
          <zeitreihe-card
            ref="zeitreiheCard"
            :zaehldaten-zeitreihe="zaehldatenZeitreihe"
          />
        </v-sheet>
        <progress-loader v-model="chartDataLoading" />
      </v-tabs-window-item>
    </v-tabs-window>

    <speed-dial
      :is-listenausgabe="isTabListenausgabe"
      :is-not-heatmap="isNotTabHeatmap"
      :selected-tab="activeTab"
      :loading-file="loadingFile"
      @add-chart-to-pdf-report="addChartToPdfReport"
      @save-graph-as-image="saveGraphAsImage"
      @open-pdf-report-dialog="openPdfReportDialog"
      @generate-csv="generateCsv"
      @generate-pdf="generatePdf"
    />

    <pdf-report-menue v-model="pdfReportDialog" />

    <belastungsplan-kreuzung-svg-schematische-uebersicht
      v-if="drawSchematischeUebersicht"
      :dimension="contentHeight"
      :data="belastungsplanDTO"
      :style="schemaStyle"
      @print="storeSvgSchematischeUebersicht($event)"
    />
  </v-sheet>
</template>
<script setup lang="ts">
import type CsvDTO from "@/types/common/CsvDTO";
import type ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import type { StartEndeUhrzeitIntervalls } from "@/types/zaehlung/StartEndeUhrzeitIntervalls";
import type LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import type LadeProcessedZaehldatenDTO from "@/types/zaehlung/zaehldaten/LadeProcessedZaehldatenDTO";
import type LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import type LadeZaehldatenZeitreiheDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenZeitreiheDTO";
import type LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";

import { first, isEmpty, last } from "lodash";
import { computed, ref, watch } from "vue";

import GenerateCsvService from "@/api/service/GenerateCsvService";
import GeneratePdfService from "@/api/service/GeneratePdfService";
import LadeZaehldatenService from "@/api/service/LadeZaehldatenService";
import PdfReportMenue from "@/components/common/PdfReportMenue.vue";
import ProgressLoader from "@/components/common/ProgressLoader.vue";
import SpeedDial from "@/components/messstelle/charts/SpeedDial.vue";
import BelastungsplanCard from "@/components/zaehlstelle/charts/BelastungsplanCard.vue";
import BelastungsplanKreuzungSvg from "@/components/zaehlstelle/charts/BelastungsplanKreuzungSvg.vue";
import BelastungsplanKreuzungSvgSchematischeUebersicht from "@/components/zaehlstelle/charts/BelastungsplanKreuzungSvgSchematischeUebersicht.vue";
import HeatmapCard from "@/components/zaehlstelle/charts/HeatmapCard.vue";
import StepLineCard from "@/components/zaehlstelle/charts/StepLineCard.vue";
import ZaehldatenListenausgabe from "@/components/zaehlstelle/charts/ZaehldatenListenausgabe.vue";
import ZeitreiheCard from "@/components/zaehlstelle/charts/ZeitreiheCard.vue";
import { useHistoryStore } from "@/store/HistoryStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useUserStore } from "@/store/UserStore";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Erhebungsstelle from "@/types/enum/Erhebungsstelle";
import ZaehlstelleHistoryItem from "@/types/history/ZaehlstelleHistoryItem";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { useDownloadUtils } from "@/util/DownloadUtils";
import { useGlobalInfoMessage } from "@/util/GlobalInfoMessage";
import { useReportTools } from "@/util/ReportTools";
import { ZaehldatenTab } from "@/components/zaehlstelle/ZaehldatenDiagrammeDataTypes";
import DrillDownTable from "@/components/zaehlstelle/charts/DrillDownTable.vue";
import type { DrilldownDTO } from "@/types/zaehlung/zaehldaten/DrillDownDTO.js";
import { ApiError, Levels } from "@/api/error";
import { useCsvUtils } from "@/util/CSVUtils";

interface Props {
  height?: string;
  contentHeight: string;
  hasZaehlungen?: boolean;
}

withDefaults(defineProps<Props>(), {
  height: "100%",
  hasZaehlungen: true,
});

const BELASTUNGSPLAN_PNG_DIMENSION = 1400;
const BELASTUNGSPLAN_SCHEMATISCHE_UEBERSICHT_PNG_DIMENSION = 1400;
const REQUEST_PART_CHART_AS_BASE64_PNG = "chartAsBase64Png";
const REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG =
  "schematischeUebersichtAsBase64Png";

const chartDataLoading = ref(false);
const pdfReportDialog = ref(false);

// Belastungsplan Kreuzung
const belastungsplanDTO = ref<LadeBelastungsplanDTO>(
  {} as LadeBelastungsplanDTO
);
const belastungsplanSvg = ref<Blob>();
const belastungsplanPngBase64 = ref("");
const belastungsplanSchematischeUebersichtSvg = ref<Blob>();
const belastungsplanSchematischeUebersichtPngBase64 = ref("");

const zaehldatenSteplineDTO = ref<LadeZaehldatenSteplineDTO>(
  {} as LadeZaehldatenSteplineDTO
);
const listenausgabeDTO = ref<Array<LadeZaehldatumDTO>>([]);
//drilldown table
const drillDownDTO = ref<DrilldownDTO>();

const zaehldatenHeatmap = ref<LadeZaehldatenHeatmapDTO>(
  {} as LadeZaehldatenHeatmapDTO
);
const zaehldatenZeitreihe = ref<LadeZaehldatenZeitreiheDTO>(
  {} as LadeZaehldatenZeitreiheDTO
);

const activeTab = ref(ZaehldatenTab.BELASTUNGSPLAN);
const loadingFile = ref(false);

const belastungsplanCard = ref<InstanceType<
  typeof BelastungsplanCard
> | null>();
const steplineCard = ref<InstanceType<typeof StepLineCard> | null>();
const heatmapCard = ref<InstanceType<typeof HeatmapCard> | null>();
const zeitreiheCard = ref<InstanceType<typeof ZeitreiheCard> | null>();

const snackbarStore = useSnackbarStore();
const userStore = useUserStore();
const zaehlstelleStore = useZaehlstelleStore();
const historyStore = useHistoryStore();
const reportTools = useReportTools();
const downloadUtils = useDownloadUtils();
const csvUtils = useCsvUtils();
const globalInfoMessage = useGlobalInfoMessage();

const options = computed<OptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});
const hasSelectedVerkehrsarten = computed<boolean>(() => {
  return (
    options.value.kraftfahrzeugverkehr ||
    options.value.schwerverkehr ||
    options.value.gueterverkehr ||
    options.value.schwerverkehrsanteilProzent ||
    options.value.gueterverkehrsanteilProzent ||
    options.value.radverkehr ||
    options.value.fussverkehr
  );
});

const zaehlungsId = computed(() => {
  return zaehlstelleStore.getZaehlungsId;
});
const selectedZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const zaehlstelle = computed<ZaehlstelleHeaderDTO>(() => {
  return zaehlstelleStore.getZaehlstelleHeader;
});
const isTabListenausgabe = computed<boolean>(() => {
  return ZaehldatenTab.LISTENAUSGABE === activeTab.value;
});
const isNotTabHeatmap = computed<boolean>(() => {
  return ZaehldatenTab.HEATMAP !== activeTab.value;
});

watch(selectedZaehlung, () => {
    zaehlstelleStore.setActiveTab(activeTab.value);
});

watch(options, () => {
  displaySchema.value = true;
  loadData();
});

function changeTab() {
  zaehlstelleStore.setActiveTab(activeTab.value);
}

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

watch(belastungsplanSchematischeUebersichtSvg, () => {
  if (belastungsplanSchematischeUebersichtSvg.value) {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const dimension = BELASTUNGSPLAN_SCHEMATISCHE_UEBERSICHT_PNG_DIMENSION;
      canvas.width = dimension;
      canvas.height = dimension;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(image, 0, 0, dimension, dimension);
        // Image Asset erstellen und in Variable speichern
        belastungsplanSchematischeUebersichtPngBase64.value =
          canvas.toDataURL("image/jpg");
      }
    };
    image.src = URL.createObjectURL(
      belastungsplanSchematischeUebersichtSvg.value
    );
  }
});

function loadData(): void {
  const o = Object.assign({}, options.value) as OptionsDTO;
  o.zaehldauer = selectedZaehlung.value.zaehldauer;
  // requests abschicken
  loadProcessedChartData(o);

  // Save HistoryItem
  historyStore.addHistoryItem(
    new ZaehlstelleHistoryItem(
      selectedZaehlung.value.id,
      selectedZaehlung.value.datum,
      selectedZaehlung.value.projektName,
      zaehlstelle.value.nummer,
      zaehlstelle.value.id,
      Object.assign({}, options.value)
    )
  );
}

function loadProcessedChartData(options: OptionsDTO) {
  resetStartEndeUhrzeitIntervallsInStore();
  chartDataLoading.value = true;

  LadeZaehldatenService.ladeZaehldatenProcessed(
    selectedZaehlung.value.id,
    options
  )
    .then((processedZaehldaten: LadeProcessedZaehldatenDTO) => {
      storeStartAndEndeUhrzeitOfIntervalls(
        processedZaehldaten.zaehldatenTable.zaehldaten
      );
      listenausgabeDTO.value = processedZaehldaten.zaehldatenTable.zaehldaten;
      zaehldatenSteplineDTO.value = processedZaehldaten.zaehldatenStepline;
      zaehldatenHeatmap.value = processedZaehldaten.zaehldatenHeatmap;
      zaehldatenZeitreihe.value = processedZaehldaten.zaehldatenZeitreihe;
      belastungsplanDTO.value = processedZaehldaten.zaehldatenBelastungsplan;
      setMaxRangeYAchse();
    })
    .catch((error) => snackbarStore.showApiError(error))
    .finally(() => {
      chartDataLoading.value = false;
    });

  LadeZaehldatenService.ladeZaehldatenDrillDown(
    selectedZaehlung.value.id,
    options
  ).then((drilldownData: DrilldownDTO) => {
    drillDownDTO.value = drilldownData;
  })
    .catch((error) => snackbarStore.showApiError(error)
  );
  
}

function openPdfReportDialog(): void {
  pdfReportDialog.value = true;
}

/**
 * Bekommt das aktuelle Belastungsplan Diagramm als SVG. Dieses wird dann
 * in eine Variable gespeichert und kann jederzeit gedruckt werden.
 *
 * @param svg
 */
function storeSvg(svg: Blob) {
  belastungsplanSvg.value = svg;
}

function storeSvgSchematischeUebersicht(svg: Blob) {
  belastungsplanSchematischeUebersichtSvg.value = svg;
  displaySchema.value = false;
}

/**
 * Diese Methode speichert die Start- und Enduhrzeit des ersten und letzten Zeitintervalls
 * der im Parameter gegebenen Zähldaten im Store.
 *
 * @param listenausgabeData
 */
function storeStartAndEndeUhrzeitOfIntervalls(
  listenausgabeData: Array<LadeZaehldatumDTO>
): void {
  const intervalls: Array<LadeZaehldatumDTO> = listenausgabeData.filter(
    (zaehldatum) => {
      return isEmpty(zaehldatum.type);
    }
  );
  const firstIntervall: LadeZaehldatumDTO | undefined = first(intervalls);
  const lastIntervall: LadeZaehldatumDTO | undefined = last(intervalls);
  if (!isEmpty(firstIntervall) && !isEmpty(lastIntervall)) {
    const startEndeUhrzeitIntervalls: StartEndeUhrzeitIntervalls = {
      startUhrzeitIntervalls: firstIntervall?.startUhrzeit,
      endeUhrzeitIntervalls: lastIntervall?.endeUhrzeit,
    } as StartEndeUhrzeitIntervalls;
    zaehlstelleStore.setStartEndeUhrzeitIntervalls(startEndeUhrzeitIntervalls);
  }
}

/**
 * Zurücksetzen der Start- und Endeuhrzeit des ersten und letzten Zeitintervalls.
 */
function resetStartEndeUhrzeitIntervallsInStore(): void {
  zaehlstelleStore.setStartEndeUhrzeitIntervalls(
    DefaultObjectCreator.createDefaultStartEndeUhrzeitIntervalls()
  );
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
  switch (activeTab.value) {
    case ZaehldatenTab.BELASTUNGSPLAN:
      if (belastungsplanDTO.value.kreisverkehr) {
        reportTools.addChartToPdfReport(
          Erhebungsstelle.ZAEHLSTELLE,
          "Der",
          "Belastungsplan",
          getKreisverkehrBase64(),
          false
        );
      } else {
        reportTools.addChartToPdfReport(
          Erhebungsstelle.ZAEHLSTELLE,
          "Der",
          "Belastungsplan",
          belastungsplanPngBase64.value,
          false
        );
      }
      break;
    case ZaehldatenTab.GANGLINIE:
      reportTools.addChartToPdfReport(
        Erhebungsstelle.ZAEHLSTELLE,
        "Die",
        "Ganglinie",
        getGanglinieBase64(),
        true
      );
      break;
    case ZaehldatenTab.HEATMAP:
      reportTools.addChartToPdfReport(
        Erhebungsstelle.ZAEHLSTELLE,
        "Die",
        "Heatmap",
        getHeatmapBase64(),
        true
      );
      break;
    case ZaehldatenTab.ZEITREIHE:
      reportTools.addChartToPdfReport(
        Erhebungsstelle.ZAEHLSTELLE,
        "Die",
        "Zeitreihe",
        getZeitreiheBase64(),
        true
      );
      break;
    case ZaehldatenTab.LISTENAUSGABE:
      reportTools.addDatatableToPdfReport(
        Erhebungsstelle.ZAEHLSTELLE,
        "Die",
        "Datentabelle"
      );
      break;
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
    case ZaehldatenTab.BELASTUNGSPLAN:
      type = "Belastungsplan";
      if (belastungsplanDTO.value.kreisverkehr) {
        encodedUri = getKreisverkehrBase64();
      } else if (belastungsplanSvg.value) {
        // Kreuzung
        encodedUri = URL.createObjectURL(belastungsplanSvg.value);
      }
      break;
    case ZaehldatenTab.GANGLINIE:
      type = "Ganglinie";
      encodedUri = getGanglinieBase64();
      break;
    case ZaehldatenTab.HEATMAP:
      type = "Heatmap";
      encodedUri = getHeatmapBase64();
      break;
    case ZaehldatenTab.ZEITREIHE:
      type = "Zeitreihe";
      encodedUri = getZeitreiheBase64();
      break;
  }

  if (encodedUri && type) {
    reportTools.saveGraphAsImage(
      Erhebungsstelle.ZAEHLSTELLE,
      type,
      [selectedZaehlung.value.datum],
      encodedUri
    );
  }
  loadingFile.value = false;
}

/**
 * Base 64 String des Kreisverkehrs
 */
function getKreisverkehrBase64(): string | undefined {
  return belastungsplanCard?.value?.belastungsplanKreisverkehr?.chart?.getDataURL(
    {
      pixelRatio: 2,
      backgroundColor: "#fff",
      excludeComponents: ["toolbox"],
    }
  );
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
 * Base64 String der Heatmap
 */
function getHeatmapBase64(): string | undefined {
  return heatmapCard?.value?.heatmapChart?.chart?.getDataURL({
    pixelRatio: 2,
    backgroundColor: "#fff",
    excludeComponents: ["toolbox"],
  });
}

/**
 * Base64 String der Zeitreihe
 */
function getZeitreiheBase64(): string | undefined {
  return zeitreiheCard?.value?.zeitreiheForPdf?.chart?.getDataURL({
    pixelRatio: 2,
    backgroundColor: "#fff",
    excludeComponents: ["toolbox"],
  });
}

// PDF
function generatePdf() {
  const formData = new FormData();
  loadingFile.value = true;

  const o = Object.assign({}, options.value) as OptionsDTO;
  o.zaehldauer = selectedZaehlung.value.zaehldauer;

  formData.append(
    "options",
    new Blob([JSON.stringify(o)], {
      type: "application/json",
    })
  );

  // Belastungsplan
  if (activeTab.value === ZaehldatenTab.BELASTUNGSPLAN) {
    // Kreisverkehr
    const kreisverkehrBase64 = getKreisverkehrBase64();
    if (belastungsplanDTO.value.kreisverkehr && kreisverkehrBase64) {
      formData.append(
        REQUEST_PART_CHART_AS_BASE64_PNG,
        new Blob([kreisverkehrBase64], {
          type: "image/png",
        })
      );
    } else {
      // Kreuzung
      formData.append(
        REQUEST_PART_CHART_AS_BASE64_PNG,
        belastungsplanPngBase64.value
      );
    }
    fetchPdf(formData, "belastungsplan");

    // Ganglinie
  } else if (activeTab.value === ZaehldatenTab.GANGLINIE) {
    const ganglinieBase64 = getGanglinieBase64();
    if (ganglinieBase64) {
      formData.append(
        REQUEST_PART_CHART_AS_BASE64_PNG,
        new Blob([ganglinieBase64], {
          type: "image/png",
        })
      );
    }
    formData.append(
      REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
      belastungsplanSchematischeUebersichtPngBase64.value
    );
    fetchPdf(formData, "ganglinie");
    // Listenausgabe
  } else if (activeTab.value === ZaehldatenTab.LISTENAUSGABE) {
    formData.append(
      REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
      belastungsplanSchematischeUebersichtPngBase64.value
    );
    fetchPdf(formData, "datentabelle");
    // Zeitreihe
  } else if (activeTab.value === ZaehldatenTab.ZEITREIHE) {
    const zeitreiheBase64 = getZeitreiheBase64();
    if (zeitreiheBase64) {
      formData.append(
        REQUEST_PART_CHART_AS_BASE64_PNG,
        new Blob([zeitreiheBase64], {
          type: "image/png",
        })
      );
    }
    formData.append(
      REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
      belastungsplanSchematischeUebersichtPngBase64.value
    );
    fetchPdf(formData, "zeitreihe");
  } else {
    loadingFile.value = false;
  }
}

function fetchPdf(formData: FormData, type: string) {
  formData.append("department", userStore.getDepartment);
  GeneratePdfService.postPdfCustomFetchTemplateZaehlung(
    type,
    selectedZaehlung.value.id,
    formData
  )
    .then((blob) => {
      // Erster Buchstabe soll im Dateinamen groß geschrieben sein, also z. B. Ganglinie statt ganglinie.
      const typeForFilename: string =
        type.charAt(0).toUpperCase() + type.slice(1);
      const filename = `${reportTools.getFileName(
        Erhebungsstelle.ZAEHLSTELLE,
        typeForFilename,
        [selectedZaehlung.value.datum]
      )}.pdf`;
      downloadUtils.downloadFile(blob, filename);
    })
    .catch((error) => snackbarStore.showApiError(error))
    .finally(() => (loadingFile.value = false));
}

function generateCsv() {
  loadingFile.value = true;
  const optionsDTO = Object.assign({}, options.value) as OptionsDTO;
  optionsDTO.zaehldauer = selectedZaehlung.value.zaehldauer;

  switch (activeTab.value) {
    case ZaehldatenTab.LISTENAUSGABE: 
      GenerateCsvService.generateCsv(selectedZaehlung.value.id, optionsDTO)
        .then((result: CsvDTO) => {
          // Beispiel: 251101K_15-11-2020_Listenausgabe.csv
          const filename = `${reportTools.getFileName(
            Erhebungsstelle.ZAEHLSTELLE,
            "Listenausgabe",
            [selectedZaehlung.value.datum]
          )}.csv`;

          downloadUtils.downloadCsv(result.csvAsString, filename);
        })
        .catch((error) => {
          snackbarStore.showApiError(error);
        })
        .finally(() => (loadingFile.value = false));
      break;
    
    case ZaehldatenTab.DRILLDOWN:
      if(!drillDownDTO.value) {
        snackbarStore.showApiError(new ApiError(Levels.ERROR,"Keine CSV-Exportfunktion für diese Daten vorhanden",""));
        loadingFile.value = false
        return;
      } else {
        let timeBasedValues = csvUtils.convertToCSV(zaehlstelle.value, zaehlungsId.value, drillDownDTO.value.zeitintervalle);
        let filename = csvUtils.generateFileName(selectedZaehlung.value, drillDownDTO.value.zeitintervalle);
        downloadUtils.downloadCsv(timeBasedValues, filename);
        loadingFile.value = false
      }
      
      break;
    default:
      snackbarStore.showApiError(new ApiError(Levels.ERROR,"Keine CSV-Exportfunktion für diese Daten vorhanden",""));
      loadingFile.value = false
      break;
  }
}

const displaySchema = ref(true);
const schemaStyle = computed(() => {
  let style = ``;
  if (!displaySchema.value) {
    style = `display: none`;
  }
  return style;
});

const drawSchematischeUebersicht = computed(() => {
  return (
    hasSelectedVerkehrsarten.value &&
    belastungsplanDTO.value &&
    belastungsplanDTO.value.value1 &&
    belastungsplanDTO.value.value1.values &&
    belastungsplanDTO.value.value1.values.length > 0
  );
});
</script>

<style scoped lang="scss">
@use "vuetify/settings" with (
  $tab-slider-size: 8px
);
</style>
