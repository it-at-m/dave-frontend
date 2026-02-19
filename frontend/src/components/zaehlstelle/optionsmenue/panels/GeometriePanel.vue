<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div>
        <v-icon
          start
          icon="mdi-arrow-decision"
        />
        Verkehrsbeziehungen
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-1">
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 10px 0"
        :header-text="headerText"
      />

      <knotenverkehr-form
          v-if="activeZaehlung.zaehlart === Zaehlart.FJS || activeZaehlung.zaehlart === Zaehlart.QU"
          v-model="chosenOptionsCopy"
          :height="height"
      />

      <querschnitt-je-strassenseite-form
          v-else-if="activeZaehlung.zaehlart === Zaehlart.QJS"
          v-model="chosenOptionsCopy"
          :height="height"
      />

      <verkehrsbeziehung-kreuzung-form
          v-else
          v-model="chosenOptionsCopy"
      />

    </v-expansion-panel-text>
  </v-expansion-panel>


</template>

<script setup lang="ts">
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import {computed, ref} from "vue";
import PanelHeader from "@/components/common/PanelHeader.vue";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Zaehlart from "@/types/enum/Zaehlart";
import KnotenverkehrForm from "@/components/zaehlstelle/optionsmenue/panels/geometry/KnotenverkehrForm.vue";
import QuerschnittJeStrassenseiteForm
  from "@/components/zaehlstelle/optionsmenue/panels/geometry/QuerschnittJeStrassenseiteForm.vue";
import VerkehrsbeziehungKreuzungForm
  from "@/components/zaehlstelle/optionsmenue/panels/geometry/VerkehrsbeziehungKreuzungForm.vue";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

const zaehlstelleStore = useZaehlstelleStore();

const height = ref("500");

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const chosenOptionsCopy = defineModel<ZaehlstelleOptionsDTO>({
  required: true,
});

const headerText = computed(() => {
  return activeZaehlung.value.zaehlart === Zaehlart.FJS || activeZaehlung.value.zaehlart === Zaehlart.QU
      ? 'Verkehrsbeziehungen an den Knotenarmen'
      : 'Verkehrsbeziehungen zwischen den Knotenarmen';
});


</script>
