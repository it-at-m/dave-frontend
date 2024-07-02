<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div>
        <v-icon start>mdi-car-multiple</v-icon>
        Fahrzeuge
      </div>
    </v-expansion-panel-title>
    <fahrzeug-panel-verkehrsarten-content
      v-model="chosenOptionsCopy"
      class="mt-1"
    />
    <fahrzeug-panel-fahrzeugkategorien-content
      v-if="showFahrzeugkategorien"
      v-model="chosenOptionsCopy"
    />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { computed } from "vue";

import FahrzeugPanelFahrzeugkategorienContent from "@/components/messstelle/optionsmenue/panels/content/FahrzeugPanelFahrzeugkategorienContent.vue";
import FahrzeugPanelVerkehrsartenContent from "@/components/messstelle/optionsmenue/panels/content/FahrzeugPanelVerkehrsartenContent.vue";
import { useMessstelleStore } from "@/store/messstelle";
import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

interface Props {
  value: MessstelleOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits<(e: "input", v: MessstelleOptionsDTO) => void>();
const messstelleStore = useMessstelleStore();

const chosenOptionsCopy = computed({
  get: () => props.value,
  set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

const showFahrzeugkategorien = computed(() => {
  return (
    messstelleStore.isKfzMessstelle &&
    messstelleStore.getActiveMessfaehigkeit.fahrzeugklassen ===
      Fahrzeugklasse.ACHT_PLUS_EINS &&
    !(
      chosenOptionsCopy.value.intervall ===
        ZaehldatenIntervall.STUNDE_VIERTEL ||
      chosenOptionsCopy.value.intervall === ZaehldatenIntervall.STUNDE_HALB
    )
  );
});
</script>
