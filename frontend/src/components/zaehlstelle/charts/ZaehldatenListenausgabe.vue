<template>
  <v-data-table
      style="margin-left: 3%; margin-right: 3%; border: 0.5px lightgray solid;"
      :headers="headers"
      :items="listenausgabeData"
      :item-class="rowClasses"
      :items-per-page="-1"
      dense
      hide-default-footer
      fixed-header
      :height="height"
  >
    <template v-slot:header>
      <thead>
      <tr>
        <th colspan="3" class="text-center parent-header" :style="headerCategoryStyle">Zeit</th>
        <th v-if="activeFahrzeugtypen > 0" :colspan=activeFahrzeugtypen class="text-center parent-header"
            :style="headerCategoryStyle">Fahrzeugtypen
        </th>
        <th v-if="activeFahrzeugklassen > 0" :colspan=activeFahrzeugklassen class="text-center parent-header"
            :style="headerCategoryStyle">Fahrzeugklassen
        </th>
        <th v-if="activeAnteil > 0" :colspan="activeAnteil" class="text-center parent-header"
            :style="headerCategoryStyle">Anteil
        </th>
        <th v-if="activePkweinheiten" colspan="1" class="text-center parent-header" :style="headerCategoryStyle"></th>
      </tr>
      </thead>
    </template>
  </v-data-table>
</template>

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

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";
import DataManipulatorUtil from "@/util/DataManipulatorUtil";
// eslint-disable-next-line no-unused-vars
import OptionsDTO from "@/types/zaehlung/OptionsDTO";


@Component({
  components: {}
})
export default class ZaehldatenListenausgabe extends Vue {

  private static TYPE_GESAMT: string = "Gesamt";

  private static TYPE_TAGESWERT: string = "Tageswert";

  private static TYPE_STUNDE: string = "Stunde";

  private static TYPE_BLOCK: string = "Block";

  private static TYPE_SP_STD_BLOCK: string = "SpStdBlock";

  private static TYPE_SP_STD_TAG: string = "SpStdTag";

  @Prop()
  private listenausgabeData!: Array<LadeZaehldatumDTO>;

  @Prop({default: "100%"}) height?: string

  /**
   * Liefert die Anzahl der ausgewaehlten Fahrzeugtypen zurueck.
   * Wird benoetigt, um die Kategorie-Ueberschrift in der Listenausgabe
   * und die Breite der einzelnen Eintraege darin zu steuern
   */
  get activeFahrzeugtypen() {
    let activeFahrzeugtypen: number = 0;
    let options = this.optionen;
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
  }

  /**
   * Liefert die Anzahl der ausgewaehlten Fahrzeugklasse zurueck.
   * Wird benoetigt, um die Kategorie-Ueberschrift in der Listenausgabe
   * und die Breite der einzelnen Eintraege darin zu steuern
   */
  get activeFahrzeugklassen() {
    let activeFahrzeugklassen: number = 0;
    let options = this.optionen;
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
    let activeAnteil: number = 0;
    let options = this.optionen;
    if (options.schwerverkehrsanteilProzent) {
      activeAnteil++;
    }
    if (options.gueterverkehrsanteilProzent) {
      activeAnteil++;
    }
    return activeAnteil;
  }

  /** Liefert zurueck, ob die OPtion PKW-Einheiten ausgewaehlt wurde */
  get activePkweinheiten() {
    return this.optionen.pkwEinheiten;
  }

  /** Berechnet die Spaltenbreite für die einzelnen Eintraege */
  private calculateColumnWidth(maxWidth: number, activeElements: number): string {
    return `${activeElements > 0 ? maxWidth / activeElements : 0}%`;
  }

  get optionen(): OptionsDTO {
    return this.$store.getters.getFilteroptions as OptionsDTO
  }

