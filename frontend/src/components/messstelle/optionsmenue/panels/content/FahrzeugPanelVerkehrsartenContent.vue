<template>
  <v-expansion-panel-text>
    <panel-header
      font-size="0.875rem"
      font-weight="bold"
      padding="10px 0 0 0"
      header-text="Verkehrsarten"
    />
    <panel-header
      font-size="small"
      font-weight="normal"
      header-text="Im Belastungsplan können maximal 3 Werte gleichzeitig angezeigt werden"
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
          :text="labelSelectOrDeselectAllVerkehrsarten"
          @mouseover="hoverSelectOrDeselectAllVerkehrsarten = true"
          @mouseleave="hoverSelectOrDeselectAllVerkehrsarten = false"
          @click="selectOrDeselectAllVerkehrsarten()"
        />
      </v-col>
      <v-spacer />
    </v-row>

    <v-row
      align="start"
      justify="center"
      dense
      no-gutters
    >
      <v-col cols="8">
        <v-row
          align="start"
          justify="center"
          dense
          no-gutters
        >
          <v-col cols="6">
            <v-checkbox
              v-model="chosenOptionsCopyFahrzeuge.kraftfahrzeugverkehr"
              label="Kraftfahrzeugverkehr (KFZ)"
              :color="getCheckboxColor('KFZ')"
              :disabled="isKraftfahrzeugverkehrDisabled"
              hide-details
              density="compact"
              @mouseover="hoverKfz = true"
              @mouseleave="hoverKfz = false"
            >
              <template
                v-if="getIcon('KFZ')"
                #prepend
              >
                <v-icon
                  :color="getCheckboxColor('KFZ')"
                  :icon="getIcon('KFZ')"
                  class="opacity-100"
                />
              </template>
            </v-checkbox>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row
          align="start"
          justify="center"
          dense
          no-gutters
        >
          <v-col cols="6">
            <v-checkbox
              v-model="chosenOptionsCopyFahrzeuge.schwerverkehr"
              label="Schwerverkehr (SV)"
              :color="getCheckboxColor('SV')"
              :disabled="isSchwerverkehrDisabled"
              hide-details
              density="compact"
              @mouseover="hoverSv = true"
              @mouseleave="hoverSv = false"
            >
              <template
                v-if="getIcon('SV')"
                #prepend
              >
                <v-icon
                  :color="getCheckboxColor('SV')"
                  :icon="getIcon('SV')"
                  class="opacity-100"
                />
              </template>
            </v-checkbox>
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="chosenOptionsCopyFahrzeuge.schwerverkehrsanteilProzent"
              label="Schwerverkehrsanteil [%]"
              :color="getCheckboxColor('SV_P')"
              :disabled="isSchwerverkehrsanteilProzentDisabled"
              hide-details
              density="compact"
              @mouseover="hoverSv_p = true"
              @mouseleave="hoverSv_p = false"
            >
              <template
                v-if="getIcon('SV_P')"
                #prepend
              >
                <v-icon
                  :color="getCheckboxColor('SV_P')"
                  :icon="getIcon('SV_P')"
                  class="opacity-100"
                />
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row
          align="start"
          justify="center"
          dense
          no-gutters
        >
          <v-col cols="6">
            <v-checkbox
              v-model="chosenOptionsCopyFahrzeuge.gueterverkehr"
              label="Güterverkehr (GV)"
              :color="getCheckboxColor('GV')"
              :disabled="isGueterverkehrDisabled"
              hide-details
              density="compact"
              @mouseover="hoverGv = true"
              @mouseleave="hoverGv = false"
            >
              <template
                v-if="getIcon('GV')"
                #prepend
              >
                <v-icon
                  :color="getCheckboxColor('GV')"
                  :icon="getIcon('GV')"
                  class="opacity-100"
                />
              </template>
            </v-checkbox>
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="chosenOptionsCopyFahrzeuge.gueterverkehrsanteilProzent"
              label="Güterverkehrsanteil [%]"
              :color="getCheckboxColor('GV_P')"
              :disabled="isGueterverkehrsanteilProzentDisabled"
              hide-details
              density="compact"
              @mouseover="hoverGv_p = true"
              @mouseleave="hoverGv_p = false"
            >
              <template
                v-if="getIcon('GV_P')"
                #prepend
              >
                <v-icon
                  :color="getCheckboxColor('GV_P')"
                  :icon="getIcon('GV_P')"
                  class="opacity-100"
                />
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row
          align="start"
          justify="center"
          dense
          no-gutters
        >
          <v-col cols="6">
            <v-checkbox
              v-model="chosenOptionsCopyFahrzeuge.radverkehr"
              label="Radverkehr (Rad)"
              :color="getCheckboxColor('RAD')"
              :disabled="isRadverkehrDisabled"
              hide-details
              density="compact"
              @mouseover="hoverRad = true"
              @mouseleave="hoverRad = false"
            >
              <template
                v-if="getIcon('RAD')"
                #prepend
              >
                <v-icon
                  :color="getCheckboxColor('RAD')"
                  :icon="getIcon('RAD')"
                  class="opacity-100"
                />
              </template>
            </v-checkbox>
          </v-col>

          <v-col cols="6">
            <v-checkbox
              v-model="chosenOptionsCopyFahrzeuge.fussverkehr"
              label="Fußgänger (Fuß)"
              :color="getCheckboxColor('FUSS')"
              :persistent-hint="
                chosenOptionsCopyFahrzeuge.gueterverkehrsanteilProzent ||
                isFussverkehrDisabled
              "
              :disabled="isFussverkehrDisabled"
              :hide-details="!chosenOptionsCopyFahrzeuge.fussverkehr"
              density="compact"
              @mouseover="hoverFuss = true"
              @mouseleave="hoverFuss = false"
            >
              <template
                v-if="getIcon('FUSS')"
                #prepend
              >
                <v-icon
                  :color="getCheckboxColor('FUSS')"
                  :icon="getIcon('FUSS')"
                  class="opacity-100"
                />
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <p
          v-if="!hasSelectedVerkehrsarten"
          class="text-red"
        >
          {{ globalInfoMessage.NO_BELASTUNGSPLAN }}
        </p>
        {{ helpTextVerkehrsarten }}
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
import Fahrzeug from "@/types/enum/Fahrzeug";
import { useGlobalInfoMessage } from "@/util/GlobalInfoMessage";
import { useMessstelleUtils } from "@/util/MessstelleUtils";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });

