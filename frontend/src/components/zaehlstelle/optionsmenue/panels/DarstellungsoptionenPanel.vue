<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <div>
        <v-icon left>mdi-cogs</v-icon>
        Darstellungsoptionen
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="mt-1">
      <panel-header font-size="0.875rem" font-weight="bold" padding="10px 0 0 0"
                    header-text="Belastungsplan"></panel-header>

      <v-row align="start" justify="center" dense>
        <v-col cols="4">
          <v-hover v-model="hoverWerteHundertRunden">
            <v-checkbox v-model="werteHundertRunden"
                        :label="'Werte auf 100 Runden'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey darken-1"
                        dense></v-checkbox>
          </v-hover>
          <v-hover v-model="hoverSizeBelastungsplan">
            <v-slider v-model="sizeBelastungsplan"
                      label="Belastungsplangröße"
                      :max="maxSizeBelastungsplanSvg"
                      :min="minSizeBelastungsplanSvg"
            />
          </v-hover>
        </v-col>
        <v-col cols="4">
          <v-hover v-model="hoverBlackPrintMode">
            <v-checkbox v-model="blackPrintMode"
                        :label="'schwarz-weiß Druckausgabe'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey darken-1"
                        dense></v-checkbox>
          </v-hover>
        </v-col>
        <v-col cols="4">
          <v-card flat>
            {{ helpTextBelastungsplan }}
          </v-card>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <panel-header font-size="0.875rem" font-weight="bold" padding="10px 0 10px 0"
                    header-text="Ganglinie"></panel-header>

      <v-row align="start" justify="center" dense>
        <v-col cols="4">
          <v-hover v-model="hoverYAchse1">
            <v-text-field v-model="ganglinieYAchse1MaxValue"
                          :label="'Y-Achse 1'"
                          :rules="[onlyNumbers]"
                          type="number"
                          @blur="checkRangeYAchse1"
                          clearable
                          dense>
            </v-text-field>
          </v-hover>
        </v-col>
        <v-col cols="4">
          <v-hover v-model="hoverYAchse2">
            <v-text-field v-model="ganglinieYAchse2MaxValue"
                          :label="'Y-Achse 2 (%)'"
                          type="number"
                          :rules="[onlyNumbersSmaller100]"
                          @blur="checkRangeYAchse2"
                          clearable
                          dense>
            </v-text-field>
          </v-hover>
        </v-col>
        <v-col cols="4">
          <v-card flat>
            {{ helpTextGanglinie }}
          </v-card>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <panel-header font-size="0.875rem" font-weight="bold" padding="10px 0 0 0"
                    header-text="Listenausgabe"></panel-header>
      <v-row align="start" justify="center" dense>
        <v-col cols="4">
          <v-hover v-model="hoverStundensumme">
            <v-checkbox v-model="stundensumme"
                        :label="'Stundensumme'"
                        hide-details
                        color="grey darken-1"
                        dense></v-checkbox>
          </v-hover>
          <v-hover v-model="hoverBlocksumme">
            <v-checkbox v-model="blocksumme"
                        :label="'Blocksumme'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey darken-1"
                        dense></v-checkbox>
          </v-hover>
        </v-col>
        <v-col cols="4">
          <v-hover v-model="hoverTagessumme">
            <v-checkbox v-model="tagessumme"
                        :label="'Tagessumme'"
                        hide-details
                        color="grey darken-1"
                        dense></v-checkbox>
          </v-hover>
          <v-hover v-model="hoverSpitzenstunde">
            <v-checkbox v-model="spitzenstunde"
                        :label="'Spitzenstunde'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey darken-1"
                        dense></v-checkbox>
          </v-hover>
        </v-col>
        <v-col cols="4">
          <v-card flat>
            {{ helpTextListenausgabe }}
          </v-card>
        </v-col>
      </v-row>

      <panel-header v-if="!isZeitauswahlForSpitzenstunde && spitzenstunde"
                    font-size="0.875rem" font-weight="bold" padding="10px 0 0 0"
                    header-text="Detailauswahl Listenausgabe"></panel-header>
      <v-hover v-model="hoverSpitzenstundeDetailauswahl">
        <v-row v-if="!isZeitauswahlForSpitzenstunde && spitzenstunde" align="start" justify="center" dense>
          <v-col cols="4">
          </v-col>
          <v-col cols="4">
            <v-checkbox v-model="spitzenstundeKfz"
                        :label="'Spitzenstunde KFZ'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey darken-1"
                        dense
                        :disabled="isTypeKfzDisabled()"></v-checkbox>
            <v-checkbox v-model="spitzenstundeRad"
                        :label="'Spitzenstunde Rad'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey darken-1"
                        dense
                        :disabled="isTypeRadDisabled()"></v-checkbox>
            <v-checkbox v-model="spitzenstundeFuss"
                        :label="'Spitzenstunde Fuß'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey darken-1"
                        dense
                        :disabled="isTypeFussDisabled()"></v-checkbox>
          </v-col>
          <v-col cols="4">
            <v-card flat>
              {{ helpTextDetailauswahlListenausgabe }}
            </v-card>
          </v-col>
        </v-row>
      </v-hover>

      <!-- Zeitreihe -->
      <panel-header font-size="0.875rem" font-weight="bold" padding="10px 0 0 0"
                    header-text="Zeitreihe"></panel-header>

      <v-row align="start" justify="center" dense>
        <v-col cols="4">
          <v-hover v-model="hoverZeitreiheGesamt">
            <v-checkbox v-model="zeitreiheGesamt"
                        :label="'Summe alle Verkehrsarten anzeigen'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey darken-1"
                        dense></v-checkbox>
          </v-hover>
        </v-col>
        <v-col cols="4">
        </v-col>
        <v-col cols="4">
          <v-card flat>
            {{ helpTextZeitreihe }}
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";

