<template>
  <v-autocomplete
    v-model="auswertungOptions.tagesTyp"
    :items="selectableTagesTypen"
    class="mt-4"
    density="compact"
    label="Wochentag"
    variant="outlined"
  />
</template>

<script setup lang="ts">
import type KeyVal from "@/types/common/KeyVal";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import { computed } from "vue";

import TagesTyp, { tagesTypText } from "@/types/enum/TagesTypText";

const auswertungOptions = defineModel<MessstelleAuswertungOptionsDTO>({
  required: true,
});

const selectableTagesTypen = computed(() => {
  const tagestypen: Array<KeyVal> = [];
  tagesTypText.forEach((value, key) => {
    if (key !== TagesTyp.Unspecified) {
      tagestypen.push({
        title: value,
        value: key,
      });
    }
  });
  return tagestypen;
});
</script>
