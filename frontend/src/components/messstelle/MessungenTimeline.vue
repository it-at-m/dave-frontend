<template>
    <v-sheet
        class="overflow-y-auto px-4 my-0"
        width="100%"
        color="transparent"
    >
        <v-row
            v-for="messquerschnitt in props.messstelle.messquerschnitte"
            :key="messquerschnitt.mqId"
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
                            ID Messquerschnitt: 15645</v-list-item-title
                        >
                        <v-list-item-subtitle
                            >Richtung: West</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                            >Anzahl Fahrstreifen: 2</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                            >Straßenname:
                            Agnes-Pockels-Bogen</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                            >Lage: Keine Ahnung was da
                            steht</v-list-item-subtitle
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-row>
    </v-sheet>
</template>

<script setup lang="ts">
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";

interface Props {
    messstelle: MessstelleInfoDTO;
}

const props = defineProps<Props>();
</script>