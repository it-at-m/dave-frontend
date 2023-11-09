<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <div>
                <v-icon left>mdi-compare-horizontal</v-icon>
                Zählungsvergleich
            </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-1">
            <v-hover v-model="hoverSelectBasisdatum">
                <div>
                    <panel-header
                        font-size="0.875rem"
                        font-weight="bold"
                        padding="10px 0 0 0"
                        header-text="Datum der aktuell ausgewählten Zählung"
                    ></panel-header>
                    <span class="text">{{ basisdatum }}</span
                    ><br /><br />
                </div>
            </v-hover>
            <v-row
                align="start"
                justify="center"
                dense
            >
                <v-col cols="4">
                    <panel-header
                        font-size="0.875rem"
                        font-weight="bold"
                        padding="10px 0 0 0"
                        header-text="Differenzdaten anzeigen"
                    ></panel-header>
                    <panel-header
                        font-size="small"
                        font-weight="normal"
                        header-text="(Anzeige nur im Belastungsplan)"
                    ></panel-header>

                    <v-hover v-model="hoverCheckbox">
                        <v-checkbox
                            v-model="differenzdatenDarstellen"
                            color="grey darken-1"
                            :label="'Differenzdaten darstellen'"
                        ></v-checkbox>
                    </v-hover>
                    <div v-if="differenzdatenDarstellen">
                        <v-hover v-model="hoverSelectVergleichsdatum">
                            <v-select
                                v-model="vergleichszaehlungsId"
                                :items="vergleichsdatum"
                                :disabled="!differenzdatenDarstellen"
                                no-data-text="Keine Vergleichszählungen vorhanden"
                                label="Vergleichsdatum Differenzdaten"
                                filled
                                dense
                            ></v-select>
                        </v-hover>
                    </div>

                    <panel-header
                        font-size="0.875rem"
                        font-weight="bold"
                        padding="10px 0 0 0"
                        header-text="Zeitreihe"
                    ></panel-header>

                    <v-hover v-model="hoverSelectVergleichsdatumZeitreihe">
                        <v-select
                            v-model="idVergleichszaehlungZeitreihe"
                            :items="vergleichsdatumZeitreihe"
                            no-data-text="Keine Vergleichszählungen vorhanden"
                            label="Vergleichsdatum Zeitreihe"
                            filled
                            dense
                        ></v-select>
                    </v-hover>
                </v-col>
                <v-spacer />
                <v-col cols="4">
                    <v-card flat>
                        {{ helpTextDifferenzdatenBelastungsplan }}
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
import KeyVal from "@/types/KeyVal";
/* eslint-enable no-unused-vars */
import PanelHeader from "@/components/common/PanelHeader.vue";
import Zeitauswahl from "@/types/enum/Zeitauswahl";

@Component({
    components: { PanelHeader },
})
export default class ZaehlungsvergleichPanel extends Vue {
    @Prop() zaehlung?: LadeZaehlungDTO;

    vergleichszaehlungsId = "";
    differenzdatenDarstellen = false;
    private vergleichsdatumDifferenzdarstellung: Array<KeyVal> =
        new Array<KeyVal>();

    // Zeitreihe
    vergleichsdatumZeitreihe: Array<KeyVal> = new Array<KeyVal>();
    idVergleichszaehlungZeitreihe = "";

    private currentZeitblock = "";
    private currentZeitauswahl: string = Zeitauswahl.TAGESWERT;

    mounted() {
        this.update(this.$store.getters.getFilteroptions);
    }

    // Watcher
    // Auswahl geändert? -> Event zum Aktualisieren des Optionsobjektes schicken!

    @Watch("vergleichszaehlungsId")
    storeVon() {
        this.$emit("vergleichszaehlungsId", this.vergleichszaehlungsId);
    }

    @Watch("differenzdatenDarstellen")
    storeNach() {
        this.$emit("differenzdatenDarstellen", this.differenzdatenDarstellen);
    }

    @Watch("idVergleichszaehlungZeitreihe")
    updateIdVergleichszaehlungZeitreihe() {
        this.$emit(
            "idVergleichszaehlungZeitreihe",
            this.idVergleichszaehlungZeitreihe
        );
    }

