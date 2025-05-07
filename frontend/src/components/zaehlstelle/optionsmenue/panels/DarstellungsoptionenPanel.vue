<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div>
        <v-icon
          start
          icon="mdi-cogs"
        />
        Darstellungsoptionen
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-1">
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Belastungsplan"
      />

      <v-row
        align="start"
        justify="center"
        dense
      >
        <v-col cols="4">
          <v-checkbox
            v-model="werteHundertRunden"
            class="mb-3"
            :label="'Werte auf 100 Runden'"
            hide-details
            color="quaternary"
            density="compact"
            @mouseover="hoverWerteHundertRunden = true"
            @mouseleave="hoverWerteHundertRunden = false"
          />
          <v-slider
            v-model="sizeBelastungsplan"
            color="primary"
            density="compact"
            track-size="2"
            thumb-size="12"
            label="Belastungsplangröße"
            :max="maxSizeBelastungsplanSvg"
            :min="minSizeBelastungsplanSvg"
            @mouseover="hoverSizeBelastungsplan = true"
            @mouseleave="hoverSizeBelastungsplan = false"
          />
        </v-col>
        <v-col cols="4">
          <v-checkbox
            v-model="blackPrintMode"
            class="mb-3"
            :label="'schwarz-weiß Druckausgabe'"
            hide-details
            color="quaternary"
            density="compact"
            @mouseover="hoverBlackPrintMode = true"
            @mouseleave="hoverBlackPrintMode = false"
          />
        </v-col>
        <v-col cols="4">
          <v-card flat>
            {{ helpTextBelastungsplan }}
          </v-card>
        </v-col>
      </v-row>

      <v-divider />
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 10px 0"
        header-text="Ganglinie"
      />

      <v-row
        align="start"
        justify="center"
        dense
      >
        <v-col cols="4">
          <v-text-field
            v-model="ganglinieYAchse1MaxValue"
            :label="'Y-Achse 1'"
            :rules="[
              (toCheck: string) =>
                rules.onlyPositivNumbersBiggerThan(toCheck, MIN_VALUE),
            ]"
            type="number"
            density="compact"
            clearable
            @blur="checkRangeYAchse1"
            @mouseover="hoverYAchse1 = true"
            @mouseleave="hoverYAchse1 = false"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="ganglinieYAchse2MaxValue"
            :label="'Y-Achse 2 (%)'"
            type="number"
            :rules="[
              (toCheck: string) =>
                rules.onlyNumbersInRange(toCheck, MIN_VALUE, MAX_VALUE_EXCLUDE),
            ]"
            density="compact"
            clearable
            @blur="checkRangeYAchse2"
            @mouseover="hoverYAchse2 = true"
            @mouseleave="hoverYAchse2 = false"
          />
        </v-col>
        <v-col cols="4">
          <v-card flat>
            {{ helpTextGanglinie }}
          </v-card>
        </v-col>
      </v-row>

      <v-divider />
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Listenausgabe"
      />
      <v-row
        align="start"
        justify="center"
        dense
        no-gutters
      >
        <v-col cols="4">
          <v-checkbox
            v-model="stundensumme"
            :label="'Stundensumme'"
            hide-details
            color="quaternary"
            density="compact"
            @mouseover="hoverStundensumme = true"
            @mouseleave="hoverStundensumme = false"
          />
          <v-checkbox
            v-model="blocksumme"
            class="mb-3"
            :label="'Blocksumme'"
            hide-details
            color="quaternary"
            density="compact"
            @mouseover="hoverBlocksumme = true"
            @mouseleave="hoverBlocksumme = false"
          />
        </v-col>
        <v-col cols="4">
          <v-checkbox
            v-model="tagessumme"
            :label="'Tagessumme'"
            hide-details
            color="quaternary"
            density="compact"
            @mouseover="hoverTagessumme = true"
            @mouseleave="hoverTagessumme = false"
          />
          <v-checkbox
            v-model="spitzenstunde"
            class="mb-3"
            :label="'Spitzenstunde'"
            hide-details
            color="quaternary"
            density="compact"
            @mouseover="hoverSpitzenstunde = true"
            @mouseleave="hoverSpitzenstunde = false"
          />
        </v-col>
        <v-col cols="4">
          <v-card flat>
            {{ helpTextListenausgabe }}
          </v-card>
        </v-col>
      </v-row>

      <panel-header
        v-if="!isZeitauswahlForSpitzenstunde && spitzenstunde"
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Detailauswahl Listenausgabe"
      />
      <v-row
        v-if="!isZeitauswahlForSpitzenstunde && spitzenstunde"
        align="start"
        justify="center"
        dense
        no-gutters
        @mouseover="hoverSpitzenstundeDetailauswahl = true"
        @mouseleave="hoverSpitzenstundeDetailauswahl = false"
      >
        <v-spacer />
        <v-col cols="4">
          <v-checkbox
            v-model="spitzenstundeKfz"
            :label="'Spitzenstunde KFZ'"
            hide-details
            color="quaternary"
            density="compact"
            :disabled="isTypeKfzDisabled()"
          />
          <v-checkbox
            v-model="spitzenstundeRad"
            :label="'Spitzenstunde Rad'"
            hide-details
            color="quaternary"
            density="compact"
            :disabled="isTypeRadDisabled()"
          />
          <v-checkbox
            v-model="spitzenstundeFuss"
            :label="'Spitzenstunde Fuß'"
            hide-details
            color="quaternary"
            density="compact"
            :disabled="isTypeFussDisabled()"
          />
        </v-col>
        <v-col cols="4">
          <v-card flat>
            {{ helpTextDetailauswahlListenausgabe }}
          </v-card>
        </v-col>
      </v-row>

      <!-- Zeitreihe -->
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Zeitreihe"
      />

      <v-row
        align="start"
        justify="center"
        dense
      >
        <v-col cols="4">
          <v-checkbox
            v-model="zeitreiheGesamt"
            class="mb-3"
            :label="'Summe alle Verkehrsarten anzeigen'"
            hide-details
            color="quaternary"
            density="compact"
            @mouseover="hoverZeitreiheGesamt = true"
            @mouseleave="hoverZeitreiheGesamt = false"
          />
        </v-col>
        <v-spacer />
        <v-col cols="4">
          <v-card flat>
            {{ helpTextZeitreihe }}
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";

