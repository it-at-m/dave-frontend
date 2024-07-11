<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <div>
                <v-icon left>mdi-arrow-decision</v-icon>
                Messquerschnitt
            </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <panel-header
                font-size="0.875rem"
                font-weight="bold"
                padding="10px 0 0 0"
                header-text="Vorhandene Messquerschnitte (Richtungen)"
            ></panel-header>
            <v-row no-gutters>
                <v-col cols="4">
                    <v-hover v-model="hoverDirection">
                        <v-select
                            v-model="direction"
                            label="Richtung"
                            :items="richtungValues"
                            item-value="value"
                            filled
                            dense
                            @input="updateOptions"
                        />
                    </v-hover>
                </v-col>
                <v-spacer />
                <v-col cols="4">
                    <v-card flat>
                        {{ helpTextDirection }}
                    </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="4">
                    <v-hover v-model="hoverLage">
                        <v-select
                            v-model="chosenOptionsCopy.messquerschnittIds"
                            label="Lage"
                            :items="lageValues"
                            :readonly="isLageReadonly"
                            filled
                            dense
                            multiple
                            :rules="[REQUIRED]"
                            @change="updateLage"
                            @blur="resetSpitzenstundeErrorText"
                        />
                    </v-hover>
                </v-col>
                <v-spacer />
                <v-col cols="4">
                    <v-card flat>
                        <div v-if="hoverLage">{{ helpTextLageHover }}</div>
                        <div v-if="spitzenstundeErrorText.length > 0">
                            {{ spitzenstundeErrorText }}
                        </div>
                        <div>{{ helpTextLage }}</div>
                    </v-card>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed, ref, watch } from "vue";
import PanelHeader from "@/components/common/PanelHeader.vue";
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import type MessquerschnittInfoDTO from "@/types/messstelle/MessquerschnittInfoDTO";
import type KeyVal from "@/types/common/KeyVal";
import { useMessstelleUtils } from "@/util/MessstelleUtils";
import { himmelsRichtungenTextLong } from "@/types/enum/Himmelsrichtungen";
import _ from "lodash";
import { useMessstelleStore } from "@/store/messstelle";

