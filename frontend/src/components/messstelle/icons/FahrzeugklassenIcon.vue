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

import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
  size?: string;
  color?: string;
  fahrzeugklasse: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "black",
});

/**
 * Lädt das richtige SVG Icon aus der Liste.
 */
const icon = computed<IconTooltip>(() => {
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
    ["QPKW + QLKW", new IconTooltip("$qpkwLkw", "Fahrzeugklasse: QPKW + QLKW")],
  ]);
}
</script>
