<template>
  <v-autocomplete
    v-model="auswertungOptions.jahre"
    :items="jahre"
    class="mt-4"
    variant="outlined"
    density="compact"
    chips
    small-chips
    label="Jahre"
    multiple
    clearable
    closable-chips
  />
</template>

<script setup lang="ts">
import type KeyVal from "@/types/common/KeyVal";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import { computed } from "vue";

interface Props {
  value: MessstelleAuswertungOptionsDTO;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "input", v: MessstelleAuswertungOptionsDTO): void;
}>();

const auswertungOptions = computed({
  get: () => props.value,
  set: (payload: MessstelleAuswertungOptionsDTO) => emits("input", payload),
});

const jahre = computed<Array<KeyVal>>(() => {
  const result: Array<KeyVal> = [];
  const actualDate = new Date();
  for (let index = 2006; index <= actualDate.getFullYear(); index++) {
    result.push({
      text: `${index}`,
      value: `${index}`,
    });
  }
  return result;
});
</script>
