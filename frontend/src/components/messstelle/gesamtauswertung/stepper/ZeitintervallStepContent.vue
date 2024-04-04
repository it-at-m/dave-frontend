<template>
    <div>
        <p>Welche Zeitintervalle sollen verglichen werden?</p>
        <v-autocomplete
            v-model="selectedCategory"
            :items="categories"
            class="mt-4"
            outlined
            dense
            label="Zeitintervalle"
            @input="checkIfJahreIsSelected"
        />
        <v-autocomplete
            v-if="showSubCategoriesSelect"
            v-model="auswertungOptions.zeitintervalle"
            :items="selectableSubCategories"
            class="mt-4"
            outlined
            dense
            chips
            small-chips
            :label="selectedCategory"
            multiple
            clearable
            deletable-chips
            @input="checkIfSelectAll"
        />
    </div>
</template>

<script setup lang="ts">
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/MessstelleAuswertungOptionsDTO";
import { computed, ref } from "vue";

interface Props {
    value: MessstelleAuswertungOptionsDTO;
}

const jahre = "Jahre";
const halbjahre = "Halbjahre";
const quartale = "Quartale";
const monate = "Monate";
const selectAll = "alle auswählen";

const categories = [jahre, halbjahre, quartale, monate];
const categoryMonth = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
];

const selectedCategory = ref("");

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "input", v: MessstelleAuswertungOptionsDTO): void;
}>();

const auswertungOptions = computed({
    get: () => props.value,
    set: (v) => emits("input", v),
});

const showSubCategoriesSelect = computed(() => {
    return selectedCategory.value && selectedCategory.value !== jahre;
});

const selectableSubCategories = computed(() => {
    let categories: Array<string> = [];
    switch (selectedCategory.value) {
        case halbjahre:
            categories = [
                "1. Halbjahr (Jan - Juni)",
                "2. Halbjahr (Juli - Dez)",
            ];
            break;
        case quartale:
            categories = [
                "1. Quartal (Jan - März)",
                "2. Quartal (Apr - Juni)",
                "3. Quartal (Juli - Sept)",
                "4. Quartal (Okt - Dez)",
            ];
            break;
        case monate:
            categories = [...categoryMonth, selectAll];
            break;
    }
    return categories;
});
function checkIfJahreIsSelected() {
    auswertungOptions.value.zeitintervalle = [];
    if (selectedCategory.value === jahre) {
        auswertungOptions.value.zeitintervalle.push(selectedCategory.value);
    }
}

function checkIfSelectAll() {
    if (auswertungOptions.value.zeitintervalle.includes(selectAll)) {
        auswertungOptions.value.zeitintervalle = [];
        auswertungOptions.value.zeitintervalle.push(...categoryMonth);
    }
}
</script>