// Typen
/* eslint-disable no-unused-vars */
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
/* eslint-enable no-unused-vars */
import PanelHeader from "@/components/common/PanelHeader.vue";
/* eslint-disable no-unused-vars */
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
/* eslint-enable no-unused-vars */
import _ from 'lodash';
/* eslint-enable no-unused-vars */
import Optionsmenue from "@/components/zaehlstelle/optionsmenue/Optionsmenue.vue";

@Component({
  components: {PanelHeader}
})
export default class DarstellungsoptionenPanel extends Vue {

  private static readonly SPITZENSTUNDE: string = 'Spitzenstunde';
  private static readonly MIN_VALUE: number = 0;
  private static readonly MAX_VALUE_EXCLUDE: number = 101;

  // Belastungsplan
  private werteHundertRunden: boolean = false;
  private blackPrintMode: boolean = false;
  private sizeBelastungsplan: number = 0;

  // Ganglinie
  private ganglinieYAchse1MaxValue: number | null = null;
  private ganglinieYAchse2MaxValue: number | null = null;

  // Listenausgabe
  private stundensumme: boolean = false;
  private blocksumme: boolean = false;
  private tagessumme: boolean = false;
  private spitzenstunde: boolean = false;
  private spitzenstundeKfz: boolean = false;
  private spitzenstundeRad: boolean = false;
  private spitzenstundeFuss: boolean = false;

  // Zeitreihe
  private zeitreiheGesamt: boolean = false;

  mounted() {
    const options = this.$store.getters.getFilteroptions as OptionsDTO
    this.update(options)
    this.sizeBelastungsplan = this.$store.getters.getSizeBelastungsplanSvg;
  }

  onlyNumbers(v: any) {
    if (v === null) return true;
    if (!isNaN(parseFloat(v)) && v >= DarstellungsoptionenPanel.MIN_VALUE) return true;
    if (!v.trim()) return true;
    return 'Das Feld darf nur positive Zahlen enthalten';
  }

  onlyNumbersSmaller100(v: any) {
    if (v === null) return true;
    if (!isNaN(parseFloat(v)) && _.inRange(v, DarstellungsoptionenPanel.MIN_VALUE, DarstellungsoptionenPanel.MAX_VALUE_EXCLUDE)) return true;
    if (!v.trim()) return true;
    return 'Das Feld darf nur positive Zahlen kleiner gleich 100 enthalten';
  }

  // Watcher
  // Auswahl geändert? Event zum Aktualisieren des Optionsobjektes schicken!

  @Watch("werteHundertRunden")
  storeWerteHundertRunden() {
    this.$emit("werteHundertRunden", this.werteHundertRunden)
  }

  @Watch("blackPrintMode")
  storeBlackPrintMode() {
    this.$emit("blackPrintMode", this.blackPrintMode)
  }

