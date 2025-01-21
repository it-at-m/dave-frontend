<template>
  <v-chart
    ref="chart"
    :style="zeitreiheHeightAndWidth"
    :option="options"
    autoresize
    @magictypechanged="$emit('charttypeChanged', $event.currentType)"
  />
</template>

<script setup lang="ts">
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import type LadeZaehldatenZeitreiheDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenZeitreiheDTO";

import { BarChart, LineChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import _ from "lodash";
import { computed, provide, ref, watch } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";
import { useDisplay } from "vuetify";

import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import ChartUtils from "@/util/ChartUtils";
import { useDownloadUtils } from "@/util/DownloadUtils";

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

// Konstanten
const CHART_TYPE_X_AXIS = "bar";
const SCHWERVERKEHRSANTEIL = "Schwerverkehrsanteil";
const GUETERVERKEHRSANTEIL = "Güterverkehrsanteil";
const KRAFTFAHRZEUGVERKEHR = "Kraftfahrzeugverkehr";
const GUETERVERKEHR = "Güterverkehr";
const SCHWERVERKEHR = "Schwerverkehr";
const RADVERKEHR = "Radverkehr";
const FUSSVERKEHR = "Fussverkehr";
const GESAMT = "Summe alle Verkehrsarten";

provide(THEME_KEY, "default");
interface Props {
  zeitreiheDaten: LadeZaehldatenZeitreiheDTO;
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
const zaehlstelleStore = useZaehlstelleStore();
const downloadUtils = useDownloadUtils();
const seriesEntriesChart = ref<Array<unknown>>([]);

const zeitreiheHeightAndWidth = computed(() => {
  let height = "500px";
  if (display.xl.value) {
    height = "800px";
  }
  return `width: 100%; height: ${height}`;
});
const filterOptions = computed<OptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});

/**
 * Hier wird der maximale SV% Wert berechnet und zurückgegeben
 * */
const maxAnteil = computed(() => {
  return _.max(props.zeitreiheDaten.svAnteilInProzent);
});

/**
 * Berechnet das Maximum für die Y-Achse anhand des Max-Wertes für den SV- und GV-Anteil.
 * Hierfür wird der aufgerundete Wert verdoppelt und dann geschaut ob er innerhalb eines bestimmten Intervalls liegt.
 * Bsp: SV-Anteil von 5.6; Verdoppelt: 11.2; Liegt zwischen 10 und 20, daher ist 20 Max;
 * * Wenn maxAnteil undefined ist wird als default 20 zurück gegeben.
 * */
