<template>
    <v-card elevation="0">
        <belastungsplan-kreisverkehr-svg :plan="allData" />
    </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import BelastungsplanKreisverkehr from "@/components/zaehlstelle/charts/BelastungsplanKreisverkehr.vue";
// eslint-disable-next-line no-unused-vars
import LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import BelastungsplanKreisverkehrSvg from "@/components/zaehlstelle/charts/BelastungsplanKreisverkehrSvg.vue";

@Component({
    components: {
        BelastungsplanKreisverkehrSvg,
        BelastungsplanKreisverkehr,
    },
})
export default class BelastungsplanCard extends Vue {
    @Prop()
    private belastungsplanData!: LadeBelastungsplanDTO;
    @Prop()
    private loaded!: boolean;
    @Prop()
    private zaehlungId!: string;
    @Prop({ default: "1000px" }) dimension!: string;

    @Ref("belastungsplanKreisverkehr")
    readonly belastungsplanKreisverkehr!: BelastungsplanKreisverkehr;

    get streets(): string[] {
        return this.belastungsplanData.streets;
    }

    get nameZaehlung() {
        return this.zaehlungId;
    }

    get allData() {
        return this.belastungsplanData;
    }

    get visibleNodes(): boolean[] {
        let nodes: boolean[] = [];
        for (let index = 0; index < this.streets.length; index++) {
            nodes[index] = this.streets[index] !== null;
        }
        return nodes;
    }

    get isKreisverkehr() {
        return this.belastungsplanData.kreisverkehr;
    }
}
</script>