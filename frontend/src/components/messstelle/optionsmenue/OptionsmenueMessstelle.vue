<template>
    <div>
        <v-btn
            class="ml-6 mt-2"
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
                            <zeit-panel v-model="chosenOptions" />
                            <fahrzeug-panel v-model="chosenOptions" />
                            <messquerschnitt-panel v-model="chosenOptions" />
                            <darstellungsoptionen-panel-messstelle
                                v-model="chosenOptions"
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
import { useStore } from "@/util/useStore";
import FahrzeugPanel from "@/components/messstelle/optionsmenue/panels/FahrzeugPanelMessstelle.vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import _ from "lodash";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import Zeitblock from "@/types/enum/Zeitblock";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import MessquerschnittPanel from "@/components/messstelle/optionsmenue/panels/MessquerschnittPanel.vue";
import { useMessstelleUtils } from "@/util/MessstelleUtils";
import TagesTyp from "@/types/enum/TagesTyp";
import DarstellungsoptionenPanelMessstelle from "@/components/messstelle/optionsmenue/panels/DarstellungsoptionenPanelMessstelle.vue";
import { useSnackbarStore } from "@/store/modules/snackbar";

interface Props {
    messstelleId: string;
}
defineProps<Props>();

const messstelle: Ref<MessstelleInfoDTO> = computed(() => {
    return store.getters["messstelleInfo/getMessstelleInfo"];
});

const vuetify = useVuetify();
const store = useStore();
const snackbarStore = useSnackbarStore();
const messstelleUtils = useMessstelleUtils();
const dialog = ref(false);
const chosenOptions = ref(
    DefaultObjectCreator.createDefaultMessstelleOptions()
);

const getContentSheetHeight = computed(() => {
    if (vuetify.breakpoint.xl) {
        return "650px";
    }
    return "400px";
});

watch(messstelle, () => {
    if (store.getters["filteroptionsMessstelle/isHistory"]) {
        chosenOptions.value =
            store.getters["filteroptionsMessstelle/getFilteroptions"];
        store.commit("filteroptionsMessstelle/reloadFilteroptions");
    } else {
        resetOptions();
    }
});

function setChosenOptions(): void {
    if (areChosenOptionsValid()) {
        saveChosenOptions();
        dialog.value = false;
    }
}

function areChosenOptionsValid(): boolean {
    let result = true;
    if (chosenOptions.value.messquerschnittIds.length === 0) {
        result = false;
        let errortext =
            "Es muss mindestens ein Messquerschnitt ausgewählt sein.";
        if (
            messstelleUtils.isZeitauswahlSpitzenstunde(
                chosenOptions.value.zeitauswahl
            )
        ) {
            errortext = "Es muss genau ein Messquerschnitt ausgewählt sein.";
        }
        snackbarStore.showError(errortext);
    }
    if (
        chosenOptions.value.zeitraum.length === 2 &&
        !chosenOptions.value.tagesTyp
    ) {
        result = false;
        snackbarStore.showError("Es muss ein Wochentag ausgewählt sein.");
    }
    return result;
}

function saveChosenOptions(): void {
    store.commit(
        "filteroptionsMessstelle/setFilteroptions",
        _.cloneDeep(chosenOptions.value)
    );
}

function setDefaultOptionsForMessstelle(): void {
    chosenOptions.value.fahrzeuge =
        DefaultObjectCreator.createDefaultFahrzeugOptions(
            messstelle.value.detektierteVerkehrsarten ===
                DetektierteFahrzeugart.KFZ
        );
    chosenOptions.value.zeitraum = [
        messstelle.value.datumLetztePlausibleMessung,
    ];
    chosenOptions.value.messquerschnittIds = [];
    messstelle.value.messquerschnitte.forEach((q) =>
        chosenOptions.value.messquerschnittIds.push(q.mqId)
    );
    if (messstelle.value.messquerschnitte.length === 1) {
        store.commit(
            "filteroptionsMessstelle/setDirection",
            messstelle.value.messquerschnitte[0].fahrtrichtung
        );
    } else {
        store.commit(
            "filteroptionsMessstelle/setDirection",
            messstelleUtils.alleRichtungen
        );
    }
    chosenOptions.value.zeitauswahl = Zeitauswahl.TAGESWERT;
    chosenOptions.value.intervall = ZaehldatenIntervall.STUNDE_KOMPLETT;
    chosenOptions.value.zeitblock = Zeitblock.ZB_00_24;
    chosenOptions.value.tagesTyp = "" as TagesTyp;
    chosenOptions.value.blackPrintMode = false;
    chosenOptions.value.werteHundertRunden = false;
    chosenOptions.value.blocksumme = true;
    chosenOptions.value.stundensumme = true;
    chosenOptions.value.tagessumme = true;
    chosenOptions.value.spitzenstunde = true;
    saveChosenOptions();
}

function resetOptions(): void {
    setDefaultOptionsForMessstelle();
}
</script>
