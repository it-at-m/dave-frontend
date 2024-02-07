<template>
    <v-sheet
        class="overflow-y-auto px-4 my-0"
        width="100%"
        color="transparent"
    >
        <v-row
            v-for="messquerschnitt in props.messstelle.messquerschnitte"
            :key="messquerschnitt.mstId"
            no-gutters
        >
            <v-card
                class="mx-auto"
                max-width="400"
                tile
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>
                            ID Messquerschnitt:
                            {{ messquerschnitt.mqId }}</v-list-item-title
                        >
                        <v-list-item-subtitle
                            >Richtung:
                            {{
                                messquerschnitt.fahrtrichtung
                            }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                            >Anzahl Fahrstreifen:
                            {{
                                messquerschnitt.anzahlFahrspuren
                            }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                            >Straßenname:
                            {{
                                messquerschnitt.strassenname
                            }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                            >Lage Messquerschnitt:
                            {{
                                getMessquerschnittStandort
                            }}</v-list-item-subtitle
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-row>
    </v-sheet>
</template>

<script setup lang="ts">
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
import { computed } from "vue";
interface Props {
    messstelle: MessstelleInfoDTO;
}

const getMessquerschnittStandort = computed(() => {
    if (
        props.messstelle.messquerschnitte.length > 0 &&
        props.messstelle.messquerschnitte[0].standort
    ) {
        return props.messstelle.messquerschnitte[0].standort;
    } else {
        return "Keine Angabe zum Standort";
    }
});

const props = defineProps<Props>();
</script>