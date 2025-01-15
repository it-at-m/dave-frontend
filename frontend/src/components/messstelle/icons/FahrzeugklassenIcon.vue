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
import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";

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
    [Fahrzeugklasse.ACHT_PLUS_EINS, new IconTooltip("$achtUndEins", "Fahrzeugklasse: 8+1")],
    [Fahrzeugklasse.SUMME_KFZ, new IconTooltip("$qkfz", "Fahrzeugklasse: Summe KFZ")],
    [Fahrzeugklasse.ZWEI_PLUS_EINS, new IconTooltip("$qpkwLkw", "Fahrzeugklasse: 2+1")],
    [Fahrzeugklasse.RAD, new IconTooltip("mdi-bicycle", "Fahrzeugklasse: Rad")],
  ]);
}
</script>
