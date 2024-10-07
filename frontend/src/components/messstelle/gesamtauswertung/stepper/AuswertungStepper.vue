<template>
  <v-stepper-vertical
    v-model="activeStep"
    :editable="true"
    flat
    hide-actions
  >
    <template #default>
      <v-stepper-vertical-item
        :complete="activeStep > 1 && isJahresintervallSelected()"
        :value="1"
        title="Zeitintervalle"
        :subtitle="selectedJahresintervallAsSummary"
        :error="!isJahresintervallSelected()"
      >
        <zeitintervall-step-content v-model="auswertungOptions" />
      </v-stepper-vertical-item>
      <v-stepper-vertical-item
        :complete="activeStep > 2 && isJahreSelected()"
        :value="2"
        :error="!isJahreSelected()"
        title="Jahre"
        :subtitle="selectedYearsAsSummary"
      >
        <jahre-step-content v-model="auswertungOptions" />
      </v-stepper-vertical-item>
      <v-stepper-vertical-item
        :complete="activeStep > 3 && isTagesTypSelected()"
        :value="3"
        :error="!isTagesTypSelected()"
        title="Wochentag"
        :subtitle="selectedTagesTypAsSummary"
      >
        <tages-typ-step-content v-model="auswertungOptions" />
      </v-stepper-vertical-item>
      <v-stepper-vertical-item
        :complete="
          activeStep > 4 &&
          isOrtMessstelleSelected() &&
          isOrtMessquerschnittSelected()
        "
        :value="4"
        :error="!(isOrtMessstelleSelected() && isOrtMessquerschnittSelected())"
        title="Ort"
        :subtitle="selectedOrtAsSummary"
      >
        <ort-step-content v-model="auswertungOptions" />
      </v-stepper-vertical-item>
      <v-stepper-vertical-item
        :complete="activeStep > 5 && isFahrzeugSelected()"
        :value="5"
        :error="!isFahrzeugSelected()"
        title="Fahrzeuge"
        :subtitle="selectedFahrzeugAsSummary"
      >
        <fahrzeuge-step-content v-model="auswertungOptions" />
      </v-stepper-vertical-item>
    </template>
  </v-stepper-vertical>
</template>

<script setup lang="ts">
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import type { VStepperVerticalItem } from "vuetify/labs/components";

import { computed, ref, watch } from "vue";

import FahrzeugeStepContent from "@/components/messstelle/gesamtauswertung/stepper/FahrzeugeStepContent.vue";
import JahreStepContent from "@/components/messstelle/gesamtauswertung/stepper/JahreStepContent.vue";
import OrtStepContent from "@/components/messstelle/gesamtauswertung/stepper/OrtStepContent.vue";
import TagesTypStepContent from "@/components/messstelle/gesamtauswertung/stepper/TagesTypStepContent.vue";
import ZeitintervallStepContent from "@/components/messstelle/gesamtauswertung/stepper/ZeitintervallStepContent.vue";
import { auswertungszeitraumToText } from "@/types/enum/AuswertungCategories";
import Fahrzeug from "@/types/enum/Fahrzeug";
import { tagesTypText } from "@/types/enum/TagesTyp";

interface Props {
  height: string;
}

defineProps<Props>();

const auswertungOptions = defineModel<MessstelleAuswertungOptionsDTO>({
  required: true,
});

const activeStep = ref(1);

const selectedYearsAsSummary = computed(() => {
  let summary = auswertungOptions.value.jahre.join(", ");
  if (!isJahreSelected()) {
    summary = "Es muss mindestens ein Jahr ausgewählt sein.";
  }
  return summary;
});

const selectedJahresintervallAsSummary = computed(() => {
  const helper: Array<string> = [];
  auswertungOptions.value.zeitraum.forEach((key) => {
    const value = auswertungszeitraumToText.get(key);
    if (value) {
      helper.push(value.title);
    }
  });
  let summary = helper.join(", ");
  if (!isJahresintervallSelected()) {
    summary = "Es muss mindestens ein Zeitintervall ausgewählt sein.";
  }
  return summary;
});

const selectedTagesTypAsSummary = computed(() => {
  let summary = tagesTypText.get(auswertungOptions.value.tagesTyp ?? "") ?? "";
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
    auswertungOptions.value.zeitraum.length === 0 && activeStep.value > 0
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

watch(
  () => auswertungOptions.value.verfuegbareVerkehrsarten,
  (newVerkehrsarten, oldVerkehrsarten) => {
    const rad = newVerkehrsarten.includes(Fahrzeug.RAD);
    const removeRad =
      oldVerkehrsarten.includes(Fahrzeug.RAD) &&
      !newVerkehrsarten.includes(Fahrzeug.RAD);

    const kfz = newVerkehrsarten.includes(Fahrzeug.KFZ);
    const removeKfz =
      oldVerkehrsarten.includes(Fahrzeug.KFZ) &&
      !newVerkehrsarten.includes(Fahrzeug.KFZ);

    if (removeKfz || (rad && kfz)) {
      resetFahrzeuge();
    }
    if (removeRad || (rad && kfz)) {
      auswertungOptions.value.fahrzeuge.radverkehr = false;
    }
    if (rad && !kfz) {
      auswertungOptions.value.fahrzeuge.radverkehr = true;
    } else if (!rad && kfz) {
      auswertungOptions.value.fahrzeuge.kraftfahrzeugverkehr = true;
    }
  }
);

function resetFahrzeuge() {
  auswertungOptions.value.fahrzeuge.kraftfahrzeugverkehr = false;
  auswertungOptions.value.fahrzeuge.schwerverkehr = false;
  auswertungOptions.value.fahrzeuge.gueterverkehr = false;
  auswertungOptions.value.fahrzeuge.schwerverkehrsanteilProzent = false;
  auswertungOptions.value.fahrzeuge.gueterverkehrsanteilProzent = false;
  auswertungOptions.value.fahrzeuge.radverkehr = false;
  auswertungOptions.value.fahrzeuge.fussverkehr = false;
  auswertungOptions.value.fahrzeuge.lastkraftwagen = false;
  auswertungOptions.value.fahrzeuge.lastzuege = false;
  auswertungOptions.value.fahrzeuge.busse = false;
  auswertungOptions.value.fahrzeuge.kraftraeder = false;
  auswertungOptions.value.fahrzeuge.personenkraftwagen = false;
  auswertungOptions.value.fahrzeuge.lieferwagen = false;
}
</script>
