<template>
    <v-card
        elevation="0"
        class="pt-5"
    >
        <heatmap-chart :zaehldaten-heatmap="zaehldatenHeatmap"></heatmap-chart>
        <!--  Dieses Diagramm soll der Benutzer nicht zu sehen bekommen, es dient nur zum PDF-Druck, die Groesse des Diagramms
      wird beim mounten der Seite fix festgelegt -->
        <heatmap-chart
            ref="heatmapChart"
            style="display: none"
            :zaehldaten-heatmap="zaehldatenHeatmap"
        ></heatmap-chart>
    </v-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import HeatmapChart from "@/components/zaehlstelle/charts/HeatmapChart.vue";
import type LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import type { ResizeOpts } from "echarts/core";

interface Props {
    zaehldatenHeatmap: LadeZaehldatenHeatmapDTO;
}

defineProps<Props>();

const heatmapChart = ref<InstanceType<typeof HeatmapChart> | null>();
defineExpose({
    heatmapChart,
});
onMounted(() => {
    // Die Heatmap soll immer gleich gross sein, damit er im PDF gut aussieht und nicht abgeschnitten wird
    let chartOptions = {} as ResizeOpts;
    chartOptions.width = 1350;
    chartOptions.height = 500;
    chartOptions.silent = true;
    heatmapChart?.value?.chart?.resize(chartOptions);
});
</script>