<script setup lang="ts">
import PanelHeader from "@/components/common/PanelHeader.vue";
import { computed, onMounted, ref, Ref, watch } from "vue";

interface Props {
    dates: string[];
}

const datePickerSettings = ref("one");
const dateRange: Ref<string[]> = ref([]);
const dateRangeFromDatePicker: Ref<string[]> = ref([]);
const props = defineProps<Props>();
const singleDate = ref("");
const singleDateFromDatePicker = ref("");
const menu = ref(false);

const getOldestPlausiblerMesstag = computed(() => {
    let sortedArrayOfDates = props.dates;
    sortedArrayOfDates.sort(function (a, b) {
        return new Date(b).valueOf() - new Date(a).valueOf();
    });
    return sortedArrayOfDates[sortedArrayOfDates.length - 1];
});

const getNewestPlausiblerMesstag = computed(() => {
    let sortedArrayOfDates = props.dates;
    sortedArrayOfDates.sort(function (a, b) {
        return new Date(b).valueOf() - new Date(a).valueOf();
    });
    return sortedArrayOfDates[0];
});

onMounted(() => {
    singleDate.value = getNewestPlausiblerMesstag.value;
    singleDateFromDatePicker.value = getNewestPlausiblerMesstag.value;
});

function getDatesDescAsStrings(arrayToSort: string[]): string[] {
    return arrayToSort.sort(function (a, b) {
        return new Date(b).valueOf() - new Date(a).valueOf();
    });
}

const getFormattedSelectedZeit = computed(() => {
    if (datePickerSettings.value == "one" && singleDate.value.length > 0) {
        return formatDate(singleDate.value);
    } else if (
        datePickerSettings.value == "two" &&
        dateRange.value.length == 2
    ) {
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

function saveDateRange() {
    if (dateRangeFromDatePicker.value.length == 2) {
        dateRange.value = dateRangeFromDatePicker.value;
    }
    menu.value = false;
}

function saveSingleDate() {
    singleDate.value = singleDateFromDatePicker.value;
    menu.value = false;
}

function allowedDatesSingleDatePicker(val: string) {
    const oldestMessung = getOldestPlausiblerMesstag.value;
    const today = new Date();
    return (
        props.dates.indexOf(val) != -1 &&
        new Date(val) >= new Date(oldestMessung) &&
        new Date(val) <= new Date(today) &&
        dateRange.value.indexOf(val) != 0
    );
}

function allowedDatesRangeDatePicker(val: string) {
    const today = new Date();
    return new Date(val) < today;
}

watch(datePickerSettings, () => {
    if (datePickerSettings.value == "one") {
        dateRange.value = [];
    } else {
        singleDate.value = getNewestPlausiblerMesstag.value;
        singleDateFromDatePicker.value = getNewestPlausiblerMesstag.value;
    }
});

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
            <v-radio-group
                v-model="datePickerSettings"
                row
            >
                <v-radio
                    label="Einzeldatum"
                    value="one"
                />
                <v-radio
                    label="Zeitraum"
                    value="two"
                />
            </v-radio-group>
            <v-row
                ><v-menu
                    ref="menuRef"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template #activator="{ on }">
                        <v-text-field
                            :value="getFormattedSelectedZeit"
                            label="Zeitintervall auswählen"
                            prepend-icon="mdi-calendar"
                            readonly
                            :rules="[RULE_IS_PLAUSIBLER_MESSTAG_IN_RANGE]"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-if="datePickerSettings == 'one'"
                        v-model="singleDateFromDatePicker"
                        no-title
                        :allowed-dates="allowedDatesSingleDatePicker"
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="saveSingleDate"
                        >
                            OK
                        </v-btn>
                    </v-date-picker>
                    <v-date-picker
                        v-else
                        v-model="dateRangeFromDatePicker"
                        :allowed-dates="allowedDatesRangeDatePicker"
                        range
                        :events="dates"
                        no-title
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="saveDateRange"
                        >
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu></v-row
            >
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<style scoped>

</style>