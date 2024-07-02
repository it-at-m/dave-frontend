<template>
  <v-sheet
    :min-height="height"
    :max-height="height"
  >
    <v-stepper
      v-model="activeStep"
      vertical
      flat
    >
      <v-stepper-step
        :complete="activeStep > 1"
        :step="1"
        editable
        :rules="[isJahresintervallSelected]"
      >
        Zeitintervalle
        <small> {{ selectedJahresintervallAsSummary }}</small>
      </v-stepper-step>
      <v-stepper-content :step="1">
        <zeitintervall-step-content v-model="auswertungOptions" />
      </v-stepper-content>

      <v-stepper-step
        :complete="activeStep > 2"
        :step="2"
        editable
        :rules="[isJahreSelected]"
      >
        Jahre
        <small> {{ selectedYearsAsSummary }}</small>
      </v-stepper-step>
      <v-stepper-content :step="2">
        <jahre-step-content v-model="auswertungOptions" />
      </v-stepper-content>

      <v-stepper-step
        :complete="activeStep > 3"
        :step="3"
        editable
        :rules="[isTagesTypSelected]"
      >
        Wochentag
        <small> {{ selectedTagesTypAsSummary }}</small>
      </v-stepper-step>

      <v-stepper-content :step="3">
        <tages-typ-step-content v-model="auswertungOptions" />
      </v-stepper-content>

      <v-stepper-step
        :complete="activeStep > 4"
        :step="4"
        editable
        :rules="[isOrtMessstelleSelected, isOrtMessquerschnittSelected]"
      >
        Ort
        <small> {{ selectedOrtAsSummary }}</small>
      </v-stepper-step>

      <v-stepper-content :step="4">
        <ort-step-content v-model="auswertungOptions" />
      </v-stepper-content>

      <v-stepper-step
        :complete="activeStep > 5"
        :step="5"
        editable
        :rules="[isFahrzeugSelected]"
      >
        Fahrzeuge
        <small> {{ selectedFahrzeugAsSummary }}</small>
      </v-stepper-step>

      <v-stepper-content :step="5">
        <fahrzeuge-step-content v-model="auswertungOptions" />
      </v-stepper-content>
    </v-stepper>
  </v-sheet>
</template>

<script setup lang="ts">
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import { computed } from "vue";

import FahrzeugeStepContent from "@/components/messstelle/gesamtauswertung/stepper/FahrzeugeStepContent.vue";
import JahreStepContent from "@/components/messstelle/gesamtauswertung/stepper/JahreStepContent.vue";
import OrtStepContent from "@/components/messstelle/gesamtauswertung/stepper/OrtStepContent.vue";
import TagesTypStepContent from "@/components/messstelle/gesamtauswertung/stepper/TagesTypStepContent.vue";
import ZeitintervallStepContent from "@/components/messstelle/gesamtauswertung/stepper/ZeitintervallStepContent.vue";
import { tagesTypText } from "@/types/enum/TagesTyp";

interface Props {
  value: MessstelleAuswertungOptionsDTO;
  activeStep: number;
  height: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "input", v: MessstelleAuswertungOptionsDTO): void;
  (e: "update:activeStep", v: number): void;
}>();

const auswertungOptions = computed({
  get: () => props.value,
  set: (payload: MessstelleAuswertungOptionsDTO) => emits("input", payload),
});

const activeStep = computed({
  get: () => props.activeStep,
  set: (payload: number) => emits("update:activeStep", payload),
});

const selectedYearsAsSummary = computed(() => {
  let summary = auswertungOptions.value.jahre.join(", ");
  if (!isJahreSelected()) {
    summary = "Es muss mindestens ein Jahr ausgewählt sein.";
  }
  return summary;
});

const selectedJahresintervallAsSummary = computed(() => {
  let summary = auswertungOptions.value.zeitintervalle.join(", ");
  if (!isJahresintervallSelected()) {
    summary = "Es muss mindestens ein Zeitintervall ausgewählt sein.";
  }
  return summary;
});

