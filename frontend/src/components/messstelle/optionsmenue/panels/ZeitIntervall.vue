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

import { computed, ref } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useOptionsmenueSettingsStore } from "@/store/OptionsmenueSettingsStore";
import { ZaehldatenIntervallToSelect } from "@/types/enum/ZaehldatenIntervall";

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
</script>
