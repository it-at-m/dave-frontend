<template>
  <v-icon
    v-tooltip:bottom="tooltip"
    class="mr-1"
    :icon="icon"
    :size="iconSize"
    :color="color"
  />
</template>
<script setup lang="ts">
import { computed } from "vue";

// TODO dense entfernen und die Size direkt übergeben als String
interface Props {
  small?: boolean;
  large?: boolean;
  xLarge?: boolean;
  dense?: boolean;
  color?: string;
  icon?: string;
  tooltip?: string;
}

const props = withDefaults(defineProps<Props>(), {
  small: false,
  large: false,
  xLarge: false,
  dense: false,
  color: "black",
});
// x-small, small, default, large, and x-large
const iconSize = computed(() => {
  let iconSize = "default";
  if (props.small) {
    iconSize = "small";
  }
  if (props.large) {
    iconSize = "large";
  }
  if (props.xLarge) {
    iconSize = "x-large";
  }
  return iconSize;
});
</script>
