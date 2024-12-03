<template>
  <div>
    <p>Welche Zeitintervalle sollen verglichen werden?</p>
    <v-autocomplete
      v-model="selectedCategory"
      :items="selectableCategories"
      class="mt-4"
      density="compact"
      label="Zeitintervalle"
      variant="outlined"
    />
    <v-autocomplete
      v-if="showSubCategoriesSelect"
      v-model="auswertungOptions.zeitraum"
      :items="selectableSubCategories"
      class="mt-4"
      density="compact"
      chips
      :label="selectedCategory"
      multiple
      clearable
      variant="outlined"
      closable-chips
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
  </div>
</template>

<script setup lang="ts">
import type KeyVal from "@/types/common/KeyVal";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import { computed, onMounted, ref, watch } from "vue";

import {
  AuswertungsZeitraum,
  halbjahre,
  jahre,
  monate,
  quartale,
  ZeitintervallCategories,
} from "@/types/enum/AuswertungCategories";

const auswertungOptions = defineModel<MessstelleAuswertungOptionsDTO>({
  required: true,
});

const categories = [
  ZeitintervallCategories.JAHRE,
  ZeitintervallCategories.HALBJAHRE,
  ZeitintervallCategories.QUARTALE,
  ZeitintervallCategories.MONATE,
];
const categoryHalbJahre = [
  halbjahre.get(AuswertungsZeitraum.HALBJAHR_1),
  halbjahre.get(AuswertungsZeitraum.HALBJAHR_2),
];
const categoryQuartale = [
  quartale.get(AuswertungsZeitraum.QUARTAL_1),
  quartale.get(AuswertungsZeitraum.QUARTAL_2),
  quartale.get(AuswertungsZeitraum.QUARTAL_3),
  quartale.get(AuswertungsZeitraum.QUARTAL_4),
];
const categoryMonate = [
  monate.get(AuswertungsZeitraum.JANUAR),
  monate.get(AuswertungsZeitraum.FEBRUAR),
  monate.get(AuswertungsZeitraum.MAERZ),
  monate.get(AuswertungsZeitraum.APRIL),
  monate.get(AuswertungsZeitraum.MAI),
  monate.get(AuswertungsZeitraum.JUNI),
  monate.get(AuswertungsZeitraum.JULI),
  monate.get(AuswertungsZeitraum.AUGUST),
  monate.get(AuswertungsZeitraum.SEPTEMBER),
  monate.get(AuswertungsZeitraum.OKTOBER),
  monate.get(AuswertungsZeitraum.NOVEMBER),
  monate.get(AuswertungsZeitraum.DEZEMBER),
];

onMounted(() => {
  preSetSelectedCategory();
});

const selectedCategory = ref<string>("");
const previuosSelectedCategory = ref("");

const showSubCategoriesSelect = computed(() => {
  return (
    selectedCategory.value &&
    selectedCategory.value !== ZeitintervallCategories.JAHRE
  );
});

const selectableCategories = computed(() => {
  const result: Array<string> = [...categories];
  return result;
});

const selectableSubCategories = computed(() => {
  let categories: Array<KeyVal | undefined> = [];
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

const buttonText = computed(() => {
  return showSelectAllButton.value ? "Alle auswählen" : "Alle abwählen";
});

watch(selectedCategory, () => {
  if (previuosSelectedCategory.value !== selectedCategory.value) {
    auswertungOptions.value.zeitraum = [];
    auswertungOptions.value.zeitraumCategorie = selectedCategory.value;
  }
  if (selectedCategory.value === ZeitintervallCategories.JAHRE) {
    auswertungOptions.value.zeitraum = [AuswertungsZeitraum.JAHRE];
  }
  previuosSelectedCategory.value = selectedCategory.value;
});

function preSetSelectedCategory() {
  const zeitintervalle = auswertungOptions.value.zeitraum;
  if (zeitintervalle.length === 0) {
    selectedCategory.value = "";
  } else if (monate.has(zeitintervalle[0])) {
    selectedCategory.value = ZeitintervallCategories.MONATE;
  } else if (quartale.has(zeitintervalle[0])) {
    selectedCategory.value = ZeitintervallCategories.QUARTALE;
  } else if (halbjahre.has(zeitintervalle[0])) {
    selectedCategory.value = ZeitintervallCategories.HALBJAHRE;
  } else if (jahre.has(zeitintervalle[0])) {
    selectedCategory.value = ZeitintervallCategories.JAHRE;
  } else {
    selectedCategory.value = "";
  }
  previuosSelectedCategory.value = selectedCategory.value;
}

function buttonClick() {
  if (showSelectAllButton.value) {
    selectAll();
  } else {
    deselectAll();
  }
}

function selectAll() {
  auswertungOptions.value.zeitraum = [];
  switch (selectedCategory.value) {
    case ZeitintervallCategories.HALBJAHRE:
      auswertungOptions.value.zeitraum.push(
        AuswertungsZeitraum.HALBJAHR_1,
        AuswertungsZeitraum.HALBJAHR_2
      );
      break;
    case ZeitintervallCategories.QUARTALE:
      auswertungOptions.value.zeitraum.push(
        AuswertungsZeitraum.QUARTAL_1,
        AuswertungsZeitraum.QUARTAL_2,
        AuswertungsZeitraum.QUARTAL_3,
        AuswertungsZeitraum.QUARTAL_4
      );
      break;
    case ZeitintervallCategories.MONATE:
      auswertungOptions.value.zeitraum.push(
        AuswertungsZeitraum.JANUAR,
        AuswertungsZeitraum.FEBRUAR,
        AuswertungsZeitraum.MAERZ,
        AuswertungsZeitraum.APRIL,
        AuswertungsZeitraum.MAI,
        AuswertungsZeitraum.JUNI,
        AuswertungsZeitraum.JULI,
        AuswertungsZeitraum.AUGUST,
        AuswertungsZeitraum.SEPTEMBER,
        AuswertungsZeitraum.OKTOBER,
        AuswertungsZeitraum.NOVEMBER,
        AuswertungsZeitraum.DEZEMBER
      );
      break;
  }
}

function deselectAll() {
  auswertungOptions.value.zeitraum = [];
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

  return auswertungOptions.value.zeitraum.length <= helper;
});
</script>