  @Watch("sizeBelastungsplan")
  storeSizeBelastungsplan() {
    this.$store.dispatch("setSizeBelastungsplanSvg", this.sizeBelastungsplan);
  }

  @Watch("stundensumme")
  storeStundensumme() {
    this.$emit("stundensumme", this.stundensumme)
  }

  @Watch("blocksumme")
  storeBlocksumme() {
    this.$emit("blocksumme", this.blocksumme)
  }

  @Watch("tagessumme")
  storeTagessumme() {
    this.$emit("tagessumme", this.tagessumme)
  }

  @Watch("spitzenstunde")
  storeSpitzenstunde() {
    this.$emit("spitzenstunde", this.spitzenstunde)
  }

  @Watch("spitzenstundeKfz")
  storeSpitzenstundeKfz() {
    this.$emit("spitzenstundeKfz", this.spitzenstundeKfz)
  }

  @Watch("spitzenstundeRad")
  storeSpitzenstundeRad() {
    this.$emit("spitzenstundeRad", this.spitzenstundeRad)
  }

  @Watch("spitzenstundeFuss")
  storeSpitzenstundeFuss() {
    this.$emit("spitzenstundeFuss", this.spitzenstundeFuss)
  }

  @Watch("ganglinieYAchse1MaxValue")
  storeGanglinieYAchse1MaxValue() {
    this.$emit("ganglinieYAchse1MaxValue", this.ganglinieYAchse1MaxValue)
  }

  @Watch("ganglinieYAchse2MaxValue")
  storeGanglinieYAchse2MaxValue() {
    this.$emit("ganglinieYAchse2MaxValue", this.ganglinieYAchse2MaxValue);
  }

  @Watch("zeitreiheGesamt")
  storeZeitreiheGesamt() {
    this.$emit("zeitreiheGesamt", this.zeitreiheGesamt)
  }

  // Wenn sich die Optionen ändern, dann soll sich auch die Auswahl auf der
  // Oberfläche ändern.
  @Watch("options")
  optionsChanged(newOptions: OptionsDTO) {
    this.update(newOptions);
  }

  get sizeBelastungsplanSvg(): number {
    return this.$store.getters.getSizeBelastungsplanSvg;
  }

  @Watch("sizeBelastungsplanSvg")
  sizeBelastungsplanSvgChanged(newSize: number) {
    this.sizeBelastungsplan = newSize;
  }

  private hoverWerteHundertRunden: boolean = false;
  private hoverSizeBelastungsplan: boolean = false;
  private hoverBlackPrintMode: boolean = false;
  private hoverStundensumme: boolean = false;
  private hoverBlocksumme: boolean = false;
  private hoverTagessumme: boolean = false;
  private hoverSpitzenstunde: boolean = false;
  private hoverSpitzenstundeDetailauswahl: boolean = false;
  private hoverYAchse1: boolean = false;
  private hoverYAchse2: boolean = false;
  private hoverZeitreiheGesamt: boolean = false;

  get helpTextBelastungsplan(): string {
    if (this.hoverWerteHundertRunden) {
      return "";
    }
    if (this.hoverBlackPrintMode) {
      return "";
    }
    if (this.hoverSizeBelastungsplan) {
      return "";
    }
    return "";
  }

  get helpTextGanglinie(): string {
    if (this.hoverYAchse1) {
      return "Der Wert wird zurückgesetzt, wenn die Zahl < 0 ist.";
    }
    if (this.hoverYAchse2) {
      return "Der Wert wird zurückgesetzt, wenn die Zahl < 0 oder > 100 ist.";
    }
    return "";
  }

  get helpTextListenausgabe(): string {
    if (this.hoverStundensumme) {
      return "Ausgabe der Summen für jede Stunde als Zeile.";
    }
    if (this.hoverBlocksumme) {
      return "Ausgabe der Summen für jeden Zählblock als Zeile.";
    }
    if (this.hoverTagessumme) {
      return "Ausgabe der Summe für den Tageswert als Zeile.";
    }
    if (this.hoverSpitzenstunde) {
      return "Ausgaben der Summe für die Spitzenstunde(n) als Zeile.";
    }
    return "";
  }

  get helpTextDetailauswahlListenausgabe(): string {
    if (this.hoverSpitzenstundeDetailauswahl) {
      return "Detailauswahl der auszugebenden Spitzenstunde(n)";
    }
    return "";
  }

