<template>
    <v-col cols="4">
        <v-hover v-model="hoverSelectZeitintervallCopy">
            <v-select
                v-model="intervallCopy"
                :items="messdatenIntervalle"
                label="Zeitintervall"
                filled
                dense
                :disabled="isZeitauswahlSpitzenstundeKfz"
            ></v-select>
        </v-hover>
    </v-col>
</template>
<script setup lang="ts">
import ZaehldatenIntervall, {
    ZaehldatenIntervallToSelect,
} from "@/types/enum/ZaehldatenIntervall";
import { computed } from "vue";
const emit = defineEmits<{
    (e: "update:intervall", i: ZaehldatenIntervall): void;
    (e: "update:hoverSelectZeitintervall", i: boolean): void;
}>();

interface Props {
    hoverSelectZeitintervall: boolean;
    intervall: ZaehldatenIntervall;
    isZeitauswahlSpitzenstundeKfz: boolean;
}

const intervallCopy = computed({
    get: () => props.intervall,
    set: (payload: ZaehldatenIntervall) => emit("update:intervall", payload),
});

const hoverSelectZeitintervallCopy = computed({
    get: () => props.hoverSelectZeitintervall,
    set: (payload: boolean) => emit("update:hoverSelectZeitintervall", payload),
});
const props = defineProps<Props>();

const messdatenIntervalle = computed(() => {
    return ZaehldatenIntervallToSelect;
});
</script>