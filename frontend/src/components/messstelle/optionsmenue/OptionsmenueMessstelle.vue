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
import { useStore } from "@/api/util/useStore";
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
import { Levels } from "@/api/error";

interface Props {
    messstelleId: string;
}
defineProps<Props>();

const messstelle: Ref<MessstelleInfoDTO> = computed(() => {
    return store.getters["messstelleInfo/getMessstelleInfo"];
});

const vuetify = useVuetify();
const store = useStore();
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
    resetOptions();
});

function setChosenOptions(): void {
    if (chosenOptions.value.messquerschnitte.length > 0) {
        saveChosenOptions();
        dialog.value = false;
    } else {
        let errortext =
            "Es muss mindestens ein Messquerschnitt ausgewählt sein.";
        if (
            messstelleUtils.isZeitauswahlSpitzenstunde(
                chosenOptions.value.zeitauswahl
            )
        ) {
            errortext = "Es muss genau ein Messquerschnitt ausgewählt sein.";
        }
        store.dispatch("snackbar/showToast", {
            snackbarTextPart1: errortext,
            level: Levels.ERROR,
        });
    }
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
    chosenOptions.value.messquerschnitte = [];
    messstelle.value.messquerschnitte.forEach((q) =>
        chosenOptions.value.messquerschnitte.push(q.mqId)
    );
    if (messstelle.value.messquerschnitte.length === 1) {
        store.commit(
            "filteroptionsMessstelle/setDirection",
            messstelleUtils.getDirectionOfMessquerschnitt(
                messstelle.value.messquerschnitte[0]
            )
        );
    } else {
        store.commit(
            "filteroptionsMessstelle/setDirection",
            messstelleUtils.alleRichtungen
        );
    }
    chosenOptions.value.intervall = ZaehldatenIntervall.STUNDE_KOMPLETT;
    chosenOptions.value.zeitblock = Zeitblock.ZB_06_10;
    chosenOptions.value.zeitauswahl = Zeitauswahl.TAGESWERT;
    chosenOptions.value.tagesTyp = "";
    saveChosenOptions();
}

function resetOptions(): void {
    setDefaultOptionsForMessstelle();
}
</script>
