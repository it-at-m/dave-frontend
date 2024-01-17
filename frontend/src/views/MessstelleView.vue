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
                    <MessstelleInfo
                        v-if="messstelle"
                        :mst-id="messstelle.mstId"
                        :stadtbezirk-nummer="messstelle.stadtbezirkNummer"
                        :stadtbezirk="messstelle.stadtbezirk"
                        :standort="messstelle.standort"
                        :name="messstelle.name"
                        :height="headerHeightVh"
                        :minheight="headerHeightVh"
                    />
                    <MessquerschnittInfo
                        v-if="messstelle"
                        :messstelle="messstelle"
                    />
                    <MessungenTimeline
                        v-if="messstelle"
                        :messstelle="messstelle"
                    />
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
                    :reload="reloadMessstelle"
                    width="100%"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import ZaehlstelleMap from "@/components/map/ZaehlstelleMap.vue";
import { computed, ComputedRef, ref, Ref } from "vue";
import MessstelleService from "@/api/service/MessstelleService";
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
import { useRoute } from "vue-router/composables";
import MessstelleInfo from "@/components/messstelle/MessstelleInfo.vue";
import MessquerschnittInfo from "@/components/messstelle/MessquerschnittInfo.vue";
import { useVuetify } from "@/util/useVuetify";
import MessungenTimeline from "@/components/messstelle/MessungenTimeline.vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { ApiError } from "@/api/error";
import { useStore } from "@/api/util/useStore";

const reloadMessstelle = false;
const messstelle: Ref<MessstelleInfoDTO> = ref(DefaultObjectCreator.create);
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

const messstelleId: ComputedRef<string> = computed(() => {
    const route = useRoute();
    const messstelleId = route.params.messstelleId;
    if (!messstelleId) {
        return "";
    }
    return messstelleId;
});

const latlng: ComputedRef<string[]> = computed(() => {
    if (
        messstelle.value == null ||
        messstelle.value.lng == undefined ||
        messstelle.value.lat == undefined
    ) {
        return [];
    } else {
        return [
            messstelle.value.lat.toString(),
            messstelle.value.lng.toString(),
        ];
    }
});
function loadMessstelle() {
    MessstelleService.getMessstelleById(messstelleId.value)
        .then((messstelleDTO) => (messstelle.value = messstelleDTO))
        .catch((error: ApiError) => {
            store.dispatch("snackbar/showError", error);
        });
}
</script>