<template>
    <v-radio-group
        v-model="chosenOptionsCopy.zeitauswahl"
        style="width: 100%"
    >
        <v-row
            no-gutters
            style="width: 100%"
        >
            <v-col cols="6">
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
            <v-col cols="6">
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
        </v-row>
    </v-radio-group>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import MessstelleOptionsDTO from "@/types/messung/MessstelleOptionsDTO";

interface Props {
    isDateBiggerFiveYears: boolean;
    value: MessstelleOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: "input", i: MessstelleOptionsDTO): void;
}>();

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

function isTypeDisabled(type: string): boolean {
    return false;
}
</script>