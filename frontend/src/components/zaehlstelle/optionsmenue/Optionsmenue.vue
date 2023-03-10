<template>
  <div>
    <v-btn
        color="secondary"
        @click="dialog = true"
    >
      <v-icon left>mdi-filter-outline</v-icon>
      <span class="hidden-lg-and-down">Filtereinstellungen bearbeiten</span>
      <span class="hidden-xl-only">Filtereinstellungen</span>
    </v-btn>

    <v-dialog
        v-model="dialog"
        max-width="900px"
    >
      <v-card width="900px" flat>

        <v-card-title>
          <v-icon left>mdi-filter-outline</v-icon>
          Filtereinstellungen
        </v-card-title>

        <v-card-text>
          <v-sheet
              width="100%"
              :max-height="getContentSheetHeight"
              class="overflow-y-auto">
            <v-expansion-panels hover focusable>

              <zeitauswahl-panel
                  :zaehlung="zaehlung"
                  v-on:zeitauswahl="setZeitauswahl($event)"
                  v-on:zeitblock="setZeitblock($event)"
                  v-on:intervall="setIntervall($event)"
              />

              <fahrzeug-panel
                  :actual-zeitauswahl="chosenOptions.zeitauswahl"
                  :is-differenzdatenvergleich-active="chosenOptions.differenzdatenDarstellen"
                  v-on:fahrzeugOptions="updateOptions($event)"
              />

              <geometrie-panel
                  :zaehlung="zaehlung"
                  v-on:von="setVon($event)"
                  v-on:nach="setNach($event)"
                  v-on:beideRichtungen="setBeideRichtungen($event)"
              />

              <zaehlungsvergleich-panel
                  :zaehlung="zaehlung"
                  v-on:vergleichszaehlungsId="setVergleichszaehlungsId($event)"
                  v-on:differenzdatenDarstellen="setDifferenzdatenDarstellen($event)"
                  v-on:idVergleichszaehlungZeitreihe="setIdVergleichszaehlungZeitreihe($event)"
              />

              <darstellungsoptionen-panel
                  v-on:werteHundertRunden="setWerteHundertRunden($event)"
                  v-on:blackPrintMode="setBlackPrintMode($event)"
                  v-on:mittelwert="setMittelwert($event)"
                  v-on:stundensumme="setStundensumme($event)"
                  v-on:blocksumme="setBlocksumme($event)"
                  v-on:tagessumme="setTagessumme($event)"
                  v-on:spitzenstunde="setSpitzenstunde($event)"
                  v-on:spitzenstundeKfz="setSpitzenstundeKfz($event)"
                  v-on:spitzenstundeRad="setSpitzenstundeRad($event)"
                  v-on:spitzenstundeFuss="setSpitzenstundeFuss($event)"
                  v-on:ganglinieYAchse1MaxValue="setGanglinieYAchse1MaxValue($event)"
                  v-on:ganglinieYAchse2MaxValue="setGanglinieYAchse2MaxValue($event)"
                  v-on:zeitreiheGesamt="setZeitreiheGesamt($event)"
              />

            </v-expansion-panels>
          </v-sheet>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="secondary"
              @click="setOptions">Aktualisiere Daten
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="grey lighten-1"
                 @click="resetOptionsmenu">Zur??cksetzen
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="sass">
@import './node_modules/vuetify/src/components/VExpansionPanel/_variables.scss'
.v-expansion-panel
  &::before
    +elevation(0)
</style>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

/* eslint-disable no-unused-vars */
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import Fahrzeug from "@/types/enum/Fahrzeug";
import Zaehldauer from "@/types/enum/Zaehldauer";
/* eslint-enable no-unused-vars */
// Komponenten
import GeometriePanel from "@/components/zaehlstelle/optionsmenue/panels/GeometriePanel.vue"
import FahrzeugPanel from "@/components/zaehlstelle/optionsmenue/panels/FahrzeugPanel.vue";
import PanelHeader from "@/components/common/PanelHeader.vue";
import ZeitauswahlPanel from "@/components/zaehlstelle/optionsmenue/panels/ZeitauswahlPanel.vue";
import ZaehlungsvergleichPanel from "@/components/zaehlstelle/optionsmenue/panels/ZaehlungsvergleichPanel.vue";
import DarstellungsoptionenPanel from "@/components/zaehlstelle/optionsmenue/panels/DarstellungsoptionenPanel.vue";
import Zaehlart from "@/types/enum/Zaehlart";
import Zeitblock from "@/types/enum/Zeitblock";
import Zeitauswahl from "@/types/enum/Zeitauswahl";

