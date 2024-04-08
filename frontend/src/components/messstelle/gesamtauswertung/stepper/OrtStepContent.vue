<template>
    <div>
        <v-autocomplete
            v-model="auswertungOptions.mstIds"
            :items="messstellen"
            class="mt-4"
            outlined
            dense
            chips
            small-chips
            label="Messstellen"
            multiple
            clearable
            deletable-chips
            :disabled="disableMessstelle"
            persistent-hint
            :hint="messstelleHint"
            @input="setDefaultDirection"
        >
            <template #append-item>
                <v-btn
                    v-if="showSelectAllButton"
                    width="100%"
                    text
                    @click="selectAllMessstellen"
                    >Alle auswählen</v-btn
                >
                <v-btn
                    v-else
                    width="100%"
                    text
                    @click="deselectAllMessstellen"
                    >Alle abwählen</v-btn
                >
            </template>
        </v-autocomplete>

        <div v-if="auswertungOptions.mstIds.length === 1">
            <v-autocomplete
                v-model="direction"
                label="Richtung"
                :items="richtungValues"
                filled
                dense
                :readonly="richtungValues.length === 1"
                persistent-hint
                :hint="directionHint"
                @input="preassignMqIdsInOptions"
            />

            <v-autocomplete
                v-model="auswertungOptions.mqIds"
                label="Lage"
                :items="lageValues"
                :readonly="isLageReadonly"
                filled
                dense
                multiple
                :rules="[REQUIRED]"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref, Ref, watch } from "vue";
import KeyVal from "@/types/KeyVal";
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/MessstelleAuswertungOptionsDTO";
import MessstelleAuswertungService from "@/api/service/MessstelleAuswertungService";
import MessstelleAuswertungDTO from "@/types/messstelle/auswertung/MessstelleAuswertungDTO";
import { himmelsRichtungenTextLong } from "@/types/enum/Himmelsrichtungen";
import { useMessstelleUtils } from "@/util/MessstelleUtils";
import MessquerschnittAuswertungDTO from "@/types/messstelle/auswertung/MessquerschnittAuswertungDTO";

interface Props {
    value: MessstelleAuswertungOptionsDTO;
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "input", v: MessstelleAuswertungOptionsDTO): void;
}>();

const messstelleUtils = useMessstelleUtils();

loadAllVisibleMessstellen();

const allVisibleMessstellen: Ref<Array<MessstelleAuswertungDTO>> = ref([]);
const direction: Ref<string> = ref("");

const auswertungOptions = computed({
    get: () => props.value,
    set: (v) => emits("input", v),
});

watch(direction, () => {
    if (direction.value == null) {
        setDefaultDirection();
    }
});

const messstellen: ComputedRef<Array<KeyVal>> = computed(() => {
    const result: Array<KeyVal> = [];
    allVisibleMessstellen.value.forEach((mst) => {
        result.push({
            text: `${mst.mstId}-${mst.standort ?? ""} (${
                mst.detektierteVerkehrsarten ?? ""
            })`,
            value: mst.mstId,
        });
    });
    return result;
});

const richtungValues: ComputedRef<Array<KeyVal>> = computed(() => {
    let result: Array<KeyVal> = [];
    if (auswertungOptions.value.mstIds.length === 1) {
        for (let messstelle of allVisibleMessstellen.value) {
            if (messstelle.mstId === auswertungOptions.value.mstIds[0]) {
                if (messstelle.messquerschnitte.length > 1) {
                    result.push({
                        text: messstelleUtils.alleRichtungen,
                        value: messstelleUtils.alleRichtungen,
                    });
                }
                messstelle.messquerschnitte.forEach(
                    (querschnitt: MessquerschnittAuswertungDTO) => {
                        const keyVal: KeyVal = {
                            text:
                                himmelsRichtungenTextLong.get(
                                    querschnitt.fahrtrichtung
                                ) ??
                                "Fehler bei der Bestimmung der Himmelsrichtung.",
                            value: querschnitt.fahrtrichtung,
                        };
                        if (!result.includes(keyVal)) {
                            result.push(keyVal);
                        }
                    }
                );
                break;
            }
        }
    }
    return result;
});

