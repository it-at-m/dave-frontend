<template>
  <div>
    <v-btn
      class="text-none"
      color="secondary"
      prepend-icon="mdi-filter-outline"
      density="default"
      text="Filtereinstellungen"
      @click="dialog = true"
    />

    <v-dialog
      v-model="dialog"
      max-width="900px"
    >
      <v-card
        width="900px"
        variant="flat"
      >
        <v-card-title>
          <v-icon
            start
            icon="mdi-filter-outline"
          />
          Filtereinstellungen
        </v-card-title>

        <v-card-text>
          <v-sheet
            width="100%"
            :max-height="getContentSheetHeight"
            class="overflow-y-auto"
          >
            <v-expansion-panels
              v-model="activePanel"
              variant="accordion"
              focusable
              elevation="0"
            >
              <zeitauswahl-panel v-model="chosenOptions" />

              <fahrzeug-panel v-model="chosenOptions" />

              <verkehrsbeziehungen-panel v-model="chosenOptions" />

              <zaehlungsvergleich-panel v-model="chosenOptions" />

              <darstellungsoptionen-panel v-model="chosenOptions" />
            </v-expansion-panels>
          </v-sheet>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="text-none"
            color="secondary"
            text="Aktualisiere Daten"
            variant="elevated"
            @click="setOptions"
          />
          <v-spacer />
          <v-btn
            class="text-none"
            color="tertiary"
            text="Zurücksetzen"
            variant="elevated"
            @click="resetOptionsmenu"
          />
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { head, isEmpty, isNil } from "lodash";
import { computed, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import DarstellungsoptionenPanel from "@/components/zaehlstelle/optionsmenue/panels/DarstellungsoptionenPanel.vue";
import FahrzeugPanel from "@/components/zaehlstelle/optionsmenue/panels/FahrzeugPanel.vue";
import ZaehlungsvergleichPanel from "@/components/zaehlstelle/optionsmenue/panels/ZaehlungsvergleichPanel.vue";
import ZeitauswahlPanel from "@/components/zaehlstelle/optionsmenue/panels/ZeitauswahlPanel.vue";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Fahrzeug from "@/types/enum/Fahrzeug";
import Zaehlart from "@/types/enum/Zaehlart";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock from "@/types/enum/Zeitblock";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { useZaehlstelleUtils } from "@/util/ZaehlstelleUtils";
import VerkehrsbeziehungenPanel from "@/components/zaehlstelle/optionsmenue/panels/VerkehrsbeziehungenPanel.vue";

/**
 * Beschreibung Optionsmenü
 *
 * - Wenn der Tageswert ausgewählt ist, kann kein Radverkehr gewählt werden, da dieser keine Hochrechnungsfaktoren besitzt (Ausnahme 24h-Zählungen)
 * - Bei Auswahl der Spitzenstunde wird per Default erstmal nur die dazugehörige Einheit angezeigt. Alle anderen sind erstmal abgewählt und können
 *    bei Bedarf vom Nutzer aktiviert werden
 * - Per Default werden anfangs nur KFZ, SV, GV, SV% und GV% angezeigt. Alle anderen Werte müssen vom Nutzer selbständig aktiviert werden.
 */

const zaehlstelleStore = useZaehlstelleStore();
const zaehlstelleUtils = useZaehlstelleUtils();
const snackbarStore = useSnackbarStore();
const display = useDisplay();

const dialog = ref(false);
const activePanel = ref(-1);
const chosenOptions = ref(
  DefaultObjectCreator.createDefaultZaehlstelleOptionsDto()
);

const options = computed<ZaehlstelleOptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});

const getContentSheetHeight = computed(() => {
  if (display.xl.value) {
    return "750px";
  }
  return "500px";
});

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

/**
 * Setzt die Default-Einstellungen für das Optionsmenü je nach Zählung
 */
