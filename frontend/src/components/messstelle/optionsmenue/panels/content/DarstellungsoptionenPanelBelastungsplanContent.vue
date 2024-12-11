<template>
  <v-expansion-panel-text>
    <panel-header
      font-size="0.875rem"
      font-weight="bold"
      padding="10px 0 0 0"
      header-text="Belastungsplan"
    />
    <v-row
      align="start"
      justify="center"
      dense
      no-gutters
    >
      <v-col cols="4">
        <v-checkbox
          v-model="chosenOptionsCopy.werteHundertRunden"
          class="mb-3"
          :label="'Werte auf 100 Runden'"
          hide-details
          color="grey-darken-1"
          density="compact"
          @mouseover="hoverWerteHundertRunden = true"
          @mouseleave="hoverWerteHundertRunden = false"
        />
        <v-slider
          v-model="sizeBelastungsplan"
          label="Belastungsplangröße"
          :max="10"
          :min="1"
          color="primary"
          density="compact"
          track-size="2"
          thumb-size="12"
          @mouseover="hoverSizeBelastungsplan = true"
          @mouseleave="hoverSizeBelastungsplan = false"
        />
      </v-col>
      <v-col cols="4">
        <v-checkbox
          v-model="chosenOptionsCopy.blackPrintMode"
          class="mb-3"
          :label="'schwarz-weiß Druckausgabe'"
          hide-details
          color="grey-darken-1"
          density="compact"
          @mouseover="hoverBlackPrintMode = true"
          @mouseleave="hoverBlackPrintMode = false"
        />
      </v-col>
      <v-col cols="4">
        <v-card flat />
      </v-col>
    </v-row>
    <v-divider />
  </v-expansion-panel-text>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { computed, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useMessstelleStore } from "@/store/MessstelleStore";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });
const messstelleStore = useMessstelleStore();
const zaehlstelleStore = useZaehlstelleStore();

const hoverWerteHundertRunden = ref(false);
const hoverSizeBelastungsplan = ref(false);
const hoverBlackPrintMode = ref(false);
const sizeBelastungsplan = computed({
  get: () => messstelleStore.getBelastungsplanChosenSize,
  set: (payload: number) =>
    messstelleStore.setBelastungsplanChosenSize(payload),
});

watch(sizeBelastungsplan, () => {
  zaehlstelleStore.setSizeBelastungsplanSvg(sizeBelastungsplan.value);
});
</script>
