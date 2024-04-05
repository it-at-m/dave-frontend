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
        >
            <template #append-item>
                <v-btn
                    v-if="showSelectAllButton"
                    width="100%"
                    text
                    @click="selectAll"
                    >Alle auswählen</v-btn
                >
                <v-btn
                    v-else
                    width="100%"
                    text
                    @click="deselectAll"
                    >Alle abwählen</v-btn
                >
            </template>
        </v-autocomplete>
    </div>
</template>

<script setup lang="ts">
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/MessstelleAuswertungOptionsDTO";
import { computed, ComputedRef, ref } from "vue";

interface Props {
    value: MessstelleAuswertungOptionsDTO;
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "input", v: MessstelleAuswertungOptionsDTO): void;
}>();

const jahre = "Jahre";
const halbjahre = "Halbjahre";
const quartale = "Quartale";
const monate = "Monate";

const categories = [jahre, halbjahre, quartale, monate];
const categoryHalbJahre = [
    "1. Halbjahr (Jan - Juni)",
    "2. Halbjahr (Juli - Dez)",
];
const categoryQuartale = [
    "1. Quartal (Jan - März)",
    "2. Quartal (Apr - Juni)",
    "3. Quartal (Juli - Sept)",
    "4. Quartal (Okt - Dez)",
];
const categoryMonate = [
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

const auswertungOptions = computed({
    get: () => props.value,
    set: (payload: MessstelleAuswertungOptionsDTO) => emits("input", payload),
});

const showSubCategoriesSelect = computed(() => {
    return selectedCategory.value && selectedCategory.value !== jahre;
});

const selectableSubCategories = computed(() => {
    let categories: Array<string> = [];
    switch (selectedCategory.value) {
        case halbjahre:
            categories = [...categoryHalbJahre];
            break;
        case quartale:
            categories = [...categoryQuartale];
            break;
        case monate:
            categories = [...categoryMonate];
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

function selectAll() {
    auswertungOptions.value.zeitintervalle = [];
    switch (selectedCategory.value) {
        case halbjahre:
            auswertungOptions.value.zeitintervalle.push(...categoryHalbJahre);
            break;
        case quartale:
            auswertungOptions.value.zeitintervalle.push(...categoryQuartale);
            break;
        case monate:
            auswertungOptions.value.zeitintervalle.push(...categoryMonate);
            break;
    }
}

function deselectAll() {
    auswertungOptions.value.zeitintervalle = [];
}

const showSelectAllButton: ComputedRef<boolean> = computed(() => {
    let helper = 1;
    switch (selectedCategory.value) {
        case halbjahre:
            helper = categoryHalbJahre.length / 2;
            break;
        case quartale:
            helper = categoryQuartale.length / 2;
            break;
        case monate:
            helper = categoryMonate.length / 2;
            break;
    }

    return auswertungOptions.value.zeitintervalle.length <= helper;
});
</script>
