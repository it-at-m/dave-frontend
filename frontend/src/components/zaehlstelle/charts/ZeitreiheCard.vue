<template>
  <v-card
    elevation="0"
    class="pt-5"
  >
    <zeitreihe-chart
      :zeitreihe-daten="zaehldatenZeitreihe"
      @charttype-changed="charttypeChanged"
    />
    <!--  Dieses Diagramm soll der Benutzer nicht zu sehen bekommen, es dient nur zum PDF-Druck, die Groesse des Diagramms
      wird beim mounten der Seite fix festgelegt -->
    <zeitreihe-chart
      ref="zeitreiheForPdf"
      style="display: none"
      :zeitreihe-daten="zaehldatenZeitreihe"
    />
  </v-card>
</template>

<script setup lang="ts">
import type LadeZaehldatenZeitreiheDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenZeitreiheDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";
import type { SeriesOption } from "echarts";
import type { ResizeOpts } from "echarts/core";

import { computed, onMounted, ref, watch } from "vue";

import ZeitreiheChart from "@/components/zaehlstelle/charts/ZeitreiheChart.vue";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";

interface Props {
  zaehldatenZeitreihe: LadeZaehldatenZeitreiheDTO;
}

const props = defineProps<Props>();
const zaehlstelleStore = useZaehlstelleStore();
const filterOptions = computed<ZaehlstelleOptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});
const snackbarStore = useSnackbarStore();
const zeitreiheForPdf = ref<InstanceType<typeof ZeitreiheChart> | null>();
defineExpose({
  zeitreiheForPdf,
});

onMounted(() => {
  // Der zeitreiheForPdf Graph soll immer gleich gross sein, damit er im PDF gut aussieht und nicht abgeschnitten wird
  const chartOptions = {} as ResizeOpts;
  chartOptions.width = 900;
  chartOptions.height = 490;
  chartOptions.silent = true;
  zeitreiheForPdf?.value?.chart?.resize(chartOptions);
});

function charttypeChanged(newChartType: "line" | "bar") {
  (
    zeitreiheForPdf?.value?.chart?.option?.series as Array<SeriesOption>
  ).forEach((series: SeriesOption) => {
    series.type = newChartType;
  });
}

// Zeige die Snackbar an, wenn Fuss ausgewählt ist und keine Fuss-Daten vorhanden sind
watch(
  () => props.zaehldatenZeitreihe,
  (zaehldatenZeitreihe: LadeZaehldatenZeitreiheDTO) => {
    if (
      filterOptions.value.fussverkehr &&
      !zaehldatenZeitreihe.fuss.every((value) => value > 0)
    ) {
      snackbarStore.showInfo(
        "Für den Fußverkehr ist kein Tageswert vorhanden. Für die Anzeige muss ein Zeitblock oder eine Stunde ausgewählt sein."
      );
    }
  },
  { immediate: true }
);
</script>