const optionsmenueSettingsStore = useOptionsmenueSettingsStore();
const messstelleUtils = useMessstelleUtils();
const globalInfoMessage = useGlobalInfoMessage();

const selectOrDeselectAllVerkehrsartenVmodel = ref(false);
const hoverSelectOrDeselectAllVerkehrsarten = ref(false);
const hoverKfz = ref(false);
const hoverSv = ref(false);
const hoverGv = ref(false);
const hoverSv_p = ref(false);
const hoverGv_p = ref(false);
const hoverRad = ref(false);
const hoverFuss = ref(false);

onMounted(() => {
  calculateSelectOrDeselectVerkehrsarten();
});

watch(
  chosenOptionsCopy,
  () => {
    calculateSelectOrDeselectVerkehrsarten();
  },
  { deep: true }
);

const chosenOptionsCopyFahrzeuge = computed(() => {
  return chosenOptionsCopy.value.fahrzeuge;
});

const labelSelectOrDeselectAllVerkehrsarten = computed(() => {
  return selectOrDeselectAllVerkehrsartenVmodel.value
    ? "Alles abwählen"
    : "Alles auswählen";
});

const hasSelectedVerkehrsarten = computed<boolean>(() => {
  return messstelleUtils.hasSelectedVerkehrsarten(
    chosenOptionsCopyFahrzeuge.value
  );
});

/**
 * Liefert die aktuelle Anzahl der ausgewählten Verkehrsarten zurück.
 */
const actualNumberOfSelectedVerkehrsarten = computed(() => {
  let counter = 0;
  if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
    counter++;
  }
  if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
    counter++;
  }
  if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
    counter++;
  }
  if (chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent) {
    counter++;
  }
  if (chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent) {
    counter++;
  }
  if (chosenOptionsCopyFahrzeuge.value.radverkehr) {
    counter++;
  }
  if (chosenOptionsCopyFahrzeuge.value.fussverkehr) {
    counter++;
  }
  return counter;
});

/**
 * Liefert den Text für die einzelnen Verkehrsarten, welcher
 * bei MouseOver in der dritten Spalte des Optionsmenüs angezeigt wird.
 */
