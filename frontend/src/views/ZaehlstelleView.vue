<template>
  <v-sheet class="dave-default">
    <v-row no-gutters>
      <v-col cols="3">
        <v-sheet
          :min-height="leftHeightVh"
          width="100%"
          color="grey-lighten-3"
          class="d-flex flex-column"
        >
          <!-- Basisinformation zur Zählstelle -->
          <zaehlstelle-info
            :height="headerHeightVh"
            :minheight="headerHeightVh"
            :nummer="zaehlstelle.nummer"
            :kreuzungsname="kreuzungsname"
            :stadtbezirk-nummer="`${zaehlstelle.stadtbezirkNummer}`"
            :stadtbezirk="zaehlstelle.stadtbezirk"
          />
          <!-- Information zur aktiven Zählung -->
          <zaehlung-info
            v-show="hasZaehlungen"
            :kommentar-zaehlstelle="zaehlstelle.kommentar"
          />
          <!-- Liste der nicht aktiven Zählungen, die zur Zählstelle gehören -->
          <zaehlungen-timeline
            v-show="hasZaehlungen"
            :external-query="externalQuery"
            :listheight="timelineHeightVh"
          />
        </v-sheet>
      </v-col>
      <v-col cols="9">
        <zaehlstelle-map
          :z-id="zaehlstelleId"
          :latlng="latlng"
          :zoom="17"
          :height="headerHeightVh"
          :minheight="headerHeightVh"
          width="100%"
          @zeahlart-ausgewaehlt="setZaehlart($event)"
        />
        <!-- Die Diagramme -->
        <zaehldaten-diagramme
          :height="rightHeightVh"
          :content-height="rightContentHeightVh"
          :has-zaehlungen="hasZaehlungen"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts" setup>
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";

import { computed, onMounted, ref } from "vue";
import { useDisplay } from "vuetify";

import ZaehlstellenService from "@/api/service/ZaehlstellenService";
import ZaehlstelleMap from "@/components/map/ZaehlstelleMap.vue";
import ZaehldatenDiagramme from "@/components/zaehlstelle/ZaehldatenDiagramme.vue";
import ZaehlstelleInfo from "@/components/zaehlstelle/ZaehlstelleInfo.vue";
import ZaehlungenTimeline from "@/components/zaehlstelle/ZaehlungenTimeline.vue";
import ZaehlungInfo from "@/components/zaehlstelle/ZaehlungInfo.vue";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

const zaehlstelle = ref(
  DefaultObjectCreator.createDefaultZaehlstelleHeaderDTO()
);

const hasZaehlungen = ref(true);
const externalQuery = ref("");
const zaehlstelleStore = useZaehlstelleStore();
const display = useDisplay();

interface Props {
  zaehlstelleId: string;
}

const props = defineProps<Props>();

// =============
// Höhenberechnungen
// =============
/**
 * Berechnet die Höhe der AppBar (50px) in "vh" (Höhe Viewport in Hundert)
 */
const appBarHeight = computed(() => {
  return 50 / (display.height.value / 100);
});

/**
 * Berechnet die Höhe des Headers (fix 160px) in "vh" (Höhe Viewport in Hundert)
 */
const headerHeight = computed(() => {
  return 160 / (display.height.value / 100);
});

/**
 * Berechnet die Höhe des Info Containers für die aktive Zählung. Die Höhe dieses
 * Fensters ist abhängig von der Anzahl der Knotenarme
 *
 * - Die Überschrift ist 72px hoch.
 * - Jeder Knotenarm ist 24px hoch.
 * - Der Container für die Optionseinstellungen ist leer 144px hoch.
 *
 * Beispiel mit 5 Knotenarmen:
 * (72px + 160px + 5*24px) / (breakpoint.height / 100)
 */
