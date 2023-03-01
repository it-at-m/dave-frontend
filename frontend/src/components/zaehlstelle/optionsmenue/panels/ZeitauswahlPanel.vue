<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <div>
        <v-icon left>mdi-clock-time-four-outline</v-icon>
        Zeitauswahl
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="mt-1">

      <panel-header font-size="0.875rem" font-weight="bold" padding="10px 0 0 0"
                    header-text="Zeitauswahl"></panel-header>

      <v-row align="start" justify="center" dense>
        <v-col cols="8">
          <v-radio-group v-model="zeitauswahl"
                         mandatory
                         @change="zeitauswahlChanged">
            <v-row>
              <v-col cols="6">
                <v-hover v-model="hoverTageswert">
                  <v-radio label="Tageswert"
                           value="Tageswert"
                           color="grey darken-1"
                  ></v-radio>
                </v-hover>
                <v-hover v-model="hoverBlock">
                  <v-radio label="Block"
                           value="Block"
                           color="grey darken-1"
                  ></v-radio>
                </v-hover>
                <v-hover v-model="hoverStunde">
                  <v-radio label="Stunde"
                           value="Stunde"
                           color="grey darken-1"
                  ></v-radio>
                </v-hover>
              </v-col>
              <v-col cols="6">
                <v-hover v-model="hoverSpitzenstundeKfz">
                  <v-radio label="Spitzenstunde KFZ"
                           value="Spitzenstunde KFZ"
                           color="grey darken-1"
                           :disabled="isTypeDisabled('KFZ')"
                  ></v-radio>
                </v-hover>
                <v-hover v-model="hoverSpitzenstundeRad">
                  <v-radio label="Spitzenstunde Rad"
                           value="Spitzenstunde Rad"
                           color="grey darken-1"
                           :disabled="isTypeDisabled('RAD')"
                  ></v-radio>
                </v-hover>
                <v-hover v-model="hoverSpitzenstundeFuss">
                  <v-radio label="Spitzenstunde Fuß"
                           value="Spitzenstunde Fuß"
                           color="grey darken-1"
                           :disabled="isTypeDisabled('FUSS')"
                  ></v-radio>
                </v-hover>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-col>
        <v-col cols="4">
          <v-card flat>
            {{ helpTextZeitauswahl }}
          </v-card>
        </v-col>
      </v-row>
      <!-- Auszuwählende Zeitblöcke für Blockauswahl oder Spitzenstunde -->
      <v-row
          no-gutters>
        <v-col cols="4">
          <v-hover v-model="hoverSelectBlockOrSpitzenstunde" v-if="isZeitauswahlSpitzenstundeOrBlock">
            <v-select
                v-if="isZeitauswahlSpitzenstundeOrBlock"
                v-model="zeitblock"
                label="Zeitblock"
                :items="zeitblockValues"
                filled
                dense
            >
            </v-select>
          </v-hover>
          <!-- Auszuwählende Stunden -->
          <v-hover v-model="hoverSelectStunde" v-if="isZeitauswahlStunde">
            <v-select
                v-if="isZeitauswahlStunde"
                v-model="zeitblock"
                label="Stunde"
                :items="stuendlichValues"
                filled
                dense
            >
            </v-select>
          </v-hover>
        </v-col>
        <v-spacer/>

      </v-row>

      <v-divider></v-divider>
      <panel-header font-size="0.875rem" font-weight="bold" padding="10px 0 0 0"
                    header-text="Zeitintervall"></panel-header>
      <panel-header font-size="small" font-weight="normal" padding="0 0 10px 0"
                    header-text="(außer Belastungsplan und Zeitreihe)"></panel-header>

      <v-row align="start" justify="center" dense>
        <v-col cols="4">
          <v-hover v-model="hoverSelectZeitintervall">
            <v-select
                v-model="intervall"
                :items="zaehldatenIntervalle"
                label="Zeitintervall"
                filled
                dense
                :disabled="isZeitauswahlSpitzenstunde"
            ></v-select>
          </v-hover>
        </v-col>
        <v-spacer/>
        <v-col cols="4">
          <v-card flat>
            {{ helpTextZeitintervall }}
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

