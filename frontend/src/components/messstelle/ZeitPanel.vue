<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <div>
                <v-icon left>mdi-clock-time-four-outline</v-icon>
                Zeit
            </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-1">
            <panel-header
                font-size="0.875rem"
                font-weight="bold"
                padding="10px 0 0 0"
                header-text="Zeitauswahl"
            ></panel-header>
            <v-row
                no-gutters
                class="mt-3"
            >
                <v-col
                    cols="8"
                    class="pr-2"
                >
                    <v-date-picker
                        v-model="chosenOptionsCopy.zeitraum"
                        range
                        :allowed-dates="allowedDatesRangeDatePicker"
                        full-width
                        no-title
                        :events="nichtPlausibleTage"
                        event-color="red"
                        locale="de-DE"
                        first-day-of-week="1"
                        @change="checkIfDateIsAlreadySelected"
                    ></v-date-picker>
                </v-col>
                <v-col cols="4"
                    ><v-text-field
                        :label="getChosenDateAsText"
                        readonly
                        :value="getFormattedSelectedZeit"
                        :rules="[
                            RULE_EINGABE_TAG_ODER_ZEITRAUM_HAT_PLAUSIBLE_MESSUNG,
                        ]"
                    />
                    <p class="text-caption">Hinweise:</p>
                    <p class="text-caption">
                        An den Im Kalender markierten Tagen sind keine
                        plausiblen Messungen enthalten
                    </p>
                    <p
                        v-if="isAnwender"
                        class="text-caption"
                    >
                        Als Anwender beträgt der maximal mögliche
                        Auswahlzeitraum 5 Jahre
                    </p>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <panel-header
                font-size="0.875rem"
                font-weight="bold"
                padding="10px 0 0 0"
                header-text="Wochentag"
            ></panel-header>
            <v-row no-gutters>
                <v-col cols="6">
                    <v-radio-group
                        v-model="chosenWochentag"
                        class="full-width"
                    >
                        <v-radio
                            :value="Wochentag.WERKTAG_DI_MI_DO"
                            :label="
                                getWochentagText(Wochentag.WERKTAG_DI_MI_DO)
                            "
                        />
                        <v-radio
                            :value="Wochentag.WERKTAG_MO_FR"
                            :label="getWochentagText(Wochentag.WERKTAG_MO_FR)"
                        />
                        <v-radio
                            :value="Wochentag.SAMSTAG"
                            :label="getWochentagText(Wochentag.SAMSTAG)"
                        />
                        <v-radio
                            :value="Wochentag.SONNTAG_FEIERTAG"
                            :label="
                                getWochentagText(Wochentag.SONNTAG_FEIERTAG)
                            "
                        />
                        <v-radio
                            :value="Wochentag.WERKTAG_FERIEN"
                            :label="getWochentagText(Wochentag.WERKTAG_FERIEN)"
                        />
                        <v-radio
                            :value="Wochentag.DTV"
                            :label="getWochentagText(Wochentag.DTV)"
                        />
                    </v-radio-group>
                </v-col>
                <v-col cols="6"> {{ helperText }} </v-col>
            </v-row>
            <v-divider></v-divider>
            <panel-header
                font-size="0.875rem"
                font-weight="bold"
                padding="10px 0 0 0"
                header-text="Zeitauswahl"
            ></panel-header>
            <v-row no-gutters>
                <v-radio-group>
                    <v-row
                        no-gutters
                        style="width: 100%"
                    >
                        <v-col cols="6">
                            <v-radio
                                label="Tageswert (Durchschnitt)"
                                value="Tageswert"
                            />
                            <v-radio
                                label="Block (Durchschnitt)"
                                value="Block"
                            />
                            <v-radio
                                label="Stunde (Durchschnitt)"
                                value="Stunde"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-radio
                                label="Spitzenstunde Kfz (Durchschnitt)"
                                value="Spitzenstunde Kfz"
                            />
                            <v-radio
                                label="Spitzenstunde Rad (Durchschnitt)"
                                value="Spitzenstunde Rad"
                            />
                            <v-radio
                                label="Spitzenstunde Fuß (Durchschnitt)"
                                value="Spitzenstunde Fuß"
                            />
                        </v-col>
                    </v-row>
                </v-radio-group>
            </v-row>
            <v-divider></v-divider>
            <panel-header
                font-size="0.875rem"
                font-weight="bold"
                padding="10px 0 0 0"
                header-text="Zeitintervall"
            ></panel-header>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script setup lang="ts">
import PanelHeader from "@/components/common/PanelHeader.vue";
import { computed, onMounted, ref, Ref, watch } from "vue";
import MessstelleOptionsmenuService from "@/api/service/MessstelleOptionsmenuService";
import NichtPlausibleTageDTO from "@/types/NichtPlausibleTageDTO";
import { useStore } from "@/api/util/useStore";
import MessungOptionsDTO from "@/types/messung/MessstelleOptionsDTO";
import { useDateUtils } from "@/util/DateUtils";
import Wochentag, { wochentagText } from "@/types/enum/Wochentag";
import ChosenTagesTypValidDTO from "@/types/messung/ChosenTagesTypValidDTO";

