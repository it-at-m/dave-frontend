<template>
    <span class="text-caption">
        <base-icon
            :small="small"
            :dense="dense"
            color="black"
            :icon="icon.iconPath"
            :tooltip="icon.tooltip"
        />
        {{ icon.tooltip }}
    </span>
</template>
<script setup lang="ts">
import BaseIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";
import Himmelsrichtungen from "@/types/enum/Himmelsrichtungen";
import {computed} from "vue";

interface Props {
    small?: boolean;
    dense?: boolean;
    fahrtrichtung: string;
}

const props = withDefaults(defineProps<Props>(), {
    small: false,
    dense: false,
});

/**
 * Lädt das richtige MDI Icon aus der Liste.
 */
const icon  = computed<IconTooltip>(() => {
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
            new IconTooltip("mdi-arrow-up-thin-circle-outline", "Nord"),
        ],
        [
            Himmelsrichtungen.SUED,
            new IconTooltip("mdi-arrow-down-thin-circle-outline", "Süd"),
        ],
        [
            Himmelsrichtungen.OST,
            new IconTooltip("mdi-arrow-right-thin-circle-outline", "Ost"),
        ],
        [
            Himmelsrichtungen.WEST,
            new IconTooltip("mdi-arrow-left-thin-circle-outline", "West"),
        ],
    ]);
}
</script>