  get helpTextZeitreihe(): string {
    if (this.hoverZeitreiheGesamt) {
      return "";
    }
    return "";
  }

  // reaktiver getter auf den Store
  get options(): OptionsDTO {
    return this.$store.getters.getFilteroptions
  }

  get isZeitauswahlForSpitzenstunde(): boolean {
    const zeitauswahl: string = this.$store.getters.getZeitauswahl
    return zeitauswahl.includes(DarstellungsoptionenPanel.SPITZENSTUNDE)
  }

  get activeZaehlung(): LadeZaehlungDTO {
    return this.$store.getters.getAktiveZaehlung;
  }

  // Setzt die Auswahlelemente auf der Oberfläche zurück, oder mit den
  //  übergebenen Werten im Optionsobjekt
  update(newOptions: OptionsDTO) {
    newOptions.werteHundertRunden === null ? this.werteHundertRunden = false : this.werteHundertRunden = newOptions.werteHundertRunden
    newOptions.blackPrintMode === null ? this.blackPrintMode = false : this.blackPrintMode = newOptions.blackPrintMode
    newOptions.stundensumme === null ? this.stundensumme = false : this.stundensumme = newOptions.stundensumme
    newOptions.blocksumme === null ? this.blocksumme = false : this.blocksumme = newOptions.blocksumme
    newOptions.tagessumme === null ? this.tagessumme = false : this.tagessumme = newOptions.tagessumme
    newOptions.spitzenstunde === null ? this.spitzenstunde = false : this.spitzenstunde = newOptions.spitzenstunde
    newOptions.spitzenstundeKfz === null ? this.spitzenstundeKfz = false : this.spitzenstundeKfz = newOptions.spitzenstundeKfz
    newOptions.spitzenstundeRad === null ? this.spitzenstundeRad = false : this.spitzenstundeRad = newOptions.spitzenstundeRad
    newOptions.spitzenstundeFuss === null ? this.spitzenstundeFuss = false : this.spitzenstundeFuss = newOptions.spitzenstundeFuss
    newOptions.ganglinieYAchse1MaxValue === null ? this.ganglinieYAchse1MaxValue = null : this.ganglinieYAchse1MaxValue = newOptions.ganglinieYAchse1MaxValue
    newOptions.ganglinieYAchse2MaxValue === null ? this.ganglinieYAchse2MaxValue = null : this.ganglinieYAchse2MaxValue = newOptions.ganglinieYAchse2MaxValue
    newOptions.zeitreiheGesamt === null ? this.zeitreiheGesamt = false : this.zeitreiheGesamt = newOptions.zeitreiheGesamt
  }

  private isTypeKfzDisabled(): boolean {
    const disabled: boolean = this.isTypeDisabled('KFZ');
    if (disabled) {
      this.spitzenstundeKfz = false;
    }
    return disabled;
  }

  private isTypeRadDisabled(): boolean {
    const disabled: boolean = this.isTypeDisabled('RAD');
    if (disabled) {
      this.spitzenstundeRad = false;
    }
    return disabled;
  }

  private isTypeFussDisabled(): boolean {
    const disabled: boolean = this.isTypeDisabled('FUSS');
    if (disabled) {
      this.spitzenstundeFuss = false;
    }
    return disabled;
  }

  /**
   * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
   * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
   */
  private isTypeDisabled(type: string): boolean {
    return Optionsmenue.isTypeDisabled(type, this.activeZaehlung);
  }

  private checkRangeYAchse2() {
    if (this.ganglinieYAchse2MaxValue) {
      if (!_.inRange(this.ganglinieYAchse2MaxValue, DarstellungsoptionenPanel.MIN_VALUE, DarstellungsoptionenPanel.MAX_VALUE_EXCLUDE)) {
        this.ganglinieYAchse2MaxValue = null;
      }
    }
  }

  private checkRangeYAchse1() {
    if (this.ganglinieYAchse1MaxValue && this.ganglinieYAchse1MaxValue < DarstellungsoptionenPanel.MIN_VALUE) {
      this.ganglinieYAchse1MaxValue = null;
    }
  }

  get maxSizeBelastungsplanSvg() {
    return this.$store.getters.getMaxSizeBelastungsplanSvg;
  }

  get minSizeBelastungsplanSvg() {
    return this.$store.getters.getMinSizeBelastungsplanSvg;
  }


}
</script>