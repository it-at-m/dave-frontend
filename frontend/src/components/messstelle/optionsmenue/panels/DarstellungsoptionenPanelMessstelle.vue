<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <div>
                <v-icon left>mdi-cogs</v-icon>
                Darstellungsoptionen
            </div>
        </v-expansion-panel-header>
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
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed } from "vue";
import DarstellungsoptionenPanelGanglinieContent from "@/components/messstelle/optionsmenue/panels/content/DarstellungsoptionenPanelGanglinieContent.vue";
import DarstellungsoptionenPanelListenausgabeContent from "@/components/messstelle/optionsmenue/panels/content/DarstellungsoptionenPanelListenausgabeContent.vue";
import DarstellungsoptionenPanelBelastungsplanContent from "@/components/messstelle/optionsmenue/panels/content/DarstellungsoptionenPanelBelastungsplanContent.vue";

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