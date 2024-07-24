<template>
    <v-speed-dial
        v-model="speedDialOpen"
        location="top"
        open-on-hover
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
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
            key="speedDial"
        />
      </template>
      <v-btn
        v-if="isNotHeatmap"
        v-tooltip:start="generatePdfTooltip"
        key="generatePdfButton"
        size="small"
        color="secondary"
        icon="mdi-file-pdf-box"
        @click="$emit('generatePdf')"
      />
      <v-btn
          v-if="isListenausgabe"
          v-tooltip:start="'CSV'"
          key="generatecsvButton"
          size="small"
          color="secondary"
          icon="mdi-file-delimited"
          @click="$emit('generateCsv')"
      />
      <v-btn
          v-tooltip:start="'PDF Report Menü öffnen'"
          key="openPdfReportDialogButton"
          size="small"
          color="secondary"
          icon="mdi-file-chart"
          @click="$emit('openPdfReportDialog')"
      />
      <v-btn
          v-tooltip:start="addChartToReportTooltip"
          key="addChartToPdfReportButton"
          size="small"
          color="secondary"
          icon="mdi-chart-box-plus-outline"
          @click="$emit('addChartToPdfReport')"
      />
      <v-btn
        v-if="!isListenausgabe"
        v-tooltip:start="'Graph herunterladen'"
        key="saveGraphAsImageButton"
        size="small"
        color="secondary"
        icon="mdi-download"
        @click="$emit('saveGraphAsImage')"
      />
    </v-speed-dial>
</template>
<script setup lang="ts">
import {computed, ref} from "vue";

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