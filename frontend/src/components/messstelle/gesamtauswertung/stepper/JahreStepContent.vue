<template>
    <v-autocomplete
        v-model="auswertungOptions.jahre"
        :items="jahre"
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
</template>

<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import KeyVal from "@/types/KeyVal";
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

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

const jahre: ComputedRef<Array<KeyVal>> = computed(() => {
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
