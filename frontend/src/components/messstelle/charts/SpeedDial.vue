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
        style="z-index: 400"
        :data-x="activatorProps"
        :loading="loadingFile"
      />
    </template>
    <v-btn
      v-if="isNotHeatmap"
      key="generatePdfButton"
      v-tooltip:start="generatePdfTooltip"
      size="small"
      color="secondary"
      icon="mdi-file-pdf-box"
      @click="$emit('generatePdf')"
    />
    <v-btn
      v-if="isListenausgabe"
      key="generatecsvButton"
      v-tooltip:start="'CSV'"
      size="small"
      color="secondary"
      icon="mdi-file-delimited"
      @click="$emit('generateCsv')"
    />
    <v-btn
      v-if="openPdfReportDialog"
      key="openPdfReportDialogButton"
      v-tooltip:start="'PDF Report Menü öffnen'"
      size="small"
      color="secondary"
      icon="mdi-file-chart"
      @click="$emit('openPdfReportDialog')"
    />
    <v-btn
      key="addChartToPdfReportButton"
      v-tooltip:start="addChartToReportTooltip"
      size="small"
      color="secondary"
      icon="mdi-chart-box-plus-outline"
      @click="$emit('addChartToPdfReport')"
    />
    <v-btn
      v-if="!isListenausgabe"
      key="saveGraphAsImageButton"
      v-tooltip:start="'Graph herunterladen'"
      size="small"
      color="secondary"
      icon="mdi-download"
      @click="$emit('saveGraphAsImage')"
    />
  </v-speed-dial>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  isListenausgabe: boolean;
  isNotHeatmap: boolean;
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
  return speedDialOpen.value ? "grey-darken-1" : "secondary";
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
</script>
