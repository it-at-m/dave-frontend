<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <div>
                <v-icon left>mdi-car-multiple</v-icon>
                Fahrzeuge
            </div>
        </v-expansion-panel-header>
        <fahrzeug-panel-verkehrsarten-content
            v-model="chosenOptionsCopy"
            class="mt-1"
        />
        <fahrzeug-panel-fahrzeugkategorien-content
            v-if="isKfzMessstelle"
            v-model="chosenOptionsCopy"
        />
    </v-expansion-panel>
</template>

<script setup lang="ts">
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed } from "vue";
import FahrzeugPanelVerkehrsartenContent from "@/components/messstelle/optionsmenue/panels/content/FahrzeugPanelVerkehrsartenContent.vue";
import FahrzeugPanelFahrzeugkategorienContent from "@/components/messstelle/optionsmenue/panels/content/FahrzeugPanelFahrzeugkategorienContent.vue";
import { useStore } from "@/util/useStore";

interface Props {
    value: MessstelleOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits<(e: "input", v: MessstelleOptionsDTO) => void>();
const store = useStore();

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

const isKfzMessstelle = computed(() => {
    return store.getters["messstelleInfo/isKfzMessstelle"];
});
</script>
