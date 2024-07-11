<template>
    <v-card
        elevation="0"
        class="pt-5"
    >
        <heatmap :zaehldaten-heatmap="zaehldatenHeatmapData"></heatmap>
        <!--  Dieses Diagramm soll der Benutzer nicht zu sehen bekommen, es dient nur zum PDF-Druck, die Groesse des Diagramms
      wird beim mounten der Seite fix festgelegt -->
        <heatmap
            ref="heatmap"
            style="display: none"
            :zaehldaten-heatmap="zaehldatenHeatmapData"
        ></heatmap>
    </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";

import Heatmap from "@/components/zaehlstelle/charts/Heatmap.vue";
// eslint-disable-next-line no-unused-vars
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";

@Component({
    components: {
        Heatmap,
    },
})
export default class HeatmapCard extends Vue {
    @Prop()
    private zaehldatenHeatmap!: LadeZaehldatenHeatmapDTO;

    @Ref("heatmap") readonly heatmapChart!: Heatmap;

    mounted(): void {
        // Die Heatmap soll immer gleich gross sein, damit er im PDF gut aussieht und nicht abgeschnitten wird
        let chartOptions: any = {} as {
            width?: number | string;
            height?: number | string;
            silent?: boolean;
        };
        chartOptions.width = 1350;
        chartOptions.height = 430;
        chartOptions.silent = true;
        this.heatmapChart.chart.resize(chartOptions);
    }

    get zaehldatenHeatmapData() {
        return this.zaehldatenHeatmap;
    }
}
</script>