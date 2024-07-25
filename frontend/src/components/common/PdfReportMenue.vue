<template>
  <v-dialog
    v-model="dialog"
    max-width="900px"
    @click:outside="resetData"
  >
    <v-card
                width="900px"
                variant="flat"
            >
                <v-card-title>
                    <v-icon left>mdi-file-chart</v-icon>
                    Auswahl zum PDF Report
                </v-card-title>

              <v-card-subtitle>Wählen Sie die Inhalte, die dem PDF Report hinzugefügt
                werden sollen.</v-card-subtitle>

                <v-list
                    variant="flat"
                    lines="three"
                    density="compact"
                >
                  <pdf-report-menue-list-item
                      v-model="zaehlstelleinfo"
                      title="Zählstelleninformationen"
                      subtitle="Folgende Informationen werden im PDF Report eingetragen: Zählstellen-Nummer, Knoten-/Platzname, Stadtbezirk, Zählstellenkommentar."
                  />
                  <pdf-report-menue-list-item
                      v-model="zaehlungsinfo"
                      title="Zählungsinformationen"
                      subtitle="Folgende Informationen werden im PDF Report
                          eingetragen: Projektname, Zählart, Zähldatum,
                          Zähldauer, Zählsituation und erw. Zählsituation,
                          Wetter, Quelle, Zählungskommentar,
                          Knotenarmnummern und Straßenamen (1 bis 8),
                          Hinweis auf eine etwaige Sonderzählung"
                  />
                  <pdf-report-menue-list-item
                      v-model="zaehlungskenngroessen"
                      title="Zählungskenngrößen"
                      subtitle="Folgende Informationen werden im PDF Report
                            eingetragen: Uhrzeiten Spitzenstunde (morgens,
                            abends, Tag), Zählblöcke und Tageswert (nur wenn
                            24h Zählung), jeweils mit den jeweiligen
                            Zählwerten für KFZ, SV und GV sowie Rad."
                  />
                  <pdf-report-menue-list-item
                      v-model="legende"
                      title="Legende"
                      subtitle="Die Legende enthält Kurzbeschreibungen der
                            einzelnen Zählattribute, z.B. für den
                            Kraftfahrzeugverkehr, Schwerverkehr etc."
                  />
                </v-list>

                <v-footer>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="text-none"
                        color="secondary"
                        text="Aktualisiere PDF Report"
                        @click="saveItems"
                    />
                    <v-spacer></v-spacer>
                    <v-btn
                        class="text-none"
                        color="grey-lighten-1"
                        text="Abbrechen"
                        @click="closeDialog"
                    />
                    <v-spacer></v-spacer>
                </v-footer>
            </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import ZaehlungskenngroessenAsset from "@/types/pdfreport/assets/ZaehlungskenngroessenAsset";
import TextAsset from "@/types/pdfreport/assets/TextAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import {zaehlartText} from "@/types/enum/Zaehlart";
import {zaehldauerText} from "@/types/enum/Zaehldauer";
import {wetterText} from "@/types/enum/Wetter";
import {quelleText} from "@/types/enum/Quelle";
import _ from "lodash";
import {ref} from "vue";
import {useDateUtils} from "@/util/DateUtils";
import {useZaehlstelleStore} from "@/store/zaehlstelle";
import {useSnackbarStore} from "@/store/snackbar";
import {usePdfReportStore} from "@/store/pdfReport";
import PdfReportMenueListItem from "@/components/zaehlstelle/PdfReportMenueListItem.vue";

const dialog = defineModel<boolean>({required: true});

const pdfReportStore = usePdfReportStore();
const snackbarStore = useSnackbarStore();
const zaehlstelleStore = useZaehlstelleStore();
const dateUtils = useDateUtils();

const zaehlstelleinfo = ref(false);
const zaehlungsinfo = ref(false);
const legende = ref(false);
const zaehlungskenngroessen = ref(false);

function closeDialog(): void {
    dialog.value = false;
    resetData();
}

/**
 * Prüft, welche Werte 'angekreuzt' wurden und erstellt diese dann im PDF Report.
 */
