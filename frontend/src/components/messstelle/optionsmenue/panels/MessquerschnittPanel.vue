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
                            v-model="chosenOptionsCopy.messquerschnitte"
                            label="Lage"
                            :items="lageValues"
                            :readonly="isLageReadonly"
                            filled
                            dense
                            multiple
                            :rules="[REQUIRED]"
                            @change="updateLage"
                        />
                    </v-hover>
                </v-col>
                <v-spacer />
                <v-col cols="4">
                    <v-card flat>
                        <div v-if="hoverLage">{{ helpTextLageHover }}</div>
                        <div>{{ helpTextLage }}</div>
                    </v-card>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script setup lang="ts">
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed, ComputedRef, Ref, ref, watch } from "vue";
import { useStore } from "@/api/util/useStore";
import PanelHeader from "@/components/common/PanelHeader.vue";
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import MessquerschnittInfoDTO from "@/types/messstelle/MessquerschnittInfoDTO";
import KeyVal from "@/types/KeyVal";
import { useMessstelleUtils } from "@/util/MessstelleUtils";

interface Props {
    value: MessstelleOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits<(e: "input", v: MessstelleOptionsDTO) => void>();

const hoverDirection: Ref<boolean> = ref(false);
const hoverLage: Ref<boolean> = ref(false);
const store = useStore();
const messstelleUtils = useMessstelleUtils();

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

const messstelle: ComputedRef<MessstelleInfoDTO> = computed(() => {
    return store.getters["messstelleInfo/getMessstelleInfo"];
});

const isLageReadonly: ComputedRef<boolean> = computed(() => {
    return (
        direction.value === messstelleUtils.alleRichtungen ||
        lageValues.value.length === 1
    );
});

const direction = computed({
    get: () => store.getters["filteroptionsMessstelle/getDirection"],
    set: (payload: string) =>
        store.commit("filteroptionsMessstelle/setDirection", payload),
});

const richtungValues: ComputedRef<Array<KeyVal>> = computed(() => {
    let result: Array<KeyVal> = [];
    if (
        messstelle.value.messquerschnitte.length > 1 &&
        !isZeitauswahlSpitzenstunde.value
    ) {
        result.push({
            text: messstelleUtils.alleRichtungen,
            value: messstelleUtils.alleRichtungen,
        });
    }
    messstelle.value.messquerschnitte.forEach(
        (querschnitt: MessquerschnittInfoDTO) => {
            const keyVal: KeyVal = {
                text: messstelleUtils.getDirectionOfMessquerschnitt(
                    querschnitt
                ),
                value: querschnitt.fahrtrichtung,
            };
            if (!result.includes(keyVal)) {
                result.push(keyVal);
            }
        }
    );
    return result;
});

const lageValues: ComputedRef<Array<KeyVal>> = computed(() => {
    let result: Array<KeyVal> = [];
    if (messstelle.value.messquerschnitte) {
        messstelle.value.messquerschnitte.forEach(
            (querschnitt: MessquerschnittInfoDTO) => {
                if (
                    querschnitt.fahrtrichtung === direction.value ||
                    direction.value === messstelleUtils.alleRichtungen
                ) {
                    result.push({
                        text: `${querschnitt.mqId} - ${querschnitt.lageMessquerschnitt}`,
                        value: querschnitt.mqId,
                    });
                }
            }
        );
    }
    return result;
});

const helpTextDirection: ComputedRef<string> = computed(() => {
    let text = "";
    if (hoverDirection.value) {
        text =
            "Ein Messquerschnitt beinhaltet die Daten aller Fahrstreifen einer Richtung.";
    }
    return text;
});

const helpTextLage: ComputedRef<string> = computed(() => {
    let text = "";
    if (direction.value === messstelleUtils.alleRichtungen) {
        text =
            "Hinweis: Um einzelne Messquerschnitte auszuwählen, muss zuvor eine Richtung bestimmt werden.";
    }
    return text;
});

const helpTextLageHover: ComputedRef<string> = computed(() => {
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

const previousSelectedStructures: Ref<Array<string>> = ref(
    chosenOptionsCopy.value.messquerschnitte
);

watch(zeitauswahl, () => {
    if (
        isZeitauswahlSpitzenstunde.value &&
        chosenOptionsCopy.value.messquerschnitte.length > 1
    ) {
        chosenOptionsCopy.value.messquerschnitte = [];
    }
    previousSelectedStructures.value = chosenOptionsCopy.value.messquerschnitte;
});

function updateOptions() {
    if (!isZeitauswahlSpitzenstunde.value) {
        chosenOptionsCopy.value.messquerschnitte = [];
        lageValues.value.forEach((value) =>
            chosenOptionsCopy.value.messquerschnitte.push(value.value)
        );
    }
    previousSelectedStructures.value = chosenOptionsCopy.value.messquerschnitte;
}

function updateLage(value: Array<string>) {
    const added = value.filter(
        (val) => !previousSelectedStructures.value.includes(val)
    );
    previousSelectedStructures.value = value;
    if (isZeitauswahlSpitzenstunde.value) {
        chosenOptionsCopy.value.messquerschnitte = added;
        previousSelectedStructures.value =
            chosenOptionsCopy.value.messquerschnitte;
    }
}

function REQUIRED(v: Array<string>) {
    if (v.length > 0) return true;

    let errortext = "Es muss mindestens ein Messquerschnitt ausgewählt sein.";
    if (isZeitauswahlSpitzenstunde.value) {
        errortext = "Es muss genau ein Messquerschnitt ausgewählt sein.";
    }
    return errortext;
}
</script>
