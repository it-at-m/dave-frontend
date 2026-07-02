<template>
  <v-speed-dial
    v-model="speedDialOpen"
    location="top"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        key="speedDial"
        v-tooltip:start="'Exportfunktionen'"
        :color="speedDialColor"
        :icon="speedDialOpen ? 'mdi-close-thick' : 'mdi-file'"
        size="large"
        elevation="6"
        location="bottom end"
        position="absolute"
        class="mr-4 mb-4"
        density="default"
        style="z-index: 400"
        :data-x="activatorProps"
        :loading="loadingFile"
      />
    </template>
    <v-btn
      v-if="getVisibleButton('generatePdfButton')"
      key="generatePdfButton"
      v-tooltip:start="generatePdfTooltip"
      size="small"
      density="default"
      color="secondary"
      icon="mdi-file-pdf-box"
      @click="$emit('generatePdf')"
    />
    <v-btn
      v-if="getVisibleButton('generatecsvButton')"
      key="generatecsvButton"
      v-tooltip:start="'CSV'"
      size="small"
      density="default"
      color="secondary"
      icon="mdi-file-delimited"
      @click="$emit('generateCsv')"
    />
    <v-btn
      v-if="getVisibleButton('openPdfReportDialogButton')"
      key="openPdfReportDialogButton"
      v-tooltip:start="'PDF Report Menü öffnen'"
      size="small"
      density="default"
      color="secondary"
      icon="mdi-file-chart"
      @click="$emit('openPdfReportDialog')"
    />
    <v-btn
      v-if="getVisibleButton('addChartToPdfReportButton')"
      key="addChartToPdfReportButton"
      v-tooltip:start="addChartToReportTooltip"
      size="small"
      density="default"
      color="secondary"
      icon="mdi-chart-box-plus-outline"
      @click="$emit('addChartToPdfReport')"
    />
    <v-btn
      v-if="getVisibleButton('saveGraphAsImageButton')"
      key="saveGraphAsImageButton"
      v-tooltip:start="'Graph herunterladen'"
      size="small"
      density="default"
      color="secondary"
      icon="mdi-download"
      @click="$emit('saveGraphAsImage')"
    />
  </v-speed-dial>
</template>
<script setup lang="ts">
import { ZaehldatenTab } from "@/components/zaehlstelle/ZaehldatenDiagrammeDataTypes";
import { computed, ref } from "vue";

interface Props {
  isListenausgabe: boolean;
  isNotHeatmap: boolean;
  selectedTab: ZaehldatenTab;
  loadingFile: boolean;
  openPdfReportDialog?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  openPdfReportDialog: true,
});

defineEmits<{
  (e: "generatePdf"): void;
  (e: "openPdfReportDialog"): void;
  (e: "generateCsv"): void;
  (e: "addChartToPdfReport"): void;
  (e: "saveGraphAsImage"): void;
}>();

// Fab
const speedDialOpen = ref(false);

const speedDialColor = computed(() => {
  return speedDialOpen.value ? "quaternary" : "secondary";
});

const generatePdfTooltip = computed(() => {
  return props.isListenausgabe ? "PDF" : "Chart als PDF drucken";
});

const addChartToReportTooltip = computed(() => {
  let type = "Diagramm";
  if (props.isListenausgabe) {
    type = "Tabelle";
  }
  return `${type} dem PDF Report hinzufügen`;
});

function getVisibleButton(buttonKey: string): boolean {
  let buttons = selectButtons(props.selectedTab);
  if (buttons) {
    return buttons.includes(buttonKey);
  }
  return true;
}

function selectButtons(tab: ZaehldatenTab) {
  switch (tab) {
    case ZaehldatenTab.BELASTUNGSPLAN:
      return ["generatePdfButton", "openPdfReportDialogButton", "addChartToPdfReportButton", "saveGraphAsImageButton"];
    case ZaehldatenTab.GANGLINIE:
      return ["generatePdfButton", "openPdfReportDialogButton", "addChartToPdfReportButton", "saveGraphAsImageButton"];
    case ZaehldatenTab.LISTENAUSGABE:
      return ["generatePdfButton", "generatecsvButton", "openPdfReportDialogButton", "addChartToPdfReportButton"];
    case ZaehldatenTab.HEATMAP:
      return ["generatePdfButton", "addChartToPdfReportButton", "saveGraphAsImageButton"];
    case ZaehldatenTab.DRILLDOWN:
      return ["generatecsvButton"];
    default:
      return ["generatePdfButton"];
  }
}

</script>
