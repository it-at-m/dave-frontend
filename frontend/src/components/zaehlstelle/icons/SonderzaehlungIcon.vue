<template>
  <tooltip-with-icon
    :x-large="large"
    :dense="dense"
    :color="color"
    :icon="icon.iconPath"
    :tooltip="icon.tooltip"
  ></tooltip-with-icon>
</template>
<script setup lang="ts">
import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
  large?: boolean;
  dense?: boolean;
  color?: string;
}

withDefaults(defineProps<Props>(), {
  large: false,
  dense: false,
  color: "white",
});

/**
 * Lädt das richtige MDI Icon aus der Liste.
 */
const icon = new IconTooltip("mdi-alpha-s", "Sonderzählung");
</script>
