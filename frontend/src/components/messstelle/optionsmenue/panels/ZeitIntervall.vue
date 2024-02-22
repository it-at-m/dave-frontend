<template>
    <div>
        <panel-header
            font-size="0.875rem"
            font-weight="bold"
            padding="10px 0 0 0"
            header-text="Zeitintervall"
        ></panel-header>
        <panel-header
            font-size="small"
            font-weight="normal"
            padding="0 0 10px 0"
            header-text="(außer Belastungsplan und Zeitreihe)"
        ></panel-header>
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
    </div>
</template>
<script setup lang="ts">
import ZaehldatenIntervall, {
    ZaehldatenIntervallToSelect,
} from "@/types/enum/ZaehldatenIntervall";
import { computed, watch } from "vue";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import PanelHeader from "@/components/common/PanelHeader.vue";

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