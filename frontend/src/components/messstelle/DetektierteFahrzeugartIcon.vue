<template>
    <tooltip-with-icon
        :icon="iconOptions.icon"
        :tooltip="iconOptions.tooltip"
    />
</template>

<script setup lang="ts">
import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import { computed } from "vue";
import IconOptions from "@/types/util/IconOptions";

interface Props {
    detektierteFahrzeugart: DetektierteFahrzeugart;
}

const props = defineProps<Props>();

const iconOptions = computed(() => {
    if (props.detektierteFahrzeugart == DetektierteFahrzeugart.FAHRRAD) {
        return new IconOptions("mdi-bicycle", "Fahrrad");
    } else if (props.detektierteFahrzeugart == DetektierteFahrzeugart.KFZ) {
        return new IconOptions("mdi-car", "KFZ");
    } else {
        return new IconOptions(
            "mdi-alert-circle",
            "Fahrzeugart konnte nicht ermittelt werden"
        );
    }
});
</script>