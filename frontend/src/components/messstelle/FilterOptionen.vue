<template>
    <v-sheet
        width="100%"
        min-height="50"
        color="grey darken-1"
        class="px-4 py-3"
    >
        <v-col cols="1"></v-col>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col>
                <h3 class="grey--text text--lighten-1">
                    Aktuelle Filtereinstellungen
                </h3>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col
                cols="1"
                align-self="start"
            >
                <v-icon
                    small
                    color="grey lighten-1"
                    >mdi-clock-time-four-outline</v-icon
                >
            </v-col>
            <v-col cols="10">
                <span class="grey--text text--lighten-1"
                    >Zeit:
                    <span class="font-weight-medium white--text"
                        >{{ zeitText }}
                    </span>
                </span>
            </v-col>
        </v-row>
        <v-row
            v-for="(messquerschnitt, index) in messstelle.messquerschnitte"
            :key="index"
            no-gutters
            class="ma-0"
        >
            <v-col cols="1">
                <v-icon
                    v-if="index === 0"
                    small
                    color="grey lighten-1"
                    >mdi-arrow-decision</v-icon
                >
            </v-col>
            <v-col cols="6">
                <span class="text-caption grey--text text--lighten-1"
                    >{{ messquerschnitt.mqId }}
                    {{ messquerschnitt.lageMessquerschnitt }}</span
                >
            </v-col>
            <v-col cols="4">
                <span class="text-caption grey--text text--lighten-1"
                    >[ {{ messquerschnitt.fahrtrichtung }} ]</span
                >
            </v-col>
        </v-row>
        <OptionsmenueMessstelle messstelle-id="messstelleId" />
    </v-sheet>
</template>
<script setup lang="ts">
import { useStore } from "@/api/util/useStore";
import MessungOptionsDTO from "@/types/messung/MessungOptionsDTO";
import { computed, Ref } from "vue";
import OptionsmenueMessstelle from "@/components/messstelle/OptionsmenueMessstelle.vue";
import { formatDate, sortDatesDescAsStrings } from "@/util/DateUtils";
import Optionsmenue from "@/components/zaehlstelle/optionsmenue/Optionsmenue.vue";
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";

const store = useStore();
interface Props {
    messstelle: MessstelleInfoDTO;
}

const props = defineProps<Props>();

const filterOptionsMessstelle: Ref<MessungOptionsDTO> = computed(() => {
    return store.getters["filteroptionsMessstelle/getFilteroptions"];
});

const zeitraumText = computed(() => {
    const zeitraum = filterOptionsMessstelle.value.zeitraum;
    if (zeitraum != null) {
        if (zeitraum.length == 1) {
            return `am ${formatDate(zeitraum[0])}`;
        } else if (zeitraum.length == 2) {
            const sortedDates = sortDatesDescAsStrings(zeitraum);
            return `im zeitraum ${formatDate(sortedDates[1])} - ${formatDate(
                sortedDates[0]
            )}`;
        }
    }
    return "";
});

const zeitText = computed(() => {
    return `Tageswert in 15 min ${zeitraumText.value}`;
});
</script>

<style scoped>

</style>