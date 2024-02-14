<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <div>
                <v-icon left>mdi-car-multiple</v-icon>
                Fahrzeuge
            </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-1">
            <panel-header
                font-size="0.875rem"
                font-weight="bold"
                padding="10px 0 0 0"
                header-text="Verkehrsarten"
            ></panel-header>
            <panel-header
                font-size="small"
                font-weight="normal"
                header-text="Im Belastungsplan können maximal 3 Werte gleichzeitig angezeigt werden"
            ></panel-header>
            <v-row
                align="start"
                justify="center"
                dense
            >
                <v-col cols="8">
                    <v-row
                        align="start"
                        justify="center"
                        dense
                    >
                        <v-col cols="6">
                            <v-hover v-model="hoverKfz">
                                <v-checkbox
                                    v-model="
                                        chosenOptionsCopy.fahrzeuge
                                            .kraftfahrzeugverkehr
                                    "
                                    :label="'Kraftfahrzeugverkehr (KFZ)'"
                                    :prepend-icon="getIcon('KFZ')"
                                    :color="getCheckboxColor('KFZ')"
                                    :persistent-hint="
                                        chosenOptionsCopy.fahrzeuge
                                            .kraftfahrzeugverkehr ||
                                        isTypeDisabled('KFZ')
                                    "
                                    :disabled="isTypeDisabled('KFZ')"
                                    hide-details
                                    dense
                                ></v-checkbox>
                            </v-hover>
                        </v-col>
                        <v-col cols="6"></v-col>
                    </v-row>
                    <v-row
                        align="start"
                        justify="center"
                        dense
                    >
                        <v-col cols="6">
                            <v-hover v-model="hoverSv">
                                <v-checkbox
                                    v-model="
                                        chosenOptionsCopy.fahrzeuge
                                            .schwerverkehr
                                    "
                                    :label="'Schwerverkehr (SV)'"
                                    :prepend-icon="getIcon('SV')"
                                    :color="getCheckboxColor('SV')"
                                    :persistent-hint="
                                        chosenOptionsCopy.fahrzeuge
                                            .schwerverkehr ||
                                        isTypeDisabled('SV')
                                    "
                                    :disabled="isTypeDisabled('SV')"
                                    hide-details
                                    dense
                                ></v-checkbox>
                            </v-hover>
                        </v-col>
                        <v-col cols="6">
                            <v-hover v-model="hoverSv_p">
                                <v-checkbox
                                    v-model="
                                        chosenOptionsCopy.fahrzeuge
                                            .schwerverkehrsanteilProzent
                                    "
                                    :label="'Schwerverkehrsanteil [%]'"
                                    :prepend-icon="getIcon('SV_P')"
                                    :color="getCheckboxColor('SV_P')"
                                    :persistent-hint="
                                        chosenOptionsCopy.fahrzeuge
                                            .schwerverkehrsanteilProzent ||
                                        isTypeDisabled('SV_P')
                                    "
                                    :disabled="isTypeDisabled('SV_P')"
                                    dense
                                ></v-checkbox>
                            </v-hover>
                        </v-col>
                    </v-row>
                    <v-row
                        align="start"
                        justify="center"
                        dense
                    >
                        <v-col cols="6">
                            <v-hover v-model="hoverGv">
                                <v-checkbox
                                    v-model="
                                        chosenOptionsCopy.fahrzeuge
                                            .gueterverkehr
                                    "
                                    :label="'Güterverkehr (GV)'"
                                    :prepend-icon="getIcon('GV')"
                                    :color="getCheckboxColor('GV')"
                                    :persistent-hint="
                                        chosenOptionsCopy.fahrzeuge
                                            .gueterverkehr ||
                                        isTypeDisabled('GV')
                                    "
                                    :disabled="isTypeDisabled('GV')"
                                    hide-details
                                    dense
                                ></v-checkbox>
                            </v-hover>
                        </v-col>
                        <v-col cols="6">
                            <v-hover v-model="hoverGv_p">
                                <v-checkbox
                                    v-model="
                                        chosenOptionsCopy.fahrzeuge
                                            .gueterverkehrsanteilProzent
                                    "
                                    :label="'Güterverkehrsanteil [%]'"
                                    :prepend-icon="getIcon('GV_P')"
                                    :color="getCheckboxColor('GV_P')"
                                    :persistent-hint="
                                        chosenOptionsCopy.fahrzeuge
                                            .gueterverkehrsanteilProzent ||
                                        isTypeDisabled('GV_P')
                                    "
                                    :disabled="isTypeDisabled('GV_P')"
                                    dense
                                ></v-checkbox>
                            </v-hover>
                        </v-col>
                    </v-row>
                    <v-row
                        align="start"
                        justify="center"
                        dense
                    >
                        <v-col cols="6">
                            <v-hover v-model="hoverRad">
                                <v-checkbox
                                    v-model="
                                        chosenOptionsCopy.fahrzeuge.radverkehr
                                    "
                                    :label="'Radverkehr (Rad)'"
                                    :prepend-icon="getIcon('RAD')"
                                    :color="getCheckboxColor('RAD')"
                                    :persistent-hint="
                                        chosenOptionsCopy.fahrzeuge
                                            .radverkehr || isTypeDisabled('RAD')
                                    "
                                    :disabled="isTypeDisabled('RAD')"
                                    :hide-details="
                                        !chosenOptionsCopy.fahrzeuge.radverkehr
                                    "
                                    dense
                                ></v-checkbox>
                            </v-hover>
                        </v-col>

                        <v-col cols="6">
                            <v-hover
                                v-model="hoverSelectOrDeselectAllVerkehrsarten"
                            >
                                <v-checkbox
                                    v-model="
                                        selectOrDeselectAllVerkehrsartenVmodel
                                    "
                                    :label="
                                        labelSelectOrDeselectAllVerkehrsarten
                                    "
                                    color="grey darken-1"
                                    hide-details
                                    dense
                                    @click="selectOrDeselectAllVerkehrsarten()"
                                ></v-checkbox>
                            </v-hover>
                        </v-col>
                    </v-row>
                    <v-row
                        align="start"
                        justify="center"
                        dense
                    >
                        <v-col cols="6">
                            <v-hover v-model="hoverFuss">
                                <v-checkbox
                                    v-model="
                                        chosenOptionsCopy.fahrzeuge.fussverkehr
                                    "
                                    :label="'Fußgänger (Fuß)'"
                                    :prepend-icon="getIcon('FUSS')"
                                    :color="getCheckboxColor('FUSS')"
                                    :persistent-hint="
                                        chosenOptionsCopy.fahrzeuge
                                            .gueterverkehrsanteilProzent ||
                                        isTypeDisabled('FUSS')
                                    "
                                    :disabled="isTypeDisabled('FUSS')"
                                    :hide-details="
                                        !chosenOptionsCopy.fahrzeuge.fussverkehr
                                    "
                                    style="margin-bottom: 24px"
                                    dense
                                ></v-checkbox>
                            </v-hover>
                        </v-col>
                        <v-spacer />
                    </v-row>
                </v-col>
                <v-col cols="4">
                    {{ helpTextVerkehrsarten }}
                </v-col>
            </v-row>

            <div v-if="isKfzMessstelle">
                <v-divider></v-divider>
                <panel-header
                    font-size="0.875rem"
                    font-weight="bold"
                    padding="10px 0 0 0"
                    header-text="Fahrzeugkategorien"
                ></panel-header>
                <panel-header
                    font-size="small"
                    font-weight="normal"
                    header-text="(keine Anzeige im Belastungsplan)"
                ></panel-header>

                <v-row
                    align="start"
                    justify="center"
                    dense
                >
                    <v-col cols="4">
                        <v-hover v-model="hoverPkw">
                            <v-checkbox
                                v-model="
                                    chosenOptionsCopy.fahrzeuge
                                        .personenkraftwagen
                                "
                                :label="'Personenkraftwagen (Pkw)'"
                                :persistent-hint="isTypeDisabled('PKW')"
                                :disabled="isTypeDisabled('PKW')"
                                color="grey darken-1"
                                hide-details
                                dense
                            ></v-checkbox>
                        </v-hover>
                        <v-hover v-model="hoverLkw">
                            <v-checkbox
                                v-model="
                                    chosenOptionsCopy.fahrzeuge.lastkraftwagen
                                "
                                :label="'Lastkraftwagen (Lkw)'"
                                :persistent-hint="isTypeDisabled('LKW')"
                                :disabled="isTypeDisabled('LKW')"
                                color="grey darken-1"
                                hide-details
                                dense
                            ></v-checkbox>
                        </v-hover>
                        <v-hover v-model="hoverLz">
                            <v-checkbox
                                v-model="chosenOptionsCopy.fahrzeuge.lastzuege"
                                :label="'Lastzüge (Lz)'"
                                :persistent-hint="isTypeDisabled('LZ')"
                                :disabled="isTypeDisabled('LZ')"
                                color="grey darken-1"
                                hide-details
                                dense
                            ></v-checkbox>
                        </v-hover>
                        <v-hover v-model="hoverBus">
                            <v-checkbox
                                v-model="chosenOptionsCopy.fahrzeuge.busse"
                                :label="'Bus'"
                                :persistent-hint="isTypeDisabled('BUS')"
                                :disabled="isTypeDisabled('BUS')"
                                color="grey darken-1"
                                hide-details
                                dense
                            ></v-checkbox>
                        </v-hover>
                    </v-col>
                    <v-col cols="4">
                        <v-hover v-model="hoverKrad">
                            <v-checkbox
                                v-model="
                                    chosenOptionsCopy.fahrzeuge.kraftraeder
                                "
                                :label="'Krafträder (Krad)'"
                                :persistent-hint="isTypeDisabled('KRAD')"
                                :disabled="isTypeDisabled('KRAD')"
                                color="grey darken-1"
                                hide-details
                                dense
                            ></v-checkbox>
                        </v-hover>
                        <v-hover v-model="hoverLfw">
                            <v-checkbox
                                v-model="
                                    chosenOptionsCopy.fahrzeuge.lieferwagen
                                "
                                :label="'Lieferwagen (LFW)'"
                                :persistent-hint="isTypeDisabled('LFW')"
                                :disabled="isTypeDisabled('LFW')"
                                color="grey darken-1"
                                hide-details
                                dense
                            ></v-checkbox>
                        </v-hover>
                        <v-hover v-model="hoverSelectOrDeselectAll">
                            <v-checkbox
                                v-model="selectOrDeselectAllVmodel"
                                :label="labelSelectOrDeselectAll"
                                color="grey darken-1"
                                hide-details
                                dense
                                @click="selectOrDeselectAll()"
                            ></v-checkbox>
                        </v-hover>
                    </v-col>
                    <v-col cols="4">
                        <v-card flat>
                            {{ helpTextFahrzeugkategorien }}
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script setup lang="ts">
// Typen
/* eslint-disable no-unused-vars */
import Fahrzeug from "@/types/enum/Fahrzeug";
/* eslint-enable no-unused-vars */
import MessstelleOptionsDTO from "@/types/messung/MessstelleOptionsDTO";
import { useStore } from "@/api/util/useStore";
import { computed, ref, watch } from "vue";
import PanelHeader from "@/components/common/PanelHeader.vue";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";

