<template>
    <v-container
        class="pa-0"
        fluid
    >
        <v-row
            class="px-4"
            no-gutters
        >
            <span class="primary--text"
                >Letzter Messtag: {{ datumLetztePlausibleMessung }}
            </span>
        </v-row>
        <v-row
            no-gutters
            class="my-2 px-4"
        >
            <DetektierteFahrzeugartIcon
                :detektierte-fahrzeugart="detektierteVerkehrsart"
            />
            <MessstelleKommentar :kommentar="messstelle.kommentar" />
        </v-row>
        <v-row
            no-gutters
            class="my-1"
        >
            <v-sheet
                color="white"
                width="100%"
                class="px-4 py-2"
            >
                <span class="d-inline-flex pr-1">
                    <base-icon
                        :small="true"
                        :icon="aufbauIcon.iconPath"
                        :tooltip="aufbauIcon.tooltip"
                    ></base-icon>
                    {{ formatDate(messstelle.realisierungsdatum) }}
                </span>
                <span v-if="abbauDatumExists">
                    |
                    <span class="d-inline-flex pl-1">
                        <base-icon
                            :small="true"
                            :icon="abbauIcon.iconPath"
                            :tooltip="abbauIcon.tooltip"
                        ></base-icon>
                        {{ formatDate(messstelle.abbaudatum) }}
                    </span>
                </span>
                <br />
                <span>
                    Fahrzeugklassen:
                    {{ fahrzeugKlasse }}
                </span>
            </v-sheet>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
import { computed } from "vue";
import DetektierteFahrzeugartIcon from "@/components/messstelle/DetektierteFahrzeugartIcon.vue";
import MessstelleKommentar from "@/components/messstelle/MessstelleKommentar.vue";
import BaseIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
    messstelle: MessstelleInfoDTO;
}

const aufbauIcon = new IconTooltip("mdi-elevator-up", "Aufbaudatum");
const abbauIcon = new IconTooltip("mdi-elevator-down", "Abbaudatum");

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

const abbauDatumExists = computed(() => {
    return props.messstelle.abbaudatum;
});

const props = defineProps<Props>();
</script>
