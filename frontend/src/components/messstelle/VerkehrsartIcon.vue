<template>
  <tooltip-with-icon
    :icon="iconOptions.icon"
    :tooltip="iconOptions.tooltip"
    :color="color"
    size="default"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import Verkehrsart from "@/types/enum/Verkehrsart";
import IconOptions from "@/types/util/IconOptions";

interface Props {
  detektierteVerkehrsart?: Verkehrsart;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "black",
  detektierteVerkehrsart: undefined,
});

const iconOptions = computed(() => {
  if (props.detektierteVerkehrsart === Verkehrsart.RAD) {
    return new IconOptions("mdi-bicycle", "Verkehrsart: Fahrrad");
  } else if (props.detektierteVerkehrsart === Verkehrsart.KFZ) {
    return new IconOptions("mdi-car", "Verkehrsart: KFZ");
  } else {
    return new IconOptions(
      "mdi-alert-circle",
      "Verkehrsart konnte nicht ermittelt werden"
    );
  }
});
</script>