    // Wenn sich die Optionen ändern, dann soll sich auch die Auswahl auf der
    // Oberfläche ändern.
    @Watch("options")
    optionsChanged(newOptions: OptionsDTO) {
        this.update(newOptions);
    }

    @Watch("zeitblock")
    zeitblockChanged(newZeitblock: string) {
        this.currentZeitblock = newZeitblock;
        this.vergleichsdatumCalculator(
            this.currentZeitblock,
            this.currentZeitauswahl
        );
        this.zeitreihenVergleichsdatumCalculator(
            this.currentZeitblock,
            this.currentZeitauswahl
        );
    }

    @Watch("zeitauswahl")
    zeitauswahlChanged(newZeitauswahl: string) {
        this.currentZeitauswahl = newZeitauswahl;
        this.vergleichsdatumCalculator(
            this.currentZeitblock,
            this.currentZeitauswahl
        );
        this.zeitreihenVergleichsdatumCalculator(
            this.currentZeitblock,
            this.currentZeitauswahl
        );
    }

    /**
     * Ist immer das Zaehldatum der aktiven Zaehlung
     */
    get basisdatum(): string {
        let result = "";
        if (this.zaehlung?.datum) {
            result = `${this.$d(
                this.datum(this.zaehlung.datum),
                "short",
                "de-DE"
            )}`;
        }
        return result;
    }

    /**
     * Alle Zaehlungen an der Zaehlstelle welche für die
     * Differenzendarstellung ausgewählt werden sollen.
     */
    get vergleichsdatum(): Array<KeyVal> {
        return this.vergleichsdatumDifferenzdarstellung;
    }

    hoverSelectBasisdatum = false;
    hoverSelectVergleichsdatum = false;
    hoverCheckbox = false;
    hoverSelectVergleichsdatumZeitreihe = false;

    get helpTextDifferenzdatenBelastungsplan(): string {
        if (this.hoverSelectBasisdatum) {
            return "Das Basisdatum ist immer das Datum der aktuell ausgewählten Zählung.";
        }
        if (this.hoverSelectVergleichsdatum) {
            return "Datum der für den Vergleich ausgewählten Zählung. Hier werden nur Zählungen mit identischer Zählart zum Basisdatum angezeigt.";
        }
        if (this.hoverCheckbox) {
            return "Für den Differenzdatenvergleich muss das Kontrollkästchen aktiviert werden.";
        }
        if (this.hoverSelectVergleichsdatumZeitreihe) {
            return (
                "Datum der Zählung, bis zu der die Zeitreihe angezeigt werden soll (inklusive).\n" +
                "Es können nur Zählungen gleicher Zählart verglichen werden. Der Tageswert kann immer verglichen werden, ansonsten muss in den Vergleichszählungen der gewählten Zeitblock bzw. die gewählte Stunde vorhanden sein."
            );
        }
        return "";
    }

    // reaktiver getter auf den Store
    get options(): OptionsDTO {
        return this.$store.getters.getFilteroptions;
    }

    // reaktiver getter auf den Store
    get zeitblock(): string {
        return this.$store.getters.getZeitblock;
    }

    // reaktiver getter auf den Store
    get zeitauswahl(): string {
        return this.$store.getters.getZeitauswahl;
    }

    // Setzt die Auswahlelemente auf der Oberfläche zurück, oder mit den
    //  übergebenen Werten im Optionsobjekt
    update(newOptions: OptionsDTO) {
        this.vergleichsdatumCalculator(
            newOptions.zeitblock,
            newOptions.zeitauswahl
        );
        this.zeitreihenVergleichsdatumCalculator(
            newOptions.zeitblock,
            newOptions.zeitauswahl
        );
        newOptions.vergleichszaehlungsId === null
            ? (this.vergleichszaehlungsId = "")
            : (this.vergleichszaehlungsId = newOptions.vergleichszaehlungsId);
        newOptions.differenzdatenDarstellen === null
            ? (this.differenzdatenDarstellen = false)
            : (this.differenzdatenDarstellen =
                  newOptions.differenzdatenDarstellen);
        newOptions.idVergleichszaehlungZeitreihe === null
            ? (this.idVergleichszaehlungZeitreihe = "")
            : (this.idVergleichszaehlungZeitreihe =
                  newOptions.idVergleichszaehlungZeitreihe);
    }

