<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div>
        <v-icon start>mdi-cogs</v-icon>
        Darstellungsoptionen
      </div>
    </v-expansion-panel-title>
    <darstellungsoptionen-panel-belastungsplan-content
      v-model="chosenOptionsCopy"
    />
    <darstellungsoptionen-panel-ganglinie-content v-model="chosenOptionsCopy" />
    <darstellungsoptionen-panel-listenausgabe-content
      v-model="chosenOptionsCopy"
    />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { computed } from "vue";

import DarstellungsoptionenPanelBelastungsplanContent from "@/components/messstelle/optionsmenue/panels/content/DarstellungsoptionenPanelBelastungsplanContent.vue";
import DarstellungsoptionenPanelGanglinieContent from "@/components/messstelle/optionsmenue/panels/content/DarstellungsoptionenPanelGanglinieContent.vue";
import DarstellungsoptionenPanelListenausgabeContent from "@/components/messstelle/optionsmenue/panels/content/DarstellungsoptionenPanelListenausgabeContent.vue";

interface Props {
  value: MessstelleOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits<(e: "input", v: MessstelleOptionsDTO) => void>();

const chosenOptionsCopy = computed({
  get: () => props.value,
  set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});
</script>
