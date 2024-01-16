<script setup lang="ts">
import MessstelleDTO from "@/types/MessstelleDTO";
import { computed } from "vue";
import DetektierteFahrzeugartIcon from "@/components/messstelle/DetektierteFahrzeugartIcon.vue";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import MessstelleKommentar from "@/components/messstelle/MessstelleKommentar.vue";

interface Props {
    messstelle: MessstelleDTO;
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

const props = defineProps<Props>();
</script>

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
                :detektierte-fahrzeugart="DetektierteFahrzeugart.FAHRRAD"
            />
            <MessstelleKommentar
                v-if="messstelle.kommentar"
                :kommentar="messstelle.kommentar"
            />
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
                    {{ messstelle.messquerschnitte[0].fahrzeugKlassen }}
                </span>
            </v-sheet>
            <v-sheet
                v-if="!doMesssquerschnitteExist"
                id="empty"
                class="d-flex align-center justify-center"
            >
                <span class="text-caption font-weight-bold"
                    >Für diese Zählstelle sind keine weiteren Zählungen
                    vorhanden.</span
                >
            </v-sheet>
            <v-sheet
                v-else
                color="transparent"
            >
                <span
                    v-if="props.messstelle.messquerschnitte.length > 1"
                    class="font-weight-bold"
                    >Informationen zu Messquerschnitten</span
                >
                <span
                    v-else
                    class="font-weight-bold"
                    >Informationen zum Messquerschnitt</span
                >
            </v-sheet>
        </v-row>
    </v-container>
</template>
