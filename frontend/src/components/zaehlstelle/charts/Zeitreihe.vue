<template>
    <chart
        ref="chart"
        :style="zeitreiheHeightAndWidth"
        :option="options"
        autoresize
        @magictypechanged="switchChartType"
    />
</template>


<script lang="ts">
import {
    Component,
    Prop,
    Provide,
    Ref,
    Vue,
    Watch,
} from "vue-property-decorator";
// chart
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, LineChart } from "echarts/charts";
import {
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
} from "echarts/components";
import Chart, { THEME_KEY } from "vue-echarts";

/* eslint-disable no-unused-vars */
import LadeZaehldatenZeitreiheDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenZeitreiheDTO";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
/* eslint-enable no-unused-vars */
import _ from "lodash";
import ChartUtils from "@/util/ChartUtils";

use([
    CanvasRenderer,
    LineChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
]);

@Component({
    components: { Chart },
})
export default class Zeitreihe extends Vue {
    private static readonly CHART_TYPE_X_AXIS: string = "bar";

    @Provide() [THEME_KEY] = "default";

    @Ref("chart") readonly chart!: any;
    @Ref("container") readonly container!: HTMLDivElement;

    @Prop()
    private zeitreiheDaten!: LadeZaehldatenZeitreiheDTO;

    private seriesEntriesChart: any[] = [];

    // Konstanten
    private static readonly SCHWERVERKEHRSANTEIL = "Schwerverkehrsanteil";
    private static readonly GUETERVERKEHRSANTEIL = "Güterverkehrsanteil";
    private static readonly KRAFTFAHRZEUGVERKEHR = "Kraftfahrzeugverkehr";
    private static readonly GUETERVERKEHR = "Güterverkehr";
    private static readonly SCHWERVERKEHR = "Schwerverkehr";
    private static readonly RADVERKEHR = "Radverkehr";
    private static readonly FUSSVERKEHR = "Fussverkehr";
    private static readonly GESAMT = "Summe alle Verkehrsarten";
    private static readonly SYMBOL_SIZE = 5;

    @Watch("zeitreiheDaten", { immediate: true })
    private setDataForChart(zeitreiheDaten: LadeZaehldatenZeitreiheDTO) {
        this.seriesEntriesChart = [];
        this.seriesEntriesChart = this.createSeriesEntries(zeitreiheDaten);
    }

    get filterOptions(): OptionsDTO {
        return this.$store.getters.getFilteroptions;
    }

    get seriesEntriesDataChart() {
        return this.seriesEntriesChart;
    }

    // Computed properties
    get zeitreiheHeightAndWidth() {
        let height = "500px";
        if (this.$vuetify.breakpoint.xl) {
            height = "800px";
        }
        return `width: 100%; height: ${height}`;
    }

    /**
     * Hier wird der maximale SV% Wert berechnet und zurückgegeben
     * */
    get maxAnteil(): number | undefined {
        return _.max(this.zeitreiheDaten.svAnteilInProzent);
    }

    /**
     * Berechnet das Maximum für die Y-Achse anhand des Max-Wertes für den SV- und GV-Anteil.
     * Hierfür wird der aufgerundete Wert verdoppelt und dann geschaut ob er innerhalb eines bestimmten Intervalls liegt.
     * Bsp: SV-Anteil von 5.6; Verdoppelt: 11.2; Liegt zwischen 10 und 20, daher ist 20 Max;
     * * Wenn maxAnteil undefined ist wird als default 20 zurück gegeben.
     * */
    get yAxisMax(): number {
        if (this.maxAnteil != undefined) {
            // Verdoppeln
            let maxSvAnteilDoubled: number = _.multiply(this.maxAnteil, 2);
            if (maxSvAnteilDoubled <= 10) {
                return 10;
            } else if (maxSvAnteilDoubled <= 20) {
                return 20;
            } else if (maxSvAnteilDoubled <= 50) {
                return 50;
            } else {
                return 100;
            }
        }
        return 20;
    }

    /**
     * Berechnet das Intervall für die Y-Achse anhand des Maximums der Y-Achse immer so, dass es 4-5 Schritte gibt.
     * Wenn yAxisMax keinen sinnvollen Wert liefert wird als Default 5 zurückgegeben.
     * */
    get yAxisInterval(): number {
        if (this.yAxisMax == 10) {
            return 2;
        } else if (this.yAxisMax == 20) {
            return 5;
        } else if (this.yAxisMax == 50) {
            return 10;
        } else if (this.yAxisMax == 100) {
            return 20;
        }
        return 5;
    }

