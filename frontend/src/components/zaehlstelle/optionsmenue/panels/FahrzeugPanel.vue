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
                                        fahrzeugOptions.kraftfahrzeugverkehr
                                    "
                                    :label="'Kraftfahrzeugverkehr (KFZ)'"
                                    :prepend-icon="getIcon('KFZ')"
                                    :hint="getHintToDisplay('KFZ')"
                                    :color="getCheckboxColor('KFZ')"
                                    :persistent-hint="
                                        fahrzeugOptions.kraftfahrzeugverkehr ||
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
                                    v-model="fahrzeugOptions.schwerverkehr"
                                    :label="'Schwerverkehr (SV)'"
                                    :prepend-icon="getIcon('SV')"
                                    :hint="getHintToDisplay('SV')"
                                    :color="getCheckboxColor('SV')"
                                    :persistent-hint="
                                        fahrzeugOptions.schwerverkehr ||
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
                                        fahrzeugOptions.schwerverkehrsanteilProzent
                                    "
                                    :label="'Schwerverkehrsanteil [%]'"
                                    :prepend-icon="getIcon('SV_P')"
                                    :hint="getHintToDisplay('SV_P')"
                                    :color="getCheckboxColor('SV_P')"
                                    :persistent-hint="
                                        fahrzeugOptions.schwerverkehrsanteilProzent ||
                                        isTypeDisabled('SV_P') ||
                                        isDifferenzdatenvergleichActive
                                    "
                                    :disabled="
                                        isTypeDisabled('SV_P') ||
                                        isDifferenzdatenvergleichActive
                                    "
                                    :hide-details="
                                        !isDifferenzdatenvergleichActive
                                    "
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
                                    v-model="fahrzeugOptions.gueterverkehr"
                                    :label="'Güterverkehr (GV)'"
                                    :prepend-icon="getIcon('GV')"
                                    :hint="getHintToDisplay('GV')"
                                    :color="getCheckboxColor('GV')"
                                    :persistent-hint="
                                        fahrzeugOptions.gueterverkehr ||
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
                                        fahrzeugOptions.gueterverkehrsanteilProzent
                                    "
                                    :label="'Güterverkehrsanteil [%]'"
                                    :prepend-icon="getIcon('GV_P')"
                                    :hint="getHintToDisplay('GV_P')"
                                    :color="getCheckboxColor('GV_P')"
                                    :persistent-hint="
                                        fahrzeugOptions.gueterverkehrsanteilProzent ||
                                        isTypeDisabled('GV_P') ||
                                        isDifferenzdatenvergleichActive
                                    "
                                    :disabled="
                                        isTypeDisabled('GV_P') ||
                                        isDifferenzdatenvergleichActive
                                    "
                                    :hide-details="
                                        !isDifferenzdatenvergleichActive
                                    "
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
                                    v-model="fahrzeugOptions.radverkehr"
                                    :label="'Radverkehr (Rad)'"
                                    :prepend-icon="getIcon('RAD')"
                                    :hint="getHintToDisplay('RAD')"
                                    :color="getCheckboxColor('RAD')"
                                    :persistent-hint="
                                        fahrzeugOptions.radverkehr ||
                                        isTypeDisabled('RAD') ||
                                        isTageswertAndNot24h
                                    "
                                    :disabled="isTypeDisabled('RAD')"
                                    :hide-details="
                                        !(
                                            isTageswertAndNot24h &&
                                            fahrzeugOptions.radverkehr
                                        )
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
                                    value=""
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
                                    v-model="fahrzeugOptions.fussverkehr"
                                    :label="'Fußgänger (Fuß)'"
                                    :prepend-icon="getIcon('FUSS')"
                                    :hint="getHintToDisplay('FUSS')"
                                    :color="getCheckboxColor('FUSS')"
                                    :persistent-hint="
                                        fahrzeugOptions.gueterverkehrsanteilProzent ||
                                        isTypeDisabled('FUSS') ||
                                        isTageswertAndNot24h
                                    "
                                    :disabled="isTypeDisabled('FUSS')"
                                    :hide-details="
                                        !(
                                            isTageswertAndNot24h &&
                                            fahrzeugOptions.fussverkehr
                                        )
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
                            v-model="fahrzeugOptions.personenkraftwagen"
                            :label="'Personenkraftwagen (Pkw)'"
                            :hint="getHintToDisplay('PKW')"
                            :persistent-hint="isTypeDisabled('PKW')"
                            :disabled="isTypeDisabled('PKW')"
                            color="grey darken-1"
                            hide-details
                            dense
                        ></v-checkbox>
                    </v-hover>
                    <v-hover v-model="hoverLkw">
                        <v-checkbox
                            v-model="fahrzeugOptions.lastkraftwagen"
                            :label="'Lastkraftwagen (Lkw)'"
                            :hint="getHintToDisplay('LKW')"
                            :persistent-hint="isTypeDisabled('LKW')"
                            :disabled="isTypeDisabled('LKW')"
                            color="grey darken-1"
                            hide-details
                            dense
                        ></v-checkbox>
                    </v-hover>
                    <v-hover v-model="hoverLz">
                        <v-checkbox
                            v-model="fahrzeugOptions.lastzuege"
                            :label="'Lastzüge (Lz)'"
                            :hint="getHintToDisplay('LZ')"
                            :persistent-hint="isTypeDisabled('LZ')"
                            :disabled="isTypeDisabled('LZ')"
                            color="grey darken-1"
                            hide-details
                            dense
                        ></v-checkbox>
                    </v-hover>
                    <v-hover v-model="hoverBus">
                        <v-checkbox
                            v-model="fahrzeugOptions.busse"
                            :label="'Bus'"
                            :hint="getHintToDisplay('BUS')"
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
                            v-model="fahrzeugOptions.kraftraeder"
                            :label="'Krafträder (Krad )'"
                            :hint="getHintToDisplay('KRAD')"
                            :persistent-hint="isTypeDisabled('KRAD')"
                            :disabled="isTypeDisabled('KRAD')"
                            color="grey darken-1"
                            hide-details
                            dense
                        ></v-checkbox>
                    </v-hover>
                    <v-hover v-model="hoverPkweinheit">
                        <v-checkbox
                            v-model="fahrzeugOptions.pkwEinheiten"
                            :label="'PKW-Einheiten'"
                            :hint="getHintToDisplay('PKW_EINHEIT')"
                            :persistent-hint="isTypeDisabled('PKW_EINHEIT')"
                            :disabled="isTypeDisabled('PKW_EINHEIT')"
                            color="grey darken-1"
                            hide-details
                            dense
                        ></v-checkbox>
                    </v-hover>
                    <v-hover v-model="hoverSelectOrDeselectAll">
                        <v-checkbox
                            v-model="selectOrDeselectAllVmodel"
                            value=""
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
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

