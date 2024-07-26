<template>
    <v-expansion-panel>
        <v-expansion-panel-title>
            <div>
                <v-icon left icon="mdi-car-multiple"/>
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
import FahrzeugPanelVerkehrsartenContent from "@/components/messstelle/optionsmenue/panels/content/FahrzeugPanelVerkehrsartenContent.vue";
import FahrzeugPanelFahrzeugkategorienContent from "@/components/messstelle/optionsmenue/panels/content/FahrzeugPanelFahrzeugkategorienContent.vue";
import { useMessstelleStore } from "@/store/messstelle";
import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });

const messstelleStore = useMessstelleStore();

const showFahrzeugkategorien = computed(() => {
    return (
        messstelleStore.isKfzMessstelle &&
        messstelleStore.getActiveMessfaehigkeit.fahrzeugklassen ===
            Fahrzeugklasse.ACHT_PLUS_EINS &&
        !(
            chosenOptionsCopy.value.intervall ===
                ZaehldatenIntervall.STUNDE_VIERTEL ||
            chosenOptionsCopy.value.intervall ===
                ZaehldatenIntervall.STUNDE_HALB
        )
    );
});
</script>
