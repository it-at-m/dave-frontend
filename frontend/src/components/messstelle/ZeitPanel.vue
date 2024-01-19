<script setup lang="ts">
import PanelHeader from "@/components/common/PanelHeader.vue";
import { Ref, ref, computed, watch } from "vue";

interface Props {
    dates: string[];
}

const datePickerSettings = ref("one");
const pickeDates: Ref<string[]> = ref([]);
const dateRangeText = ref([]);
const dateSingleText = ref("");
const props = defineProps<Props>();
const singleDate = ref("");
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

function getDatesDescAsStrings(arrayToSort: string[]): string[] {
    return arrayToSort.sort(function (a, b) {
        return new Date(b).valueOf() - new Date(a).valueOf();
    });
}

function formatDate(date: string): string {
    if (!date) {
        return "";
    }
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
}

const dateRangeTextFormatted = computed(() => {
    if (pickeDates.value.length == 2) {
        const sortedDates = getDatesDescAsStrings(pickeDates.value);
        return `${formatDate(sortedDates[1])} - ${formatDate(sortedDates[0])}`;
    } else if (pickeDates.value.length == 1) {
        return `${formatDate(pickeDates.value[0])} -`;
    } else {
        return "";
    }
});

function allowedDatesSingleDatePicker(val: string) {
    const oldestMessung = getOldestPlausiblerMesstag.value;
    const today = new Date();
    return (
        props.dates.indexOf(val) != -1 &&
        new Date(val) >= new Date(oldestMessung) &&
        new Date(val) <= new Date(today) &&
        pickeDates.value.indexOf(val) != 0
    );
}

function allowedDatesRangeDatePicker(val: string) {
    const today = new Date();
    return new Date(val) < today;
}

watch(datePickerSettings, () => {
    if (datePickerSettings.value == "one") {
        pickeDates.value = [];
    } else {
        singleDate.value = "";
    }
});

function RULE_IS_PLAUSIBLER_MESSTAG_IN_RANGE() {
    if (pickeDates.value.length == 2) {
        const sortedPickedDates = getDatesDescAsStrings(pickeDates.value);
        for (let i = 0; i < props.dates.length; i++) {
            if (
                new Date(props.dates[i]).valueOf() >
                    new Date(sortedPickedDates[1]).valueOf() &&
                new Date(props.dates[i]).valueOf() <
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
            <!--<v-row v-if="datePickerSettings == 'one'">
                <v-col
                    cols="12"
                    sm="8"
                >
                    <v-date-picker
                        v-model="singleDate"
                        width="100%"
                        :allowed-dates="allowedDatesSingleDatePicker"
                        locale="de-De"
                    ></v-date-picker>
                </v-col>
                <v-col
                    ><v-text-field
                        :value="formatDate(singleDate)"
                        label="Ausgewählter Messtag"
                    ></v-text-field>
                    <p>
                        Neuerster Plausibler Messtag:
                        <v-btn
                            class="mx-0 px-0"
                            text
                            @click="singleDate = getNewestPlausiblerMesstag"
                            >{{ formatDate(getNewestPlausiblerMesstag) }}</v-btn
                        >
                    </p>
                    <p>
                        Ältester Plausibler Messtag:
                        <v-btn
                            class="mx-0 px-0"
                            text
                            @click="singleDate = getOldestPlausiblerMesstag"
                            >{{ formatDate(getOldestPlausiblerMesstag) }}</v-btn
                        >
                    </p>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col
                    cols="12"
                    sm="8"
                >
                    <v-date-picker
                        v-model="pickeDates"
                        :allowed-dates="allowedDatesRangeDatePicker"
                        range
                        :events="dates"
                        width="100%"
                        locale="de-De"
                    ></v-date-picker>
                </v-col>
                <v-col
                    ><v-text-field
                        :value="dateRangeTextFormatted"
                        label="Ausgewähltes Zeitintervall"
                        :rules="[RULE_IS_PLAUSIBLER_MESSTAG_IN_RANGE]"
                    ></v-text-field>
                    <p>
                        Neuerster Plausibler Messtag:
                        {{ formatDate(getNewestPlausiblerMesstag) }}
                    </p>
                    <p>
                        Ältester Plausibler Messtag:
                        {{ formatDate(getOldestPlausiblerMesstag) }}
                    </p>
                    <p>Maximale Größe des Auswahlzeitraum: 5 Jahre</p>
                </v-col>
            </v-row>-->
            <v-row
                ><v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="singleDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template #activator="{ on, attrs }">
                        <v-text-field
                            :value="singleDate"
                            label="Picker in menu"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="singleDate"
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
                            @click="$refs.menu.save(singleDate)"
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