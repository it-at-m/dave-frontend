<template>
    <div>
        <v-dialog
            v-model="dialog"
            max-width="900px"
        >
            <v-card
                width="900px"
                flat
            >
                <v-card-title>
                    <v-icon left>mdi-file-chart</v-icon>
                    Auswahl zum PDF Report
                </v-card-title>

                <v-list
                    flat
                    subheader
                    three-line
                >
                    <v-subheader
                        >Wählen Sie die Inhalte, die dem PDF Report hinzugefügt
                        werden sollen.</v-subheader
                    >
                    <v-list-item>
                        <v-list-item-action>
                            <v-checkbox v-model="zaehlstelleinfo"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title
                                >Zählstelleninformationen</v-list-item-title
                            >
                            <v-list-item-subtitle
                                >Folgende Informationen werden im PDF Report
                                eingetragen: Zählstellen-Nummer,
                                Knoten-/Platzname, Stadtbezirk,
                                Zählstellenkommentar.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-action>
                            <v-checkbox v-model="zaehlungsinfo"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title
                                >Zählungsinformationen</v-list-item-title
                            >
                            <v-list-item-subtitle
                                >Folgende Informationen werden im PDF Report
                                eingetragen: Projektname, Zählart, Zähldatum,
                                Zähldauer, Zählsituation und erw. Zählsituation,
                                Wetter, Quelle, Zählungskommentar,
                                Knotenarmnummern und Straßenamen (1 bis 8),
                                Hinweis auf eine etwaige Sonderzählung
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-action>
                            <v-checkbox
                                v-model="zaehlungskenngroessen"
                            ></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title
                                >Zählungskenngrößen</v-list-item-title
                            >
                            <v-list-item-subtitle
                                >Folgende Informationen werden im PDF Report
                                eingetragen: Uhrzeiten Spitzenstunde (morgens,
                                abends, Tag), Zählblöcke und Tageswert (nur wenn
                                24h Zählung), jeweils mit den jeweiligen
                                Zählwerten für KFZ, SV und GV sowie Rad.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-action>
                            <v-checkbox v-model="legende"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>Legende</v-list-item-title>
                            <v-list-item-subtitle
                                >Die Legende enthält Kurzbeschreibungen der
                                einzelnen Zählattribute, z.B. für den
                                Kraftfahrzeugverkehr, Schwerverkehr etc.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-footer>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        @click="saveItems"
                    >
                        Aktualisiere PDF Report
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey lighten-1"
                        @click="closeDialog"
                    >
                        Abbrechen
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-footer>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

/* eslint-disable no-unused-vars */
import ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import ZaehlungskenngroessenAsset from "@/types/pdfreport/assets/ZaehlungskenngroessenAsset";
import TextAsset from "@/types/pdfreport/assets/TextAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import { Levels } from "@/api/error";
import { zaehlartText } from "@/types/enum/Zaehlart";
import { zaehldauerText } from "@/types/enum/Zaehldauer";
import { wetterText } from "@/types/enum/Wetter";
import { quelleText } from "@/types/enum/Quelle";
/* eslint-enable no-unused-vars */
import _ from "lodash";

@Component
export default class PdfReportMenue extends Vue {
    @Prop({ default: false }) open!: boolean;
    dialog = false;

    zaehlstelleinfo = false;
    zaehlungsinfo = false;
    legende = false;
    zaehlungskenngroessen = false;

    @Watch("open")
    setDialog(d: boolean): void {
        this.dialog = d;
    }

    /**
     * Bugfix. Ohne diesen Watcher lässt sich der Report Dialog nicht mehr öffnen, nachdem man es durch einen Klick außerhalb des Dialogs geschlossen hat.
     */
    @Watch("dialog")
    closeWhenClickingOutsideOfDialog(dialog: boolean): void {
        if (dialog === false) {
            this.closeDialog();
        }
    }

    closeDialog(): void {
        this.$emit("close");
    }

    /**
     * Prüft, welche Werte 'angekreuzt' wurden und erstellt diese dann im PDF Report.
     */
    saveItems(): void {
        if (this.zaehlstelleinfo) {
            this.createZaehlstelleInfo();
        }

        if (this.zaehlungsinfo) {
            this.createZaehlungsInfo();
        }

        if (this.zaehlungskenngroessen) {
            this.createZaehlungskenngroessen();
        }

        if (this.legende) {
            this.createLegende();
        }

        this.$store.dispatch("snackbar/showToast", {
            snackbarTextPart1: `Die ausgewählten Informationen wurden dem PDF Report hinzugefügt.`,
            level: Levels.SUCCESS,
        });
        this.closeDialog();
    }

