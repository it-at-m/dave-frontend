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
                                messquerschnitt.lageMessquerschnitt
                            }}</v-list-item-subtitle
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-row>
    </v-sheet>
</template>

<script setup lang="ts">
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";

interface Props {
    messstelle: MessstelleInfoDTO;
}

const props = defineProps<Props>();
</script>