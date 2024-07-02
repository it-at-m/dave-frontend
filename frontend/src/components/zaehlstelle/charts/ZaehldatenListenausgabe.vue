<template>
  <v-data-table
    style="margin-left: 3%; margin-right: 3%; border: 0.5px lightgray solid"
    :headers="headers"
    :items="listenausgabeData"
    :item-class="rowClasses"
    :items-per-page="-1"
    dense
    hide-default-footer
    fixed-header
    :height="height"
  >
    <template #header>
      <thead>
        <tr>
          <th
            colspan="3"
            class="text-center parent-header"
            :style="headerCategoryStyle"
          >
            Zeit
          </th>
          <th
            v-if="activeFahrzeugtypen > 0"
            :colspan="activeFahrzeugtypen"
            class="text-center parent-header"
            :style="headerCategoryStyle"
          >
            Fahrzeugtypen
          </th>
          <th
            v-if="activeFahrzeugklassen > 0"
            :colspan="activeFahrzeugklassen"
            class="text-center parent-header"
            :style="headerCategoryStyle"
          >
            Fahrzeugklasse
          </th>
          <th
            v-if="activeAnteil > 0"
            :colspan="activeAnteil"
            class="text-center parent-header"
            :style="headerCategoryStyle"
          >
            Anteil
          </th>
          <th
            v-if="activePkweinheiten"
            colspan="1"
            class="text-center parent-header"
            :style="headerCategoryStyle"
          ></th>
        </tr>
      </thead>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import type LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";

import { computed, watch } from "vue";

import { useZaehlstelleStore } from "@/store/zaehlstelle";
import DataManipulatorUtil from "@/util/DataManipulatorUtil";

const TYPE_GESAMT = "Gesamt";

const TYPE_TAGESWERT = "Tageswert";

const TYPE_STUNDE = "Stunde";

const TYPE_BLOCK = "Block";

const TYPE_SP_STD_BLOCK = "SpStdBlock";

const TYPE_SP_STD_TAG = "SpStdTag";

const headerCategoryStyle =
  "font-weight: bolder; position: sticky; top: 0; z-index: 2";

interface Props {
  listenausgabeData: Array<LadeZaehldatumDTO>;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: "100%",
});

const zaehlstelleStore = useZaehlstelleStore();

/**
 * Liefert die Anzahl der ausgewaehlten Fahrzeugtypen zurueck.
 * Wird benoetigt, um die Kategorie-Ueberschrift in der Listenausgabe
 * und die Breite der einzelnen Eintraege darin zu steuern
 */
const activeFahrzeugtypen = computed(() => {
  let activeFahrzeugtypen = 0;
  const options = optionen.value;
  if (options.personenkraftwagen) {
    activeFahrzeugtypen++;
  }
  if (options.lastkraftwagen) {
    activeFahrzeugtypen++;
  }
  if (options.lastzuege) {
    activeFahrzeugtypen++;
  }
  if (options.busse) {
    activeFahrzeugtypen++;
  }
  if (options.kraftraeder) {
    activeFahrzeugtypen++;
  }
  if (options.radverkehr) {
    activeFahrzeugtypen++;
  }
  if (options.fussverkehr) {
    activeFahrzeugtypen++;
  }
  return activeFahrzeugtypen;
});

/**
 * Liefert die Anzahl der ausgewaehlten Fahrzeugklasse zurueck.
 * Wird benoetigt, um die Kategorie-Ueberschrift in der Listenausgabe
 * und die Breite der einzelnen Eintraege darin zu steuern
 */
const activeFahrzeugklassen = computed(() => {
  let activeFahrzeugklassen = 0;
  const options = optionen.value;
  if (options.kraftfahrzeugverkehr) {
    activeFahrzeugklassen++;
  }
  if (options.schwerverkehr) {
    activeFahrzeugklassen++;
  }
  if (options.gueterverkehr) {
    activeFahrzeugklassen++;
  }
  return activeFahrzeugklassen;
});

/**
 * Liefert die Anzahl der ausgewaehlten Anteile (SV%/GV&) zurueck.
 * Wird benoetigt, um die Kategorie-Ueberschrift in der Listenausgabe
 * und die Breite der einzelnen Eintraege darin zu steuern
 */