interface Props {
    value: MessstelleOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits<(e: "input", v: MessstelleOptionsDTO) => void>();

const hoverDirection = ref(false);
const hoverLage = ref(false);
const spitzenstundeErrorText = ref("");
const messstelleStore = useMessstelleStore();
const messstelleUtils = useMessstelleUtils();

const MIND_EIN_MESSQUERSCHNITT =
    "Es muss mindestens ein Messquerschnitt ausgewählt sein.";
const GENAU_EIN_MESSQUERSCHNITT =
    "Es muss genau ein Messquerschnitt ausgewählt sein.";

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

const messstelle = computed<MessstelleInfoDTO>(() => {
    return messstelleStore.getMessstelleInfo;
});

const isLageReadonly = computed(() => {
    return (
        direction.value === messstelleUtils.alleRichtungen ||
        lageValues.value.length === 1
    );
});

const direction = computed({
    get: () => messstelleStore.getDirection,
    set: (payload: string) => messstelleStore.setDirection(payload),
});

const richtungValues  = computed<Array<KeyVal>>(() => {
    let result: Array<KeyVal> = [];
    if (
        messstelle.value.messquerschnitte.length > 1 &&
        !isZeitauswahlSpitzenstunde.value
    ) {
        result.push({
            title: messstelleUtils.alleRichtungen,
            value: messstelleUtils.alleRichtungen,
        });
    }
    messstelle.value.messquerschnitte.forEach(
        (querschnitt: MessquerschnittInfoDTO) => {
            let himmelsrichtungAsText = himmelsRichtungenTextLong.get(
                querschnitt.fahrtrichtung
            );
            if (himmelsrichtungAsText === undefined) {
                himmelsrichtungAsText =
                    "Fehler bei der Bestimmung der Himmelsrichtung.";
            }
            const keyVal: KeyVal = {
                title: himmelsrichtungAsText,
                value: querschnitt.fahrtrichtung,
            };
            if (!result.includes(keyVal)) {
                result.push(keyVal);
            }
        }
    );
    return result;
});

const lageValues  = computed<Array<KeyVal>>(() => {
    let result: Array<KeyVal> = [];
    if (messstelle.value.messquerschnitte) {
        messstelle.value.messquerschnitte.forEach(
            (querschnitt: MessquerschnittInfoDTO) => {
                if (
                    querschnitt.fahrtrichtung === direction.value ||
                    direction.value === messstelleUtils.alleRichtungen
                ) {
                    result.push({
                        title: `${querschnitt.mqId} - ${querschnitt.standort}`,
                        value: querschnitt.mqId,
                    });
                }
            }
        );
    }
    return result;
});

const helpTextDirection = computed(() => {
    let text = "";
    if (hoverDirection.value) {
        text =
            "Ein Messquerschnitt beinhaltet die Daten aller Fahrstreifen einer Richtung.";
    }
    return text;
});

const helpTextLage = computed(() => {
    let text = "";
    if (direction.value === messstelleUtils.alleRichtungen) {
        text =
            "Hinweis: Um einzelne Messquerschnitte auszuwählen, muss zuvor eine Richtung bestimmt werden.";
    } else if (
        isZeitauswahlSpitzenstunde.value &&
        chosenOptionsCopy.value.messquerschnittIds.length !== 1
    ) {
        text = GENAU_EIN_MESSQUERSCHNITT;
    } else if (chosenOptionsCopy.value.messquerschnittIds.length === 0) {
        text = MIND_EIN_MESSQUERSCHNITT;
    }
    return text;
});

const helpTextLageHover = computed(() => {
    let text = "";
    if (
        direction.value !== messstelleUtils.alleRichtungen &&
        lageValues.value.length === 1
    ) {
        text = "Für die gewählte Richtung liegt nur ein Messquerschnitt vor.";
    }
    return text;
});

const isZeitauswahlSpitzenstunde = computed(() => {
    return messstelleUtils.isZeitauswahlSpitzenstunde(
        chosenOptionsCopy.value.zeitauswahl
    );
});
const zeitauswahl = computed(() => {
    return chosenOptionsCopy.value.zeitauswahl;
});

const previousSelectedStructures = ref<Array<string>>(
    chosenOptionsCopy.value.messquerschnittIds
);

watch(zeitauswahl, () => {
    if (
        isZeitauswahlSpitzenstunde.value &&
        chosenOptionsCopy.value.messquerschnittIds.length > 1
    ) {
        chosenOptionsCopy.value.messquerschnittIds = [];
    }
    previousSelectedStructures.value =
        chosenOptionsCopy.value.messquerschnittIds;
});

function updateOptions() {
    chosenOptionsCopy.value.messquerschnittIds = [];
    if (isZeitauswahlSpitzenstunde.value) {
        const firstLageValue = lageValues.value.at(0);
        if (firstLageValue) {
            chosenOptionsCopy.value.messquerschnittIds.push(
                firstLageValue.value
            );
        }
    } else {
        lageValues.value.forEach((value) =>
            chosenOptionsCopy.value.messquerschnittIds.push(value.value)
        );
    }
    previousSelectedStructures.value = _.cloneDeep(
        chosenOptionsCopy.value.messquerschnittIds
    );
    resetSpitzenstundeErrorText();
}

function updateLage(lageValue: Array<string>) {
    resetSpitzenstundeErrorText();
    if (isZeitauswahlSpitzenstunde.value) {
        if (chosenOptionsCopy.value.messquerschnittIds.length === 2) {
            spitzenstundeErrorText.value =
                "Zur Berechnung der Spitzenstunde muss genau ein Messquerschnitt ausgewählt sein.";
        }
        chosenOptionsCopy.value.messquerschnittIds = lageValue.filter(
            (val) => !previousSelectedStructures.value.includes(val)
        );
        previousSelectedStructures.value = _.cloneDeep(
            chosenOptionsCopy.value.messquerschnittIds
        );
    } else {
        previousSelectedStructures.value = lageValue;
    }
}

function REQUIRED(v: Array<string>) {
    if (v.length > 0) return true;
    let errortext = MIND_EIN_MESSQUERSCHNITT;
    if (isZeitauswahlSpitzenstunde.value) {
        errortext = GENAU_EIN_MESSQUERSCHNITT;
    }
    return errortext;
}
function resetSpitzenstundeErrorText(): void {
    spitzenstundeErrorText.value = "";
}
</script>
