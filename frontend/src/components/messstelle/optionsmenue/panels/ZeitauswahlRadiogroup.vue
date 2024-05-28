<template>
    <div>
        <panel-header
            font-size="0.875rem"
            font-weight="bold"
            padding="10px 0 0 0"
            header-text="Zeitauswahl"
        ></panel-header>
        <v-row
            align="start"
            justify="center"
            dense
            no-gutters
        >
            <v-col cols="8">
                <v-radio-group
                    v-model="chosenOptionsCopy.zeitauswahl"
                    style="width: 100%"
                    @change="zeitauswahlChanged"
                >
                    <v-row
                        align="start"
                        justify="center"
                        dense
                    >
                        <v-col cols="6">
                            <v-radio
                                :label="`Tageswert${durchschnitt}`"
                                :value="Zeitauswahl.TAGESWERT"
                            />
                            <v-radio
                                :label="`Block${durchschnitt}`"
                                :value="Zeitauswahl.BLOCK"
                                :disabled="isDateBiggerFiveYears"
                            />
                            <v-radio
                                :label="`Stunde${durchschnitt}`"
                                :value="Zeitauswahl.STUNDE"
                                :disabled="isDateBiggerFiveYears"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-radio
                                :label="`Spitzenstunde Kfz${durchschnitt}`"
                                :value="Zeitauswahl.SPITZENSTUNDE_KFZ"
                                :disabled="
                                    isTypeDisabled('KFZ') ||
                                    isDateBiggerFiveYears
                                "
                            />
                            <v-radio
                                :label="`Spitzenstunde Rad${durchschnitt}`"
                                :value="Zeitauswahl.SPITZENSTUNDE_RAD"
                                :disabled="
                                    isTypeDisabled('RAD') ||
                                    isDateBiggerFiveYears
                                "
                            />
                            <v-radio
                                :label="`Spitzenstunde Fuß${durchschnitt}`"
                                :value="Zeitauswahl.SPITZENSTUNDE_FUSS"
                                :disabled="
                                    isTypeDisabled('FUSS') ||
                                    isDateBiggerFiveYears
                                "
                            />
                        </v-col>
                    </v-row>
                </v-radio-group>
            </v-col>
            <v-col cols="4">
                <v-row
                    align="start"
                    justify="center"
                    dense
                >
                    {{ helperText }}
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts" setup>
import { computed, watch } from "vue";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import PanelHeader from "@/components/common/PanelHeader.vue";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock from "@/types/enum/Zeitblock";
import ZeitblockStuendlich from "@/types/enum/ZeitblockStuendlich";
import { useStore } from "@/api/util/useStore";
import { Levels } from "@/api/error";
import { useOptionsmenuUtils } from "@/util/OptionsmenuUtils";

interface Props {
    value: MessstelleOptionsDTO;
    messstelleDetektierteFahrzeugart: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: "input", i: MessstelleOptionsDTO): void;
}>();

const store = useStore();

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

const { isDateBiggerFiveYears } = useOptionsmenuUtils(chosenOptionsCopy.value);

const durchschnitt = computed(() => {
    if (chosenOptionsCopy.value.zeitraum.length === 2) {
        return " (Durchschnitt)";
    }
    return "";
});

function isTypeDisabled(type: string): boolean {
    return (
        type != props.messstelleDetektierteFahrzeugart ||
        chosenOptionsCopy.value.messquerschnittIds.length != 1
    );
}

const helperText = computed(() => {
    if (chosenOptionsCopy.value.messquerschnittIds.length != 1) {
        return "Spitzenstunde kann nur für einen einzelnen Messquerschnitt ausgegeben werden";
    }
    return "";
});

function zeitauswahlChanged() {
    if (chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.TAGESWERT) {
        chosenOptionsCopy.value.zeitblock = Zeitblock.ZB_00_24;
    } else if (chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.BLOCK) {
        chosenOptionsCopy.value.zeitblock = Zeitblock.ZB_00_06;
    } else if (chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.STUNDE) {
        chosenOptionsCopy.value.zeitblock = ZeitblockStuendlich.ZB_00_01;
    } else if (
        chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ ||
        chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
        chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
    ) {
        chosenOptionsCopy.value.zeitblock = Zeitblock.ZB_00_06;
    }
}

watch(
    () => chosenOptionsCopy.value.zeitraum,
    () => {
        if (
            isDateBiggerFiveYears.value &&
            chosenOptionsCopy.value.zeitauswahl != Zeitauswahl.TAGESWERT
        ) {
            chosenOptionsCopy.value.zeitauswahl = Zeitauswahl.TAGESWERT;
            store.dispatch("snackbar/showToast", {
                snackbarTextPart1: "Zeitauswahl wurde auf Tageswert gesetzt",
                level: Levels.INFO,
            });
        }
    }
);
</script>