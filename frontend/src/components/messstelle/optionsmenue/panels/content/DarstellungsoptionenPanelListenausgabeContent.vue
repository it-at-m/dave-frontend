<template>
  <v-expansion-panel-text>
    <panel-header
      font-size="0.875rem"
      font-weight="bold"
      padding="10px 0 0 0"
      header-text="Listenausgabe"
    />
    <v-row
      align="start"
      justify="center"
      dense
      no-gutters
    >
      <v-col cols="4">
        <v-checkbox
          v-model="chosenOptionsCopy.stundensumme"
          :label="'Stundensumme'"
          hide-details
          color="grey-darken-1"
          density="compact"
          :disabled="isGreaterThanFiveYears"
          @mouseover="hoverStundensumme = true"
          @mouseleave="hoverStundensumme = false"
        />
        <v-checkbox
          v-model="chosenOptionsCopy.blocksumme"
          class="mb-3"
          :label="'Blocksumme'"
          hide-details
          color="grey-darken-1"
          density="compact"
          :disabled="isGreaterThanFiveYears"
          @mouseover="hoverBlocksumme = true"
          @mouseleave="hoverBlocksumme = false"
        />
      </v-col>
      <v-col cols="4">
        <v-checkbox
          v-model="chosenOptionsCopy.tagessumme"
          :label="'Tagessumme'"
          hide-details
          color="grey-darken-1"
          density="compact"
          :disabled="isGreaterThanFiveYears"
          @mouseover="hoverTagessumme = true"
          @mouseleave="hoverTagessumme = false"
        />
        <v-checkbox
          v-model="chosenOptionsCopy.spitzenstunde"
          class="mb-3"
          :label="'Spitzenstunde'"
          hide-details
          color="grey-darken-1"
          density="compact"
          :disabled="isGreaterThanFiveYears"
          @mouseover="hoverSpitzenstunde = true"
          @mouseleave="hoverSpitzenstunde = false"
        />
      </v-col>
      <v-col cols="4">
        <v-card flat>
          {{ helpTextListenausgabe }}
        </v-card>
      </v-col>
    </v-row>
  </v-expansion-panel-text>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { computed, ref } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useDateUtils } from "@/util/DateUtils";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });

const hoverStundensumme = ref(false);
const hoverBlocksumme = ref(false);
const hoverTagessumme = ref(false);
const hoverSpitzenstunde = ref(false);

const dateUtils = useDateUtils();

const isGreaterThanFiveYears = computed(() => {
  return dateUtils.isGreaterThanFiveYears(chosenOptionsCopy.value.zeitraum);
});

const helpTextListenausgabe = computed(() => {
  if (hoverStundensumme.value) {
    return "Ausgabe der Summen für jede Stunde als Zeile.";
  }
  if (hoverBlocksumme.value) {
    return "Ausgabe der Summen für jeden Zählblock als Zeile.";
  }
  if (hoverTagessumme.value) {
    return "Ausgabe der Summe für den Tageswert als Zeile.";
  }
  if (hoverSpitzenstunde.value) {
    return "Ausgaben der Summe für die Spitzenstunde(n) als Zeile.";
  }
  return "";
});
</script>