const helpTextVerkehrsarten = computed(() => {
  if (hoverKfz.value) {
    return "Der Kraftfahrzeugverkehr ist die Summe der Personenkraftwagen, Krafträder, Busse, Lieferwagen, Lastkraftwagen und Lastzüge.";
  }
  if (hoverSv.value) {
    return "Der Schwerverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht (Summe aus Bussen, Lastkraftwagen und Lastzüge).";
  }
  if (hoverGv.value) {
    return "Der Güterverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht ohne Busse (Summe aus Lastkraftwagen und Lastzüge).";
  }
  if (hoverSv_p.value) {
    return "Anteil des Schwerverkehrs am Kraftfahrzeugverkehr in Prozent [%].";
  }
  if (hoverGv_p.value) {
    return "Anteil des Güterverkehrs am Kraftfahrzeugverkehr in Prozent [%].";
  }
  if (hoverRad.value) {
    return "Hinweis: Um den Radverkehr im Belastungsplan darzustellen, darf keine weitere Verkehrsart ausgewählt sein.";
  }
  if (hoverFuss.value) {
    return "Hinweis: Um die Fußgänger im Belastungsplan darzustellen, darf keine weitere Verkehrsart ausgewählt sein.";
  }
  if (hoverSelectOrDeselectAllVerkehrsarten.value) {
    let text = "Aktiviert alle Verkehrsarten.";
    if (selectOrDeselectAllVerkehrsartenVmodel.value) {
      text = "Deaktiviert alle Verkehrsarten.";
    }
    return text;
  }
  return "";
});

/**
 * Hilfsmethode, um zu schauen, ob der Wert SV% im Belastungsplan angezeigt wird.
 * Dies ist nur der Fall, wenn KFZ, SV oder SV aktiviert sind und inklusive SV_P nicht
 * mehr wie 3 Verkehrsarten (ohne RAD und FUSS) ausgewählt sind
 */
const isSvpInBelastungsPlan = computed(() => {
  let actualNumberOfSelectedKfzSvAndGv = 0;
  if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
    actualNumberOfSelectedKfzSvAndGv++;
  }
  if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
    actualNumberOfSelectedKfzSvAndGv++;
  }
  if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
    actualNumberOfSelectedKfzSvAndGv++;
  }
  return (
    chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent &&
    (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr ||
      chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
      chosenOptionsCopyFahrzeuge.value.gueterverkehr) &&
    actualNumberOfSelectedKfzSvAndGv < 3
  );
});

/**
 * Hilfsmethode, um zu schauen, ob der Wert GV% im Belastungsplan angezeigt wird.
 * Dies ist nur der Fall, wenn KFZ, SV oder GV aktiviert sind und inklusive GV_P nicht
 * mehr wie 3 Verkehrsarten (ohne RAD und FUSS) ausgewählt sind
 */
const isGvpInBelastungsPlan = computed(() => {
  let actualNumberOfSelectedKfzSvGvAndSV_P = 0;
  if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
    actualNumberOfSelectedKfzSvGvAndSV_P++;
  }
  if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
    actualNumberOfSelectedKfzSvGvAndSV_P++;
  }
  if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
    actualNumberOfSelectedKfzSvGvAndSV_P++;
  }
  if (chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent) {
    actualNumberOfSelectedKfzSvGvAndSV_P++;
  }
  return (
    chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent &&
    (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr ||
      chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
      chosenOptionsCopyFahrzeuge.value.gueterverkehr) &&
    actualNumberOfSelectedKfzSvGvAndSV_P < 3
  );
});

const isRadInBelastungsplan = computed(() => {
  return (
    chosenOptionsCopyFahrzeuge.value.radverkehr &&
    actualNumberOfSelectedVerkehrsarten.value === 1
  );
});

/**
 * Gibt vor, ob die Checkbox Alle Verkehrsarten auswählen oder
 * abwählen soll. Dazu wird die Anzahl der aktiven Checkboxen, sowie
 * die Anzahl der maximal Auswählbaren bestimmt.
 * Wenn mehr wie die Hälfte der Möglichen ausgewählt ist, so ist es
 * ein abwählen, sonst ein auswählen.
 */