    get options() {
        /* eslint-disable @typescript-eslint/no-this-alias */
        let that = this;
        let options = {
            tooltip: {
                trigger: "axis",
                formatter: function (params: any[]) {
                    let text = "";
                    if (params.length > 0) {
                        text += `${params[0].name} <br/>`;
                    }
                    params.forEach((value) => {
                        if (
                            value.seriesName ==
                                Zeitreihe.SCHWERVERKEHRSANTEIL ||
                            value.seriesName == Zeitreihe.GUETERVERKEHRSANTEIL
                        ) {
                            text += `<span style="color:${
                                value.color
                            }">\u25CF</span> ${
                                value.seriesName
                            }: ${value.data.toLocaleString()}%<br/>`;
                        } else {
                            text += `<span style="color:${
                                value.color
                            }">\u25CF</span> ${
                                value.seriesName
                            }: ${value.data.toLocaleString()}<br/>`;
                        }
                    });
                    return text;
                },
            },
            toolbox: {
                showTitle: true,
                orient: "vertical",
                feature: {
                    myToolExportData: {
                        show: true,
                        title: "Export Data",
                        icon: "path://M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M12,19L8,15H10.5V12H13.5V15H16L12,19Z",
                        onclick: function () {
                            that.downloadCsv();
                        },
                    },
                    // Die Datenansicht (also Tabellenansicht) des Graphen
                    dataView: {
                        title: "Datenansicht",
                        show: true,
                        readOnly: true,
                        lang: ["Datenansicht", "zurück", "refresh"],
                        optionToContent: function (opt: any) {
                            let axisData = opt.xAxis[0].data;
                            let series = opt.series;

                            // Header der Tabelle
                            let table =
                                '<table style="width:100%;text-align:center"><tbody><tr>' +
                                "<td>Zähldatum</td>";
                            series.forEach((data: any) => {
                                table += "<td>" + data.name + "</td>";
                            });
                            table += "</tr>";

                            // Daten der Tabelle
                            for (let i = 0, l = axisData.length; i < l; i++) {
                                table +=
                                    "<tr>" + "<td>" + axisData[i] + "</td>";
                                series.forEach((data: any) => {
                                    table += "<td>" + data.data[i] + "</td>";
                                });
                                table += "</tr>";
                            }
                            table += "</tbody></table>";
                            return table;
                        },
                    },
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
            legend: {
                data: [
                    Zeitreihe.KRAFTFAHRZEUGVERKEHR,
                    Zeitreihe.GUETERVERKEHR,
                    Zeitreihe.SCHWERVERKEHR,
                    Zeitreihe.RADVERKEHR,
                    Zeitreihe.FUSSVERKEHR,
                    Zeitreihe.GESAMT,
                    Zeitreihe.SCHWERVERKEHRSANTEIL,
                    Zeitreihe.GUETERVERKEHRSANTEIL,
                ],
                selectedMode: false,
            },
            xAxis: {
                type: "category",
                data: this.xAxis,
                splitArea: {
                    show: true,
                },
            },
            yAxis: [
                {
                    type: "value",
                    name: "Fahrzeuge",
                    min: 0,
                    axisLabel: {
                        formatter: function (value: number) {
                            return value.toLocaleString();
                        },
                    },
                },
                // Zweite Achse wird ggf. weiter unten gesetzt
            ],
            series: this.seriesEntriesDataChart,
        };

        if (this.secondYAxis != undefined) {
            options.yAxis[1] = this.secondYAxis;
        }

        return options;
    }

    get secondYAxis() {
        if (
            this.filterOptions.schwerverkehrsanteilProzent ||
            this.filterOptions.gueterverkehrsanteilProzent
        ) {
            return {
                type: "value",
                name: "in Prozent",
                min: 0,
                max: this.yAxisMax,
                interval: this.yAxisInterval,
                axisLabel: {
                    formatter: function (value: number) {
                        return `${value.toLocaleString()}%`;
                    },
                },
            };
        } else {
            return undefined;
        }
    }

    /**
     * Erstellt die Series für folgende Daten:
     * Wenn in den Optionen ausgewählt:
     * Kraftfahrzeugverkehr, Schwerverkehr, Güterverkehr, Radverkehr, Fußverkehr, Schwerverkehr Anteil in Prozent, Gesamt
     **/
    private createSeriesEntries(zeitreiheDaten: LadeZaehldatenZeitreiheDTO) {
        let series = [] as any;

        if (this.filterOptions.kraftfahrzeugverkehr) {
            series.push({
                name: Zeitreihe.KRAFTFAHRZEUGVERKEHR,
                type: Zeitreihe.CHART_TYPE_X_AXIS,
                data: zeitreiheDaten.kfz,
                color: ChartUtils.CHART_COLOR.get(ChartUtils.LEGEND_ENTRY_KFZ),
            });
        }
        if (this.filterOptions.schwerverkehr) {
            series.push({
                name: Zeitreihe.SCHWERVERKEHR,
                type: Zeitreihe.CHART_TYPE_X_AXIS,
                data: zeitreiheDaten.sv,
                color: ChartUtils.CHART_COLOR.get(ChartUtils.LEGEND_ENTRY_SV),
            });
        }
        if (this.filterOptions.gueterverkehr) {
            series.push({
                name: Zeitreihe.GUETERVERKEHR,
                type: Zeitreihe.CHART_TYPE_X_AXIS,
                data: zeitreiheDaten.gv,
                color: ChartUtils.CHART_COLOR.get(ChartUtils.LEGEND_ENTRY_GV),
            });
        }
        if (this.filterOptions.radverkehr) {
            series.push({
                name: Zeitreihe.RADVERKEHR,
                type: Zeitreihe.CHART_TYPE_X_AXIS,
                data: zeitreiheDaten.rad,
                color: ChartUtils.CHART_COLOR.get(ChartUtils.LEGEND_ENTRY_RAD),
            });
        }
        if (this.filterOptions.fussverkehr) {
            series.push({
                name: Zeitreihe.FUSSVERKEHR,
                type: Zeitreihe.CHART_TYPE_X_AXIS,
                data: zeitreiheDaten.fuss,
                color: ChartUtils.CHART_COLOR.get(ChartUtils.LEGEND_ENTRY_FUSS),
            });
        }
        if (this.filterOptions.zeitreiheGesamt) {
            series.push({
                name: Zeitreihe.GESAMT,
                type: Zeitreihe.CHART_TYPE_X_AXIS,
                data: zeitreiheDaten.gesamt,
                color: "#311B92",
            });
        }
        if (this.filterOptions.schwerverkehrsanteilProzent) {
            series.push({
                name: Zeitreihe.SCHWERVERKEHRSANTEIL,
                type: Zeitreihe.CHART_TYPE_X_AXIS,
                yAxisIndex: 1,
                data: zeitreiheDaten.svAnteilInProzent,
                color: ChartUtils.CHART_COLOR.get(
                    ChartUtils.LEGEND_ENTRY_SV_ANTEIL_PROZENT
                ),
            });
        }

        if (this.filterOptions.gueterverkehrsanteilProzent) {
            series.push({
                name: Zeitreihe.GUETERVERKEHRSANTEIL,
                type: Zeitreihe.CHART_TYPE_X_AXIS,
                yAxisIndex: 1,
                data: zeitreiheDaten.gvAnteilInProzent,
                color: ChartUtils.CHART_COLOR.get(
                    ChartUtils.LEGEND_ENTRY_GV_ANTEIL_PROZENT
                ),
            });
        }

        return series;
    }

    get xAxis() {
        return this.zeitreiheDaten.datum;
    }

    private downloadCsv() {
        const header =
            "Zähldatum;Kraftfahrzeugverkehr;Güterverkehr;Schwerverkehr;Radverkehr;Fussverkehr;Gesamt;Schwerverkehrsanteil;Güterverkehrsanteil";
        const rows = [];

        rows.push(header);

        for (
            let index = 0;
            index < this.zeitreiheDaten.svAnteilInProzent.length;
            index++
        ) {
            let row = "";
            row += `${this.zeitreiheDaten.datum[index]}`;
            row += this.fillCsvRow(
                this.filterOptions.kraftfahrzeugverkehr,
                this.zeitreiheDaten.kfz[index]
            );
            row += this.fillCsvRow(
                this.filterOptions.gueterverkehr,
                this.zeitreiheDaten.gv[index]
            );
            row += this.fillCsvRow(
                this.filterOptions.schwerverkehr,
                this.zeitreiheDaten.sv[index]
            );
            row += this.fillCsvRow(
                this.filterOptions.radverkehr,
                this.zeitreiheDaten.rad[index]
            );
            row += this.fillCsvRow(
                this.filterOptions.fussverkehr,
                this.zeitreiheDaten.fuss[index]
            );
            row += this.fillCsvRow(
                this.filterOptions.zeitreiheGesamt,
                this.zeitreiheDaten.gesamt[index]
            );
            row += this.fillCsvRow(
                this.filterOptions.schwerverkehrsanteilProzent,
                this.zeitreiheDaten.svAnteilInProzent[index]
            );
            row += this.fillCsvRow(
                this.filterOptions.gueterverkehrsanteilProzent,
                this.zeitreiheDaten.gvAnteilInProzent[index]
            );
            rows.push(row);
        }
        let csvContent = "data:text/csv;charset=UTF-8," + rows.join("\n");
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `zeitreihe.csv`);
        document.body.appendChild(link); // Required for FF

        link.click(); // Lädt die Datei herunter
    }

    /**
     * Befüllt die CSV Rows, je nachdem
     * @param count
     * @param isWanted
     * @param data
     * @private
     */
    private fillCsvRow(isWanted: boolean, data: number) {
        let row = "";
        if (isWanted) {
            row += `;${data}`;
        } else {
            row += `;`;
        }
        return row;
    }

    switchChartType(event: any) {
        this.$emit("charttypeChanged", event.currentType);
    }
}
</script>
