<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div>
        <v-icon
          start
          icon="mdi-car-multiple"
        />
        Fahrzeuge
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-1">
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
                v-model="fahrzeugOptions.kraftfahrzeugverkehr"
                :label="'Kraftfahrzeugverkehr (KFZ)'"
                :hint="getHintToDisplay('KFZ')"
                :color="getCheckboxColor('KFZ')"
                :persistent-hint="
                  fahrzeugOptions.kraftfahrzeugverkehr || isTypeDisabled('KFZ')
                "
                :disabled="isTypeDisabled('KFZ')"
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
                v-model="fahrzeugOptions.schwerverkehr"
                :label="'Schwerverkehr (SV)'"
                :hint="getHintToDisplay('SV')"
                :color="getCheckboxColor('SV')"
                :persistent-hint="
                  fahrzeugOptions.schwerverkehr || isTypeDisabled('SV')
                "
                :disabled="isTypeDisabled('SV')"
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
                v-model="fahrzeugOptions.schwerverkehrsanteilProzent"
                :label="'Schwerverkehrsanteil [%]'"
                :hint="getHintToDisplay('SV_P')"
                :color="getCheckboxColor('SV_P')"
                :persistent-hint="
                  fahrzeugOptions.schwerverkehrsanteilProzent ||
                  isTypeDisabled('SV_P') ||
                  isDifferenzdatenvergleichActive
                "
                :disabled="
                  isTypeDisabled('SV_P') || isDifferenzdatenvergleichActive
                "
                :hide-details="!isDifferenzdatenvergleichActive"
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
                v-model="fahrzeugOptions.gueterverkehr"
                :label="'Güterverkehr (GV)'"
                :hint="getHintToDisplay('GV')"
                :color="getCheckboxColor('GV')"
                :persistent-hint="
                  fahrzeugOptions.gueterverkehr || isTypeDisabled('GV')
                "
                :disabled="isTypeDisabled('GV')"
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
                v-model="fahrzeugOptions.gueterverkehrsanteilProzent"
                :label="'Güterverkehrsanteil [%]'"
                :hint="getHintToDisplay('GV_P')"
                :color="getCheckboxColor('GV_P')"
                :persistent-hint="
                  fahrzeugOptions.gueterverkehrsanteilProzent ||
                  isTypeDisabled('GV_P') ||
                  isDifferenzdatenvergleichActive
                "
                :disabled="
                  isTypeDisabled('GV_P') || isDifferenzdatenvergleichActive
                "
                :hide-details="!isDifferenzdatenvergleichActive"
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
            class="mb-4"
            align="start"
            justify="center"
            dense
            no-gutters
          >
            <v-col cols="6">
              <v-checkbox
                v-model="fahrzeugOptions.radverkehr"
                :label="'Radverkehr (Rad)'"
                :hint="getHintToDisplay('RAD')"
                :color="getCheckboxColor('RAD')"
                :persistent-hint="
                  fahrzeugOptions.radverkehr ||
                  isTypeDisabled('RAD') ||
                  isTageswertAndNot24h
                "
                :disabled="isTypeDisabled('RAD')"
                :hide-details="
                  !(isTageswertAndNot24h && fahrzeugOptions.radverkehr)
                "
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
                v-model="fahrzeugOptions.fussverkehr"
                :label="'Fußgänger (Fuß)'"
                :hint="getHintToDisplay('FUSS')"
                :color="getCheckboxColor('FUSS')"
                :persistent-hint="
                  fahrzeugOptions.gueterverkehrsanteilProzent ||
                  isTypeDisabled('FUSS') ||
                  isTageswertAndNot24h
                "
                :disabled="isTypeDisabled('FUSS')"
                :hide-details="
                  !(isTageswertAndNot24h && fahrzeugOptions.fussverkehr)
                "
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
            v-model="fahrzeugOptions.personenkraftwagen"
            :label="'Personenkraftwagen (Pkw)'"
            :hint="getHintToDisplay('PKW')"
            :persistent-hint="isTypeDisabled('PKW')"
            :disabled="isTypeDisabled('PKW')"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverPkw = true"
            @mouseleave="hoverPkw = false"
          />
          <v-checkbox
            v-model="fahrzeugOptions.lastkraftwagen"
            :label="'Lastkraftwagen (Lkw)'"
            :hint="getHintToDisplay('LKW')"
            :persistent-hint="isTypeDisabled('LKW')"
            :disabled="isTypeDisabled('LKW')"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverLkw = true"
            @mouseleave="hoverLkw = false"
          />
          <v-checkbox
            v-model="fahrzeugOptions.lastzuege"
            :label="'Lastzüge (Lz)'"
            :hint="getHintToDisplay('LZ')"
            :persistent-hint="isTypeDisabled('LZ')"
            :disabled="isTypeDisabled('LZ')"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverLz = true"
            @mouseleave="hoverLz = false"
          />
        </v-col>
        <v-col cols="4">
          <v-checkbox
            v-model="fahrzeugOptions.busse"
            :label="'Bus'"
            :hint="getHintToDisplay('BUS')"
            :persistent-hint="isTypeDisabled('BUS')"
            :disabled="isTypeDisabled('BUS')"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverBus = true"
            @mouseleave="hoverBus = false"
          />
          <v-checkbox
            v-model="fahrzeugOptions.kraftraeder"
            :label="'Krafträder (Krad )'"
            :hint="getHintToDisplay('KRAD')"
            :persistent-hint="isTypeDisabled('KRAD')"
            :disabled="isTypeDisabled('KRAD')"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverKrad = true"
            @mouseleave="hoverKrad = false"
          />
          <v-checkbox
            v-model="fahrzeugOptions.pkwEinheiten"
            :label="'PKW-Einheiten'"
            :hint="getHintToDisplay('PKW_EINHEIT')"
            :persistent-hint="isTypeDisabled('PKW_EINHEIT')"
            :disabled="isTypeDisabled('PKW_EINHEIT')"
            color="grey-darken-1"
            hide-details
            density="compact"
            @mouseover="hoverPkweinheit = true"
            @mouseleave="hoverPkweinheit = false"
          />
        </v-col>
        <v-col cols="4">
          <v-card flat>
            {{ helpTextFahrzeugkategorien }}
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";

