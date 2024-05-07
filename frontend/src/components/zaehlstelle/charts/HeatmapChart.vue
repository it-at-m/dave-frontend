<template>
    <v-chart
        ref="chart"
        :style="heatmapHeightAndWidth"
        :option="optionsHeatmap"
        autoresize
    />
</template>

<script setup lang="ts">
import { computed, provide, Ref, ref, watch } from "vue";

// chart
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { HeatmapChart } from "echarts/charts";
import {
    GridComponent,
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    VisualMapComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import { useVuetify } from "@/util/useVuetify";

use([
    CanvasRenderer,
    HeatmapChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
    VisualMapComponent,
    GridComponent,
]);

const HEIGHT_PERCENTAGE_SINGLE_ENTRY_Y_AXIS = 6;

provide(THEME_KEY, "default");
interface Props {
    zaehldatenHeatmap: LadeZaehldatenHeatmapDTO;
}

const props = defineProps<Props>();
const chart = ref<InstanceType<typeof VChart> | null>();
defineExpose({
    chart,
});

const vuetify = useVuetify();
const twoChartsNeeded: Ref<boolean> = ref(false);
const chartLegend: Ref<Array<string>> = ref([]);
const xAxisDataFirstChart: Ref<Array<string>> = ref([]);
const xAxisDataSecondChart: Ref<Array<string>> = ref([]);
const seriesEntriesFirstChart: Ref<Array<Array<number>>> = ref([]);
const seriesEntriesSecondChart: Ref<Array<Array<number>>> = ref([]);
const rangeMin: Ref<number> = ref(0);
const rangeMax: Ref<number> = ref(0);

function formatYAxisLabel(value: any): string {
    return `<span style="color:${value.color}">\u25CF</span> ${
        value.name
    }: ${value.data[2].toLocaleString()}<br/>`;
}

function checkTwoChartsNeeded(
    zaehldatenHeatmap: LadeZaehldatenHeatmapDTO
): boolean {
    return (
        zaehldatenHeatmap.xaxisDataSecondChart !== null &&
        zaehldatenHeatmap.seriesEntriesSecondChart !== null
    );
}

function resetData(): void {
    chartLegend.value = [];
    xAxisDataFirstChart.value = [];
    xAxisDataSecondChart.value = [];
    seriesEntriesFirstChart.value = [];
    seriesEntriesSecondChart.value = [];
    rangeMin.value = 0;
    rangeMax.value = 0;
}

const heatmapHeightAndWidth = computed(() => {
    let height = "500px";
    if (vuetify.breakpoint.xl) {
        height = "800px";
    }
    return `width: 100%; height: ${height}`;
});
const gridHeight = computed(() => {
    let gridHeight = "50%";
    if (chartLegend.value.length !== 0) {
        gridHeight =
            chartLegend.value.length * HEIGHT_PERCENTAGE_SINGLE_ENTRY_Y_AXIS +
            "%";
    }
    return gridHeight;
});
const optionsHeatmap = computed(() => {
    if (twoChartsNeeded.value) {
        return options2x4.value;
    } else {
        return optionsDefault.value;
    }
});
const optionsDefault = computed(() => {
    return {
        tooltip: {
            position: "top",
            formatter: function (value: unknown) {
                return formatYAxisLabel(value);
            },
        },
        animation: false,
        grid: {
            height: gridHeight.value,
            top: "10%",
            left: "200",
        },
        xAxis: {
            type: "category",
            data: xAxisDataFirstChart.value,
            splitArea: {
                show: true,
            },
        },
        yAxis: {
            type: "category",
            data: chartLegend.value,
            splitArea: {
                show: true,
            },
        },
        visualMap: {
            min: rangeMin.value,
            max: rangeMax.value,
            calculable: true,
            orient: "horizontal",
            left: "center",
            top: "0%",
        },
        series: [
            {
                type: "heatmap",
                data: seriesEntriesFirstChart.value,
                label: {
                    show: false,
                },
                markPoint: {
                    label: {
                        show: false,
                    },
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    };
});
const options2x4 = computed(() => {
    return {
        tooltip: {
            position: "top",
            formatter: function (value: unknown) {
                return formatYAxisLabel(value);
            },
        },
        animation: false,
        grid: [
            {
                height: gridHeight.value,
                top: "10%",
                right: "55%",
            },
            {
                height: gridHeight.value,
                top: "10%",
                left: "55%",
            },
        ],
        xAxis: [
            {
                type: "category",
                data: xAxisDataFirstChart.value,
                gridIndex: 0,
                splitArea: {
                    show: true,
                },
            },
            {
                type: "category",
                data: xAxisDataSecondChart.value,
                gridIndex: 1,
                splitArea: {
                    show: true,
                },
            },
        ],
        yAxis: [
            {
                type: "category",
                data: chartLegend.value,
                gridIndex: 0,
                splitArea: {
                    show: true,
                },
            },
            {
                type: "category",
                data: chartLegend.value,
                gridIndex: 1,
                splitArea: {
                    show: true,
                },
            },
        ],
        visualMap: {
            min: rangeMin.value,
            max: rangeMax.value,
            calculable: true,
            orient: "horizontal",
            left: "center",
            top: "0%",
        },
        series: [
            {
                type: "heatmap",
                data: seriesEntriesFirstChart.value,
                xAxisIndex: 0,
                yAxisIndex: 0,
                label: {
                    show: false,
                },
                markPoint: {
                    label: {
                        show: false,
                    },
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
            {
                type: "heatmap",
                data: seriesEntriesSecondChart.value,
                xAxisIndex: 1,
                yAxisIndex: 1,
                label: {
                    show: false,
                },
                markPoint: {
                    label: {
                        show: false,
                    },
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    };
});

watch(
    () => props.zaehldatenHeatmap,
    (zaehldatenHeatmap: LadeZaehldatenHeatmapDTO) => {
        resetData();
        twoChartsNeeded.value = checkTwoChartsNeeded(zaehldatenHeatmap);
        chartLegend.value = zaehldatenHeatmap.legend;
        xAxisDataFirstChart.value = zaehldatenHeatmap.xaxisDataFirstChart;
        if (zaehldatenHeatmap.xaxisDataSecondChart !== null) {
            xAxisDataSecondChart.value = zaehldatenHeatmap.xaxisDataSecondChart;
        }
        seriesEntriesFirstChart.value =
            zaehldatenHeatmap.seriesEntriesFirstChart;
        if (zaehldatenHeatmap.seriesEntriesSecondChart !== null) {
            seriesEntriesSecondChart.value =
                zaehldatenHeatmap.seriesEntriesSecondChart;
        }
        rangeMin.value = zaehldatenHeatmap.rangeMin;
        rangeMax.value = zaehldatenHeatmap.rangeMax;
    },
    { immediate: true }
);
</script>