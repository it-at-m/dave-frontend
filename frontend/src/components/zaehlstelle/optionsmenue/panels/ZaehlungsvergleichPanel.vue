<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div>
        <v-icon
          start
          icon="mdi-compare-horizontal"
        />
        Zählungsvergleich
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-1">
      <div
        @mouseover="hoverSelectBasisdatum = true"
        @mouseleave="hoverSelectBasisdatum = false"
      >
        <panel-header
          font-size="0.875rem"
          font-weight="bold"
          padding="10px 0 0 0"
          header-text="Datum der aktuell ausgewählten Zählung"
        />
        <span class="text">{{ basisdatum }}</span
        ><br /><br />
      </div>
      <v-row
        align="start"
        justify="center"
        dense
      >
        <v-col cols="4">
          <panel-header
            font-size="0.875rem"
            font-weight="bold"
            padding="10px 0 0 0"
            header-text="Differenzdaten anzeigen"
          />
          <panel-header
            font-size="small"
            font-weight="normal"
            header-text="(Anzeige nur im Belastungsplan)"
          />
          <div
            @mouseover="hoverCheckbox = true"
            @mouseleave="hoverCheckbox = false"
          >
            <v-checkbox
              v-model="chosenOptionsCopy.differenzdatenDarstellen"
              color="quaternary"
              :label="'Differenzdaten darstellen'"
              :disabled="isQjsOrFjsOrQu"
            />
          </div>
          <div v-if="chosenOptionsCopy.differenzdatenDarstellen">
            <v-select
              v-model="chosenOptionsCopy.vergleichszaehlungsId"
              :items="vergleichsdatum"
              :disabled="!chosenOptionsCopy.differenzdatenDarstellen"
              no-data-text="Keine Vergleichszählungen vorhanden"
              label="Vergleichsdatum Differenzdaten"
              variant="filled"
              density="comfortable"
              @mouseover="hoverSelectVergleichsdatum = true"
              @mouseleave="hoverSelectVergleichsdatum = false"
            />
          </div>

          <panel-header
            font-size="0.875rem"
            font-weight="bold"
            padding="10px 0 0 0"
            header-text="Zeitreihe"
          />

          <v-select
            v-model="chosenOptionsCopy.idVergleichszaehlungZeitreihe"
            :items="vergleichsdatumZeitreihe"
            no-data-text="Keine Vergleichszählungen vorhanden"
            label="Vergleichsdatum Zeitreihe"
            variant="filled"
            density="comfortable"
            @mouseover="hoverSelectVergleichsdatumZeitreihe = true"
            @mouseleave="hoverSelectVergleichsdatumZeitreihe = false"
          />
        </v-col>
        <v-spacer />
        <v-col cols="4">
          <v-card variant="flat">
            {{ helpTextDifferenzdatenBelastungsplan }}
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import type KeyVal from "@/types/common/KeyVal";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";
import type { ComputedRef } from "vue";

