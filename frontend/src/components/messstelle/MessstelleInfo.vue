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
                :detektierte-fahrzeugart="
                    messstelle.messquerschnitte[0].detektierteVerkehrsarten
                "
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
            <v-sheet
                v-if="!doMesssquerschnitteExist"
                id="empty"
                class="d-flex align-center justify-center"
            >
                <h4 class="text-caption font-weight-bold">
                    Für diese Messstelle sind keine weiteren Messquerschnitte
                    vorhanden.
                </h4>
            </v-sheet>
            <v-sheet
                v-else
                color="transparent"
            >
                <h4 v-if="props.messstelle.messquerschnitte.length > 1">
                    Informationen zu Messquerschnitten
                </h4>
                <h4 v-else>Informationen zum Messquerschnitt</h4>
            </v-sheet>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
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

const doMesssquerschnitteExist = computed(() => {
    return props.messstelle.messquerschnitte.length > 0;
});

const fahrzeugKlasse = computed(() => {
    if (props.messstelle.messquerschnitte.length > 0) {
        return props.messstelle.messquerschnitte[0].fahrzeugKlassen;
    } else {
        return "k.A.";
    }
});

const props = defineProps<Props>();
</script>
