<template xmlns="http://www.w3.org/1999/html">
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
        lastFixed: true,
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
            lastFixed: true
          },
        ],
      }
    ];

    if (activeFahrzeugtypen.value > 0) {
      const children = [];

      if (options.personenkraftwagen) {
        children.push({
          title: "Pkw",
          value: "pkw",
          key: "pkw",
          align: "center",
          lastFixed: !(
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
        children.push({
          title: "Lkw",
          value: "lkw",
          key: "lkw",
          align: "center",
          lastFixed: !(
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
        children.push({
          title: "Lz",
          value: "lastzuege",
          key: "lastzuege",
          align: "center",
          lastFixed: !(
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
        children.push({
          title: "Bus",
          value: "busse",
          key: "busse",
          align: "center",
          lastFixed: !(
              options.radverkehr ||
              options.fussverkehr ||
              options.kraftraeder
          ),
          sortable: false,
          width: widthFahrzeugtypen,
        });
      }

      if (options.kraftraeder) {
        children.push({
          title: "Krad",
          value: "kraftraeder",
          key: "kraftraeder",
          align: "center",
          lastFixed: !(options.radverkehr || options.fussverkehr),
          sortable: false,
          width: widthFahrzeugtypen,
        });
      }

      if (options.radverkehr) {
        children.push({
          title: "Rad",
          value: "fahrradfahrer",
          key: "fahrradfahrer",
          align: "center",
          lastFixed: !options.fussverkehr,
          sortable: false,
          width: widthFahrzeugtypen,
        });
      }

      if (options.fussverkehr) {
        children.push({
          title: "Fuß",
          value: "fussgaenger",
          key: "fussgaenger",
          align: "center",
          lastFixed: true,
          sortable: false,
          width: widthFahrzeugtypen,
        });
      }

      headers.push({
        title: 'Fahrzeugtypen',
        key: 'Fahrzeugtypen',
        align: 'center',
        lastFixed: true,
        children: children
      });
    }

    if (activeFahrzeugklassen.value > 0) {
      const children = [];
      if (options.kraftfahrzeugverkehr) {
        children.push({
          title: "KFZ",
          value: "kfz",
          key: "kfz",
          align: "center",
          lastFixed: !(options.schwerverkehr || options.gueterverkehr),
          sortable: false,
          width: widthFahrzeugklassen,
        });
      }

      if (options.schwerverkehr) {
        children.push({
          title: "SV",
          value: "schwerverkehr",
          key: "schwerverkehr",
          align: "center",
          lastFixed: !options.gueterverkehr,
          sortable: false,
          width: widthFahrzeugklassen,
        });
      }

      if (options.gueterverkehr) {
        children.push({
          title: "GV",
          value: "gueterverkehr",
          key: "gueterverkehr",
          align: "center",
          lastFixed: true,
          sortable: false,
          width: widthFahrzeugklassen,
        });
      }

      headers.push({
        title: 'Fahrzeugklassen',
        key: 'Fahrzeugklassen',
        align: 'center',
        lastFixed: true,
        children: children,
      });
    }

    if (activeAnteil.value > 0) {
      const children = [];
      if (options.schwerverkehrsanteilProzent) {
        children.push({
          title: "SV%",
          value: "anteilSchwerverkehrAnKfzProzent",
          key: "anteilSchwerverkehrAnKfzProzent",
          align: "center",
          lastFixed: !options.gueterverkehrsanteilProzent,
          sortable: false,
          width: widthAnteil,
        });
      }
      if (options.gueterverkehrsanteilProzent) {
        children.push({
          title: "GV%",
          value: "anteilGueterverkehrAnKfzProzent",
          key: "anteilGueterverkehrAnKfzProzent",
          align: "center",
          lastFixed: true,
          sortable: false,
          width: widthAnteil,
        });
      }
      headers.push({
        title: 'Anteil',
        key: 'Anteil',
        align: 'center',
        lastFixed: true,
        children: children,
      });
    }

    if (options.pkwEinheiten) {
      headers.push({
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
      })
    }

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