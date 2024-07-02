<template>
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
        :loading="loadingFile"
      >
        <v-icon v-if="fab"> mdi-close-thick </v-icon>
        <v-icon v-else> mdi-file </v-icon>
      </v-btn>
    </template>

    <v-tooltip
      v-if="isNotHeatmap"
      location="left"
    >
      <template #activator="{ props }">
        <v-btn
          fab
          dark
          size="small"
          color="secondary"
          v-bind="props"
          @click="$emit('generatePdf')"
        >
          <v-icon>mdi-file-pdf-box</v-icon>
        </v-btn>
      </template>
      <span>{{ generatePdfTooltip }}</span>
    </v-tooltip>
    <v-tooltip
      v-if="isListenausgabe"
      location="left"
    >
      <template #activator="{ props }">
        <v-btn
          fab
          dark
          size="small"
          color="secondary"
          v-bind="props"
          @click="$emit('generateCsv')"
        >
          <v-icon>mdi-file-delimited</v-icon>
        </v-btn>
      </template>
      <span>CSV</span>
    </v-tooltip>
    <v-tooltip location="left">
      <template #activator="{ props }">
        <v-btn
          fab
          dark
          size="small"
          color="secondary"
          v-bind="props"
          @click="$emit('openPdfReportDialog')"
        >
          <v-icon>mdi-file-chart</v-icon>
        </v-btn>
      </template>
      <span>PDF Report Menü öffnen</span>
    </v-tooltip>
    <v-tooltip location="left">
      <template #activator="{ props }">
        <v-btn
          fab
          dark
          size="small"
          color="secondary"
          v-bind="props"
          @click="$emit('addChartToPdfReport')"
        >
          <v-icon>mdi-chart-box-plus-outline</v-icon>
        </v-btn>
      </template>
      <span>{{ addChartToReportTooltip }}</span>
    </v-tooltip>
    <v-tooltip
      v-if="!isListenausgabe"
      location="left"
    >
      <template #activator="{ props }">
        <v-btn
          fab
          dark
          size="small"
          color="secondary"
          v-bind="props"
          @click="$emit('saveGraphAsImage')"
        >
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </template>
      <span>Graph herunterladen</span>
    </v-tooltip>
  </v-speed-dial>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  isListenausgabe: boolean;
  isNotHeatmap: boolean;
  loadingFile: boolean;
}

const props = defineProps<Props>();

defineEmits<{
  (e: "generatePdf"): void;
  (e: "openPdfReportDialog"): void;
  (e: "generateCsv"): void;
  (e: "addChartToPdfReport"): void;
  (e: "saveGraphAsImage"): void;
}>();

// Fab
const fab = ref(false);

const fabColor = computed(() => {
  return fab.value ? "grey darken-1" : "secondary";
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
