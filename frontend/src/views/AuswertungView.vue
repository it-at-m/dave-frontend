<template>
  <v-sheet class="dave-default">
    <v-row dense>
      <v-col
        cols="4"
        class="overflow-x-auto"
      >
        <v-sheet
          class="d-flex flex-column overflow-y-auto"
          :height="stepperSheetHeight"
          width="100%"
        >
          <auswertung-stepper
            v-model="auswertungsOptions"
            :height="stepperHeightVh"
            :all-visible-messstellen="allVisibleMessstellen"
            :preset-data="presetData"
          />
          <v-spacer />
          <v-card-actions>
            <v-btn
              :disabled="!isEverythingValid"
              class="mr-2 text-none"
              color="secondary"
              text="Auswerten"
              variant="elevated"
              @click="auswertungStarten"
            />
            <v-spacer />
            <v-btn
              class="mr-2 text-none"
              color="tertiary"
              text="Zurücksetzen"
              variant="elevated"
              @click="resetAuswertungsOptions()"
            />
          </v-card-actions>
        </v-sheet>
      </v-col>
      <v-divider vertical />
      <v-col cols="8">
        <progress-loader v-model="chartDataLoading" />
        <step-line-card
          v-if="showDiagram"
          ref="steplineCard"
          :is-gesamt-auswertung="true"
          :zaehldaten-stepline="zaehldatenMessstellen"
        />
        <v-banner v-else>
          <v-card variant="flat">
            <v-card-title>
              <v-icon
                color="error"
                size="36"
                icon="mdi-alert-decagram-outline"
                start
              />
              Es ist keine grafische Darstellung der Gesamtauswertung möglich.
            </v-card-title>
            <v-card-text class="ml-9">
              <v-list-item
                v-for="(message, index) in textForNonShownDiagram"
                :key="index"
              >
                <v-list-item-title>{{ message }}</v-list-item-title>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-banner>

        <speed-dial
          v-if="showSpeeddial"
          :is-listenausgabe="false"
          :is-not-heatmap="true"
          :loading-file="loadingFile"
          @add-chart-to-pdf-report="addChartToPdfReport"
          @save-graph-as-image="saveGraphAsImage"
          @generate-pdf="createPdf"
          @open-pdf-report-dialog="openPdfReportDialog"
        />
        <pdf-report-menue-auswertung
          v-model="pdfReportDialog"
          @close="closePdfReportDialog"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script setup lang="ts">
import type AuswertungMessstelleWithFileDTO from "@/types/messstelle/auswertung/AuswertungMessstelleWithFileDTO";
import type MessstelleAuswertungDTO from "@/types/messstelle/auswertung/MessstelleAuswertungDTO";
import type MessstelleAuswertungIdDTO from "@/types/messstelle/auswertung/MessstelleAuswertungIdDTO";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";

import { cloneDeep, head, isEmpty, isNil, toArray, valuesIn } from "lodash";
import { computed, onMounted, ref } from "vue";
import { useDisplay } from "vuetify";

import { ApiError, Levels } from "@/api/error";
import GeneratePdfService from "@/api/service/GeneratePdfService";
import MessstelleAuswertungService from "@/api/service/MessstelleAuswertungService";
import ProgressLoader from "@/components/common/ProgressLoader.vue";
import SpeedDial from "@/components/messstelle/charts/SpeedDial.vue";
import PdfReportMenueAuswertung from "@/components/messstelle/gesamtauswertung/PdfReportMenueAuswertung.vue";
import AuswertungStepper from "@/components/messstelle/gesamtauswertung/stepper/AuswertungStepper.vue";
import StepLineCard from "@/components/zaehlstelle/charts/StepLineCard.vue";
import { useGesamtauswertungStore } from "@/store/GesamtauswertungStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useUserStore } from "@/store/UserStore";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { useDownloadUtils } from "@/util/DownloadUtils";
import { useMessstelleUtils } from "@/util/MessstelleUtils";
import { useReportTools } from "@/util/ReportTools";

