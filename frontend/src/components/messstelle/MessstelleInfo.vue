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
                <span class="font-weight-regular">
                    <!--<base-icon
                        :small="true"
                        :icon="aufbauIcon.iconPath"
                        :tooltip="aufbauIcon.tooltip"
                    ></base-icon>-->
                    Aufbau: {{ formatDate(messstelle.realisierungsdatum) }}
                </span>
                <span v-if="messstelle.abbaudatum">
                    <!--<base-icon
                        :small="true"
                        :icon="abbauIcon.iconPath"
                        :tooltip="abbauIcon.tooltip"
                    ></base-icon>-->
                    | Abbau: {{ formatDate(messstelle.abbaudatum) }}
                </span>
                <br />
                <span>
                    Fahrzeugklassen:
                    {{ fahrzeugKlasse }}
                </span>
            </v-sheet>
        </v-row>

        <v-row class="ma-0">
            <v-sheet
                v-if="!doMesssquerschnitteExist"
                id="empty"
                class="d-flex align-center justify-center px-4 pt-1"
                color="transparent"
            >
                <h4 class="text-caption font-weight-bold">
                    Für diese Messstelle sind keine weiteren Messquerschnitte
                    vorhanden.
                </h4>
            </v-sheet>
            <v-sheet
                v-else
                color="transparent"
                class="px-4 py-2"
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
import BaseIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
    messstelle: MessstelleInfoDTO;
}

const aufbauIcon = new IconTooltip("mdi-cctv", "Aufbaudatum");
const abbauIcon = new IconTooltip("mdi-cctv-off", "Abbaudatum");

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

const doMesssquerschnitteExist = computed(() => {
    return props.messstelle.messquerschnitte.length > 0;
});
</script>
