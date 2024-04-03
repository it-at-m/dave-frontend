<template>
    <v-card color="grey lighten-1">
        <v-radio-group
            v-model="auswertungOptions.tagesTyp"
            class="full-width"
        >
            <v-radio
                :value="TagesTyp.WERKTAG_DI_MI_DO"
                :label="getTagesTypText(TagesTyp.WERKTAG_DI_MI_DO)"
            />
            <v-radio
                :value="TagesTyp.WERKTAG_MO_FR"
                :label="getTagesTypText(TagesTyp.WERKTAG_MO_FR)"
            />
            <v-radio
                :value="TagesTyp.SAMSTAG"
                :label="getTagesTypText(TagesTyp.SAMSTAG)"
            />
            <v-radio
                :value="TagesTyp.SONNTAG_FEIERTAG"
                :label="getTagesTypText(TagesTyp.SONNTAG_FEIERTAG)"
            />
            <v-radio
                :value="TagesTyp.WERKTAG_FERIEN"
                :label="getTagesTypText(TagesTyp.WERKTAG_FERIEN)"
            />
            <v-radio
                :value="TagesTyp.MO_SO"
                :label="getTagesTypText(TagesTyp.MO_SO)"
            />
        </v-radio-group>
    </v-card>
</template>

<script setup lang="ts">
import TagesTyp, { tagesTypText } from "@/types/enum/TagesTyp";
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/MessstelleAuswertungOptionsDTO";
import { computed } from "vue";

interface Props {
    value: MessstelleAuswertungOptionsDTO;
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "input", v: MessstelleAuswertungOptionsDTO): void;
}>();

const auswertungOptions = computed({
    get: () => props.value,
    set: (v) => emits("input", v),
});

function getTagesTypText(key: string): string | undefined {
    return tagesTypText.get(key);
}
</script>
