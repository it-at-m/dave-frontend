<template>
  <div>
    <panel-header
      font-size="0.875rem"
      font-weight="bold"
      padding="10px 0 0 0"
      header-text="Zeitintervall"
    />
    <panel-header
      font-size="small"
      font-weight="normal"
      padding="0 0 10px 0"
      header-text="(außer Belastungsplan und Zeitreihe)"
    />
    <v-row>
      <v-col cols="4">
        <v-select
          v-model="chosenOptionsCopy.intervall"
          :items="messdatenIntervalle"
          label="Zeitintervall"
          variant="filled"
          density="compact"
          @mouseover="hoverZeitintervall = true"
          @mouseleave="hoverZeitintervall = false"
        />
      </v-col>
      <v-col cols="4" />
    </v-row>
  </div>
</template>
<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { includes, isNil } from "lodash";
import { computed, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useOptionsmenueSettingsStore } from "@/store/OptionsmenueSettingsStore";
import {
  ZaehldatenIntervall,
  ZaehldatenIntervallToSelect,
} from "@/types/enum/ZaehldatenIntervall";
import Zeitauswahl from "@/types/enum/Zeitauswahl";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });
const hoverZeitintervall = ref(false);

const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

const smallestCommonDenominatorOfIntervallForChosenFahrzeugOptions = computed(
  () => {
    return optionsmenueSettingsStore.getSmallestCommonDenominatorOfIntervallForChosenFahrzeugOptions(
      optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten,
      chosenOptionsCopy.value.fahrzeuge
    );
  }
);

const messdatenIntervalle = computed(() => {
  const intervals =
    smallestCommonDenominatorOfIntervallForChosenFahrzeugOptions.value;
  return ZaehldatenIntervallToSelect.filter((zaehldatenIntervall) =>
    intervals.includes(zaehldatenIntervall.value)
  );
});

watch(
  () => messdatenIntervalle.value,
  () => {
    if (
      !includes(
        smallestCommonDenominatorOfIntervallForChosenFahrzeugOptions.value,
        chosenOptionsCopy.value.intervall
      )
    ) {
      const intervallToSet =
        messdatenIntervalle.value[messdatenIntervalle.value.length - 1].value;
      chosenOptionsCopy.value.intervall = isNil(intervallToSet)
        ? ZaehldatenIntervall.STUNDE_KOMPLETT
        : intervallToSet;
    }
  },
  { deep: true, immediate: true }
);
</script>
