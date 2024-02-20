<template>
    <v-row>
        <v-col cols="4">
            <v-hover v-model="hoverSelectZeitintervallCopy">
                <v-select
                    v-model="chosenOptionsCopy.intervall"
                    :items="messdatenIntervalle"
                    label="Zeitintervall"
                    filled
                    dense
                    :disabled="isZeitauswahlSpitzenstundeKfz"
                ></v-select>
            </v-hover>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import ZaehldatenIntervall, {
    ZaehldatenIntervallToSelect,
} from "@/types/enum/ZaehldatenIntervall";
import { computed, watch } from "vue";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import Zeitauswahl from "@/types/enum/Zeitauswahl";

const emit = defineEmits<{
    (e: "update:hoverSelectZeitintervall", i: boolean): void;
    (e: "input", i: MessstelleOptionsDTO): void;
}>();

interface Props {
    hoverSelectZeitintervall: boolean;
    value: MessstelleOptionsDTO;
}

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

const hoverSelectZeitintervallCopy = computed({
    get: () => props.hoverSelectZeitintervall,
    set: (payload: boolean) => emit("update:hoverSelectZeitintervall", payload),
});
const props = defineProps<Props>();

const messdatenIntervalle = computed(() => {
    return ZaehldatenIntervallToSelect;
});

const isZeitauswahlSpitzenstundeKfz = computed(() => {
    return chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.SPITZENSTUNDE_KFZ;
});

watch(
    () => chosenOptionsCopy.value.zeitauswahl,
    () => {
        if (
            chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.SPITZENSTUNDE_KFZ
        ) {
            chosenOptionsCopy.value.intervall =
                ZaehldatenIntervall.STUNDE_VIERTEL;
        }
    }
);
</script>