function setDefaultOptionsForZaehlung() {
  const optionsCopy = {} as ZaehlstelleOptionsDTO;
  Object.assign(optionsCopy, options.value);

  if (activeZaehlung.value.zaehldauer === Zaehldauer.DAUER_13_STUNDEN) {
    optionsCopy.zeitauswahl = Zeitauswahl.BLOCK;
    optionsCopy.zeitblock = Zeitblock.ZB_06_19;
  }

  if (
    activeZaehlung.value.zaehlart === Zaehlart.R ||
    activeZaehlung.value.zaehlart === Zaehlart.QR
  ) {
    if (activeZaehlung.value.zaehldauer === Zaehldauer.DAUER_16_STUNDEN) {
      optionsCopy.zeitauswahl = Zeitauswahl.BLOCK;
      optionsCopy.zeitblock = Zeitblock.ZB_06_22;
    } else if (
      activeZaehlung.value.zaehldauer === Zaehldauer.DAUER_2_X_4_STUNDEN ||
      activeZaehlung.value.zaehldauer === Zaehldauer.SONSTIGE
    ) {
      optionsCopy.zeitauswahl = Zeitauswahl.BLOCK;
      optionsCopy.zeitblock = Zeitblock.ZB_06_10;
    }
    // Bei Zaehldauer.DAUER_24_STUNDEN nichts zu tun
  } else {
    const zeitblockAvailable = !isEmpty(
      activeZaehlung.value.zeitauswahl?.blocks
    );
    if (
      zeitblockAvailable &&
      activeZaehlung.value.zaehldauer === Zaehldauer.SONSTIGE
    ) {
      const firstZeitblock = head(activeZaehlung.value.zeitauswahl?.blocks);
      if (!isNil(firstZeitblock)) {
        optionsCopy.zeitblock = firstZeitblock;
      }
    }
  }

  activeZaehlung.value.kategorien.forEach((fahr) => {
    switch (fahr) {
      // Verkehrsarten
      case Fahrzeug.KFZ:
        optionsCopy.kraftfahrzeugverkehr = true;
        break;
      case Fahrzeug.SV:
        optionsCopy.schwerverkehr = true;
        break;
      case Fahrzeug.SV_P:
        optionsCopy.schwerverkehrsanteilProzent = true;
        break;
      case Fahrzeug.GV:
        optionsCopy.gueterverkehr = true;
        break;
      case Fahrzeug.GV_P:
        optionsCopy.gueterverkehrsanteilProzent = true;
        break;
      case Fahrzeug.RAD:
        // Rad soll nur bei reinen Radzählungen aktiviert sein
        optionsCopy.radverkehr = ["R", "QR"].includes(
          activeZaehlung.value.zaehlart
        );
        break;
    }
  });
  optionsCopy.beideRichtungen = false;

  optionsCopy.laengsverkehr = (activeZaehlung.value.laengsverkehr ?? []).map((lv) => ({ ...lv }));
  optionsCopy.querungsverkehr = (activeZaehlung.value.querungsverkehr ?? []).map((qv) => ({ ...qv }));
  optionsCopy.verkehrsbeziehungenQJS = (activeZaehlung.value.verkehrsbeziehungen ?? []).map((vb) => ({
    knotenarm: vb.knotenarm,
    nach: vb.nach,
    strassenseite: vb.strassenseite,
  }));

  chosenOptions.value = optionsCopy;
  saveOptions();
}

/**
 * Speichert die aktuell gewählten Anzeigeoptionen im Vuex Store und schließt den Dialog.
 *
 * @private
 */
function setOptions() {
  if (!
      zaehlstelleUtils.hasSelectedVerkehrsarten(chosenOptions.value) &&
    !zaehlstelleUtils.hasSelectedFahrzeugkategorie(chosenOptions.value)
  ) {
    snackbarStore.showError(
      "Es muss mindestens eine Verkehrsart oder Fahrzeugkategorie ausgewählt sein."
    );
    return;
  }
  if ((activeZaehlung.value.zaehlart === Zaehlart.FJS &&
      isEmpty(chosenOptions.value.laengsverkehr)) ||
      (activeZaehlung.value.zaehlart === Zaehlart.QU &&
      isEmpty(chosenOptions.value.querungsverkehr)) ||
      (activeZaehlung.value.zaehlart === Zaehlart.QJS &&
      isEmpty(chosenOptions.value.verkehrsbeziehungenQJS))
  ) {
    snackbarStore.showError(
        "Es muss mindestens eine Verkehrsbeziehung ausgewählt sein."
    );
    return;
  }
  saveOptions();
  dialog.value = false;
}

/**
 * Speichert die aktuell gewählten Anzeigeoptionen im Vuex Store.
 *
 * @private
 */
function saveOptions() {
  zaehlstelleStore.setFilteroptions(Object.assign({}, chosenOptions.value));
}

// Funktionalität für den "Zurücksetzen" Button
function resetOptionsmenu() {
  resetSizeBelastungsplan();
  resetOptions();
}

function resetOptions() {
  zaehlstelleStore.resetFilteroptions();
  setDefaultOptionsForZaehlung();
}

function resetSizeBelastungsplan() {
  zaehlstelleStore.resetSizeBelastungsplanSvg();
}

/**
 * Da das ZaehlstelleOptionsDTO für die Auswahlfelder im Formular als
 * v-model genutzt wird, muss hier eine Kopie erzeugt werden. Andernfalls
 * würde es zu einer dirketen Veränderung des Stores kommen - was dieser
 * nicht mag.
 */
watch(options, (newOptions: ZaehlstelleOptionsDTO) => {
  const options = {} as ZaehlstelleOptionsDTO;
  Object.assign(options, newOptions);
  chosenOptions.value = options;
});

watch(
  () => activeZaehlung.value,
  () => {
    if (zaehlstelleStore.isHistory) {
      zaehlstelleStore.reloadFilteroptions();
    } else {
      resetOptions();
    }
  }
);
</script>