    /**
     * Erstellt die Zählstelleninformationen und übermittelt diese an den PDF Report.
     */
    createZaehlstelleInfo() {
        const zs = this.$store.getters.getZaehlstelle as ZaehlstelleHeaderDTO;
        const zl = this.$store.getters.getAktiveZaehlung as LadeZaehlungDTO;
        const headline = new HeadingAsset(
            `Info für Zählstelle Nr. ${zs.nummer}`,
            AssetTypesEnum.HEADING3
        );
        const platz = new TextAsset(`Knoten-/Platzname: ${zl.kreuzungsname}`);
        const stadtbezirk = new TextAsset(
            `Stadtbezirk: ${zs.stadtbezirk} (${zs.stadtbezirkNummer})`
        );
        let kommentar = new TextAsset(
            `Zählstellenkommentar: ${this.checkForNull(zs.kommentar)}`
        );
        this.$store.dispatch("addAssets", [
            headline,
            platz,
            stadtbezirk,
            kommentar,
        ]);
    }

    /**
     * Erstellt die Zählungsinformationen und übermittelt diese an den PDF Report.
     */
    createZaehlungsInfo() {
        const zs = this.$store.getters.getZaehlstelle as ZaehlstelleHeaderDTO;
        const zl = this.$store.getters.getAktiveZaehlung as LadeZaehlungDTO;
        const datum = this.$d(new Date(zl.datum), "short", "de-DE");
        const headline = new HeadingAsset(
            `Info zur Zählung vom ${datum} (Zs-Nr. ${zs.nummer})`,
            AssetTypesEnum.HEADING3
        );
        const projektname = new TextAsset(`Projektname: ${zl.projektName}`);
        const zaehlart = new TextAsset(
            `Zählart: ${zl.zaehlart} (${zaehlartText.get(zl.zaehlart)})`
        );
        const zaehldauer = new TextAsset(
            `Zähldauer: ${zaehldauerText.get(zl.zaehldauer)}`
        );
        const zaehlsituation = new TextAsset(
            `Zählsituation/ erweiterte Zählsituation: ${this.checkForNull(
                zl.zaehlsituation
            )} / ${this.checkForNull(zl.zaehlsituationErweitert)}`
        );
        const wetter = new TextAsset(`Wetter: ${wetterText.get(zl.wetter)}`);
        const quelle = new TextAsset(`Quelle: ${quelleText.get(zl.quelle)}`);
        const kommentar = new TextAsset(
            `Zählungskommentar: ${this.checkForNull(zl.kommentar)}`
        );
        let knotenarmListe = "Knotenarme:<br/>";
        zl.knotenarme.forEach((k) => {
            knotenarmListe =
                knotenarmListe + `${k.nummer} ${k.strassenname}<br/>\n`;
        });
        const knotenarme = new TextAsset(knotenarmListe);
        this.$store.dispatch("addAssets", [
            headline,
            projektname,
            zaehlart,
            zaehldauer,
            zaehlsituation,
            wetter,
            quelle,
            kommentar,
            knotenarme,
        ]);
    }

    /**
     * Erstellt ein Zählungskenngrößen Asset und übermittelt dieses an den PDF Report.
     * Die einzelnen, anzuzeigenden Werte werden erst bei PDF-Erstellung im Backend generiert.
     */
    createZaehlungskenngroessen() {
        const zs = this.$store.getters.getZaehlstelle as ZaehlstelleHeaderDTO;
        const zl = this.$store.getters.getAktiveZaehlung as LadeZaehlungDTO;
        const datum = this.$d(new Date(zl.datum), "short", "de-DE");

        const headline = new HeadingAsset(
            `Kenngrößen zur Zählung vom ${datum} (Zs-Nr. ${zs.nummer})`,
            AssetTypesEnum.HEADING3
        );
        const zaehlungskenngroessen = new ZaehlungskenngroessenAsset(
            `Zählungskenngrößen (Zählstelle ${zs.nummer}, ${datum})`,
            zl.id
        );

        this.$store.dispatch("addAssets", [headline, zaehlungskenngroessen]);
    }

    /**
     * Erstellt die Legende und übermittelt diese an den PDF Report.
     */
    createLegende() {
        const ueberschrift = new HeadingAsset(
            "Legende zu den Kennzahlen",
            AssetTypesEnum.HEADING3
        );
        const legende = new TextAsset(
            "<p>- <b>Kraftfahrzeugverkehr (KFZ)</b>: Der Kraftfahrzeugverkehr ist die Summe der Personenkraftwagen, Krafträder, Busse, Lastkraftwagen und Lastzüge.</p>\n" +
                "<p>- <b>Schwerverkehr\t(SV)</b>: Der Schwerverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht (Summe aus Bussen, Lastkraftwagen und Lastzüge).</p>\n" +
                "<p>- <b>Güterverkehr (GV)</b>: Der Güterverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht ohne Busse (Summe aus Lastkraftwagen und Lastzüge).</p>\n" +
                "<p>- <b>Schwer- und Güterverkehrsanteil</b>: Anteil des Schwer- bzw. Güterverkehrs am Kraftfahrzeugverkehr in Prozent [%].</p>"
        );
        this.$store.dispatch("addAssets", [ueberschrift, legende]);
    }

    /**
     * Prüft ob der Wert vorhanden ist. Falls nein, wird '---' zurückgegeben, andernfalls der Wert selbst.
     */
    checkForNull(value: string): string {
        if (_.isNil(value)) {
            return "---";
        }
        return value;
    }
}
</script>