// Typen
/* eslint-disable no-unused-vars */
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import Fahrzeug from "@/types/enum/Fahrzeug";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zaehldauer from "@/types/enum/Zaehldauer";
/* eslint-enable no-unused-vars */
import PanelHeader from "@/components/common/PanelHeader.vue";
import Optionsmenue from "@/components/zaehlstelle/optionsmenue/Optionsmenue.vue";

@Component({
    components: { PanelHeader },
})
export default class FahrzeugPanel extends Vue {
    @Prop()
    actualZeitauswahl!: string;

    @Prop()
    isDifferenzdatenvergleichActive!: boolean;

    // Bei Auswahl der Checkbox für einen Differenzdatenvergleich werden die Werte für SV- und GV-Anteil in Prozent gespeichert,
    // um diese bei Abwahl der Checkbox wieder anzeigen zu können.
    private svAnteilForDifferenzdatenSaved = true;
    private gvAnteilForDifferenzdatenSaved = true;

    // Variablen für die Auswahloptionen
    private fahrzeugOptions: OptionsDTO = {} as OptionsDTO;

    private selectOrDeselectAllVmodel = false;
    private selectOrDeselectAllVerkehrsartenVmodel = false;
    private hoverSelectOrDeselectAll = false;
    private hoverSelectOrDeselectAllVerkehrsarten = false;

