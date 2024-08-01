<template>
  <div>
    <v-btn
      class="text-none"
      color="secondary"
      prepend-icon="mdi-filter-outline"
      :text="buttonText"
      @click="dialog = true"
    />
    <v-dialog
      v-model="dialog"
      max-width="900px"
    >
      <v-card
        width="900px"
        flat
      >
        <v-card-title>
          <v-icon
            start
            icon="mdi-filter-outline"
          />
          Filtereinstellungen
        </v-card-title>
        <v-card-text>
          <v-sheet
            width="100%"
            :max-height="getContentSheetHeight"
            class="overflow-y-auto"
          >
            <v-expansion-panels
              variant="accordion"
              focusable
              elevation="0"
            >
              <zeit-panel v-model="chosenOptions" />
              <fahrzeug-panel v-model="chosenOptions" />
              <messquerschnitt-panel v-model="chosenOptions" />
              <darstellungsoptionen-panel-messstelle v-model="chosenOptions" />
            </v-expansion-panels>
          </v-sheet>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="text-none"
            color="secondary"
            text="Aktualisiere Daten"
            variant="elevated"
            @click="setChosenOptions"
          />
          <v-spacer />
          <v-btn
            class="text-none"
            color="grey-lighten-1"
            text="Zurücksetzen"
            variant="elevated"
            @click="resetOptions"
          />
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";

