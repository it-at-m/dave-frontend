<template>
    <v-expansion-panel>
        <v-expansion-panel-title>
            <div>
                <v-icon left>mdi-cogs</v-icon>
                Darstellungsoptionen
            </div>
        </v-expansion-panel-title>
        <darstellungsoptionen-panel-belastungsplan-content
            v-model="chosenOptionsCopy"
        />
        <darstellungsoptionen-panel-ganglinie-content
            v-model="chosenOptionsCopy"
        />
        <darstellungsoptionen-panel-listenausgabe-content
            v-model="chosenOptionsCopy"
        />
    </v-expansion-panel>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import DarstellungsoptionenPanelGanglinieContent
  from "@/components/messstelle/optionsmenue/panels/content/DarstellungsoptionenPanelGanglinieContent.vue";
import DarstellungsoptionenPanelListenausgabeContent
  from "@/components/messstelle/optionsmenue/panels/content/DarstellungsoptionenPanelListenausgabeContent.vue";
import DarstellungsoptionenPanelBelastungsplanContent
  from "@/components/messstelle/optionsmenue/panels/content/DarstellungsoptionenPanelBelastungsplanContent.vue";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });
</script>