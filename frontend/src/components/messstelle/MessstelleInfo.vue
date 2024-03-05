<template>
    <v-container
        class="pa-0"
        fluid
    >
        <v-row no-gutters>
            <v-sheet
                color="white"
                width="100%"
                class="px-4 py-2 primary--text text-caption"
                height="72px"
            >
                <v-row
                    no-gutters
                    class="pa-0 ma-0"
                >
                    <v-col
                        cols="12"
                        lg="8"
                    >
                        <v-row no-gutters>
                            <v-tooltip bottom>
                                <template #activator="{ on, attrs }">
                                    <span
                                        v-bind="attrs"
                                        v-on="on"
                                        >Letzte Messung:
                                        {{ datumLetztePlausibleMessung }}
                                    </span>
                                </template>
                                <span> Datum letzte plausible Messung </span>
                            </v-tooltip>
                        </v-row>
                        <v-row no-gutters>
                            <span class="text-truncate">
                                <v-tooltip bottom>
                                    <template #activator="{ on, attrs }">
                                        <span
                                            v-bind="attrs"
                                            class="d-inline-flex pr-1"
                                            v-on="on"
                                        >
                                            <v-icon
                                                small
                                                color="primary"
                                                class="mb-1 mr-1"
                                                >{{ aufbauIcon.iconPath }}
                                            </v-icon>
                                            {{
                                                formatDate(
                                                    messstelle.realisierungsdatum
                                                )
                                            }}
                                        </span>
                                    </template>
                                    <span> {{ aufbauIcon.tooltip }} </span>
                                </v-tooltip>

                                <v-tooltip bottom>
                                    <template #activator="{ on, attrs }">
                                        <span
                                            v-if="abbauDatumExists"
                                            v-bind="attrs"
                                            class="d-inline-flex px-1"
                                            v-on="on"
                                            >|
                                            <v-icon
                                                small
                                                color="primary"
                                                class="mb-1 mx-1"
                                                >{{ abbauIcon.iconPath }}
                                            </v-icon>
                                            {{
                                                formatDate(
                                                    messstelle.abbaudatum
                                                )
                                            }}
                                        </span>
                                    </template>
                                    <span> {{ abbauIcon.tooltip }} </span>
                                </v-tooltip>
                            </span>
                        </v-row>
                        <v-row no-gutters>
                            <span class="text-truncate align-end">
                                <DetektierteFahrzeugartIcon
                                    :detektierte-fahrzeugart="
                                        detektierteVerkehrsart
                                    "
                                    color="primary"
                                />
                                <FahrzeugklassenIcon
                                    :fahrzeugklasse="fahrzeugKlasse"
                                    color="primary"
                                    small
                                ></FahrzeugklassenIcon>
                                <MessstelleKommentar
                                    :kommentar="messstelle.kommentar"
                                />
                            </span>
                        </v-row>
                    </v-col>
                    <v-col
                        lg
                        class="hidden-md-and-down"
                    >
                        <v-spacer></v-spacer>
                    </v-col>
                    <v-col
                        lg
                        class="hidden-md-and-down"
                    >
                        <messstelle-geometrie
                            :height="60"
                            :width="60"
                            active-color="#1565C0"
                            passive-color="#EEEEEE"
                            :knotenarme="calculateKnotenarme(messstelle)"
                        ></messstelle-geometrie>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import { computed } from "vue";
import DetektierteFahrzeugartIcon from "@/components/messstelle/DetektierteFahrzeugartIcon.vue";
import MessstelleKommentar from "@/components/messstelle/MessstelleKommentar.vue";
import FahrzeugklassenIcon from "@/components/messstelle/icons/FahrzeugklassenIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";
import MessstelleGeometrie from "@/components/messstelle/MEssstelleGeometrie.vue";

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
        return props.messstelle.fahrzeugKlassen;
    } else {
        return "k.A.";
    }
});

const detektierteVerkehrsart = computed(() => {
    if (props.messstelle.messquerschnitte.length > 0) {
        return props.messstelle.detektierteVerkehrsarten;
    } else {
        return undefined;
    }
});

const abbauDatumExists = computed(() => {
    return props.messstelle.abbaudatum != null;
});

function calculateKnotenarme(messstelle: MessstelleInfoDTO) {
    let knotenarme = [];
    for (let messquerschnitt of messstelle.messquerschnitte) {
        knotenarme.push({
            fahrtrichtung: messquerschnitt.fahrtrichtung,
            strassenname: messquerschnitt.strassenname,
        });
    }
    return knotenarme;
}

const props = defineProps<Props>();
</script>
