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
          :disabled="isIntervallChangingLocked"
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
import Zeitauswahl from "@/types/enum/Zeitauswahl";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });
const hoverZeitintervall = ref(false);

const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

const messdatenIntervalle = computed(() => {
  return ZaehldatenIntervallToSelect.filter((zaehldatenIntervall) =>
    optionsmenueSettingsStore.intervalleByOptionsmenueSettingsAccordingMessfaehigkeiten.includes(
      zaehldatenIntervall.value
    )
  );
});

const isIntervallChangingLocked = computed(() => {
  return (
    (isZeitauswahlSpitzenstunde.value &&
      chosenOptionsCopy.value.zeitraum.length !== 2) ||
    (isZeitauswahlSpitzenstundeKfz.value &&
      chosenOptionsCopy.value.zeitraum.length === 2)
  );
});

const isZeitauswahlSpitzenstundeKfz = computed(() => {
  return chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ;
});

const isZeitauswahlSpitzenstunde = computed(() => {
  return (
    chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ ||
    chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
    chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
  );
});
</script>
