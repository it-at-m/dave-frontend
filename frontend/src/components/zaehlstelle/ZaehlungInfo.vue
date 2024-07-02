<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row
      no-gutters
      style="background-color: #ef9a9a"
    >
      <!-- red lighten-3 -->
      <v-col
        v-if="zaehlung.sonderzaehlung"
        cols="12"
        lg="1"
        align-self="center"
        :class="isLarge ? '' : 'px-1'"
      >
        <sonderzaehlung-icon :large="isLarge" />
      </v-col>

      <v-col
        cols="12"
        :lg="getMaxCols"
      >
        <!-- Informationen über die ausgewählte Zählung -->
        <v-sheet
          width="100%"
          height="72"
          color="white"
          class="px-4 py-2 text-primary font-weight-regular"
        >
          <v-row
            class="pa-0 ma-0"
            no-gutters
          >
            <v-col
              cols="12"
              lg="8"
            >
              <v-row no-gutters
                ><span class="pb-0 text-truncate"
                  >{{ $d(datum, "short", "de-DE") }} |
                  {{ zaehlung.projektName }}</span
                >
              </v-row>
              <v-row
                no-gutters
                class="ma-0"
              >
                <zaehlart-icon
                  :zaehlart="zaehlung.zaehlart"
                  color="primary"
                ></zaehlart-icon>
                <wetter-icon
                  :wetter="zaehlung.wetter"
                  color="primary"
                ></wetter-icon>
                <zaehldauer-icon
                  :zaehldauer="zaehlung.zaehldauer"
                  color="primary"
                ></zaehldauer-icon>
                <quelle-icon
                  :quelle="zaehlung.quelle"
                  color="primary"
                ></quelle-icon>
                <kommentar-info
                  :kommentar-zaehlstelle="kommentarZaehlstelle"
                  :kommentar-zaehlung="zaehlung.kommentar"
                  :zaehlsituation="zaehlung.zaehlsituation"
                  :zaehlsituation-erweitert="zaehlung.zaehlsituationErweitert"
                ></kommentar-info>
              </v-row>
            </v-col>
            <v-col
              lg
              class="hidden-md-and-down"
            >
              <v-spacer></v-spacer>
            </v-col>
            <v-col
              lg
              class="hidden-md-and-down"
            >
              <zaehlung-geometrie
                height="60"
                width="60"
                active-color="#1565C0"
                passive-color="#EEEEEE"
                :knotenarme="knotenarme"
              ></zaehlung-geometrie>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <!-- Informationen über die aktuellen Filter Optionen -->
      <v-sheet
        width="100%"
        min-height="50"
        color="grey-darken-1"
        class="px-4 py-3"
      >
        <v-row>
          <v-col cols="1"></v-col>
          <v-col>
            <h3 class="text-grey-lighten-1">Aktuelle Filtereinstellungen</h3>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="1"
            align-self="start"
          >
            <v-icon
              size="small"
              color="grey-lighten-1"
              >mdi-clock-time-four-outline</v-icon
            >
          </v-col>
          <v-col cols="10">
            <span class="text-grey-lighten-1"
              >Zeitauswahl:
              <span class="font-weight-medium text-white">{{ zeitblock }}</span>
              in
              <span class="font-weight-medium text-white">{{
                zeitintervall
              }}</span>
              Intervallen</span
            >
          </v-col>
        </v-row>
        <v-row
          v-if="isSpitzenstundeInZeitauswahlChosen && showSpitzenstundeInfo"
          no-gutters
        >
          <v-col
            cols="1"
            align-self="start"
          >
            <v-icon
              size="small"
              color="grey-lighten-1"
              >mdi-summit</v-icon
            >
          </v-col>
          <v-col cols="10">
            <span class="text-grey-lighten-1"
              >{{ options.zeitauswahl }}:
              <span class="font-weight-medium text-white">
                {{ startUhrzeitIntervalls }} - {{ endeUhrzeitIntervalls }} Uhr
              </span>
            </span>
          </v-col>
        </v-row>
        <v-row
          v-for="(k, index) in sortedKnotenarme"
          :key="k.nummer"
          no-gutters
          class="ma-0"
        >
          <v-col cols="1">
            <v-icon
              v-if="index === 0"
              size="small"
              color="grey-lighten-1"
              >mdi-arrow-decision</v-icon
            >
          </v-col>
          <v-col cols="9">
            <!-- Wird angezeigt in Viewport Größe lg und darüber -->
            <span
              v-if="options.vonIds.includes(k.nummer)"
              class="text-caption font-weight-medium text-white hidden-md-and-down"
              >von
            </span>
            <span
              v-if="options.nachIds.includes(k.nummer)"
              class="text-caption font-weight-medium text-white hidden-md-and-down"
              >nach
            </span>
            <!-- Wird angezeigt in Viewport Größe md und drunter -->
            <span
              v-if="options.vonIds.includes(k.nummer)"
              class="text-caption font-weight-medium text-white hidden-lg-and-up"
              >v
            </span>
            <span
              v-if="options.nachIds.includes(k.nummer)"
              class="text-caption font-weight-medium text-white hidden-lg-and-up"
              >n
            </span>
            <span class="text-caption text-grey-lighten-1"
              >{{ k.nummer }} {{ k.strassenname }}</span
            >
          </v-col>
          <v-col cols="2">
            <span class="text-caption text-grey-lighten-1 hidden-xl"
              >[ {{ himmelsRichtungen.get(k.nummer).s }} ]</span
            >
            <span class="text-caption text-grey-lighten-1 hidden-lg-and-down"
              >[ {{ himmelsRichtungen.get(k.nummer).l }} ]</span
            >
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="mt-2"
        >
          <v-col cols="1"></v-col>
          <v-col>
            <optionsmenue :zaehlung="zaehlung"></optionsmenue>
          </v-col>
        </v-row>
      </v-sheet>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import type { StartEndeUhrzeitIntervalls } from "@/types/zaehlung/StartEndeUhrzeitIntervalls";

