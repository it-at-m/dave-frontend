<template>
    <v-card
        elevation="0"
        class="pt-5"
    >
        <zeitreihe
            :zeitreihe-daten="zaehldatenZeitreihe"
            @charttypeChanged="charttypeChanged"
        ></zeitreihe>
        <!--  Dieses Diagramm soll der Benutzer nicht zu sehen bekommen, es dient nur zum PDF-Druck, die Groesse des Diagramms
      wird beim mounten der Seite fix festgelegt -->
        <zeitreihe
            ref="zeitreiheForPdf"
            style="display: none"
            :zeitreihe-daten="zaehldatenZeitreihe"
        ></zeitreihe>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import Zeitreihe from "@/components/zaehlstelle/charts/Zeitreihe.vue";

// eslint-disable-next-line no-unused-vars
import LadeZaehldatenZeitreiheDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenZeitreiheDTO";

@Component({
    components: {
        Zeitreihe,
    },
})
export default class ZeitreiheCard extends Vue {
    @Prop()
    zaehldatenZeitreihe!: LadeZaehldatenZeitreiheDTO;

    @Ref("zeitreiheForPdf") readonly zeitreiheForPdf!: Zeitreihe;

    mounted(): void {
        // Der zeitreiheForPdf Graph soll immer gleich gross sein, damit er im PDF gut aussieht und nicht abgeschnitten wird
        let chartOptions: any = {} as {
            width?: number | string;
            height?: number | string;
            silent?: boolean;
        };
        chartOptions.width = 900;
        chartOptions.height = 490;
        chartOptions.silent = true;
        this.zeitreiheForPdf.chart.resize(chartOptions);
    }

    charttypeChanged(newChartType: string) {
        this.zeitreiheForPdf.chart.options.series.forEach((series: any) => {
            series.type = newChartType;
        });
    }
}
</script>

<style scoped>

</style>
