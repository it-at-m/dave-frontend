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
                        id="th-zeit"
                        colspan="3"
                        class="text-center parent-header"
                        :style="headerCategoryStyle"
                    >
                        Zeit
                    </th>
                    <th
                        v-if="activeFahrzeugtypen > 0"
                        id="th-fahrzeugtypen"
                        :colspan="activeFahrzeugtypen"
                        class="text-center parent-header"
                        :style="headerCategoryStyle"
                    >
                        Fahrzeugtypen
                    </th>
                    <th
                        v-if="activeFahrzeugklassen > 0"
                        id="th-fahrzeugklassen"
                        :colspan="activeFahrzeugklassen"
                        class="text-center parent-header"
                        :style="headerCategoryStyle"
                    >
                        Fahrzeugklassen
                    </th>
                    <th
                        v-if="activeAnteil > 0"
                        id="th-anteil"
                        :colspan="activeAnteil"
                        class="text-center parent-header"
                        :style="headerCategoryStyle"
                    >
                        Anteil
                    </th>
                </tr>
            </thead>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";
import DataManipulatorUtil from "@/util/DataManipulatorUtil";
// eslint-disable-next-line no-unused-vars
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed, ComputedRef, watch } from "vue";
import { useStore } from "@/api/util/useStore";
import DataTableHeader from "@/types/util/DataTableHeader";

const store = useStore();

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

const optionen: ComputedRef<MessstelleOptionsDTO> = computed(() => {
    return store.getters["filteroptionsMessstelle/getFilteroptions"];
});

watch(
    props.listenausgabeData,
    () => {
        props.listenausgabeData.forEach((zaehldatum) => {
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
    let options = optionen.value.fahrzeuge;
    if (options.personenkraftwagen) {
        activeFahrzeugtypen++;
    }
    if (options.lastkraftwagen) {
        activeFahrzeugtypen++;
    }
    if (options.lastzuege) {
        activeFahrzeugtypen++;
    }
    if (options.lieferwagen) {
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
    let options = optionen.value.fahrzeuge;
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
    let options = optionen.value.fahrzeuge;
    if (options.schwerverkehrsanteilProzent) {
        activeAnteil++;
    }
    if (options.gueterverkehrsanteilProzent) {
        activeAnteil++;
    }
    return activeAnteil;
});

/**
 * Baut den Listenheader dynamisch anhand der ausgewaehlten Felder im Optionsmenue auf
 */
const headers: ComputedRef<Array<DataTableHeader>> = computed(() => {
    let options = optionen.value.fahrzeuge;
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
    let headers: Array<DataTableHeader> = [
        {
            text: "von",
            value: "startUhrzeit",
            align: "center",
            sortable: false,
            width: "7%",
        } as DataTableHeader,
        {
            text: "bis",
            value: "endeUhrzeit",
            align: "center",
            sortable: false,
            width: "7%",
        } as DataTableHeader,
        {
            text: "",
            value: "type",
            align: "center",
            divider: true,
            sortable: false,
            width: "8%",
        } as DataTableHeader,
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
                options.lieferwagen ||
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
                options.lieferwagen ||
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
                options.busse ||
                options.lieferwagen
            ),
            sortable: false,
            width: widthFahrzeugtypen,
        });
    }
    if (options.lieferwagen) {
        headers.push({
            text: "Lfw",
            value: "lfw",
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

    return headers;
});

/** Berechnet die Spaltenbreite für die einzelnen Eintraege */
function calculateColumnWidth(
    maxWidth: number,
    activeElements: number
): string {
    return `${activeElements > 0 ? maxWidth / activeElements : 0}%`;
}
function rowClasses(ladeZaehldatum: LadeZaehldatumDTO): string {
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
    return "";
}
</script>

<style scoped lang="sass">
@import '../../../../node_modules/vuetify/src/components/VDataTable/variables'
.v-data-table--fixed-header
  > .v-data-table__wrapper
    overflow-y: auto

    > table
      > thead
        > tr
          > th
            border-bottom: 0px !important
            position: sticky
            top: $data-table-dense-header-height
            z-index: 2

        > tr:nth-child(2)
          > th
            top: $data-table-dense-header-height

  // Account for scroll bar
  .v-data-footer
    +ltr()
      margin-right: $data-table-scroll-bar-width

    +rtl()
      margin-left: $data-table-scroll-bar-width
</style>