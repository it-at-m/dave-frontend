<template>
    <v-container class="pa-0">
        <v-row dense>
            <v-col cols="4">
                <auswertung-stepper
                    v-model="activeStep"
                    :height="leftHeightVh"
                />
                <v-card-actions>
                    <v-btn
                        class="mr-2"
                        color="primary"
                        @click="activeStep++"
                    >
                        Weiter
                    </v-btn>
                    <v-btn
                        class="mr-2"
                        color="primary"
                        @click="activeStep--"
                    >
                        Zurück
                    </v-btn>
                    <v-btn color="grey lighten-1"> Zurücksetzen </v-btn>
                </v-card-actions>
            </v-col>
            <v-divider vertical />
            <v-col cols="8"> </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { useVuetify } from "@/util/useVuetify";
import AuswertungStepper from "@/components/messstelle/gesamtauswertung/stepper/AuswertungStepper.vue";

const vuetify = useVuetify();

const activeStep: Ref<number> = ref(1);

const appBarHeight = computed(() => {
    return 65 / (vuetify.breakpoint.height / 100);
});

const cardActionsHeight = computed(() => {
    return 60 / (vuetify.breakpoint.height / 100);
});

const leftHeightVh = computed(() => {
    return 100 - appBarHeight.value - cardActionsHeight.value + "vh";
});
</script>