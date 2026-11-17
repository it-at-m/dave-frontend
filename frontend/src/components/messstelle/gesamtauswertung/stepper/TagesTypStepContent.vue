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
import type MessstelleAuswertungOptions from "@/types/messstelle/auswertung/MessstelleAuswertungOptions";

import { computed } from "vue";

import { TagesTyp } from "@/api/client";
import { tagesTypText } from "@/types/enum/TagesTypText";

const auswertungOptions = defineModel<MessstelleAuswertungOptions>({
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
