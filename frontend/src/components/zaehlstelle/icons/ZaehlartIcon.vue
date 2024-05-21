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
import IconTooltip from "@/types/util/IconTooltip";
import Zaehlart from "@/types/enum/Zaehlart";
import { computed, ComputedRef } from "vue";
import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";

interface Props {
    small?: boolean;
    dense?: boolean;
    color?: string;
    zaehlart?: string;
}

const props = withDefaults(defineProps<Props>(), {
    small: false,
    dense: false,
    color: "black",
});

/**
 * Alle Zählarten Icons zu den Schlüsseln
 */
const zaehlartIcons: Map<string, IconTooltip> = new Map([
    [Zaehlart.N, new IconTooltip("$artN", "Standardzählung")],
    [
        Zaehlart.H,
        new IconTooltip("$artH", "Hauptverkehrsrichtung/Oberfläche/Hoch"),
    ],
    [Zaehlart.Q, new IconTooltip("$artQ", "Querschnitt")],
    [Zaehlart.QB, new IconTooltip("$artQB", "Bahnschnitt")],
    [
        Zaehlart.QH,
        new IconTooltip(
            "$artQH",
            "Querschnitt/Hauptverkehrsrichtung/Oberfläche/Hoch"
        ),
    ],
    [Zaehlart.QI, new IconTooltip("$artQI", "Isarschnitt")],
    [Zaehlart.QR, new IconTooltip("$artQR", "Querschnitt Radverkehr")],
    [Zaehlart.QS, new IconTooltip("$artQSt", "Stadtgrenzzählung")],
    [Zaehlart.Q_, new IconTooltip("$artQS", "Querschnitt/Sonderzählung")],
    [
        Zaehlart.QT,
        new IconTooltip("$artQT", "Querschnitt Tunnel/Unterführung/Tief"),
    ],
    [Zaehlart.R, new IconTooltip("$artR", "Radverkehrszählung")],
    [Zaehlart.T, new IconTooltip("$artT", "Tunnel/Unterführung/Tief")],
    [Zaehlart.TK, new IconTooltip("$artTK", "Teilknoten")],
]);

/**
 * Lädt das richtige MDI Icon aus der Liste.
 */
const icon: ComputedRef<IconTooltip> = computed(() => {
    let result = zaehlartIcons.get(props.zaehlart);
    if (result === undefined) {
        result = new IconTooltip(
            "mdi-help-box",
            "Keine Information zur Zählart"
        );
    }
    return result;
});
</script>