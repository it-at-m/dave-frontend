<template>
  <v-overlay
    absolute
    :model-value="value"
  >
    <v-progress-circular
      :size="120"
      :width="10"
      model-value="30"
      color="grey-lighten-3"
      indeterminate
    >
      laden
    </v-progress-circular>
  </v-overlay>
</template>

<script lang="ts" setup>
interface Props {
  value: boolean;
}

defineProps<Props>();
</script>
