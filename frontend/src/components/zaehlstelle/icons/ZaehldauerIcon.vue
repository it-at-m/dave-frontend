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

import { Zaehldauer } from "@/api/client";
import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
  size?: string;
  color?: string;
  zaehldauer: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "black",
  size: "default",
});

/**
 * Alle Zähldauer Icons zu den Schlüsseln.
 */
const zaehldauerIcons: Map<string, IconTooltip> = new Map([
  [
    Zaehldauer.Dauer2X4Stunden,
    new IconTooltip("$zaehldauer2x4h", "2x4h Zählung"),
  ],
  [Zaehldauer.Dauer24Stunden, new IconTooltip("$zaehldauer24h", "24h Zählung")],
  [Zaehldauer.Dauer16Stunden, new IconTooltip("$zaehldauer16h", "16h Zählung")],
  [
    Zaehldauer.DAUER_13_STUNDEN,
    new IconTooltip("$zaehldauer13h", "13h Zählung"),
  ],
  [Zaehldauer.SONSTIGE, new IconTooltip("$zaehldauerSoZ", "Sonstige Zählung")],
]);

/**
 * Lädt das richtige MDI Icon aus der Liste.
 */
const icon = computed<IconTooltip>(() => {
  let result = zaehldauerIcons.get(props.zaehldauer);
  if (result === undefined) {
    result = new IconTooltip("mdi-help-box", "Keine Information zur Zähldauer");
  }
  return result;
});
</script>
