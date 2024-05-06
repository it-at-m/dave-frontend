<template>
    <v-hover v-model="hover">
        <v-row
            no-gutters
            style="background-color: #ef9a9a"
        >
            <!-- red lighten-3 -->
            <v-col
                v-if="sonderzaehlung"
                cols="12"
                md="1"
                align-self="center"
                :class="isLarge ? '' : 'px-1'"
            >
                <sonderzaehlung-icon :large="isLarge" />
            </v-col>
            <v-col
                cols="12"
                :md="getMaxCols"
            >
                <v-sheet
                    width="100%"
                    :color="hover ? hoverColor : color"
                    outlined
                    class="px-4 py-2"
                    @click="openZaehlung"
                >
                    <span class="text-body-2"
                        >{{ $d(date, "short", "de-DE") }} |
                        {{ projektName }}</span
                    ><br />
                    <zaehlart-icon
                        dense
                        :zaehlart="zaehlart"
                        :color="iconColor"
                    ></zaehlart-icon>
                    <wetter-icon
                        dense
                        :wetter="wetter"
                        :color="iconColor"
                    ></wetter-icon>
                    <zaehldauer-icon
                        dense
                        :zaehldauer="zaehldauer"
                        :color="iconColor"
                    ></zaehldauer-icon>
                    <quelle-icon
                        dense
                        :quelle="quelle"
                        :color="iconColor"
                    ></quelle-icon>
                </v-sheet>
            </v-col>
        </v-row>
    </v-hover>
</template>
<script setup lang="ts">
// Komponenten
import WetterIcon from "@/components/zaehlstelle/icons/WetterIcon.vue";
import QuelleIcon from "@/components/zaehlstelle/icons/QuelleIcon.vue";
import ZaehldauerIcon from "@/components/zaehlstelle/icons/ZaehldauerIcon.vue";
import ZaehlartIcon from "@/components/zaehlstelle/icons/ZaehlartIcon.vue";
import SonderzaehlungIcon from "@/components/zaehlstelle/icons/SonderzaehlungIcon.vue";
import { computed, ref } from "vue";
import { useStore } from "@/api/util/useStore";
import { useVuetify } from "@/util/useVuetify";

interface Props {
    id: string;
    datum: string;
    projektName: string;
    zaehlart: string;
    wetter: string;
    zaehldauer: string;
    quelle: string;
    sonderzaehlung: boolean;
    color: string;
    hoverColor: string;
    iconColor: string;
}

const props = defineProps<Props>();

const store = useStore();
const vuetify = useVuetify();

const hover = ref(false);

const date = computed(() => {
    if (props.datum && Date.parse(props.datum)) {
        return new Date(props.datum);
    }
    return new Date();
});

const getMaxCols = computed(() => {
    return props.sonderzaehlung ? 11 : 12;
});

const isLarge = computed(() => {
    return vuetify.breakpoint.name === "xl";
});

/**
 * Die Zählung wird über den store auf aktiv gesetzt.
 */
function openZaehlung(): void {
    store.dispatch("setZaehlungAlsAktiv", props.id);
}
</script>