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
                        Fahrzeugklassen
                    </th>
                    <th
                        v-if="activeAnteil > 0"
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

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";
import DataManipulatorUtil from "@/util/DataManipulatorUtil";
// eslint-disable-next-line no-unused-vars
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

@Component({
    components: {},
})
export default class ZaehldatenListenausgabe extends Vue {
    private static TYPE_GESAMT = "Gesamt";

    private static TYPE_TAGESWERT = "Tageswert";

    private static TYPE_STUNDE = "Stunde";

    private static TYPE_BLOCK = "Block";

    private static TYPE_SP_STD_BLOCK = "SpStdBlock";

    private static TYPE_SP_STD_TAG = "SpStdTag";

    @Prop()
    listenausgabeData!: Array<LadeZaehldatumDTO>;

    @Prop({ default: "100%" }) height?: string;

    /**
     * Liefert die Anzahl der ausgewaehlten Fahrzeugtypen zurueck.
     * Wird benoetigt, um die Kategorie-Ueberschrift in der Listenausgabe
     * und die Breite der einzelnen Eintraege darin zu steuern
     */
    get activeFahrzeugtypen() {
        let activeFahrzeugtypen = 0;
        let options = this.optionen.fahrzeuge;
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
    }

    /**
     * Liefert die Anzahl der ausgewaehlten Fahrzeugklasse zurueck.
     * Wird benoetigt, um die Kategorie-Ueberschrift in der Listenausgabe
     * und die Breite der einzelnen Eintraege darin zu steuern
     */
    get activeFahrzeugklassen() {
        let activeFahrzeugklassen = 0;
        let options = this.optionen.fahrzeuge;
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
    }

    /**
     * Liefert die Anzahl der ausgewaehlten Anteile (SV%/GV&) zurueck.
     * Wird benoetigt, um die Kategorie-Ueberschrift in der Listenausgabe
     * und die Breite der einzelnen Eintraege darin zu steuern
     */
    get activeAnteil() {
        let activeAnteil = 0;
        let options = this.optionen;
        if (options.fahrzeuge.schwerverkehrsanteilProzent) {
            activeAnteil++;
        }
        if (options.fahrzeuge.gueterverkehrsanteilProzent) {
            activeAnteil++;
        }
        return activeAnteil;
    }

    /** Berechnet die Spaltenbreite für die einzelnen Eintraege */
    private calculateColumnWidth(
        maxWidth: number,
        activeElements: number
    ): string {
        return `${activeElements > 0 ? maxWidth / activeElements : 0}%`;
    }

    get optionen(): MessstelleOptionsDTO {
        return this.$store.getters[
            "filteroptionsMessstelle/getFilteroptions"
        ] as MessstelleOptionsDTO;
    }

