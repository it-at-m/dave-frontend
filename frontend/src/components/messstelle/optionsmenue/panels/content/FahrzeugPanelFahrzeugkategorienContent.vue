<template>
  <v-expansion-panel-text>
    <v-divider />
    <panel-header
      font-size="0.875rem"
      font-weight="bold"
      padding="10px 0 0 0"
      header-text="Fahrzeugkategorien"
    />
    <panel-header
      font-size="small"
      font-weight="normal"
      header-text="(keine Anzeige im Belastungsplan)"
    />

    <v-row
      align="start"
      justify="center"
      dense
    >
      <v-col cols="4">
        <v-btn
          class="text-none"
          density="compact"
          variant="outlined"
          :text="labelSelectOrDeselectAll"
          @mouseover="hoverSelectOrDeselectAll = true"
          @mouseleave="hoverSelectOrDeselectAll = false"
          @click="selectOrDeselectAll()"
        />
      </v-col>
      <v-spacer />
    </v-row>
    <v-row
      align="start"
      justify="center"
      dense
    >
      <v-col cols="4">
        <v-checkbox
          v-model="chosenOptionsCopyFahrzeuge.personenkraftwagen"
          label="Personenkraftwagen (Pkw)"
          :persistent-hint="isPersonenkraftwagenDisabled"
          :disabled="isPersonenkraftwagenDisabled"
          color="quaternary"
          hide-details
          density="compact"
          @mouseover="hoverPkw = true"
          @mouseleave="hoverPkw = false"
        />
        <v-checkbox
          v-model="chosenOptionsCopyFahrzeuge.lieferwagen"
          label="Lieferwagen (Lfw)"
          :persistent-hint="isLieferwagenDisabled"
          :disabled="isLieferwagenDisabled"
          color="quaternary"
          hide-details
          density="compact"
          @mouseover="hoverLfw = true"
          @mouseleave="hoverLfw = false"
        />
        <v-checkbox
          v-model="chosenOptionsCopyFahrzeuge.lastkraftwagen"
          label="Lastkraftwagen (Lkw)"
          :persistent-hint="isLastkraftwagenDisabled"
          :disabled="isLastkraftwagenDisabled"
          color="quaternary"
          hide-details
          density="compact"
          @mouseover="hoverLkw = true"
          @mouseleave="hoverLkw = false"
        />
      </v-col>
      <v-col cols="4">
        <v-checkbox
          v-model="chosenOptionsCopyFahrzeuge.lastzuege"
          label="Lastzüge (Lz)"
          :persistent-hint="isLastzuegeDisabled"
          :disabled="isLastzuegeDisabled"
          color="quaternary"
          hide-details
          density="compact"
          @mouseover="hoverLz = true"
          @mouseleave="hoverLz = false"
        />
        <v-checkbox
          v-model="chosenOptionsCopyFahrzeuge.busse"
          label="Busse"
          :persistent-hint="isBusseDisabled"
          :disabled="isBusseDisabled"
          color="quaternary"
          hide-details
          density="compact"
          @mouseover="hoverBus = true"
          @mouseleave="hoverBus = false"
        />
        <v-checkbox
          v-model="chosenOptionsCopyFahrzeuge.kraftraeder"
          label="Krafträder (Krad)"
          :persistent-hint="isKraftraederDisabled"
          :disabled="isKraftraederDisabled"
          color="quaternary"
          hide-details
          density="compact"
          @mouseover="hoverKrad = true"
          @mouseleave="hoverKrad = false"
        />
      </v-col>
      <v-col cols="4">
        <v-card variant="flat">
          {{ helpTextFahrzeugkategorien }}
        </v-card>
      </v-col>
    </v-row>
  </v-expansion-panel-text>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { isEmpty, toArray } from "lodash";
import { computed, onMounted, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useOptionsmenueSettingsStore } from "@/store/OptionsmenueSettingsStore";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });
const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

const selectOrDeselectAllVmodel = ref(false);
const hoverSelectOrDeselectAll = ref(false);
const hoverPkw = ref(false);
const hoverLkw = ref(false);
const hoverLz = ref(false);
const hoverBus = ref(false);
const hoverKrad = ref(false);
const hoverLfw = ref(false);

const chosenOptionsCopyFahrzeuge = computed(() => {
  return chosenOptionsCopy.value.fahrzeuge;
});

onMounted(() => {
  calculateSelectOrDeselect();
});