    get labelSelectOrDeselectAll(): string {
        return this.selectOrDeselectAllVmodel
            ? "Alles abwählen"
            : "Alles auswählen";
    }

    get labelSelectOrDeselectAllVerkehrsarten(): string {
        return this.selectOrDeselectAllVerkehrsartenVmodel
            ? "Alles abwählen"
            : "Alles auswählen";
    }

    @Watch("isDifferenzdatenvergleichActive")
    private differenzdatenvergleichChanged() {
        if (this.isDifferenzdatenvergleichActive) {
            // Werte zwischenspeichern und auf false setzen
            this.svAnteilForDifferenzdatenSaved =
                this.fahrzeugOptions.schwerverkehrsanteilProzent;
            this.gvAnteilForDifferenzdatenSaved =
                this.fahrzeugOptions.gueterverkehrsanteilProzent;
            this.fahrzeugOptions.schwerverkehrsanteilProzent = false;
            this.fahrzeugOptions.gueterverkehrsanteilProzent = false;
        } else {
            // Zwischengespeicherte Werte den Optionen zuweisen
            this.fahrzeugOptions.schwerverkehrsanteilProzent =
                this.svAnteilForDifferenzdatenSaved;
            this.fahrzeugOptions.gueterverkehrsanteilProzent =
                this.gvAnteilForDifferenzdatenSaved;
        }
    }

    /**
     * Hilfsmethode, um alle Checkboxen der Fahrzeugkategorien aufeinmal
     * aus- oder abzuwählen, wenn diese nicht disabled sind.
     * @private
     */
    private selectOrDeselectAll() {
        if (!this.isTypeDisabled(Fahrzeug.PKW)) {
            this.fahrzeugOptions.personenkraftwagen =
                this.selectOrDeselectAllVmodel;
        }
        if (!this.isTypeDisabled(Fahrzeug.LKW)) {
            this.fahrzeugOptions.lastkraftwagen =
                this.selectOrDeselectAllVmodel;
        }
        if (!this.isTypeDisabled(Fahrzeug.LZ)) {
            this.fahrzeugOptions.lastzuege = this.selectOrDeselectAllVmodel;
        }
        if (!this.isTypeDisabled(Fahrzeug.BUS)) {
            this.fahrzeugOptions.busse = this.selectOrDeselectAllVmodel;
        }
        if (!this.isTypeDisabled(Fahrzeug.KRAD)) {
            this.fahrzeugOptions.kraftraeder = this.selectOrDeselectAllVmodel;
        }
        if (!this.isTypeDisabled(Fahrzeug.PKW_EINHEIT)) {
            this.fahrzeugOptions.pkwEinheiten = this.selectOrDeselectAllVmodel;
        }
    }

    /**
     * Hilfsmethode, um alle Checkboxen der Verkehrsarten aufeinmal
     * aus- oder abzuwählen, wenn diese nicht disabled sind.
     * @private
     */
    private selectOrDeselectAllVerkehrsarten() {
        if (!this.isTypeDisabled(Fahrzeug.KFZ)) {
            this.fahrzeugOptions.kraftfahrzeugverkehr =
                this.selectOrDeselectAllVerkehrsartenVmodel;
        }
        if (!this.isTypeDisabled(Fahrzeug.SV)) {
            this.fahrzeugOptions.schwerverkehr =
                this.selectOrDeselectAllVerkehrsartenVmodel;
        }
        if (!this.isTypeDisabled(Fahrzeug.GV)) {
            this.fahrzeugOptions.gueterverkehr =
                this.selectOrDeselectAllVerkehrsartenVmodel;
        }
        if (!this.isTypeDisabled(Fahrzeug.SV_P)) {
            this.fahrzeugOptions.schwerverkehrsanteilProzent =
                this.selectOrDeselectAllVerkehrsartenVmodel;
        }
        if (!this.isTypeDisabled(Fahrzeug.GV_P)) {
            this.fahrzeugOptions.gueterverkehrsanteilProzent =
                this.selectOrDeselectAllVerkehrsartenVmodel;
        }
        if (!this.isTypeDisabled(Fahrzeug.RAD)) {
            this.fahrzeugOptions.radverkehr =
                this.selectOrDeselectAllVerkehrsartenVmodel;
        }
        if (!this.isTypeDisabled(Fahrzeug.FUSS)) {
            this.fahrzeugOptions.fussverkehr =
                this.selectOrDeselectAllVerkehrsartenVmodel;
        }
    }

