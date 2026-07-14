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
          <v-select
            v-model="chosenOptionsCopy.rounding"
            class="mb-3"
            label="Rundung"
            :items="roundingItems"
            item-title="label"
            item-value="key"
            color="quaternary"
            density="compact"
            @mouseover="hoverWerteRunden = true"
            @mouseleave="hoverWerteRunden = false"
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
            v-model="chosenOptionsCopy.blackPrintMode"
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
          <v-card variant="flat">
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
            v-model="chosenOptionsCopy.ganglinieYAchse1MaxValue"
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
            v-model="chosenOptionsCopy.ganglinieYAchse2MaxValue"
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
          <v-card variant="flat">
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
            v-model="chosenOptionsCopy.stundensumme"
            :label="'Stundensumme'"
            hide-details
            color="quaternary"
            density="compact"
            @mouseover="hoverStundensumme = true"
            @mouseleave="hoverStundensumme = false"
          />
          <v-checkbox
            v-model="chosenOptionsCopy.blocksumme"
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
            v-model="chosenOptionsCopy.tagessumme"
            :label="'Tagessumme'"
            hide-details
            color="quaternary"
            density="compact"
            @mouseover="hoverTagessumme = true"
            @mouseleave="hoverTagessumme = false"
          />
          <v-checkbox
            v-model="chosenOptionsCopy.spitzenstunde"
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
          <v-card variant="flat">
            {{ helpTextListenausgabe }}
          </v-card>
        </v-col>
      </v-row>

      <panel-header
        v-if="!isZeitauswahlForSpitzenstunde && chosenOptionsCopy.spitzenstunde"
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Detailauswahl Listenausgabe"
      />
      <v-row
        v-if="!isZeitauswahlForSpitzenstunde && chosenOptionsCopy.spitzenstunde"
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
            v-model="chosenOptionsCopy.spitzenstundeKfz"
            :label="'Spitzenstunde KFZ'"
            hide-details
            color="quaternary"
            density="compact"
            :disabled="isTypeKfzDisabled()"
          />
          <v-checkbox
            v-model="chosenOptionsCopy.spitzenstundeRad"
            :label="'Spitzenstunde Rad'"
            hide-details
            color="quaternary"
            density="compact"
            :disabled="isTypeRadDisabled()"
          />
          <v-checkbox
            v-model="chosenOptionsCopy.spitzenstundeFuss"
            :label="'Spitzenstunde Fuß'"
            hide-details
            color="quaternary"
            density="compact"
            :disabled="isTypeFussDisabled()"
          />
        </v-col>
        <v-col cols="4">
          <v-card variant="flat">
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
            v-model="chosenOptionsCopy.zeitreiheGesamt"
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
          <v-card variant="flat">
            {{ helpTextZeitreihe }}
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import _ from "lodash";
import { computed, onMounted, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import { roundingList } from "@/types/enum/Rounding";
import { useValidationRules } from "@/util/ValidationRules";
import { useZaehlstelleUtils } from "@/util/ZaehlstelleUtils";

const SPITZENSTUNDE = "Spitzenstunde";
const MIN_VALUE = 0;
const MAX_VALUE_EXCLUDE = 101;

const zaehlstelleStore = useZaehlstelleStore();
const zaehlstelleUtils = useZaehlstelleUtils();
const rules = useValidationRules();

const chosenOptionsCopy = defineModel<ZaehlstelleOptionsDTO>({
  required: true,
});

// Belastungsplan
const sizeBelastungsplan = ref(0);

const hoverWerteRunden = ref(false);
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

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const isZeitauswahlForSpitzenstunde = computed(() => {
  return chosenOptionsCopy.value.zeitauswahl.includes(SPITZENSTUNDE);
});

const helpTextBelastungsplan = computed(() => {
  if (hoverWerteRunden.value) {
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

const roundingItems = computed(() =>
  roundingList.map((it) => ({ key: it.key, label: it.label }))
);

function isTypeKfzDisabled(): boolean {
  return isTypeDisabled("KFZ");
}

function isTypeRadDisabled(): boolean {
  return isTypeDisabled("RAD");
}

function isTypeFussDisabled(): boolean {
  return isTypeDisabled("FUSS");
}

/**
 * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
 * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
 */
function isTypeDisabled(type: string): boolean {
  return zaehlstelleUtils.isTypeDisabled(type, activeZaehlung.value);
}

function checkRangeYAchse2() {
  if (chosenOptionsCopy.value.ganglinieYAchse2MaxValue) {
    if (
      !_.inRange(
        chosenOptionsCopy.value.ganglinieYAchse2MaxValue,
        MIN_VALUE,
        MAX_VALUE_EXCLUDE
      )
    ) {
      chosenOptionsCopy.value.ganglinieYAchse2MaxValue = null;
    }
  }
}

function checkRangeYAchse1() {
  if (
    chosenOptionsCopy.value.ganglinieYAchse1MaxValue &&
    chosenOptionsCopy.value.ganglinieYAchse1MaxValue < MIN_VALUE
  ) {
    chosenOptionsCopy.value.ganglinieYAchse1MaxValue = null;
  }
}

// Watcher
watch(sizeBelastungsplan, () => {
  zaehlstelleStore.setSizeBelastungsplanSvg(sizeBelastungsplan.value);
});

watch(sizeBelastungsplanSvg, (newSize: number) => {
  sizeBelastungsplan.value = newSize;
});

watch(
  () => activeZaehlung.value,
  () => {
    if (isTypeDisabled("KFZ")) {
      chosenOptionsCopy.value.spitzenstundeKfz = false;
    }
    if (isTypeDisabled("RAD")) {
      chosenOptionsCopy.value.spitzenstundeRad = false;
    }
    if (isTypeDisabled("FUSS")) {
      chosenOptionsCopy.value.spitzenstundeFuss = false;
    }
  },
  { immediate: true }
);
</script>