interface Props {
    chosenOptions: MessstelleOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:chosen-options"]);
const store = useStore();

const chosenOptionsCopy = computed({
    get: () => props.chosenOptions,
    set: (payload: MessstelleOptionsDTO) =>
        emit("update:chosen-options", payload),
});

const chosenOptionsCopyFahrzeuge = computed(() => {
    return chosenOptionsCopy.value.fahrzeuge;
});

watch(
    chosenOptionsCopy,
    () => {
        calculateSelectOrDeselect();
        calculateSelectOrDeselectVerkehrsarten();
    },
    { deep: true }
);

const selectOrDeselectAllVmodel = ref(false);
const selectOrDeselectAllVerkehrsartenVmodel = ref(false);
const hoverSelectOrDeselectAll = ref(false);
const hoverSelectOrDeselectAllVerkehrsarten = ref(false);

const labelSelectOrDeselectAll = computed(() => {
    return selectOrDeselectAllVmodel.value
        ? "Alles abwählen"
        : "Alles auswählen";
});
const labelSelectOrDeselectAllVerkehrsarten = computed(() => {
    return selectOrDeselectAllVerkehrsartenVmodel.value
        ? "Alles abwählen"
        : "Alles auswählen";
});

const isKfzMessstelle = computed(() => {
    return (
        actualMessstelle.value.messquerschnitte[0].detektierteVerkehrsarten ===
        DetektierteFahrzeugart.KFZ
    );
});

/**
 * Hilfsmethode, um alle Checkboxen der Fahrzeugkategorien aufeinmal
 * aus- oder abzuwählen, wenn diese nicht disabled sind.
 * @private
 */
function selectOrDeselectAll(): void {
    if (!isTypeDisabled(Fahrzeug.PKW)) {
        chosenOptionsCopyFahrzeuge.value.personenkraftwagen =
            selectOrDeselectAllVmodel.value;
    }
    if (!isTypeDisabled(Fahrzeug.LKW)) {
        chosenOptionsCopyFahrzeuge.value.lastkraftwagen =
            selectOrDeselectAllVmodel.value;
    }
    if (!isTypeDisabled(Fahrzeug.LZ)) {
        chosenOptionsCopyFahrzeuge.value.lastzuege =
            selectOrDeselectAllVmodel.value;
    }
    if (!isTypeDisabled(Fahrzeug.BUS)) {
        chosenOptionsCopyFahrzeuge.value.busse =
            selectOrDeselectAllVmodel.value;
    }
    if (!isTypeDisabled(Fahrzeug.KRAD)) {
        chosenOptionsCopyFahrzeuge.value.kraftraeder =
            selectOrDeselectAllVmodel.value;
    }
    if (!isTypeDisabled(Fahrzeug.LFW)) {
        chosenOptionsCopyFahrzeuge.value.lieferwagen =
            selectOrDeselectAllVmodel.value;
    }
}

/**
 * Hilfsmethode, um alle Checkboxen der Verkehrsarten aufeinmal
 * aus- oder abzuwählen, wenn diese nicht disabled sind.
 * @private
 */
function selectOrDeselectAllVerkehrsarten(): void {
    if (!isTypeDisabled(Fahrzeug.KFZ)) {
        chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (!isTypeDisabled(Fahrzeug.SV)) {
        chosenOptionsCopyFahrzeuge.value.schwerverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (!isTypeDisabled(Fahrzeug.GV)) {
        chosenOptionsCopyFahrzeuge.value.gueterverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (!isTypeDisabled(Fahrzeug.SV_P)) {
        chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (!isTypeDisabled(Fahrzeug.GV_P)) {
        chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (!isTypeDisabled(Fahrzeug.RAD)) {
        chosenOptionsCopyFahrzeuge.value.radverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (!isTypeDisabled(Fahrzeug.FUSS)) {
        chosenOptionsCopyFahrzeuge.value.fussverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
}

const actualMessstelle = computed(() => {
    return store.getters["messstelleInfo/getMessstelleInfo"];
});

/**
 * Wenn eine Verkehrsart ausgewählt ist und im Belastunsplan
 * angezeigt wird, so wird zur Kennzeichnung die Checkbox blau dargestellt.
 * Ansonsten ist diese grau.
 */
function getCheckboxColor(type: string): string {
    // KFZ, SV udn GV sind immer primary, wenn aktiv
    let color = "primary";
    switch (type) {
        case Fahrzeug.SV_P: {
            if (!isSv_pInBelastungsPlan.value) {
                color = "grey darken-1";
            }
            break;
        }
        case Fahrzeug.GV_P: {
            if (!isGv_pInBelastungsPlan.value) {
                color = "grey darken-1";
            }
            break;
        }
        case Fahrzeug.RAD: {
            if (!isRadInBelastungsplan.value) {
                color = "grey darken-1";
            }
            break;
        }
        case Fahrzeug.FUSS: {
            if (
                chosenOptionsCopyFahrzeuge.value.fussverkehr &&
                actualNumberOfSelectedVerkehrsarten.value > 1
            ) {
                color = "grey darken-1";
            }
            break;
        }
    }
    return color;
}

/**
 * Wenn eine Verkehrsart ausgewählt ist und im Belastunsplan
 * angezeigt wird, so wird zur Kennzeichnung das Icon des
 * Belastungsplan davor gestellt
 */
function getIcon(type: string): string {
    let icon = "";
    switch (type) {
        case Fahrzeug.KFZ: {
            if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
                icon = `mdi-arrow-decision`;
            }
            break;
        }
        case Fahrzeug.SV: {
            if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
                icon = `mdi-arrow-decision`;
            }
            break;
        }
        case Fahrzeug.GV: {
            if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
                icon = `mdi-arrow-decision`;
            }
            break;
        }
        case Fahrzeug.SV_P: {
            // Angezeigt, wenn (KFZ || SV || GV) && KFZ + SV + GV < 3
            if (isSv_pInBelastungsPlan.value) {
                icon = `mdi-arrow-decision`;
            }
            break;
        }
        case Fahrzeug.GV_P: {
            // Angezeigt, wenn (KFZ || SV || GV) && KFZ + SV + GV + SV% < 3
            if (isGv_pInBelastungsPlan.value) {
                icon = `mdi-arrow-decision`;
            }
            break;
        }
        case Fahrzeug.RAD: {
            // Angezeigt, wenn RAD oder RAD && FUSS
            if (isRadInBelastungsplan.value) {
                icon = `mdi-arrow-decision`;
            }
            break;
        }
        case Fahrzeug.FUSS: {
            // Angezeigt, wenn FUSS
            if (
                chosenOptionsCopyFahrzeuge.value.fussverkehr &&
                actualNumberOfSelectedVerkehrsarten.value === 1
            ) {
                icon = `mdi-arrow-decision`;
            }
            break;
        }
    }
    return icon;
}

const isRadInBelastungsplan = computed(() => {
    return (
        chosenOptionsCopyFahrzeuge.value.radverkehr &&
        actualNumberOfSelectedVerkehrsarten.value === 1
    );
});

/**
 * Liefert die aktuelle Anzahl der ausgewählten Verkehrsarten zurück.
 */
const actualNumberOfSelectedVerkehrsarten = computed(() => {
    let counter = 0;
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
        counter++;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
        counter++;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
        counter++;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent) {
        counter++;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent) {
        counter++;
    }
    if (chosenOptionsCopyFahrzeuge.value.radverkehr) {
        counter++;
    }
    if (chosenOptionsCopyFahrzeuge.value.fussverkehr) {
        counter++;
    }
    return counter;
});

/**
 * Gibt vor, ob die Checkbox Alle Fahrzeugkategorien auswählen oder
 * abwählen soll. Dazu wird die Anzahl der aktiven Checkboxen, sowie
 * die Anzahl der maximal Auswählbaren bestimmt.
 * Wenn mehr wie die Hälfte der Möglichen ausgewählt ist, so ist es
 * ein abwählen, sonst ein auswählen.
 */
function calculateSelectOrDeselect() {
    let counter = 0;
    let maxSelectable = 0;
    if (!isTypeDisabled(Fahrzeug.PKW)) {
        chosenOptionsCopyFahrzeuge.value.personenkraftwagen ? counter++ : "";
        maxSelectable++;
    }
    if (!isTypeDisabled(Fahrzeug.LKW)) {
        chosenOptionsCopyFahrzeuge.value.lastkraftwagen ? counter++ : "";
        maxSelectable++;
    }
    if (!isTypeDisabled(Fahrzeug.LZ)) {
        chosenOptionsCopyFahrzeuge.value.lastzuege ? counter++ : "";
        maxSelectable++;
    }
    if (!isTypeDisabled(Fahrzeug.BUS)) {
        chosenOptionsCopyFahrzeuge.value.busse ? counter++ : "";
        maxSelectable++;
    }
    if (!isTypeDisabled(Fahrzeug.KRAD)) {
        chosenOptionsCopyFahrzeuge.value.kraftraeder ? counter++ : "";
        maxSelectable++;
    }
    if (!isTypeDisabled(Fahrzeug.LFW)) {
        chosenOptionsCopyFahrzeuge.value.lieferwagen ? counter++ : "";
        maxSelectable++;
    }
    // counter > maxSelectable/2 => abwählen
    // sonst => auswählen
    selectOrDeselectAllVmodel.value = counter > maxSelectable / 2;
}

/**
 * Gibt vor, ob die Checkbox Alle Verkehrsarten auswählen oder
 * abwählen soll. Dazu wird die Anzahl der aktiven Checkboxen, sowie
 * die Anzahl der maximal Auswählbaren bestimmt.
 * Wenn mehr wie die Hälfte der Möglichen ausgewählt ist, so ist es
 * ein abwählen, sonst ein auswählen.
 */
function calculateSelectOrDeselectVerkehrsarten(): void {
    let counter = 0;
    let maxSelectable = 0;
    if (!isTypeDisabled(Fahrzeug.KFZ)) {
        chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr ? counter++ : "";
        maxSelectable++;
    }
    if (!isTypeDisabled(Fahrzeug.SV)) {
        chosenOptionsCopyFahrzeuge.value.schwerverkehr ? counter++ : "";
        maxSelectable++;
    }
    if (!isTypeDisabled(Fahrzeug.GV)) {
        chosenOptionsCopyFahrzeuge.value.gueterverkehr ? counter++ : "";
        maxSelectable++;
    }
    if (!isTypeDisabled(Fahrzeug.SV_P)) {
        chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent
            ? counter++
            : "";
        maxSelectable++;
    }
    if (!isTypeDisabled(Fahrzeug.GV_P)) {
        chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent
            ? counter++
            : "";
        maxSelectable++;
    }
    if (!isTypeDisabled(Fahrzeug.RAD)) {
        chosenOptionsCopyFahrzeuge.value.radverkehr ? counter++ : "";
        maxSelectable++;
    }
    if (!isTypeDisabled(Fahrzeug.FUSS)) {
        chosenOptionsCopyFahrzeuge.value.fussverkehr ? counter++ : "";
        maxSelectable++;
    }
    // counter > maxSelectable/2 => abwählen
    // sonst => auswählen
    selectOrDeselectAllVerkehrsartenVmodel.value = counter > maxSelectable / 2;
}

// Verkehrsarten
const hoverKfz = ref(false);
const hoverSv = ref(false);
const hoverGv = ref(false);
const hoverSv_p = ref(false);
const hoverGv_p = ref(false);
const hoverRad = ref(false);
const hoverFuss = ref(false);

// Fahrzeugkategorien
const hoverPkw = ref(false);
const hoverLkw = ref(false);
const hoverLz = ref(false);
const hoverBus = ref(false);
const hoverKrad = ref(false);
const hoverLfw = ref(false);

/**
 * Liefert den Text für die einzelnen Verkehrsarten, welcher
 * bei MouseOver in der dritten Spalte des Optionsmenüs angezeigt wird.
 */
const helpTextVerkehrsarten = computed(() => {
    if (hoverKfz.value) {
        return "Der Kraftfahrzeugverkehr ist die Summe der Personenkraftwagen, Krafträder, Busse, Lastkraftwagen und Lastzüge.";
    }
    if (hoverSv.value) {
        return "Der Schwerverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht (Summe aus Bussen, Lastkraftwagen und Lastzüge).";
    }
    if (hoverGv.value) {
        return "Der Güterverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht ohne Busse (Summe aus Lastkraftwagen und Lastzüge).";
    }
    if (hoverSv_p.value) {
        return "Anteil des Schwerverkehrs am Kraftfahrzeugverkehr in Prozent [%].";
    }
    if (hoverGv_p.value) {
        return "Anteil des Güterverkehrs am Kraftfahrzeugverkehr in Prozent [%].";
    }
    if (hoverRad.value) {
        return "Hinweis: Um den Radverkehr im Belastungsplan darzustellen, darf keine weitere Verkehrsart ausgewählt sein.";
    }
    if (hoverFuss.value) {
        return "Hinweis: Um die Fußgänger im Belastungsplan darzustellen, darf keine weitere Verkehrsart ausgewählt sein.";
    }
    if (hoverSelectOrDeselectAllVerkehrsarten.value) {
        let text = "Aktiviert alle Verkehrsarten.";
        if (selectOrDeselectAllVerkehrsartenVmodel.value) {
            text = "Deaktiviert alle Verkehrsarten.";
        }
        return text;
    }
    return "";
});

/**
 * Liefert den Text für die einzelnen Fahrzeugkategorien, welcher
 * bei MouseOver in der dritten Spalte des Optionsmenüs angezeigt wird.
 */
const helpTextFahrzeugkategorien = computed(() => {
    if (hoverPkw.value) {
        return "";
    }
    if (hoverLkw.value) {
        return "Fahrzeuge mit einem zul. Gesamtgewicht > 3,5t ohne Anhänger.";
    }
    if (hoverLz.value) {
        return "Fahrzeuge mit einem zul. Gesamtgewicht > 3,5t mit Anhänger.";
    }
    if (hoverBus.value) {
        return "";
    }
    if (hoverKrad.value) {
        return "Krafträder beinhalten Motorräder, Motorroller, Mopeds, Mofas usw.";
    }
    if (hoverLfw.value) {
        return "Was soll hier stehen?";
    }
    if (hoverSelectOrDeselectAll.value) {
        let text = "Aktiviert alle Fahrzeugkategorien.";
        if (selectOrDeselectAllVmodel.value) {
            text = "Deaktiviert alle Fahrzeugkategorien.";
        }
        return text;
    }
    return "";
});

/**
 * Hilfsmethode, um zu schauen, ob der Wert SV% im Belastungsplan angezeigt wird.
 * Dies ist nur der Fall, wenn KFZ, SV oder SV aktiviert sind und inklusive SV_P nicht
 * mehr wie 3 Verkehrsarten (ohne RAD und FUSS) ausgewählt sind
 */
const isSv_pInBelastungsPlan = computed(() => {
    let actualNumberOfSelectedKfzSvAndGv = 0;
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
        actualNumberOfSelectedKfzSvAndGv++;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
        actualNumberOfSelectedKfzSvAndGv++;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
        actualNumberOfSelectedKfzSvAndGv++;
    }
    return (
        chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent &&
        (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr ||
            chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
            chosenOptionsCopyFahrzeuge.value.gueterverkehr) &&
        actualNumberOfSelectedKfzSvAndGv < 3
    );
});

/**
 * Hilfsmethode, um zu schauen, ob der Wert GV% im Belastungsplan angezeigt wird.
 * Dies ist nur der Fall, wenn KFZ, SV oder GV aktiviert sind und inklusive GV_P nicht
 * mehr wie 3 Verkehrsarten (ohne RAD und FUSS) ausgewählt sind
 */
const isGv_pInBelastungsPlan = computed(() => {
    let actualNumberOfSelectedKfzSvGvAndSV_P = 0;
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
        actualNumberOfSelectedKfzSvGvAndSV_P++;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
        actualNumberOfSelectedKfzSvGvAndSV_P++;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
        actualNumberOfSelectedKfzSvGvAndSV_P++;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent) {
        actualNumberOfSelectedKfzSvGvAndSV_P++;
    }
    return (
        chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent &&
        (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr ||
            chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
            chosenOptionsCopyFahrzeuge.value.gueterverkehr) &&
        actualNumberOfSelectedKfzSvGvAndSV_P < 3
    );
});

/**
 * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
 * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
 */
function isTypeDisabled(type: string): boolean {
    if (Fahrzeug.FUSS.toUpperCase() === type.toUpperCase()) {
        return true;
    }
    if (isKfzMessstelle) {
        if (
            actualMessstelle.value.messquerschnitte[0].fahrzeugKlassen === "8+1"
        ) {
            return Fahrzeug.RAD.toUpperCase() === type.toUpperCase();
        } else {
            return ![
                Fahrzeug.KFZ.toUpperCase(),
                Fahrzeug.SV.toUpperCase(),
            ].includes(type.toUpperCase());
        }
    } else {
        return Fahrzeug.RAD.toUpperCase() !== type.toUpperCase();
    }
}
</script>