    get activeZaehlung(): LadeZaehlungDTO {
        return this.$store.getters.getAktiveZaehlung;
    }

    // Auswahl geändert? Event zum Aktualisieren des Optionsobjektes schicken!
    @Watch("fahrzeugOptions", { deep: true })
    storeFahrzeugOptions() {
        this.calculateSelectOrDeselect();
        this.calculateSelectOrDeselectVerkehrsarten();
        this.$emit("fahrzeugOptions", this.fahrzeugOptions);
    }

    // reaktiver getter auf den Store
    get options(): OptionsDTO {
        return this.$store.getters.getFilteroptions;
    }

    // Wenn sich die Optionen ändern, dann soll sich auch die Auswahl auf der
    // Oberfläche ändern.
    @Watch("options", { immediate: true })
    optionsChanged(n: OptionsDTO) {
        this.loadOptions(n);
    }

    // Wenn sich die Optionen ändern, dann soll sich auch die Auswahl auf der
    // Oberfläche ändern.
    @Watch("actualZeitauswahl")
    zeitauswahlchanged(zeitauswahl: string) {
        this.fahrzeugOptions.zeitauswahl = zeitauswahl;
        this.adaptFahrzeugauswahl(this.fahrzeugOptions);
    }

    loadOptions(newOptions: OptionsDTO) {
        const options = {} as OptionsDTO;
        Object.assign(options, newOptions);
        this.fahrzeugOptions = options;
        this.calculateSelectOrDeselect();
        this.calculateSelectOrDeselectVerkehrsarten();
    }

    mounted() {
        this.loadOptions(this.options);
    }

    get isTageswertAndNot24h(): boolean {
        return (
            this.fahrzeugOptions.zeitauswahl === Zeitauswahl.TAGESWERT &&
            this.activeZaehlung.zaehldauer !== Zaehldauer.DAUER_24_STUNDEN
        );
    }

    get isAnyKFZselected(): boolean {
        return (
            this.fahrzeugOptions.kraftfahrzeugverkehr ||
            this.fahrzeugOptions.schwerverkehr ||
            this.fahrzeugOptions.gueterverkehr ||
            this.fahrzeugOptions.schwerverkehrsanteilProzent ||
            this.fahrzeugOptions.gueterverkehrsanteilProzent
        );
    }

    /**
     * Liefert den Hinweistext pro Verkehrsart, der unter der Checkbox
     * angezeigt werden soll, wenn diese nicht erfasst wurde, nicht
     * im Belastungsplan dargestellt wird (max 3 Werte) oder im Falle des
     * Rad- und Fußverkehrs nicht bei aktivem Tageswert dargestellt werden kann
     */
    private getHintToDisplay(type: string): string {
        // KFZ, SV und GV werden immer im Belastungsplan angezeigt, wenn aktiv
        let hint = "";
        if (this.isTypeDisabled(type)) {
            return ``;
        }
        switch (type) {
            case "RAD": {
                /**
                 * Durch die KI-Aufbereitung hat der Radverkehr hochgerechnete Werte
                 */
                if (this.isTageswertAndNot24h) {
                    hint =
                        "Hinweis: Die Tageswerte für den Radverkehr wurden vom KI-Modul hochgerechnet.";
                    if (this.isAnyKFZselected) {
                        hint =
                            "Der Tageswert für den Radverkehr kann nicht gleichzeitg mit KFZ-Werten im Belastungsplan zusammen angezeigt werden.";
                    }
                }
                break;
            }
            case "FUSS": {
                if (this.isTageswertAndNot24h) {
                    hint =
                        "Achtung: Der Fußverkehr verfügt über keinen Tageswert. Zur Anzeige im Belastungsplan die Zeitauswahl ändern.";
                }
                break;
            }
            case "SV_P": {
                if (this.isDifferenzdatenvergleichActive) {
                    hint =
                        "Schwerverkehrsanteil bei Differenzdatenvergleich deaktiviert.";
                }
                break;
            }
            case "GV_P": {
                if (this.isDifferenzdatenvergleichActive) {
                    hint =
                        "Güterverkehrsanteil bei Differenzdatenvergleich deaktiviert.";
                }
                break;
            }
        }
        return hint;
    }

