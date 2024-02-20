<template>
    <v-row no-gutters>
        <v-radio-group
            v-model="chosenOptionsCopy.zeitauswahl"
            style="width: 100%"
        >
            <v-row
                no-gutters
                style="width: 100%"
            >
                <v-col cols="4">
                    <v-radio
                        label="Tageswert (Durchschnitt)"
                        value="Tageswert"
                    />
                    <v-radio
                        label="Block (Durchschnitt)"
                        value="Block"
                        :disabled="isDateBiggerFiveYears"
                    />
                    <v-radio
                        label="Stunde (Durchschnitt)"
                        value="Stunde"
                        :disabled="isDateBiggerFiveYears"
                    />
                </v-col>
                <v-col cols="4">
                    <v-radio
                        label="Spitzenstunde Kfz (Durchschnitt)"
                        value="Spitzenstunde KFZ"
                        :disabled="isTypeDisabled('KFZ')"
                    />
                    <v-radio
                        label="Spitzenstunde Rad (Durchschnitt)"
                        value="Spitzenstunde Rad"
                        :disabled="isTypeDisabled('RAD')"
                    />
                    <v-radio
                        label="Spitzenstunde Fuß (Durchschnitt)"
                        value="Spitzenstunde Fuß"
                        :disabled="isTypeDisabled('FUSS')"
                    />
                </v-col>
                <v-col>
                    {{ helperText }}
                </v-col>
            </v-row>
        </v-radio-group>
    </v-row>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { useDateUtils } from "@/util/DateUtils";

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
</script>