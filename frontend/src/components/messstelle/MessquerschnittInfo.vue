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
                        <!-- todo: items passen sich noch der größe vom titel an -->
                        <v-list-item-title width="100%">
                            ID: {{ messquerschnitt.mqId }} |
                            {{ messquerschnitt.strassenname }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            <fahrtrichtung-icon
                                dense
                                :fahrtrichtung="messquerschnitt.fahrtrichtung"
                                :color="iconColor"
                            ></fahrtrichtung-icon>
                            <fahrstreifen-icon
                                dense
                                :fahrspuren="messquerschnitt.anzahlFahrspuren"
                                :color="iconColor"
                            ></fahrstreifen-icon>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle
                            >Lage:
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
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
import FahrtrichtungIcon from "@/components/zaehlstelle/icons/FahrtrichtungIcon.vue";
import FahrstreifenIcon from "@/components/zaehlstelle/icons/FahrstreifenIcon.vue";

interface Props {
    messstelle: MessstelleInfoDTO;
    iconColor: string;
}

const props = withDefaults(defineProps<Props>(), {
    iconColor: "black",
});
</script>