/**
 * Beschreibung Optionsmen??
 *
 * - Wenn der Tageswert ausgew??hlt ist, kann kein Radverkehr gew??hlt werden, da dieser keine Hochrechnungsfaktoren besitzt (Ausnahme 24h-Z??hlungen)
 * - Bei Auswahl der Spitzenstunde wird per Default erstmal nur die dazugeh??rige Einheit angezeigt. Alle anderen sind erstmal abgew??hlt und k??nnen
 *    bei Bedarf vom Nutzer aktiviert werden
 * - Per Default werden anfangs nur KFZ, SV, GV, SV% und GV% angezeigt. Alle anderen Werte m??ssen vom Nutzer selbst??ndig aktiviert werden.
 */
@Component({
  components: {
    DarstellungsoptionenPanel,
    ZaehlungsvergleichPanel,
    ZeitauswahlPanel,
    PanelHeader,
    FahrzeugPanel,
    GeometriePanel
  }
})
export default class Optionsmenue extends Vue {

  @Prop()
  private readonly zaehlung!: LadeZaehlungDTO;

  // Variablen f??r Dialog
  private dialog = false

  // Variablen f??r die Auswahloptionen
  private chosenOptions: OptionsDTO = {} as OptionsDTO;

  /**
   * L??dt die Optionen aus dem Store
   */
  get options(): OptionsDTO {
    return this.$store.getters.getFilteroptions
  }

  @Watch('zaehlung')
  zaehlungChanged() {
    this.resetOptions();
  }

  /**
   * Da das OptionsDTO f??r die Auswahlfelder im Formular als
   * v-model genutzt wird, muss hier eine Kopie erzeugt werden. Andernfalls
   * w??rde es zu einer dirketen Ver??nderung des Stores kommen - was dieser
   * nicht mag.
   */
  @Watch("options")
  copyCoptions(n: OptionsDTO) {
    let options = {} as OptionsDTO
    Object.assign(options, n)
    this.chosenOptions = options;
  }

  get getContentSheetHeight() {
    if (this.$vuetify.breakpoint.xl) {
      return "650px";
    }
    return "400px";
  }

  /**
   * Setzt die Default-Einstellungen f??r das Optionsmen?? je nach Z??hlung
   */
  private setDefaultOptionsForZaehlung() {
    let options = {} as OptionsDTO
    Object.assign(options, this.options);

    if (this.zaehlung.zaehlart === Zaehlart.R || this.zaehlung.zaehlart === Zaehlart.QR) {
      if (this.zaehlung.zaehldauer === Zaehldauer.DAUER_13_STUNDEN) {
        options.zeitauswahl = Zeitauswahl.BLOCK;
        options.zeitblock = Zeitblock.ZB_06_19;
      } else if (this.zaehlung.zaehldauer === Zaehldauer.DAUER_16_STUNDEN) {
        options.zeitauswahl = Zeitauswahl.BLOCK;
        options.zeitblock = Zeitblock.ZB_06_22;
      } else if (this.zaehlung.zaehldauer === Zaehldauer.DAUER_2_X_4_STUNDEN || this.zaehlung.zaehldauer === Zaehldauer.SONSTIGE) {
        options.zeitauswahl = Zeitauswahl.BLOCK;
        options.zeitblock = Zeitblock.ZB_06_10;
      }
      // Bei Zaehldauer.DAUER_24_STUNDEN nichts zu tun
    }

    this.zaehlung.kategorien.forEach(fahr => {
      switch (fahr) {
          // Verkehrsarten
        case Fahrzeug.KFZ:
          options.kraftfahrzeugverkehr = true;
          break;
        case Fahrzeug.SV:
          options.schwerverkehr = true;
          break;
        case Fahrzeug.SV_P:
          options.schwerverkehrsanteilProzent = true;
          break;
        case Fahrzeug.GV:
          options.gueterverkehr = true;
          break;
        case Fahrzeug.GV_P:
          options.gueterverkehrsanteilProzent = true;
          break;
        case Fahrzeug.RAD:
          // Rad soll nur bei reinen Radz??hlungen aktiviert sein
          options.radverkehr = ["R", "QR"].includes(this.zaehlung.zaehlart);
          break;
      }
    });
    options.beideRichtungen = false;
    this.chosenOptions = options;
    this.saveOptions();
  }

  // Event Methoden f??r die Zeitauswahl Komponente
  private setZeitauswahl(event: string) {
    this.chosenOptions.zeitauswahl = event;
    this.$store.commit("setZeitauswahl", event);
  }

  private setZeitblock(event: string) {
    this.chosenOptions.zeitblock = event;
    this.$store.commit("setZeitblock", event);
  }

  private setIntervall(event: ZaehldatenIntervall) {
    if (event) {
      this.chosenOptions.intervall = event;
    }
  }

