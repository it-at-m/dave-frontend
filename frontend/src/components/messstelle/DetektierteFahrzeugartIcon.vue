<template>
  <tooltip-with-icon
    :icon="iconOptions.icon"
    :tooltip="iconOptions.tooltip"
    :color="color"
    size="small"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import IconOptions from "@/types/util/IconOptions";

interface Props {
  detektierteFahrzeugart?: DetektierteFahrzeugart;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "black",
});

const iconOptions = computed(() => {
  if (props.detektierteFahrzeugart === DetektierteFahrzeugart.RAD) {
    return new IconOptions("mdi-bicycle", "Fahrzeugart: Fahrrad");
  } else if (props.detektierteFahrzeugart === DetektierteFahrzeugart.KFZ) {
    return new IconOptions("mdi-car", "Fahrzeugart: KFZ");
  } else {
    return new IconOptions(
      "mdi-alert-circle",
      "Fahrzeugart konnte nicht ermittelt werden"
    );
  }
});
</script>
