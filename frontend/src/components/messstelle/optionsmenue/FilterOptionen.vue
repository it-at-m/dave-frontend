<template>
    <v-sheet
        width="100%"
        color="grey darken-1"
        class="px-4 py-3"
    >
        <v-row>
            <v-col cols="1"></v-col>
            <v-col>
                <h3 class="grey--text text--lighten-1">
                    Aktuelle Filtereinstellungen
                </h3>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col
                cols="1"
                align-self="start"
            >
                <v-icon
                    small
                    color="grey lighten-1"
                    >mdi-clock-time-four-outline</v-icon
                >
            </v-col>
            <v-col cols="10">
                <span class="grey--text text--lighten-1"
                    >Zeit:
                    <span class="font-weight-medium white--text"
                        >{{ zeitblock }}
                    </span>
                    in
                    <span class="font-weight-medium white--text"
                        >{{ zeitintervall }}
                    </span>
                    Intervallen
                    <span class="font-weight-medium white--text">{{
                        zeitraum
                    }}</span>
                </span>
            </v-col>
        </v-row>
        <v-row
            v-for="(messquerschnitt, index) in messstelle.messquerschnitte"
            :key="index"
            no-gutters
            class="ma-0"
        >
            <v-col cols="1">
                <v-icon
                    v-if="index === 0"
                    small
                    color="grey lighten-1"
                    >mdi-arrow-decision</v-icon
                >
            </v-col>
            <v-col cols="6">
                <span class="text-caption grey--text text--lighten-1"
                    >{{ messquerschnitt.mqId }}
                    {{ messquerschnitt.lageMessquerschnitt }}</span
                >
            </v-col>
            <v-col cols="4">
                <span class="text-caption grey--text text--lighten-1"
                    >[ {{ messquerschnitt.fahrtrichtung }} ]</span
                >
            </v-col>
        </v-row>
        <OptionsmenueMessstelle messstelle-id="messstelleId" />
    </v-sheet>
</template>
<script setup lang="ts">
import { useStore } from "@/api/util/useStore";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed, Ref } from "vue";
import OptionsmenueMessstelle from "@/components/messstelle/optionsmenue/OptionsmenueMessstelle.vue";
import { useDateUtils } from "@/util/DateUtils";
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import { zeitblockInfo } from "@/types/enum/Zeitblock";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import { ZaehldatenIntervallToBeschreibung } from "@/types/enum/ZaehldatenIntervall";

const store = useStore();
const dateUtils = useDateUtils();
interface Props {
    messstelle: MessstelleInfoDTO;
}

defineProps<Props>();

const filterOptionsMessstelle: Ref<MessstelleOptionsDTO> = computed(() => {
    return store.getters["filteroptionsMessstelle/getFilteroptions"];
});

const zeitraum: Ref<string> = computed(() => {
    const zeitraum = filterOptionsMessstelle.value.zeitraum.slice();
    if (zeitraum.length == 1) {
        return `am ${dateUtils.formatDate(zeitraum[0])}`;
    } else if (zeitraum.length == 2) {
        const sortedDates = dateUtils.sortDatesDescAsStrings(zeitraum);
        return `im Zeitraum ${dateUtils.formatDate(
            sortedDates[1]
        )} - ${dateUtils.formatDate(sortedDates[0])}`;
    }
    return "";
});

const zeitblock: Ref<string> = computed(() => {
    const zeitblock = zeitblockInfo.get(
        filterOptionsMessstelle.value.zeitblock
    );
    if (
        zeitblock &&
        filterOptionsMessstelle.value.zeitauswahl != Zeitauswahl.TAGESWERT
    ) {
        return zeitblock.text;
    }
    return Zeitauswahl.TAGESWERT;
});

const zeitintervall = computed(() => {
    return ZaehldatenIntervallToBeschreibung.get(
        filterOptionsMessstelle.value.intervall
    );
});
</script>