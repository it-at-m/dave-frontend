<template>
  <tooltip-with-icon
    :size="size"
    :color="color"
    :icon="icon.iconPath"
    :tooltip="icon.tooltip"
  />
</template>
<script setup lang="ts">
import { computed } from "vue";

import { Zaehlart } from "@/api/client";
import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
  size?: string;
  color?: string;
  zaehlart: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "black",
  size: "x-large",
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
  [Zaehlart.Qb, new IconTooltip("$artQB", "Bahnschnitt")],
  [
    Zaehlart.Qh,
    new IconTooltip(
      "$artQH",
      "Querschnitt/Hauptverkehrsrichtung/Oberfläche/Hoch"
    ),
  ],
  [Zaehlart.Qi, new IconTooltip("$artQI", "Isarschnitt")],
  [Zaehlart.Qr, new IconTooltip("$artQR", "Querschnitt Radverkehr")],
  [Zaehlart.Qs, new IconTooltip("$artQSt", "Stadtgrenzzählung")],
  [Zaehlart.Q2, new IconTooltip("$artQS", "Querschnitt/Sonderzählung")],
  [
    Zaehlart.Qt,
    new IconTooltip("$artQT", "Querschnitt Tunnel/Unterführung/Tief"),
  ],
  [Zaehlart.R, new IconTooltip("$artR", "Radverkehrszählung")],
  [Zaehlart.Qjs, new IconTooltip("$artQJS", "Querschnitt je Straßenseite")],
  [
    Zaehlart.Fjs,
    new IconTooltip("$artFJS", "Fußverkehr/Radverkehr je Straßenseite"),
  ],
  [Zaehlart.Qu, new IconTooltip("$artQU", "Querung")],
  [Zaehlart.T, new IconTooltip("$artT", "Tunnel/Unterführung/Tief")],
  [Zaehlart.Tk, new IconTooltip("$artTK", "Teilknoten")],
]);

/**
 * Lädt das richtige MDI Icon aus der Liste.
 */
const icon = computed<IconTooltip>(() => {
  let result = zaehlartIcons.get(props.zaehlart);
  if (result === undefined) {
    result = new IconTooltip("mdi-help-box", "Keine Information zur Zählart");
  }
  return result;
});
</script>
