<template>
    <v-data-table
        :headers="headers"
        :items="computedListenausgabeData"
        :item-class="rowClasses"
        :items-per-page="-1"
        dense
        hide-default-footer
        fixed-header
        :height="height"
        class="listenausgabe"
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
                        Fahrzeugklasse
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
import type LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";
import DataManipulatorUtil from "@/util/DataManipulatorUtil";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import {computed, watch} from "vue";
import type DataTableHeader from "@/types/util/DataTableHeader";
import {useMessstelleStore} from "@/store/messstelle";

const messstelleStore = useMessstelleStore();

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

const optionen = computed<MessstelleOptionsDTO>(() => {
    return messstelleStore.getFilteroptions;
});

const computedListenausgabeData =
    computed<Array<LadeZaehldatumDTO>>(() => {
        return props.listenausgabeData;
    });

watch(
    computedListenausgabeData,
    () => {
        computedListenausgabeData.value.forEach((zaehldatum) => {
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
    let fahrzeugOptions = optionen.value.fahrzeuge;
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
    let fahrzeugOptions = optionen.value.fahrzeuge;
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
    let fahrzeugOptions = optionen.value.fahrzeuge;
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
const headers = computed<Array<DataTableHeader>>(() => {
    let fahrzeugOptions = optionen.value.fahrzeuge;
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
    if (fahrzeugOptions.personenkraftwagen) {
        headers.push({
            text: "Pkw",
            value: "pkw",
            align: "center",
            divider: !(
                fahrzeugOptions.radverkehr ||
                fahrzeugOptions.fussverkehr ||
                fahrzeugOptions.kraftraeder ||
                fahrzeugOptions.busse ||
                fahrzeugOptions.lieferwagen ||
                fahrzeugOptions.lastzuege ||
                fahrzeugOptions.lastkraftwagen
            ),
            sortable: false,
            width: widthFahrzeugtypen,
        });
    }
    if (fahrzeugOptions.lastkraftwagen) {
        headers.push({
            text: "Lkw",
            value: "lkw",
            align: "center",
            divider: !(
                fahrzeugOptions.radverkehr ||
                fahrzeugOptions.fussverkehr ||
                fahrzeugOptions.kraftraeder ||
                fahrzeugOptions.busse ||
                fahrzeugOptions.lieferwagen ||
                fahrzeugOptions.lastzuege
            ),
            sortable: false,
            width: widthFahrzeugtypen,
        });
    }
    if (fahrzeugOptions.lastzuege) {
        headers.push({
            text: "Lz",
            value: "lastzuege",
            align: "center",
            divider: !(
                fahrzeugOptions.radverkehr ||
                fahrzeugOptions.fussverkehr ||
                fahrzeugOptions.kraftraeder ||
                fahrzeugOptions.busse ||
                fahrzeugOptions.lieferwagen
            ),
            sortable: false,
            width: widthFahrzeugtypen,
        });
    }
    if (fahrzeugOptions.lieferwagen) {
        headers.push({
            text: "Lfw",
            value: "lfw",
            align: "center",
            divider: !(
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
        headers.push({
            text: "Bus",
            value: "busse",
            align: "center",
            divider: !(
                fahrzeugOptions.radverkehr ||
                fahrzeugOptions.fussverkehr ||
                fahrzeugOptions.kraftraeder
            ),
            sortable: false,
            width: widthFahrzeugtypen,
        });
    }
    if (fahrzeugOptions.kraftraeder) {
        headers.push({
            text: "Krad",
            value: "kraftraeder",
            align: "center",
            divider: !(
                fahrzeugOptions.radverkehr || fahrzeugOptions.fussverkehr
            ),
            sortable: false,
            width: widthFahrzeugtypen,
        });
    }
    if (fahrzeugOptions.radverkehr) {
        headers.push({
            text: "Rad",
            value: "fahrradfahrer",
            align: "center",
            divider: !fahrzeugOptions.fussverkehr,
            sortable: false,
            width: widthFahrzeugtypen,
        });
    }
    if (fahrzeugOptions.fussverkehr) {
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
    if (fahrzeugOptions.kraftfahrzeugverkehr) {
        headers.push({
            text: "KFZ",
            value: "kfz",
            align: "center",
            divider: !(
                fahrzeugOptions.schwerverkehr || fahrzeugOptions.gueterverkehr
            ),
            sortable: false,
            width: widthFahrzeugklassen,
        });
    }
    if (fahrzeugOptions.schwerverkehr) {
        headers.push({
            text: "SV",
            value: "schwerverkehr",
            align: "center",
            divider: !fahrzeugOptions.gueterverkehr,
            sortable: false,
            width: widthFahrzeugklassen,
        });
    }
    if (fahrzeugOptions.gueterverkehr) {
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
    if (fahrzeugOptions.schwerverkehrsanteilProzent) {
        headers.push({
            text: "SV%",
            value: "anteilSchwerverkehrAnKfzProzent",
            align: "center",
            divider: !fahrzeugOptions.gueterverkehrsanteilProzent,
            sortable: false,
            width: widthAnteil,
        });
    }
    if (fahrzeugOptions.gueterverkehrsanteilProzent) {
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

<style scoped lang="css">
.listenausgabe {
    margin-left: 3%;
    margin-right: 3%;
    border: 0.5px lightgray solid;
}
</style>

<!--<style scoped lang="sass">-->
<!--@import 'vuetify/lib/components/VDataTable/variables'-->
<!--.v-data-table&#45;&#45;fixed-header-->
<!--  > .v-data-table__wrapper-->
<!--    overflow-y: auto-->

<!--    > table-->
<!--      > thead-->
<!--        > tr-->
<!--          > th-->
<!--            border-bottom: 0px !important-->
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