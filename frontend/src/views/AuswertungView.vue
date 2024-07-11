<template>
  <v-sheet class="dave-default">
    <v-row dense>
      <v-col cols="4">
        <auswertung-stepper
            v-model="auswertungsOptions"
            :height="leftHeightVh"
        />
        <v-card-actions>
          <v-btn
              :disabled="isEverythingValid"
              class="mr-2 text-none"
              color="secondary"
              text="Auswerten"
              variant="elevated"
              @click="auswertungStarten"
          />
          <v-spacer/>
          <v-btn
              class="mr-2 text-none"
              text="Zurücksetzen"
              variant="outlined"
              @click="resetAuswertungsOptions()"
          />
        </v-card-actions>
      </v-col>
      <v-divider vertical/>
      <v-col cols="8"></v-col>
    </v-row>
  </v-sheet>
</template>
<script setup lang="ts">
import {computed, ref} from "vue";
import AuswertungStepper from "@/components/messstelle/gesamtauswertung/stepper/AuswertungStepper.vue";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import {useDisplay} from "vuetify";
import MessstelleAuswertungService from "@/api/service/MessstelleAuswertungService";

const display = useDisplay();

const auswertungsOptions = ref<MessstelleAuswertungOptionsDTO>(
    DefaultObjectCreator.createDefaultMessstelleAuswertungOptions()
);

const appBarHeight = computed(() => {
  return 50 / (display.height.value / 100);
});

const cardActionsHeight = computed(() => {
  return 60 / (display.height.value / 100);
});

const leftHeightVh = computed(() => {
  return 100 - appBarHeight.value - cardActionsHeight.value + "vh";
});

const isEverythingValid = computed(() => {
  return !(
      auswertungsOptions.value.zeitraum.length > 0 &&
      auswertungsOptions.value.tagesTyp.length > 0 &&
      auswertungsOptions.value.jahre.length > 0 &&
      areMstAndMqValid.value &&
      areFahrzeugeValid.value
  );
});

const areMstAndMqValid = computed(() => {
  return (
      (auswertungsOptions.value.mstIds.length > 1 &&
          auswertungsOptions.value.mqIds.length === 0) ||
      (auswertungsOptions.value.mstIds.length === 1 &&
          auswertungsOptions.value.mqIds.length > 0)
  );
});

const areFahrzeugeValid = computed(() => {
  return (
      auswertungsOptions.value.fahrzeuge.kraftfahrzeugverkehr ||
      auswertungsOptions.value.fahrzeuge.schwerverkehr ||
      auswertungsOptions.value.fahrzeuge.gueterverkehr ||
      auswertungsOptions.value.fahrzeuge.schwerverkehrsanteilProzent ||
      auswertungsOptions.value.fahrzeuge.gueterverkehrsanteilProzent ||
      auswertungsOptions.value.fahrzeuge.radverkehr ||
      auswertungsOptions.value.fahrzeuge.fussverkehr ||
      auswertungsOptions.value.fahrzeuge.lastkraftwagen ||
      auswertungsOptions.value.fahrzeuge.lastzuege ||
      auswertungsOptions.value.fahrzeuge.busse ||
      auswertungsOptions.value.fahrzeuge.kraftraeder ||
      auswertungsOptions.value.fahrzeuge.personenkraftwagen ||
      auswertungsOptions.value.fahrzeuge.lieferwagen
  );
});

function resetAuswertungsOptions() {
  auswertungsOptions.value =
      DefaultObjectCreator.createDefaultMessstelleAuswertungOptions();
}

function auswertungStarten() {
    MessstelleAuswertungService.generate(auswertungsOptions.value);
}
</script>