const NUMBER_OF_MAX_XAXIS_ELEMENTS_TO_SHOW = 96;
const NUMBER_OF_MAX_MST_TO_SHOW = 10;

const minWidth = 600;

const reportTools = useReportTools();
const display = useDisplay();
const downloadUtils = useDownloadUtils();
const snackbarStore = useSnackbarStore();
const messstelleUtils = useMessstelleUtils();
const gesamtauswertungStore = useGesamtauswertungStore();

const loadingFile = ref(false);
const auswertungLoaded = ref(false);
const chartDataLoading = ref(false);
const steplineCard = ref<InstanceType<typeof StepLineCard> | null>();
const allVisibleMessstellen = ref<Array<MessstelleAuswertungDTO>>([]);
const pdfReportDialog = ref(false);
const presetData = ref(false);

const zaehldatenMessstellen = ref<LadeZaehldatenSteplineDTO>(
  DefaultObjectCreator.createDefaultLadeZaehldatenSteplineDTO()
);

const auswertungsOptions = ref<MessstelleAuswertungOptionsDTO>(
  DefaultObjectCreator.createDefaultMessstelleAuswertungOptions()
);

onMounted(() => {
  loadAllVisibleMessstellen();
  auswertungsOptions.value = cloneDeep(
    gesamtauswertungStore.getAuswertungMessstelleOptions
  );
  zaehldatenMessstellen.value = cloneDeep(
    gesamtauswertungStore.getZaehldatenMessstellen
  );
  presetData.value = !isEmpty(auswertungsOptions.value.zeitraum);
});

const textForNonShownDiagram = computed(() => {
  const text = [];
  if (!isNumberOfChosenMstShowable.value) {
    text.push(
      `Die Anzahl der gewählten Messstellen beträgt mehr als ${NUMBER_OF_MAX_MST_TO_SHOW}.`
    );
  }
  if (!isNumberOfXaxisElementsShowable.value) {
    text.push(
      `Die Anzahl der gewählten Zeitintervalle beträgt mehr als ${NUMBER_OF_MAX_XAXIS_ELEMENTS_TO_SHOW} ${auswertungsOptions.value.zeitraumCategorie}.`
    );
  }
  if (!isChosenMstIdsAndFahrzeugoptionsShowable.value) {
    text.push(
      "Es ist eine Mehrfachauswahl bei Messstellen sowie bei Fahrzeugen getroffen worden."
    );
  }
  return text;
});

const showDiagram = computed(() => {
  return (
    isChosenMstIdsAndFahrzeugoptionsShowable.value &&
    isNumberOfXaxisElementsShowable.value &&
    isNumberOfChosenMstShowable.value
  );
});

const showSpeeddial = computed(() => {
  return showDiagram.value && isEverythingValid.value && auswertungLoaded.value;
});

const isNumberOfChosenMstShowable = computed(() => {
  return (
    toArray(auswertungsOptions.value.messstelleAuswertungIds).length <=
    NUMBER_OF_MAX_MST_TO_SHOW
  );
});

const isNumberOfXaxisElementsShowable = computed(() => {
  const numerOfChosenXaxisElements =
    toArray(auswertungsOptions.value.zeitraum).length *
    toArray(auswertungsOptions.value.jahre).length;
  return numerOfChosenXaxisElements <= NUMBER_OF_MAX_XAXIS_ELEMENTS_TO_SHOW;
});

const isChosenMstIdsAndFahrzeugoptionsShowable = computed(() => {
  const numberOfChosenFahrzeugoptions = valuesIn(
    auswertungsOptions.value.fahrzeuge
  ).filter((option) => option).length;
  return (
    toArray(auswertungsOptions.value.messstelleAuswertungIds).length < 2 ||
    numberOfChosenFahrzeugoptions < 2
  );
});

const appBarHeight = computed(() => {
  return 50 / (display.height.value / 100);
});

const stepperSheetHeight = computed(() => {
  const overflowX = display.width.value / 3 <= minWidth;
  return 100 - (overflowX ? 3 : 0) - appBarHeight.value + "vh";
});