const activeAnteil = computed(() => {
  let activeAnteil = 0;
  const options = optionen.value;
  if (options.schwerverkehrsanteilProzent) {
    activeAnteil++;
  }
  if (options.gueterverkehrsanteilProzent) {
    activeAnteil++;
  }
  return activeAnteil;
});

/** Liefert zurueck, ob die OPtion PKW-Einheiten ausgewaehlt wurde */
const activePkweinheiten = computed(() => {
  return optionen.value.pkwEinheiten;
});

const optionen = computed<OptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});

/**
 * Baut den Listenheader dynamisch anhand der ausgewaehlten Felder im Optionsmenue auf
 */
const headers = computed(() => {
  const options = optionen.value;
  const widthFahrzeugtypen: string = calculateColumnWidth(
    42,
    activeFahrzeugtypen.value
  );
  const widthFahrzeugklassen: string = calculateColumnWidth(
    21,
    activeFahrzeugklassen.value
  );
  const widthAnteil: string = calculateColumnWidth(8, activeAnteil.value);
  /* eslint-disable @typescript-eslint/ban-types */
  const headers: Array<{}> = [
    {
      text: "von",
      value: "startUhrzeit",
      align: "center",
      sortable: false,
      width: "7%",
    },
    {
      text: "bis",
      value: "endeUhrzeit",
      align: "center",
      sortable: false,
      width: "7%",
    },
    {
      text: "",
      value: "type",
      align: "center",
      divider: "true",
      sortable: false,
      width: "8%",
    },
  ];

  // Kategorien
  if (options.personenkraftwagen) {
    headers.push({
      text: "Pkw",
      value: "pkw",
      align: "center",
      divider: !(
        options.radverkehr ||
        options.fussverkehr ||
        options.kraftraeder ||
        options.busse ||
        options.lastzuege ||
        options.lastkraftwagen
      ),
      sortable: false,
      width: widthFahrzeugtypen,
    });
  }
  if (options.lastkraftwagen) {
    headers.push({
      text: "Lkw",
      value: "lkw",
      align: "center",
      divider: !(
        options.radverkehr ||
        options.fussverkehr ||
        options.kraftraeder ||
        options.busse ||
        options.lastzuege
      ),
      sortable: false,
      width: widthFahrzeugtypen,
    });
  }
  if (options.lastzuege) {
    headers.push({
      text: "Lz",
      value: "lastzuege",
      align: "center",
      divider: !(
        options.radverkehr ||
        options.fussverkehr ||
        options.kraftraeder ||
        options.busse
      ),
      sortable: false,
      width: widthFahrzeugtypen,
    });
  }
  if (options.busse) {
    headers.push({
      text: "Bus",
      value: "busse",
      align: "center",
      divider: !(
        options.radverkehr ||
        options.fussverkehr ||
        options.kraftraeder
      ),
      sortable: false,
      width: widthFahrzeugtypen,
    });
  }
  if (options.kraftraeder) {
    headers.push({
      text: "Krad",
      value: "kraftraeder",
      align: "center",
      divider: !(options.radverkehr || options.fussverkehr),
      sortable: false,
      width: widthFahrzeugtypen,
    });
  }
  if (options.radverkehr) {
    headers.push({
      text: "Rad",
      value: "fahrradfahrer",
      align: "center",
      divider: !options.fussverkehr,
      sortable: false,
      width: widthFahrzeugtypen,
    });
  }
  if (options.fussverkehr) {
    headers.push({
      text: "Fuß",
      value: "fussgaenger",
      align: "center",
      divider: true,
      sortable: false,
      width: widthFahrzeugtypen,
    });
  }

  // Klassen
  if (options.kraftfahrzeugverkehr) {
    headers.push({
      text: "KFZ",
      value: "kfz",
      align: "center",
      divider: !(options.schwerverkehr || options.gueterverkehr),
      sortable: false,
      width: widthFahrzeugklassen,
    });
  }
  if (options.schwerverkehr) {
    headers.push({
      text: "SV",
      value: "schwerverkehr",
      align: "center",
      divider: !options.gueterverkehr,
      sortable: false,
      width: widthFahrzeugklassen,
    });
  }
  if (options.gueterverkehr) {
    headers.push({
      text: "GV",
      value: "gueterverkehr",
      align: "center",
      divider: true,
      sortable: false,
      width: widthFahrzeugklassen,
    });
  }

  // Anteile
  if (options.schwerverkehrsanteilProzent) {
    headers.push({
      text: "SV%",
      value: "anteilSchwerverkehrAnKfzProzent",
      align: "center",
      divider: !options.gueterverkehrsanteilProzent,
      sortable: false,
      width: widthAnteil,
    });
  }
  if (options.gueterverkehrsanteilProzent) {
    headers.push({
      text: "GV%",
      value: "anteilGueterverkehrAnKfzProzent",
      align: "center",
      divider: true,
      sortable: false,
      width: widthAnteil,
    });
  }

  // PKW-Einheiten
  if (options.pkwEinheiten) {
    headers.push({
      text: "PKW-Einheiten",
      value: "pkwEinheiten",
      align: "center",
      sortable: false,
      width: "7%",
    });
  }

  return headers;
});

