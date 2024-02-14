<template>
    <v-col cols="4">
        <v-select
            v-if="isZeitauswahlSpitzenstundeOrBlock"
            v-model="copyZeitblock"
            label="Zeitblock"
            :items="zeitblockValues"
            filled
            dense
        >
        </v-select>
        <v-select
            v-if="isZeitauswahlStunde"
            v-model="copyZeitblock"
            label="Stunde"
            :items="stuendlichValues"
            filled
            dense
        >
        </v-select>
    </v-col>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import KeyVal from "@/types/KeyVal";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";
import ZeitblockStuendlich, {
    zeitblockStuendlichInfo,
} from "@/types/enum/ZeitblockStuendlich";
import Zeitauswahl from "@/types/enum/Zeitauswahl";

interface Props {
    zeitblock: string;
}

const emit = defineEmits<{
    (e: "update:zeitblock", i: string): void;
}>();
const props = defineProps<Props>();

const copyZeitblock = computed({
    get: () => props.zeitblock,
    set: (payload: string) => emit("update:zeitblock", payload),
});
const zeitblockValues = computed(() => {
    let result = new Array<KeyVal>();
    result.push(zeitblockInfo.get(Zeitblock.ZB_00_06)!);
    result.push(zeitblockInfo.get(Zeitblock.ZB_06_10)!);
    result.push(zeitblockInfo.get(Zeitblock.ZB_10_15)!);
    result.push(zeitblockInfo.get(Zeitblock.ZB_15_19)!);
    result.push(zeitblockInfo.get(Zeitblock.ZB_19_24)!);
    result.push(zeitblockInfo.get(Zeitblock.ZB_00_24)!);
    return result;
});

const stuendlichValues = computed(() => {
    let result = new Array<KeyVal>();
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_00_01)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_01_02)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_02_03)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_03_04)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_03_04)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_04_05)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_05_06)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_06_07)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_07_08)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_08_09)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_09_10)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_10_11)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_11_12)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_12_13)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_13_14)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_14_15)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_15_16)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_16_17)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_17_18)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_18_19)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_19_20)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_21_22)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_22_23)!);
    result.push(zeitblockStuendlichInfo.get(ZeitblockStuendlich.ZB_23_24)!);
    return result;
});

const isZeitauswahlStunde = computed(() => {
    return copyZeitblock.value == Zeitauswahl.STUNDE;
});

const isZeitauswahlSpitzenstundeOrBlock = computed(() => {
    return (
        copyZeitblock.value == Zeitauswahl.BLOCK ||
        isZeitauswahlSpitzenstunde.value
    );
});

const isZeitauswahlSpitzenstunde = computed(() => {
    return (
        copyZeitblock.value == Zeitauswahl.SPITZENSTUNDE_KFZ ||
        copyZeitblock.value == Zeitauswahl.SPITZENSTUNDE_RAD ||
        copyZeitblock.value == Zeitauswahl.SPITZENSTUNDE_FUSS
    );
});
</script>