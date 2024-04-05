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
            :disabled="
                auswertungOptions.mqIds.length !== 0 &&
                direction !== messstelleUtils.alleRichtungen
            "
            :persistent-hint="
                auswertungOptions.mqIds.length !== 0 &&
                direction !== messstelleUtils.alleRichtungen
            "
            hint="Wenn ein Messquerschnitt ausgewählt wurde, kann die Messstelle nicht mehr geändert werden."
            @input="direction = messstelleUtils.alleRichtungen"
        >
            <template #append-item>
                <v-btn
                    v-if="showSelectAllButton"
                    width="100%"
                    text
                    @click="selectAll"
                    >Alle auswählen</v-btn
                >
                <v-btn
                    v-else
                    width="100%"
                    text
                    @click="deselectAll"
                    >Alle abwählen</v-btn
                >
            </template>
        </v-autocomplete>

        <v-autocomplete
            v-if="auswertungOptions.mstIds.length === 1"
            v-model="direction"
            label="Richtung"
            :items="richtungValues"
            filled
            dense
            clearable
            :persistent-hint="auswertungOptions.mstIds.length > 1"
            hint="Wenn mehrere Messstellen ausgewählt wurden, kann kein Messquerschnitt ausgewählt werden."
            @input="updateOptions"
        />

        <v-select
            v-if="auswertungOptions.mstIds.length === 1"
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
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref, Ref } from "vue";
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

const messstellen: ComputedRef<Array<KeyVal>> = computed(() => {
    const result: Array<KeyVal> = [];
    allVisibleMessstellen.value.forEach((mst) => {
        result.push({
            text: `${mst.mstId}-${mst.standort ?? ""}`,
            value: mst.mstId,
        });
    });
    return result;
});

const richtungValues: ComputedRef<Array<KeyVal>> = computed(() => {
    let result: Array<KeyVal> = [];
    if (auswertungOptions.value.mstIds.length > 0) {
        allVisibleMessstellen.value.forEach((messstelle) => {
            if (messstelle.mstId === auswertungOptions.value.mstIds[0]) {
                if (messstelle.messquerschnitte.length > 1) {
                    result.push({
                        text: messstelleUtils.alleRichtungen,
                        value: messstelleUtils.alleRichtungen,
                    });
                }
                messstelle.messquerschnitte.forEach(
                    (querschnitt: MessquerschnittAuswertungDTO) => {
                        let himmelsrichtungAsText =
                            himmelsRichtungenTextLong.get(
                                querschnitt.fahrtrichtung
                            );
                        if (himmelsrichtungAsText === undefined) {
                            himmelsrichtungAsText =
                                "Fehler bei der Bestimmung der Himmelsrichtung.";
                        }
                        const keyVal: KeyVal = {
                            text: himmelsrichtungAsText,
                            value: querschnitt.fahrtrichtung,
                        };
                        if (!result.includes(keyVal)) {
                            result.push(keyVal);
                        }
                    }
                );
            }
        });
    }
    return result;
});

const lageValues: ComputedRef<Array<KeyVal>> = computed(() => {
    let result: Array<KeyVal> = [];
    if (auswertungOptions.value.mstIds.length > 0) {
        allVisibleMessstellen.value.forEach((messstelle) => {
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
            }
        });
    }
    return result;
});

function loadAllVisibleMessstellen(): void {
    MessstelleAuswertungService.getAllVisibleMessstellen().then(
        (messstellen: Array<MessstelleAuswertungDTO>) => {
            allVisibleMessstellen.value = messstellen;
        }
    );
}

const messquerschnitte: ComputedRef<Array<KeyVal>> = computed(() => {
    const result: Array<KeyVal> = [];
    for (let index = 2006; index < new Date().getFullYear(); index++) {
        result.push({
            text: `${index}`,
            value: `${index}`,
        });
    }
    return result;
});

function REQUIRED(v: Array<string>) {
    if (v.length > 0) return true;
    return "Es muss mindestens ein Messquerschnitt ausgewählt sein.";
}

const isLageReadonly: ComputedRef<boolean> = computed(() => {
    return (
        direction.value === messstelleUtils.alleRichtungen ||
        lageValues.value.length === 1
    );
});

function updateOptions() {
    auswertungOptions.value.mqIds = [];
    lageValues.value.forEach((value) =>
        auswertungOptions.value.mqIds.push(value.value)
    );
}

function selectAll() {
    auswertungOptions.value.mstIds = [];
    allVisibleMessstellen.value.forEach((mst) => {
        auswertungOptions.value.mstIds.push(mst.mstId);
    });
}

function deselectAll() {
    auswertungOptions.value.mstIds = [];
}

const showSelectAllButton: ComputedRef<boolean> = computed(() => {
    return (
        auswertungOptions.value.mstIds.length <=
        allVisibleMessstellen.value.length / 2
    );
});
</script>
