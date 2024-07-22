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
        <v-tooltip
            v-if="isNotHeatmap"
            location="left"
            key="tooltipGeneratePdf"
        >
            <template #activator="{ props }">
                <v-btn
                    v-bind="props"
                    key="generatePdfButton"
                    size="small"
                    color="secondary"
                    icon="mdi-file-pdf-box"
                    @click="$emit('generatePdf')"
                />
            </template>
            <span>{{ generatePdfTooltip }}</span>
        </v-tooltip>
        <v-tooltip
            v-if="isListenausgabe"
            location="left"
            key="tooltipGenerateCsv"
        >
            <template #activator="{ props }">
                <v-btn
                    v-bind="props"
                    key="generatecsvButton"
                    size="small"
                    color="secondary"
                    icon="mdi-file-delimited"
                    @click="$emit('generateCsv')"
                >
                </v-btn>
            </template>
            <span>CSV</span>
        </v-tooltip>
        <v-tooltip localtion="left" key="tooltipOpenPdfReportDialog">
            <template #activator="{ props }">
                <v-btn
                    v-bind="props"
                    key="openPdfReportDialogButton"
                    size="small"
                    color="secondary"
                    icon="mdi-file-chart"
                    @click="$emit('openPdfReportDialog')"
                >
                </v-btn>
            </template>
            <span>PDF Report Menü öffnen</span>
        </v-tooltip>
        <v-tooltip location="left" key="tooltipAddChartToPdfReport">
            <template #activator="{ props }">
                <v-btn
                    v-bind="props"
                    key="addChartToPdfReportButton"
                    size="small"
                    color="secondary"
                    icon="mdi-chart-box-plus-outline"
                    @click="$emit('addChartToPdfReport')"
                >
                </v-btn>
            </template>
            <span>{{ addChartToReportTooltip }}</span>
        </v-tooltip>
        <v-tooltip
            v-if="!isListenausgabe"
            location="left"
            key="tooltipSaveGraphAsImage"
        >
            <template #activator="{ props }">
                <v-btn
                    v-bind="props"
                    key="saveGraphAsImageButton"
                    size="small"
                    color="secondary"
                    icon="mdi-download"
                    @click="$emit('saveGraphAsImage')"
                >
                </v-btn>
            </template>
            <span>Graph herunterladen</span>
        </v-tooltip>
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
    return speedDialOpen.value ? "grey darken-1" : "secondary";
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