<template>
    <v-row no-gutters>
        <v-col cols="6">
            <v-radio-group
                v-model="modelChosenWochentag.wochentag"
                class="full-width"
            >
                <v-radio
                    :value="Wochentag.WERKTAG_DI_MI_DO"
                    :label="getWochentagText(Wochentag.WERKTAG_DI_MI_DO)"
                />
                <v-radio
                    :value="Wochentag.WERKTAG_MO_FR"
                    :label="getWochentagText(Wochentag.WERKTAG_MO_FR)"
                />
                <v-radio
                    :value="Wochentag.SAMSTAG"
                    :label="getWochentagText(Wochentag.SAMSTAG)"
                />
                <v-radio
                    :value="Wochentag.SONNTAG_FEIERTAG"
                    :label="getWochentagText(Wochentag.SONNTAG_FEIERTAG)"
                />
                <v-radio
                    :value="Wochentag.WERKTAG_FERIEN"
                    :label="getWochentagText(Wochentag.WERKTAG_FERIEN)"
                />
                <v-radio
                    :value="Wochentag.DTV"
                    :label="getWochentagText(Wochentag.DTV)"
                />
            </v-radio-group>
        </v-col>
        <v-col cols="6"> {{ helperText }}</v-col>
    </v-row>
</template>
<script setup lang="ts">
import { computed } from "vue";
import Wochentag, { wochentagText } from "@/types/enum/Wochentag";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
interface Props {
    value: MessstelleOptionsDTO;
    isChosenTagesTypValid: boolean;
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "input", v: MessstelleOptionsDTO): void;
}>();

const modelChosenWochentag = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emits("input", payload),
});

function getWochentagText(key: string): string | undefined {
    return wochentagText.get(key);
}

const helperText = computed(() => {
    if (props.isChosenTagesTypValid) {
        switch (modelChosenWochentag.value.wochentag) {
            case Wochentag.WERKTAG_DI_MI_DO:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Di,Mi,Do) mit plausiblen Daten nötig.";
            case Wochentag.WERKTAG_MO_FR:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 5 Tage (Mo,Di,Mi,Do,Fr) mit plausiblen Daten nötig.";
            case Wochentag.SAMSTAG:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Sa) mit plausiblen Daten nötig.";
            case Wochentag.SONNTAG_FEIERTAG:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (So/Feiertag) mit plausiblen Daten nötig.";
            case Wochentag.WERKTAG_FERIEN:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Mo,Di,Mi,Do,Fr Ferien) mit plausiblen Daten nötig.";
            case Wochentag.DTV:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Beliebige Wochentage) mit plausiblen Daten nötig.";
        }
    }
    return "";
});
</script>
<style>
.full-width {
    width: 100%;
}
</style>