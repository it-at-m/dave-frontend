<template>
  <v-data-table
      :headers="headers"
      :items="listenausgabeData"
      item-key="name"
      items-per-page="-1"
      hide-default-footer
      density="compact"
      fixed-header
      :height="height"
  >
  </v-data-table>
  <!--        :item-class="rowClasses"-->

  <!--    <template v-slot:item.testit="{ item, value }">-->
  <!--      <div :class="rowClasses(item)">{{value}}</div>-->
  <!--    </template>-->
  <!--    <template v-slot:item="{ item }">-->
  <!--      <tr :class="rowClasses(item)" />-->
  <!--    </template>-->
</template>

<script setup lang="ts">
import type LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";
import DataManipulatorUtil from "@/util/DataManipulatorUtil";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import { computed, watch } from "vue";
import { useZaehlstelleStore } from "@/store/zaehlstelle";

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
    let widthFahrzeugtypen: string = calculateColumnWidth(
        42,
        activeFahrzeugtypen.value
    );
    let widthFahrzeugklassen: string = calculateColumnWidth(
        21,
        activeFahrzeugklassen.value
    );
    let widthAnteil: string = calculateColumnWidth(8, activeAnteil.value);
    /* eslint-disable @typescript-eslint/ban-types */
    let headers: Array<{}> = [
       // Zeit
      {
        title: 'Zeit',
        align: 'center',
        children: [
          {
            title: "von",
            value: "startUhrzeit",
            align: "center",
            sortable: false,
            width: '7%',
          },
          {
            title: "bis",
            value: "endeUhrzeit",
            align: "center",
            sortable: false,
            width: '7%',
          },
          {
            title: "",
            value: "type",
            align: "center",
            sortable: false,
            width: '8%',
            fixed: true,
          },
        ],
      },
      {
        title: 'Fahrzeugtypen',
        align: 'center',
        children: [
          {
            title: "Pkw",
            value: "pkw",
            align: "center",
            // fixed: !(
            //     options.radverkehr ||
            //     options.fussverkehr ||
            //     options.kraftraeder ||
            //     options.busse ||
            //     options.lastzuege ||
            //     options.lastkraftwagen
            // ),
            sortable: false,
            width: widthFahrzeugtypen,
            key: 'testit'
          },
          {
            title: "Lkw",
            value: "lkw",
            align: "center",
            // fixed: !(
            //     options.radverkehr ||
            //     options.fussverkehr ||
            //     options.kraftraeder ||
            //     options.busse ||
            //     options.lastzuege
            // ),
            sortable: false,
            width: widthFahrzeugtypen,
          },
          {
            title: "Lz",
            value: "lastzuege",
            align: "center",
            // fixed: !(
            //     options.radverkehr ||
            //     options.fussverkehr ||
            //     options.kraftraeder ||
            //     options.busse
            // ),
            sortable: false,
            width: widthFahrzeugtypen,
          },
          {
            title: "Bus",
            value: "busse",
            align: "center",
            // fixed: !(
            //     options.radverkehr ||
            //     options.fussverkehr ||
            //     options.kraftraeder
            // ),
            sortable: false,
            width: widthFahrzeugtypen,
          },
          {
            title: "Krad",
            value: "kraftraeder",
            align: "center",
            // fixed: !(options.radverkehr || options.fussverkehr),
            sortable: false,
            width: widthFahrzeugtypen,
          },
          {
            title: "Rad",
            value: "fahrradfahrer",
            align: "center",
            // fixed: !options.fussverkehr,
            sortable: false,
            width: widthFahrzeugtypen,
          },
          {
            title: "Fuß",
            value: "fussgaenger",
            align: "center",
            fixed: true,
            sortable: false,
            width: widthFahrzeugtypen,
          },
        ],
      },
      {
        title: 'Fahrzeugklassen',
        align: 'center',
        children: [
          {
            title: "KFZ",
            value: "kfz",
            align: "center",
            fixed: !(options.schwerverkehr || options.gueterverkehr),
            sortable: false,
            width: widthFahrzeugklassen,
          },
          {
            title: "SV",
            value: "schwerverkehr",
            align: "center",
            fixed: !options.gueterverkehr,
            sortable: false,
            width: widthFahrzeugklassen,
          },
          {
            title: "GV",
            value: "gueterverkehr",
            align: "center",
            fixed: true,
            sortable: false,
            width: widthFahrzeugklassen,
          },
        ],
      },{
        title: 'Anteil',
        align: 'center',
        children: [
          {
            title: "SV%",
            value: "anteilSchwerverkehrAnKfzProzent",
            align: "center",
            fixed: !options.gueterverkehrsanteilProzent,
            sortable: false,
            width: widthAnteil,
          },
          {
            title: "GV%",
            value: "anteilGueterverkehrAnKfzProzent",
            align: "center",
            fixed: true,
            sortable: false,
            width: widthAnteil,
          },
        ],
      },{
        title: '',
        align: 'center',
        children: [
          {
            title: "PKW-Einheiten",
            value: "pkwEinheiten",
            align: "center",
            sortable: false,
            width: '7%'
          },
        ],
      },
    ];

    return headers;
});

function rowClasses(ladeZaehldatum: LadeZaehldatumDTO) {
    if (ladeZaehldatum.type === TYPE_STUNDE) {
        return "blue-grey-lighten-4 font-weight-bold";
    } else if (
        ladeZaehldatum.type != undefined &&
        (ladeZaehldatum.type.includes(TYPE_SP_STD_BLOCK) ||
            ladeZaehldatum.type.includes(TYPE_SP_STD_TAG))
    ) {
        return "blue-grey-lighten-3 font-weight-bold";
    } else if (ladeZaehldatum.type === TYPE_BLOCK) {
        return "blue-grey-lighten-2 font-weight-black";
    } else if (
        ladeZaehldatum.type === TYPE_GESAMT ||
        ladeZaehldatum.type === TYPE_TAGESWERT
    ) {
        return "blue-grey-lighten-1 font-weight-black";
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