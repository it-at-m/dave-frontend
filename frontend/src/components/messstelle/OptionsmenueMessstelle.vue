<template>
    <div>
        <v-btn
            color="secondary"
            @click="dialog = true"
        >
            <v-icon left>mdi-filter-outline</v-icon>
            <span class="hidden-lg-and-down"
                >Filtereinstellungen bearbeiten</span
            >
            <span class="hidden-xl-only">Filtereinstellungen</span>
        </v-btn>
        <v-dialog
            v-model="dialog"
            max-width="900px"
            ><v-card
                width="900px"
                flat
            >
                <v-card-title>
                    <v-icon left>mdi-filter-outline</v-icon>
                    Filtereinstellungen
                </v-card-title>
                <v-card-text>
                    <v-sheet
                        class="overflow-y-auto"
                        :max-height="getContentSheetHeight"
                        width="100%"
                    >
                        <v-expansion-panels
                            hover
                            focusable
                        >
                            <zeit-panel
                                :messstelle-id="messstelleId"
                                :chosen-options.sync="chosenOptions"
                            />
                        </v-expansion-panels>
                    </v-sheet>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        @click="saveChosenOptions"
                        >Aktualisiere Daten
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey lighten-1"
                        @click="resetOptions"
                        >Zurücksetzen
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, Ref, watch } from "vue";
import ZeitPanel from "@/components/messstelle/ZeitPanel.vue";
import { useVuetify } from "@/util/useVuetify";
import MessungOptionsDTO from "@/types/messung/MessungOptionsDTO";
import { useStore } from "@/api/util/useStore";

interface Props {
    messstelleId: string;
}
defineProps<Props>();
const filterOptionsMessstelle: Ref<MessungOptionsDTO> = computed(() => {
    return store.getters["filteroptionsMessstelle/getFilteroptions"];
});
const vuetify = useVuetify();
const store = useStore();
const dialog = ref(false);
const chosenOptions = ref({
    zeitraum: filterOptionsMessstelle.value.zeitraum,
} as MessungOptionsDTO);

const getContentSheetHeight = computed(() => {
    if (vuetify.breakpoint.xl) {
        return "650px";
    }
    return "400px";
});

watch(filterOptionsMessstelle, (changedFilterOptionsMessstelle) => {
    const options = {} as MessungOptionsDTO;
    Object.assign(options, changedFilterOptionsMessstelle);
    chosenOptions.value = options;
});

function saveChosenOptions(): void {
    store.commit(
        "filteroptionsMessstelle/setFilteroptions",
        Object.assign({}, chosenOptions.value)
    );
    dialog.value = false;
}

function resetOptions(): void {
    store.dispatch("filteroptionsMessstelle/resetFilteroptions");
}
</script>