watch(
  chosenOptionsCopy,
  () => {
    calculateSelectOrDeselect();
  },
  { deep: true }
);

const labelSelectOrDeselectAll = computed(() => {
  return selectOrDeselectAllVmodel.value ? "Alles abwählen" : "Alles auswählen";
});

/**
 * Liefert den Text für die einzelnen Fahrzeugkategorien, welcher
 * bei MouseOver in der dritten Spalte des Optionsmenüs angezeigt wird.
 */
const helpTextFahrzeugkategorien = computed(() => {
  if (hoverPkw.value) {
    return "";
  }
  if (hoverLkw.value) {
    return "Fahrzeuge mit einem zul. Gesamtgewicht > 3,5t ohne Anhänger.";
  }
  if (hoverLz.value) {
    return "Fahrzeuge mit einem zul. Gesamtgewicht > 3,5t mit Anhänger.";
  }
  if (hoverBus.value) {
    return "";
  }
  if (hoverKrad.value) {
    return "Krafträder beinhalten Motorräder, Motorroller, Mopeds, Mofas usw.";
  }
  if (hoverLfw.value) {
    return "Fahrzeuge mit einem zul. Gesamtgewicht von 2,8 - 3,5t";
  }
  if (hoverSelectOrDeselectAll.value) {
    let text = "Aktiviert alle Fahrzeugkategorien.";
    if (selectOrDeselectAllVmodel.value) {
      text = "Deaktiviert alle Fahrzeugkategorien.";
    }
    return text;
  }
  return "";
});

/**
 * Hilfsmethode, um alle Checkboxen der Fahrzeugkategorien aufeinmal
 * aus- oder abzuwählen, wenn diese nicht disabled sind.
 * @private
 */
function selectOrDeselectAll(): void {
  selectOrDeselectAllVmodel.value = !selectOrDeselectAllVmodel.value;
  if (!isPersonenkraftwagenDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.personenkraftwagen =
      selectOrDeselectAllVmodel.value;
  }
  if (!isLastkraftwagenDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.lastkraftwagen =
      selectOrDeselectAllVmodel.value;
  }
  if (!isLastzuegeDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.lastzuege =
      selectOrDeselectAllVmodel.value;
  }
  if (!isBusseDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.busse = selectOrDeselectAllVmodel.value;
  }
  if (!isKraftraederDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.kraftraeder =
      selectOrDeselectAllVmodel.value;
  }
  if (!isLieferwagenDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.lieferwagen =
      selectOrDeselectAllVmodel.value;
  }
}

/**
 * Gibt vor, ob die Checkbox Alle Fahrzeugkategorien auswählen oder
 * abwählen soll. Dazu wird die Anzahl der aktiven Checkboxen, sowie
 * die Anzahl der maximal Auswählbaren bestimmt.
 * Wenn mehr wie die Hälfte der Möglichen ausgewählt ist, so ist es
 * ein abwählen, sonst ein auswählen.
 */
function calculateSelectOrDeselect() {
  let counter = 0;
  let maxSelectable = 0;
  if (!isPersonenkraftwagenDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.personenkraftwagen) {
      counter++;
    }
    maxSelectable++;
  }
  if (!isLastkraftwagenDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.lastkraftwagen) {
      counter++;
    }
    maxSelectable++;
  }
  if (!isLastzuegeDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.lastzuege) {
      counter++;
    }
    maxSelectable++;
  }
  if (!isBusseDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.busse) {
      counter++;
    }
    maxSelectable++;
  }
  if (!isKraftraederDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.kraftraeder) {
      counter++;
    }
    maxSelectable++;
  }
  if (!isLieferwagenDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.lieferwagen) {
      counter++;
    }
    maxSelectable++;
  }
  // counter > maxSelectable/2 => abwählen
  // sonst => auswählen
  selectOrDeselectAllVmodel.value = counter > maxSelectable / 2;
}

const isPersonenkraftwagenDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .personenkraftwagenChoosableIntervals
  )
);

const isLastkraftwagenDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .lastkraftwagenChoosableIntervals
  )
);

const isLastzuegeDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .lastzuegeChoosableIntervals
  )
);

const isBusseDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .busseChoosableIntervals
  )
);

const isKraftraederDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .kraftraederChoosableIntervals
  )
);

const isLieferwagenDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .lieferwagenChoosableIntervals
  )
);
</script>
