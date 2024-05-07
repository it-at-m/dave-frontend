<template>
    <v-card
        elevation="0"
        class="pt-5"
    >
        <step-line
            :zaehldaten-stepline="zaehldatenStepline"
            @charttypeChanged="charttypeChanged"
        />
        <!--  Dieses Diagramm soll der Benutzer nicht zu sehen bekommen, es dient nur zum PDF-Druck, die Groesse des Diagramms
      wird beim mounten der Seite fix festgelegt -->
        <step-line
            ref="steplineForPdf"
            style="display: none"
            :zaehldaten-stepline="zaehldatenStepline"
        />
    </v-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import StepLine from "@/components/zaehlstelle/charts/StepLineChart.vue";
import StepLineChart from "@/components/zaehlstelle/charts/StepLineChart.vue";
import LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import { ResizeOpts } from "echarts/core";
import { SeriesOption } from "echarts";

interface Props {
    zaehldatenStepline: LadeZaehldatenSteplineDTO;
}

defineProps<Props>();

const steplineForPdf = ref<InstanceType<typeof StepLineChart> | null>();
defineExpose({
    steplineForPdf,
});
onMounted(() => {
    // Der steplineForPdf Graph soll immer gleich gross sein, damit er im PDF gut aussieht und nicht abgeschnitten wird
    let chartOptions = {} as ResizeOpts;
    chartOptions.width = 900;
    chartOptions.height = 430;
    chartOptions.silent = true;
    steplineForPdf?.value?.chart?.resize(chartOptions);
});

function charttypeChanged(newChartType: "line" | "bar") {
    (
        steplineForPdf?.value?.chart?.option?.series as Array<SeriesOption>
    ).forEach((series: SeriesOption) => {
        series.type = newChartType;
    });
}
</script>
