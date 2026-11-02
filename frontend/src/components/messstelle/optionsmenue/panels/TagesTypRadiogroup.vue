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
            :value="TagesTyp.WerktagDiMiDo"
            :label="getTagesTypText(TagesTyp.WerktagDiMiDo)"
          />
          <v-radio
            :value="TagesTyp.WerktagMoFr"
            :label="getTagesTypText(TagesTyp.WerktagMoFr)"
          />
          <v-radio
            :value="TagesTyp.SonntagFeiertag"
            :label="getTagesTypText(TagesTyp.SonntagFeiertag)"
          />
          <v-radio
            :value="TagesTyp.Samstag"
            :label="getTagesTypText(TagesTyp.Samstag)"
          />
          <v-radio
            :value="TagesTyp.WerktagFerien"
            :label="getTagesTypText(TagesTyp.WerktagFerien)"
          />
          <v-radio
            :value="TagesTyp.MoSo"
            :label="getTagesTypText(TagesTyp.MoSo)"
          />
        </v-radio-group>
      </v-col>
      <v-col cols="4">
        <p class="text-red">
          {{ helperText }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import type MessstelleOptions from "@/types/messstelle/MessstelleOptions";

import { computed } from "vue";

import { TagesTyp } from "@/api/client";
import PanelHeader from "@/components/common/PanelHeader.vue";
import { tagesTypText } from "@/types/enum/TagesTypText";
import { useDateUtils } from "@/util/DateUtils";

interface Props {
  isZeitraumAndTagestypValid: boolean;
}

const props = defineProps<Props>();

const chosenOptionsCopy = defineModel<MessstelleOptions>({ required: true });

const dateUtils = useDateUtils();

function getTagesTypText(key: TagesTyp): string | undefined {
  return tagesTypText.get(key);
}

const helperText = computed(() => {
  let helpText = "";
  if (
    dateUtils.isDateRange(chosenOptionsCopy.value.zeitraum) &&
    (!chosenOptionsCopy.value.tagesTyp ||
      chosenOptionsCopy.value.tagesTyp === TagesTyp.Unspecified)
  ) {
    helpText = "Bei einem Zeitraum muss ein Wochentag ausgewählt werden.";
  } else if (!props.isZeitraumAndTagestypValid) {
    switch (chosenOptionsCopy.value.tagesTyp) {
      case TagesTyp.WerktagDiMiDo:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswertberechnung sind mind. 2 Tage (Di,Mi,Do) und mind. 50% der Tage mit plausiblen Daten nötig.";
        break;
      case TagesTyp.WerktagMoFr:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswertberechnung sind mind. 2 Tage (Mo,Di,Mi,Do,Fr) und mind. 50% der Tage mit plausiblen Daten nötig.";
        break;
      case TagesTyp.Samstag:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswertberechnung sind mind. 2 Tage (Sa) und mind. 50% der Tage mit plausiblen Daten nötig.";
        break;
      case TagesTyp.SonntagFeiertag:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswertberechnung sind mind. 2 Tage (So/Feiertag) und mind. 50% der Tage mit plausiblen Daten nötig.";
        break;
      case TagesTyp.WerktagFerien:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswertberechnung sind mind. 2 Tage (Mo,Di,Mi,Do,Fr Ferien) und mind. 50% der Tage mit plausiblen Daten nötig.";
        break;
      case TagesTyp.MoSo:
        helpText =
          "Der ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswertberechnung sind mind. 2 Tage (beliebige Wochentage) und mind. 50% der Tage mit plausiblen Daten nötig.";
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
