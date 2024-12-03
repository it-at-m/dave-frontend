<template>
  <v-sheet class="dave-default">
    <v-row dense>
      <v-col
        cols="4"
        class="overflow-x-auto"
      >
        <v-sheet
          class="d-flex flex-column overflow-y-auto"
          :height="cardHeight"
          width="100%"
        >
          <auswertung-stepper
            v-model="auswertungsOptions"
            :height="stepperHeightVh"
          />
          <v-spacer />
          <v-card-actions>
            <v-btn
              :disabled="isEverythingValid"
              class="mr-2 text-none"
              color="secondary"
              text="Auswerten"
              variant="elevated"
              @click="auswertungStarten"
            />
            <v-spacer />
            <v-btn
              class="mr-2 text-none"
              text="Zurücksetzen"
              variant="outlined"
              @click="resetAuswertungsOptions()"
            />
          </v-card-actions>
        </v-sheet>
      </v-col>
      <v-divider vertical />
      <v-col cols="8">
        <step-line-card
          v-if="showDiagram"
          ref="steplineCard"
          :zaehldaten-stepline="zaehldatenMessstellen"
        />
        <banner-messtelle-tabs
          v-else
          :message="textForNonShownDiagram"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script setup lang="ts">
import type AuswertungMessstelleWithFileDTO from "@/types/messstelle/auswertung/AuswertungMessstelleWithFileDTO";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";

import { isNil, toArray, valuesIn } from "lodash";
import { computed, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import MessstelleAuswertungService from "@/api/service/MessstelleAuswertungService";
import BannerMesstelleTabs from "@/components/messstelle/charts/BannerMesstelleTabs.vue";
import AuswertungStepper from "@/components/messstelle/gesamtauswertung/stepper/AuswertungStepper.vue";
import StepLineCard from "@/components/zaehlstelle/charts/StepLineCard.vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { useDownloadUtils } from "@/util/DownloadUtils";

const NUMBER_OF_MAX_XAXIS_ELEMENTS_TO_SHOW = 96;

const minWidth = 600;

const display = useDisplay();
const downloadUtils = useDownloadUtils();

const zaehldatenMessstellen = ref<LadeZaehldatenSteplineDTO>(
  DefaultObjectCreator.createDefaultLadeZaehldatenSteplineDTO()
);

const auswertungsOptions = ref<MessstelleAuswertungOptionsDTO>(
  DefaultObjectCreator.createDefaultMessstelleAuswertungOptions()
);

const textForNonShownDiagram = computed(() => {
  let text = "";
  if (
    !isNumberOfXaxisElementsShowable.value ||
    !isChosenMstIdsAndFahrzeugoptionsShowable.value
  ) {
    text = "Es ist keine grafische Darstellung der Gesamtauswertung möglich. ";
    if (!isNumberOfXaxisElementsShowable.value) {
      text += `Die Anzahl der gewählten Zeitintervalle beträgt mehr als ${NUMBER_OF_MAX_XAXIS_ELEMENTS_TO_SHOW} ${auswertungsOptions.value.zeitraumCategorie}`;
    }
    if (!isChosenMstIdsAndFahrzeugoptionsShowable.value) {
      if (!isNumberOfXaxisElementsShowable.value) {
        text += " und es";
      } else {
        text += "Es";
      }
      text +=
        " ist eine Mehrfachauswahl bei Messstellen sowie bei Fahrzeugen getroffen worden";
    }
  }
  text += ".";
  return text;
});

const showDiagram = computed(() => {
  return (
    isChosenMstIdsAndFahrzeugoptionsShowable.value &&
    isNumberOfXaxisElementsShowable.value
  );
});

const isNumberOfXaxisElementsShowable = computed(() => {
  const numerOfChosenXaxisElements =
    toArray(auswertungsOptions.value.zeitraum).length *
    toArray(auswertungsOptions.value.jahre).length;
  return numerOfChosenXaxisElements <= NUMBER_OF_MAX_XAXIS_ELEMENTS_TO_SHOW;
});

const isChosenMstIdsAndFahrzeugoptionsShowable = computed(() => {
  const numberOfChosenFahrzeugoptions = valuesIn(
    auswertungsOptions.value.fahrzeuge
  ).filter((option) => option).length;
  return (
    toArray(auswertungsOptions.value.messstelleAuswertungIds).length < 2 ||
    numberOfChosenFahrzeugoptions < 2
  );
});

const appBarHeight = computed(() => {
  return 50 / (display.height.value / 100);
});

const cardHeight = computed(() => {
  const overflowX = display.width.value / 3 <= minWidth;
  return 100 - (overflowX ? 3 : 0) - appBarHeight.value + "vh";
});

const cardActionsHeight = computed(() => {
  return 60 / (display.height.value / 100);
});

const stepperHeightVh = computed(() => {
  return 100 - appBarHeight.value - cardActionsHeight.value + "vh";
});

const isEverythingValid = computed(() => {
  return !(
    auswertungsOptions.value.zeitraum.length > 0 &&
    auswertungsOptions.value.tagesTyp.length > 0 &&
    auswertungsOptions.value.jahre.length > 0 &&
    auswertungsOptions.value.messstelleAuswertungIds.length > 0 &&
    areFahrzeugeValid.value
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

watch(
  auswertungsOptions,
  () => {
    zaehldatenMessstellen.value =
      DefaultObjectCreator.createDefaultLadeZaehldatenSteplineDTO();
  },
  { deep: true }
);

function resetAuswertungsOptions() {
  auswertungsOptions.value =
    DefaultObjectCreator.createDefaultMessstelleAuswertungOptions();
}

function auswertungStarten() {
  MessstelleAuswertungService.generate(auswertungsOptions.value).then(
    (result: AuswertungMessstelleWithFileDTO) => {
      zaehldatenMessstellen.value = isNil(result.zaehldatenMessstellen)
        ? DefaultObjectCreator.createDefaultLadeZaehldatenSteplineDTO()
        : result.zaehldatenMessstellen;
      const filename = `Gesamtauswertung_${new Date().toISOString().split("T")[0]}.xlsx`;
      downloadUtils.downloadXlsx(result.spreadsheetBase64Encoded, filename);
    }
  );
}
</script>