import { computed, onMounted, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Fahrzeug from "@/types/enum/Fahrzeug";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import { useGlobalInfoMessage } from "@/util/GlobalInfoMessage";
import { useZaehlstelleUtils } from "@/util/ZaehlstelleUtils";

interface Props {
  actualZeitauswahl: string;
  isDifferenzdatenvergleichActive: boolean;
}

const props = defineProps<Props>();
const zaehlstelleStore = useZaehlstelleStore();
const zaehlstelleUtils = useZaehlstelleUtils();
const globalInfoMessage = useGlobalInfoMessage();

const emits = defineEmits<{
  (e: "fahrzeugOptions", v: OptionsDTO): void;
}>();

// Bei Auswahl der Checkbox für einen Differenzdatenvergleich werden die Werte für SV- und GV-Anteil in Prozent gespeichert,
// um diese bei Abwahl der Checkbox wieder anzeigen zu können.
const svAnteilForDifferenzdatenSaved = ref(true);
const gvAnteilForDifferenzdatenSaved = ref(true);

// Variablen für die Auswahloptionen
const fahrzeugOptions = ref({} as OptionsDTO);

const selectOrDeselectAllVmodel = ref(false);
const selectOrDeselectAllVerkehrsartenVmodel = ref(false);
const hoverSelectOrDeselectAll = ref(false);
const hoverSelectOrDeselectAllVerkehrsarten = ref(false);

// Verkehrsarten
const hoverKfz = ref(false);
const hoverSv = ref(false);
const hoverGv = ref(false);
const hoverSv_p = ref(false);
const hoverGv_p = ref(false);
const hoverRad = ref(false);
const hoverFuss = ref(false);
// Fahrzeugkategorien
const hoverPkw = ref(false);
const hoverLkw = ref(false);
const hoverLz = ref(false);
const hoverBus = ref(false);
const hoverKrad = ref(false);
const hoverPkweinheit = ref(false);

onMounted(() => {
  loadOptions(options.value);
});

// reaktiver getter auf den Store
const options = computed<OptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const isTageswertAndNot24h = computed(() => {
  return (
    fahrzeugOptions.value.zeitauswahl === Zeitauswahl.TAGESWERT &&
    activeZaehlung.value.zaehldauer !== Zaehldauer.DAUER_24_STUNDEN
  );
});

const isAnyKFZselected = computed(() => {
  return (
    fahrzeugOptions.value.kraftfahrzeugverkehr ||
    fahrzeugOptions.value.schwerverkehr ||
    fahrzeugOptions.value.gueterverkehr ||
    fahrzeugOptions.value.schwerverkehrsanteilProzent ||
    fahrzeugOptions.value.gueterverkehrsanteilProzent
  );
});

const hasSelectedVerkehrsarten = computed<boolean>(() => {
  return zaehlstelleUtils.hasSelectedVerkehrsarten(fahrzeugOptions.value);
});

/**
 * Liefert den Text für die einzelnen Verkehrsarten, welcher
 * bei MouseOver in der dritten Spalte des Optionsmenüs angezeigt wird.
 */
const helpTextVerkehrsarten = computed(() => {
  if (hoverKfz.value) {
    return "Der Kraftfahrzeugverkehr ist die Summe der Personenkraftwagen, Krafträder, Busse, Lastkraftwagen und Lastzüge.";
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
  if (hoverPkweinheit.value) {
    return "PKW-Einheiten sind die Maßeinheit, um die unterschiedliche Belastung einer Straße durch verschiedene Arten von Fahrzeugen (inklusive des Radverkehrs) in einer Größe auszudrücken.";
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
 * Hilfsmethode, um zu schauen, ob der Wert SV% im Belastungsplan angezeigt wird.
 * Dies ist nur der Fall, wenn KFZ, SV oder SV aktiviert sind und inklusive SV_P nicht
 * mehr wie 3 Verkehrsarten (ohne RAD und FUSS) ausgewählt sind
 */
const isSvpInBelastungsPlan = computed(() => {
  let actualNumberOfSelectedKfzSvAndGv = 0;
  fahrzeugOptions.value.kraftfahrzeugverkehr
    ? actualNumberOfSelectedKfzSvAndGv++
    : "";
  fahrzeugOptions.value.schwerverkehr ? actualNumberOfSelectedKfzSvAndGv++ : "";
  fahrzeugOptions.value.gueterverkehr ? actualNumberOfSelectedKfzSvAndGv++ : "";
  return (
    fahrzeugOptions.value.schwerverkehrsanteilProzent &&
    (fahrzeugOptions.value.kraftfahrzeugverkehr ||
      fahrzeugOptions.value.schwerverkehr ||
      fahrzeugOptions.value.gueterverkehr) &&
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
  fahrzeugOptions.value.kraftfahrzeugverkehr
    ? actualNumberOfSelectedKfzSvGvAndSV_P++
    : "";
  fahrzeugOptions.value.schwerverkehr
    ? actualNumberOfSelectedKfzSvGvAndSV_P++
    : "";
  fahrzeugOptions.value.gueterverkehr
    ? actualNumberOfSelectedKfzSvGvAndSV_P++
    : "";
  fahrzeugOptions.value.schwerverkehrsanteilProzent
    ? actualNumberOfSelectedKfzSvGvAndSV_P++
    : "";
  return (
    fahrzeugOptions.value.gueterverkehrsanteilProzent &&
    (fahrzeugOptions.value.kraftfahrzeugverkehr ||
      fahrzeugOptions.value.schwerverkehr ||
      fahrzeugOptions.value.gueterverkehr) &&
    actualNumberOfSelectedKfzSvGvAndSV_P < 3
  );
});

const isRadInBelastungsplan = computed(() => {
  return (
    fahrzeugOptions.value.radverkehr &&
    actualNumberOfSelectedVerkehrsarten.value === 1
  );
});

/**
 * Liefert die aktuelle Anzahl der ausgewählten Verkehrsarten zurück.
 */
const actualNumberOfSelectedVerkehrsarten = computed(() => {
  let counter = 0;
  fahrzeugOptions.value.kraftfahrzeugverkehr ? counter++ : "";
  fahrzeugOptions.value.schwerverkehr ? counter++ : "";
  fahrzeugOptions.value.gueterverkehr ? counter++ : "";
  fahrzeugOptions.value.schwerverkehrsanteilProzent ? counter++ : "";
  fahrzeugOptions.value.gueterverkehrsanteilProzent ? counter++ : "";
  fahrzeugOptions.value.radverkehr ? counter++ : "";
  fahrzeugOptions.value.fussverkehr ? counter++ : "";
  return counter;
});

const labelSelectOrDeselectAll = computed(() => {
  return selectOrDeselectAllVmodel.value ? "Alles abwählen" : "Alles auswählen";
});

const labelSelectOrDeselectAllVerkehrsarten = computed(() => {
  return selectOrDeselectAllVerkehrsartenVmodel.value
    ? "Alles abwählen"
    : "Alles auswählen";
});

/**
 * Hilfsmethode, um alle Checkboxen der Fahrzeugkategorien aufeinmal
 * aus- oder abzuwählen, wenn diese nicht disabled sind.
 * @private
 */
function selectOrDeselectAll() {
  selectOrDeselectAllVmodel.value = !selectOrDeselectAllVmodel.value;
  if (!isTypeDisabled(Fahrzeug.PKW)) {
    fahrzeugOptions.value.personenkraftwagen = selectOrDeselectAllVmodel.value;
  }
  if (!isTypeDisabled(Fahrzeug.LKW)) {
    fahrzeugOptions.value.lastkraftwagen = selectOrDeselectAllVmodel.value;
  }
  if (!isTypeDisabled(Fahrzeug.LZ)) {
    fahrzeugOptions.value.lastzuege = selectOrDeselectAllVmodel.value;
  }
  if (!isTypeDisabled(Fahrzeug.BUS)) {
    fahrzeugOptions.value.busse = selectOrDeselectAllVmodel.value;
  }
  if (!isTypeDisabled(Fahrzeug.KRAD)) {
    fahrzeugOptions.value.kraftraeder = selectOrDeselectAllVmodel.value;
  }
  if (!isTypeDisabled(Fahrzeug.PKW_EINHEIT)) {
    fahrzeugOptions.value.pkwEinheiten = selectOrDeselectAllVmodel.value;
  }
}

/**
 * Hilfsmethode, um alle Checkboxen der Verkehrsarten aufeinmal
 * aus- oder abzuwählen, wenn diese nicht disabled sind.
 * @private
 */
function selectOrDeselectAllVerkehrsarten() {
  selectOrDeselectAllVerkehrsartenVmodel.value =
    !selectOrDeselectAllVerkehrsartenVmodel.value;
  if (!isTypeDisabled(Fahrzeug.KFZ)) {
    fahrzeugOptions.value.kraftfahrzeugverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isTypeDisabled(Fahrzeug.SV)) {
    fahrzeugOptions.value.schwerverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isTypeDisabled(Fahrzeug.GV)) {
    fahrzeugOptions.value.gueterverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isTypeDisabled(Fahrzeug.SV_P)) {
    fahrzeugOptions.value.schwerverkehrsanteilProzent =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isTypeDisabled(Fahrzeug.GV_P)) {
    fahrzeugOptions.value.gueterverkehrsanteilProzent =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isTypeDisabled(Fahrzeug.RAD)) {
    fahrzeugOptions.value.radverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
  if (!isTypeDisabled(Fahrzeug.FUSS)) {
    fahrzeugOptions.value.fussverkehr =
      selectOrDeselectAllVerkehrsartenVmodel.value;
  }
}

function loadOptions(newOptions: OptionsDTO) {
  const options = {} as OptionsDTO;
  Object.assign(options, newOptions);
  fahrzeugOptions.value = options;
  calculateSelectOrDeselect();
  calculateSelectOrDeselectVerkehrsarten();
}

/**
 * Liefert den Hinweistext pro Verkehrsart, der unter der Checkbox
 * angezeigt werden soll, wenn diese nicht erfasst wurde, nicht
 * im Belastungsplan dargestellt wird (max 3 Werte) oder im Falle des
 * Rad- und Fußverkehrs nicht bei aktivem Tageswert dargestellt werden kann
 */
function getHintToDisplay(type: string): string {
  // KFZ, SV und GV werden immer im Belastungsplan angezeigt, wenn aktiv
  let hint = "";
  if (isTypeDisabled(type)) {
    return ``;
  }
  switch (type) {
    case "RAD": {
      /**
       * Durch die KI-Aufbereitung hat der Radverkehr hochgerechnete Werte
       */
      if (isTageswertAndNot24h.value) {
        hint =
          "Hinweis: Die Tageswerte für den Radverkehr wurden vom KI-Modul hochgerechnet.";
        if (isAnyKFZselected.value) {
          hint =
            "Der Tageswert für den Radverkehr kann nicht gleichzeitg mit KFZ-Werten im Belastungsplan zusammen angezeigt werden.";
        }
      }
      break;
    }
    case "FUSS": {
      if (isTageswertAndNot24h.value) {
        hint =
          "Achtung: Der Fußverkehr verfügt über keinen Tageswert. Zur Anzeige im Belastungsplan die Zeitauswahl ändern.";
      }
      break;
    }
    case "SV_P": {
      if (props.isDifferenzdatenvergleichActive) {
        hint = "Schwerverkehrsanteil bei Differenzdatenvergleich deaktiviert.";
      }
      break;
    }
    case "GV_P": {
      if (props.isDifferenzdatenvergleichActive) {
        hint = "Güterverkehrsanteil bei Differenzdatenvergleich deaktiviert.";
      }
      break;
    }
  }
  return hint;
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
    case "SV_P": {
      if (!isSvpInBelastungsPlan.value) {
        color = "grey-darken-1";
      }
      break;
    }
    case "GV_P": {
      if (!isGvpInBelastungsPlan.value) {
        color = "grey-darken-1";
      }
      break;
    }
    case "RAD": {
      if (!isRadInBelastungsplan.value) {
        color = "grey-darken-1";
      }
      break;
    }
    case "FUSS": {
      if (
        fahrzeugOptions.value.fussverkehr &&
        actualNumberOfSelectedVerkehrsarten.value > 1
      ) {
        color = "grey-darken-1";
      }
      if (isTageswertAndNot24h.value) {
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
      if (fahrzeugOptions.value.kraftfahrzeugverkehr) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case Fahrzeug.SV: {
      if (fahrzeugOptions.value.schwerverkehr) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case Fahrzeug.GV: {
      if (fahrzeugOptions.value.gueterverkehr) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case "SV_P": {
      // Angezeigt, wenn (KFZ || SV || GV) && KFZ + SV + GV < 3
      if (isSvpInBelastungsPlan.value) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case "GV_P": {
      // Angezeigt, wenn (KFZ || SV || GV) && KFZ + SV + GV + SV% < 3
      if (isGvpInBelastungsPlan.value) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case "RAD": {
      // Angezeigt, wenn RAD oder RAD && FUSS
      if (isRadInBelastungsplan.value) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
    case "FUSS": {
      // Angezeigt, wenn FUSS
      if (
        !isTageswertAndNot24h.value &&
        fahrzeugOptions.value.fussverkehr &&
        actualNumberOfSelectedVerkehrsarten.value === 1
      ) {
        icon = `mdi-arrow-decision`;
      }
      break;
    }
  }
  return icon;
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
  if (!isTypeDisabled(Fahrzeug.PKW)) {
    fahrzeugOptions.value.personenkraftwagen ? counter++ : "";
    maxSelectable++;
  }
  if (!isTypeDisabled(Fahrzeug.LKW)) {
    fahrzeugOptions.value.lastkraftwagen ? counter++ : "";
    maxSelectable++;
  }
  if (!isTypeDisabled(Fahrzeug.LZ)) {
    fahrzeugOptions.value.lastzuege ? counter++ : "";
    maxSelectable++;
  }
  if (!isTypeDisabled(Fahrzeug.BUS)) {
    fahrzeugOptions.value.busse ? counter++ : "";
    maxSelectable++;
  }
  if (!isTypeDisabled(Fahrzeug.KRAD)) {
    fahrzeugOptions.value.kraftraeder ? counter++ : "";
    maxSelectable++;
  }
  if (!isTypeDisabled(Fahrzeug.PKW_EINHEIT)) {
    fahrzeugOptions.value.pkwEinheiten ? counter++ : "";
    maxSelectable++;
  }
  // counter > maxSelectable/2 => abwählen
  // sonst => auswählen
  selectOrDeselectAllVmodel.value = counter > maxSelectable / 2;
}

/**
 * Gibt vor, ob die Checkbox Alle Verkehrsarten auswählen oder
 * abwählen soll. Dazu wird die Anzahl der aktiven Checkboxen, sowie
 * die Anzahl der maximal Auswählbaren bestimmt.
 * Wenn mehr wie die Hälfte der Möglichen ausgewählt ist, so ist es
 * ein abwählen, sonst ein auswählen.
 */
function calculateSelectOrDeselectVerkehrsarten() {
  let counter = 0;
  let maxSelectable = 0;
  if (!isTypeDisabled(Fahrzeug.KFZ)) {
    fahrzeugOptions.value.kraftfahrzeugverkehr ? counter++ : "";
    maxSelectable++;
  }
  if (!isTypeDisabled(Fahrzeug.SV)) {
    fahrzeugOptions.value.schwerverkehr ? counter++ : "";
    maxSelectable++;
  }
  if (!isTypeDisabled(Fahrzeug.GV)) {
    fahrzeugOptions.value.gueterverkehr ? counter++ : "";
    maxSelectable++;
  }
  if (!isTypeDisabled(Fahrzeug.SV_P)) {
    fahrzeugOptions.value.schwerverkehrsanteilProzent ? counter++ : "";
    maxSelectable++;
  }
  if (!isTypeDisabled(Fahrzeug.GV_P)) {
    fahrzeugOptions.value.gueterverkehrsanteilProzent ? counter++ : "";
    maxSelectable++;
  }
  if (!isTypeDisabled(Fahrzeug.RAD)) {
    fahrzeugOptions.value.radverkehr ? counter++ : "";
    maxSelectable++;
  }
  if (!isTypeDisabled(Fahrzeug.FUSS)) {
    fahrzeugOptions.value.fussverkehr ? counter++ : "";
    maxSelectable++;
  }
  // counter > maxSelectable/2 => abwählen
  // sonst => auswählen
  selectOrDeselectAllVerkehrsartenVmodel.value = counter > maxSelectable / 2;
}

/**
 * Wählt die entsprechende Fahrzeugkategorie und Fahrzeugklasse im OptionsDTO entsprechend der gewählten Zeitauswahl.
 */
function adaptFahrzeugauswahl(options: OptionsDTO): OptionsDTO {
  if (
    options.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
    options.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
  ) {
    options.kraftfahrzeugverkehr = false;
    options.schwerverkehr = false;
    options.gueterverkehr = false;
    options.schwerverkehrsanteilProzent = false;
    options.gueterverkehrsanteilProzent = false;
    options.personenkraftwagen = false;
    options.lastkraftwagen = false;
    options.lastzuege = false;
    options.busse = false;
    options.kraftraeder = false;
  } else {
    options.kraftfahrzeugverkehr = true;
    options.schwerverkehr = true;
    options.gueterverkehr = true;
    options.schwerverkehrsanteilProzent = true;
    options.gueterverkehrsanteilProzent = true;
  }
  if (options.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD) {
    options.radverkehr = true;
    options.fussverkehr = false;
  } else if (options.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS) {
    options.radverkehr = false;
    options.fussverkehr = true;
  }
  return options;
}

/**
 * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
 * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
 */
function isTypeDisabled(type: string): boolean {
  return zaehlstelleUtils.isTypeDisabled(type, activeZaehlung.value);
}

watch(
  () => props.isDifferenzdatenvergleichActive,
  () => {
    if (props.isDifferenzdatenvergleichActive) {
      // Werte zwischenspeichern und auf false setzen
      svAnteilForDifferenzdatenSaved.value =
        fahrzeugOptions.value.schwerverkehrsanteilProzent;
      gvAnteilForDifferenzdatenSaved.value =
        fahrzeugOptions.value.gueterverkehrsanteilProzent;
      fahrzeugOptions.value.schwerverkehrsanteilProzent = false;
      fahrzeugOptions.value.gueterverkehrsanteilProzent = false;
    } else {
      // Zwischengespeicherte Werte den Optionen zuweisen
      fahrzeugOptions.value.schwerverkehrsanteilProzent =
        svAnteilForDifferenzdatenSaved.value;
      fahrzeugOptions.value.gueterverkehrsanteilProzent =
        gvAnteilForDifferenzdatenSaved.value;
    }
  }
);

watch(
  fahrzeugOptions,
  () => {
    calculateSelectOrDeselect();
    calculateSelectOrDeselectVerkehrsarten();
    emits("fahrzeugOptions", fahrzeugOptions.value);
  },
  { deep: true }
);

watch(
  options,
  (newOptions: OptionsDTO) => {
    loadOptions(newOptions);
  },
  { immediate: true }
);

watch(
  () => props.actualZeitauswahl,
  (zeitauswahl: string) => {
    fahrzeugOptions.value.zeitauswahl = zeitauswahl;
    adaptFahrzeugauswahl(fahrzeugOptions.value);
  }
);
</script>
