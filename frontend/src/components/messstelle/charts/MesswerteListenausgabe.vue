<template>
  <v-data-table
    :headers="headers as Array<any>"
    :items="listenausgabeData"
    item-key="name"
    items-per-page="-1"
    hide-default-footer
    density="compact"
    fixed-header
    :height="height"
    :row-props="(item: any) => rowClasses(item.item)"
  />
</template>

<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import type LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";

import { computed, watch } from "vue";

import { useMessstelleStore } from "@/store/MessstelleStore";
import DataManipulatorUtil from "@/util/DataManipulatorUtil";

const messstelleStore = useMessstelleStore();

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

const optionen = computed<MessstelleOptionsDTO>(() => {
  return messstelleStore.getFilteroptions;
});

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

/**
 * Liefert die Anzahl der ausgewaehlten Fahrzeugtypen zurueck.
 * Wird benoetigt, um die Kategorie-Ueberschrift in der Listenausgabe
 * und die Breite der einzelnen Eintraege darin zu steuern
 */
const activeFahrzeugtypen = computed(() => {
  let activeFahrzeugtypen = 0;
  const fahrzeugOptions = optionen.value.fahrzeuge;
  if (fahrzeugOptions.personenkraftwagen) {
    activeFahrzeugtypen++;
  }
  if (fahrzeugOptions.lastkraftwagen) {
    activeFahrzeugtypen++;
  }
  if (fahrzeugOptions.lastzuege) {
    activeFahrzeugtypen++;
  }
  if (fahrzeugOptions.lieferwagen) {
    activeFahrzeugtypen++;
  }
  if (fahrzeugOptions.busse) {
    activeFahrzeugtypen++;
  }
  if (fahrzeugOptions.kraftraeder) {
    activeFahrzeugtypen++;
  }
  if (fahrzeugOptions.radverkehr) {
    activeFahrzeugtypen++;
  }
  if (fahrzeugOptions.fussverkehr) {
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
  const fahrzeugOptions = optionen.value.fahrzeuge;
  if (fahrzeugOptions.kraftfahrzeugverkehr) {
    activeFahrzeugklassen++;
  }
  if (fahrzeugOptions.schwerverkehr) {
    activeFahrzeugklassen++;
  }
  if (fahrzeugOptions.gueterverkehr) {
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
  const fahrzeugOptions = optionen.value.fahrzeuge;
  if (fahrzeugOptions.schwerverkehrsanteilProzent) {
    activeAnteil++;
  }
  if (fahrzeugOptions.gueterverkehrsanteilProzent) {
    activeAnteil++;
  }
  return activeAnteil;
});

/**
 * Baut den Listenheader dynamisch anhand der ausgewaehlten Felder im Optionsmenue auf
 */
const headers = computed(() => {
  const fahrzeugOptions = optionen.value.fahrzeuge;
  const widthFahrzeugtypen: string = calculateColumnWidth(
    42,
    activeFahrzeugtypen.value
  );
  const widthFahrzeugklassen: string = calculateColumnWidth(
    21,
    activeFahrzeugklassen.value
  );
  const widthAnteil: string = calculateColumnWidth(8, activeAnteil.value);
  const headers = [
    // Zeit
    {
      title: "Zeit",
      key: "Zeit",
      align: "center",
      lastFixed: true,
      children: [
        {
          title: "von",
          value: "startUhrzeit",
          key: "startUhrzeit",
          align: "center",
          sortable: false,
          width: "7%",
        },
        {
          title: "bis",
          value: "endeUhrzeit",
          key: "endeUhrzeit",
          align: "center",
          sortable: false,
          width: "7%",
        },
        {
          title: "",
          value: "type",
          key: "type",
          align: "center",
          sortable: false,
          width: "8%",
          lastFixed: true,
        },
      ],
    },
  ];

  if (activeFahrzeugtypen.value > 0) {
    const children = [];

    if (fahrzeugOptions.personenkraftwagen) {
      children.push({
        title: "Pkw",
        value: "pkw",
        key: "pkw",
        align: "center",
        lastFixed: !(
          fahrzeugOptions.radverkehr ||
          fahrzeugOptions.fussverkehr ||
          fahrzeugOptions.kraftraeder ||
          fahrzeugOptions.busse ||
          fahrzeugOptions.lastzuege ||
          fahrzeugOptions.lastkraftwagen ||
          fahrzeugOptions.lieferwagen
        ),
        sortable: false,
        width: widthFahrzeugtypen,
      });
    }

    if (fahrzeugOptions.lieferwagen) {
      children.push({
        title: "Lfw",
        value: "lfw",
        key: "lfw",
        align: "center",
        lastFixed: !(
          fahrzeugOptions.radverkehr ||
          fahrzeugOptions.fussverkehr ||
          fahrzeugOptions.kraftraeder ||
          fahrzeugOptions.busse ||
          fahrzeugOptions.lastzuege ||
          fahrzeugOptions.lastkraftwagen
        ),
        sortable: false,
        width: widthFahrzeugtypen,
      });
    }

    if (fahrzeugOptions.lastkraftwagen) {
      children.push({
        title: "Lkw",
        value: "lkw",
        key: "lkw",
        align: "center",
        lastFixed: !(
          fahrzeugOptions.radverkehr ||
          fahrzeugOptions.fussverkehr ||
          fahrzeugOptions.kraftraeder ||
          fahrzeugOptions.busse ||
          fahrzeugOptions.lastzuege
        ),
        sortable: false,
        width: widthFahrzeugtypen,
      });
    }

    if (fahrzeugOptions.lastzuege) {
      children.push({
        title: "Lz",
        value: "lastzuege",
        key: "lastzuege",
        align: "center",
        lastFixed: !(
          fahrzeugOptions.radverkehr ||
          fahrzeugOptions.fussverkehr ||
          fahrzeugOptions.kraftraeder ||
          fahrzeugOptions.busse
        ),
        sortable: false,
        width: widthFahrzeugtypen,
      });
    }

    if (fahrzeugOptions.busse) {
      children.push({
        title: "Bus",
        value: "busse",
        key: "busse",
        align: "center",
        lastFixed: !(
          fahrzeugOptions.radverkehr ||
          fahrzeugOptions.fussverkehr ||
          fahrzeugOptions.kraftraeder
        ),
        sortable: false,
        width: widthFahrzeugtypen,
      });
    }

    if (fahrzeugOptions.kraftraeder) {
      children.push({
        title: "Krad",
        value: "kraftraeder",
        key: "kraftraeder",
        align: "center",
        lastFixed: !(fahrzeugOptions.radverkehr || fahrzeugOptions.fussverkehr),
        sortable: false,
        width: widthFahrzeugtypen,
      });
    }

    if (fahrzeugOptions.radverkehr) {
      children.push({
        title: "Rad",
        value: "fahrradfahrer",
        key: "fahrradfahrer",
        align: "center",
        lastFixed: !fahrzeugOptions.fussverkehr,
        sortable: false,
        width: widthFahrzeugtypen,
      });
    }

    if (fahrzeugOptions.fussverkehr) {
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
      title: "Fahrzeugtypen",
      key: "Fahrzeugtypen",
      align: "center",
      lastFixed: true,
      children: children,
    });
  }

  if (activeFahrzeugklassen.value > 0) {
    const children = [];
    if (fahrzeugOptions.kraftfahrzeugverkehr) {
      children.push({
        title: "KFZ",
        value: "kfz",
        key: "kfz",
        align: "center",
        lastFixed: !(
          fahrzeugOptions.schwerverkehr || fahrzeugOptions.gueterverkehr
        ),
        sortable: false,
        width: widthFahrzeugklassen,
      });
    }

    if (fahrzeugOptions.schwerverkehr) {
      children.push({
        title: "SV",
        value: "schwerverkehr",
        key: "schwerverkehr",
        align: "center",
        lastFixed: !fahrzeugOptions.gueterverkehr,
        sortable: false,
        width: widthFahrzeugklassen,
      });
    }

    if (fahrzeugOptions.gueterverkehr) {
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
      title: "Fahrzeugklassen",
      key: "Fahrzeugklassen",
      align: "center",
      lastFixed: true,
      children: children,
    });
  }

  if (activeAnteil.value > 0) {
    const children = [];
    if (fahrzeugOptions.schwerverkehrsanteilProzent) {
      children.push({
        title: "SV%",
        value: "anteilSchwerverkehrAnKfzProzent",
        key: "anteilSchwerverkehrAnKfzProzent",
        align: "center",
        lastFixed: !fahrzeugOptions.gueterverkehrsanteilProzent,
        sortable: false,
        width: widthAnteil,
      });
    }
    if (fahrzeugOptions.gueterverkehrsanteilProzent) {
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
      title: "Anteil",
      key: "Anteil",
      align: "center",
      lastFixed: true,
      children: children,
    });
  }

  return headers;
});

/** Berechnet die Spaltenbreite für die einzelnen Eintraege */
function calculateColumnWidth(
  maxWidth: number,
  activeElements: number
): string {
  return `${activeElements > 0 ? maxWidth / activeElements : 0}%`;
}
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
  return { class: color };
}
</script>
