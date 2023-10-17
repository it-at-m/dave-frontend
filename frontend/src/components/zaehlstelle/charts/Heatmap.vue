<template>
    <chart
        ref="chart"
        :style="heatmapHeightAndWidth"
        :option="optionsHeatmap"
        autoresize
    />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Provide, Ref, Watch } from "vue-property-decorator";

// chart
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { HeatmapChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
    VisualMapComponent,
    GridComponent,
} from "echarts/components";
import Chart, { THEME_KEY } from "vue-echarts";
// import "echarts/lib/chart/heatmap";
// import "echarts/lib/component/tooltip";
// import "echarts/lib/component/grid";
// import "echarts/lib/component/visualMap";
// import "echarts/lib/component/toolbox";
// eslint-disable-next-line no-unused-vars
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";

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

@Component({
    components: { Chart },
})
export default class Heatmap extends Vue {
    private static readonly HEIGHT_PERCENTAGE_SINGLE_ENTRY_Y_AXIS: number = 6;

    @Prop()
    private zaehldatenHeatmap!: LadeZaehldatenHeatmapDTO;

    @Ref("chart") readonly chart!: any;

    @Provide() [THEME_KEY] = "dark";

    private twoChartsNeeded = false;

    private chartLegend: Array<string> = [];

    private xAxisDataFirstChart: Array<string> = [];

    private xAxisDataSecondChart: Array<string> = [];

    private seriesEntriesFirstChart: Array<Array<number>> = [];

    private seriesEntriesSecondChart: Array<Array<number>> = [];

    private rangeMin = 0;

    private rangeMax = 0;

    // Computed properties
    get heatmapHeightAndWidth() {
        let height = "500px";
        if (this.$vuetify.breakpoint.xl) {
            height = "800px";
        }
        return `width: 100%; height: ${height}`;
    }

    get gridHeight() {
        let gridHeight = "50%";
        if (this.chartLegend.length !== 0) {
            gridHeight =
                this.chartLegend.length *
                    Heatmap.HEIGHT_PERCENTAGE_SINGLE_ENTRY_Y_AXIS +
                "%";
        }
        return gridHeight;
    }

    get optionsHeatmap() {
        if (this.twoChartsNeeded) {
            return this.options2x4;
        } else {
            return this.optionsDefault;
        }
    }

    get optionsDefault() {
        /* eslint-disable @typescript-eslint/no-this-alias */
        const that = this;
        return {
            tooltip: {
                position: "top",
                formatter: function (value: any) {
                    return that.formatYAxisLabel(value);
                },
            },
            animation: false,
            grid: {
                height: this.gridHeight,
                top: "10%",
                left: "200",
            },
            xAxis: {
                type: "category",
                data: this.xAxisDataFirstChart,
                splitArea: {
                    show: true,
                },
            },
            yAxis: {
                type: "category",
                data: this.chartLegend,
                splitArea: {
                    show: true,
                },
            },
            visualMap: {
                min: this.rangeMin,
                max: this.rangeMax,
                calculable: true,
                orient: "horizontal",
                left: "center",
                top: "0%",
            },
            series: [
                {
                    type: "heatmap",
                    data: this.seriesEntriesFirstChart,
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
    }

    get options2x4() {
        const that = this; /* eslint-disable @typescript-eslint/no-this-alias */
        return {
            tooltip: {
                position: "top",
                formatter: function (value: any) {
                    return that.formatYAxisLabel(value);
                },
            },
            animation: false,
            grid: [
                {
                    height: this.gridHeight,
                    top: "10%",
                    right: "55%",
                },
                {
                    height: this.gridHeight,
                    top: "10%",
                    left: "55%",
                },
            ],
            xAxis: [
                {
                    type: "category",
                    data: this.xAxisDataFirstChart,
                    gridIndex: 0,
                    splitArea: {
                        show: true,
                    },
                },
                {
                    type: "category",
                    data: this.xAxisDataSecondChart,
                    gridIndex: 1,
                    splitArea: {
                        show: true,
                    },
                },
            ],
            yAxis: [
                {
                    type: "category",
                    data: this.chartLegend,
                    gridIndex: 0,
                    splitArea: {
                        show: true,
                    },
                },
                {
                    type: "category",
                    data: this.chartLegend,
                    gridIndex: 1,
                    splitArea: {
                        show: true,
                    },
                },
            ],
            visualMap: {
                min: this.rangeMin,
                max: this.rangeMax,
                calculable: true,
                orient: "horizontal",
                left: "center",
                top: "0%",
            },
            series: [
                {
                    type: "heatmap",
                    data: this.seriesEntriesFirstChart,
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
                    data: this.seriesEntriesSecondChart,
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
    }

    private checkTwoChartsNeeded(
        zaehldatenHeatmap: LadeZaehldatenHeatmapDTO
    ): boolean {
        return (
            zaehldatenHeatmap.xaxisDataSecondChart !== null &&
            zaehldatenHeatmap.seriesEntriesSecondChart !== null
        );
    }

    //Watcher
    @Watch("zaehldatenHeatmap", { immediate: true })
    private createHeatmapData(
        zaehldatenHeatmap: LadeZaehldatenHeatmapDTO
    ): void {
        this.resetData();
        this.twoChartsNeeded = this.checkTwoChartsNeeded(zaehldatenHeatmap);
        this.chartLegend = zaehldatenHeatmap.legend;
        this.xAxisDataFirstChart = zaehldatenHeatmap.xaxisDataFirstChart;
        if (zaehldatenHeatmap.xaxisDataSecondChart !== null) {
            this.xAxisDataSecondChart = zaehldatenHeatmap.xaxisDataSecondChart;
        }
        this.seriesEntriesFirstChart =
            zaehldatenHeatmap.seriesEntriesFirstChart;
        if (zaehldatenHeatmap.seriesEntriesSecondChart !== null) {
            this.seriesEntriesSecondChart =
                zaehldatenHeatmap.seriesEntriesSecondChart;
        }
        this.rangeMin = zaehldatenHeatmap.rangeMin;
        this.rangeMax = zaehldatenHeatmap.rangeMax;
    }

    private resetData(): void {
        this.chartLegend = [];
        this.xAxisDataFirstChart = [];
        this.xAxisDataSecondChart = [];
        this.seriesEntriesFirstChart = [];
        this.seriesEntriesSecondChart = [];
        this.rangeMin = 0;
        this.rangeMax = 0;
    }

    private formatYAxisLabel(value: any): string {
        return `<span style="color:${value.color}">\u25CF</span> ${
            value.name
        }: ${value.data[2].toLocaleString()}<br/>`;
    }
}
</script>