// Typen
/* eslint-disable no-unused-vars */
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import ZaehldatenIntervall, {ZaehldatenIntervallToSelect} from "@/types/enum/ZaehldatenIntervall";
import Zeitblock, {zeitblockInfo} from "@/types/enum/Zeitblock";
import KeyVal from "@/types/KeyVal";
import ZeitblockStuendlich, {zeitblockStuendlichInfo} from "@/types/enum/ZeitblockStuendlich";
/* eslint-enable no-unused-vars */
import PanelHeader from "@/components/common/PanelHeader.vue";
import Optionsmenue from "@/components/zaehlstelle/optionsmenue/Optionsmenue.vue";
import Zaehldauer from "@/types/enum/Zaehldauer";

@Component({
  components: {PanelHeader}
})
export default class ZeitauswahlPanel extends Vue {

  @Prop() zaehlung?: LadeZaehlungDTO

  private zeitauswahl: string = Zeitauswahl.TAGESWERT;
  private zeitblock: string = Zeitblock.ZB_00_24;
  private intervall: ZaehldatenIntervall = ZaehldatenIntervall.STUNDE_VIERTEL;

  // Zeitauswahl
  private hoverTageswert: boolean = false;
  private hoverBlock: boolean = false;
  private hoverStunde: boolean = false;
  private hoverSpitzenstundeKfz: boolean = false;
  private hoverSpitzenstundeRad: boolean = false;
  private hoverSpitzenstundeFuss: boolean = false;

  private hoverSelectBlockOrSpitzenstunde: boolean = false;
  private hoverSelectStunde: boolean = false;

  // Zeitintervall
  private hoverSelectZeitintervall: boolean = false;

  mounted() {
    const options = this.$store.getters.getFilteroptions as OptionsDTO
    this.update(options)
  }

  get isZeitauswahlSpitzenstundeOrBlock(): boolean {
    return this.zeitauswahl === Zeitauswahl.BLOCK
        || this.isZeitauswahlSpitzenstunde;
  }

  get isZeitauswahlStunde(): boolean {
    return this.zeitauswahl === Zeitauswahl.STUNDE;
  }

  get isZeitauswahlSpitzenstunde(): boolean {
    return this.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ
        || this.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD
        || this.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS;
  }

  get helpTextZeitauswahl(): string {
    if (this.hoverTageswert) {
      return "";
    }
    if (this.hoverBlock) {
      return "";
    }
    if (this.hoverStunde) {
      return "";
    }
    if (this.hoverSpitzenstundeKfz) {
      return "Stunde der höchsten Belastung des Kraftfahrzeugverkehrs an einem Knoten (gleitend).";
    }
    if (this.hoverSpitzenstundeRad) {
      return "Stunde der höchsten Belastung des Radverkehrs an einem Knoten (gleitend).";
    }
    if (this.hoverSpitzenstundeFuss) {
      return "Stunde der höchsten Belastung des Fußverkehrs an einem Knoten (gleitend).";
    }
    if (this.hoverSelectBlockOrSpitzenstunde) {
      return "";
    }
    if (this.hoverSelectStunde) {
      return "";
    }
    return "";
  }

  get helpTextZeitintervall(): string {
    if (this.hoverSelectZeitintervall) {
      return "";
    }
    return "";
  }

  /**
   * Lädt - abhängig von der aktuellen Zählung - die Labels und Werte für das Zeitblock Select Control
   * Wurde bei der Zeitauswahl die Option Spitzenstunde gewählt, so wird der Zeitblock 0-24 Uhr an
   * den Array der Zeitblöcke angehangen.
   */
  get zeitblockValues(): Array<KeyVal> {
    let result = new Array<KeyVal>();
    // die möglichen Blöcke aus der Zählung
    const blocks: Zeitblock[] = this.zaehlung?.zeitauswahl.blocks as Zeitblock[];

    if (blocks && Array.isArray(blocks)) {
      // Select Control mit den entsprechenden text/value Werten füllen
      blocks.forEach(b => {
        const kv = zeitblockInfo.get(b);
        if (kv) {
          result.push(kv);
        }
      });
      // Block 0-24 bei Zeitauswahl Spitzenstunde hinzufügen falls kein Zeitblock ZB_06_19 oder ZB_06_22 existiert.
      if (this.isZeitauswahlSpitzenstunde
          && !result.some(keyVal => keyVal === zeitblockInfo.get(Zeitblock.ZB_06_19))
          && !result.some(keyVal => keyVal === zeitblockInfo.get(Zeitblock.ZB_06_22))) {
        if (this.activeZaehlung.zaehldauer === Zaehldauer.SONSTIGE) {
          const zeitBlockMaximal: KeyVal = {} as KeyVal;
          zeitBlockMaximal.value = Zeitblock.ZB_00_24;
          zeitBlockMaximal.text = "maximal";
          result.push(zeitBlockMaximal)
        } else {
          result.push(zeitblockInfo.get(Zeitblock.ZB_00_24) as KeyVal);
        }
      }
    } else {
      console.warn("Es wurden keine Zeitblöcke gefunden.")
    }
    return result;
  }

