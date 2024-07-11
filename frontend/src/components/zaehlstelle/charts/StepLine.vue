<template>
    <v-chart
        ref="chart"
        :style="steplineHeightAndWitdh"
        :options="optionsStepline"
        autoresize
        @magictypechanged="switchChartType"
    />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
// chart
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/grid";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";

/* eslint-disable no-unused-vars */
import LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import StepLineSeriesEntryDTO from "@/types/zaehlung/zaehldaten/StepLineSeriesEntryDTO";
/* eslint-enable no-unused-vars */

@Component
export default class StepLine extends Vue {
    private static readonly CHART_STEP_X_AXIS: string = "middle";
    private static readonly CHART_TYPE_X_AXIS: string = "line";

    public static readonly LEGEND_ENTRY_KFZ: string = "Kfz";
    public static readonly LEGEND_ENTRY_SV: string = "SV";
    public static readonly LEGEND_ENTRY_GV: string = "GV";
    public static readonly LEGEND_ENTRY_SV_ANTEIL_PROZENT: string = "SV %";
    public static readonly LEGEND_ENTRY_GV_ANTEIL_PROZENT: string = "GV %";
    public static readonly LEGEND_ENTRY_RAD: string = "Rad";
    public static readonly LEGEND_ENTRY_FUSS: string = "Fuß";
    public static readonly LEGEND_ENTRY_PKW: string = "Pkw";
    public static readonly LEGEND_ENTRY_LKW: string = "Lkw";
    public static readonly LEGEND_ENTRY_LZ: string = "Lz";
    public static readonly LEGEND_ENTRY_BUSSE: string = "Busse";
    public static readonly LEGEND_ENTRY_KRAD: string = "Krad";
    public static readonly LEGEND_ENTRY_PKW_EINHEITEN: string = "Pkw-Einheiten";

    public static readonly CHART_SYMBOLS: Map<string, string> = new Map([
        [StepLine.LEGEND_ENTRY_KFZ, "circle"],
        [StepLine.LEGEND_ENTRY_SV, "circle"],
        [StepLine.LEGEND_ENTRY_GV, "circle"],

        [StepLine.LEGEND_ENTRY_SV_ANTEIL_PROZENT, "triangle"],
        [StepLine.LEGEND_ENTRY_GV_ANTEIL_PROZENT, "triangle"],

        [StepLine.LEGEND_ENTRY_RAD, "diamond"],

        [StepLine.LEGEND_ENTRY_FUSS, "roundRect"],

        [StepLine.LEGEND_ENTRY_PKW, "rect"],
        [StepLine.LEGEND_ENTRY_LKW, "rect"],
        [StepLine.LEGEND_ENTRY_LZ, "rect"],
        [StepLine.LEGEND_ENTRY_BUSSE, "rect"],
        [StepLine.LEGEND_ENTRY_KRAD, "rect"],

        [StepLine.LEGEND_ENTRY_PKW_EINHEITEN, "arrow"],
    ]);

    public static readonly CHART_COLOR: Map<string, string> = new Map([
        [StepLine.LEGEND_ENTRY_KFZ, "#B71C1C"], // red darken-4
        [StepLine.LEGEND_ENTRY_SV, "#0D47A1"], // blue darken-4
        [StepLine.LEGEND_ENTRY_GV, "#40C4FF"], // light-blue accent-2

        [StepLine.LEGEND_ENTRY_SV_ANTEIL_PROZENT, "#263238"], // blue-grey darken-4
        [StepLine.LEGEND_ENTRY_GV_ANTEIL_PROZENT, "#90A4AE"], // blue-grey lighten-2

        [StepLine.LEGEND_ENTRY_RAD, "#1B5E20"], // green darken-4

        [StepLine.LEGEND_ENTRY_FUSS, "#CDDC39"], // lime

        [StepLine.LEGEND_ENTRY_PKW, "#00E5FF"], // cyan accent-3
        [StepLine.LEGEND_ENTRY_LKW, "#BF360C"], // deep-orange darken-4
        [StepLine.LEGEND_ENTRY_LZ, "#FF9E80"], // deep-orange accent-1
        [StepLine.LEGEND_ENTRY_BUSSE, "#FFC107"], // amber
        [StepLine.LEGEND_ENTRY_KRAD, "#0097A7"], // cyan darken-2

        [StepLine.LEGEND_ENTRY_PKW_EINHEITEN, "#000000"], // black
    ]);

    private static readonly SYMBOL_SIZE: number = 5;

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
                showTitle: false,
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
                tooltip: {
                    show: true,
                    position: "left",
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
                showTitle: false,
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
                tooltip: {
                    show: true,
                    position: "left",
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
                    StepLine.LEGEND_ENTRY_GV_ANTEIL_PROZENT ||
                seriesEntryChart.name ===
                    StepLine.LEGEND_ENTRY_SV_ANTEIL_PROZENT
            ) {
                seriesEntries.push({
                    name: seriesEntryChart.name,
                    type: StepLine.CHART_TYPE_X_AXIS,
                    data: seriesEntryChart.yaxisData,
                    xAxisIndex: seriesEntryChart.xaxisIndex,
                    yAxisIndex: seriesEntryChart.yaxisIndex,
                    symbol: StepLine.CHART_SYMBOLS.get(seriesEntryChart.name),
                    symbolSize: StepLine.SYMBOL_SIZE,
                    color: StepLine.CHART_COLOR.get(seriesEntryChart.name),
                });
            } else {
                seriesEntries.push({
                    name: seriesEntryChart.name,
                    type: StepLine.CHART_TYPE_X_AXIS,
                    step: StepLine.CHART_STEP_X_AXIS,
                    data: seriesEntryChart.yaxisData,
                    xAxisIndex: seriesEntryChart.xaxisIndex,
                    yAxisIndex: seriesEntryChart.yaxisIndex,
                    symbol: StepLine.CHART_SYMBOLS.get(seriesEntryChart.name),
                    symbolSize: StepLine.SYMBOL_SIZE,
                    color: StepLine.CHART_COLOR.get(seriesEntryChart.name),
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

    private switchChartType(event: any) {
        this.$emit("charttypeChanged", event.currentType);
    }
}
</script>
