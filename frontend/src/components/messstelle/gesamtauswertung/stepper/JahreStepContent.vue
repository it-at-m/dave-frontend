<template>
  <v-autocomplete
    v-model="auswertungOptions.jahre"
    :items="jahre"
    class="mt-4"
    density="compact"
    label="Jahre"
    multiple
    chips
    clearable
    item-title="title"
    item-value="value"
    item-props="props"
    closable-chips
    variant="outlined"
  >
    <template #prepend-item>
      <v-btn
        class="text-none"
        width="100%"
        variant="flat"
        :text="buttonText"
        @click="buttonClick"
      />
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import { toArray } from "lodash";
import { computed, watch } from "vue";

import { useUserStore } from "@/store/UserStore";

interface YearItem {
  title: string;
  value: string;
  props: { disabled: boolean };
}

const auswertungOptions = defineModel<MessstelleAuswertungOptionsDTO>({
  required: true,
});

const MAX_SELECTABLE_NUMBER_OF_YEARS_FOR_ANWENDER = 5;

const userStore = useUserStore();

watch(
  () => auswertungOptions.value.jahre,
  () => {
    if (isSolelyAnwender.value) {
      if (
        toArray(auswertungOptions.value.jahre).length >=
        MAX_SELECTABLE_NUMBER_OF_YEARS_FOR_ANWENDER
      ) {
        jahre.value.forEach((jahrToSelect) => {
          const isJahrSelected = auswertungOptions.value.jahre.includes(
            jahrToSelect.value
          );
          jahrToSelect.props.disabled = !isJahrSelected;
        });
      } else {
        jahre.value.forEach(
          (jahrToSelect) => (jahrToSelect.props.disabled = false)
        );
      }
    }
  }
);

const jahre = computed<Array<YearItem>>(() => {
  const result: Array<YearItem> = [];
  const actualDate = new Date();
  for (let index = 2006; index <= actualDate.getFullYear(); index++) {
    result.push({
      title: `${index}`,
      value: `${index}`,
      props: { disabled: false },
    } as YearItem);
  }
  return result;
});

const isSolelyAnwender = computed(() => {
  return userStore.isSolelyAnwender;
});

const showSelectAllButton = computed(() => {
  let showSelectAll: boolean;
  if (isSolelyAnwender.value) {
    showSelectAll = false;
  } else {
    const helper = jahre.value.length / 2;
    showSelectAll = auswertungOptions.value.jahre.length <= helper;
  }
  return showSelectAll;
});

const buttonText = computed(() => {
  return showSelectAllButton.value ? "Alle auswählen" : "Alle abwählen";
});

function buttonClick() {
  if (showSelectAllButton.value) {
    selectAll();
  } else {
    deselectAll();
  }
}

function selectAll() {
  auswertungOptions.value.jahre = [];
  jahre.value.forEach((item) => {
    auswertungOptions.value.jahre.push(item.value);
  });
}

function deselectAll() {
  auswertungOptions.value.jahre = [];
}
</script>
