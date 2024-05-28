<template>
    <tooltip-with-icon
        :small="small"
        :dense="dense"
        :color="color"
        :icon="icon.iconPath"
        :tooltip="icon.tooltip"
    ></tooltip-with-icon>
</template>
<script setup lang="ts">
import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";
import Quelle from "@/types/enum/Quelle";
import { computed, ComputedRef } from "vue";

interface Props {
    small?: boolean;
    dense?: boolean;
    color?: string;
    quelle: string;
}

const props = withDefaults(defineProps<Props>(), {
    small: false,
    dense: false,
    color: "black",
});

/**
 * Alle Quelle Icons zu den Schlüsseln.
 */
const quelleIcons: Map<string, IconTooltip> = new Map([
    [
        Quelle.MANUALLY,
        new IconTooltip("mdi-clipboard-account", "Manuelle Zählung"),
    ],
    [Quelle.DETECTOR, new IconTooltip("mdi-robot", "Detektorzählung")],
    [Quelle.RADAR, new IconTooltip("mdi-radar", "Radarzählung")],
    [Quelle.VIDEO, new IconTooltip("mdi-video", "Videozählung")],
]);

/**
 * Lädt das richtige MDI Icon aus der Liste.
 */
const icon: ComputedRef<IconTooltip> = computed(() => {
    let result = quelleIcons.get(props.quelle);
    if (result === undefined) {
        result = new IconTooltip(
            "mdi-help-box",
            "Keine Information zur Quelle"
        );
    }
    return result;
});
</script>