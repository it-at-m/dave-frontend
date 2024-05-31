<template>
    <div>
        <v-dialog
            v-model="dialog"
            max-width="900px"
            @click:outside="resetData"
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

<script setup lang="ts">
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import ZaehlungskenngroessenAsset from "@/types/pdfreport/assets/ZaehlungskenngroessenAsset";
import TextAsset from "@/types/pdfreport/assets/TextAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import { zaehlartText } from "@/types/enum/Zaehlart";
import { zaehldauerText } from "@/types/enum/Zaehldauer";
import { wetterText } from "@/types/enum/Wetter";
import { quelleText } from "@/types/enum/Quelle";
import _ from "lodash";
import { computed, ref } from "vue";
import { useDateUtils } from "@/util/DateUtils";
import { useZaehlstelleStore } from "@/store/zaehlstelle";
import { useSnackbarStore } from "@/store/snackbar";
import { usePdfReportStore } from "@/store/pdfReport";

interface Props {
    value: boolean;
}

const props = defineProps<Props>();

const pdfReportStore = usePdfReportStore();
const snackbarStore = useSnackbarStore();
const zaehlstelleStore = useZaehlstelleStore();
const dateUtils = useDateUtils();

const zaehlstelleinfo = ref(false);
const zaehlungsinfo = ref(false);
const legende = ref(false);
const zaehlungskenngroessen = ref(false);

const emit = defineEmits<{
    (e: "input", v: boolean): void;
}>();

const dialog = computed({
    get: () => props.value,
    set: (payload: boolean) => emit("input", payload),
});

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