<template>
    <v-card elevation="0">
        <belastungsplan-kreisverkehr
            v-if="belastungsplanData.kreisverkehr"
            ref="belastungsplanKreisverkehr"
            :name="zaehlungId"
            :data="belastungsplanData"
            :streets="belastungsplanData.streets"
            :visible-nodes="visibleNodes"
        >
        </belastungsplan-kreisverkehr>
    </v-card>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import BelastungsplanKreisverkehr from "@/components/zaehlstelle/charts/BelastungsplanKreisverkehr.vue";
import LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";

interface Props {
    belastungsplanData: LadeBelastungsplanDTO;
    zaehlungId?: string;
    dimension?: string;
}

const props = withDefaults(defineProps<Props>(), {
    dimension: "1000px",
});

const belastungsplanKreisverkehr = ref<InstanceType<
    typeof BelastungsplanKreisverkehr
> | null>();
defineExpose({
    belastungsplanKreisverkehr,
});

const visibleNodes = computed(() => {
    let nodes: boolean[] = [];
    for (
        let index = 0;
        index < props.belastungsplanData.streets.length;
        index++
    ) {
        nodes[index] = props.belastungsplanData.streets[index] !== null;
    }
    return nodes;
});
</script>