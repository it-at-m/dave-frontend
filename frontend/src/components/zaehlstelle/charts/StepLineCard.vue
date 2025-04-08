<template>
  <v-card
    elevation="0"
    class="pt-5"
  >
    <step-line-chart
      :zaehldaten-stepline="zaehldatenStepline"
      :is-gesamt-auswertung="isGesamtAuswertung"
      @charttype-changed="charttypeChanged"
    />
    <!--  Dieses Diagramm soll der Benutzer nicht zu sehen bekommen, es dient nur zum PDF-Druck, die Groesse des Diagramms
      wird beim mounten der Seite fix festgelegt -->
    <step-line-chart
      ref="steplineForPdf"
      style="display: none"
      :zaehldaten-stepline="zaehldatenStepline"
      :is-gesamt-auswertung="isGesamtAuswertung"
    />
  </v-card>
</template>
<script setup lang="ts">
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import type { SeriesOption } from "echarts";
import type { ResizeOpts } from "echarts/core";

import { onMounted, ref } from "vue";

import StepLineChart from "@/components/zaehlstelle/charts/StepLineChart.vue";

interface Props {
  zaehldatenStepline: LadeZaehldatenSteplineDTO;
  isGesamtAuswertung?: boolean;
}

withDefaults(defineProps<Props>(), {
  isGesamtAuswertung: false,
});

const steplineForPdf = ref<InstanceType<typeof StepLineChart> | null>();
defineExpose({
  steplineForPdf,
});
onMounted(() => {
  // Der steplineForPdf Graph soll immer gleich gross sein, damit er im PDF gut aussieht und nicht abgeschnitten wird
  const chartOptions = {} as ResizeOpts;
  chartOptions.width = 900;
  chartOptions.height = 430;
  chartOptions.silent = true;
  steplineForPdf?.value?.chart?.resize(chartOptions);
});

function charttypeChanged(newChartType: "line" | "bar") {
  (steplineForPdf?.value?.chart?.option?.series as Array<SeriesOption>).forEach(
    (series: SeriesOption) => {
      series.type = newChartType;
    }
  );
}
</script>
