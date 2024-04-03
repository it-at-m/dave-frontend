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
                step="1"
                editable
            >
                Zeitintervalle
            </v-stepper-step>
            <v-stepper-content step="1">
                <zeitintervall-step-content />
            </v-stepper-content>

            <v-stepper-step
                :complete="activeStep > 2"
                step="2"
                editable
            >
                Jahre
            </v-stepper-step>
            <v-stepper-content step="2">
                <v-card
                    color="grey lighten-1"
                    class="mb-12"
                    height="200px"
                ></v-card>
            </v-stepper-content>

            <v-stepper-step
                step="3"
                editable
            >
                Wochentag
            </v-stepper-step>

            <v-stepper-content step="3">
                <v-card
                    color="grey lighten-1"
                    class="mb-12"
                    height="200px"
                ></v-card>
            </v-stepper-content>
        </v-stepper>
    </v-sheet>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ZeitintervallStepContent from "@/components/messstelle/gesamtauswertung/stepper/ZeitintervallStepContent.vue";

interface Props {
    value: number;
    height: string;
}

const props = defineProps<Props>();
const emit = defineEmits<(e: "input", v: number) => void>();

const activeStep = computed({
    get: () => props.value,
    set: (payload: number) => emit("input", payload),
});
</script>
