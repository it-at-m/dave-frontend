<script setup lang="ts">
import MessstelleDTO from "@/types/MessstelleDTO";
import { computed } from "vue";
import DetektierteFahrzeugartIcon from "@/components/messstelle/DetektierteFahrzeugartIcon.vue";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import KommentarInfo from "@/components/zaehlstelle/KommentarInfo.vue";
import MessstelleKommentar from "@/components/messstelle/MessstelleKommentar.vue";
import MessungenTimeline from "@/components/messstelle/MessungenTimeline.vue";

interface Props {
    messsstelle: MessstelleDTO;
}

const datumLetztePlausibleMessung = computed(() => {
    return formatDate(props.messsstelle.datumLetztePlausibleMessung);
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

<template>
    <v-container
        class="pa-0"
        fluid
    >
        <v-row
            no-gutters
            style="background-color: #ef9a9a"
        >
            {{ datumLetztePlausibleMessung }}
        </v-row>
        <v-row
            no-gutters
            class="ma-0"
        >
            <DetektierteFahrzeugartIcon
                :detektierte-fahrzeugart="DetektierteFahrzeugart.FAHRRAD"
            />
            <MessstelleKommentar
                v-if="messsstelle.kommentar"
                :kommentar="messsstelle.kommentar"
            />
        </v-row>
        <v-row
            no-gutters
            class="ma-0"
        >
            <v-sheet color="transparent">
                <span>
                    Aufbau: {{ formatDate(messsstelle.realisierungsdatum) }}
                </span>
                <br />
                <span v-if="messsstelle.abbaudatum">
                    Abbau: {{ formatDate(messsstelle.abbaudatum) }}
                </span>
                <br />
                <span>
                    Fahrzeugklassen:
                    {{ messsstelle.messquerschnitte[0].fahrzeugKlassen }}
                </span>
            </v-sheet>
        </v-row>
        <v-row>
            <MessungenTimeline :messstelle="messsstelle" />
        </v-row>
    </v-container>
</template>
