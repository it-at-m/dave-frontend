<template>
    <div>
        <v-autocomplete
            v-model="auswertungOptions.mstIds"
            :items="messstellen"
            class="mt-4"
            outlined
            dense
            chips
            small-chips
            label="Jahre"
            multiple
            clearable
            deletable-chips
        />

        <v-autocomplete
            v-model="auswertungOptions.mqIds"
            :items="messquerschnitte"
            class="mt-4"
            outlined
            dense
            chips
            small-chips
            label="Jahre"
            multiple
            clearable
            deletable-chips
        />
    </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import KeyVal from "@/types/KeyVal";
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/MessstelleAuswertungOptionsDTO";

interface Props {
    value: MessstelleAuswertungOptionsDTO;
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "input", v: MessstelleAuswertungOptionsDTO): void;
}>();

const auswertungOptions = computed({
    get: () => props.value,
    set: (v) => emits("input", v),
});

const messstellen: ComputedRef<Array<KeyVal>> = computed(() => {
    const result: Array<KeyVal> = [];
    for (let index = 2006; index < new Date().getFullYear(); index++) {
        result.push({
            text: `${index}`,
            value: `${index}`,
        });
    }
    return result;
});

const messquerschnitte: ComputedRef<Array<KeyVal>> = computed(() => {
    const result: Array<KeyVal> = [];
    for (let index = 2006; index < new Date().getFullYear(); index++) {
        result.push({
            text: `${index}`,
            value: `${index}`,
        });
    }
    return result;
});
</script>
