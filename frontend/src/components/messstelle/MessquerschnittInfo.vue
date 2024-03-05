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
                tile
                :color="calcRowColor(index)"
                width="100%"
            >
                <span>
                    ID: {{ messquerschnitt.mqId }} |
                    {{ messquerschnitt.strassenname }} </span
                ><br />
                <fahrtrichtung-icon
                    dense
                    :fahrtrichtung="messquerschnitt.fahrtrichtung"
                ></fahrtrichtung-icon>
                <fahrstreifen-icon
                    dense
                    :fahrspuren="messquerschnitt.anzahlFahrspuren"
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
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import FahrtrichtungIcon from "@/components/messstelle/icons/FahrtrichtungIcon.vue";
import FahrstreifenIcon from "@/components/messstelle/icons/FahrspurenIcon.vue";
import { useAlternateRowColor } from "@/composables/alternateRowColorComposable";

interface Props {
    messstelle: MessstelleInfoDTO;
}

const props = defineProps<Props>();
const { calcRowColor } = useAlternateRowColor();
</script>