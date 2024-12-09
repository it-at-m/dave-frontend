<template>
  <v-banner>
    <v-icon
      color="error"
      size="36"
      icon="mdi-alert-decagram-outline"
    />
    <p class="ml-2">
      {{ message }}
    </p>
  </v-banner>
</template>
<script setup lang="ts">
interface Props {
  message: string;
}
defineProps<Props>();
</script>
