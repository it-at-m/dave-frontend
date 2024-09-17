<template>
  <span class="text-caption">
    <tooltip-with-icon
      :size="size"
      color="black"
      :icon="icon.iconPath"
      :tooltip="icon.tooltip"
    />
    {{ icon.tooltip }}
  </span>
</template>

<script setup lang="ts">
import { isNil } from "lodash";
import { computed } from "vue";

import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
  size?: string;
  fahrspuren: number;
}

const props = defineProps<Props>();

/**
 * Lädt das richtige MDI Icon aus der Liste.
 */
const icon = computed<IconTooltip>(() => {
  let result = fahrspurenIcons().get(props.fahrspuren);
  if (isNil(result)) {
    result = new IconTooltip(
      "mdi-help",
      "Keine Information zur Fahrstreifenanzahl"
    );
  }
  return result;
});

/**
 * Alle Zahlen-Icons zu den Schlüsseln.
 */
function fahrspurenIcons(): Map<number, IconTooltip> {
  return new Map([
    [0, new IconTooltip("mdi-numeric-0-box", "keine Fahrstreifen")],
    [1, new IconTooltip("mdi-numeric-1-box", "ein Fahrstreifen")],
    [2, new IconTooltip("mdi-numeric-2-box", "zwei Fahrstreifen")],
    [3, new IconTooltip("mdi-numeric-3-box", "drei Fahrstreifen")],
    [4, new IconTooltip("mdi-numeric-4-box", "vier Fahrstreifen")],
    [5, new IconTooltip("mdi-numeric-5-box", "fünf Fahrstreifen")],
    [6, new IconTooltip("mdi-numeric-6-box", "sechs Fahrstreifen")],
    [7, new IconTooltip("mdi-numeric-7-box", "sieben Fahrstreifen")],
  ]);
}
</script>
