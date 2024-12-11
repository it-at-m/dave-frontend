<template>
  <v-chart
    ref="chart"
    :style="steplineHeightAndWitdh"
    :option="optionsStepline"
    autoresize
    @magictypechanged="$emit('charttypeChanged', $event.currentType)"
  />
</template>

<script setup lang="ts">
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import type StepLineSeriesEntryDTO from "@/types/zaehlung/zaehldaten/StepLineSeriesEntryDTO";

import { BarChart, LineChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from "echarts/components";
// chart
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { isNil } from "lodash";
import { computed, provide, ref, watch } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";
import { useDisplay } from "vuetify";

import ChartUtils from "@/util/ChartUtils";

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
]);

const CHART_STEP_X_AXIS = "middle";
const CHART_TYPE_X_AXIS = "line";
const SYMBOL_SIZE = 5;

provide(THEME_KEY, "default");
interface Props {
  zaehldatenStepline: LadeZaehldatenSteplineDTO;
}

const props = defineProps<Props>();
const chart = ref<InstanceType<typeof VChart> | null>();
defineExpose({
  chart,
});

defineEmits<{
  (e: "charttypeChanged", payload: "line" | "bar"): void;
}>();

const display = useDisplay();
const twoChartsNeeded = ref(false);
const chartLegend = ref<Array<string>>([]);
const rangeMax = ref(0);
const rangeMaxPercent = ref(0);
const xAxisDataFirstChart = ref<Array<string>>([]);
const xAxisDataSecondChart = ref<Array<string>>([]);
const seriesEntriesChart = ref<Array<unknown>>([]);

const steplineHeightAndWitdh = computed(() => {
  let height = "500px";
  if (display.xl.value) {
    height = "800px";
  }
  return `width: 100%; height: ${height}`;
});
const showSecondYAxis = computed(() => {
  return rangeMaxPercent.value > 0;
});
const optionsStepline = computed(() => {
  if (twoChartsNeeded.value) {
    return options2x4.value;
  } else {
    return optionsDefault.value;
  }
});

const optionsDefault = computed(() => {
  return {
    toolbox: {
      showTitle: true,
      orient: "vertical",
      feature: {
        magicType: {
          show: true,
          type: ["line", "bar"],
          title: {
            line: "Linie",
            bar: "Balken",
          },
        },
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params: Array<unknown>) {
        return formatYAxisLabel(params);
      },
    },
    legend: {
      data: chartLegend.value,
      selectedMode: false,
    },
    xAxis: {
      type: "category",
      data: xAxisDataFirstChart.value,
      boundaryGap: true,
      splitArea: {
        show: true,
      },
    },
    yAxis: [
      {
        name: "Fahrzeuge",
        min: 0,
        max: rangeMax.value,
        type: "value",
        axisLabel: {
          formatter: function (value: number) {
            return value.toLocaleString();
          },
        },
        axisLine: {
          show: true,
        },
      },
      {
        type: "value",
        name: "in Prozent",
        show: showSecondYAxis.value,
        min: 0,
        max: rangeMaxPercent.value,
        axisLabel: {
          formatter: function (value: number) {
            return `${value.toLocaleString()} %`;
          },
        },
        axisLine: {
          show: true,
        },
      },
    ],
    series: seriesEntriesChart.value,
  };
});

const options2x4 = computed(() => {
  return {
    toolbox: {
      showTitle: true,
      orient: "vertical",
      feature: {
        magicType: {
          show: true,
          type: ["line", "bar"],
          title: {
            line: "Linie",
            bar: "Balken",
          },
        },
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params: Array<unknown>) {
        return formatYAxisLabel(params);
      },
    },
    legend: {
      data: chartLegend.value,
      selectedMode: false,
    },
    grid: [
      {
        right: "55%",
      },
      {
        left: "55%",
      },
    ],
    xAxis: [
      {
        type: "category",
        data: xAxisDataFirstChart.value,
        boundaryGap: true,
        splitArea: {
          show: true,
        },
      },
      {
        type: "category",
        data: xAxisDataSecondChart.value,
        boundaryGap: true,
        splitArea: {
          show: true,
        },
        gridIndex: 1,
      },
    ],
    yAxis: [
      {
        name: "Fahrzeuge",
        min: 0,
        max: rangeMax.value,
        type: "value",
        axisLabel: {
          formatter: function (value: number) {
            return value.toLocaleString();
          },
        },
        axisLine: {
          show: true,
        },
      },
      {
        type: "value",
        name: "in Prozent",
        show: showSecondYAxis.value,
        min: 0,
        max: rangeMaxPercent.value,
        axisLabel: {
          formatter: function (value: number) {
            return `${value.toLocaleString()} %`;
          },
        },
        axisLine: {
          show: true,
        },
      },
      {
        name: "Fahrzeuge",
        min: 0,
        max: rangeMax.value,
        type: "value",
        axisLabel: {
          formatter: function (value: number) {
            return value.toLocaleString();
          },
        },
        axisLine: {
          show: true,
        },
        gridIndex: 1,
      },
      {
        type: "value",
        name: "in Prozent",
        show: showSecondYAxis.value,
        min: 0,
        max: rangeMaxPercent.value,
        axisLabel: {
          formatter: function (value: number) {
            return `${value.toLocaleString()} %`;
          },
        },
        axisLine: {
          show: true,
        },
        gridIndex: 1,
      },
    ],
    series: seriesEntriesChart.value,
  };
});

