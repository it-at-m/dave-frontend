<script setup lang="ts">
import { computed } from "vue";
import { DateTimeFormatOptions } from "vue-i18n";
import MessstelleDTO from "@/types/MessstelleDTO";
interface Props {
    messstelle: MessstelleDTO;
}

const props = defineProps<Props>();

const doMesssquerschnitteExist = computed(() => {
    return props.messstelle.messquerschnitte.length > 0;
});
</script>

<template>
    <v-sheet
        width="100%"
        color="transparent"
    >
        <v-sheet
            v-if="!doMesssquerschnitteExist"
            id="empty"
            class="d-flex align-center justify-center pa-4 mx-auto"
        >
            <span class="text-caption font-weight-bold"
                >Für diese Zählstelle sind keine weiteren Zählungen
                vorhanden.</span
            >
        </v-sheet>
        <v-sheet
            class="px-4 py-2"
            color="transparent"
        >
            <span class="text-caption grey--text text--lighten-1"
                >Informationen zu(m) Messquerschnitt(en)</span
            >
            <br />
            <v-row
                v-for="messquerschnitt in messstelle.messquerschnitte"
                :key="messquerschnitt.mqId"
                no-gutters
            >
                <v-sheet color="transparent">
                    <span> ID Messquerschnitt:{{ messquerschnitt.mqId }}</span>
                    <br />

                    <span> Richtung:{{ messquerschnitt.fahrtrichtung }}</span>
                    <br />
                    <span>
                        Anzahl Fahrstreifen:{{
                            messquerschnitt.anzahlFahrspuren
                        }}</span
                    >
                    <br />
                    <span> Straßenname:{{ messquerschnitt.strassenname }}</span>
                    <br />
                    <span>
                        Lage Messquerschnitt:{{
                            messquerschnitt.lageMessquerschnitt
                        }}</span
                    >
                </v-sheet>
                <br />
            </v-row>
        </v-sheet>
    </v-sheet>
</template>

<style scoped>

</style>