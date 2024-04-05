<template>
    <v-sheet
        :min-height="height"
        :max-height="height"
    >
        <v-stepper
            v-model="activeStep"
            vertical
            flat
        >
            <v-stepper-step
                :complete="activeStep > 1"
                :step="1"
                editable
                :rules="[isJahresintervallSelected]"
            >
                Zeitintervalle
                <small> {{ selectedJahresintervallAsSummary }}</small>
            </v-stepper-step>
            <v-stepper-content :step="1">
                <zeitintervall-step-content v-model="auswertungOptions" />
            </v-stepper-content>

            <v-stepper-step
                :complete="activeStep > 2"
                :step="2"
                editable
                :rules="[isOneYearSelected]"
            >
                Jahre
                <small> {{ selectedYearsAsSummary }}</small>
            </v-stepper-step>
            <v-stepper-content :step="2">
                <jahre-step-content v-model="auswertungOptions" />
            </v-stepper-content>

            <v-stepper-step
                :step="3"
                editable
                :rules="[isTagesTypSelected]"
            >
                Wochentag
                <small> {{ selectedTagesTypAsSummary }}</small>
            </v-stepper-step>

            <v-stepper-content :step="3">
                <tages-typ-step-content v-model="auswertungOptions" />
            </v-stepper-content>
        </v-stepper>
    </v-sheet>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ZeitintervallStepContent from "@/components/messstelle/gesamtauswertung/stepper/ZeitintervallStepContent.vue";
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/MessstelleAuswertungOptionsDTO";
import JahreStepContent from "@/components/messstelle/gesamtauswertung/stepper/JahreStepContent.vue";
import TagesTypStepContent from "@/components/messstelle/gesamtauswertung/stepper/TagesTypStepContent.vue";
import { tagesTypText } from "@/types/enum/TagesTyp";

interface Props {
    value: MessstelleAuswertungOptionsDTO;
    activeStep: number;
    height: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "input", v: MessstelleAuswertungOptionsDTO): void;
    (e: "update:activeStep", v: number): void;
}>();

const auswertungOptions = computed({
    get: () => props.value,
    set: (v) => emits("input", v),
});

const activeStep = computed({
    get: () => props.activeStep,
    set: (v) => emits("update:activeStep", v),
});

const selectedYearsAsSummary = computed(() => {
    let summary = auswertungOptions.value.jahre.join(", ");
    if (!isOneYearSelected()) {
        summary = "Es muss mindestens ein Jahr ausgewählt sein.";
    }
    return summary;
});

const selectedJahresintervallAsSummary = computed(() => {
    let summary = auswertungOptions.value.zeitintervalle.join(", ");
    if (!isJahresintervallSelected()) {
        summary = "Es muss mindestens ein Zeitintervall ausgewählt sein.";
    }
    return summary;
});

const selectedTagesTypAsSummary = computed(() => {
    let summary = tagesTypText.get(auswertungOptions.value.tagesTyp) ?? "";
    if (!isTagesTypSelected()) {
        summary = "Es muss ein Wochentag ausgewählt sein.";
    }
    return summary;
});

function isOneYearSelected(): boolean {
    return !(
        auswertungOptions.value.jahre.length === 0 && activeStep.value > 1
    );
}

function isTagesTypSelected(): boolean {
    return !(
        auswertungOptions.value.tagesTyp.length === 0 && activeStep.value > 2
    );
}

function isJahresintervallSelected(): boolean {
    return !(
        auswertungOptions.value.zeitintervalle.length === 0 &&
        activeStep.value > 0
    );
}
</script>
