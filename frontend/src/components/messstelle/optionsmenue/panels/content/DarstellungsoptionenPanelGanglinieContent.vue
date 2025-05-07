<template>
  <v-expansion-panel-text>
    <panel-header
      font-size="0.875rem"
      font-weight="bold"
      padding="10px 0 10px 0"
      header-text="Ganglinie"
    />
    <v-row
      align="start"
      justify="center"
      dense
      @mouseover="isHoveringOverInputFields = true"
      @mouseleave="isHoveringOverInputFields = false"
    >
      <v-col cols="4">
        <v-text-field
          v-model="chosenOptionsCopy.ganglinieYAchse1MaxValue"
          :label="'Y-Achse 1'"
          :rules="[
            (toCheck: string) =>
              rules.onlyPositivNumbersBiggerThan(toCheck, MIN_VALUE),
          ]"
          clearable
          density="compact"
          :disabled="isZeitraumGreaterThanFiveYears"
          @mouseover="hoverYAchse1 = true"
          @mouseleave="hoverYAchse1 = false"
          @blur="checkRangeYAchse1"
        />
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="chosenOptionsCopy.ganglinieYAchse2MaxValue"
          :label="'Y-Achse 2 (%)'"
          :rules="[
            (toCheck: string) =>
              rules.onlyNumbersInRange(toCheck, MIN_VALUE, MAX_VALUE_EXCLUDE),
          ]"
          clearable
          density="compact"
          :disabled="isZeitraumGreaterThanFiveYears"
          @mouseover="hoverYAchse2 = true"
          @mouseleave="hoverYAchse2 = false"
          @blur="checkRangeYAchse2"
        />
      </v-col>
      <v-col cols="4">
        <v-card variant="flat">
          {{ helpTextGanglinie }}
        </v-card>
      </v-col>
    </v-row>
    <v-divider />
  </v-expansion-panel-text>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { inRange } from "lodash";
import { computed, ref } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useDateUtils } from "@/util/DateUtils";
import { useValidationRules } from "@/util/ValidationRules";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });
const rules = useValidationRules();

const hoverYAchse1 = ref(false);
const hoverYAchse2 = ref(false);

const MIN_VALUE = 0;
const MAX_VALUE_EXCLUDE = 101;

const dateUtils = useDateUtils();

const isZeitraumGreaterThanFiveYears = computed(() => {
  return dateUtils.isGreaterThanFiveYears(
    chosenOptionsCopy.value.zeitraumStartAndEndDate.startDate,
    chosenOptionsCopy.value.zeitraumStartAndEndDate.endDate
  );
});

const isHoveringOverInputFields = ref<boolean>(false);

const helpTextGanglinie = computed(() => {
  if (isHoveringOverInputFields.value && isZeitraumGreaterThanFiveYears.value) {
    return "Der gewählte Zeitraum umfasst mehr als fünf Jahre.";
  }
  if (hoverYAchse1.value) {
    return "Der Wert wird zurückgesetzt, wenn die Zahl < 0 ist.";
  }
  if (hoverYAchse2.value) {
    return "Der Wert wird zurückgesetzt, wenn die Zahl < 0 oder > 100 ist.";
  }
  return "";
});

function checkRangeYAchse2() {
  if (chosenOptionsCopy.value.ganglinieYAchse2MaxValue) {
    if (
      !inRange(
        chosenOptionsCopy.value.ganglinieYAchse2MaxValue,
        MIN_VALUE,
        MAX_VALUE_EXCLUDE
      )
    ) {
      chosenOptionsCopy.value.ganglinieYAchse2MaxValue = null;
    }
  }
}

function checkRangeYAchse1() {
  if (
    chosenOptionsCopy.value.ganglinieYAchse1MaxValue &&
    chosenOptionsCopy.value.ganglinieYAchse1MaxValue < MIN_VALUE
  ) {
    chosenOptionsCopy.value.ganglinieYAchse1MaxValue = null;
  }
}
</script>
