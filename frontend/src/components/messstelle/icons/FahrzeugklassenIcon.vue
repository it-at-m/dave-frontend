<template>
  <tooltip-with-icon
    :size="size"
    :color="color"
    :icon="icon.iconPath"
    :tooltip="icon.tooltip"
  />
</template>

<script setup lang="ts">
import { isNil } from "lodash";
import { computed } from "vue";

import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
  size?: string;
  color?: string;
  fahrzeugklasse: Fahrzeugklasse | string | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  color: "black",
  size: "default",
});

/**
 * Lädt das richtige SVG Icon aus der Liste.
 */
const icon = computed<IconTooltip>(() => {
  let result = isNil(props.fahrzeugklasse)
    ? undefined
    : fahrzeugklassenIcons().get(props.fahrzeugklasse);
  if (isNil(result)) {
    result = new IconTooltip(
      "mdi-help",
      "Keine Information zu Fahrzeugklassen vorhanden"
    );
  }
  return result;
});

/**
 * Alle Fahrzeugklasse Icons zu den Schlüsseln.
 */
function fahrzeugklassenIcons(): Map<Fahrzeugklasse | string, IconTooltip> {
  return new Map([
    [
      Fahrzeugklasse.ACHT_PLUS_EINS,
      new IconTooltip("$achtPlusEins", "Fahrzeugklasse: 8+1"),
    ],
    [
      Fahrzeugklasse.SUMME_KFZ,
      new IconTooltip("$summeKfz", "Fahrzeugklasse: Summe KFZ"),
    ],
    [
      Fahrzeugklasse.ZWEI_PLUS_EINS,
      new IconTooltip("$zweiPlusEins", "Fahrzeugklasse: 2+1"),
    ],
    [Fahrzeugklasse.RAD, new IconTooltip("mdi-bicycle", "Fahrzeugklasse: Rad")],
  ]);
}
</script>