import _ from "lodash";
import { computed, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import DarstellungsoptionenPanelMessstelle from "@/components/messstelle/optionsmenue/panels/DarstellungsoptionenPanelMessstelle.vue";
import FahrzeugPanel from "@/components/messstelle/optionsmenue/panels/FahrzeugPanelMessstelle.vue";
import MessquerschnittPanel from "@/components/messstelle/optionsmenue/panels/MessquerschnittPanel.vue";
import ZeitPanel from "@/components/messstelle/optionsmenue/panels/ZeitPanel.vue";
import { useMessstelleStore } from "@/store/messstelle";
import { useSnackbarStore } from "@/store/snackbar";
import { useUserStore } from "@/store/user";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import TagesTyp from "@/types/enum/TagesTyp";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock from "@/types/enum/Zeitblock";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { useMessstelleUtils } from "@/util/MessstelleUtils";
import { useTimeUtils } from "@/util/TimeUtils";
import {useDateUtils} from "@/util/DateUtils";

interface Props {
  messstelleId: string;
}

defineProps<Props>();

const display = useDisplay();
const messstelleStore = useMessstelleStore();
const snackbarStore = useSnackbarStore();
const messstelleUtils = useMessstelleUtils();
const dialog = ref(false);
const chosenOptions = ref(
  DefaultObjectCreator.createDefaultMessstelleOptions()
);

const userStore = useUserStore();
const timeUtils = useTimeUtils();
const dateUtils = useDateUtils();

const messstelle = computed<MessstelleInfoDTO>(() => {
  return messstelleStore.getMessstelleInfo;
});

const getContentSheetHeight = computed(() => {
  if (display.xl.value) {
    return "650px";
  }
  return "400px";
});

const buttonText = computed(() => {
  let text = "Filtereinstellungen";
  if (display.xl.value) {
    text = "Filtereinstellungen bearbeiten";
  }
  return text;
});

const isAnwender = computed(() => {
  return userStore.hasAuthorities && userStore.isAnwender;
});

watch(messstelle, () => {
  if (messstelleStore.isHistory) {
    chosenOptions.value = messstelleStore.getFilteroptions;
    messstelleStore.reloadFilteroptions();
  } else {
    resetOptions();
  }
});

function setChosenOptions(): void {
  if (areChosenOptionsValid()) {
    saveChosenOptions();
    dialog.value = false;
  }
}

function areChosenOptionsValid(): boolean {
  let result = true;
  if (chosenOptions.value.messquerschnittIds.length === 0) {
    result = false;
    let errortext = "Es muss mindestens ein Messquerschnitt ausgewählt sein.";
    if (
      messstelleUtils.isZeitauswahlSpitzenstunde(
        chosenOptions.value.zeitauswahl
      )
    ) {
      errortext = "Es muss genau ein Messquerschnitt ausgewählt sein.";
    }
    snackbarStore.showError(errortext);
  }
  if (
      chosenOptions.value.zeitraum.length === 2 && !dateUtils.isDateRangeAsStringValid(chosenOptions.value.zeitraum)

  ) {
    result = false;
    snackbarStore.showError("Das Datum 'bis' muss nach 'von' liegen.");
  }
  if (
    chosenOptions.value.zeitraum.length === 2 &&
    !chosenOptions.value.tagesTyp
  ) {
    result = false;
    snackbarStore.showError("Es muss ein Wochentag ausgewählt sein.");
  }
  if (
    isAnwender.value &&
    timeUtils.isDateRangeBiggerFiveYears(chosenOptions.value.zeitraum.slice())
  ) {
    result = false;
    snackbarStore.showError("Der Ausgewählte Zeitraum ist zu groß");
  }
  return result;
}

function saveChosenOptions(): void {
  messstelleStore.setFilteroptions(_.cloneDeep(chosenOptions.value));
}

function setDefaultOptionsForMessstelle(): void {
  chosenOptions.value.fahrzeuge =
    DefaultObjectCreator.createDefaultFahrzeugOptions();

  chosenOptions.value.fahrzeuge.kraftfahrzeugverkehr =
    messstelle.value.detektierteVerkehrsarten === DetektierteFahrzeugart.KFZ;
  chosenOptions.value.fahrzeuge.radverkehr =
    !chosenOptions.value.fahrzeuge.kraftfahrzeugverkehr;

  chosenOptions.value.zeitraum = [messstelle.value.datumLetztePlausibleMessung];
  chosenOptions.value.messquerschnittIds = [];
  messstelle.value.messquerschnitte.forEach((q) =>
    chosenOptions.value.messquerschnittIds.push(q.mqId)
  );
  if (messstelle.value.messquerschnitte.length === 1) {
    messstelleStore.setDirection(
      messstelle.value.messquerschnitte[0].fahrtrichtung
    );
  } else {
    messstelleStore.setDirection(messstelleUtils.alleRichtungen);
  }
  chosenOptions.value.zeitauswahl = Zeitauswahl.TAGESWERT;
  chosenOptions.value.intervall = ZaehldatenIntervall.STUNDE_KOMPLETT;
  chosenOptions.value.zeitblock = Zeitblock.ZB_00_24;
  chosenOptions.value.tagesTyp = "" as TagesTyp;
  chosenOptions.value.blackPrintMode = false;
  chosenOptions.value.werteHundertRunden = false;
  chosenOptions.value.blocksumme = true;
  chosenOptions.value.stundensumme = true;
  chosenOptions.value.tagessumme = true;
  chosenOptions.value.spitzenstunde = true;
  messstelleStore.calculateActiveMessfaehigkeit(
    messstelle.value.datumLetztePlausibleMessung.toString()
  );
  messstelleStore.setBelastungsplanChosenSize(1);
  saveChosenOptions();
}

function resetOptions(): void {
  setDefaultOptionsForMessstelle();
}

watch(
  () => messstelleStore.getActiveMessfaehigkeit.fahrzeugklassen,
  () => {
    chosenOptions.value.fahrzeuge =
      DefaultObjectCreator.createDefaultFahrzeugOptions();
    chosenOptions.value.fahrzeuge.kraftfahrzeugverkehr =
      messstelle.value.detektierteVerkehrsarten === DetektierteFahrzeugart.KFZ;
    chosenOptions.value.fahrzeuge.radverkehr =
      !chosenOptions.value.fahrzeuge.kraftfahrzeugverkehr;

    snackbarStore.showWarning(
      'Durch die Änderung des Zeitraums wurden die Kategorie "Fahrzeuge" zurückgesetzt.'
    );
  }
);
</script>
