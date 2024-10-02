<template>
  <tooltip-with-icon
    :size="large ? 'x-large' : 'default'"
    :color="color"
    :icon="icon.iconPath"
    :tooltip="icon.tooltip"
  />
</template>
<script setup lang="ts">
import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
  large?: boolean;
  color?: string;
}

withDefaults(defineProps<Props>(), {
  large: false,
  color: "white",
});

/**
 * Lädt das richtige MDI Icon aus der Liste.
 */
const icon = new IconTooltip("mdi-alpha-s", "Sonderzählung");
</script>
