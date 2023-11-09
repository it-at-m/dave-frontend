<template>
    <v-card
        elevation="0"
        class="pt-5"
    >
        <step-line
            :zaehldaten-stepline="zaehldatenStepline"
            @charttypeChanged="charttypeChanged"
        />
        <!--  Dieses Diagramm soll der Benutzer nicht zu sehen bekommen, es dient nur zum PDF-Druck, die Groesse des Diagramms
      wird beim mounten der Seite fix festgelegt -->
        <step-line
            ref="steplineForPdf"
            style="display: none"
            :zaehldaten-stepline="zaehldatenStepline"
        />
    </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";

import StepLine from "@/components/zaehlstelle/charts/StepLine.vue";
// eslint-disable-next-line no-unused-vars
import LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";

@Component({
    components: {
        StepLine,
    },
})
export default class StepLineCard extends Vue {
    @Prop()
    zaehldatenStepline!: LadeZaehldatenSteplineDTO;

    @Ref("steplineForPdf") readonly steplineForPdf!: StepLine;

    mounted(): void {
        // Der steplineForPdf Graph soll immer gleich gross sein, damit er im PDF gut aussieht und nicht abgeschnitten wird
        let chartOptions: any = {} as {
            width?: number | string;
            height?: number | string;
            silent?: boolean;
        };
        chartOptions.width = 900;
        chartOptions.height = 430;
        chartOptions.silent = true;
        this.steplineForPdf.chart.resize(chartOptions);
    }

    charttypeChanged(newChartType: string) {
        this.steplineForPdf.chart.options.series.forEach((series: any) => {
            series.type = newChartType;
        });
    }
}
</script>