  /**
   * Lädt - abhängig von der aktuellen Zählung - die Labels und Werte für das Stunden Select Control
   */
  get stuendlichValues(): Array<KeyVal> {
    let result = new Array<KeyVal>();
    // die möglichen Stunden aus der Zählung
    const hrs = this.zaehlung?.zeitauswahl.hours as ZeitblockStuendlich[];

    if (hrs && typeof Array.isArray(hrs)) {
      // Select Control mit den entsprechenden text/value Werten füllen
      hrs.forEach(h => {
        const kv = zeitblockStuendlichInfo.get(h);
        if (kv) {
          result.push(kv);
        }
      });
    } else {
      console.warn("Es wurden keine Zeitauswahl gefunden.")
    }
    return result;
  }

  /**
   * Gibt die ZaehldatenIntervalle zurück welche für den Intervall Select zur Anzeige relevant sind.
   */
  get zaehldatenIntervalle(): Array<KeyVal> {
    return ZaehldatenIntervallToSelect;
  }

  /**
   * Wird der Tageswert gewählt, so gibt es kein Dropdown Menü, da die Ansicht dann immer
   * über den kompletten Tag geht. Deshalb muss hier auf das "Change" event der Checkbox
   * Gruppe gelauscht werden.
   */
  zeitauswahlChanged() {
    if (this.zeitauswahl === Zeitauswahl.TAGESWERT) {
      this.zeitblock = Zeitblock.ZB_00_24;
    }
    // Der erste Eintrag wird als ausgewählt gesetzt
    if (this.isZeitauswahlSpitzenstundeOrBlock) {
      const zb = zeitblockInfo.get(this.zeitblockValues[0].value)?.value;
      if (zb) {
        this.zeitblock = zb;
      }
    }
    //Der erste Eintrag wird als ausgewählt gesetzt
    if (this.zeitauswahl === Zeitauswahl.STUNDE) {
      const zs = zeitblockStuendlichInfo.get(this.stuendlichValues[0].value)?.value;
      if (zs) {
        this.zeitblock = zs;
      }
    }
  }

  // Watcher
  // Auswahl geändert? Event zum Aktualisieren des Optionsobjektes schicken!
  @Watch("zeitauswahl")
  storeZeitauswahl() {
    this.$emit("zeitauswahl", this.zeitauswahl)
  }

  @Watch("zeitblock")
  storeZeitblock() {
    this.$emit("zeitblock", this.zeitblock)
  }

  @Watch("intervall")
  storeIntervall() {
    this.$emit("intervall", this.intervall)
  }

  // reaktiver getter auf den Store
  get options(): OptionsDTO {
    return this.$store.getters.getFilteroptions
  }

  get activeZaehlung(): LadeZaehlungDTO {
    return this.$store.getters.getAktiveZaehlung;
  }

  // Wenn sich die Optionen ändern, dann soll sich auch die Auswahl auf der
  // Oberfläche ändern.
  @Watch("options")
  optionsChanged(newOptions: OptionsDTO) {
    this.update(newOptions)
  }

  // Setzt die Auswahlelemente auf der Oberfläche zurück, oder mit den
  //  übergebenen Werten im Optionsobjekt
  update(newOptions: OptionsDTO) {
    newOptions.zeitauswahl === null ? this.zeitauswahl = Zeitauswahl.TAGESWERT : this.zeitauswahl = newOptions.zeitauswahl;
    newOptions.zeitblock === null ? this.zeitblock = Zeitblock.ZB_00_24 : this.zeitblock = newOptions.zeitblock;
    newOptions.intervall === null ? this.intervall = ZaehldatenIntervall.STUNDE_VIERTEL : this.intervall = newOptions.intervall;
  }

  /**
   * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
   * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
   */
  private isTypeDisabled(type: string): boolean {
    return Optionsmenue.isTypeDisabled(type, this.activeZaehlung);
  }

}
</script>