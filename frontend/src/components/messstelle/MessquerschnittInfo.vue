<template>
    <v-sheet
        class="overflow-y-auto px-0"
        color="transparent"
    >
        <v-row
            v-for="(messquerschnitt, index) in props.messstelle
                .messquerschnitte"
            :key="messquerschnitt.mstId"
            no-gutters
        >
            <v-sheet
                class="mx-auto px-4 py-2"
                max-width="400"
                tile
                :color="calcRowColor(index)"
                width="100%"
            >
                <span>
                    ID: {{ messquerschnitt.mqId }} |
                    {{ messquerschnitt.strassenname }} </span
                ><br />
                <!-- todo: warum wird hier immer die iconColor übergeben und nicht in der Icon Komponente als schwarz festgelegt? -->
                <fahrtrichtung-icon
                    dense
                    :fahrtrichtung="messquerschnitt.fahrtrichtung"
                    :color="iconColor"
                ></fahrtrichtung-icon>
                <fahrstreifen-icon
                    dense
                    :fahrspuren="messquerschnitt.anzahlFahrspuren"
                    :color="iconColor"
                ></fahrstreifen-icon
                ><br />
                <span class="text-body-2">
                    Lage: {{ messquerschnitt.lageMessquerschnitt }}
                </span>
            </v-sheet>
        </v-row>
    </v-sheet>
</template>

<script setup lang="ts">
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
import FahrtrichtungIcon from "@/components/zaehlstelle/icons/FahrtrichtungIcon.vue";
import FahrstreifenIcon from "@/components/zaehlstelle/icons/FahrspurenIcon.vue";

interface Props {
    messstelle: MessstelleInfoDTO;
}

const iconColor = "black";

const props = defineProps<Props>();

// todo: funktion auslagern oder importieren, so ist der code doppelt
function calcRowColor(index: number): string {
    const ungerade = index % 2 > 0;
    if (ungerade) {
        return "grey lighten-4";
    }
    return "grey lighten-2";
}
</script>