<template>
    <v-expansion-panel-text>
        <panel-header
            font-size="0.875rem"
            font-weight="bold"
            padding="10px 0 10px 0"
            header-text="Ganglinie"
        ></panel-header>
        <v-row
            align="start"
            justify="center"
            dense
        >
            <v-col cols="4">
                    <v-text-field
                        v-model="chosenOptionsCopy.ganglinieYAchse1MaxValue"
                        :label="'Y-Achse 1'"
                        :rules="[
                            (toCheck) =>
                                rules.onlyPositivNumbersBiggerThan(
                                    toCheck,
                                    MIN_VALUE
                                ),
                        ]"
                        clearable
                        density="compact"
                        @mouseover="hoverYAchse1 = true"
                        @mouseleave="hoverYAchse1 = false"
                        @blur="checkRangeYAchse1"
                    />
            </v-col>
            <v-col cols="4">
                    <v-text-field
                        v-model="chosenOptionsCopy.ganglinieYAchse2MaxValue"
                        :label="'Y-Achse 2 (%)'"
                        :rules="[
                            (toCheck) =>
                                rules.onlyNumbersInRange(
                                    toCheck,
                                    MIN_VALUE,
                                    MAX_VALUE_EXCLUDE
                                ),
                        ]"
                        clearable
                        density="compact"
                        @mouseover="hoverYAchse2 = true"
                        @mouseleave="hoverYAchse2 = false"
                        @blur="checkRangeYAchse2"
                    />
            </v-col>
            <v-col cols="4">
                <v-card flat>
                    {{ helpTextGanglinie }}
                </v-card>
            </v-col>
        </v-row>
        <v-divider></v-divider>
    </v-expansion-panel-text>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed, ref } from "vue";
import PanelHeader from "@/components/common/PanelHeader.vue";
import _ from "lodash";
import { useRules } from "@/util/rules";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });
const rules = useRules();

const hoverYAchse1 = ref(false);
const hoverYAchse2 = ref(false);

const MIN_VALUE = 0;
const MAX_VALUE_EXCLUDE = 101;

const helpTextGanglinie = computed(() => {
    if (hoverYAchse1.value) {
        return "Der Wert wird zurückgesetzt, wenn die Zahl < 0 ist.";
    }
    if (hoverYAchse2.value) {
        return "Der Wert wird zurückgesetzt, wenn die Zahl < 0 oder > 100 ist.";
    }
    return "";
});

function checkRangeYAchse2() {
    if (chosenOptionsCopy.value.ganglinieYAchse2MaxValue) {
        if (
            !_.inRange(
                chosenOptionsCopy.value.ganglinieYAchse2MaxValue,
                MIN_VALUE,
                MAX_VALUE_EXCLUDE
            )
        ) {
            chosenOptionsCopy.value.ganglinieYAchse2MaxValue = null;
        }
    }
}

function checkRangeYAchse1() {
    if (
        chosenOptionsCopy.value.ganglinieYAchse1MaxValue &&
        chosenOptionsCopy.value.ganglinieYAchse1MaxValue < MIN_VALUE
    ) {
        chosenOptionsCopy.value.ganglinieYAchse1MaxValue = null;
    }
}
</script>
