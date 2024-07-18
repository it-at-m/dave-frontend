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
      :row-props="(item) => rowClasses(item.item)"
  />
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
        key: 'Zeit',
        align: 'center',
        children: [
          {
            title: "von",
            value: "startUhrzeit",
            key: "startUhrzeit",
            align: "center",
            sortable: false,
            width: '7%',
          },
          {
            title: "bis",
            value: "endeUhrzeit",
            key: "endeUhrzeit",
            align: "center",
            sortable: false,
            width: '7%',
          },
          {
            title: "",
            value: "type",
            key: "type",
            align: "center",
            sortable: false,
            width: '8%',
            // fixed: true,
          },
        ],
      },
      {
        title: 'Fahrzeugtypen',
        key: 'Fahrzeugtypen',
        align: 'center',
        children: [
          {
            title: "Pkw",
            value: "pkw",
            key: "pkw",
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
          },
          {
            title: "Lkw",
            value: "lkw",
            key: "lkw",
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
            key: "lastzuege",
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
            key: "busse",
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
            key: "kraftraeder",
            align: "center",
            // fixed: !(options.radverkehr || options.fussverkehr),
            sortable: false,
            width: widthFahrzeugtypen,
          },
          {
            title: "Rad",
            value: "fahrradfahrer",
            key: "fahrradfahrer",
            align: "center",
            // fixed: !options.fussverkehr,
            sortable: false,
            width: widthFahrzeugtypen,
          },
          {
            title: "Fuß",
            value: "fussgaenger",
            key: "fussgaenger",
            align: "center",
            // fixed: true,
            sortable: false,
            width: widthFahrzeugtypen,
          },
        ],
      },
      {
        title: 'Fahrzeugklassen',
        key: 'Fahrzeugklassen',
        align: 'center',
        children: [
          {
            title: "KFZ",
            value: "kfz",
            key: "kfz",
            align: "center",
            // fixed: !(options.schwerverkehr || options.gueterverkehr),
            sortable: false,
            width: widthFahrzeugklassen,
          },
          {
            title: "SV",
            value: "schwerverkehr",
            key: "schwerverkehr",
            align: "center",
            // fixed: !options.gueterverkehr,
            sortable: false,
            width: widthFahrzeugklassen,
          },
          {
            title: "GV",
            value: "gueterverkehr",
            key: "gueterverkehr",
            align: "center",
            // fixed: true,
            sortable: false,
            width: widthFahrzeugklassen,
          },
        ],
      },{
        title: 'Anteil',
        key: 'Anteil',
        align: 'center',
        children: [
          {
            title: "SV%",
            value: "anteilSchwerverkehrAnKfzProzent",
            key: "anteilSchwerverkehrAnKfzProzent",
            align: "center",
            // fixed: !options.gueterverkehrsanteilProzent,
            sortable: false,
            width: widthAnteil,
          },
          {
            title: "GV%",
            value: "anteilGueterverkehrAnKfzProzent",
            key: "anteilGueterverkehrAnKfzProzent",
            align: "center",
            // fixed: true,
            sortable: false,
            width: widthAnteil,
          },
        ],
      },{
        title: '',
        key: 'empty_pkwEinheiten',
        align: 'center',
        children: [
          {
            title: "PKW-Einheiten",
            value: "pkwEinheiten",
            key: "pkwEinheiten",
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
  let color = "bg-white";
  if (ladeZaehldatum.type === TYPE_STUNDE) {
        color = "bg-blue-grey-lighten-4 font-weight-bold";
    } else if (
        ladeZaehldatum.type != undefined &&
        (ladeZaehldatum.type.includes(TYPE_SP_STD_BLOCK) ||
            ladeZaehldatum.type.includes(TYPE_SP_STD_TAG))
    ) {
        color = "bg-blue-grey-lighten-3 font-weight-bold";
    } else if (ladeZaehldatum.type === TYPE_BLOCK) {
        color = "bg-blue-grey-lighten-2 font-weight-black text-black";
    } else if (
        ladeZaehldatum.type === TYPE_GESAMT ||
        ladeZaehldatum.type === TYPE_TAGESWERT
    ) {
        color = "bg-blue-grey-lighten-1 font-weight-black text-black";
    }
  return {class: color};
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