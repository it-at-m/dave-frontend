<template>
  <div>
    <panel-header
      font-size="0.875rem"
      font-weight="bold"
      padding="10px 0 0 0"
      header-text="Zeitauswahl"
    />
    <v-row
      align="start"
      justify="center"
      dense
      no-gutters
    >
      <v-col cols="8">
        <v-radio-group
          v-model="chosenOptionsCopy.zeitauswahl"
          class="full-width"
          density="compact"
          @update:model-value="zeitauswahlChanged"
        >
          <v-row
            align="start"
            justify="center"
            dense
          >
            <v-col cols="6">
              <v-radio
                :label="`Tageswert${durchschnitt}`"
                :value="Zeitauswahl.TAGESWERT"
              />
              <v-radio
                :label="`Block${durchschnitt}`"
                :value="Zeitauswahl.BLOCK"
                :disabled="isDateBiggerFiveYears"
              />
              <v-radio
                :label="`Stunde${durchschnitt}`"
                :value="Zeitauswahl.STUNDE"
                :disabled="isDateBiggerFiveYears"
              />
            </v-col>
            <v-col cols="6">
              <v-radio
                :label="`Spitzenstunde Kfz${durchschnitt}`"
                :value="Zeitauswahl.SPITZENSTUNDE_KFZ"
                :disabled="isTypeDisabled('KFZ') || isDateBiggerFiveYears"
              />
              <v-radio
                :label="`Spitzenstunde Rad${durchschnitt}`"
                :value="Zeitauswahl.SPITZENSTUNDE_RAD"
                :disabled="isTypeDisabled('RAD') || isDateBiggerFiveYears"
              />
              <v-radio
                :label="`Spitzenstunde Fuß${durchschnitt}`"
                :value="Zeitauswahl.SPITZENSTUNDE_FUSS"
                :disabled="isTypeDisabled('FUSS') || isDateBiggerFiveYears"
              />
            </v-col>
          </v-row>
        </v-radio-group>
      </v-col>
      <v-col cols="4">
        <v-row
          align="start"
          justify="center"
          dense
        >
          {{ helperText }}
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { head, last } from "lodash";
import { computed, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useSnackbarStore } from "@/store/SnackbarStore";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock from "@/types/enum/Zeitblock";
import ZeitblockStuendlich from "@/types/enum/ZeitblockStuendlich";
import { useOptionsmenuUtils } from "@/util/OptionsmenuUtils";

interface Props {
  messstelleDetektierteFahrzeugart: string;
}

const props = defineProps<Props>();
const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });
const snackbarStore = useSnackbarStore();

const { isDateBiggerFiveYears } = useOptionsmenuUtils(chosenOptionsCopy.value);

const durchschnitt = computed(() => {
  const zeitraum = chosenOptionsCopy.value.zeitraum;
  if (zeitraum && zeitraum.length === 2 && head(zeitraum) !== last(zeitraum)) {
    return " (Durchschnitt)";
  }
  return "";
});

function isTypeDisabled(type: string): boolean {
  return (
    type !== props.messstelleDetektierteFahrzeugart ||
    chosenOptionsCopy.value.messquerschnittIds.length !== 1
  );
}

const helperText = computed(() => {
  if (chosenOptionsCopy.value.messquerschnittIds.length !== 1) {
    return "Spitzenstunde kann nur für einen einzelnen Messquerschnitt ausgegeben werden";
  }
  return "";
});

function zeitauswahlChanged() {
  if (chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.TAGESWERT) {
    chosenOptionsCopy.value.zeitblock = Zeitblock.ZB_00_24;
  } else if (chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.BLOCK) {
    chosenOptionsCopy.value.zeitblock = Zeitblock.ZB_00_06;
  } else if (chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.STUNDE) {
    chosenOptionsCopy.value.zeitblock = ZeitblockStuendlich.ZB_00_01;
  } else if (
    chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ
  ) {
    chosenOptionsCopy.value.zeitblock = Zeitblock.ZB_00_06;
    resetFahrzeuge();
    chosenOptionsCopy.value.fahrzeuge.kraftfahrzeugverkehr = true;
  } else if (
    chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD
  ) {
    chosenOptionsCopy.value.zeitblock = Zeitblock.ZB_00_06;
    resetFahrzeuge();
    chosenOptionsCopy.value.fahrzeuge.radverkehr = true;
  } else if (
    chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
  ) {
    chosenOptionsCopy.value.zeitblock = Zeitblock.ZB_00_06;
    resetFahrzeuge();
    chosenOptionsCopy.value.fahrzeuge.fussverkehr = true;
  }

  function resetFahrzeuge() {
    chosenOptionsCopy.value.fahrzeuge.kraftfahrzeugverkehr = false;
    chosenOptionsCopy.value.fahrzeuge.schwerverkehr = false;
    chosenOptionsCopy.value.fahrzeuge.gueterverkehr = false;
    chosenOptionsCopy.value.fahrzeuge.schwerverkehrsanteilProzent = false;
    chosenOptionsCopy.value.fahrzeuge.gueterverkehrsanteilProzent = false;
    chosenOptionsCopy.value.fahrzeuge.radverkehr = false;
    chosenOptionsCopy.value.fahrzeuge.fussverkehr = false;
    chosenOptionsCopy.value.fahrzeuge.lastkraftwagen = false;
    chosenOptionsCopy.value.fahrzeuge.lastzuege = false;
    chosenOptionsCopy.value.fahrzeuge.busse = false;
    chosenOptionsCopy.value.fahrzeuge.kraftraeder = false;
    chosenOptionsCopy.value.fahrzeuge.personenkraftwagen = false;
    chosenOptionsCopy.value.fahrzeuge.lieferwagen = false;
  }
}

watch(
  () => chosenOptionsCopy.value.zeitraum,
  () => {
    if (
      isDateBiggerFiveYears.value &&
      chosenOptionsCopy.value.zeitauswahl !== Zeitauswahl.TAGESWERT
    ) {
      chosenOptionsCopy.value.zeitauswahl = Zeitauswahl.TAGESWERT;
      snackbarStore.showInfo("Zeitauswahl wurde auf Tageswert gesetzt");
    }
  }
);
</script>