const stepperSheetActionsHeight = computed(() => {
  return 60 / (display.height.value / 100);
});

const stepperHeightVh = computed(() => {
  return 100 - appBarHeight.value - stepperSheetActionsHeight.value + "vh";
});

const isEverythingValid = computed(() => {
  return (
    auswertungsOptions.value.zeitraum.length > 0 &&
    auswertungsOptions.value.tagesTyp.length > 0 &&
    auswertungsOptions.value.jahre.length > 0 &&
    auswertungsOptions.value.messstelleAuswertungIds.length > 0 &&
    areFahrzeugeValid.value
  );
});

const areFahrzeugeValid = computed(() => {
  return (
    auswertungsOptions.value.fahrzeuge.kraftfahrzeugverkehr ||
    auswertungsOptions.value.fahrzeuge.schwerverkehr ||
    auswertungsOptions.value.fahrzeuge.gueterverkehr ||
    auswertungsOptions.value.fahrzeuge.schwerverkehrsanteilProzent ||
    auswertungsOptions.value.fahrzeuge.gueterverkehrsanteilProzent ||
    auswertungsOptions.value.fahrzeuge.radverkehr ||
    auswertungsOptions.value.fahrzeuge.fussverkehr ||
    auswertungsOptions.value.fahrzeuge.lastkraftwagen ||
    auswertungsOptions.value.fahrzeuge.lastzuege ||
    auswertungsOptions.value.fahrzeuge.busse ||
    auswertungsOptions.value.fahrzeuge.kraftraeder ||
    auswertungsOptions.value.fahrzeuge.personenkraftwagen ||
    auswertungsOptions.value.fahrzeuge.lieferwagen
  );
});

function resetAuswertungsOptions() {
  auswertungsOptions.value =
    DefaultObjectCreator.createDefaultMessstelleAuswertungOptions();
  gesamtauswertungStore.setAuswertungMessstelleOptions(
    auswertungsOptions.value
  );
  zaehldatenMessstellen.value =
    DefaultObjectCreator.createDefaultLadeZaehldatenSteplineDTO();
  gesamtauswertungStore.setZaehldatenMessstellen(zaehldatenMessstellen.value);
}

