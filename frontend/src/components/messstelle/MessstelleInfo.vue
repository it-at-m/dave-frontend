<template>
    <v-container
        class="pa-0 px-4"
        fluid
    >
        <v-row no-gutters>
            <span class="primary--text"
                >Letzter Messtag: {{ datumLetztePlausibleMessung }}
            </span>
        </v-row>
        <v-row
            no-gutters
            class="ma-0"
        >
            <DetektierteFahrzeugartIcon
                :detektierte-fahrzeugart="messstelle.detektierteVerkehrsarten"
            />
            <MessstelleKommentar :kommentar="messstelle.kommentar" />
        </v-row>
        <v-row
            no-gutters
            class="ma-0"
        >
            <v-sheet color="transparent">
                <span class="font-weight-regular">
                    Aufbau: {{ formatDate(messstelle.realisierungsdatum) }}
                </span>
                <br />
                <span v-if="messstelle.abbaudatum">
                    Abbau: {{ formatDate(messstelle.abbaudatum) }}
                </span>
                <br />
                <span>
                    Fahrzeugklassen:
                    {{ messstelle.fahrzeugKlassen }}
                </span>
            </v-sheet>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import { computed } from "vue";
import DetektierteFahrzeugartIcon from "@/components/messstelle/DetektierteFahrzeugartIcon.vue";
import MessstelleKommentar from "@/components/messstelle/MessstelleKommentar.vue";

interface Props {
    messstelle: MessstelleInfoDTO;
}

const datumLetztePlausibleMessung = computed(() => {
    return formatDate(props.messstelle.datumLetztePlausibleMessung);
});

function formatDate(date: string): string {
    if (!date) {
        return "";
    }
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
}

const props = defineProps<Props>();
</script>
