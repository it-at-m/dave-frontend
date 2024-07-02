<template>
  <div>
    <p>Welche Zeitintervalle sollen verglichen werden?</p>
    <v-autocomplete
      v-model="selectedCategory"
      :items="categories"
      class="mt-4"
      variant="outlined"
      density="compact"
      label="Zeitintervalle"
      @update:model-value="categoryIsSelected"
    />
    <v-autocomplete
      v-if="showSubCategoriesSelect"
      v-model="auswertungOptions.zeitintervalle"
      :items="selectableSubCategories"
      class="mt-4"
      variant="outlined"
      density="compact"
      chips
      small-chips
      :label="selectedCategory"
      multiple
      clearable
      closable-chips
    >
      <template #append-item>
        <v-btn
          v-if="showSelectAllButton"
          width="100%"
          variant="text"
          @click="selectAll"
          >Alle auswählen</v-btn
        >
        <v-btn
          v-else
          width="100%"
          variant="text"
          @click="deselectAll"
          >Alle abwählen</v-btn
        >
      </template>
    </v-autocomplete>
  </div>
</template>

<script setup lang="ts">
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import { computed, ref } from "vue";

import {
  Halbjahre,
  Monate,
  Quartale,
  ZeitintervallCategories,
} from "@/types/enum/AuswertungCategories";

interface Props {
  value: MessstelleAuswertungOptionsDTO;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "input", v: MessstelleAuswertungOptionsDTO): void;
}>();

const categories = [
  ZeitintervallCategories.JAHRE,
  ZeitintervallCategories.HALBJAHRE,
  ZeitintervallCategories.QUARTALE,
  ZeitintervallCategories.MONATE,
];
const categoryHalbJahre = [Halbjahre.HALBJAHR_1, Halbjahre.HALBJAHR_2];
const categoryQuartale = [
  Quartale.QUARTAL_1,
  Quartale.QUARTAL_2,
  Quartale.QUARTAL_3,
  Quartale.QUARTAL_4,
];
const categoryMonate = [
  Monate.JANUAR,
  Monate.FEBRUAR,
  Monate.MAERZ,
  Monate.APRIL,
  Monate.MAI,
  Monate.JUNI,
  Monate.JULI,
  Monate.AUGUST,
  Monate.SEPTEMBER,
  Monate.OKTOBER,
  Monate.NOVEMBER,
  Monate.DEZEMBER,
];

const selectedCategory = ref("");
const previuosSelectedCategory = ref("");

const auswertungOptions = computed({
  get: () => props.value,
  set: (payload: MessstelleAuswertungOptionsDTO) => emits("input", payload),
});

const showSubCategoriesSelect = computed(() => {
  return (
    selectedCategory.value &&
    selectedCategory.value !== ZeitintervallCategories.JAHRE
  );
});

const selectableSubCategories = computed(() => {
  let categories: Array<string> = [];
  switch (selectedCategory.value) {
    case ZeitintervallCategories.HALBJAHRE:
      categories = [...categoryHalbJahre];
      break;
    case ZeitintervallCategories.QUARTALE:
      categories = [...categoryQuartale];
      break;
    case ZeitintervallCategories.MONATE:
      categories = [...categoryMonate];
      break;
  }
  return categories;
});
function categoryIsSelected() {
  if (previuosSelectedCategory.value !== selectedCategory.value) {
    auswertungOptions.value.zeitintervalle = [];
  }
  if (selectedCategory.value === ZeitintervallCategories.JAHRE) {
    auswertungOptions.value.zeitintervalle.push(selectedCategory.value);
  }
  previuosSelectedCategory.value = selectedCategory.value;
}

function selectAll() {
  auswertungOptions.value.zeitintervalle = [];
  switch (selectedCategory.value) {
    case ZeitintervallCategories.HALBJAHRE:
      auswertungOptions.value.zeitintervalle.push(...categoryHalbJahre);
      break;
    case ZeitintervallCategories.QUARTALE:
      auswertungOptions.value.zeitintervalle.push(...categoryQuartale);
      break;
    case ZeitintervallCategories.MONATE:
      auswertungOptions.value.zeitintervalle.push(...categoryMonate);
      break;
  }
}

function deselectAll() {
  auswertungOptions.value.zeitintervalle = [];
}

const showSelectAllButton = computed(() => {
  let helper = 1;
  switch (selectedCategory.value) {
    case ZeitintervallCategories.HALBJAHRE:
      helper = categoryHalbJahre.length / 2;
      break;
    case ZeitintervallCategories.QUARTALE:
      helper = categoryQuartale.length / 2;
      break;
    case ZeitintervallCategories.MONATE:
      helper = categoryMonate.length / 2;
      break;
  }

  return auswertungOptions.value.zeitintervalle.length <= helper;
});
</script>
