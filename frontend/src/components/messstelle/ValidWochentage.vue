<template>
  <v-sheet
    class="px-4"
    color="white"
  >
    <v-icon icon="mdi-chart-line" />
    <span>
      {{ message }}
    </span>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useMessstelleStore } from "@/store/MessstelleStore";

const messstelleStore = useMessstelleStore();

const message = computed(() => {
  return `Von den ausgewählten ${messstelleStore.getRequestedMeasuringDays} Tagen ${getChosenWochentageNumberText.value} in die Auswertung eingeflossen.`;
});

const getChosenWochentageNumberText = computed(() => {
  if (messstelleStore.getIncludedMeasuringDays === 1) {
    return "ist 1 Tag";
  } else {
    return `sind ${messstelleStore.getIncludedMeasuringDays} Tage`;
  }
});
</script>