function saveItems(): void {
    if (zaehlstelleinfo.value) {
        createZaehlstelleInfo();
    }

    if (zaehlungsinfo.value) {
        createZaehlungsInfo();
    }

    if (zaehlungskenngroessen.value) {
        createZaehlungskenngroessen();
    }

    if (legende.value) {
        createLegende();
    }

    snackbarStore.showSuccess(
        `Die ausgewählten Informationen wurden dem PDF Report hinzugefügt.`
    );
    closeDialog();
}

/**
 * Erstellt die Zählstelleninformationen und übermittelt diese an den PDF Report.
 */
function createZaehlstelleInfo() {
    const zs = zaehlstelleStore.getZaehlstelleHeader;
    const zl = zaehlstelleStore.getAktiveZaehlung;
    const headline = new HeadingAsset(
        `Info für Zählstelle Nr. ${zs.nummer}`,
        AssetTypesEnum.HEADING3
    );
    const platz = new TextAsset(`Knoten-/Platzname: ${zl.kreuzungsname}`);
    const stadtbezirk = new TextAsset(
        `Stadtbezirk: ${zs.stadtbezirk} (${zs.stadtbezirkNummer})`
    );
    let kommentar = new TextAsset(
        `Zählstellenkommentar: ${checkForNull(zs.kommentar)}`
    );
    pdfReportStore.addAssets([headline, platz, stadtbezirk, kommentar]);
}

/**
 * Erstellt die Zählungsinformationen und übermittelt diese an den PDF Report.
 */
function createZaehlungsInfo() {
    const zs = zaehlstelleStore.getZaehlstelleHeader;
    const zl = zaehlstelleStore.getAktiveZaehlung;
    const datum = dateUtils.getShortVersionOfDate(new Date(zl.datum));
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
        `Zählsituation/ erweiterte Zählsituation: ${checkForNull(
            zl.zaehlsituation
        )} / ${checkForNull(zl.zaehlsituationErweitert)}`
    );
    const wetter = new TextAsset(`Wetter: ${wetterText.get(zl.wetter)}`);
    const quelle = new TextAsset(`Quelle: ${quelleText.get(zl.quelle)}`);
    const kommentar = new TextAsset(
        `Zählungskommentar: ${checkForNull(zl.kommentar)}`
    );
    let knotenarmListe = "Knotenarme:<br/>";
    zl.knotenarme.forEach((k) => {
        knotenarmListe =
            knotenarmListe + `${k.nummer} ${k.strassenname}<br/>\n`;
    });
    const knotenarme = new TextAsset(knotenarmListe);
    pdfReportStore.addAssets([
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
function createZaehlungskenngroessen() {
    const zs = zaehlstelleStore.getZaehlstelleHeader;
    const zl = zaehlstelleStore.getAktiveZaehlung;
    const datum = dateUtils.getShortVersionOfDate(new Date(zl.datum));

    const headline = new HeadingAsset(
        `Kenngrößen zur Zählung vom ${datum} (Zs-Nr. ${zs.nummer})`,
        AssetTypesEnum.HEADING3
    );
    const zaehlungskenngroessen = new ZaehlungskenngroessenAsset(
        `Zählungskenngrößen (Zählstelle ${zs.nummer}, ${datum})`,
        zl.id
    );

    pdfReportStore.addAssets([headline, zaehlungskenngroessen]);
}

/**
 * Erstellt die Legende und übermittelt diese an den PDF Report.
 */
function createLegende() {
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
    pdfReportStore.addAssets([ueberschrift, legende]);
}

/**
 * Prüft ob der Wert vorhanden ist. Falls nein, wird '---' zurückgegeben, andernfalls der Wert selbst.
 */
function checkForNull(value: string): string {
    if (_.isNil(value)) {
        return "---";
    }
    return value;
}

function resetData(): void {
    zaehlstelleinfo.value = false;
    zaehlungsinfo.value = false;
    legende.value = false;
    zaehlungskenngroessen.value = false;
}
</script>