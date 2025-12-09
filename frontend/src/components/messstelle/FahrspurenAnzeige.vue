<template>
  <span class="text-caption">
    {{ textAnzahlFahrspuren }}
  </span>
</template>

<script setup lang="ts">
import { isNil } from "lodash";
import { computed, ref } from "vue";

interface Props {
  fahrspuren: number;
}

const props = defineProps<Props>();

const textByAnzahlFahrspuren = ref<Map<number, string>>(
  new Map([
    [0, "0 Fahrstreifen"],
    [1, "1 Fahrstreifen"],
    [2, "2 Fahrstreifen"],
    [3, "3 Fahrstreifen"],
    [4, "4 Fahrstreifen"],
    [5, "5 Fahrstreifen"],
    [6, "6 Fahrstreifen"],
    [7, "7 Fahrstreifen"],
  ])
);

/**
 * Ermittelt den Text passend zur Anzahl der Fahrspuren.
 */
const textAnzahlFahrspuren = computed<string>(() => {
  let result = textByAnzahlFahrspuren.value.get(props.fahrspuren);
  if (isNil(result)) {
    result = "Keine Information zur Fahrstreifenanzahl vorhanden";
  }
  return result;
});
</script>
