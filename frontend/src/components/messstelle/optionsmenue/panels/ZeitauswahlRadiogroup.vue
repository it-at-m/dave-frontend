<template>
    <div>
        <panel-header
            font-size="0.875rem"
            font-weight="bold"
            padding="10px 0 0 0"
            header-text="Zeitauswahl"
        ></panel-header>
        <v-row no-gutters>
            <v-radio-group
                v-model="chosenOptionsCopy.zeitauswahl"
                style="width: 100%"
                @change="zeitauswahlChanged"
            >
                <v-row
                    no-gutters
                    style="width: 100%"
                >
                    <v-col cols="4">
                        <v-radio
                            label="Tageswert (Durchschnitt)"
                            :value="Zeitauswahl.TAGESWERT"
                        />
                        <v-radio
                            label="Block (Durchschnitt)"
                            :value="Zeitauswahl.BLOCK"
                            :disabled="isDateBiggerFiveYears"
                        />
                        <v-radio
                            label="Stunde (Durchschnitt)"
                            :value="Zeitauswahl.STUNDE"
                            :disabled="isDateBiggerFiveYears"
                        />
                    </v-col>
                    <v-col cols="4">
                        <v-radio
                            label="Spitzenstunde Kfz (Durchschnitt)"
                            :value="Zeitauswahl.SPITZENSTUNDE_KFZ"
                            :disabled="isTypeDisabled('KFZ')"
                        />
                        <v-radio
                            label="Spitzenstunde Rad (Durchschnitt)"
                            :value="Zeitauswahl.SPITZENSTUNDE_RAD"
                            :disabled="isTypeDisabled('RAD')"
                        />
                        <v-radio
                            label="Spitzenstunde Fuß (Durchschnitt)"
                            :value="Zeitauswahl.SPITZENSTUNDE_FUSS"
                            :disabled="isTypeDisabled('FUSS')"
                        />
                    </v-col>
                    <v-col>
                        {{ helperText }}
                    </v-col>
                </v-row>
            </v-radio-group>
        </v-row>
    </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { useDateUtils } from "@/util/DateUtils";
import PanelHeader from "@/components/common/PanelHeader.vue";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock from "@/types/enum/Zeitblock";
import ZeitblockStuendlich from "@/types/enum/ZeitblockStuendlich";

interface Props {
    value: MessstelleOptionsDTO;
    messstelleDetektierteFahrzeugart: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: "input", i: MessstelleOptionsDTO): void;
}>();

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

const dateUtils = useDateUtils();

function isTypeDisabled(type: string): boolean {
    return (
        type != props.messstelleDetektierteFahrzeugart ||
        chosenOptionsCopy.value.messquerschnitte.length != 1
    );
}

const isDateBiggerFiveYears = computed(() => {
    if (chosenOptionsCopy.value.zeitraum.length == 2) {
        const zeitraum = chosenOptionsCopy.value.zeitraum.slice();
        const sortedDates = dateUtils.sortDatesDescAsStrings(zeitraum);
        const timeDifferenceInMilliseconds =
            new Date(sortedDates[0]).valueOf() -
            new Date(sortedDates[1]).valueOf();
        const timeDifferenceInYears =
            timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
        return timeDifferenceInYears > 5;
    }
    return false;
});

const helperText = computed(() => {
    if (chosenOptionsCopy.value.messquerschnitte.length != 1) {
        return "Für die Spitzenstunde muss exakt ein Messquerschnitt ausgewählt sein";
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
</script>