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
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
  size?: string;
  fahrtrichtung: string;
}

const props = defineProps<Props>();

/**
 * Lädt das richtige MDI Icon aus der Liste.
 */
const icon = computed<IconTooltip>(() => {
  let result = himmelsrichtungIcons().get(props.fahrtrichtung);
  if (isNil(result)) {
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
      Himmelsrichtung.N,
      new IconTooltip("mdi-arrow-up-thin-circle-outline", "Nord"),
    ],
    [
      Himmelsrichtung.S,
      new IconTooltip("mdi-arrow-down-thin-circle-outline", "Süd"),
    ],
    [
      Himmelsrichtung.O,
      new IconTooltip("mdi-arrow-right-thin-circle-outline", "Ost"),
    ],
    [
      Himmelsrichtung.W,
      new IconTooltip("mdi-arrow-left-thin-circle-outline", "West"),
    ],
  ]);
}
</script>
