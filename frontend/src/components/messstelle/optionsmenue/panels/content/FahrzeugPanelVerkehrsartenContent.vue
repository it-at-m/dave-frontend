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
              :prepend-icon="getIcon('KFZ')"
              :color="getCheckboxColor('KFZ')"
              :disabled="isTypeDisabled('KFZ')"
              hide-details
              density="compact"
              @mouseover="hoverKfz = true"
              @mouseleave="hoverKfz = false"
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
          <v-col cols="6">
            <v-checkbox
              v-model="chosenOptionsCopyFahrzeuge.schwerverkehr"
              label="Schwerverkehr (SV)"
              :prepend-icon="getIcon('SV')"
              :color="getCheckboxColor('SV')"
              :disabled="isTypeDisabled('SV')"
              hide-details
              density="compact"
              @mouseover="hoverSv = true"
              @mouseleave="hoverSv = false"
            />
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="chosenOptionsCopyFahrzeuge.schwerverkehrsanteilProzent"
              label="Schwerverkehrsanteil [%]"
              :prepend-icon="getIcon('SV_P')"
              :color="getCheckboxColor('SV_P')"
              :disabled="isTypeDisabled('SV_P')"
              hide-details
              density="compact"
              @mouseover="hoverSv_p = true"
              @mouseleave="hoverSv_p = false"
            />
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
              :prepend-icon="getIcon('GV')"
              :color="getCheckboxColor('GV')"
              :disabled="isTypeDisabled('GV')"
              hide-details
              density="compact"
              @mouseover="hoverGv = true"
              @mouseleave="hoverGv = false"
            />
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="chosenOptionsCopyFahrzeuge.gueterverkehrsanteilProzent"
              label="Güterverkehrsanteil [%]"
              :prepend-icon="getIcon('GV_P')"
              :color="getCheckboxColor('GV_P')"
              :disabled="isTypeDisabled('GV_P')"
              hide-details
              density="compact"
              @mouseover="hoverGv_p = true"
              @mouseleave="hoverGv_p = false"
            />
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
              :prepend-icon="getIcon('RAD')"
              :color="getCheckboxColor('RAD')"
              :disabled="isTypeDisabled('RAD')"
              hide-details
              density="compact"
              @mouseover="hoverRad = true"
              @mouseleave="hoverRad = false"
            />
          </v-col>

          <v-col cols="6">
            <v-checkbox
              v-model="chosenOptionsCopyFahrzeuge.fussverkehr"
              label="Fußgänger (Fuß)"
              :prepend-icon="getIcon('FUSS')"
              :color="getCheckboxColor('FUSS')"
              :persistent-hint="
                chosenOptionsCopyFahrzeuge.gueterverkehrsanteilProzent ||
                isTypeDisabled('FUSS')
              "
              :disabled="isTypeDisabled('FUSS')"
              :hide-details="!chosenOptionsCopyFahrzeuge.fussverkehr"
              density="compact"
              @mouseover="hoverFuss = true"
              @mouseleave="hoverFuss = false"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        {{ helpTextVerkehrsarten }}
      </v-col>
    </v-row>
  </v-expansion-panel-text>
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { computed, onMounted, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useFahrzeugPanelTools } from "@/components/messstelle/optionsmenue/composable/fahrzeugPanelTools";
import { useMessstelleStore } from "@/store/MessstelleStore";
import Fahrzeug from "@/types/enum/Fahrzeug";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });

const fahrzeugPanelTools = useFahrzeugPanelTools();
const messstelleStore = useMessstelleStore();

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
  if (isTypeEnabled(Fahrzeug.KFZ)) {
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (isTypeEnabled(Fahrzeug.SV)) {
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (isTypeEnabled(Fahrzeug.GV)) {
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (isTypeEnabled(Fahrzeug.SV_P)) {
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (isTypeEnabled(Fahrzeug.GV_P)) {
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (isTypeEnabled(Fahrzeug.RAD)) {
    if (chosenOptionsCopyFahrzeuge.value.radverkehr) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  if (isTypeEnabled(Fahrzeug.FUSS)) {
    if (chosenOptionsCopyFahrzeuge.value.fussverkehr) {
      selectedItems++;
    }
    maxSelectableItems++;
  }
  selectOrDeselectAllVerkehrsartenVmodel.value = selectedItems > maxSelectableItems / 2;
}

/**
 * Hilfsmethode, um alle Checkboxen der Verkehrsarten aufeinmal
 * aus- oder abzuwählen, wenn diese nicht disabled sind.
 * @private
 */
function selectOrDeselectAllVerkehrsarten(): void {
  selectOrDeselectAllVerkehrsartenVmodel.value =
    !selectOrDeselectAllVerkehrsartenVmodel.value;
  if (isTypeEnabled(Fahrzeug.KFZ)) {
    chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (isTypeEnabled(Fahrzeug.SV)) {
    chosenOptionsCopyFahrzeuge.value.schwerverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (isTypeEnabled(Fahrzeug.GV)) {
    chosenOptionsCopyFahrzeuge.value.gueterverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (isTypeEnabled(Fahrzeug.SV_P)) {
    chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (isTypeEnabled(Fahrzeug.GV_P)) {
    chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (isTypeEnabled(Fahrzeug.RAD)) {
    chosenOptionsCopyFahrzeuge.value.radverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (isTypeEnabled(Fahrzeug.FUSS)) {
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
        color = "grey-darken-1";
      }
      break;
    }
    case Fahrzeug.GV_P: {
      if (!isGvpInBelastungsPlan.value) {
        color = "grey-darken-1";
      }
      break;
    }
    case Fahrzeug.RAD: {
      if (!isRadInBelastungsplan.value) {
        color = "grey-darken-1";
      }
      break;
    }
    case Fahrzeug.FUSS: {
      if (
        chosenOptionsCopyFahrzeuge.value.fussverkehr &&
        actualNumberOfSelectedVerkehrsarten.value > 1
      ) {
        color = "grey-darken-1";
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

function isTypeEnabled(type: string): boolean {
  return !isTypeDisabled(type);
}

function isTypeDisabled(type: string): boolean {
  return (
    fahrzeugPanelTools.isTypeDisabled(type) ||
    ((chosenOptionsCopy.value.intervall ===
      ZaehldatenIntervall.STUNDE_VIERTEL ||
      chosenOptionsCopy.value.intervall === ZaehldatenIntervall.STUNDE_HALB) &&
      messstelleStore.getActiveMessfaehigkeit.intervall ===
        ZaehldatenIntervall.STUNDE_VIERTEL_EINGESCHRAENKT &&
      Fahrzeug.KFZ !== type)
  );
}
</script>
