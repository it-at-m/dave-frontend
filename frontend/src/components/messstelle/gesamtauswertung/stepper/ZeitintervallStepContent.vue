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
            v-model="auswertungOptions.zeitintervalle"
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
            <template #append-item>
              <v-btn
                class="text-none"
                width="100%"
                flat
                :text="buttonText"
                @click="buttonClick"
              ></v-btn>
            </template>
        </v-autocomplete>
    </div>
</template>

<script setup lang="ts">
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import {computed, onMounted, ref, watch} from "vue";
import {
  Halbjahre,
  Monate,
  Quartale,
  text2HalbJahr,
  text2Monat,
  text2Quartal,
  ZeitintervallCategories,
} from "@/types/enum/AuswertungCategories";

const auswertungOptions = defineModel<MessstelleAuswertungOptionsDTO>({required: true});

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

onMounted(()=> {
  preSetSelectedCategory();
})

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

const buttonText = computed(() => {
  return showSelectAllButton.value ? "Alle auswählen" : "Alle abwählen";
});

watch(selectedCategory, () => {
  if (previuosSelectedCategory.value !== selectedCategory.value) {
    auswertungOptions.value.zeitintervalle = [];
  }
  if (selectedCategory.value === ZeitintervallCategories.JAHRE) {
    auswertungOptions.value.zeitintervalle = [selectedCategory.value];
  }
  previuosSelectedCategory.value = selectedCategory.value;
})

function preSetSelectedCategory() {
  const zeitintervalle = auswertungOptions.value.zeitintervalle;
  if (zeitintervalle.length === 0) {
    selectedCategory.value = "";
  } else if (text2Monat.has(zeitintervalle[0])) {
    selectedCategory.value = ZeitintervallCategories.MONATE;
  } else if (text2Quartal.has(zeitintervalle[0])) {
    selectedCategory.value = ZeitintervallCategories.QUARTALE;
  } else if (text2HalbJahr.has(zeitintervalle[0])) {
    selectedCategory.value = ZeitintervallCategories.HALBJAHRE;
  } else {
    selectedCategory.value = ZeitintervallCategories.JAHRE;
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