import _ from "lodash";
import { computed, onMounted, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import { useValidationRules } from "@/util/ValidationRules";
import { useZaehlstelleUtils } from "@/util/ZaehlstelleUtils";

const SPITZENSTUNDE = "Spitzenstunde";
const MIN_VALUE = 0;
const MAX_VALUE_EXCLUDE = 101;

const zaehlstelleStore = useZaehlstelleStore();
const zaehlstelleUtils = useZaehlstelleUtils();
const rules = useValidationRules();

const emits = defineEmits<{
  (e: "werteHundertRunden", v: boolean): void;
  (e: "blackPrintMode", v: boolean): void;
  (e: "stundensumme", v: boolean): void;
  (e: "blocksumme", v: boolean): void;
  (e: "tagessumme", v: boolean): void;
  (e: "spitzenstunde", v: boolean): void;
  (e: "spitzenstundeKfz", v: boolean): void;
  (e: "spitzenstundeRad", v: boolean): void;
  (e: "spitzenstundeFuss", v: boolean): void;
  (e: "ganglinieYAchse1MaxValue", v: number | null): void;
  (e: "ganglinieYAchse2MaxValue", v: number | null): void;
  (e: "zeitreiheGesamt", v: boolean): void;
}>();

// Belastungsplan
const werteHundertRunden = ref(false);
const blackPrintMode = ref(false);
const sizeBelastungsplan = ref(0);

// Ganglinie
const ganglinieYAchse1MaxValue = ref<number | null>(null);
const ganglinieYAchse2MaxValue = ref<number | null>(null);

// Listenausgabe
const stundensumme = ref(false);
const blocksumme = ref(false);
const tagessumme = ref(false);
const spitzenstunde = ref(false);
const spitzenstundeKfz = ref(false);
const spitzenstundeRad = ref(false);
const spitzenstundeFuss = ref(false);

// Zeitreihe
const zeitreiheGesamt = ref(false);

const hoverWerteHundertRunden = ref(false);
const hoverSizeBelastungsplan = ref(false);
const hoverBlackPrintMode = ref(false);
const hoverStundensumme = ref(false);
const hoverBlocksumme = ref(false);
const hoverTagessumme = ref(false);
const hoverSpitzenstunde = ref(false);
const hoverSpitzenstundeDetailauswahl = ref(false);
const hoverYAchse1 = ref(false);
const hoverYAchse2 = ref(false);
const hoverZeitreiheGesamt = ref(false);

onMounted(() => {
  update(options.value);
  sizeBelastungsplan.value = sizeBelastungsplanSvg.value;
});

const sizeBelastungsplanSvg = computed(() => {
  return zaehlstelleStore.getSizeBelastungsplanSvg;
});

const maxSizeBelastungsplanSvg = computed(() => {
  return zaehlstelleStore.getMaxSizeBelastungsplanSvg;
});

const minSizeBelastungsplanSvg = computed(() => {
  return zaehlstelleStore.getMinSizeBelastungsplanSvg;
});

const options = computed<OptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const isZeitauswahlForSpitzenstunde = computed(() => {
  return zaehlstelleStore.getZeitauswahl.includes(SPITZENSTUNDE);
});

const helpTextBelastungsplan = computed(() => {
  if (hoverWerteHundertRunden.value) {
    return "";
  }
  if (hoverBlackPrintMode.value) {
    return "";
  }
  if (hoverSizeBelastungsplan.value) {
    return "";
  }
  return "";
});

const helpTextGanglinie = computed(() => {
  if (hoverYAchse1.value) {
    return "Der Wert wird zurückgesetzt, wenn die Zahl < 0 ist.";
  }
  if (hoverYAchse2.value) {
    return "Der Wert wird zurückgesetzt, wenn die Zahl < 0 oder > 100 ist.";
  }
  return "";
});

const helpTextListenausgabe = computed(() => {
  if (hoverStundensumme.value) {
    return "Ausgabe der Summen für jede Stunde als Zeile.";
  }
  if (hoverBlocksumme.value) {
    return "Ausgabe der Summen für jeden Zählblock als Zeile.";
  }
  if (hoverTagessumme.value) {
    return "Ausgabe der Summe für den Tageswert als Zeile.";
  }
  if (hoverSpitzenstunde.value) {
    return "Ausgaben der Summe für die Spitzenstunde(n) als Zeile.";
  }
  return "";
});

const helpTextDetailauswahlListenausgabe = computed(() => {
  if (hoverSpitzenstundeDetailauswahl.value) {
    return "Detailauswahl der auszugebenden Spitzenstunde(n)";
  }
  return "";
});

const helpTextZeitreihe = computed(() => {
  if (hoverZeitreiheGesamt.value) {
    return "";
  }
  return "";
});

// Setzt die Auswahlelemente auf der Oberfläche zurück, oder mit den
//  übergebenen Werten im Optionsobjekt
function update(newOptions: OptionsDTO) {
  newOptions.werteHundertRunden === null
    ? (werteHundertRunden.value = false)
    : (werteHundertRunden.value = newOptions.werteHundertRunden);
  newOptions.blackPrintMode === null
    ? (blackPrintMode.value = false)
    : (blackPrintMode.value = newOptions.blackPrintMode);
  newOptions.stundensumme === null
    ? (stundensumme.value = false)
    : (stundensumme.value = newOptions.stundensumme);
  newOptions.blocksumme === null
    ? (blocksumme.value = false)
    : (blocksumme.value = newOptions.blocksumme);
  newOptions.tagessumme === null
    ? (tagessumme.value = false)
    : (tagessumme.value = newOptions.tagessumme);
  newOptions.spitzenstunde === null
    ? (spitzenstunde.value = false)
    : (spitzenstunde.value = newOptions.spitzenstunde);
  newOptions.spitzenstundeKfz === null
    ? (spitzenstundeKfz.value = false)
    : (spitzenstundeKfz.value = newOptions.spitzenstundeKfz);
  newOptions.spitzenstundeRad === null
    ? (spitzenstundeRad.value = false)
    : (spitzenstundeRad.value = newOptions.spitzenstundeRad);
  newOptions.spitzenstundeFuss === null
    ? (spitzenstundeFuss.value = false)
    : (spitzenstundeFuss.value = newOptions.spitzenstundeFuss);
  newOptions.ganglinieYAchse1MaxValue === null
    ? (ganglinieYAchse1MaxValue.value = null)
    : (ganglinieYAchse1MaxValue.value = newOptions.ganglinieYAchse1MaxValue);
  newOptions.ganglinieYAchse2MaxValue === null
    ? (ganglinieYAchse2MaxValue.value = null)
    : (ganglinieYAchse2MaxValue.value = newOptions.ganglinieYAchse2MaxValue);
  newOptions.zeitreiheGesamt === null
    ? (zeitreiheGesamt.value = false)
    : (zeitreiheGesamt.value = newOptions.zeitreiheGesamt);
}

function isTypeKfzDisabled(): boolean {
  const disabled: boolean = isTypeDisabled("KFZ");
  if (disabled) {
    spitzenstundeKfz.value = false;
  }
  return disabled;
}

function isTypeRadDisabled(): boolean {
  const disabled: boolean = isTypeDisabled("RAD");
  if (disabled) {
    spitzenstundeRad.value = false;
  }
  return disabled;
}

function isTypeFussDisabled(): boolean {
  const disabled: boolean = isTypeDisabled("FUSS");
  if (disabled) {
    spitzenstundeFuss.value = false;
  }
  return disabled;
}

/**
 * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
 * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
 */
function isTypeDisabled(type: string): boolean {
  return zaehlstelleUtils.isTypeDisabled(type, activeZaehlung.value);
}

function checkRangeYAchse2() {
  if (ganglinieYAchse2MaxValue.value) {
    if (
      !_.inRange(ganglinieYAchse2MaxValue.value, MIN_VALUE, MAX_VALUE_EXCLUDE)
    ) {
      ganglinieYAchse2MaxValue.value = null;
    }
  }
}

function checkRangeYAchse1() {
  if (
    ganglinieYAchse1MaxValue.value &&
    ganglinieYAchse1MaxValue.value < MIN_VALUE
  ) {
    ganglinieYAchse1MaxValue.value = null;
  }
}

// Watcher
// Auswahl geändert? Event zum Aktualisieren des Optionsobjektes schicken!
watch(werteHundertRunden, () => {
  emits("werteHundertRunden", werteHundertRunden.value);
});

watch(blackPrintMode, () => {
  emits("blackPrintMode", blackPrintMode.value);
});

watch(sizeBelastungsplan, () => {
  zaehlstelleStore.setSizeBelastungsplanSvg(sizeBelastungsplan.value);
});

watch(stundensumme, () => {
  emits("stundensumme", stundensumme.value);
});

watch(blocksumme, () => {
  emits("blocksumme", blocksumme.value);
});

watch(tagessumme, () => {
  emits("tagessumme", tagessumme.value);
});

watch(spitzenstunde, () => {
  emits("spitzenstunde", spitzenstunde.value);
});

watch(spitzenstundeKfz, () => {
  emits("spitzenstundeKfz", spitzenstundeKfz.value);
});

watch(spitzenstundeRad, () => {
  emits("spitzenstundeRad", spitzenstundeRad.value);
});

watch(spitzenstundeFuss, () => {
  emits("spitzenstundeFuss", spitzenstundeFuss.value);
});

watch(ganglinieYAchse1MaxValue, () => {
  emits("ganglinieYAchse1MaxValue", ganglinieYAchse1MaxValue.value);
});

watch(ganglinieYAchse2MaxValue, () => {
  emits("ganglinieYAchse2MaxValue", ganglinieYAchse2MaxValue.value);
});

watch(zeitreiheGesamt, () => {
  emits("zeitreiheGesamt", zeitreiheGesamt.value);
});

// Wenn sich die Optionen ändern, dann soll sich auch die Auswahl auf der
// Oberfläche ändern.
watch(options, (newOptions: OptionsDTO) => {
  update(newOptions);
});

watch(sizeBelastungsplanSvg, (newSize: number) => {
  sizeBelastungsplan.value = newSize;
});
</script>
