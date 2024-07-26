<template>
  <v-dialog
    v-model="dialog"
    max-width="900px"
    @click:outside="closeDialog"
  >
    <v-card
      width="900px"
      variant="flat"
    >
      <v-card-title>
        <v-icon
          left
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
          v-model="messstelleninfo"
          title="Messstelleninformationen"
          subtitle="Folgende Informationen werden im PDF Report
                                eingetragen: Messstelle-ID, ID & Standort der
                                Messquerschnitte, Stadtbezirk,
                                Messstellenkommentar."
        />

        <pdf-report-menue-list-item
          v-model="messinfo"
          title="Messinformationen"
          subtitle="Folgende Informationen werden im PDF Report
                                eingetragen: Zeitraum von ... bis / Einzeltag,
                                Wochentag, Statistik zur Auswertung (Anzahl
                                plausible Wochentage)"
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
          @click="saveItems"
        />
        <v-spacer />
        <v-btn
          class="text-none"
          color="grey-lighten-1"
          text="Abbrechen"
          @click="closeDialog"
        />
        <v-spacer />
      </v-footer>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { computed, ref } from "vue";

import PdfReportMenueListItem from "@/components/zaehlstelle/PdfReportMenueListItem.vue";
import { useMessstelleStore } from "@/store/messstelle";
import { usePdfReportStore } from "@/store/pdfReport";
import { useSnackbarStore } from "@/store/snackbar";
import { tagesTypText } from "@/types/enum/TagesTyp";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import BaseAsset from "@/types/pdfreport/assets/BaseAsset";
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import TextAsset from "@/types/pdfreport/assets/TextAsset";
import { useDateUtils } from "@/util/DateUtils";

const dialog = defineModel<boolean>({ required: true });

const messstelleStore = useMessstelleStore();
const pdfReportStore = usePdfReportStore();
const snackbarStore = useSnackbarStore();
const dateUtils = useDateUtils();

const messstelleninfo = ref(false);
const messinfo = ref(false);
const legende = ref(false);

const messstelle = computed<MessstelleInfoDTO>(() => {
  return messstelleStore.getMessstelleInfo;
});

const options = computed<MessstelleOptionsDTO>(() => {
  return messstelleStore.getFilteroptions;
});

function closeDialog(): void {
  dialog.value = false;
  resetCheckboxes();
}

function resetCheckboxes(): void {
  messstelleninfo.value = false;
  messinfo.value = false;
  legende.value = false;
}

function saveItems(): void {
  if (messstelleninfo.value) {
    createMessstelleInfo();
  }

  if (messinfo.value) {
    createMessInfo();
  }

  if (legende.value) {
    createLegende();
  }

  snackbarStore.showSuccess(
    `Die ausgewählten Informationen wurden dem PDF Report hinzugefügt.`
  );
  closeDialog();
}

function createMessstelleInfo(): void {
  const assets: Array<BaseAsset> = [];
  const headline = new HeadingAsset(
    `Info für Messstelle Id ${messstelle.value.mstId}`,
    AssetTypesEnum.HEADING3
  );
  assets.push(headline);

  const messquerschnittIds = options.value.messquerschnittIds;
  const messquerschnittInfoDTOS = messstelle.value.messquerschnitte.filter(
    (value) => messquerschnittIds.includes(value.mqId)
  );
  if (messquerschnittInfoDTOS.length > 0) {
    let text = "Messquerschnitt(e):<br/>";
    messquerschnittInfoDTOS.forEach((value) => {
      text += `- ${value.mqId}`;
      if (value.standort) {
        text += ` - ${value.standort}`;
      }
      text += "<br/>\n";
    });
    assets.push(new TextAsset(text));
  }
  const stadtbezirk = new TextAsset(
    `Stadtbezirk: ${messstelle.value.stadtbezirk} (${messstelle.value.stadtbezirkNummer})`
  );
  assets.push(stadtbezirk);
  let kommentar = new TextAsset(
    `Messstellenkommentar: ${messstelle.value.kommentar ?? "---"}`
  );
  assets.push(kommentar);
  pdfReportStore.addAssets(assets);
}

function createMessInfo(): void {
  const assets: Array<BaseAsset> = [];

  const zeitraum = options.value.zeitraum;
  let header = `Info zur Messung vom ${dateUtils.formatDate(zeitraum[0])}`;
  if (zeitraum.length === 2) {
    header += ` bis ${dateUtils.formatDate(zeitraum[1])}`;
  }
  header += ` (Mst-Id ${messstelle.value.mstId})`;
  assets.push(new HeadingAsset(header, AssetTypesEnum.HEADING3));

  if (options.value.tagesTyp) {
    const wochentag = new TextAsset(
      `Wochentag (Tagestyp): ${tagesTypText.get(options.value.tagesTyp)}`
    );
    assets.push(wochentag);
  }
  const statistikAuswertung = new TextAsset(
    `Auswertungsstatistik: Exisitiert noch nicht.`
  );
  assets.push(statistikAuswertung);

  pdfReportStore.addAssets(assets);
}

function createLegende(): void {
  const ueberschrift = new HeadingAsset(
    "Legende zu den Kennzahlen",
    AssetTypesEnum.HEADING3
  );
  const legende = new TextAsset(
    "<p>- <b>Kraftfahrzeugverkehr (KFZ)</b>: Der Kraftfahrzeugverkehr ist die Summe der Personenkraftwagen, Krafträder, Busse, Lieferwagen, Lastkraftwagen und Lastzüge.</p>\n" +
      "<p>- <b>Schwerverkehr\t(SV)</b>: Der Schwerverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht (Summe aus Bussen, Lastkraftwagen und Lastzüge).</p>\n" +
      "<p>- <b>Güterverkehr (GV)</b>: Der Güterverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht ohne Busse (Summe aus Lastkraftwagen und Lastzüge).</p>\n" +
      "<p>- <b>Schwer- und Güterverkehrsanteil</b>: Anteil des Schwer- bzw. Güterverkehrs am Kraftfahrzeugverkehr in Prozent [%].</p>"
  );
  pdfReportStore.addAssets([ueberschrift, legende]);
}
</script>
