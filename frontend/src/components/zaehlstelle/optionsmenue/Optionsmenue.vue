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

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

/* eslint-disable no-unused-vars */
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import Fahrzeug from "@/types/enum/Fahrzeug";
import Zaehldauer from "@/types/enum/Zaehldauer";
/* eslint-enable no-unused-vars */
// Komponenten
import GeometriePanel from "@/components/zaehlstelle/optionsmenue/panels/GeometriePanel.vue";
import FahrzeugPanel from "@/components/zaehlstelle/optionsmenue/panels/FahrzeugPanel.vue";
import PanelHeader from "@/components/common/PanelHeader.vue";
import ZeitauswahlPanel from "@/components/zaehlstelle/optionsmenue/panels/ZeitauswahlPanel.vue";
import ZaehlungsvergleichPanel from "@/components/zaehlstelle/optionsmenue/panels/ZaehlungsvergleichPanel.vue";
import DarstellungsoptionenPanel from "@/components/zaehlstelle/optionsmenue/panels/DarstellungsoptionenPanel.vue";
import Zaehlart from "@/types/enum/Zaehlart";
import Zeitblock from "@/types/enum/Zeitblock";
import Zeitauswahl from "@/types/enum/Zeitauswahl";

/**
 * Beschreibung Optionsmenü
 *
 * - Wenn der Tageswert ausgewählt ist, kann kein Radverkehr gewählt werden, da dieser keine Hochrechnungsfaktoren besitzt (Ausnahme 24h-Zählungen)
 * - Bei Auswahl der Spitzenstunde wird per Default erstmal nur die dazugehörige Einheit angezeigt. Alle anderen sind erstmal abgewählt und können
 *    bei Bedarf vom Nutzer aktiviert werden
 * - Per Default werden anfangs nur KFZ, SV, GV, SV% und GV% angezeigt. Alle anderen Werte müssen vom Nutzer selbständig aktiviert werden.
 */
@Component({
    components: {
        DarstellungsoptionenPanel,
        ZaehlungsvergleichPanel,
        ZeitauswahlPanel,
        PanelHeader,
        FahrzeugPanel,
        GeometriePanel,
    },
})
export default class Optionsmenue extends Vue {
    @Prop()
    readonly zaehlung!: LadeZaehlungDTO;

    // Variablen für Dialog
    dialog = false;

    // Variablen für die Auswahloptionen
    chosenOptions: OptionsDTO = {} as OptionsDTO;

    /**
     * Lädt die Optionen aus dem Store
     */
    get options(): OptionsDTO {
        return this.$store.getters.getFilteroptions;
    }

    @Watch("zaehlung")
    zaehlungChanged() {
        this.resetOptions();
    }

    /**
     * Da das OptionsDTO für die Auswahlfelder im Formular als
     * v-model genutzt wird, muss hier eine Kopie erzeugt werden. Andernfalls
     * würde es zu einer dirketen Veränderung des Stores kommen - was dieser
     * nicht mag.
     */
    @Watch("options")
    copyCoptions(n: OptionsDTO) {
        let options = {} as OptionsDTO;
        Object.assign(options, n);
        this.chosenOptions = options;
    }

    get getContentSheetHeight() {
        if (this.$vuetify.breakpoint.xl) {
            return "650px";
        }
        return "400px";
    }

    /**
     * Setzt die Default-Einstellungen für das Optionsmenü je nach Zählung
     */
    private setDefaultOptionsForZaehlung() {
        let options = {} as OptionsDTO;
        Object.assign(options, this.options);

        if (
            this.zaehlung.zaehlart === Zaehlart.R ||
            this.zaehlung.zaehlart === Zaehlart.QR
        ) {
            if (this.zaehlung.zaehldauer === Zaehldauer.DAUER_13_STUNDEN) {
                options.zeitauswahl = Zeitauswahl.BLOCK;
                options.zeitblock = Zeitblock.ZB_06_19;
            } else if (
                this.zaehlung.zaehldauer === Zaehldauer.DAUER_16_STUNDEN
            ) {
                options.zeitauswahl = Zeitauswahl.BLOCK;
                options.zeitblock = Zeitblock.ZB_06_22;
            } else if (
                this.zaehlung.zaehldauer === Zaehldauer.DAUER_2_X_4_STUNDEN ||
                this.zaehlung.zaehldauer === Zaehldauer.SONSTIGE
            ) {
                options.zeitauswahl = Zeitauswahl.BLOCK;
                options.zeitblock = Zeitblock.ZB_06_10;
            }
            // Bei Zaehldauer.DAUER_24_STUNDEN nichts zu tun
        }

        this.zaehlung.kategorien.forEach((fahr) => {
            switch (fahr) {
                // Verkehrsarten
                case Fahrzeug.KFZ:
                    options.kraftfahrzeugverkehr = true;
                    break;
                case Fahrzeug.SV:
                    options.schwerverkehr = true;
                    break;
                case Fahrzeug.SV_P:
                    options.schwerverkehrsanteilProzent = true;
                    break;
                case Fahrzeug.GV:
                    options.gueterverkehr = true;
                    break;
                case Fahrzeug.GV_P:
                    options.gueterverkehrsanteilProzent = true;
                    break;
                case Fahrzeug.RAD:
                    // Rad soll nur bei reinen Radzählungen aktiviert sein
                    options.radverkehr = ["R", "QR"].includes(
                        this.zaehlung.zaehlart
                    );
                    break;
            }
        });
        options.beideRichtungen = false;
        this.chosenOptions = options;
        this.saveOptions();
    }

