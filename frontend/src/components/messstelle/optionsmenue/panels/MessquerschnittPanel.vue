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
                        >
                        </v-select>
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
                    <v-select
                        v-model="chosenOptionsCopy.messquerschnitte"
                        label="Lage"
                        :items="lageValues"
                        :multiple="lageValues.length > 1"
                        :readonly="direction === 'Alle Richtungen'"
                        filled
                        dense
                    >
                    </v-select>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script setup lang="ts">
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed, ComputedRef, Ref, ref } from "vue";
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
const store = useStore();
const messstelleUtils = useMessstelleUtils();

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

const messstelle: ComputedRef<MessstelleInfoDTO> = computed(() => {
    return store.getters["messstelleInfo/getMessstelleInfo"];
});

const direction = computed({
    get: () => store.getters["filteroptionsMessstelle/getDirection"],
    set: (payload: string) =>
        store.commit("filteroptionsMessstelle/setDirection", payload),
});

function updateOptions() {
    console.log("huhu");
    // TODO pre Select LageValues
    let lll: Array<string> = [];
    lageValues.value.forEach((value) => lll.push(value.text));
    console.log(lll);
    chosenOptionsCopy.value.messquerschnitte = lll;
}

const richtungValues: ComputedRef<Array<KeyVal>> = computed(() => {
    let result: Array<KeyVal> = [];
    if (messstelle.value.messquerschnitte.length > 1) {
        result.push({ text: "Alle Richtungen", value: "Alle Richtungen" });
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
                if (q.fahrtrichtung === direction.value) {
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
            "Ein Messquerschnitt beinhaltet die Daten aller Fahrstreifen einer Richtung";
    }
    return text;
});
</script>
