<template>
    <base-icon
        :small="small"
        :dense="dense"
        :color="color"
        :icon="icon.iconPath"
        :tooltip="icon.tooltip"
    ></base-icon>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";
import { computed, ComputedRef } from "vue";

interface Props {
    small?: boolean;
    dense?: boolean;
    color?: string;
    fahrzeugklasse: string;
}

const props = withDefaults(defineProps<Props>(), {
    small: false,
    dense: false,
    color: "black",
});

/**
 * Lädt das richtige SVG Icon aus der Liste.
 */
const icon: ComputedRef<IconTooltip> = computed(() => {
    let result = fahrzeugklassenIcons().get(props.fahrzeugklasse);
    if (result === undefined) {
        result = new IconTooltip(
            "mdi-help",
            "Keine Information zu den Fahrzeugklasse"
        );
    }
    return result;
});

/**
 * Alle Fahrzeugklasse Icons zu den Schlüsseln.
 */
function fahrzeugklassenIcons(): Map<string, IconTooltip> {
    return new Map([
        ["8+1", new IconTooltip("$achtUndEins", "Fahrzeugklasse: 8+1")],
        ["QKFZ", new IconTooltip("$qkfz", "Fahrzeugklasse: QKFZ")],
        [
            "QPKW + QLKW",
            new IconTooltip("$qpkwLkw", "Fahrzeugklasse: QPKW + QLKW"),
        ],
    ]);
}
</script>