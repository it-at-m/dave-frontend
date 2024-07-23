<template>
    <v-sheet
        class="dave-default"
    >
        <v-row no-gutters>
            <v-col cols="3">
                <v-sheet
                    :min-height="leftHeightVh"
                    :max-height="leftHeightVh"
                    width="100%"
                    color="grey-lighten-3"
                    class="d-flex flex-column"
                >
                    <!-- Basisinformation zur Messstelle -->
                    <MessstelleHeaderInfo
                        :mst-id="messstelle.mstId"
                        :stadtbezirk-nummer="messstelle.stadtbezirkNummer"
                        :stadtbezirk="messstelle.stadtbezirk"
                        :standort="messstelle.standort"
                        :name="messstelle.name"
                        :height="headerHeightVh"
                        :minheight="headerHeightVh"
                    />
                    <MessstelleInfo :messstelle="messstelle" />
                    <FilterOptionen
                        class="px-0"
                        :messstelle="messstelle"
                    />
                    <ValidWochentage v-if="chosenOptions.zeitraum.length > 1" />
                    <MessquerschnittAnzahlInfo :messstelle="messstelle" />
                    <MessquerschnittInfo :messstelle="messstelle" />
                </v-sheet>
            </v-col>
            <v-col cols="9">
                <zaehlstelle-map
                    :z-id="messstelleId"
                    :latlng="latlng"
                    :zoom="17"
                    :height="headerHeightVh"
                    :minheight="headerHeightVh"
                    width="100%"
                />
                <messstelle-diagramme
                    :height="rightHeightVh"
                    :content-height="rightContentHeightVh"
                />
            </v-col>
        </v-row>
    </v-sheet>
</template>
<script setup lang="ts">
import ZaehlstelleMap from "@/components/map/ZaehlstelleMap.vue";
import {computed, onMounted, ref} from "vue";
import MessstelleService from "@/api/service/MessstelleService";
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import {useRoute} from "vue-router";
import MessstelleHeaderInfo from "@/components/messstelle/MessstelleHeaderInfo.vue";
import MessstelleInfo from "@/components/messstelle/MessstelleInfo.vue";
import MessquerschnittInfo from "@/components/messstelle/MessquerschnittInfo.vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import {ApiError} from "@/api/error";
import MessquerschnittAnzahlInfo from "@/components/messstelle/MessquerschnittAnzahlInfo.vue";
import FilterOptionen from "@/components/messstelle/optionsmenue/FilterOptionen.vue";
import MessstelleDiagramme from "@/components/messstelle/charts/MessstelleDiagramme.vue";
import ValidWochentage from "@/components/messstelle/ValidWochentage.vue";
import {useSnackbarStore} from "@/store/snackbar";
import {useMessstelleStore} from "@/store/messstelle";
import {useDisplay} from "vuetify";

const messstelle = ref<MessstelleInfoDTO>(
    DefaultObjectCreator.createDefaultMessstelleInfoDTO()
);
const display = useDisplay();
const messstelleStore = useMessstelleStore();
const snackbarStore = useSnackbarStore();
const route = useRoute();

onMounted(() => {
    loadMessstelle();
});

const chosenOptions = computed(() => {
    return messstelleStore.getFilteroptions;
});

const headerHeight = computed(() => {
    return 160 / (display.height.value / 100);
});
const headerHeightVh = computed(() => {
    return headerHeight.value + "vh";
});

const leftHeightVh = computed(() => {
    return 100 - appBarHeight.value + "vh";
});

const appBarHeight = computed(() => {
    return 65 / (display.height.value / 100);
});

/**
 * Berechnet die Höhe der Inhaltsfläche "vh" - ohne Karte
 */
const rightHeightVh = computed(() => {
    return 100 - headerHeight.value - appBarHeight.value + "vh";
});

/**
 * Berechnet die Höhe der Fläche unter den Tabs (72px hoch) in "vh"
 */
const rightContentHeightVh = computed(() => {
    const height =
        100 -
        headerHeight.value -
        appBarHeight.value -
        72 / (display.height.value / 100);
    messstelleStore.setBelastungsplanMinSize(height);
    return height + "vh";
});

const messstelleId = computed(() => {
    // TODO als Prop injecten
    const messstelleId = route.params.messstelleId as string;
    if (!messstelleId) {
        return "";
    }
    return messstelleId;
});

const latlng = computed(() => {
  if (messstelle.value.latitude && messstelle.value.longitude) {
    return [messstelle.value.latitude, messstelle.value.longitude];
  }
  return [];
});

function loadMessstelle() {
    MessstelleService.getMessstelleById(messstelleId.value)
        .then((messstelleDTO) => {
            messstelle.value = messstelleDTO;
            messstelleStore.setMessstelleInfo(messstelle.value);
        })
        .catch((error: ApiError) => {
            snackbarStore.showApiError(error);
        });
}
</script>