    /**
     * Baut den Listenheader dynamisch anhand der ausgewaehlten Felder im Optionsmenue auf
     */
    get headers() {
        let options = this.optionen;
        let widthFahrzeugtypen: string = this.calculateColumnWidth(
            42,
            this.activeFahrzeugtypen
        );
        let widthFahrzeugklassen: string = this.calculateColumnWidth(
            21,
            this.activeFahrzeugklassen
        );
        let widthAnteil: string = this.calculateColumnWidth(
            8,
            this.activeAnteil
        );
        /* eslint-disable @typescript-eslint/ban-types */
        let headers: Array<{}> = [
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
        if (options.fahrzeuge.personenkraftwagen) {
            headers.push({
                text: "Pkw",
                value: "pkw",
                align: "center",
                divider: !(
                    options.fahrzeuge.radverkehr ||
                    options.fahrzeuge.fussverkehr ||
                    options.fahrzeuge.kraftraeder ||
                    options.fahrzeuge.busse ||
                    options.fahrzeuge.lieferwagen ||
                    options.fahrzeuge.lastzuege ||
                    options.fahrzeuge.lastkraftwagen
                ),
                sortable: false,
                width: widthFahrzeugtypen,
            });
        }
        if (options.fahrzeuge.lastkraftwagen) {
            headers.push({
                text: "Lkw",
                value: "lkw",
                align: "center",
                divider: !(
                    options.fahrzeuge.radverkehr ||
                    options.fahrzeuge.fussverkehr ||
                    options.fahrzeuge.kraftraeder ||
                    options.fahrzeuge.busse ||
                    options.fahrzeuge.lieferwagen ||
                    options.fahrzeuge.lastzuege
                ),
                sortable: false,
                width: widthFahrzeugtypen,
            });
        }
        if (options.fahrzeuge.lastzuege) {
            headers.push({
                text: "Lz",
                value: "lastzuege",
                align: "center",
                divider: !(
                    options.fahrzeuge.radverkehr ||
                    options.fahrzeuge.fussverkehr ||
                    options.fahrzeuge.kraftraeder ||
                    options.fahrzeuge.busse ||
                    options.fahrzeuge.lieferwagen
                ),
                sortable: false,
                width: widthFahrzeugtypen,
            });
        }
        if (options.fahrzeuge.lieferwagen) {
            headers.push({
                text: "Lfw",
                value: "lfw",
                align: "center",
                divider: !(
                    options.fahrzeuge.radverkehr ||
                    options.fahrzeuge.fussverkehr ||
                    options.fahrzeuge.kraftraeder ||
                    options.fahrzeuge.busse
                ),
                sortable: false,
                width: widthFahrzeugtypen,
            });
        }
        if (options.fahrzeuge.busse) {
            headers.push({
                text: "Bus",
                value: "busse",
                align: "center",
                divider: !(
                    options.fahrzeuge.radverkehr ||
                    options.fahrzeuge.fussverkehr ||
                    options.fahrzeuge.kraftraeder
                ),
                sortable: false,
                width: widthFahrzeugtypen,
            });
        }
        if (options.fahrzeuge.kraftraeder) {
            headers.push({
                text: "Krad",
                value: "kraftraeder",
                align: "center",
                divider: !(
                    options.fahrzeuge.radverkehr ||
                    options.fahrzeuge.fussverkehr
                ),
                sortable: false,
                width: widthFahrzeugtypen,
            });
        }
        if (options.fahrzeuge.radverkehr) {
            headers.push({
                text: "Rad",
                value: "fahrradfahrer",
                align: "center",
                divider: !options.fahrzeuge.fussverkehr,
                sortable: false,
                width: widthFahrzeugtypen,
            });
        }
        if (options.fahrzeuge.fussverkehr) {
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
        if (options.fahrzeuge.kraftfahrzeugverkehr) {
            headers.push({
                text: "KFZ",
                value: "kfz",
                align: "center",
                divider: !(
                    options.fahrzeuge.schwerverkehr ||
                    options.fahrzeuge.gueterverkehr
                ),
                sortable: false,
                width: widthFahrzeugklassen,
            });
        }
        if (options.fahrzeuge.schwerverkehr) {
            headers.push({
                text: "SV",
                value: "schwerverkehr",
                align: "center",
                divider: !options.fahrzeuge.gueterverkehr,
                sortable: false,
                width: widthFahrzeugklassen,
            });
        }
        if (options.fahrzeuge.gueterverkehr) {
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
        if (options.fahrzeuge.schwerverkehrsanteilProzent) {
            headers.push({
                text: "SV%",
                value: "anteilSchwerverkehrAnKfzProzent",
                align: "center",
                divider: !options.fahrzeuge.gueterverkehrsanteilProzent,
                sortable: false,
                width: widthAnteil,
            });
        }
        if (options.fahrzeuge.gueterverkehrsanteilProzent) {
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
    }

    rowClasses(ladeZaehldatum: LadeZaehldatumDTO) {
        if (ladeZaehldatum.type === ZaehldatenListenausgabe.TYPE_STUNDE) {
            return "blue-grey lighten-4 font-weight-bold";
        } else if (
            ladeZaehldatum.type != undefined &&
            (ladeZaehldatum.type.includes(
                ZaehldatenListenausgabe.TYPE_SP_STD_BLOCK
            ) ||
                ladeZaehldatum.type.includes(
                    ZaehldatenListenausgabe.TYPE_SP_STD_TAG
                ))
        ) {
            return "blue-grey lighten-3 font-weight-bold";
        } else if (ladeZaehldatum.type === ZaehldatenListenausgabe.TYPE_BLOCK) {
            return "blue-grey lighten-2 font-weight-black";
        } else if (
            ladeZaehldatum.type === ZaehldatenListenausgabe.TYPE_GESAMT ||
            ladeZaehldatum.type === ZaehldatenListenausgabe.TYPE_TAGESWERT
        ) {
            return "blue-grey lighten-1 font-weight-black";
        }
    }

    get headerCategoryStyle() {
        return "font-weight: bolder; position: sticky; top: 0; z-index: 2";
    }

    @Watch("listenausgabeData", { immediate: true })
    watchZaehldaten(listenausgabeData: Array<LadeZaehldatumDTO>) {
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
    }
}
</script>

<style lang="sass">
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