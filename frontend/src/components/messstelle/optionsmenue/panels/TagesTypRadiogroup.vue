<template>
    <v-row no-gutters>
        <v-col cols="8">
            <v-radio-group
                v-model="chosenOptionsCopy.tagesTyp"
                class="full-width"
            >
                <v-radio
                    :value="TagesTyp.WERKTAG_DI_MI_DO"
                    :label="getTagesTypText(TagesTyp.WERKTAG_DI_MI_DO)"
                />
                <v-radio
                    :value="TagesTyp.WERKTAG_MO_FR"
                    :label="getTagesTypText(TagesTyp.WERKTAG_MO_FR)"
                />
                <v-radio
                    :value="TagesTyp.SAMSTAG"
                    :label="getTagesTypText(TagesTyp.SAMSTAG)"
                />
                <v-radio
                    :value="TagesTyp.SONNTAG_FEIERTAG"
                    :label="getTagesTypText(TagesTyp.SONNTAG_FEIERTAG)"
                />
                <v-radio
                    :value="TagesTyp.WERKTAG_FERIEN"
                    :label="getTagesTypText(TagesTyp.WERKTAG_FERIEN)"
                />
                <v-radio
                    :value="TagesTyp.MO_SO"
                    :label="getTagesTypText(TagesTyp.MO_SO)"
                />
            </v-radio-group>
        </v-col>
        <v-col cols="4"> {{ helperText }}</v-col>
    </v-row>
</template>
<script setup lang="ts">
import { computed } from "vue";
import TagesTyp, { tagesTypText } from "@/types/enum/TagesTyp";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
interface Props {
    value: MessstelleOptionsDTO;
    isChosenTagesTypValid: boolean;
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "input", v: MessstelleOptionsDTO): void;
}>();

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emits("input", payload),
});

function getTagesTypText(key: string): string | undefined {
    return tagesTypText.get(key);
}

const helperText = computed(() => {
    if (props.isChosenTagesTypValid) {
        switch (chosenOptionsCopy.value.tagesTyp) {
            case TagesTyp.WERKTAG_DI_MI_DO:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Di,Mi,Do) mit plausiblen Daten nötig.";
            case TagesTyp.WERKTAG_MO_FR:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 5 Tage (Mo,Di,Mi,Do,Fr) mit plausiblen Daten nötig.";
            case TagesTyp.SAMSTAG:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Sa) mit plausiblen Daten nötig.";
            case TagesTyp.SONNTAG_FEIERTAG:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (So/Feiertag) mit plausiblen Daten nötig.";
            case TagesTyp.WERKTAG_FERIEN:
                return "Der  ausgewählte Zeitraum ist zu kurz. Für die Durchschnittswerteberechnung sind mind. 2 Tage (Mo,Di,Mi,Do,Fr Ferien) mit plausiblen Daten nötig.";
            case TagesTyp.MO_SO:
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