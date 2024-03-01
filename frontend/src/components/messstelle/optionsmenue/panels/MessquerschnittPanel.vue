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
import ZeitblockStuendlich from "@/types/enum/ZeitblockStuendlich";
import Zeitblock from "@/types/enum/Zeitblock";

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

function updateOptions() {
    chosenOptionsCopy.value.messquerschnitte = [];
    lageValues.value.forEach((value) =>
        chosenOptionsCopy.value.messquerschnitte.push(value.value)
    );
}

const richtungValues: ComputedRef<Array<KeyVal>> = computed(() => {
    let result: Array<KeyVal> = [];
    if (messstelle.value.messquerschnitte.length > 1) {
        result.push({
            text: messstelleUtils.alleRichtungen,
            value: messstelleUtils.alleRichtungen,
        });
    }
    messstelle.value.messquerschnitte.forEach((q: MessquerschnittInfoDTO) => {
        const keyVal: KeyVal = {
            text: messstelleUtils.getDirectionOfMessquerschnitt(q),
            value: q.fahrtrichtung,
        };
        if (!result.includes(keyVal)) {
            result.push(keyVal);
        }
    });
    return result;
});

const lageValues: ComputedRef<Array<KeyVal>> = computed(() => {
    let result: Array<KeyVal> = [];
    if (messstelle.value.messquerschnitte) {
        messstelle.value.messquerschnitte.forEach(
            (q: MessquerschnittInfoDTO) => {
                if (
                    q.fahrtrichtung === direction.value ||
                    direction.value === messstelleUtils.alleRichtungen
                ) {
                    result.push({
                        text: `${q.mqId} - ${q.lageMessquerschnitt}`,
                        value: q.mqId,
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
</script>
