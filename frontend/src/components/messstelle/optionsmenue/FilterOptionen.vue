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
            v-if="wochentag"
            no-gutters
        >
            <v-col
                cols="1"
                align-self="start"
            >
                <v-icon
                    small
                    color="grey lighten-1"
                    >mdi-calendar-week-outline</v-icon
                >
            </v-col>
            <v-col cols="10">
                <span class="grey--text text--lighten-1"
                    >Wochentag:
                    <span class="font-weight-medium white--text"
                        >{{ wochentag }}
                    </span>
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
            <v-col cols="9">
                <span :class="getStyleClass(messquerschnitt.mqId)"
                    >{{ messquerschnitt.mqId }}
                    {{ messquerschnitt.standort }}</span
                >
            </v-col>
            <v-col cols="2">
                <span
                    :class="
                        getStyleClass(messquerschnitt.mqId) + ' hidden-xl-only'
                    "
                    >[
                    {{
                        himmelsRichtungenTextShort.get(
                            messquerschnitt.fahrtrichtung
                        )
                    }}
                    ]</span
                >
                <span
                    :class="
                        getStyleClass(messquerschnitt.mqId) +
                        ' hidden-lg-and-down'
                    "
                    >[
                    {{
                        himmelsRichtungenTextLong.get(
                            messquerschnitt.fahrtrichtung
                        )
                    }}
                    ]</span
                >
            </v-col>
        </v-row>
        <OptionsmenueMessstelle messstelle-id="messstelleId" />
    </v-sheet>
</template>
<script setup lang="ts">
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed, Ref } from "vue";
import OptionsmenueMessstelle from "@/components/messstelle/optionsmenue/OptionsmenueMessstelle.vue";
import { useDateUtils } from "@/util/DateUtils";
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import { zeitblockInfo } from "@/types/enum/Zeitblock";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import { ZaehldatenIntervallToBeschreibung } from "@/types/enum/ZaehldatenIntervall";
import {
    himmelsRichtungenTextLong,
    himmelsRichtungenTextShort,
} from "@/types/enum/Himmelsrichtungen";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import { tagesTypText } from "@/types/enum/TagesTyp";
import { useMessstelleStore } from "@/store/messstelle";

const messstelleStore = useMessstelleStore();
const dateUtils = useDateUtils();
interface Props {
    messstelle: MessstelleInfoDTO;
}

defineProps<Props>();

const filterOptionsMessstelle: Ref<MessstelleOptionsDTO> = computed(() => {
    return messstelleStore.getFilteroptions;
});

const wochentag: Ref<string | undefined> = computed(() => {
    return tagesTypText.get(filterOptionsMessstelle.value.tagesTyp);
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
    let text = Zeitauswahl.TAGESWERT.valueOf();
    const existsBlock = zeitblockInfo.get(
        filterOptionsMessstelle.value.zeitblock
    );
    const existsStunde = zeitblockStuendlichInfo.get(
        filterOptionsMessstelle.value.zeitblock
    );
    if (
        Zeitauswahl.BLOCK === filterOptionsMessstelle.value.zeitauswahl &&
        existsBlock
    ) {
        text = existsBlock.text;
    } else if (
        Zeitauswahl.STUNDE === filterOptionsMessstelle.value.zeitauswahl &&
        existsStunde
    ) {
        text = existsStunde.text;
    }
    return text;
});

const zeitintervall = computed(() => {
    return ZaehldatenIntervallToBeschreibung.get(
        filterOptionsMessstelle.value.intervall
    );
});

function getStyleClass(mqId: string): string {
    let notIncluded = "text-caption grey--text text--lighten-1";
    let included = "text-caption font-weight-medium white--text";
    return filterOptionsMessstelle.value.messquerschnittIds.includes(mqId)
        ? included
        : notIncluded;
}
</script>