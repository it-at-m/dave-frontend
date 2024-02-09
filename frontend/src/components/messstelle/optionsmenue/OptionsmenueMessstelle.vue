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
                            <fahrzeug-panel
                                :chosen-options.sync="chosenOptions"
                            />
                        </v-expansion-panels>
                    </v-sheet>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        @click="setChosenOptions"
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
import ZeitPanel from "@/components/messstelle/optionsmenue/panels/ZeitPanel.vue";
import { useVuetify } from "@/util/useVuetify";
import MessstelleOptionsDTO from "@/types/messung/MessstelleOptionsDTO";
import { useStore } from "@/api/util/useStore";
import FahrzeugPanel from "@/components/messstelle/optionsmenue/panels/FahrzeugPanel.vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import _ from "lodash";

interface Props {
    messstelleId: string;
}
defineProps<Props>();
const filterOptionsMessstelle: Ref<MessstelleOptionsDTO> = computed(() => {
    return store.getters["filteroptionsMessstelle/getFilteroptions"];
});

const messstelle: Ref<MessstelleInfoDTO> = computed(() => {
    return store.getters["messstelleInfo/getMessstelleInfo"];
});

const vuetify = useVuetify();
const store = useStore();
const dialog = ref(false);
const chosenOptions = ref({} as MessstelleOptionsDTO);

const getContentSheetHeight = computed(() => {
    if (vuetify.breakpoint.xl) {
        return "650px";
    }
    return "400px";
});

watch(messstelle, () => {
    resetOptions();
});

function setChosenOptions(): void {
    saveChosenOptions();
    dialog.value = false;
}

function saveChosenOptions(): void {
    store.commit(
        "filteroptionsMessstelle/setFilteroptions",
        _.cloneDeep(chosenOptions.value)
    );
}

function setDefaultOptionsForMessstelle(): void {
    chosenOptions.value = _.cloneDeep(filterOptionsMessstelle.value);
    chosenOptions.value.fahrzeuge =
        DefaultObjectCreator.createDefaultFahrzeugOptions(
            messstelle.value.messquerschnitte[0].detektierteVerkehrsarten ===
                DetektierteFahrzeugart.KFZ
        );
    chosenOptions.value.zeitraum = [
        messstelle.value.datumLetztePlausibleMessung,
    ];
    saveChosenOptions();
}

function resetOptions(): void {
    store.dispatch("filteroptionsMessstelle/resetFilteroptions");
    setDefaultOptionsForMessstelle();
}
</script>