interface Props {
    messstelleId: string;
    chosenOptions: MessungOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:chosen-options"]);
const store = useStore();
const dateUtils = useDateUtils();
const chosenWochentag = ref("");
const isChosenTagesTypValid = ref(false);

onMounted(() => {
    MessstelleOptionsmenuService.getNichtPlausibleTage(props.messstelleId).then(
        (nichtPlausibleTageDTO: NichtPlausibleTageDTO) =>
            (nichtPlausibleTage.value =
                nichtPlausibleTageDTO.nichtPlausibleTage)
    );
    MessstelleOptionsmenuService.isTagesTypValid(
        "test",
        "test",
        Wochentag.SAMSTAG
    );
});

const getSortedDateRange = computed(() => {
    return dateUtils.sortDatesDescAsStrings(
        chosenOptionsCopyZeitraum.value.slice()
    );
});

const nichtPlausibleTage: Ref<string[]> = ref([]);

const chosenOptionsCopy = computed({
    get: () => props.chosenOptions,
    set: (payload: MessungOptionsDTO) => emit("update:chosen-options", payload),
});

const chosenOptionsCopyZeitraum = computed(() => {
    return chosenOptionsCopy.value.zeitraum;
});

function getWochentagText(key: string): string | undefined {
    return wochentagText.get(key);
}

const getChosenDateAsText = computed(() => {
    if (chosenOptionsCopyZeitraum.value.length == 1) {
        return "ausgewähltes Datum";
    } else if (chosenOptionsCopyZeitraum.value.length == 2) {
        return "ausgewählter Zeitraum";
    } else {
        return "";
    }
});

const isAnwender = computed(() => {
    return (
        store.getters["user/hasAuthorities"] && store.getters["user/isAnwender"]
    );
});

const getFormattedSelectedZeit = computed(() => {
    const zeitraum = chosenOptionsCopyZeitraum.value.slice(0);
    if (zeitraum.length == 1) {
        return dateUtils.formatDate(chosenOptionsCopyZeitraum.value[0]);
    } else if (zeitraum.length == 2) {
        const sortedDates = dateUtils.sortDatesDescAsStrings(zeitraum);
        return `${dateUtils.formatDate(
            sortedDates[1]
        )} - ${dateUtils.formatDate(sortedDates[0])}`;
    } else {
        return "";
    }
});
function allowedDatesRangeDatePicker(val: string) {
    const today = new Date();
    return new Date(val) < today;
}

function RULE_EINGABE_TAG_ODER_ZEITRAUM_HAT_PLAUSIBLE_MESSUNG() {
    if (
        chosenOptionsCopyZeitraum.value.length == 1 &&
        nichtPlausibleTage.value.includes(chosenOptionsCopyZeitraum.value[0])
    ) {
        return "Tag hat keine Plausible Messung";
    }
    if (chosenOptionsCopyZeitraum.value.length == 2) {
        const filter = getAllDatesBetweenTwoDates();

        const tageAsDates: number[] = nichtPlausibleTage.value.map(
            (dateAsString: string) => new Date(dateAsString).valueOf()
        );
        if (filter.every((day) => tageAsDates.includes(day.valueOf()))) {
            return "Kein Plausibler Tag im Zeitraum";
        }
        const zeitraum = chosenOptionsCopyZeitraum.value.slice();
        const sortedDates = dateUtils.sortDatesDescAsStrings(zeitraum);
        const timeDifferenceInMilliseconds =
            new Date(sortedDates[0]).valueOf() -
            new Date(sortedDates[1]).valueOf();
        const timeDifferenceInYears =
            timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
        if (
            store.getters["user/hasAuthorities"] &&
            store.getters["user/isAnwender"] &&
            timeDifferenceInYears > 5
        ) {
            return "Der Ausgewählte Zeitraum ist zu groß";
        }
    }
    return true;
}

function getAllDatesBetweenTwoDates(): Date[] {
    const zeitraum = chosenOptionsCopyZeitraum.value.slice();
    const sortedDates = dateUtils.sortDatesDescAsStrings(zeitraum);
    const datesArray = [];
    const startDate = new Date(sortedDates[1]);
    const endDate = new Date(sortedDates[0]);
    for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
    ) {
        datesArray.push(new Date(date));
    }
    return datesArray;
}

function checkIfDateIsAlreadySelected(val: string[]) {
    if (val.length == 2 && val[0] == val[1]) {
        chosenOptionsCopyZeitraum.value.splice(0, 1);
    }
}

const helperText = computed(() => {
    if (isChosenTagesTypValid) {
        switch (chosenWochentag.value) {
            case Wochentag.WERKTAG_DI_MI_DO:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Di,Mi,Do) mit plausiblen Daten nötig.";
            case Wochentag.WERKTAG_MO_FR:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 5 Tage (Mo,Di,Mi,Do,Fr) mit plausiblen Daten nötig.";
            case Wochentag.SAMSTAG:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Sa) mit plausiblen Daten nötig.";
            case Wochentag.SONNTAG_FEIERTAG:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (So/Feiertag) mit plausiblen Daten nötig.";
            case Wochentag.WERKTAG_FERIEN:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Mo,Di,Mi,Do,Fr Ferien) mit plausiblen Daten nötig.";
            case Wochentag.DTV:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Beliebige Wochentage) mit plausiblen Daten nötig.";
        }
    }
    return "";
});

watch([chosenWochentag, chosenOptionsCopyZeitraum], () => {
    if (
        getSortedDateRange.value[0] &&
        getSortedDateRange.value[1] &&
        chosenWochentag.value
    ) {
        MessstelleOptionsmenuService.isTagesTypValid(
            getSortedDateRange.value[1],
            getSortedDateRange.value[0],
            chosenWochentag.value
        ).then((chosenTagesTypValidDto: ChosenTagesTypValidDTO) => {
            isChosenTagesTypValid.value = chosenTagesTypValidDto.isValid;
        });
    }
});
</script>

<style>
.full-width {
    width: 100%;
}
</style>