function calculateSelectOrDeselectVerkehrsarten(): void {
  let selectedItems = 0;
  let maxSelectableItems = 0;
  if (!isKraftfahrzeugverkehrDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (!isSchwerverkehrDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (!isGueterverkehrDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (!isSchwerverkehrsanteilProzentDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (!isGueterverkehrsanteilProzentDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (!isRadverkehrDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.radverkehr) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (!isFussverkehrDisabled.value) {
    if (chosenOptionsCopyFahrzeuge.value.fussverkehr) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  selectOrDeselectAllVerkehrsartenVmodel.value =
    selectedItems > maxSelectableItems / 2;
}

/**
 * Hilfsmethode, um alle Checkboxen der Verkehrsarten aufeinmal
 * aus- oder abzuwählen, wenn diese nicht disabled sind.
 * @private
 */
function selectOrDeselectAllVerkehrsarten(): void {
  selectOrDeselectAllVerkehrsartenVmodel.value =
    !selectOrDeselectAllVerkehrsartenVmodel.value;
  if (!isKraftfahrzeugverkehrDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isSchwerverkehrDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.schwerverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isGueterverkehrDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.gueterverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isSchwerverkehrsanteilProzentDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isGueterverkehrsanteilProzentDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isRadverkehrDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.radverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isFussverkehrDisabled.value) {
    chosenOptionsCopyFahrzeuge.value.fussverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
}

/**
 * Wenn eine Verkehrsart ausgewählt ist und im Belastunsplan
 * angezeigt wird, so wird zur Kennzeichnung die Checkbox blau dargestellt.
 * Ansonsten ist diese grau.
 */
function getCheckboxColor(type: string): string {
  // KFZ, SV udn GV sind immer primary, wenn aktiv
  let color = "primary";
  switch (type) {
    case Fahrzeug.SV_P: {
      if (!isSvpInBelastungsPlan.value) {
        color = "quaternary";
      }
      break;
    }
    case Fahrzeug.GV_P: {
      if (!isGvpInBelastungsPlan.value) {
        color = "quaternary";
      }
      break;
    }
    case Fahrzeug.RAD: {
      if (!isRadInBelastungsplan.value) {
        color = "quaternary";
      }
      break;
    }
    case Fahrzeug.FUSS: {
      if (
        chosenOptionsCopyFahrzeuge.value.fussverkehr &&
        actualNumberOfSelectedVerkehrsarten.value > 1
      ) {
        color = "quaternary";
      }
      break;
    }
  }
  return color;
}

/**
 * Wenn eine Verkehrsart ausgewählt ist und im Belastunsplan
 * angezeigt wird, so wird zur Kennzeichnung das Icon des
 * Belastungsplan davor gestellt
 */
function getIcon(type: string): string {
  let icon = "";
  switch (type) {
    case Fahrzeug.KFZ: {
      if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case Fahrzeug.SV: {
      if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case Fahrzeug.GV: {
      if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case Fahrzeug.SV_P: {
      // Angezeigt, wenn (KFZ || SV || GV) && KFZ + SV + GV < 3
      if (isSvpInBelastungsPlan.value) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case Fahrzeug.GV_P: {
      // Angezeigt, wenn (KFZ || SV || GV) && KFZ + SV + GV + SV% < 3
      if (isGvpInBelastungsPlan.value) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case Fahrzeug.RAD: {
      // Angezeigt, wenn RAD oder RAD && FUSS
      if (isRadInBelastungsplan.value) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case Fahrzeug.FUSS: {
      // Angezeigt, wenn FUSS
      if (
        chosenOptionsCopyFahrzeuge.value.fussverkehr &&
        actualNumberOfSelectedVerkehrsarten.value === 1
      ) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
  }
  return icon;
}

const isKraftfahrzeugverkehrDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .kraftfahrzeugverkehrChoosableIntervals
  )
);

const isSchwerverkehrDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .schwerverkehrChoosableIntervals
  )
);

const isSchwerverkehrsanteilProzentDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .schwerverkehrsanteilProzentChoosableIntervals
  )
);

const isGueterverkehrDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .gueterverkehrChoosableIntervals
  )
);

const isGueterverkehrsanteilProzentDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .gueterverkehrsanteilProzentChoosableIntervals
  )
);

const isRadverkehrDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .radverkehrChoosableIntervals
  )
);

const isFussverkehrDisabled = computed(() =>
  isEmpty(
    optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten
      .fussverkehrChoosableIntervals
  )
);
</script>
