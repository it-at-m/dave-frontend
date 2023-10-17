<template>
    <chart
        ref="chart"
        :style="steplineHeightAndWitdh"
        :option="optionsStepline"
        autoresize
        @magictypechanged="switchChartType"
    />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Provide, Ref, Watch } from "vue-property-decorator";
// chart
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, BarChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
    GridComponent,
} from "echarts/components";
import Chart, { THEME_KEY } from "vue-echarts";

/* eslint-disable no-unused-vars */
import LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import StepLineSeriesEntryDTO from "@/types/zaehlung/zaehldaten/StepLineSeriesEntryDTO";
import ChartUtils from "@/util/ChartUtils";
/* eslint-enable no-unused-vars */

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

@Component({
    components: { Chart },
})
export default class StepLine extends Vue {
    private static readonly CHART_STEP_X_AXIS: string = "middle";
    private static readonly CHART_TYPE_X_AXIS: string = "line";
    private static readonly SYMBOL_SIZE: number = 5;

    @Provide() [THEME_KEY] = "default";

    @Ref("container")
    private readonly container!: HTMLDivElement;

    @Ref("chart") readonly chart!: any;

    @Prop()
    private zaehldatenStepline!: LadeZaehldatenSteplineDTO;

    private twoChartsNeeded = false;

    private chartLegend: Array<string> = [];

    private rangeMax = 0;

    private rangeMaxPercent = 0;

    private xAxisDataFirstChart: Array<string> = [];

    private xAxisDataSecondChart: Array<string> = [];

    private seriesEntriesChart: any[] = [];

    // Computed properties
    get steplineHeightAndWitdh() {
        let height = "500px";
        if (this.$vuetify.breakpoint.xl) {
            height = "800px";
        }
        return `width: 100%; height: ${height}`;
    }

    get legend() {
        return this.chartLegend;
    }

    get rangeMaxYAxis() {
        return this.rangeMax;
    }

    get rangeMaxYAxisPercent() {
        return this.rangeMaxPercent;
    }

    get showSecondYAxis() {
        return this.rangeMaxYAxisPercent > 0;
    }

    get firstChartXAxisData() {
        return this.xAxisDataFirstChart;
    }

    get secondChartXAxisData() {
        return this.xAxisDataSecondChart;
    }

    get seriesEntriesDataChart() {
        return this.seriesEntriesChart;
    }

    get areTwoChartsNeeded() {
        return this.twoChartsNeeded;
    }

    get optionsStepline() {
        if (this.areTwoChartsNeeded) {
            return this.options2x4;
        } else {
            return this.optionsDefault;
        }
    }

