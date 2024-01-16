<script setup lang="ts">
import { computed } from "vue";
import { DateTimeFormatOptions } from "vue-i18n";
import MessstelleDTO from "@/types/MessstelleDTO";
interface Props {
    messstelle: MessstelleDTO;
    timelineHeight: string;
}

const props = defineProps<Props>();

function calcRowColor(index: number) {
    const ungerade = index % 2 > 0;
    if (ungerade) {
        return "grey lighten-4";
    }
    return "grey lighten-2";
}
</script>

<template>
    <v-sheet
        class="overflow-y-auto"
        width="100%"
        color="transparent"
    >
        <v-sheet
            class="px-4 my-0"
            color="transparent"
        >
            <v-row
                v-for="(messquerschnitt, index) in messstelle.messquerschnitte"
                :key="messquerschnitt.mqId"
                no-gutters
            >
                <v-sheet
                    :color="calcRowColor(index)"
                    width="100%"
                    min-height="130px"
                    class="d-flex flex-column justify-space-between py-2"
                >
                    <span class="text-body-2">
                        ID Messquerschnitt: {{ messquerschnitt.mqId }}</span
                    >
                    <br />

                    <span class="text-body-2">
                        Richtung: {{ messquerschnitt.fahrtrichtung }}</span
                    >
                    <br />
                    <span class="text-body-2">
                        Anzahl Fahrstreifen:
                        {{ messquerschnitt.anzahlFahrspuren }}</span
                    >
                    <br />
                    <span class="text-body-2">
                        Straßenname: {{ messquerschnitt.strassenname }}</span
                    >
                    <br />
                    <span class="text-body-2">
                        Lage Messquerschnitt:
                        {{ messquerschnitt.lageMessquerschnitt }}</span
                    >
                </v-sheet>
            </v-row>
        </v-sheet>
    </v-sheet>
</template>

<style scoped>

</style>