function auswertungStarten() {
  chartDataLoading.value = true;
  gesamtauswertungStore.setAuswertungMessstelleOptions(
    auswertungsOptions.value
  );
  MessstelleAuswertungService.generate(auswertungsOptions.value)
    .then((result: AuswertungMessstelleWithFileDTO) => {
      zaehldatenMessstellen.value = isNil(result.zaehldatenMessstellen)
        ? cloneDeep(
            DefaultObjectCreator.createDefaultLadeZaehldatenSteplineDTO()
          )
        : cloneDeep(result.zaehldatenMessstellen);
      const filename = `Gesamtauswertung_${new Date().toISOString().split("T")[0]}.xlsx`;
      downloadUtils.downloadXlsx(result.spreadsheetBase64Encoded, filename);
      auswertungLoaded.value = true;
    })
    .catch((error) => {
      snackbarStore.showApiError(error);
      auswertungLoaded.value = false;
    })
    .finally(() => {
      chartDataLoading.value = false;
      if (!showDiagram.value) {
        zaehldatenMessstellen.value =
          DefaultObjectCreator.createDefaultLadeZaehldatenSteplineDTO();
      }
      gesamtauswertungStore.setZaehldatenMessstellen(
        zaehldatenMessstellen.value
      );
    });
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

function createPdf() {
  const formData = new FormData();
  formData.append(
    "options",
    new Blob([JSON.stringify(auswertungsOptions.value)], {
      type: "application/json",
    })
  );
  formData.append(
    "chartAsBase64Png",
    new Blob([getGanglinieBase64() ?? ""], {
      type: "image/png",
    })
  );
  formData.append(
    "auswertung",
    new Blob([JSON.stringify(zaehldatenMessstellen.value)], {
      type: "application/json",
    })
  );
  formData.append("department", useUserStore().getDepartment);

  GeneratePdfService.postPdfCustomFetchTemplateGesamtauswertung(formData)
    .then((blob) => {
      downloadUtils.downloadFile(
        blob,
        getFilenameWithEndingAndOptionalMq("pdf", false)
      );
    })
    .catch((error) => useSnackbarStore().showApiError(error));
}

/**
 * Speichert das aktuell offene Diagramm als Png bzw SVG (Kreuzung-Belastungsplan)
 */
function saveGraphAsImage(): void {
  loadingFile.value = true;
  const encodedUri = getGanglinieBase64();
  if (encodedUri) {
    reportTools.saveGesamtauswertungAsImage(
      getFilenameWithEndingAndOptionalMq("png", true),
      encodedUri
    );
  }
  loadingFile.value = false;
}

/**
 * Fügt dem PDF Report das aktuell angezeigte Chart hinzu.
 */
function addChartToPdfReport(): void {
  reportTools.addGesamtauswertungToPdfReport(
    "Die Auswertung",
    getCaption(),
    getGanglinieBase64()
  );
}

function getFilenameWithEndingAndOptionalMq(ending: string, withMq: boolean) {
  return `${getFilenameWithOptionalMq(withMq)}.${ending}`;
}

function getCaption() {
  return getFilenameWithOptionalMq(true).replaceAll("_", " ");
}

function getFilenameWithOptionalMq(withMq: boolean) {
  let filename = `Gesamtauswertung_${new Date().toISOString().split("T")[0]}`;
  if (auswertungsOptions.value.messstelleAuswertungIds.length === 1) {
    if (withMq) {
      filename = getFilenameSingleMessstelleAndMessquerschnitte(
        head(auswertungsOptions.value.messstelleAuswertungIds)
      );
    } else {
      filename = getFilenameSingleMessstelle(
        head(auswertungsOptions.value.messstelleAuswertungIds)
      );
    }
  }
  if (auswertungsOptions.value.messstelleAuswertungIds.length > 1) {
    filename = `Zeitreihe_zur_Messung_${messstelleUtils.getSelectedVerkehrsartAsText(auswertungsOptions.value.fahrzeuge)}`;
  }
  return filename;
}

function getFilenameSingleMessstelle(
  messstelleAuswertungId: MessstelleAuswertungIdDTO | undefined
) {
  const filenamePart1 = "Zeitreihe_zur_Messstelle";
  let filenamePart2 = "unbekannt";
  if (messstelleAuswertungId) {
    filenamePart2 = messstelleAuswertungId.mstId;
  }
  return `${filenamePart1}_${filenamePart2}`;
}

function getFilenameSingleMessstelleAndMessquerschnitte(
  messstelleAuswertungId: MessstelleAuswertungIdDTO | undefined
) {
  const filenamePart1 = getFilenameSingleMessstelle(messstelleAuswertungId);
  if (messstelleAuswertungId) {
    const messstelle = allVisibleMessstellen.value.find(
      (value) => value.mstId === messstelleAuswertungId.mstId
    );
    if (
      messstelle &&
      messstelleAuswertungId.mqIds.length < messstelle.messquerschnitte.length
    ) {
      return `${filenamePart1}_${messstelleAuswertungId.mqIds.length > 1 ? "Messquerschnitte" : "Messquerschnitt"}_${messstelleAuswertungId.mqIds.join("_")}`;
    }
  }
  return filenamePart1;
}

function loadAllVisibleMessstellen(): void {
  MessstelleAuswertungService.getAllVisibleMessstellen()
    .then((messstellen: Array<MessstelleAuswertungDTO>) => {
      allVisibleMessstellen.value = messstellen;
    })
    .catch((error) => {
      throw new ApiError(
        Levels.ERROR,
        `Beim Laden aller auswählbaren Messstellen ist ein Fehler aufgetreten.`,
        error
      );
    });
}
function openPdfReportDialog(): void {
  pdfReportDialog.value = true;
}

function closePdfReportDialog(): void {
  pdfReportDialog.value = false;
}
</script>
