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
import Quelle from "@/types/enum/Quelle";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
  size?: string;
  color?: string;
  quelle: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "black",
  size: "default",
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
const icon = computed<IconTooltip>(() => {
  let result = quelleIcons.get(props.quelle);
  if (result === undefined) {
    result = new IconTooltip("mdi-help-box", "Keine Information zur Quelle");
  }
  return result;
});
</script>