const yAxisMax = computed(() => {
  if (maxAnteil.value) {
    // Verdoppeln
    const maxSvAnteilDoubled: number = _.multiply(maxAnteil.value, 2);
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
});

/**
 * Berechnet das Intervall für die Y-Achse anhand des Maximums der Y-Achse immer so, dass es 4-5 Schritte gibt.
 * Wenn yAxisMax keinen sinnvollen Wert liefert wird als Default 5 zurückgegeben.
 * */
const yAxisInterval = computed(() => {
  if (yAxisMax.value == 10) {
    return 2;
  } else if (yAxisMax.value == 20) {
    return 5;
  } else if (yAxisMax.value == 50) {
    return 10;
  } else if (yAxisMax.value == 100) {
    return 20;
  }
  return 5;
});

const xAxis = computed(() => {
  return props.zeitreiheDaten.datum;
});

const options = computed(() => {
  return {
    tooltip: {
      trigger: "axis",
      formatter: function (params: any[]) {
        let text = "";
        if (params.length > 0) {
          text += `${params[0].name} <br/>`;
        }
        params.forEach((value) => {
          if (
            value.seriesName == SCHWERVERKEHRSANTEIL ||
            value.seriesName == GUETERVERKEHRSANTEIL
          ) {
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
      },
      backgroundColor: 'rgba(50,50,50,0.7)',
      textStyle: {
        color: 'rgba(255,255,255,1)',
      },
      confine: true,
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
            downloadCsv();
          },
        },
        // Die Datenansicht (also Tabellenansicht) des Graphen
        dataView: {
          title: "Datenansicht",
          show: true,
          readOnly: true,
          lang: ["Datenansicht", "zurück", "refresh"],
          optionToContent: function (opt: any) {
            const axisData = opt.xAxis[0].data;
            const series = opt.series;

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
              table += "<tr>" + "<td>" + axisData[i] + "</td>";
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
        KRAFTFAHRZEUGVERKEHR,
        GUETERVERKEHR,
        SCHWERVERKEHR,
        RADVERKEHR,
        FUSSVERKEHR,
        GESAMT,
        SCHWERVERKEHRSANTEIL,
        GUETERVERKEHRSANTEIL,
      ],
      selectedMode: false,
    },
    xAxis: {
      type: "category",
      data: xAxis.value,
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
        axisLine: {
          show: true,
        },
      },
      {
        type: "value",
        name: "in Prozent",
        show: showSecondYAxis.value,
        min: 0,
        max: yAxisMax.value,
        interval: yAxisInterval.value,
        axisLabel: {
          formatter: function (value: number) {
            return `${value.toLocaleString()}%`;
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

const showSecondYAxis = computed(() => {
  return (
    filterOptions.value.schwerverkehrsanteilProzent ||
    filterOptions.value.gueterverkehrsanteilProzent
  );
});

/**
 * Erstellt die Series für folgende Daten:
 * Wenn in den Optionen ausgewählt:
 * Kraftfahrzeugverkehr, Schwerverkehr, Güterverkehr, Radverkehr, Fußverkehr, Schwerverkehr Anteil in Prozent, Gesamt
 **/
function createSeriesEntries(zeitreiheDaten: LadeZaehldatenZeitreiheDTO) {
  const series: Array<unknown> = [];

  if (filterOptions.value.kraftfahrzeugverkehr) {
    series.push({
      name: KRAFTFAHRZEUGVERKEHR,
      type: CHART_TYPE_X_AXIS,
      data: zeitreiheDaten.kfz,
      color: ChartUtils.CHART_COLOR.get(ChartUtils.LEGEND_ENTRY_KFZ),
    });
  }
  if (filterOptions.value.schwerverkehr) {
    series.push({
      name: SCHWERVERKEHR,
      type: CHART_TYPE_X_AXIS,
      data: zeitreiheDaten.sv,
      color: ChartUtils.CHART_COLOR.get(ChartUtils.LEGEND_ENTRY_SV),
    });
  }
  if (filterOptions.value.gueterverkehr) {
    series.push({
      name: GUETERVERKEHR,
      type: CHART_TYPE_X_AXIS,
      data: zeitreiheDaten.gv,
      color: ChartUtils.CHART_COLOR.get(ChartUtils.LEGEND_ENTRY_GV),
    });
  }
  if (filterOptions.value.radverkehr) {
    series.push({
      name: RADVERKEHR,
      type: CHART_TYPE_X_AXIS,
      data: zeitreiheDaten.rad,
      color: ChartUtils.CHART_COLOR.get(ChartUtils.LEGEND_ENTRY_RAD),
    });
  }
  if (filterOptions.value.fussverkehr) {
    series.push({
      name: FUSSVERKEHR,
      type: CHART_TYPE_X_AXIS,
      data: zeitreiheDaten.fuss,
      color: ChartUtils.CHART_COLOR.get(ChartUtils.LEGEND_ENTRY_FUSS),
    });
  }
  if (filterOptions.value.zeitreiheGesamt) {
    series.push({
      name: GESAMT,
      type: CHART_TYPE_X_AXIS,
      data: zeitreiheDaten.gesamt,
      color: "#311B92",
    });
  }
  if (filterOptions.value.schwerverkehrsanteilProzent) {
    series.push({
      name: SCHWERVERKEHRSANTEIL,
      type: CHART_TYPE_X_AXIS,
      yAxisIndex: 1,
      data: zeitreiheDaten.svAnteilInProzent,
      color: ChartUtils.CHART_COLOR.get(
        ChartUtils.LEGEND_ENTRY_SV_ANTEIL_PROZENT
      ),
    });
  }

  if (filterOptions.value.gueterverkehrsanteilProzent) {
    series.push({
      name: GUETERVERKEHRSANTEIL,
      type: CHART_TYPE_X_AXIS,
      yAxisIndex: 1,
      data: zeitreiheDaten.gvAnteilInProzent,
      color: ChartUtils.CHART_COLOR.get(
        ChartUtils.LEGEND_ENTRY_GV_ANTEIL_PROZENT
      ),
    });
  }

  return series;
}

function downloadCsv() {
  const header =
    "Zähldatum;Kraftfahrzeugverkehr;Güterverkehr;Schwerverkehr;Radverkehr;Fussverkehr;Gesamt;Schwerverkehrsanteil;Güterverkehrsanteil";
  const rows = [];

  rows.push(header);

  for (
    let index = 0;
    index < props.zeitreiheDaten.svAnteilInProzent.length;
    index++
  ) {
    let row = "";
    row += `${props.zeitreiheDaten.datum[index]}`;
    row += fillCsvRow(
      filterOptions.value.kraftfahrzeugverkehr,
      props.zeitreiheDaten.kfz[index]
    );
    row += fillCsvRow(
      filterOptions.value.gueterverkehr,
      props.zeitreiheDaten.gv[index]
    );
    row += fillCsvRow(
      filterOptions.value.schwerverkehr,
      props.zeitreiheDaten.sv[index]
    );
    row += fillCsvRow(
      filterOptions.value.radverkehr,
      props.zeitreiheDaten.rad[index]
    );
    row += fillCsvRow(
      filterOptions.value.fussverkehr,
      props.zeitreiheDaten.fuss[index]
    );
    row += fillCsvRow(
      filterOptions.value.zeitreiheGesamt,
      props.zeitreiheDaten.gesamt[index]
    );
    row += fillCsvRow(
      filterOptions.value.schwerverkehrsanteilProzent,
      props.zeitreiheDaten.svAnteilInProzent[index]
    );
    row += fillCsvRow(
      filterOptions.value.gueterverkehrsanteilProzent,
      props.zeitreiheDaten.gvAnteilInProzent[index]
    );
    rows.push(row);
  }
  downloadUtils.downloadCsv(rows.join("\n"), `zeitreihe.csv`);
}

/**
 * Befüllt die CSV Rows, je nachdem
 * @param isWanted
 * @param data
 * @private
 */
function fillCsvRow(isWanted: boolean, data: number) {
  let row = "";
  if (isWanted) {
    row += `;${data}`;
  } else {
    row += `;`;
  }
  return row;
}

watch(
  () => props.zeitreiheDaten,
  (zeitreiheDaten: LadeZaehldatenZeitreiheDTO) => {
    seriesEntriesChart.value = [];
    seriesEntriesChart.value = createSeriesEntries(zeitreiheDaten);
  },
  { immediate: true }
);
</script>
