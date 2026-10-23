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
import type MessstelleOptions from "@/types/messstelle/MessstelleOptions";

import { computed } from "vue";

import { Zeitblock } from "@/api/client";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import {
  zeitblockInfo,
  zeitblockStuendlichInfo,
} from "@/types/enum/ZeitblockText";
import { useMessstelleUtils } from "@/util/MessstelleUtils";

const chosenOptionsCopy = defineModel<MessstelleOptions>({ required: true });
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
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb0001)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb0102)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb0203)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb0304)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb0405)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb0506)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb0607)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb0708)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb0809)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb0910)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb1011)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb1112)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb1213)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb1314)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb1415)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb1516)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb1617)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb1718)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb1819)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb1920)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb2021)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb2122)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb2223)!);
  result.push(zeitblockStuendlichInfo.get(Zeitblock.Zb2324)!);
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
