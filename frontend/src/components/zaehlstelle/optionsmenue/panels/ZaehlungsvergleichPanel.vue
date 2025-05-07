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
          <v-checkbox
            v-model="differenzdatenDarstellen"
            color="quaternary"
            :label="'Differenzdaten darstellen'"
            @mouseover="hoverCheckbox = true"
            @mouseleave="hoverCheckbox = false"
          />
          <div v-if="differenzdatenDarstellen">
            <v-select
              v-model="vergleichszaehlungsId"
              :items="vergleichsdatum"
              :disabled="!differenzdatenDarstellen"
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
            v-model="idVergleichszaehlungZeitreihe"
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
          <v-card flat>
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
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";

import { computed, onMounted, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import { useDateUtils } from "@/util/DateUtils";

interface Props {
  zaehlung: LadeZaehlungDTO;
}

const props = defineProps<Props>();
const zaehlstelleStore = useZaehlstelleStore();
const dateUtils = useDateUtils();
const emits = defineEmits<{
  (e: "vergleichszaehlungsId", v: string): void;
  (e: "differenzdatenDarstellen", v: boolean): void;
  (e: "idVergleichszaehlungZeitreihe", v: string): void;
}>();

const vergleichszaehlungsId = ref("");
const differenzdatenDarstellen = ref(false);
const vergleichsdatumDifferenzdarstellung = ref(new Array<KeyVal>());

// Zeitreihe
const vergleichsdatumZeitreihe = ref(new Array<KeyVal>());
const idVergleichszaehlungZeitreihe = ref("");

const currentZeitblock = ref("");
const currentZeitauswahl = ref(Zeitauswahl.TAGESWERT.valueOf());

const hoverSelectBasisdatum = ref(false);
const hoverSelectVergleichsdatum = ref(false);
const hoverCheckbox = ref(false);
const hoverSelectVergleichsdatumZeitreihe = ref(false);

onMounted(() => {
  update(options.value);
});

const options = computed<OptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});

const zeitblock = computed(() => {
  return zaehlstelleStore.getZeitblock;
});

const zeitauswahl = computed(() => {
  return zaehlstelleStore.getZeitauswahl;
});

/**
 * Ist immer das Zaehldatum der aktiven Zaehlung
 */
const basisdatum = computed(() => {
  let result = "";
  if (props.zaehlung.datum) {
    result = dateUtils.getShortVersionOfDate(
      dateUtils.getDatumOfString(props.zaehlung.datum)
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
    return "Für den Differenzdatenvergleich muss das Kontrollkästchen aktiviert werden.";
  }
  if (hoverSelectVergleichsdatumZeitreihe.value) {
    return (
      "Datum der Zählung, bis zu der die Zeitreihe angezeigt werden soll (inklusive).\n" +
      "Es können nur Zählungen gleicher Zählart verglichen werden. Der Tageswert kann immer verglichen werden, ansonsten muss in den Vergleichszählungen der gewählten Zeitblock bzw. die gewählte Stunde vorhanden sein."
    );
  }
  return "";
});

// Setzt die Auswahlelemente auf der Oberfläche zurück, oder mit den
//  übergebenen Werten im Optionsobjekt
function update(newOptions: OptionsDTO) {
  vergleichsdatumCalculator(newOptions.zeitblock, newOptions.zeitauswahl);
  zeitreihenVergleichsdatumCalculator(
    newOptions.zeitblock,
    newOptions.zeitauswahl
  );
  newOptions.vergleichszaehlungsId === null
    ? (vergleichszaehlungsId.value = "")
    : (vergleichszaehlungsId.value = newOptions.vergleichszaehlungsId);
  newOptions.differenzdatenDarstellen === null
    ? (differenzdatenDarstellen.value = false)
    : (differenzdatenDarstellen.value = newOptions.differenzdatenDarstellen);
  newOptions.idVergleichszaehlungZeitreihe === null
    ? (idVergleichszaehlungZeitreihe.value = "")
    : (idVergleichszaehlungZeitreihe.value =
        newOptions.idVergleichszaehlungZeitreihe);
}

/**
 * Diese Methode ermittelt alle Zählungen für die Differenzendarstellung.
 * Die für die Differenzendarstellung relevanten Zählungen sind:
 * - Welche nicht die selbe ID bezsitzt wie die Basiszählung.
 * - Welche die selbe Zählart besitzt.
 * - Welche den gewählten Zeitblock besitzt.
 *
 * @param newZeitblock zur Ermittlung der relevanten Zählungen.
 * @param newZeitauswahl zur Ermittlung der relevanten Zählungen.
 */
function vergleichsdatumCalculator(
  newZeitblock: string,
  newZeitauswahl: string
): void {
  const result: Array<KeyVal> = new Array<KeyVal>();
  const zaehlungen: Array<LadeZaehlungDTO> = zaehlstelleStore.getZaehlungen;
  if (props.zaehlung.id) {
    zaehlungen.forEach((zaehl) => {
      if (
        zaehl.id !== props.zaehlung.id &&
        zaehl.zaehlart === props.zaehlung.zaehlart &&
        zaehl.sonderzaehlung === props.zaehlung.sonderzaehlung &&
        (containsZeitblock(zaehl, newZeitblock) ||
          newZeitauswahl.toString() === Zeitauswahl.TAGESWERT.toString())
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
 * Die für die Differenzendarstellung relevanten Zählungen sind:
 * - Welche älter als oder gleich alt wie die Basiszählung sind.
 * - Welche die selbe Zählart besitzt.
 * - Welche den gewählten Zeitblock besitzt.
 * */
function zeitreihenVergleichsdatumCalculator(
  newZeitblock: string,
  newZeitauswahl: string
): void {
  const result: Array<KeyVal> = new Array<KeyVal>();
  const zaehlungen: Array<LadeZaehlungDTO> = zaehlstelleStore.getZaehlungen;
  if (props.zaehlung.id != undefined && props.zaehlung.datum != undefined) {
    zaehlungen.forEach((zaehl) => {
      if (
        zaehl.id !== props.zaehlung.id &&
        zaehl.datum <= props.zaehlung!.datum &&
        zaehl.zaehlart === props.zaehlung.zaehlart &&
        zaehl.sonderzaehlung === props.zaehlung.sonderzaehlung &&
        (containsZeitblock(zaehl, newZeitblock) ||
          newZeitauswahl.toString() === Zeitauswahl.TAGESWERT.toString())
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
watch(options, (newOptions: OptionsDTO) => {
  update(newOptions);
});

watch(vergleichszaehlungsId, () => {
  emits("vergleichszaehlungsId", vergleichszaehlungsId.value);
});

watch(differenzdatenDarstellen, () => {
  emits("differenzdatenDarstellen", differenzdatenDarstellen.value);
});

watch(idVergleichszaehlungZeitreihe, () => {
  emits("idVergleichszaehlungZeitreihe", idVergleichszaehlungZeitreihe.value);
});

watch(zeitblock, (newZeitblock: string) => {
  currentZeitblock.value = newZeitblock;
  vergleichsdatumCalculator(currentZeitblock.value, currentZeitauswahl.value);
  zeitreihenVergleichsdatumCalculator(
    currentZeitblock.value,
    currentZeitauswahl.value
  );
});

watch(zeitauswahl, (newZeitauswahl: string) => {
  currentZeitauswahl.value = newZeitauswahl;
  vergleichsdatumCalculator(currentZeitblock.value, currentZeitauswahl.value);
  zeitreihenVergleichsdatumCalculator(
    currentZeitblock.value,
    currentZeitauswahl.value
  );
});
</script>