const lageValues: ComputedRef<Array<KeyVal>> = computed(() => {
    let result: Array<KeyVal> = [];
    if (auswertungOptions.value.mstIds.length === 1) {
        for (let messstelle of allVisibleMessstellen.value) {
            if (messstelle.mstId === auswertungOptions.value.mstIds[0]) {
                messstelle.messquerschnitte.forEach(
                    (querschnitt: MessquerschnittAuswertungDTO) => {
                        if (
                            querschnitt.fahrtrichtung === direction.value ||
                            direction.value === messstelleUtils.alleRichtungen
                        ) {
                            result.push({
                                text: `${querschnitt.mqId} - ${querschnitt.standort}`,
                                value: querschnitt.mqId,
                            });
                        }
                    }
                );
                break;
            }
        }
    }
    return result;
});

const isLageReadonly: ComputedRef<boolean> = computed(() => {
    return (
        direction.value === messstelleUtils.alleRichtungen ||
        lageValues.value.length === 1
    );
});

const showSelectAllButton: ComputedRef<boolean> = computed(() => {
    return (
        auswertungOptions.value.mstIds.length <=
        allVisibleMessstellen.value.length / 2
    );
});

const directionHint: ComputedRef<string> = computed(() => {
    let hint = "";
    if (auswertungOptions.value.mstIds.length > 1) {
        hint =
            "Wenn mehrere Messstellen ausgewählt wurden, kann kein Messquerschnitt ausgewählt werden.";
    }
    return hint;
});

const messstelleHint: ComputedRef<string> = computed(() => {
    let hint = "";
    if (auswertungOptions.value.mstIds.length > 1) {
        hint =
            "Wenn mehrere Messstellen ausgewählt wurden, kann kein Messquerschnitt ausgewählt werden.";
    } else if (disableMessstelle.value) {
        hint =
            "Wenn ein Messquerschnitt ausgewählt wurde, kann die Messstelle nicht mehr geändert werden.";
    }
    return hint;
});

const disableMessstelle: ComputedRef<boolean> = computed(() => {
    return (
        auswertungOptions.value.mqIds.length !== 0 &&
        direction.value !== messstelleUtils.alleRichtungen &&
        auswertungOptions.value.mqIds.length > 0 &&
        richtungValues.value.length > 1
    );
});

function loadAllVisibleMessstellen(): void {
    MessstelleAuswertungService.getAllVisibleMessstellen().then(
        (messstellen: Array<MessstelleAuswertungDTO>) => {
            allVisibleMessstellen.value = messstellen;
        }
    );
}

function setDefaultDirection(): void {
    resetMqsIfNecessary();
    if (auswertungOptions.value.mstIds.length === 1) {
        for (let messstelle of allVisibleMessstellen.value) {
            if (messstelle.mstId === auswertungOptions.value.mstIds[0]) {
                if (messstelle.messquerschnitte.length === 1) {
                    direction.value =
                        messstelle.messquerschnitte[0].fahrtrichtung;
                } else if (messstelle.messquerschnitte.length > 1) {
                    direction.value = messstelleUtils.alleRichtungen;
                }
            }
        }
        preassignMqIdsInOptions();
    }
}

function preassignMqIdsInOptions() {
    auswertungOptions.value.mqIds = [];
    lageValues.value.forEach((value) =>
        auswertungOptions.value.mqIds.push(value.value)
    );
}

function selectAllMessstellen() {
    auswertungOptions.value.mstIds = [];
    allVisibleMessstellen.value.forEach((mst: MessstelleAuswertungDTO) => {
        auswertungOptions.value.mstIds.push(mst.mstId);
    });
}

function deselectAllMessstellen() {
    auswertungOptions.value.mstIds = [];
}

function resetMqsIfNecessary() {
    if (auswertungOptions.value.mstIds.length > 1)
        auswertungOptions.value.mqIds = [];
}

function REQUIRED(v: Array<string>) {
    if (v.length > 0) return true;
    return "Es muss mindestens ein Messquerschnitt ausgewählt sein.";
}
</script>