function rowClasses(ladeZaehldatum: LadeZaehldatumDTO) {
  if (ladeZaehldatum.type === TYPE_STUNDE) {
    return "blue-grey lighten-4 font-weight-bold";
  } else if (
    ladeZaehldatum.type != undefined &&
    (ladeZaehldatum.type.includes(TYPE_SP_STD_BLOCK) ||
      ladeZaehldatum.type.includes(TYPE_SP_STD_TAG))
  ) {
    return "blue-grey lighten-3 font-weight-bold";
  } else if (ladeZaehldatum.type === TYPE_BLOCK) {
    return "blue-grey lighten-2 font-weight-black";
  } else if (
    ladeZaehldatum.type === TYPE_GESAMT ||
    ladeZaehldatum.type === TYPE_TAGESWERT
  ) {
    return "blue-grey lighten-1 font-weight-black";
  }
}

/** Berechnet die Spaltenbreite für die einzelnen Eintraege */
function calculateColumnWidth(
  maxWidth: number,
  activeElements: number
): string {
  return `${activeElements > 0 ? maxWidth / activeElements : 0}%`;
}

watch(
  () => props.listenausgabeData,
  (listenausgabeData: Array<LadeZaehldatumDTO>) => {
    listenausgabeData.forEach((zaehldatum) => {
      zaehldatum.endeUhrzeit =
        DataManipulatorUtil.manipulateEndeUhrzeit(zaehldatum);
      // Muss gemacht werden, damit immer eine Nachkommastelle existiert, auch bei 1.0
      zaehldatum.anteilGueterverkehrAnKfzProzent = parseFloat(
        zaehldatum.anteilGueterverkehrAnKfzProzent
      ).toFixed(1);
      zaehldatum.anteilSchwerverkehrAnKfzProzent = parseFloat(
        zaehldatum.anteilSchwerverkehrAnKfzProzent
      ).toFixed(1);
    });
  },
  { immediate: true }
);
</script>

<!--<style lang="sass">-->
<!--@import 'vuetify/lib/components/VDataTable/variables'-->
<!--.v-data-table&#45;&#45;fixed-header-->
<!--  > .v-data-table__wrapper-->
<!--    overflow-y: auto-->

<!--    > table-->
<!--      > thead-->
<!--        > tr-->
<!--          > th-->
<!--            border-bottom: 0 !important-->
<!--            position: sticky-->
<!--            top: $data-table-dense-header-height-->
<!--            z-index: 2-->

<!--        > tr:nth-child(2)-->
<!--          > th-->
<!--            top: $data-table-dense-header-height-->

<!--  // Account for scroll bar-->
<!--  .v-data-footer-->
<!--    +ltr()-->
<!--      margin-right: $data-table-scroll-bar-width-->

<!--    +rtl()-->
<!--      margin-left: $data-table-scroll-bar-width-->
<!--</style>-->
