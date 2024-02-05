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
                :detektierte-fahrzeugart="detektierteVerkehrsart"
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
                    {{ fahrzeugKlasse }}
                </span>
            </v-sheet>
            <FilterOptionen :messstelle="messstelle" />
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
import { computed } from "vue";
import DetektierteFahrzeugartIcon from "@/components/messstelle/DetektierteFahrzeugartIcon.vue";
import MessstelleKommentar from "@/components/messstelle/MessstelleKommentar.vue";
import FilterOptionen from "@/components/messstelle/FilterOptionen.vue";

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

const fahrzeugKlasse = computed(() => {
    if (props.messstelle.messquerschnitte.length > 0) {
        return props.messstelle.messquerschnitte[0].fahrzeugKlassen;
    } else {
        return "k.A.";
    }
});

const detektierteVerkehrsart = computed(() => {
    if (props.messstelle.messquerschnitte.length > 0) {
        return props.messstelle.messquerschnitte[0].detektierteVerkehrsarten;
    } else {
        return undefined;
    }
});

const props = defineProps<Props>();
</script>