const zInfoHeight = computed(() => {
  const z = zaehlstelleStore.getAktiveZaehlung;
  let anzahlKnotenarme = 0;
  if (z.knotenarme) {
    anzahlKnotenarme = z.knotenarme.length;
  }
  return (72 + 144 + anzahlKnotenarme * 24) / (display.height.value / 100);
});

/**
 * Die Liste der nicht aktiven Zählungen bekommt den Platz, der auf dem Bildschirm noch übrig ist. Entsprechend
 * werden zur Berechnung von 100 (volle Höhe) die Werte der Container abgezogen, die über der Timeline platziert
 * sind.
 *
 * Da die Scrollbar nur in der Liste der Zählungen angezeigt wird, muss noch die Höhe des Suchfeldes (56px) in
 * VH umgerechnet und abgezogen werden.
 */
const timelineHeight = computed(() => {
  return (
    100 -
    appBarHeight.value -
    headerHeight.value -
    zInfoHeight.value -
    56 / (display.height.value / 100)
  );
});

// ===================
// Ab hier werden dann die VH Werte als String zurück gegeben
// ===================
/**
 * Wandelt die Header Höhe in VH um.
 */
const headerHeightVh = computed(() => {
  return headerHeight.value + "vh";
});

/**
 * Berechnet die Höhe der linken Spalte in "vh"
 */
const leftHeightVh = computed(() => {
  return 100 - appBarHeight.value + "vh";
});

/**
 * Berechnet die Höhe der Inhaltsfläche "vh" - ohne Karte
 */
const rightHeightVh = computed(() => {
  return 100 - headerHeight.value - appBarHeight.value + "vh";
});

/**
 * Berechnet die Höhe der Fläche unter den Tabs (72px hoch) in "vh"
 */
const rightContentHeightVh = computed(() => {
  const h =
    100 -
    headerHeight.value -
    appBarHeight.value -
    72 / (display.height.value / 100);

  return h + "vh";
});

/**
 * Gibt die Höhe der Timeline als vh Wert zurück.
 */
const timelineHeightVh = computed(() => {
  return timelineHeight.value + "vh";
});

/**
 * Die Daten zur Zählstelle und der ausgewählten Zählung wird über die
 * API geladen.
 */

onMounted(() => {
  // Die Informationen zur Zählstelle werden geladen
  ZaehlstellenService.getById(props.zaehlstelleId).then((loadedZaehlstelle) => {
    const zaehlungen = new Array<LadeZaehlungDTO>();
    Object.assign(zaehlungen, loadedZaehlstelle.zaehlungen);
    // Die Zählungen und id der aktiven Zählung werden an den Store übergeben.
    // Dort werden die Daten weiter verarbeitet.
    zaehlstelleStore.setZaehlungen(zaehlungen);
    zaehlstelleStore.setZaehlstelleHeader(loadedZaehlstelle);
    zaehlstelle.value = loadedZaehlstelle;
    // Prüft, ob die Zählstelle Zählungen hat. Falls nicht, werden auch keine
    // Diagramme angezeigt.
    if (zaehlungen.length === 0) {
      hasZaehlungen.value = false;
    }
    // die Zählungsoptionen werden zurück gesetzt
    if (!zaehlstelleStore.isHistory) {
      zaehlstelleStore.resetFilteroptions();
    }
  });
});

const kreuzungsname = computed(() => {
  let kreuzungsname = "";
  const aktiveZaehlung: LadeZaehlungDTO = zaehlstelleStore.getAktiveZaehlung;
  if (aktiveZaehlung) {
    kreuzungsname = aktiveZaehlung.kreuzungsname;
  }

  return kreuzungsname;
});

/**
 * Hier kommt das Event an, wenn jemand in der Karte eine bestimmte Zählart klickt
 */
const setZaehlart = (zaehlart: string) => {
  externalQuery.value = zaehlart;
};

const latlng = computed(() => {
  if (zaehlstelle.value.lat && zaehlstelle.value.lng) {
    return [zaehlstelle.value.lat, zaehlstelle.value.lng];
  }
  return [];
});
</script>
