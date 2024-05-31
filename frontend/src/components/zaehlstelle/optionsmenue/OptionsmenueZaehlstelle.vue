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
        >
            <v-card
                width="900px"
                flat
            >
                <v-card-title>
                    <v-icon left>mdi-filter-outline</v-icon>
                    Filtereinstellungen
                </v-card-title>

                <v-card-text>
                    <v-sheet
                        width="100%"
                        :max-height="getContentSheetHeight"
                        class="overflow-y-auto"
                    >
                        <v-expansion-panels
                            hover
                            focusable
                        >
                            <zeitauswahl-panel
                                :zaehlung="zaehlung"
                                @zeitauswahl="setZeitauswahl($event)"
                                @zeitblock="setZeitblock($event)"
                                @intervall="setIntervall($event)"
                            />

                            <fahrzeug-panel
                                :actual-zeitauswahl="chosenOptions.zeitauswahl"
                                :is-differenzdatenvergleich-active="
                                    chosenOptions.differenzdatenDarstellen
                                "
                                @fahrzeugOptions="updateOptions($event)"
                            />

                            <geometrie-panel
                                :zaehlung="zaehlung"
                                @von="setVon($event)"
                                @nach="setNach($event)"
                                @beideRichtungen="setBeideRichtungen($event)"
                            />

                            <zaehlungsvergleich-panel
                                :zaehlung="zaehlung"
                                @vergleichszaehlungsId="
                                    setVergleichszaehlungsId($event)
                                "
                                @differenzdatenDarstellen="
                                    setDifferenzdatenDarstellen($event)
                                "
                                @idVergleichszaehlungZeitreihe="
                                    setIdVergleichszaehlungZeitreihe($event)
                                "
                            />

                            <darstellungsoptionen-panel
                                @werteHundertRunden="
                                    setWerteHundertRunden($event)
                                "
                                @blackPrintMode="setBlackPrintMode($event)"
                                @mittelwert="setMittelwert($event)"
                                @stundensumme="setStundensumme($event)"
                                @blocksumme="setBlocksumme($event)"
                                @tagessumme="setTagessumme($event)"
                                @spitzenstunde="setSpitzenstunde($event)"
                                @spitzenstundeKfz="setSpitzenstundeKfz($event)"
                                @spitzenstundeRad="setSpitzenstundeRad($event)"
                                @spitzenstundeFuss="
                                    setSpitzenstundeFuss($event)
                                "
                                @ganglinieYAchse1MaxValue="
                                    setGanglinieYAchse1MaxValue($event)
                                "
                                @ganglinieYAchse2MaxValue="
                                    setGanglinieYAchse2MaxValue($event)
                                "
                                @zeitreiheGesamt="setZeitreiheGesamt($event)"
                            />
                        </v-expansion-panels>
                    </v-sheet>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        @click="setOptions"
                        >Aktualisiere Daten
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey lighten-1"
                        @click="resetOptionsmenu"
                        >Zurücksetzen
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import Fahrzeug from "@/types/enum/Fahrzeug";
import Zaehldauer from "@/types/enum/Zaehldauer";
import GeometriePanel from "@/components/zaehlstelle/optionsmenue/panels/GeometriePanel.vue";
import FahrzeugPanel from "@/components/zaehlstelle/optionsmenue/panels/FahrzeugPanel.vue";
import ZeitauswahlPanel from "@/components/zaehlstelle/optionsmenue/panels/ZeitauswahlPanel.vue";
import ZaehlungsvergleichPanel from "@/components/zaehlstelle/optionsmenue/panels/ZaehlungsvergleichPanel.vue";
import DarstellungsoptionenPanel from "@/components/zaehlstelle/optionsmenue/panels/DarstellungsoptionenPanel.vue";
import Zaehlart from "@/types/enum/Zaehlart";
import Zeitblock from "@/types/enum/Zeitblock";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import { computed, Ref, ref, watch } from "vue";
import { useStore } from "@/util/useStore";
import { useVuetify } from "@/util/useVuetify";
import { useBelastungsplanStore } from "@/store/modules/belastungsplan";

/**
 * Beschreibung Optionsmenü
 *
 * - Wenn der Tageswert ausgewählt ist, kann kein Radverkehr gewählt werden, da dieser keine Hochrechnungsfaktoren besitzt (Ausnahme 24h-Zählungen)
 * - Bei Auswahl der Spitzenstunde wird per Default erstmal nur die dazugehörige Einheit angezeigt. Alle anderen sind erstmal abgewählt und können
 *    bei Bedarf vom Nutzer aktiviert werden
 * - Per Default werden anfangs nur KFZ, SV, GV, SV% und GV% angezeigt. Alle anderen Werte müssen vom Nutzer selbständig aktiviert werden.
 */