const selectedTagesTypAsSummary = computed(() => {
  let summary = tagesTypText.get(auswertungOptions.value.tagesTyp) ?? "";
  if (!isTagesTypSelected()) {
    summary = "Es muss ein Wochentag ausgewählt sein.";
  }
  return summary;
});
const selectedOrtAsSummary = computed(() => {
  const mstIds = auswertungOptions.value.mstIds;
  let summary = ``;
  if (mstIds.length > 1) {
    summary = `Mst-Id's': ${mstIds.join(", ")}`;
  }
  if (mstIds.length === 1) {
    const mqIds = auswertungOptions.value.mqIds;
    summary = `Mst-Id: ${mstIds[0]}, MQ-Id${
      mqIds.length > 1 ? "'s" : ""
    }: ${mqIds.join(", ")} `;
  }
  if (!isOrtMessstelleSelected()) {
    summary = "Es muss mindestens eine Messstelle ausgewählt sein.";
  }
  if (!isOrtMessquerschnittSelected()) {
    summary = "Es muss mindestens ein Messquerschnitt ausgewählt sein.";
  }
  return summary;
});

function isJahreSelected(): boolean {
  return !(auswertungOptions.value.jahre.length === 0 && activeStep.value > 1);
}

function isTagesTypSelected(): boolean {
  return !(
    auswertungOptions.value.tagesTyp.length === 0 && activeStep.value > 2
  );
}

function isJahresintervallSelected(): boolean {
  return !(
    auswertungOptions.value.zeitintervalle.length === 0 && activeStep.value > 0
  );
}

function isOrtMessstelleSelected(): boolean {
  return !(auswertungOptions.value.mstIds.length === 0 && activeStep.value > 3);
}

function isOrtMessquerschnittSelected(): boolean {
  return !(
    auswertungOptions.value.mstIds.length === 1 &&
    auswertungOptions.value.mqIds.length === 0 &&
    activeStep.value > 3
  );
}

function isFahrzeugSelected(): boolean {
  const fahrzeuge = auswertungOptions.value.fahrzeuge;
  return !(
    !(
      fahrzeuge.lieferwagen ||
      fahrzeuge.busse ||
      fahrzeuge.personenkraftwagen ||
      fahrzeuge.kraftraeder ||
      fahrzeuge.lastzuege ||
      fahrzeuge.lastkraftwagen ||
      fahrzeuge.fussverkehr ||
      fahrzeuge.radverkehr ||
      fahrzeuge.gueterverkehrsanteilProzent ||
      fahrzeuge.schwerverkehrsanteilProzent ||
      fahrzeuge.gueterverkehr ||
      fahrzeuge.schwerverkehr ||
      fahrzeuge.kraftfahrzeugverkehr
    ) && activeStep.value > 4
  );
}

const selectedFahrzeugAsSummary = computed(() => {
  const fahrzeuge = auswertungOptions.value.fahrzeuge;
  const selectedValues: Array<string> = [];
  if (fahrzeuge.kraftfahrzeugverkehr) {
    selectedValues.push(`KFZ`);
  }
  if (fahrzeuge.schwerverkehr) {
    selectedValues.push(`SV`);
  }
  if (fahrzeuge.gueterverkehr) {
    selectedValues.push(`GV`);
  }
  if (fahrzeuge.schwerverkehrsanteilProzent) {
    selectedValues.push(`SV %`);
  }
  if (fahrzeuge.gueterverkehrsanteilProzent) {
    selectedValues.push(`GV %`);
  }
  if (fahrzeuge.personenkraftwagen) {
    selectedValues.push(`Pkw`);
  }
  if (fahrzeuge.lastkraftwagen) {
    selectedValues.push(`Lkw`);
  }
  if (fahrzeuge.lastzuege) {
    selectedValues.push(`Lz`);
  }
  if (fahrzeuge.lieferwagen) {
    selectedValues.push(`Lfw`);
  }
  if (fahrzeuge.busse) {
    selectedValues.push(`Bus`);
  }
  if (fahrzeuge.kraftraeder) {
    selectedValues.push(`Krad`);
  }
  if (fahrzeuge.radverkehr) {
    selectedValues.push(`Rad`);
  }
  if (fahrzeuge.fussverkehr) {
    selectedValues.push(`Fuß`);
  }

  let summary = selectedValues.join(", ");

  if (!isFahrzeugSelected()) {
    summary =
      "Es muss mindestens eine Fahrzeugkategorie oder Verkehrsart ausgewählt sein.";
  }
  return summary;
});
</script>
