<template>
    <v-card elevation="0">
        <belastungsplan-kreisverkehr-svg :plan="belastungsplanData" />
    </v-card>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import BelastungsplanKreisverkehr from "@/components/zaehlstelle/charts/BelastungsplanKreisverkehr.vue";
import LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import BelastungsplanKreisverkehrSvg from "@/components/zaehlstelle/charts/BelastungsplanKreisverkehrSvg.vue";

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