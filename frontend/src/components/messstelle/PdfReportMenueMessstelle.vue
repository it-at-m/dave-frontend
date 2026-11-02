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
          v-model="messstelleninfo"
          title="Messstelleninformationen"
          subtitle="Folgende Informationen werden im PDF Report
                                eingetragen: Messstellen-ID, ID & Standort der
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
import type { BaseAsset } from "@/api/client";
import type MessstelleInfoType from "@/types/messstelle/MessstelleInfoType";
import type MessstelleOptions from "@/types/messstelle/MessstelleOptions";

import { computed, ref } from "vue";

import { BaseAssetTypeEnum, TagesTyp } from "@/api/client";
import PdfReportMenueListItem from "@/components/zaehlstelle/PdfReportMenueListItem.vue";
import { useMessstelleStore } from "@/store/MessstelleStore";
import { usePdfReportStore } from "@/store/PdfReportStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { tagesTypText } from "@/types/enum/TagesTypText";
import { useAssetUtil } from "@/util/AssetUtil";
import { useDateUtils } from "@/util/DateUtils";
import { useEnumUtils } from "@/util/EnumUtils";

const dialog = defineModel<boolean>({ required: true });

const messstelleStore = useMessstelleStore();
const pdfReportStore = usePdfReportStore();
const snackbarStore = useSnackbarStore();
const dateUtils = useDateUtils();
const assetUtil = useAssetUtil();

const messstelleninfo = ref(false);
const messinfo = ref(false);
const legende = ref(false);

const messstelle = computed<MessstelleInfoType>(() => {
  return messstelleStore.getMessstelleInfo;
});

const options = computed<MessstelleOptions>(() => {
  return messstelleStore.getFilteroptions;
});

const somethingToAdd = computed(() => {
  return messstelleninfo.value || messinfo.value || legende.value;
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

  if (somethingToAdd.value) {
    snackbarStore.showSuccess(
      `Die ausgewählten Informationen wurden dem PDF Report hinzugefügt.`
    );
  }
  closeDialog();
}

function createMessstelleInfo(): void {
  const assets: Array<BaseAsset> = [];
  const headline = assetUtil.createHeadingAsset(
    `Info für Messstelle Id ${messstelle.value.mstId}`,
    BaseAssetTypeEnum.Heading3
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
    assets.push(assetUtil.createTextAsset(text));
  }
  const stadtbezirk = assetUtil.createTextAsset(
    `Stadtbezirk: ${messstelle.value.stadtbezirk} (${messstelle.value.stadtbezirkNummer})`
  );
  assets.push(stadtbezirk);
  const kommentar = assetUtil.createTextAsset(
    `Messstellenkommentar: ${messstelle.value.kommentar ?? "---"}`
  );
  assets.push(kommentar);
  pdfReportStore.addAssets(assets);
}

function createMessInfo(): void {
  const assets: Array<BaseAsset> = [];

  const zeitraum = options.value.zeitraum;
  let header = `Info zur Messung vom ${dateUtils.formatDate(zeitraum[0])}`;
  if (dateUtils.isDateRange(options.value.zeitraum)) {
    header += ` bis ${dateUtils.formatDate(zeitraum[1])}`;
  }
  header += ` (Mst-Id ${messstelle.value.mstId})`;
  assets.push(assetUtil.createHeadingAsset(header, BaseAssetTypeEnum.Heading3));

  if (
    dateUtils.isDateRange(options.value.zeitraum) &&
    options.value.tagesTyp !== TagesTyp.Unspecified
  ) {
    const t = useEnumUtils().toTagesTyp(options.value.tagesTyp);
    const wochentag = assetUtil.createTextAsset(
      t ? `Wochentag: ${tagesTypText.get(t)}` : `Wochentag: unbekannt`
    );
    assets.push(wochentag);
  }
  if (dateUtils.isDateRange(options.value.zeitraum)) {
    const statistikAuswertung = assetUtil.createTextAsset(
      `Auswertungsstatistik: Von den ausgewählten ${messstelleStore.getRequestedMeasuringDays} Tagen ${getChosenWochentageNumberText.value} in die Auswertung eingeflossen.`
    );
    assets.push(statistikAuswertung);
  }

  pdfReportStore.addAssets(assets);
}

const getChosenWochentageNumberText = computed(() => {
  if (messstelleStore.getIncludedMeasuringDays === 1) {
    return "ist 1 Tag";
  } else {
    return `sind ${messstelleStore.getIncludedMeasuringDays} Tage`;
  }
});

function createLegende(): void {
  const ueberschrift = assetUtil.createHeadingAsset(
    "Legende zu den Kennzahlen",
    BaseAssetTypeEnum.Heading3
  );
  const legende = assetUtil.createTextAsset(
    "<p>- <b>Kraftfahrzeugverkehr (KFZ)</b>: Der Kraftfahrzeugverkehr ist die Summe der Personenkraftwagen, Krafträder, Busse, Lieferwagen, Lastkraftwagen und Lastzüge.</p>\n" +
      "<p>- <b>Schwerverkehr\t(SV)</b>: Der Schwerverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht (Summe aus Bussen, Lastkraftwagen und Lastzüge).</p>\n" +
      "<p>- <b>Güterverkehr (GV)</b>: Der Güterverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht ohne Busse (Summe aus Lastkraftwagen und Lastzüge).</p>\n" +
      "<p>- <b>Schwer- und Güterverkehrsanteil</b>: Anteil des Schwer- bzw. Güterverkehrs am Kraftfahrzeugverkehr in Prozent [%].</p>"
  );
  pdfReportStore.addAssets([ueberschrift, legende]);
}
</script>
