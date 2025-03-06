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
          v-if="isSingeleMessstelleSelected"
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
                                eingetragen: Messzeitraum,
                                Wochentag"
        />
        <pdf-report-menue-list-item
          v-model="legende"
          title="Legende"
          subtitle="Die Legende enthält Kurzbeschreibungen der
                                einzelnen Zählattribute, z.B. für den
                                Kraftfahrzeugverkehr, Schwerverkehr etc."
        />
        <pdf-report-menue-list-item
          v-model="statistik"
          title="Statistik zur Auswertung"
          subtitle="Folgende Informationen werden im PDF Report
                                eingetragen: Statistik zur Auswertung (Anzahl
                                plausible Wochentage)"
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
import type MessstelleAuswertungIdDTO from "@/types/messstelle/auswertung/MessstelleAuswertungIdDTO";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";

import { head } from "lodash";
import { computed, ref, watch } from "vue";

import { ApiError } from "@/api/error";
import MessstelleService from "@/api/service/MessstelleService";
import PdfReportMenueListItem from "@/components/zaehlstelle/PdfReportMenueListItem.vue";
import { useGesamtauswertungStore } from "@/store/GesamtauswertungStore";
import { usePdfReportStore } from "@/store/PdfReportStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { tagesTypText } from "@/types/enum/TagesTyp";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import BaseAsset from "@/types/pdfreport/assets/BaseAsset";
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import TextAsset from "@/types/pdfreport/assets/TextAsset";
import { useGesamtauswertungUtils } from "@/util/GesamtauswertungUtils";

const dialog = defineModel<boolean>({ required: true });

const pdfReportStore = usePdfReportStore();
const snackbarStore = useSnackbarStore();
const gesamtauswertungStore = useGesamtauswertungStore();
const gesamtauswertungUtils = useGesamtauswertungUtils();

const messstelleninfo = ref(false);
const messinfo = ref(false);
const legende = ref(false);
const statistik = ref(false);
const selectedMessstelle = ref<MessstelleInfoDTO | undefined>(undefined);

const isSingeleMessstelleSelected = computed(() => {
  return options.value.messstelleAuswertungIds.length === 1;
});
const somethingToAdd = computed(() => {
  return (
    messstelleninfo.value || messinfo.value || legende.value || statistik.value
  );
});
const options = computed<MessstelleAuswertungOptionsDTO>(() => {
  return gesamtauswertungStore.getAuswertungMessstelleOptions;
});

watch(dialog, () => {
  // Wenn der Dialog aufgemacht wird, dann sollen die Daten geladen werden
  if (dialog.value) {
    const selectedAuswertungId = head(options.value.messstelleAuswertungIds);
    if (selectedAuswertungId) {
      loadMessstelleInfo(selectedAuswertungId);
    }
  }
});

function closeDialog(): void {
  dialog.value = false;
  resetCheckboxes();
}

function resetCheckboxes(): void {
  messstelleninfo.value = false;
  messinfo.value = false;
  legende.value = false;
  statistik.value = false;
}

function saveItems(): void {
  const selectedAuswertungId = head(options.value.messstelleAuswertungIds);
  if (selectedMessstelle.value && selectedAuswertungId) {
    if (messstelleninfo.value) {
      createMessstelleInfo(selectedAuswertungId);
    }
    if (messinfo.value) {
      createMessInfo();
    }
    if (legende.value) {
      createLegende();
    }
    if (statistik.value) {
      createStatistik();
    }
    if (somethingToAdd.value) {
      snackbarStore.showSuccess(
        `Die ausgewählten Informationen wurden dem PDF Report hinzugefügt.`
      );
      closeDialog();
    }
  }
}

function loadMessstelleInfo(
  selectedAuswertungId: MessstelleAuswertungIdDTO
): void {
  MessstelleService.getMessstelleByMstId(selectedAuswertungId.mstId)
    .then((messstelleDTO) => {
      selectedMessstelle.value = messstelleDTO;
    })
    .catch((error: ApiError) => {
      snackbarStore.showApiError(error);
    });
}

function createMessstelleInfo(
  selectedAuswertungId: MessstelleAuswertungIdDTO
): void {
  if (selectedMessstelle.value) {
    const assets: Array<BaseAsset> = [];
    const headline = new HeadingAsset(
      `Info für Messstelle Id ${selectedMessstelle.value.mstId}`,
      AssetTypesEnum.HEADING3
    );
    assets.push(headline);

    const messquerschnittInfoDTOS =
      selectedMessstelle.value.messquerschnitte.filter((value) =>
        selectedAuswertungId.mqIds.includes(value.mqId)
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
      `Stadtbezirk: ${selectedMessstelle.value.stadtbezirk} (${selectedMessstelle.value.stadtbezirkNummer})`
    );
    assets.push(stadtbezirk);
    const kommentar = new TextAsset(
      `Messstellenkommentar: ${selectedMessstelle.value.kommentar ?? "---"}`
    );
    assets.push(kommentar);
    pdfReportStore.addAssets(assets);
  }
}

function createMessInfo(): void {
  if (selectedMessstelle.value) {
    const assets: Array<BaseAsset> = [];

    let header;
    if (isSingeleMessstelleSelected.value) {
      header = `Info zur Messung an der Messstelle ${selectedMessstelle.value.mstId}`;
    } else {
      const mstIds = options.value.messstelleAuswertungIds
        .flatMap((value) => {
          return value.mstId;
        })
        .join(", ");
      header = `Info zur Messung an den Messstellen ${mstIds}`;
    }
    assets.push(new HeadingAsset(header, AssetTypesEnum.HEADING3));

    const verkehrsarten = new TextAsset(
      `Verkehrsarten: ${gesamtauswertungUtils.getFahrzeugOptionsAsText(options.value.fahrzeuge)}`
    );
    assets.push(verkehrsarten);

    const messzeitraum = new TextAsset(
      `Messzeitraum: ${gesamtauswertungUtils.getYearsAsTextSorted(options.value.jahre)}`
    );
    assets.push(messzeitraum);
    const zeitintervall = new TextAsset(
      `Zeitintervall: ${gesamtauswertungUtils.getZeitraumAsTextSorted(options.value.zeitraum)}`
    );
    assets.push(zeitintervall);

    const wochentag = new TextAsset(
      `Wochentag (Tagestyp): ${tagesTypText.get(options.value.tagesTyp)}`
    );
    assets.push(wochentag);

    pdfReportStore.addAssets(assets);
  }
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

function createStatistik(): void {
  const statistikAuswertung = new TextAsset(
    `Auswertungsstatistik: Exisitiert noch nicht.`
  );
  pdfReportStore.addAsset(statistikAuswertung);
}
</script>
