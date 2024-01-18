<script setup lang="ts">
import PanelHeader from "@/components/common/PanelHeader.vue";
import { ref } from "vue";

interface Props {
    dates: string[];
}

const datePickerSettings = ref("one");
const pickeDates = ref("");
const dateRangeText = ref("");
const props = defineProps<Props>();

function getOldestPlausiblerMesstag(): string {
    let sortedArrayOfDates = props.dates;
    sortedArrayOfDates.sort(function (a, b) {
        return new Date(b).valueOf() - new Date(a).valueOf();
    });
    return sortedArrayOfDates[sortedArrayOfDates.length - 1];
}

function formatDate(date: string): string {
    if (!date) {
        return "";
    }
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
}

function allowedDates(val) {
    const oldestMessung = getOldestPlausiblerMesstag();
    const today = new Date();
    return (
        props.dates.indexOf(val) != -1 &&
        new Date(val) > new Date(oldestMessung) &&
        new Date(val) < new Date(today)
    );
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
            <v-radio-group v-model="datePickerSettings">
                <v-radio
                    label="Einzeldatum"
                    value="one"
                />
                <v-radio
                    label="Zeitraum"
                    value="two"
                />
            </v-radio-group>
            <v-row>
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-date-picker
                        v-model="pickeDates"
                        :allowed-dates="allowedDates"
                        range
                    ></v-date-picker>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field
                        :value="formatDate(pickeDates)"
                        label="Date range"
                        prepend-icon="mdi-calendar"
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<style scoped>

</style>