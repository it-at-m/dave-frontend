<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row no-gutters>
      <v-sheet
        width="100%"
        min-height="50"
        color="quaternary"
        class="px-4 py-3"
      >
        <v-row>
          <v-col cols="1" />
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
              color="tertiary"
              icon="mdi-clock-time-four-outline"
            />
          </v-col>
          <v-col cols="10">
            <span class="text-grey-lighten-1"
              >Zeit:
              <span class="font-weight-medium text-white"
                >{{ zeitblock }}
              </span>
              in
              <span class="font-weight-medium text-white"
                >{{ zeitintervall }}
              </span>
              Intervallen
              <span class="font-weight-medium text-white">{{ zeitraum }}</span>
            </span>
          </v-col>
        </v-row>
        <v-row
          v-if="showWochentag"
          no-gutters
        >
          <v-col
            cols="1"
            align-self="start"
          >
            <v-icon
              size="small"
              color="tertiary"
              icon="mdi-calendar-week-outline"
            />
          </v-col>
          <v-col cols="10">
            <span class="text-grey-lighten-1"
              >Wochentag:
              <span class="font-weight-medium text-white"
                >{{ wochentag }}
              </span>
            </span>
          </v-col>
        </v-row>
        <v-row
          v-for="(messquerschnitt, index) in messstelle.messquerschnitte"
          :key="index"
          no-gutters
          class="ma-0"
        >
          <v-col cols="1">
            <v-icon
              v-if="index === 0"
              size="small"
              color="tertiary"
              icon="mdi-arrow-decision"
            />
          </v-col>
          <v-col cols="9">
            <span :class="getStyleClass(messquerschnitt.mqId)"
              >{{ messquerschnitt.mqId }} {{ messquerschnitt.standort }}</span
            >
          </v-col>
          <v-col cols="2">
            <span :class="getStyleClass(messquerschnitt.mqId)">
              {{ getHimmelsrichtungAsText(messquerschnitt.fahrtrichtung) }}
            </span>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="mt-2"
        >
          <v-spacer />
          <v-col>
            <optionsmenue-messstelle messstelle-id="messstelleId" />
          </v-col>
          <v-spacer />
        </v-row>
      </v-sheet>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { computed } from "vue";
import { useDisplay } from "vuetify";

import OptionsmenueMessstelle from "@/components/messstelle/optionsmenue/OptionsmenueMessstelle.vue";
import { useMessstelleStore } from "@/store/MessstelleStore";
import Himmelsrichtungen, {
  himmelsRichtungenTextLong,
  himmelsRichtungenTextShort,
} from "@/types/enum/Himmelsrichtungen";
import TagesTyp, { tagesTypText } from "@/types/enum/TagesTyp";
import { ZaehldatenIntervallToBeschreibung } from "@/types/enum/ZaehldatenIntervall";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import { zeitblockInfo } from "@/types/enum/Zeitblock";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import { useDateUtils } from "@/util/DateUtils";

const messstelleStore = useMessstelleStore();
const dateUtils = useDateUtils();
const display = useDisplay();

interface Props {
  messstelle: MessstelleInfoDTO;
}

defineProps<Props>();

const filterOptionsMessstelle = computed<MessstelleOptionsDTO>(() => {
  return messstelleStore.getFilteroptions;
});

const wochentag = computed<string | undefined>(() => {
  return tagesTypText.get(filterOptionsMessstelle.value.tagesTyp);
});

const showWochentag = computed<boolean>(() => {
  return (
    filterOptionsMessstelle.value.zeitraum.length === 2 &&
    filterOptionsMessstelle.value.tagesTyp !== TagesTyp.UNSPECIFIED
  );
});

const zeitraum = computed(() => {
  const zeitraum = filterOptionsMessstelle.value.zeitraum.slice();
  if (zeitraum.length == 1) {
    return `am ${dateUtils.formatDate(zeitraum[0].toString())}`;
  } else if (zeitraum.length == 2) {
    return `im Zeitraum ${dateUtils.formatDate(
      zeitraum[0]
    )} - ${dateUtils.formatDate(zeitraum[1])}`;
  }
  return "";
});

const zeitblock = computed(() => {
  let text = Zeitauswahl.TAGESWERT.valueOf();
  const existsBlock = zeitblockInfo.get(
    filterOptionsMessstelle.value.zeitblock
  );
  const existsStunde = zeitblockStuendlichInfo.get(
    filterOptionsMessstelle.value.zeitblock
  );
  if (
    Zeitauswahl.BLOCK === filterOptionsMessstelle.value.zeitauswahl &&
    existsBlock
  ) {
    text = existsBlock.title;
  } else if (
    Zeitauswahl.STUNDE === filterOptionsMessstelle.value.zeitauswahl &&
    existsStunde
  ) {
    text = existsStunde.title;
  }
  if (dateUtils.isDateRange(filterOptionsMessstelle.value.zeitraum)) {
    text = `\u00D8 ${text}`;
  }
  return text;
});

const zeitintervall = computed(() => {
  return ZaehldatenIntervallToBeschreibung.get(
    filterOptionsMessstelle.value.intervall
  );
});

function getStyleClass(mqId: string): string {
  const notIncluded = "text-caption text-grey-lighten-1";
  const included = "text-caption font-weight-medium text-white";
  return filterOptionsMessstelle.value.messquerschnittIds.includes(mqId)
    ? included
    : notIncluded;
}

function getHimmelsrichtungAsText(fahrtrichtung: Himmelsrichtungen) {
  let text = display.xl.value ? "unbekannt" : "?";
  if (fahrtrichtung) {
    if (display.xl.value) {
      text = himmelsRichtungenTextLong.get(fahrtrichtung) ?? "?";
    } else {
      text = himmelsRichtungenTextShort.get(fahrtrichtung) ?? "?";
    }
  }
  return `[ ${text} ]`;
}
</script>
