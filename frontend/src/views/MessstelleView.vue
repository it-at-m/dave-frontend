<template>
    <v-container
        fluid
        class="pa-0"
    >
        <v-row no-gutters>
            <v-col cols="3">
                <v-sheet
                    :min-height="leftHeightVh"
                    :max-height="leftHeightVh"
                    width="100%"
                    color="grey lighten-3"
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
                    <MessquerschnittAnzahlInfo :messstelle="messstelle" />
                    <MessquerschnittInfo :messstelle="messstelle" />
                </v-sheet>
            </v-col>
            <v-col cols="9">
                <zaehlstelle-map
                    :z-id="messstelleId"
                    :zoom="17"
                    :latlng="latlng"
                    :height="headerHeightVh"
                    :minheight="headerHeightVh"
                    show-marker="true"
                    :reload="reloadMessstelleMap"
                    width="100%"
                />
                <messstelle-diagramme
                    :height="rightHeightVh"
                    :content-height="rightContentHeightVh"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import ZaehlstelleMap from "@/components/map/ZaehlstelleMap.vue";
import { computed, ComputedRef, onMounted, ref, Ref } from "vue";
import MessstelleService from "@/api/service/MessstelleService";
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
import { useRoute } from "vue-router/composables";
import MessstelleHeaderInfo from "@/components/messstelle/MessstelleHeaderInfo.vue";
import MessstelleInfo from "@/components/messstelle/MessstelleInfo.vue";
import { useVuetify } from "@/util/useVuetify";
import MessquerschnittInfo from "@/components/messstelle/MessquerschnittInfo.vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { ApiError } from "@/api/error";
import { useStore } from "@/api/util/useStore";
import MessquerschnittAnzahlInfo from "@/components/messstelle/MessquerschnittAnzahlInfo.vue";
import MessstelleDiagramme from "@/components/messstelle/charts/MessstelleDiagramme.vue";

const reloadMessstelleMap: Ref<boolean> = ref(false);
const messstelle: Ref<MessstelleInfoDTO> = ref(
    DefaultObjectCreator.createDefaultMessstelleInfoDTO()
);
const vuetify = useVuetify();
const store = useStore();
// eslint-disable-next-line no-undef
onMounted(() => {
    loadMessstelle();
});
const headerHeight: ComputedRef<number> = computed(() => {
    return 160 / (vuetify.breakpoint.height / 100);
});
const headerHeightVh: ComputedRef<string> = computed(() => {
    return headerHeight.value + "vh";
});

const leftHeightVh = computed(() => {
    return 100 - appBarHeight.value + "vh";
});

const appBarHeight = computed(() => {
    return 65 / (vuetify.breakpoint.height / 100);
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
    const h =
        100 -
        headerHeight.value -
        appBarHeight.value -
        72 / (vuetify.breakpoint.height / 100);
    return h + "vh";
});

const messstelleId: ComputedRef<string> = computed(() => {
    const route = useRoute();
    const messstelleId = route.params.messstelleId;
    if (!messstelleId) {
        return "";
    }
    return messstelleId;
});

const latlng: ComputedRef<string[]> = computed(() => {
    return [
        messstelle.value.latitude.toString(),
        messstelle.value.longitude.toString(),
    ];
});
function loadMessstelle() {
    MessstelleService.getMessstelleById(messstelleId.value)
        .then((messstelleDTO) => {
            messstelle.value = messstelleDTO;
            store.dispatch(
                "messstelleInfo/setMessstelleInfo",
                messstelle.value
            );
            reloadMessstelleMap.value = !reloadMessstelleMap.value;
        })
        .catch((error: ApiError) => {
            store.dispatch("snackbar/showError", error);
        });
}
</script>