    /**
     * es muss für i18n ein Datumsobjekt erzeugt werden.
     */
    private datum(datum: string): Date {
        const d = datum;
        if (Date.parse(d)) {
            return new Date(d);
        }
        return new Date();
    }

    /**
     * Diese Methode ermittelt alle Zählungen für die Differenzendarstellung.
     * Die für die Differenzendarstellung relevanten Zählungen sind:
     * - Welche nicht die selbe ID bezsitzt wie die Basiszählung.
     * - Welche die selbe Zählart besitzt.
     * - Welche den gewählten Zeitblock besitzt.
     *
     * @param newZeitblock zur Ermittlung der relevanten Zählungen.
     * @param newZeitauswahl zur Ermittlung der relevanten Zählungen.
     */
    private vergleichsdatumCalculator(
        newZeitblock: string,
        newZeitauswahl: string
    ): void {
        const result: Array<KeyVal> = new Array<KeyVal>();
        const zaehlungen: Array<LadeZaehlungDTO> =
            this.$store.getters.getZaehlungen;
        if (this.zaehlung?.id) {
            zaehlungen.forEach((zaehl) => {
                if (
                    zaehl.id !== this.zaehlung?.id &&
                    zaehl.zaehlart === this.zaehlung?.zaehlart &&
                    zaehl.sonderzaehlung === this.zaehlung?.sonderzaehlung &&
                    (this.containsZeitblock(zaehl, newZeitblock) ||
                        newZeitauswahl.toString() ===
                            Zeitauswahl.TAGESWERT.toString())
                ) {
                    result.push({
                        text: `${this.$d(
                            this.datum(zaehl.datum),
                            "short",
                            "de-DE"
                        )}`,
                        value: zaehl.id,
                    });
                }
            });
        }
        this.vergleichsdatumDifferenzdarstellung = result;
    }

    /**
     * Diese Methode ermittelt alle Zählungen für die Zeitreihendarstellung.
     * Die für die Differenzendarstellung relevanten Zählungen sind:
     * - Welche älter als oder gleich alt wie die Basiszählung sind.
     * - Welche die selbe Zählart besitzt.
     * - Welche den gewählten Zeitblock besitzt.
     * */
    private zeitreihenVergleichsdatumCalculator(
        newZeitblock: string,
        newZeitauswahl: string
    ): void {
        const result: Array<KeyVal> = new Array<KeyVal>();
        const zaehlungen: Array<LadeZaehlungDTO> =
            this.$store.getters.getZaehlungen;
        if (
            this.zaehlung?.id != undefined &&
            this.zaehlung?.datum != undefined
        ) {
            zaehlungen.forEach((zaehl) => {
                if (
                    zaehl.id !== this.zaehlung?.id &&
                    zaehl.datum <= this.zaehlung!.datum &&
                    zaehl.zaehlart === this.zaehlung?.zaehlart &&
                    zaehl.sonderzaehlung === this.zaehlung?.sonderzaehlung &&
                    (this.containsZeitblock(zaehl, newZeitblock) ||
                        newZeitauswahl.toString() ===
                            Zeitauswahl.TAGESWERT.toString())
                ) {
                    result.push({
                        text: `${this.$d(
                            this.datum(zaehl.datum),
                            "short",
                            "de-DE"
                        )}`,
                        value: zaehl.id,
                    });
                }
            });
        }

        this.vergleichsdatumZeitreihe = result;
    }

    /**
     * Prüft ob die Zählung den Zeitblock im zweiten Parameter besitzt.
     *
     * @param zaehlung zur Prüfung.
     * @param zeitblockInOptions zum Prüfen.
     * @return true falls die Zählung den Zeitblock im zweiten Parameter besitzt, anderfalls false.
     */
    private containsZeitblock(
        zaehlung: LadeZaehlungDTO,
        zeitblockInOptions: string
    ): boolean {
        return (
            zaehlung.zeitauswahl.blocks.some(
                (zeitblock) => zeitblock.toString() === zeitblockInOptions
            ) ||
            zaehlung.zeitauswahl.hours.some(
                (zeitblockStuendl) =>
                    zeitblockStuendl.toString() === zeitblockInOptions
            )
        );
    }
}
</script>
