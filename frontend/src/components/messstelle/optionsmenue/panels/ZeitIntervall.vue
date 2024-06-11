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
                        :disabled="isIntervallChangingLocked"
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
import { useMessstelleStore } from "@/store/messstelle";
import { def } from "@vue/shared";

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
const messstelleStore = useMessstelleStore();

const messdatenIntervalle = computed(() => {
    if (
        messstelleStore.getActiveMessfaehigkeit.intervall ===
        ZaehldatenIntervall.STUNDE_KOMPLETT
    ) {
        return ZaehldatenIntervallToSelect.filter((value) => {
            return value.value === ZaehldatenIntervall.STUNDE_KOMPLETT;
        });
    } else {
        return ZaehldatenIntervallToSelect;
    }
});

const isIntervallChangingLocked = computed(() => {
    return (
        (isZeitauswahlSpitzenstunde.value &&
            chosenOptionsCopy.value.zeitraum.length != 2) ||
        (isZeitauswahlSpitzenstundeKfz.value &&
            chosenOptionsCopy.value.zeitraum.length == 2)
    );
});

const isZeitauswahlSpitzenstundeKfz = computed(() => {
    return chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.SPITZENSTUNDE_KFZ;
});

const isZeitauswahlSpitzenstunde = computed(() => {
    return (
        chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.SPITZENSTUNDE_KFZ ||
        chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.SPITZENSTUNDE_RAD ||
        chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.SPITZENSTUNDE_FUSS
    );
});

watch(
    () => chosenOptionsCopy.value.zeitauswahl,
    () => {
        if (isIntervallChangingLocked.value) {
            chosenOptionsCopy.value.intervall =
                ZaehldatenIntervall.STUNDE_VIERTEL;
        }
    }
);
</script>