function checkTwoChartsNeeded(
  zaehldatenStepline: LadeZaehldatenSteplineDTO
): boolean {
  return (
    zaehldatenStepline.xaxisDataSecondChart !== null &&
    zaehldatenStepline.seriesEntriesSecondChart !== null
  );
}

function createSeriesDataForChart(
  seriesEntriesChart: Array<StepLineSeriesEntryDTO>
): Array<unknown> {
  const seriesEntries: Array<unknown> = [];
  seriesEntriesChart.forEach((seriesEntryChart) => {
    if (
      seriesEntryChart.name === ChartUtils.LEGEND_ENTRY_GV_ANTEIL_PROZENT ||
      seriesEntryChart.name === ChartUtils.LEGEND_ENTRY_SV_ANTEIL_PROZENT
    ) {
      seriesEntries.push({
        name: seriesEntryChart.name,
        type: CHART_TYPE_X_AXIS,
        data: seriesEntryChart.yaxisData,
        xAxisIndex: seriesEntryChart.xaxisIndex,
        yAxisIndex: seriesEntryChart.yaxisIndex,
        symbol: ChartUtils.CHART_SYMBOLS.get(seriesEntryChart.name),
        symbolSize: SYMBOL_SIZE,
        color: ChartUtils.CHART_COLOR.get(seriesEntryChart.name),
      });
    } else {
      seriesEntries.push({
        name: seriesEntryChart.name,
        type: CHART_TYPE_X_AXIS,
        step: CHART_STEP_X_AXIS,
        data: seriesEntryChart.yaxisData,
        xAxisIndex: seriesEntryChart.xaxisIndex,
        yAxisIndex: seriesEntryChart.yaxisIndex,
        symbol: ChartUtils.CHART_SYMBOLS.get(seriesEntryChart.name),
        symbolSize: SYMBOL_SIZE,
        color: ChartUtils.CHART_COLOR.get(seriesEntryChart.name),
      });
    }
  });
  return seriesEntries;
}

function resetData(): void {
  twoChartsNeeded.value = false;
  chartLegend.value = [];
  rangeMax.value = 0;
  rangeMaxPercent.value = 0;
  xAxisDataFirstChart.value = [];
  xAxisDataSecondChart.value = [];
  seriesEntriesChart.value = [];
}

function formatYAxisLabel(params: Array<any>): string {
  let text = "";
  if (params.length > 0) {
    text += `${params[0].name} <br/>`;
  }
  params.forEach((value) => {
    const data = isNil(value.data) ? "" : value.data.toLocaleString();
    if (value.seriesName.trim().endsWith("%")) {
      text += `<span style="color:${value.color}">\u25CF</span> ${
        value.seriesName
      }: ${data.toLocaleString()}%<br/>`;
    } else {
      text += `<span style="color:${value.color}">\u25CF</span> ${
        value.seriesName
      }: ${data.toLocaleString()}<br/>`;
    }
  });
  return text;
}

watch(
  () => props.zaehldatenStepline,
  (zaehldatenStepline: LadeZaehldatenSteplineDTO) => {
    resetData();
    twoChartsNeeded.value = checkTwoChartsNeeded(zaehldatenStepline);
    chartLegend.value = zaehldatenStepline.legend;
    rangeMax.value = zaehldatenStepline.rangeMax;
    rangeMaxPercent.value = zaehldatenStepline.rangeMaxPercent;
    xAxisDataFirstChart.value = zaehldatenStepline.xaxisDataFirstChart;
    if (zaehldatenStepline.xaxisDataSecondChart !== null) {
      xAxisDataSecondChart.value = zaehldatenStepline.xaxisDataSecondChart;
    }
    if (zaehldatenStepline.seriesEntriesSecondChart !== null) {
      seriesEntriesChart.value = createSeriesDataForChart([
        ...zaehldatenStepline.seriesEntriesFirstChart,
        ...zaehldatenStepline.seriesEntriesSecondChart,
      ]);
    } else {
      seriesEntriesChart.value = createSeriesDataForChart(
        zaehldatenStepline.seriesEntriesFirstChart
      );
    }
  },
  { immediate: true }
);
</script>
