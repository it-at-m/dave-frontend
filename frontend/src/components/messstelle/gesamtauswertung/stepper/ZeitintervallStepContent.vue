<template>
    <div>
        <p>Welche Zeitintervalle sollen verglichen werden?</p>
        <v-autocomplete
            v-model="selected"
            :items="zeitintervalle"
            class="mt-4"
            outlined
            dense
            label="Zeitintervalle"
            @input="checkIfJahreIsSelected"
        />
        <v-autocomplete
            v-if="showSecondSelect"
            v-model="auswertungOptions.zeitintervalle"
            :items="selectableItems"
            class="mt-4"
            outlined
            dense
            chips
            small-chips
            :label="selected"
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

const zeitintervalle = [jahre, halbjahre, quartale, monate];
const monateItems = [
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

const selected = ref("");

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "input", v: MessstelleAuswertungOptionsDTO): void;
}>();

const auswertungOptions = computed({
    get: () => props.value,
    set: (v) => emits("input", v),
});

const showSecondSelect = computed(() => {
    return selected.value && selected.value !== jahre;
});

const selectableItems = computed(() => {
    let items: Array<string> = [];
    switch (selected.value) {
        case halbjahre:
            items = ["1. Halbjahr (Jan - Juni)", "2. Halbjahr (Juli - Dez)"];
            break;
        case quartale:
            items = [
                "1. Quartal (Jan - März)",
                "2. Quartal (Apr - Juni)",
                "3. Quartal (Juli - Sept)",
                "4. Quartal (Okt - Dez)",
            ];
            break;
        case monate:
            items = [...monateItems, selectAll];
            break;
    }
    return items;
});

function checkIfJahreIsSelected() {
    if (selected.value === jahre) {
        auswertungOptions.value.zeitintervalle.push(selected.value);
    } else {
        auswertungOptions.value.zeitintervalle = [];
    }
}

function checkIfSelectAll() {
    if (auswertungOptions.value.zeitintervalle.includes(selectAll)) {
        auswertungOptions.value.zeitintervalle = [];
        auswertungOptions.value.zeitintervalle.push(...monateItems);
    }
}
</script>