  // Event Methode f??r die Fahrzeug Komponente
  private updateOptions(event: OptionsDTO) {
    if (event) {
      this.chosenOptions.kraftfahrzeugverkehr = event.kraftfahrzeugverkehr;
      this.chosenOptions.schwerverkehr = event.schwerverkehr;
      this.chosenOptions.gueterverkehr = event.gueterverkehr;
      this.chosenOptions.schwerverkehrsanteilProzent = event.schwerverkehrsanteilProzent;
      this.chosenOptions.gueterverkehrsanteilProzent = event.gueterverkehrsanteilProzent;
      this.chosenOptions.radverkehr = event.radverkehr;
      this.chosenOptions.fussverkehr = event.fussverkehr;

      this.chosenOptions.personenkraftwagen = event.personenkraftwagen;
      this.chosenOptions.lastkraftwagen = event.lastkraftwagen;
      this.chosenOptions.lastzuege = event.lastzuege;
      this.chosenOptions.busse = event.busse;
      this.chosenOptions.kraftraeder = event.kraftraeder;
      this.chosenOptions.pkwEinheiten = event.pkwEinheiten;
    }
  }

  // Event-Methoden f??r die Geometrie Komponente
  private setVon(event: Array<number>) {
    if (Array.isArray(event) && event.length > 1) {
      this.chosenOptions.vonKnotenarm = null
    } else {
      this.chosenOptions.vonKnotenarm = event[0]
    }
    this.chosenOptions.vonIds = event
  }

  private setNach(event: Array<number>) {
    if (Array.isArray(event) && event.length > 1) {
      this.chosenOptions.nachKnotenarm = null
    } else {
      this.chosenOptions.nachKnotenarm = event[0]
    }
    this.chosenOptions.nachIds = event
  }

  private setBeideRichtungen(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.beideRichtungen = event;
    }
  }

  // Event-Methoden f??r die Vergleichs Komponente
  private setVergleichszaehlungsId(event: string) {
    if (event) {
      this.chosenOptions.vergleichszaehlungsId = event;
    }
  }

  private setIdVergleichszaehlungZeitreihe(event: string) {
    if (event) {
      this.chosenOptions.idVergleichszaehlungZeitreihe = event;
    }
  }

  private setDifferenzdatenDarstellen(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.differenzdatenDarstellen = event;
    }
  }

  // Event-Methoden f??r die Darstellungsoptionen Komponente
  private setWerteHundertRunden(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.werteHundertRunden = event;
    }
  }

  private setBlackPrintMode(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.blackPrintMode = event;
    }
  }

  private setMittelwert(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.mittelwert = event;
    }
  }

  private setStundensumme(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.stundensumme = event;
    }
  }

  private setBlocksumme(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.blocksumme = event;
    }
  }

  private setTagessumme(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.tagessumme = event;
    }
  }

  private setSpitzenstunde(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.spitzenstunde = event;
    }
  }

  private setSpitzenstundeKfz(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.spitzenstundeKfz = event;
    }
  }

  private setSpitzenstundeRad(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.spitzenstundeRad = event;
    }
  }

  private setSpitzenstundeFuss(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.spitzenstundeFuss = event;
    }
  }

  private setGanglinieYAchse1MaxValue(event: number) {
    if (event !== undefined) {
      this.chosenOptions.ganglinieYAchse1MaxValue = event;
    }
  }

  private setGanglinieYAchse2MaxValue(event: number) {
    if (event !== undefined) {
      this.chosenOptions.ganglinieYAchse2MaxValue = event;
    }
  }

  private setZeitreiheGesamt(event: boolean) {
    if (event !== undefined) {
      this.chosenOptions.zeitreiheGesamt = event;
    }
  }

  /**
   * Speichert die aktuell gew??hlten Anzeigeoptionen im Vuex Store und schlie??t den Dialog.
   *
   * @private
   */
  private setOptions() {
    this.saveOptions()
    this.dialog = false
  }

  /**
   * Speichert die aktuell gew??hlten Anzeigeoptionen im Vuex Store.
   *
   * @private
   */
  private saveOptions() {
    this.$store.dispatch("setFilteroptions", Object.assign({}, this.chosenOptions))
  }

  // Funktionalit??t f??r den "Zur??cksetzen" Button
  private resetOptionsmenu() {
    this.resetSizeBelastungsplan();
    this.resetOptions();
  }

  private resetOptions() {
    this.$store.dispatch("resetFilteroptions");
    this.setDefaultOptionsForZaehlung();
  }

  private resetSizeBelastungsplan() {
    this.$store.dispatch("resetSizeBelastungsplanSvg");
  }

  /**
   * ??berpr??ft, ob eine Verkehrsart bei der Z??hlung erfasst wurde.
   * Wenn nicht, so wird die dazugeh??rige Checkbox deaktiviert.
   */
  public static isTypeDisabled(type: string, zaehlung: LadeZaehlungDTO): boolean {
    if (zaehlung === undefined || zaehlung.kategorien === undefined) {
      return true;
    }
    return !zaehlung.kategorien.includes(type);
  }

}
</script>