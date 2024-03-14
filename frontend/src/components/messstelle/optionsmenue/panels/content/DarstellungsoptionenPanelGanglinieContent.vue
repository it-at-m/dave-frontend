<template>
    <v-expansion-panel-content>
        <panel-header
            font-size="0.875rem"
            font-weight="bold"
            padding="10px 0 10px 0"
            header-text="Verkehrsarten"
        ></panel-header>
        <v-row
            align="start"
            justify="center"
            dense
        >
            <v-col cols="4">
                <v-hover v-model="hoverYAchse1">
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
                        type="number"
                        clearable
                        dense
                        @blur="checkRangeYAchse1"
                    >
                    </v-text-field>
                </v-hover>
            </v-col>
            <v-col cols="4">
                <v-hover v-model="hoverYAchse2">
                    <v-text-field
                        v-model="chosenOptionsCopy.ganglinieYAchse2MaxValue"
                        :label="'Y-Achse 2 (%)'"
                        type="number"
                        :rules="[
                            (toCheck) =>
                                rules.onlyNumbersInRange(
                                    toCheck,
                                    MIN_VALUE,
                                    MAX_VALUE_EXCLUDE
                                ),
                        ]"
                        clearable
                        dense
                        @blur="checkRangeYAchse2"
                    >
                    </v-text-field>
                </v-hover>
            </v-col>
            <v-col cols="4">
                <v-card flat>
                    {{ helpTextGanglinie }}
                </v-card>
            </v-col>
        </v-row>
        <v-divider></v-divider>
    </v-expansion-panel-content>
</template>

<script setup lang="ts">
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed, ref } from "vue";
import PanelHeader from "@/components/common/PanelHeader.vue";
import _ from "lodash";
import { useRules } from "@/composables/rules";

interface Props {
    value: MessstelleOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits<(e: "input", v: MessstelleOptionsDTO) => void>();
const rules = useRules();

const hoverYAchse1 = ref(false);
const hoverYAchse2 = ref(false);

const MIN_VALUE = 0;
const MAX_VALUE_EXCLUDE = 101;

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

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