    get optionsDefault() {
        /* eslint-disable @typescript-eslint/no-this-alias */
        const that = this;
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
                formatter: function (params: any[]) {
                    return that.formatYAxisLabel(params);
                },
            },
            legend: {
                data: this.legend,
                selectedMode: false,
            },
            xAxis: {
                type: "category",
                data: this.firstChartXAxisData,
                boundaryGap: true,
                splitArea: {
                    show: true,
                },
            },
            yAxis: [
                {
                    name: "Fahrzeuge",
                    min: 0,
                    max: this.rangeMaxYAxis,
                    type: "value",
                    axisLabel: {
                        formatter: function (value: number) {
                            return value.toLocaleString();
                        },
                    },
                },
                {
                    type: "value",
                    name: "in Prozent",
                    show: this.showSecondYAxis,
                    min: 0,
                    max: this.rangeMaxYAxisPercent,
                    axisLabel: {
                        formatter: function (value: number) {
                            return `${value.toLocaleString()} %`;
                        },
                    },
                },
            ],
            series: this.seriesEntriesDataChart,
        };
    }

    get options2x4() {
        const that = this; /* eslint-disable @typescript-eslint/no-this-alias */
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
                formatter: function (params: any[]) {
                    return that.formatYAxisLabel(params);
                },
            },
            legend: {
                data: this.legend,
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
                    data: this.firstChartXAxisData,
                    boundaryGap: true,
                    splitArea: {
                        show: true,
                    },
                },
                {
                    type: "category",
                    data: this.secondChartXAxisData,
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
                    max: this.rangeMaxYAxis,
                    type: "value",
                    axisLabel: {
                        formatter: function (value: number) {
                            return value.toLocaleString();
                        },
                    },
                },
                {
                    type: "value",
                    name: "in Prozent",
                    show: this.showSecondYAxis,
                    min: 0,
                    max: this.rangeMaxYAxisPercent,
                    axisLabel: {
                        formatter: function (value: number) {
                            return `${value.toLocaleString()} %`;
                        },
                    },
                },
                {
                    name: "Fahrzeuge",
                    min: 0,
                    max: this.rangeMaxYAxis,
                    type: "value",
                    axisLabel: {
                        formatter: function (value: number) {
                            return value.toLocaleString();
                        },
                    },
                    gridIndex: 1,
                },
                {
                    type: "value",
                    name: "in Prozent",
                    show: this.showSecondYAxis,
                    min: 0,
                    max: this.rangeMaxYAxisPercent,
                    axisLabel: {
                        formatter: function (value: number) {
                            return `${value.toLocaleString()} %`;
                        },
                    },
                    gridIndex: 1,
                },
            ],
            series: this.seriesEntriesDataChart,
        };
    }

    //Watcher
    @Watch("zaehldatenStepline", { immediate: true })
    private setDataForChart(zaehldatenStepline: LadeZaehldatenSteplineDTO) {
        this.resetData();
        this.twoChartsNeeded = this.checkTwoChartsNeeded(zaehldatenStepline);
        this.chartLegend = zaehldatenStepline.legend;
        this.rangeMax = zaehldatenStepline.rangeMax;
        this.rangeMaxPercent = zaehldatenStepline.rangeMaxPercent;
        this.xAxisDataFirstChart = zaehldatenStepline.xaxisDataFirstChart;
        if (zaehldatenStepline.xaxisDataSecondChart !== null) {
            this.xAxisDataSecondChart = zaehldatenStepline.xaxisDataSecondChart;
        }
        if (zaehldatenStepline.seriesEntriesSecondChart !== null) {
            this.seriesEntriesChart = this.createSeriesDataForChart([
                ...zaehldatenStepline.seriesEntriesFirstChart,
                ...zaehldatenStepline.seriesEntriesSecondChart,
            ]);
        } else {
            this.seriesEntriesChart = this.createSeriesDataForChart(
                zaehldatenStepline.seriesEntriesFirstChart
            );
        }
    }

    private checkTwoChartsNeeded(
        zaehldatenStepline: LadeZaehldatenSteplineDTO
    ): boolean {
        return (
            zaehldatenStepline.xaxisDataSecondChart !== null &&
            zaehldatenStepline.seriesEntriesSecondChart !== null
        );
    }

    private createSeriesDataForChart(
        seriesEntriesChart: Array<StepLineSeriesEntryDTO>
    ): any[] {
        let seriesEntries: any[] = [];
        seriesEntriesChart.forEach((seriesEntryChart) => {
            if (
                seriesEntryChart.name ===
                    ChartUtils.LEGEND_ENTRY_GV_ANTEIL_PROZENT ||
                seriesEntryChart.name ===
                    ChartUtils.LEGEND_ENTRY_SV_ANTEIL_PROZENT
            ) {
                seriesEntries.push({
                    name: seriesEntryChart.name,
                    type: StepLine.CHART_TYPE_X_AXIS,
                    data: seriesEntryChart.yaxisData,
                    xAxisIndex: seriesEntryChart.xaxisIndex,
                    yAxisIndex: seriesEntryChart.yaxisIndex,
                    symbol: ChartUtils.CHART_SYMBOLS.get(seriesEntryChart.name),
                    symbolSize: StepLine.SYMBOL_SIZE,
                    color: ChartUtils.CHART_COLOR.get(seriesEntryChart.name),
                });
            } else {
                seriesEntries.push({
                    name: seriesEntryChart.name,
                    type: StepLine.CHART_TYPE_X_AXIS,
                    step: StepLine.CHART_STEP_X_AXIS,
                    data: seriesEntryChart.yaxisData,
                    xAxisIndex: seriesEntryChart.xaxisIndex,
                    yAxisIndex: seriesEntryChart.yaxisIndex,
                    symbol: ChartUtils.CHART_SYMBOLS.get(seriesEntryChart.name),
                    symbolSize: StepLine.SYMBOL_SIZE,
                    color: ChartUtils.CHART_COLOR.get(seriesEntryChart.name),
                });
            }
        });
        return seriesEntries;
    }

    private resetData(): void {
        this.twoChartsNeeded = false;
        this.chartLegend = [];
        this.rangeMax = 0;
        this.rangeMaxPercent = 0;
        this.xAxisDataFirstChart = [];
        this.xAxisDataSecondChart = [];
        this.seriesEntriesChart = [];
    }

    private formatYAxisLabel(params: any[]): string {
        let text = "";
        if (params.length > 0) {
            text += `${params[0].name} <br/>`;
        }
        params.forEach((value) => {
            if (value.seriesName.trim().endsWith("%")) {
                text += `<span style="color:${value.color}">\u25CF</span> ${
                    value.seriesName
                }: ${value.data.toLocaleString()}%<br/>`;
            } else {
                text += `<span style="color:${value.color}">\u25CF</span> ${
                    value.seriesName
                }: ${value.data.toLocaleString()}<br/>`;
            }
        });
        return text;
    }

    switchChartType(event: any) {
        this.$emit("charttypeChanged", event.currentType);
    }
}
</script>
