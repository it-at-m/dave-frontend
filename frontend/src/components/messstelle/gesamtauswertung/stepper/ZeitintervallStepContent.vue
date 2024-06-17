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
            @input="categoryIsSelected"
        />
        <v-autocomplete
            v-if="showSubCategoriesSelect"
            v-model="auswertungOptions.zeitraum"
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
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import { computed, ComputedRef, ref } from "vue";
import KeyVal from "@/types/common/KeyVal";
import {
    AuswertungsZeitraum,
    halbjahre,
    monate,
    quartale,
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
function categoryIsSelected() {
    if (previuosSelectedCategory.value !== selectedCategory.value) {
        auswertungOptions.value.zeitraum = [];
    }
    if (selectedCategory.value === ZeitintervallCategories.JAHRE) {
        auswertungOptions.value.zeitraum.push(AuswertungsZeitraum.JAHRE);
    }
    previuosSelectedCategory.value = selectedCategory.value;
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

const showSelectAllButton: ComputedRef<boolean> = computed(() => {
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