interface Props {
    zaehlung: LadeZaehlungDTO;
}

const props = defineProps<Props>();
const store = useStore();
const belastungsplanStore = useBelastungsplanStore();
const vuetify = useVuetify();

const dialog = ref(false);
const chosenOptions = ref({} as OptionsDTO);

const options: Ref<OptionsDTO> = computed(() => {
    return store.getters.getFilteroptions;
});

const getContentSheetHeight = computed(() => {
    if (vuetify.breakpoint.xl) {
        return "650px";
    }
    return "400px";
});

/**
 * Setzt die Default-Einstellungen für das Optionsmenü je nach Zählung
 */
function setDefaultOptionsForZaehlung() {
    let optionsCopy = {} as OptionsDTO;
    Object.assign(optionsCopy, options.value);

    if (
        props.zaehlung.zaehlart === Zaehlart.R ||
        props.zaehlung.zaehlart === Zaehlart.QR
    ) {
        if (props.zaehlung.zaehldauer === Zaehldauer.DAUER_13_STUNDEN) {
            optionsCopy.zeitauswahl = Zeitauswahl.BLOCK;
            optionsCopy.zeitblock = Zeitblock.ZB_06_19;
        } else if (props.zaehlung.zaehldauer === Zaehldauer.DAUER_16_STUNDEN) {
            optionsCopy.zeitauswahl = Zeitauswahl.BLOCK;
            optionsCopy.zeitblock = Zeitblock.ZB_06_22;
        } else if (
            props.zaehlung.zaehldauer === Zaehldauer.DAUER_2_X_4_STUNDEN ||
            props.zaehlung.zaehldauer === Zaehldauer.SONSTIGE
        ) {
            optionsCopy.zeitauswahl = Zeitauswahl.BLOCK;
            optionsCopy.zeitblock = Zeitblock.ZB_06_10;
        }
        // Bei Zaehldauer.DAUER_24_STUNDEN nichts zu tun
    }

    props.zaehlung.kategorien.forEach((fahr) => {
        switch (fahr) {
            // Verkehrsarten
            case Fahrzeug.KFZ:
                optionsCopy.kraftfahrzeugverkehr = true;
                break;
            case Fahrzeug.SV:
                optionsCopy.schwerverkehr = true;
                break;
            case Fahrzeug.SV_P:
                optionsCopy.schwerverkehrsanteilProzent = true;
                break;
            case Fahrzeug.GV:
                optionsCopy.gueterverkehr = true;
                break;
            case Fahrzeug.GV_P:
                optionsCopy.gueterverkehrsanteilProzent = true;
                break;
            case Fahrzeug.RAD:
                // Rad soll nur bei reinen Radzählungen aktiviert sein
                optionsCopy.radverkehr = ["R", "QR"].includes(
                    props.zaehlung.zaehlart
                );
                break;
        }
    });
    optionsCopy.beideRichtungen = false;
    chosenOptions.value = optionsCopy;
    saveOptions();
}

// Event Methoden für die Zeitauswahl Komponente
function setZeitauswahl(event: string) {
    chosenOptions.value.zeitauswahl = event;
    store.commit("setZeitauswahl", event);
}

function setZeitblock(event: string) {
    chosenOptions.value.zeitblock = event;
    store.commit("setZeitblock", event);
}

function setIntervall(event: ZaehldatenIntervall) {
    if (event) {
        chosenOptions.value.intervall = event;
    }
}

// Event Methode für die Fahrzeug Komponente
function updateOptions(event: OptionsDTO) {
    if (event) {
        chosenOptions.value.kraftfahrzeugverkehr = event.kraftfahrzeugverkehr;
        chosenOptions.value.schwerverkehr = event.schwerverkehr;
        chosenOptions.value.gueterverkehr = event.gueterverkehr;
        chosenOptions.value.schwerverkehrsanteilProzent =
            event.schwerverkehrsanteilProzent;
        chosenOptions.value.gueterverkehrsanteilProzent =
            event.gueterverkehrsanteilProzent;
        chosenOptions.value.radverkehr = event.radverkehr;
        chosenOptions.value.fussverkehr = event.fussverkehr;

        chosenOptions.value.personenkraftwagen = event.personenkraftwagen;
        chosenOptions.value.lastkraftwagen = event.lastkraftwagen;
        chosenOptions.value.lastzuege = event.lastzuege;
        chosenOptions.value.busse = event.busse;
        chosenOptions.value.kraftraeder = event.kraftraeder;
        chosenOptions.value.pkwEinheiten = event.pkwEinheiten;
    }
}

