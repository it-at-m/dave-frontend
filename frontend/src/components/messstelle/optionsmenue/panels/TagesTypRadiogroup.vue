<template>
  <div>
    <panel-header
      font-size="0.875rem"
      font-weight="bold"
      padding="10px 0 0 0"
      header-text="Wochentag"
    />
    <v-row no-gutters>
      <v-col cols="8">
        <v-radio-group
          v-model="chosenOptionsCopy.tagesTyp"
          class="full-width"
          density="compact"
        >
          <v-radio
            :value="TagesTyp.WERKTAG_DI_MI_DO"
            :label="getTagesTypText(TagesTyp.WERKTAG_DI_MI_DO)"
          />
          <v-radio
            :value="TagesTyp.WERKTAG_MO_FR"
            :label="getTagesTypText(TagesTyp.WERKTAG_MO_FR)"
          />
          <v-radio
            :value="TagesTyp.SAMSTAG"
            :label="getTagesTypText(TagesTyp.SAMSTAG)"
          />
          <v-radio
            :value="TagesTyp.SONNTAG_FEIERTAG"
            :label="getTagesTypText(TagesTyp.SONNTAG_FEIERTAG)"
          />
          <v-radio
            :value="TagesTyp.WERKTAG_FERIEN"
            :label="getTagesTypText(TagesTyp.WERKTAG_FERIEN)"
          />
          <v-radio
            :value="TagesTyp.MO_SO"
            :label="getTagesTypText(TagesTyp.MO_SO)"
          />
        </v-radio-group>
      </v-col>
      <v-col cols="4"> {{ helperText }}</v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { computed } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import TagesTyp, { tagesTypText } from "@/types/enum/TagesTyp";
import { useDateUtils } from "@/util/DateUtils";

interface Props {
  isChosenTagesTypValid: boolean;
}

const props = defineProps<Props>();

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });

const dateUtils = useDateUtils();

function getTagesTypText(key: string): string | undefined {
  return tagesTypText.get(key);
}

const helperText = computed(() => {
  let helpText = "";
  if (
    dateUtils.isDateRange(chosenOptionsCopy.value.zeitraum) &&
    (!chosenOptionsCopy.value.tagesTyp ||
      chosenOptionsCopy.value.tagesTyp === TagesTyp.UNSPECIFIED)
  ) {
    helpText = "Bei einem Zeitraum muss ein Wochentag ausgewählt werden.";
  } else if (!props.isChosenTagesTypValid) {
    switch (chosenOptionsCopy.value.tagesTyp) {
      case TagesTyp.WERKTAG_DI_MI_DO:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Di,Mi,Do) mit plausiblen Daten nötig.";
        break;
      case TagesTyp.WERKTAG_MO_FR:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 5 Tage (Mo,Di,Mi,Do,Fr) mit plausiblen Daten nötig.";
        break;
      case TagesTyp.SAMSTAG:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Sa) mit plausiblen Daten nötig.";
        break;
      case TagesTyp.SONNTAG_FEIERTAG:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (So/Feiertag) mit plausiblen Daten nötig.";
        break;
      case TagesTyp.WERKTAG_FERIEN:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Mo,Di,Mi,Do,Fr Ferien) mit plausiblen Daten nötig.";
        break;
      case TagesTyp.MO_SO:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Beliebige Wochentage) mit plausiblen Daten nötig.";
        break;
    }
  }
  return helpText;
});
</script>
<style>
.full-width {
  width: 100%;
}
</style>
