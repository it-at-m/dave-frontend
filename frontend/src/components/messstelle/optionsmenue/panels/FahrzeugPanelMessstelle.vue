<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div>
        <v-icon
          start
          icon="mdi-car-multiple"
        />
        Fahrzeuge
      </div>
    </v-expansion-panel-title>
    <fahrzeug-panel-verkehrsarten-content
      v-model="chosenOptionsCopy"
      class="mt-1"
    />
    <fahrzeug-panel-fahrzeugkategorien-content v-model="chosenOptionsCopy" />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import FahrzeugPanelFahrzeugkategorienContent from "@/components/messstelle/optionsmenue/panels/content/FahrzeugPanelFahrzeugkategorienContent.vue";
import FahrzeugPanelVerkehrsartenContent from "@/components/messstelle/optionsmenue/panels/content/FahrzeugPanelVerkehrsartenContent.vue";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });
</script>
