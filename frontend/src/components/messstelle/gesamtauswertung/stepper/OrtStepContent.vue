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
import { computed, ComputedRef, ref, Ref } from "vue";
import KeyVal from "@/types/KeyVal";
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/MessstelleAuswertungOptionsDTO";
import MessstelleAuswertungService from "@/api/service/MessstelleAuswertungService";
import MessstelleAuswertungDTO from "@/types/messstelle/auswertung/MessstelleAuswertungDTO";

interface Props {
    value: MessstelleAuswertungOptionsDTO;
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "input", v: MessstelleAuswertungOptionsDTO): void;
}>();

loadAllVisibleMessstellen();

const allVisibleMessstellen: Ref<Array<MessstelleAuswertungDTO>> = ref([]);

const auswertungOptions = computed({
    get: () => props.value,
    set: (v) => emits("input", v),
});

const messstellen: ComputedRef<Array<KeyVal>> = computed(() => {
    const result: Array<KeyVal> = [];
    allVisibleMessstellen.value.forEach((mst) => {
        result.push({
            text: `${mst.mstId}-${mst.standort ?? ""}`,
            value: mst.mstId,
        });
    });
    return result;
});

function loadAllVisibleMessstellen(): void {
    MessstelleAuswertungService.getAllVisibleMessstellen().then(
        (messstellen: Array<MessstelleAuswertungDTO>) => {
            allVisibleMessstellen.value = messstellen;
        }
    );
}

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