// Event-Methoden für die Geometrie Komponente
function setVon(event: Array<number>) {
    if (Array.isArray(event) && event.length > 1) {
        chosenOptions.value.vonKnotenarm = null;
    } else {
        chosenOptions.value.vonKnotenarm = event[0];
    }
    chosenOptions.value.vonIds = event;
}

function setNach(event: Array<number>) {
    if (Array.isArray(event) && event.length > 1) {
        chosenOptions.value.nachKnotenarm = null;
    } else {
        chosenOptions.value.nachKnotenarm = event[0];
    }
    chosenOptions.value.nachIds = event;
}

function setBeideRichtungen(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.beideRichtungen = event;
    }
}

// Event-Methoden für die Vergleichs Komponente
function setVergleichszaehlungsId(event: string) {
    if (event) {
        chosenOptions.value.vergleichszaehlungsId = event;
    }
}

function setIdVergleichszaehlungZeitreihe(event: string) {
    if (event) {
        chosenOptions.value.idVergleichszaehlungZeitreihe = event;
    }
}

function setDifferenzdatenDarstellen(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.differenzdatenDarstellen = event;
    }
}

// Event-Methoden für die Darstellungsoptionen Komponente
function setWerteHundertRunden(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.werteHundertRunden = event;
    }
}

function setBlackPrintMode(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.blackPrintMode = event;
    }
}

function setMittelwert(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.mittelwert = event;
    }
}

function setStundensumme(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.stundensumme = event;
    }
}

function setBlocksumme(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.blocksumme = event;
    }
}

function setTagessumme(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.tagessumme = event;
    }
}

function setSpitzenstunde(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.spitzenstunde = event;
    }
}

function setSpitzenstundeKfz(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.spitzenstundeKfz = event;
    }
}

function setSpitzenstundeRad(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.spitzenstundeRad = event;
    }
}

function setSpitzenstundeFuss(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.spitzenstundeFuss = event;
    }
}

function setGanglinieYAchse1MaxValue(event: number) {
    if (event !== undefined) {
        chosenOptions.value.ganglinieYAchse1MaxValue = event;
    }
}

function setGanglinieYAchse2MaxValue(event: number) {
    if (event !== undefined) {
        chosenOptions.value.ganglinieYAchse2MaxValue = event;
    }
}

function setZeitreiheGesamt(event: boolean) {
    if (event !== undefined) {
        chosenOptions.value.zeitreiheGesamt = event;
    }
}

/**
 * Speichert die aktuell gewählten Anzeigeoptionen im Vuex Store und schließt den Dialog.
 *
 * @private
 */
function setOptions() {
    saveOptions();
    dialog.value = false;
}

/**
 * Speichert die aktuell gewählten Anzeigeoptionen im Vuex Store.
 *
 * @private
 */
function saveOptions() {
    store.dispatch("setFilteroptions", Object.assign({}, chosenOptions.value));
}

// Funktionalität für den "Zurücksetzen" Button
function resetOptionsmenu() {
    resetSizeBelastungsplan();
    resetOptions();
}

function resetOptions() {
    store.dispatch("resetFilteroptions");
    setDefaultOptionsForZaehlung();
}

function resetSizeBelastungsplan() {
    belastungsplanStore.resetSizeBelastungsplanSvg;
}

/**
 * Da das OptionsDTO für die Auswahlfelder im Formular als
 * v-model genutzt wird, muss hier eine Kopie erzeugt werden. Andernfalls
 * würde es zu einer dirketen Veränderung des Stores kommen - was dieser
 * nicht mag.
 */
watch(options, (newOptions: OptionsDTO) => {
    let options = {} as OptionsDTO;
    Object.assign(options, newOptions);
    chosenOptions.value = options;
});

watch(
    () => props.zaehlung,
    () => {
        if (store.getters.isHistory) {
            store.dispatch("reloadFilteroptions");
        } else {
            resetOptions();
        }
    }
);
</script>

<style lang="sass">
@import 'vuetify/src/components/VExpansionPanel/_variables.scss'
.v-expansion-panel
  &::before
    +elevation(0)
</style>