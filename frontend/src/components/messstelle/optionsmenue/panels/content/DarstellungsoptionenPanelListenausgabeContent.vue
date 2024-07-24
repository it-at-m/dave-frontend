<template>
    <v-expansion-panel-content>
        <panel-header
            font-size="0.875rem"
            font-weight="bold"
            padding="10px 0 0 0"
            header-text="Listenausgabe"
        ></panel-header>
        <v-row
            align="start"
            justify="center"
            dense
        >
            <v-col cols="4">
                <v-hover v-model="hoverStundensumme">
                    <v-checkbox
                        v-model="chosenOptionsCopy.stundensumme"
                        :label="'Stundensumme'"
                        hide-details
                        color="grey-darken-1"
                        dense
                    ></v-checkbox>
                </v-hover>
                <v-hover v-model="hoverBlocksumme">
                    <v-checkbox
                        v-model="chosenOptionsCopy.blocksumme"
                        :label="'Blocksumme'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey-darken-1"
                        dense
                    ></v-checkbox>
                </v-hover>
            </v-col>
            <v-col cols="4">
                <v-hover v-model="hoverTagessumme">
                    <v-checkbox
                        v-model="chosenOptionsCopy.tagessumme"
                        :label="'Tagessumme'"
                        hide-details
                        color="grey-darken-1"
                        dense
                    ></v-checkbox>
                </v-hover>
                <v-hover v-model="hoverSpitzenstunde">
                    <v-checkbox
                        v-model="chosenOptionsCopy.spitzenstunde"
                        :label="'Spitzenstunde'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey-darken-1"
                        dense
                    ></v-checkbox>
                </v-hover>
            </v-col>
            <v-col cols="4">
                <v-card flat>
                    {{ helpTextListenausgabe }}
                </v-card>
            </v-col>
        </v-row>
    </v-expansion-panel-content>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed, ref } from "vue";
import PanelHeader from "@/components/common/PanelHeader.vue";

interface Props {
    value: MessstelleOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits<(e: "input", v: MessstelleOptionsDTO) => void>();

const hoverStundensumme = ref(false);
const hoverBlocksumme = ref(false);
const hoverTagessumme = ref(false);
const hoverSpitzenstunde = ref(false);

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emit("input", payload),
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
