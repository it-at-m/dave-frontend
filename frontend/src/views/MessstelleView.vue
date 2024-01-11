<template>
    <v-container
        fluid
        class="pa-0"
    >
        <v-row no-gutters>
            <v-col cols="3">
                <v-sheet
                    :min-height="headerHeightVh"
                    width="100%"
                    color="grey lighten-3"
                    class="d-flex flex-column"
                >
                    <!-- Basisinformation zur Messstelle -->
                    <MessstelleInfo
                        v-if="messstelle"
                        :id="messstelle.mstId"
                        :stadtbezirk-nummer="messstelle.stadtbezirkNummer"
                        :name="messstelle.name"
                        :height="headerHeightVh"
                        :minheight="headerHeightVh"
                    >
                    </MessstelleInfo>
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
import MessstelleDTO from "@/types/MessstelleDTO";
import { useRoute } from "vue-router/composables";
import MessstelleInfo from "@/components/messstelle/MessstelleInfo.vue";
import { useVuetify } from "@/util/useVuetify";
const reloadMessstelle = false;
const messstelle: Ref<null | MessstelleDTO> = ref(null);
const vuetify = useVuetify();
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
    const route = useRoute();
    const messstelleId = route.params.messstelleId;
    let workaround = MessstelleService.getMessstelleById(messstelleId).then((messstelleDto) => messstelle.value = messstelleDto)
}
</script>