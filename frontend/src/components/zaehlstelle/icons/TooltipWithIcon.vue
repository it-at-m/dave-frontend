<template>
  <v-icon
    v-tooltip:bottom="tooltip"
    class="mr-1"
    :icon="icon"
    :size="size"
    :color="color"
  />
</template>
<script setup lang="ts">
interface Props {
  color?: string;
  icon?: string;
  tooltip?: string;
  size?: string;
}

withDefaults(defineProps<Props>(), {
  color: "black",
  size: "default",
});
</script>
