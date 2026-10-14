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
        <v-icon
          start
          icon="mdi-file-chart"
        />
        Auswahl zum PDF Report
      </v-card-title>

      <v-card-subtitle
        >Wählen Sie die Inhalte, die dem PDF Report hinzugefügt werden
        sollen.</v-card-subtitle
      >

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
        <v-spacer />
        <v-btn
          class="text-none"
          color="secondary"
          text="Aktualisiere PDF Report"
          :disabled="!somethingToAdd"
          @click="saveItems"
        />
        <v-spacer />
        <v-btn
          class="text-none"
          color="tertiary"
          text="Abbrechen"
          @click="closeDialog"
        />
        <v-spacer />
      </v-footer>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type {
  BaseAssetTypeEnum,
  HeadingAsset,
  TextAsset,
  ZaehlungskenngroessenAsset,
} from "@/api/client";

import _ from "lodash";
import { computed, ref } from "vue";

import PdfReportMenueListItem from "@/components/zaehlstelle/PdfReportMenueListItem.vue";
import { usePdfReportStore } from "@/store/PdfReportStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import { quelleText } from "@/types/enum/Quelle";
import { wetterText } from "@/types/enum/Wetter";
import { zaehlartText } from "@/types/enum/Zaehlart";
import { zaehldauerText } from "@/types/enum/Zaehldauer";
import { useAssetUtil } from "@/util/AssetUtil";
import { useDateUtils } from "@/util/DateUtils";

const dialog = defineModel<boolean>({ required: true });

const pdfReportStore = usePdfReportStore();
const snackbarStore = useSnackbarStore();
const zaehlstelleStore = useZaehlstelleStore();
const dateUtils = useDateUtils();
const assetUtil = useAssetUtil();

const zaehlstelleinfo = ref(false);
const zaehlungsinfo = ref(false);
const legende = ref(false);
const zaehlungskenngroessen = ref(false);

const somethingToAdd = computed(() => {
  return (
    zaehlstelleinfo.value ||
    zaehlungsinfo.value ||
    zaehlungskenngroessen.value ||
    legende.value
  );
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

  if (somethingToAdd.value) {
    snackbarStore.showSuccess(
      `Die ausgewählten Informationen wurden dem PDF Report hinzugefügt.`
    );
  }
  closeDialog();
}

/**
 * Erstellt die Zählstelleninformationen und übermittelt diese an den PDF Report.
 */
function createZaehlstelleInfo() {
  const zs = zaehlstelleStore.getZaehlstelleHeader;
  const zl = zaehlstelleStore.getAktiveZaehlung;
  const headline = assetUtil.createHeadingAsset(
    `Info für Zählstelle Nr. ${zs.nummer}`,
    BaseAssetTypeEnum.Heading3
  );
  const platz = assetUtil.createTextAsset(
    `Knoten-/Platzname: ${zl.kreuzungsname}`
  );
  const stadtbezirk = assetUtil.createTextAsset(
    `Stadtbezirk: ${zs.stadtbezirk} (${zs.stadtbezirkNummer})`
  );
  const kommentar = assetUtil.createTextAsset(
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
  const headline = assetUtil.createHeadingAsset(
    `Info zur Zählung vom ${datum} (Zs-Nr. ${zs.nummer})`,
    BaseAssetTypeEnum.Heading3
  );
  const projektname = assetUtil.createTextAsset(
    `Projektname: ${zl.projektName}`
  );
  const zaehlart = assetUtil.createTextAsset(
    `Zählart: ${zl.zaehlart} (${zaehlartText.get(zl.zaehlart)})`
  );
  const zaehldauer = assetUtil.createTextAsset(
    `Zähldauer: ${zaehldauerText.get(zl.zaehldauer)}`
  );
  const zaehlsituation = assetUtil.createTextAsset(
    `Zählsituation/ erweiterte Zählsituation: ${checkForNull(
      zl.zaehlsituation
    )} / ${checkForNull(zl.zaehlsituationErweitert)}`
  );
  const wetter = assetUtil.createTextAsset(
    `Wetter: ${wetterText.get(zl.wetter)}`
  );
  const quelle = assetUtil.createTextAsset(
    `Quelle: ${quelleText.get(zl.quelle)}`
  );
  const kommentar = assetUtil.createTextAsset(
    `Zählungskommentar: ${checkForNull(zl.kommentar)}`
  );
  let knotenarmListe = "Knotenarme:<br/>";
  zl.knotenarme.forEach((k) => {
    knotenarmListe = knotenarmListe + `${k.nummer} ${k.strassenname}<br/>\n`;
  });
  const knotenarme = assetUtil.createTextAsset(knotenarmListe);
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

  const headline = assetUtil.createHeadingAsset(
    `Kenngrößen zur Zählung vom ${datum} (Zs-Nr. ${zs.nummer})`,
    BaseAssetTypeEnum.Heading3
  );
  const zaehlungskenngroessen = assetUtil.createZaehlungskenngroessenAsset(
    `Zählungskenngrößen (Zählstelle ${zs.nummer}, ${datum})`,
    zl.id
  );

  pdfReportStore.addAssets([headline, zaehlungskenngroessen]);
}

/**
 * Erstellt die Legende und übermittelt diese an den PDF Report.
 */
function createLegende() {
  const ueberschrift = assetUtil.createHeadingAsset(
    "Legende zu den Kennzahlen",
    BaseAssetTypeEnum.Heading3
  );
  const legende = assetUtil.createTextAsset(
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