import _ from "lodash";
import { computed, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import QuelleIcon from "@/components/zaehlstelle/icons/QuelleIcon.vue";
import SonderzaehlungIcon from "@/components/zaehlstelle/icons/SonderzaehlungIcon.vue";
import WetterIcon from "@/components/zaehlstelle/icons/WetterIcon.vue";
import ZaehlartIcon from "@/components/zaehlstelle/icons/ZaehlartIcon.vue";
import ZaehldauerIcon from "@/components/zaehlstelle/icons/ZaehldauerIcon.vue";
import KommentarInfo from "@/components/zaehlstelle/KommentarInfo.vue";
import Optionsmenue from "@/components/zaehlstelle/optionsmenue/OptionsmenueZaehlstelle.vue";
import ZaehlungGeometrie from "@/components/zaehlstelle/ZaehlungGeometrie.vue";
import { useZaehlstelleStore } from "@/store/zaehlstelle";
import { ZaehldatenIntervallToBeschreibung } from "@/types/enum/ZaehldatenIntervall";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import { useVuetify } from "@/util/useVuetify";

interface Props {
  kommentarZaehlstelle?: string;
}

withDefaults(defineProps<Props>(), {
  kommentarZaehlstelle: "",
});

const zaehlstelleStore = useZaehlstelleStore();
const display = useDisplay();

const showSpitzenstundeInfo = ref(false);
const startUhrzeitIntervalls = ref("");
const endeUhrzeitIntervalls = ref("");

const zaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

/**
 * es muss für i18n ein Datumsobjekt erzeugt werden.
 */
const datum = computed(() => {
  const d = zaehlung.value.datum;
  if (Date.parse(d)) {
    return new Date(d);
  }
  return new Date();
});

const knotenarme = computed(() => {
  return zaehlstelleStore.getKnotenarme;
});

/**
 * Holt die sortierten Knotenarme aus dem Store.
 */
const sortedKnotenarme = computed(() => {
  return zaehlstelleStore.getSortedKnotenarme;
});

/**
 * Die aktuell eingestellten Optionen werden aus dem Store geladen.
 */
const options = computed<OptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});

/**
 * Holt die lesbare Schreibweise für einen Zeitblock.
 */
const zeitblock = computed(() => {
  // Wenn es sich um keine 24h Zählung handelt, dann darf nicht der Zeitblock 0 - 24 Uhr angezeigt werden, sondern Tageswert
  if (
    zaehlung.value.zaehldauer !== Zaehldauer.DAUER_24_STUNDEN &&
    options.value.zeitblock === Zeitblock.ZB_00_24
  ) {
    return "Tageswert";
  }

  // Wurde ein stündlicher Zeitblock ausgewählt?
  if (zeitblockStuendlichInfo.has(options.value.zeitblock)) {
    return zeitblockStuendlichInfo.get(options.value.zeitblock)?.text;
  }

  // Wurde ein anderer Zeitblock ausgewählt
  if (zeitblockInfo.has(options.value.zeitblock)) {
    return zeitblockInfo.get(options.value.zeitblock)?.text;
  }

  return zeitblockInfo.get(Zeitblock.ZB_00_24)?.text;
});

/**
 * Holt die lesbare Schreibweise für das Zeitintervall.
 */
const zeitintervall = computed(() => {
  return ZaehldatenIntervallToBeschreibung.get(options.value.intervall);
});

/**
 * Gibt die Himmelsrichtungen als Map zurück.
 */
const himmelsRichtungen = computed(() => {
  return new Map([
    [1, { l: "Nord", s: "N" }],
    [2, { l: "Ost", s: "O" }],
    [3, { l: "Süd", s: "S" }],
    [4, { l: "West", s: "W" }],
    [5, { l: "Nord-Ost", s: "NO" }],
    [6, { l: "Süd-Ost", s: "SO" }],
    [7, { l: "Süd-West", s: "SW" }],
    [8, { l: "Nord-West", s: "NW" }],
  ]);
});

const isSpitzenstundeInZeitauswahlChosen = computed(() => {
  return (
    options.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ ||
    options.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
    options.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
  );
});

const startEndeUhrzeitIntervalls = computed(() => {
  return zaehlstelleStore.getStartEndeUhrzeitIntervalls;
});

const isLarge = computed(() => {
  return display.xl.value;
});

const getMaxCols = computed(() => {
  return zaehlung.value.sonderzaehlung ? 11 : 12;
});

watch(
  startEndeUhrzeitIntervalls,
  (startEndeUhrzeitIntervalle: StartEndeUhrzeitIntervalls) => {
    startUhrzeitIntervalls.value =
      startEndeUhrzeitIntervalle.startUhrzeitIntervalls;
    endeUhrzeitIntervalls.value =
      startEndeUhrzeitIntervalle.endeUhrzeitIntervalls;
    showSpitzenstundeInfo.value = !(
      _.isEmpty(startUhrzeitIntervalls.value) ||
      _.isEmpty(endeUhrzeitIntervalls.value)
    );
  },
  { immediate: true }
);
</script>
