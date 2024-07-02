<template>
  <v-tooltip location="bottom">
    <template #activator="{ props }">
      <v-icon
        :small="small"
        :large="large"
        :size="xLarge ? 'x-large' : undefined"
        :size="dense ? 'small' : undefined"
        class="mr-1"
        :color="color"
        v-bind="props"
        >{{ icon }}
      </v-icon>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>
<script setup lang="ts">
interface Props {
  small?: boolean;
  large?: boolean;
  xLarge?: boolean;
  dense?: boolean;
  color?: string;
  icon?: string;
  tooltip?: string;
}

withDefaults(defineProps<Props>(), {
  small: false,
  large: false,
  xLarge: false,
  dense: false,
  color: "black",
});
</script>
