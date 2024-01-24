<script setup lang="ts">
import PanelHeader from "@/components/common/PanelHeader.vue";
import { computed, onMounted, ref, Ref, watch } from "vue";
import TagesaggregatMessquerschnitt from "@/api/service/TagesaggregatMessquerschnitt";
import NichtPlausibleTageDTO from "@/types/NichtPlausibleTageDTO";
import { c } from "unimport/dist/types-43c63a16";

interface Props {
    dates: string[];
}

onMounted(() => {
    TagesaggregatMessquerschnitt.getNichtPlausibleTage("test").then(
        (t: NichtPlausibleTageDTO) =>
            (nichtPlausibleTage.value = t.nichtPlausibleTage)
    );
});

const dateRange: Ref<string[]> = ref([]);
const props = defineProps<Props>();
const nichtPlausibleTage: Ref<string[]> = ref([]);

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

function RULE_IS_PLAUSIBLER_MESSTAG_IN_RANGE() {
    if (dateRange.value.length == 2) {
        const sortedPickedDates = getDatesDescAsStrings(dateRange.value);
        for (const element of props.dates) {
            if (
                new Date(element).valueOf() >
                    new Date(sortedPickedDates[1]).valueOf() &&
                new Date(element).valueOf() <
                    new Date(sortedPickedDates[0]).valueOf()
            ) {
                return true;
            }
        }
        return "Innerhalb des Intervals befindet sich kein Plausibler Messtag";
    }
    return true;
}

function RULE_TAG_HAT_MESSUNG() {
    filterDates();
    if (
        dateRange.value.length == 1 &&
        nichtPlausibleTage.value.indexOf(dateRange.value[0]) != -1
    ) {
        return "Tag hat keine Messung";
    }
    if (dateRange.value.length == 2) {
        const filter = filterDates();

        const tageAsDates: number[] = nichtPlausibleTage.value.map(
            (str: string) => new Date(str).valueOf()
        );
        if (filter.every((day) => tageAsDates.includes(day.valueOf()))) {
            return "Kein Plausibler Tag im Zeitraum";
        }
    }
    return true;
}

function filterDates(): Date[] {
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

<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <div>
                <v-icon left>mdi-clock-time-four-outline</v-icon>
                Zeitauswahl
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
                        width="100%"
                        no-title
                        :events="nichtPlausibleTage"
                        event-color="red"
                        locale="de-DE"
                        @change="checkIfDateIsAlreadySelected"
                    ></v-date-picker>
                </v-col>
                <v-col cols="4"
                    ><v-text-field
                        label="Ausgewähltes Datum"
                        readonly
                        :value="getFormattedSelectedZeit"
                        :rules="[RULE_TAG_HAT_MESSUNG]"
                    />
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<style scoped>

</style>