    /**
     * Wenn eine Verkehrsart ausgewählt ist und im Belastunsplan
     * angezeigt wird, so wird zur Kennzeichnung die Checkbox blau dargestellt.
     * Ansonsten ist diese grau.
     */
    private getCheckboxColor(type: string): string {
        // KFZ, SV udn GV sind immer primary, wenn aktiv
        let color = "primary";
        switch (type) {
            case "SV_P": {
                if (!this.isSv_pInBelastungsPlan) {
                    color = "grey darken-1";
                }
                break;
            }
            case "GV_P": {
                if (!this.isGv_pInBelastungsPlan) {
                    color = "grey darken-1";
                }
                break;
            }
            case "RAD": {
                if (!this.isRadInBelastungsplan) {
                    color = "grey darken-1";
                }
                break;
            }
            case "FUSS": {
                if (
                    this.fahrzeugOptions.fussverkehr &&
                    this.actualNumberOfSelectedVerkehrsarten > 1
                ) {
                    color = "grey darken-1";
                }
                if (this.isTageswertAndNot24h) {
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
    private getIcon(type: string): string {
        let icon = "";
        switch (type) {
            case Fahrzeug.KFZ: {
                if (this.fahrzeugOptions.kraftfahrzeugverkehr) {
                    icon = `mdi-arrow-decision`;
                }
                break;
            }
            case Fahrzeug.SV: {
                if (this.fahrzeugOptions.schwerverkehr) {
                    icon = `mdi-arrow-decision`;
                }
                break;
            }
            case Fahrzeug.GV: {
                if (this.fahrzeugOptions.gueterverkehr) {
                    icon = `mdi-arrow-decision`;
                }
                break;
            }
            case "SV_P": {
                // Angezeigt, wenn (KFZ || SV || GV) && KFZ + SV + GV < 3
                if (this.isSv_pInBelastungsPlan) {
                    icon = `mdi-arrow-decision`;
                }
                break;
            }
            case "GV_P": {
                // Angezeigt, wenn (KFZ || SV || GV) && KFZ + SV + GV + SV% < 3
                if (this.isGv_pInBelastungsPlan) {
                    icon = `mdi-arrow-decision`;
                }
                break;
            }
            case "RAD": {
                // Angezeigt, wenn RAD oder RAD && FUSS
                if (this.isRadInBelastungsplan) {
                    icon = `mdi-arrow-decision`;
                }
                break;
            }
            case "FUSS": {
                // Angezeigt, wenn FUSS
                if (
                    !this.isTageswertAndNot24h &&
                    this.fahrzeugOptions.fussverkehr &&
                    this.actualNumberOfSelectedVerkehrsarten === 1
                ) {
                    icon = `mdi-arrow-decision`;
                }
                break;
            }
        }
        return icon;
    }

    /**
     * Gibt vor, ob die Checkbox Alle Fahrzeugkategorien auswählen oder
     * abwählen soll. Dazu wird die Anzahl der aktiven Checkboxen, sowie
     * die Anzahl der maximal Auswählbaren bestimmt.
     * Wenn mehr wie die Hälfte der Möglichen ausgewählt ist, so ist es
     * ein abwählen, sonst ein auswählen.
     */
    private calculateSelectOrDeselect() {
        let counter = 0;
        let maxSelectable = 0;
        if (!this.isTypeDisabled(Fahrzeug.PKW)) {
            this.fahrzeugOptions.personenkraftwagen ? counter++ : "";
            maxSelectable++;
        }
        if (!this.isTypeDisabled(Fahrzeug.LKW)) {
            this.fahrzeugOptions.lastkraftwagen ? counter++ : "";
            maxSelectable++;
        }
        if (!this.isTypeDisabled(Fahrzeug.LZ)) {
            this.fahrzeugOptions.lastzuege ? counter++ : "";
            maxSelectable++;
        }
        if (!this.isTypeDisabled(Fahrzeug.BUS)) {
            this.fahrzeugOptions.busse ? counter++ : "";
            maxSelectable++;
        }
        if (!this.isTypeDisabled(Fahrzeug.KRAD)) {
            this.fahrzeugOptions.kraftraeder ? counter++ : "";
            maxSelectable++;
        }
        if (!this.isTypeDisabled(Fahrzeug.PKW_EINHEIT)) {
            this.fahrzeugOptions.pkwEinheiten ? counter++ : "";
            maxSelectable++;
        }
        // counter > maxSelectable/2 => abwählen
        // sonst => auswählen
        this.selectOrDeselectAllVmodel = counter > maxSelectable / 2;
    }

    /**
     * Gibt vor, ob die Checkbox Alle Verkehrsarten auswählen oder
     * abwählen soll. Dazu wird die Anzahl der aktiven Checkboxen, sowie
     * die Anzahl der maximal Auswählbaren bestimmt.
     * Wenn mehr wie die Hälfte der Möglichen ausgewählt ist, so ist es
     * ein abwählen, sonst ein auswählen.
     */
    private calculateSelectOrDeselectVerkehrsarten() {
        let counter = 0;
        let maxSelectable = 0;
        if (!this.isTypeDisabled(Fahrzeug.KFZ)) {
            this.fahrzeugOptions.kraftfahrzeugverkehr ? counter++ : "";
            maxSelectable++;
        }
        if (!this.isTypeDisabled(Fahrzeug.SV)) {
            this.fahrzeugOptions.schwerverkehr ? counter++ : "";
            maxSelectable++;
        }
        if (!this.isTypeDisabled(Fahrzeug.GV)) {
            this.fahrzeugOptions.gueterverkehr ? counter++ : "";
            maxSelectable++;
        }
        if (!this.isTypeDisabled(Fahrzeug.SV_P)) {
            this.fahrzeugOptions.schwerverkehrsanteilProzent ? counter++ : "";
            maxSelectable++;
        }
        if (!this.isTypeDisabled(Fahrzeug.GV_P)) {
            this.fahrzeugOptions.gueterverkehrsanteilProzent ? counter++ : "";
            maxSelectable++;
        }
        if (!this.isTypeDisabled(Fahrzeug.RAD)) {
            this.fahrzeugOptions.radverkehr ? counter++ : "";
            maxSelectable++;
        }
        if (!this.isTypeDisabled(Fahrzeug.FUSS)) {
            this.fahrzeugOptions.fussverkehr ? counter++ : "";
            maxSelectable++;
        }
        // counter > maxSelectable/2 => abwählen
        // sonst => auswählen
        this.selectOrDeselectAllVerkehrsartenVmodel =
            counter > maxSelectable / 2;
    }

    // Verkehrsarten
    private hoverKfz = false;
    private hoverSv = false;
    private hoverGv = false;
    private hoverSv_p = false;
    private hoverGv_p = false;
    private hoverRad = false;
    private hoverFuss = false;

    // Fahrzeugkategorien
    private hoverPkw = false;
    private hoverLkw = false;
    private hoverLz = false;
    private hoverBus = false;
    private hoverKrad = false;
    private hoverPkweinheit = false;

    /**
     * Liefert den Text für die einzelnen Verkehrsarten, welcher
     * bei MouseOver in der dritten Spalte des Optionsmenüs angezeigt wird.
     */
    get helpTextVerkehrsarten(): string {
        if (this.hoverKfz) {
            return "Der Kraftfahrzeugverkehr ist die Summe der Personenkraftwagen, Krafträder, Busse, Lastkraftwagen und Lastzüge.";
        }
        if (this.hoverSv) {
            return "Der Schwerverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht (Summe aus Bussen, Lastkraftwagen und Lastzüge).";
        }
        if (this.hoverGv) {
            return "Der Güterverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht ohne Busse (Summe aus Lastkraftwagen und Lastzüge).";
        }
        if (this.hoverSv_p) {
            return "Anteil des Schwerverkehrs am Kraftfahrzeugverkehr in Prozent [%].";
        }
        if (this.hoverGv_p) {
            return "Anteil des Güterverkehrs am Kraftfahrzeugverkehr in Prozent [%].";
        }
        if (this.hoverRad) {
            return "Hinweis: Um den Radverkehr im Belastungsplan darzustellen, darf keine weitere Verkehrsart ausgewählt sein.";
        }
        if (this.hoverFuss) {
            return "Hinweis: Um die Fußgänger im Belastungsplan darzustellen, darf keine weitere Verkehrsart ausgewählt sein.";
        }
        if (this.hoverSelectOrDeselectAllVerkehrsarten) {
            let text = "Aktiviert alle Verkehrsarten.";
            if (this.selectOrDeselectAllVerkehrsartenVmodel) {
                text = "Deaktiviert alle Verkehrsarten.";
            }
            return text;
        }
        return "";
    }

    /**
     * Liefert den Text für die einzelnen Fahrzeugkategorien, welcher
     * bei MouseOver in der dritten Spalte des Optionsmenüs angezeigt wird.
     */
    get helpTextFahrzeugkategorien(): string {
        if (this.hoverPkw) {
            return "";
        }
        if (this.hoverLkw) {
            return "Fahrzeuge mit einem zul. Gesamtgewicht > 3,5t ohne Anhänger.";
        }
        if (this.hoverLz) {
            return "Fahrzeuge mit einem zul. Gesamtgewicht > 3,5t mit Anhänger.";
        }
        if (this.hoverBus) {
            return "";
        }
        if (this.hoverKrad) {
            return "Krafträder beinhalten Motorräder, Motorroller, Mopeds, Mofas usw.";
        }
        if (this.hoverPkweinheit) {
            return "PKW-Einheiten sind die Maßeinheit, um die unterschiedliche Belastung einer Straße durch verschiedene Arten von Fahrzeugen (inklusive des Radverkehrs) in einer Größe auszudrücken.";
        }
        if (this.hoverSelectOrDeselectAll) {
            let text = "Aktiviert alle Fahrzeugkategorien.";
            if (this.selectOrDeselectAllVmodel) {
                text = "Deaktiviert alle Fahrzeugkategorien.";
            }
            return text;
        }
        return "";
    }

    /**
     * Hilfsmethode, um zu schauen, ob der Wert SV% im Belastungsplan angezeigt wird.
     * Dies ist nur der Fall, wenn KFZ, SV oder SV aktiviert sind und inklusive SV_P nicht
     * mehr wie 3 Verkehrsarten (ohne RAD und FUSS) ausgewählt sind
     */
    get isSv_pInBelastungsPlan(): boolean {
        let actualNumberOfSelectedKfzSvAndGv = 0;
        this.fahrzeugOptions.kraftfahrzeugverkehr
            ? actualNumberOfSelectedKfzSvAndGv++
            : "";
        this.fahrzeugOptions.schwerverkehr
            ? actualNumberOfSelectedKfzSvAndGv++
            : "";
        this.fahrzeugOptions.gueterverkehr
            ? actualNumberOfSelectedKfzSvAndGv++
            : "";
        return (
            this.fahrzeugOptions.schwerverkehrsanteilProzent &&
            (this.fahrzeugOptions.kraftfahrzeugverkehr ||
                this.fahrzeugOptions.schwerverkehr ||
                this.fahrzeugOptions.gueterverkehr) &&
            actualNumberOfSelectedKfzSvAndGv < 3
        );
    }

    /**
     * Hilfsmethode, um zu schauen, ob der Wert GV% im Belastungsplan angezeigt wird.
     * Dies ist nur der Fall, wenn KFZ, SV oder GV aktiviert sind und inklusive GV_P nicht
     * mehr wie 3 Verkehrsarten (ohne RAD und FUSS) ausgewählt sind
     */
    get isGv_pInBelastungsPlan(): boolean {
        let actualNumberOfSelectedKfzSvGvAndSV_P = 0;
        this.fahrzeugOptions.kraftfahrzeugverkehr
            ? actualNumberOfSelectedKfzSvGvAndSV_P++
            : "";
        this.fahrzeugOptions.schwerverkehr
            ? actualNumberOfSelectedKfzSvGvAndSV_P++
            : "";
        this.fahrzeugOptions.gueterverkehr
            ? actualNumberOfSelectedKfzSvGvAndSV_P++
            : "";
        this.fahrzeugOptions.schwerverkehrsanteilProzent
            ? actualNumberOfSelectedKfzSvGvAndSV_P++
            : "";
        return (
            this.fahrzeugOptions.gueterverkehrsanteilProzent &&
            (this.fahrzeugOptions.kraftfahrzeugverkehr ||
                this.fahrzeugOptions.schwerverkehr ||
                this.fahrzeugOptions.gueterverkehr) &&
            actualNumberOfSelectedKfzSvGvAndSV_P < 3
        );
    }

    get isRadInBelastungsplan(): boolean {
        return (
            this.fahrzeugOptions.radverkehr &&
            this.actualNumberOfSelectedVerkehrsarten === 1
        );
    }

    /**
     * Liefert die aktuelle Anzahl der ausgewählten Verkehrsarten zurück.
     */
    get actualNumberOfSelectedVerkehrsarten(): number {
        let counter = 0;
        this.fahrzeugOptions.kraftfahrzeugverkehr ? counter++ : "";
        this.fahrzeugOptions.schwerverkehr ? counter++ : "";
        this.fahrzeugOptions.gueterverkehr ? counter++ : "";
        this.fahrzeugOptions.schwerverkehrsanteilProzent ? counter++ : "";
        this.fahrzeugOptions.gueterverkehrsanteilProzent ? counter++ : "";
        this.fahrzeugOptions.radverkehr ? counter++ : "";
        this.fahrzeugOptions.fussverkehr ? counter++ : "";
        return counter;
    }

    /**
     * Wählt die entsprechende Fahrzeugkategorie und Fahrzeugklasse im OptionsDTO entsprechend der gewählten Zeitauswahl.
     */
    adaptFahrzeugauswahl(options: OptionsDTO): OptionsDTO {
        if (
            options.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
            options.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
        ) {
            options.kraftfahrzeugverkehr = false;
            options.schwerverkehr = false;
            options.gueterverkehr = false;
            options.schwerverkehrsanteilProzent = false;
            options.gueterverkehrsanteilProzent = false;
            options.personenkraftwagen = false;
            options.lastkraftwagen = false;
            options.lastzuege = false;
            options.busse = false;
            options.kraftraeder = false;
        } else {
            options.kraftfahrzeugverkehr = true;
            options.schwerverkehr = true;
            options.gueterverkehr = true;
            options.schwerverkehrsanteilProzent = true;
            options.gueterverkehrsanteilProzent = true;
        }
        if (options.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD) {
            options.radverkehr = true;
            options.fussverkehr = false;
        } else if (options.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS) {
            options.radverkehr = false;
            options.fussverkehr = true;
        }
        return options;
    }

    /**
     * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
     * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
     */
    private isTypeDisabled(type: string): boolean {
        return Optionsmenue.isTypeDisabled(type, this.activeZaehlung);
    }
}
</script>