  /**
   * Baut den Listenheader dynamisch anhand der ausgewaehlten Felder im Optionsmenue auf
   */
  get headers() {
    let options = this.optionen;
    let widthFahrzeugtypen: string = this.calculateColumnWidth(42, this.activeFahrzeugtypen);
    let widthFahrzeugklassen: string = this.calculateColumnWidth(21, this.activeFahrzeugklassen);
    let widthAnteil: string = this.calculateColumnWidth(8, this.activeAnteil);
    let headers: Array<{}> = [{text: "von", value: "startUhrzeit", align: "center", sortable: false, width: "7%"},
      {text: "bis", value: "endeUhrzeit", align: "center", sortable: false, width: "7%"}, {
        text: "",
        value: "type",
        align: "center",
        divider: "true",
        sortable: false,
        width: "8%"
      }];

    // Kategorien
    if (options.personenkraftwagen) {
      headers.push({
        text: "Pkw",
        value: "pkw",
        align: "center",
        divider: !(options.radverkehr || options.fussverkehr || options.kraftraeder || options.busse || options.lastzuege || options.lastkraftwagen),
        sortable: false,
        width: widthFahrzeugtypen
      });
    }
    if (options.lastkraftwagen) {
      headers.push({
        text: "Lkw",
        value: "lkw",
        align: "center",
        divider: !(options.radverkehr || options.fussverkehr || options.kraftraeder || options.busse || options.lastzuege),
        sortable: false,
        width: widthFahrzeugtypen
      });
    }
    if (options.lastzuege) {
      headers.push({
        text: "Lz",
        value: "lastzuege",
        align: "center",
        divider: !(options.radverkehr || options.fussverkehr || options.kraftraeder || options.busse),
        sortable: false,
        width: widthFahrzeugtypen
      });
    }
    if (options.busse) {
      headers.push({
        text: "Bus",
        value: "busse",
        align: "center",
        divider: !(options.radverkehr || options.fussverkehr || options.kraftraeder),
        sortable: false,
        width: widthFahrzeugtypen
      });
    }
    if (options.kraftraeder) {
      headers.push({
        text: "Krad",
        value: "kraftraeder",
        align: "center",
        divider: !(options.radverkehr || options.fussverkehr),
        sortable: false,
        width: widthFahrzeugtypen
      });
    }
    if (options.radverkehr) {
      headers.push({
        text: "Rad",
        value: "fahrradfahrer",
        align: "center",
        divider: !options.fussverkehr,
        sortable: false,
        width: widthFahrzeugtypen
      });
    }
    if (options.fussverkehr) {
      headers.push({
        text: "Fuß",
        value: "fussgaenger",
        align: "center",
        divider: true,
        sortable: false,
        width: widthFahrzeugtypen
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
        width: widthFahrzeugklassen
      });
    }
    if (options.schwerverkehr) {
      headers.push({
        text: "SV",
        value: "schwerverkehr",
        align: "center",
        divider: !options.gueterverkehr,
        sortable: false,
        width: widthFahrzeugklassen
      });
    }
    if (options.gueterverkehr) {
      headers.push({
        text: "GV",
        value: "gueterverkehr",
        align: "center",
        divider: true,
        sortable: false,
        width: widthFahrzeugklassen
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
        width: widthAnteil
      });
    }
    if (options.gueterverkehrsanteilProzent) {
      headers.push({
        text: "GV%",
        value: "anteilGueterverkehrAnKfzProzent",
        align: "center",
        divider: true,
        sortable: false,
        width: widthAnteil
      });
    }

    // PKW-Einheiten
    if (options.pkwEinheiten) {
      headers.push({text: "PKW-Einheiten", value: "pkwEinheiten", align: "center", sortable: false, width: "7%"});
    }

    return headers;
  }

  private rowClasses(ladeZaehldatum: LadeZaehldatumDTO) {
    if (ladeZaehldatum.type === ZaehldatenListenausgabe.TYPE_STUNDE) {
      return "blue-grey lighten-4 font-weight-bold";
    } else if (ladeZaehldatum.type != undefined
        && (ladeZaehldatum.type.includes(ZaehldatenListenausgabe.TYPE_SP_STD_BLOCK)
            || ladeZaehldatum.type.includes(ZaehldatenListenausgabe.TYPE_SP_STD_TAG))) {
      return "blue-grey lighten-3 font-weight-bold";
    } else if (ladeZaehldatum.type === ZaehldatenListenausgabe.TYPE_BLOCK) {
      return "blue-grey lighten-2 font-weight-black";
    } else if (ladeZaehldatum.type === ZaehldatenListenausgabe.TYPE_GESAMT
        || ladeZaehldatum.type === ZaehldatenListenausgabe.TYPE_TAGESWERT) {
      return "blue-grey lighten-1 font-weight-black";
    }
  }

  get headerCategoryStyle() {
    return "font-weight: bolder; position: sticky; top: 0; z-index: 2";
  }

  @Watch('listenausgabeData', {immediate: true})
  watchZaehldaten(listenausgabeData: Array<LadeZaehldatumDTO>) {
    listenausgabeData.forEach(zaehldatum => {
      zaehldatum.endeUhrzeit = DataManipulatorUtil.manipulateEndeUhrzeit(zaehldatum);
      // Muss gemacht werden, damit immer eine Nachkommastelle existiert, auch bei 1.0
      zaehldatum.anteilGueterverkehrAnKfzProzent = parseFloat(zaehldatum.anteilGueterverkehrAnKfzProzent).toFixed(1)
      zaehldatum.anteilSchwerverkehrAnKfzProzent = parseFloat(zaehldatum.anteilSchwerverkehrAnKfzProzent).toFixed(1)
    });
  }

}
</script>