    // Event Methoden für die Zeitauswahl Komponente
    setZeitauswahl(event: string) {
        this.chosenOptions.zeitauswahl = event;
        this.$store.commit("setZeitauswahl", event);
    }

    setZeitblock(event: string) {
        this.chosenOptions.zeitblock = event;
        this.$store.commit("setZeitblock", event);
    }

    setIntervall(event: ZaehldatenIntervall) {
        if (event) {
            this.chosenOptions.intervall = event;
        }
    }

    // Event Methode für die Fahrzeug Komponente
    updateOptions(event: OptionsDTO) {
        if (event) {
            this.chosenOptions.kraftfahrzeugverkehr =
                event.kraftfahrzeugverkehr;
            this.chosenOptions.schwerverkehr = event.schwerverkehr;
            this.chosenOptions.gueterverkehr = event.gueterverkehr;
            this.chosenOptions.schwerverkehrsanteilProzent =
                event.schwerverkehrsanteilProzent;
            this.chosenOptions.gueterverkehrsanteilProzent =
                event.gueterverkehrsanteilProzent;
            this.chosenOptions.radverkehr = event.radverkehr;
            this.chosenOptions.fussverkehr = event.fussverkehr;

            this.chosenOptions.personenkraftwagen = event.personenkraftwagen;
            this.chosenOptions.lastkraftwagen = event.lastkraftwagen;
            this.chosenOptions.lastzuege = event.lastzuege;
            this.chosenOptions.busse = event.busse;
            this.chosenOptions.kraftraeder = event.kraftraeder;
            this.chosenOptions.pkwEinheiten = event.pkwEinheiten;
        }
    }

    // Event-Methoden für die Geometrie Komponente
    setVon(event: Array<number>) {
        if (Array.isArray(event) && event.length > 1) {
            this.chosenOptions.vonKnotenarm = null;
        } else {
            this.chosenOptions.vonKnotenarm = event[0];
        }
        this.chosenOptions.vonIds = event;
    }

    setNach(event: Array<number>) {
        if (Array.isArray(event) && event.length > 1) {
            this.chosenOptions.nachKnotenarm = null;
        } else {
            this.chosenOptions.nachKnotenarm = event[0];
        }
        this.chosenOptions.nachIds = event;
    }

    setBeideRichtungen(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.beideRichtungen = event;
        }
    }

    // Event-Methoden für die Vergleichs Komponente
    setVergleichszaehlungsId(event: string) {
        if (event) {
            this.chosenOptions.vergleichszaehlungsId = event;
        }
    }

    setIdVergleichszaehlungZeitreihe(event: string) {
        if (event) {
            this.chosenOptions.idVergleichszaehlungZeitreihe = event;
        }
    }

    setDifferenzdatenDarstellen(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.differenzdatenDarstellen = event;
        }
    }

    // Event-Methoden für die Darstellungsoptionen Komponente
    setWerteHundertRunden(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.werteHundertRunden = event;
        }
    }

    setBlackPrintMode(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.blackPrintMode = event;
        }
    }

    setMittelwert(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.mittelwert = event;
        }
    }

    setStundensumme(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.stundensumme = event;
        }
    }

    setBlocksumme(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.blocksumme = event;
        }
    }

    setTagessumme(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.tagessumme = event;
        }
    }

    setSpitzenstunde(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.spitzenstunde = event;
        }
    }

    setSpitzenstundeKfz(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.spitzenstundeKfz = event;
        }
    }

    setSpitzenstundeRad(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.spitzenstundeRad = event;
        }
    }

    setSpitzenstundeFuss(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.spitzenstundeFuss = event;
        }
    }

    setGanglinieYAchse1MaxValue(event: number) {
        if (event !== undefined) {
            this.chosenOptions.ganglinieYAchse1MaxValue = event;
        }
    }

    setGanglinieYAchse2MaxValue(event: number) {
        if (event !== undefined) {
            this.chosenOptions.ganglinieYAchse2MaxValue = event;
        }
    }

    setZeitreiheGesamt(event: boolean) {
        if (event !== undefined) {
            this.chosenOptions.zeitreiheGesamt = event;
        }
    }

    /**
     * Speichert die aktuell gewählten Anzeigeoptionen im Vuex Store und schließt den Dialog.
     *
     * @private
     */
    setOptions() {
        this.saveOptions();
        this.dialog = false;
    }

    /**
     * Speichert die aktuell gewählten Anzeigeoptionen im Vuex Store.
     *
     * @private
     */
    private saveOptions() {
        this.$store.dispatch(
            "setFilteroptions",
            Object.assign({}, this.chosenOptions)
        );
    }

    // Funktionalität für den "Zurücksetzen" Button
    resetOptionsmenu() {
        this.resetSizeBelastungsplan();
        this.resetOptions();
    }

    private resetOptions() {
        this.$store.dispatch("resetFilteroptions");
        this.setDefaultOptionsForZaehlung();
    }

    private resetSizeBelastungsplan() {
        this.$store.dispatch("resetSizeBelastungsplanSvg");
    }

    /**
     * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
     * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
     */
    public static isTypeDisabled(
        type: string,
        zaehlung: LadeZaehlungDTO
    ): boolean {
        if (zaehlung === undefined || zaehlung.kategorien === undefined) {
            return true;
        }
        return !zaehlung.kategorien.includes(type);
    }
}
</script>

<style lang="sass">
@import 'vuetify/src/components/VExpansionPanel/_variables.scss'
.v-expansion-panel
  &::before
    +elevation(0)
</style>