import { computed, onMounted, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Zaehlart from "@/types/enum/Zaehlart";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import { useDateUtils } from "@/util/DateUtils";
import {
  areFjsVerkehrsbeziehungenEqual,
  areQjsVerkehrsbeziehungenEqual,
  areQuVerkehrsbeziehungenEqual
} from "@/util/BewegungsbeziehungenEqualityUtils";

const chosenOptionsCopy = defineModel<ZaehlstelleOptionsDTO>({
  required: true,
});

const zaehlstelleStore = useZaehlstelleStore();
const dateUtils = useDateUtils();

const vergleichsdatumDifferenzdarstellung = ref(new Array<KeyVal>());
const vergleichsdatumZeitreihe = ref(new Array<KeyVal>());

const hoverSelectBasisdatum = ref(false);
const hoverSelectVergleichsdatum = ref(false);
const hoverCheckbox = ref(false);
const hoverSelectVergleichsdatumZeitreihe = ref(false);

onMounted(() => {
  initData();
});

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

/**
 * Ist immer das Zaehldatum der aktiven Zaehlung
 */
const basisdatum = computed(() => {
  let result = "";
  if (activeZaehlung.value.datum) {
    result = dateUtils.getShortVersionOfDate(
      dateUtils.getDatumOfString(activeZaehlung.value.datum)
    );
  }
  return result;
});

/**
 * Alle Zaehlungen an der Zaehlstelle welche für die
 * Differenzendarstellung ausgewählt werden sollen.
 */
const vergleichsdatum = computed<Array<KeyVal>>(() => {
  return vergleichsdatumDifferenzdarstellung.value;
});

const helpTextDifferenzdatenBelastungsplan = computed(() => {
  if (hoverSelectBasisdatum.value) {
    return "Das Basisdatum ist immer das Datum der aktuell ausgewählten Zählung.";
  }
  if (hoverSelectVergleichsdatum.value) {
    return "Datum der für den Vergleich ausgewählten Zählung. Hier werden nur Zählungen mit identischer Zählart zum Basisdatum angezeigt.";
  }
  if (hoverCheckbox.value) {
    return isQjsOrFjsOrQu.value
      ? "Für diese Zählung ist eine Differenzdatendarstellung nicht möglich."
      : "Für den Differenzdatenvergleich muss das Kontrollkästchen aktiviert werden.";
  }
  if (hoverSelectVergleichsdatumZeitreihe.value) {
    const part: string =
      "Der Tageswert kann immer verglichen werden, ansonsten muss in den Vergleichszählungen der gewählten Zeitblock bzw. die gewählte Stunde vorhanden sein. ";
    return isQjsOrFjsOrQu.value
      ? "Es können nur Zählungen gleicher Zählart und mit gleichen Verkehrsbeziehungen verglichen werden." +
          part
      : "Es können nur Zählungen gleicher Zählart verglichen werden." + part;
  }
  return "";
});

const isQjsOrFjsOrQu = computed<boolean>(() => {
  return [
    Zaehlart.QJS.toString(),
    Zaehlart.FJS.toString(),
    Zaehlart.QU.toString(),
  ].includes(activeZaehlung.value.zaehlart);
});

// Setzt die Auswahlelemente auf der Oberfläche zurück, oder mit den
//  übergebenen Werten im Optionsobjekt
function initData() {
  vergleichsdatumCalculator();
  zeitreihenVergleichsdatumCalculator();
}

/**
 * Diese Methode ermittelt alle Zählungen für die Differenzendarstellung.
 * Die für die Differenzendarstellung relevanten Zählungen sind:
 * - Welche nicht die selbe ID bezsitzt wie die Basiszählung.
 * - Welche die selbe Zählart besitzt.
 * - Welche den gewählten Zeitblock besitzt.
 */
function vergleichsdatumCalculator(): void {
  const result: Array<KeyVal> = new Array<KeyVal>();
  const zaehlungen: Array<LadeZaehlungDTO> = zaehlstelleStore.getZaehlungen;
  if (activeZaehlung.value.id) {
    zaehlungen.forEach((zaehl) => {
      if (
        zaehl.id !== activeZaehlung.value.id &&
        zaehl.zaehlart === activeZaehlung.value.zaehlart &&
        zaehl.sonderzaehlung === activeZaehlung.value.sonderzaehlung &&
        (containsZeitblock(zaehl, chosenOptionsCopy.value.zeitblock) ||
          chosenOptionsCopy.value.zeitauswahl.toString() ===
            Zeitauswahl.TAGESWERT.toString())
      ) {
        result.push({
          title: dateUtils.getShortVersionOfDate(
            dateUtils.getDatumOfString(zaehl.datum)
          ),
          value: zaehl.id,
        });
      }
    });
  }
  vergleichsdatumDifferenzdarstellung.value = result;
}

/**
 * Diese Methode ermittelt alle Zählungen für die Zeitreihendarstellung.
 * Die für die Zeitreihendarstellung relevanten Zählungen sind:
 * - Welche älter als oder gleich alt wie die Basiszählung sind.
 * - Welche die selbe Zählart besitzt.
 * - Welche den gewählten Zeitblock besitzt.
 * - Bei QU, QJS, FJS: Welche übereinstimmende Bewegungsbeziehungen/Pfeile besitzt.
 * */
function zeitreihenVergleichsdatumCalculator(): void {
  const result: Array<KeyVal> = new Array<KeyVal>();
  const zaehlungen: Array<LadeZaehlungDTO> = zaehlstelleStore.getZaehlungen;
  if (
    activeZaehlung.value.id != undefined &&
    activeZaehlung.value.datum != undefined
  ) {
    zaehlungen.forEach((zaehl) => {
      if (
        zaehl.id !== activeZaehlung.value.id &&
        zaehl.datum <= activeZaehlung.value!.datum &&
        zaehl.zaehlart === activeZaehlung.value.zaehlart &&
        zaehl.sonderzaehlung === activeZaehlung.value.sonderzaehlung &&
        (containsZeitblock(zaehl, chosenOptionsCopy.value.zeitblock) ||
          chosenOptionsCopy.value.zeitauswahl.toString() ===
            Zeitauswahl.TAGESWERT.toString()) &&
        checkBewegungsbeziehungen(zaehl, activeZaehlung)
      ) {
        result.push({
          title: dateUtils.getShortVersionOfDate(
            dateUtils.getDatumOfString(zaehl.datum)
          ),
          value: zaehl.id,
        });
      }
    });
  }
  vergleichsdatumZeitreihe.value = result;
  // Setze idVergleichszaehlungZeitreihe zurück (auf null), wenn der Wert nicht im Array result enthalten ist
  const selectedVergleichszaehlungId =
    chosenOptionsCopy.value.idVergleichszaehlungZeitreihe;
  if (
    selectedVergleichszaehlungId != null &&
    !result.some((item) => item.value === selectedVergleichszaehlungId)
  ) {
    chosenOptionsCopy.value.idVergleichszaehlungZeitreihe = null;
  }
}

/**
 * Prüfung bei Zählart QU, QJS oder FJS: Alle Bewegungsbeziehungen/Pfeile müssen mit der aktive Zählung übereinstimmen.
 * Für alle anderen Verkehrsarten wird immer true zurückgegeben.
 *
 * @param zaehlung zu prüfende Zaehlung
 * @param activeZaehlung aktive Zaehlung
 */
function checkBewegungsbeziehungen(
  zaehlung: LadeZaehlungDTO,
  activeZaehlung: ComputedRef<LadeZaehlungDTO>
): boolean {
  // Bei QU: Prüfe auf Knotenarm und Richtung
  if (zaehlung.zaehlart === Zaehlart.QU.toString()) {
    return (
        areQuVerkehrsbeziehungenEqual(activeZaehlung.value.querungsverkehr, zaehlung.querungsverkehr)
    );
  }
  // Bei FJS: Prüfe auf Knotenarm, Richtung und Straßenseite
  if (zaehlung.zaehlart === Zaehlart.FJS.toString()) {
    return (
      areFjsVerkehrsbeziehungenEqual(activeZaehlung.value.laengsverkehr, zaehlung.laengsverkehr)
    );
  }
  // Bei QJS: Prüfe auf Von, Nach und Straßenseite
  if (zaehlung.zaehlart === Zaehlart.QJS.toString()) {
    return (
      areQjsVerkehrsbeziehungenEqual(activeZaehlung.value.verkehrsbeziehungen, zaehlung.verkehrsbeziehungen)
    );
  }
  return true; // Standard-Rückgabewert, wenn andere Zaehlart
}

/**
 * Prüft ob die Zählung den Zeitblock im zweiten Parameter besitzt.
 *
 * @param zaehlung zur Prüfung.
 * @param zeitblockInOptions zum Prüfen.
 * @return true falls die Zählung den Zeitblock im zweiten Parameter besitzt, anderfalls false.
 */
function containsZeitblock(
  zaehlung: LadeZaehlungDTO,
  zeitblockInOptions: string
): boolean {
  return (
    zaehlung.zeitauswahl.blocks.some(
      (zeitblock) => zeitblock.toString() === zeitblockInOptions
    ) ||
    zaehlung.zeitauswahl.hours.some(
      (zeitblockStuendl) => zeitblockStuendl.toString() === zeitblockInOptions
    )
  );
}

// Wenn sich die Optionen ändern, dann soll sich auch die Auswahl auf der
// Oberfläche ändern.
watch(
  chosenOptionsCopy,
  () => {
    initData();
  },
  { deep: true }
);
</script>
