<template>
  <v-row
    align="start"
    justify="center"
    dense
    no-gutters
  >
    <v-col cols="4">
      <v-select
        v-if="isZeitauswahlSpitzenstundeOrBlock"
        v-model="chosenOptionsCopy.zeitblock"
        label="Zeitblock"
        :items="zeitblockValues"
        variant="filled"
        density="compact"
      />
      <v-select
        v-if="isZeitauswahlStunde"
        v-model="chosenOptionsCopy.zeitblock"
        label="Stunde"
        :items="stuendlichValues"
        variant="filled"
        density="compact"
      />
    </v-col>
    <v-spacer />
  </v-row>
</template>
<script lang="ts" setup>
import type KeyVal from "@/types/common/KeyVal";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { computed } from "vue";

import { Zeitblock } from "@/api/client";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import { zeitblockInfo } from "@/types/enum/ZeitblockText";
import { useMessstelleUtils } from "@/util/MessstelleUtils";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });
const messstelleUtils = useMessstelleUtils();

const zeitblockValues = computed(() => {
  const result = new Array<KeyVal>();
  result.push(zeitblockInfo.get(Zeitblock.Zb0006)!);
  result.push(zeitblockInfo.get(Zeitblock.Zb0610)!);
  result.push(zeitblockInfo.get(Zeitblock.Zb1015)!);
  result.push(zeitblockInfo.get(Zeitblock.Zb1519)!);
  result.push(zeitblockInfo.get(Zeitblock.Zb1924)!);
  if (isZeitauswahlSpitzenstunde.value) {
    result.push(zeitblockInfo.get(Zeitblock.Zb0024)!);
  }
  return result;
});

const stuendlichValues = computed(() => {
  const result = new Array<KeyVal>();
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_00_01)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_01_02)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_02_03)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_03_04)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_04_05)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_05_06)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_06_07)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_07_08)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_08_09)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_09_10)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_10_11)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_11_12)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_12_13)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_13_14)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_14_15)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_15_16)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_16_17)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_17_18)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_18_19)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_19_20)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_20_21)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_21_22)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_22_23)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.ZB_23_24)!);
  return result;
});

const isZeitauswahlStunde = computed(() => {
  return chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.STUNDE;
});

const isZeitauswahlSpitzenstundeOrBlock = computed(() => {
  return (
    chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.BLOCK ||
    isZeitauswahlSpitzenstunde.value
  );
});

const isZeitauswahlSpitzenstunde = computed(() => {
  return messstelleUtils.isZeitauswahlSpitzenstunde(
    chosenOptionsCopy.value.zeitauswahl
  );
});
</script>
