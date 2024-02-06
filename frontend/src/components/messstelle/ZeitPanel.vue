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
                        v-model="dateRange"
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
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script setup lang="ts">
import PanelHeader from "@/components/common/PanelHeader.vue";
import { computed, onMounted, ref, Ref, watch } from "vue";
import MessstelleOptionsmenuService from "@/api/service/MessstelleOptionsmenuService";
import NichtPlausibleTageDTO from "@/types/NichtPlausibleTageDTO";
import { useStore } from "@/api/util/useStore";
import MessungOptionsDTO from "@/types/messung/MessungOptionsDTO";

interface Props {
    messstelleId: string;
    chosenOptions: MessungOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:chosen-options"]);
const store = useStore();

onMounted(() => {
    MessstelleOptionsmenuService.getNichtPlausibleTage(props.messstelleId).then(
        (nichtPlausibleTageDTO: NichtPlausibleTageDTO) =>
            (nichtPlausibleTage.value =
                nichtPlausibleTageDTO.nichtPlausibleTage)
    );
});

const dateRange: Ref<string[]> = ref([]);
const nichtPlausibleTage: Ref<string[]> = ref([]);

const chosenOptionsCopy = computed({
    get: () => props.chosenOptions,
    set: (payload: MessungOptionsDTO) => emit("update:chosen-options", payload),
});

watch(dateRange, (newDateRange) => {
    chosenOptionsCopy.value.zeitraum = newDateRange;
});

onMounted(() => {
    dateRange.value = chosenOptionsCopy.value.zeitraum;
});
const getChosenDateAsText = computed(() => {
    if (dateRange.value.length == 1) {
        return "ausgewähltes Datum";
    } else if (dateRange.value.length) {
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

function getDatesDescAsStrings(arrayToSort: string[]): string[] {
    return arrayToSort.sort(function (a, b) {
        return new Date(b).valueOf() - new Date(a).valueOf();
    });
}

const getFormattedSelectedZeit = computed(() => {
    if (dateRange.value.length == 1) {
        return formatDate(dateRange.value[0]);
    } else if (dateRange.value.length == 2) {
        const sortedDates = getDatesDescAsStrings(dateRange.value);
        return `${formatDate(sortedDates[1])} - ${formatDate(sortedDates[0])}`;
    } else {
        return "";
    }
});
function formatDate(date: string): string {
    if (!date) {
        return "";
    }
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
}

function allowedDatesRangeDatePicker(val: string) {
    const today = new Date();
    return new Date(val) < today;
}

function RULE_EINGABE_TAG_ODER_ZEITRAUM_HAT_PLAUSIBLE_MESSUNG() {
    if (
        dateRange.value.length == 1 &&
        nichtPlausibleTage.value.includes(dateRange.value[0])
    ) {
        return "Tag hat keine Plausible Messung";
    }
    if (dateRange.value.length == 2) {
        const filter = getAllDatesBetweenTwoDates();

        const tageAsDates: number[] = nichtPlausibleTage.value.map(
            (dateAsString: string) => new Date(dateAsString).valueOf()
        );
        if (filter.every((day) => tageAsDates.includes(day.valueOf()))) {
            return "Kein Plausibler Tag im Zeitraum";
        }
        const sortedDates = getDatesDescAsStrings(dateRange.value);
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
    const sortedDates = getDatesDescAsStrings(dateRange.value);
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
        dateRange.value.splice(0, 1);
    }
}
</script>