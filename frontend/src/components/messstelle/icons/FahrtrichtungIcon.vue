<template>
    <base-icon
        :small="small"
        :dense="dense"
        color="black"
        :icon="icon.iconPath"
        :tooltip="icon.tooltip"
    ></base-icon>
</template>
<script setup lang="ts">
import BaseIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";
import Himmelsrichtungen from "@/types/enum/Himmelsrichtungen";
import { computed, ComputedRef } from "vue";

interface Props {
    small: boolean;
    dense: boolean;
    fahrtrichtung: string;
}

const props = withDefaults(defineProps<Props>(), {
    small: false,
    dense: false,
});

/**
 * Lädt das richtige MDI Icon aus der Liste.
 */
const icon: ComputedRef<IconTooltip> = computed(() => {
    let result = himmelsrichtungIcons().get(props.fahrtrichtung);
    if (result === undefined) {
        result = new IconTooltip(
            "mdi-arrow-all",
            "Keine Information zur Fahrtrichtung"
        );
    }
    return result;
});

/**
 * Alle Richtungs Icons zu den Schlüsseln.
 */
function himmelsrichtungIcons(): Map<string, IconTooltip> {
    return new Map([
        [
            Himmelsrichtungen.NORD,
            new IconTooltip(
                "mdi-arrow-up-thin-circle-outline",
                "Fahrtrichtung: Nord"
            ),
        ],
        [
            Himmelsrichtungen.SUED,
            new IconTooltip(
                "mdi-arrow-down-thin-circle-outline",
                "Fahrtrichtung: Süd"
            ),
        ],
        [
            Himmelsrichtungen.OST,
            new IconTooltip(
                "mdi-arrow-right-thin-circle-outline",
                "Fahrtrichtung: Ost"
            ),
        ],
        [
            Himmelsrichtungen.WEST,
            new IconTooltip(
                "mdi-arrow-left-thin-circle-outline",
                "Fahrtrichtung: West"
            ),
        ],
    ]);
}
</script>