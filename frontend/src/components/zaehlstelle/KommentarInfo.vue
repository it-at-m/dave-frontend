<template>
  <div v-if="kommentarArray.length > 0">

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            color="secondary"
            icon
            @click="showDialog = true">
          <v-icon>{{ icon.iconPath }}</v-icon>
        </v-btn>
      </template>
      <span>{{ icon.tooltip }}</span>
    </v-tooltip>

    <v-dialog
        v-model="showDialog"
        max-width="600px"
    >

      <v-card>
        <v-card-title class="headline grey lighten-2">
          <v-icon left>mdi-comment-multiple</v-icon>
          Informationen
        </v-card-title>
        <br/>
        <v-card-text>
          <div v-for="(item, index) in kommentarArray" v-bind:key="index">
            <strong class="subtitle-2">{{ item.text }}</strong>
            <p>{{ item.value }}</p>
          </div>
        </v-card-text>

        <v-footer>
          <v-spacer></v-spacer>
          <v-btn color="grey lighten-1"
                 @click="showDialog = false">
            Schließen
          </v-btn>
          <v-spacer></v-spacer>
        </v-footer>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {isEmpty} from 'lodash';

/* eslint-disable no-unused-vars */
import KeyVal from "@/types/KeyVal";
import IconTooltip from "@/types/util/IconTooltip";
/* eslint-enable no-unused-vars */

@Component
export default class KommentarInfo extends Vue {

  @Prop({default: ""}) private kommentarZaehlstelle?: string;
  @Prop({default: ""}) private kommentarZaehlung?: string;
  @Prop({default: ""}) private zaehlsituation?: string;
  @Prop({default: ""}) private zaehlsituationErweitert?: string;

  // Variables
  private showDialog: boolean = false;

  // Constants
  private static readonly KOMMENTARE_ANZEIGEN: string = "Kommentare anzeigen";
  private static readonly KOMMENTAR_ANZEIGEN: string = "Kommentar anzeigen";


  /** Berechnet, welches Icon und welcher Tooltip angezeigt werden sollen
   * Es werden vier Fälle unterschieden, die sich in den Icons unterscheiden:
   * 1.) Nur Zählstellenkommentar vorhanden
   * 2.) Zählstellenkommentar und Zählungsinformationen vorhanden
   * 3.) Kein Zählstellenkommentar vorhanden, nur eine Zählungsinformation vorhanden
   * 4.) Kein Zählstellenkommentar vorhanden, mehrere Zählungsinformationen vorhanden
   *
   * Wenn ein Zählstellenkommentar vorhanden ist werden comment-text Icons benutzt, wenn keiner vorhanden ist werden
   * die normalen comment Icons benutzt. Bei mehr als einem Kommentar werden -multiple Icons benutzt.
   */
  get icon(): IconTooltip {
    if (this.isNotUndefinedOrEmpty(this.kommentarZaehlstelle)) {
      // Zählstellenkommentar vorhanden
      if (this.isNotUndefinedOrEmpty(this.kommentarZaehlung)
          || this.isNotUndefinedOrEmpty(this.zaehlsituation)
          || this.isNotUndefinedOrEmpty(this.zaehlsituationErweitert)) {
        // Info von Zählstelle UND Zählung liegt vor
        return new IconTooltip("mdi-comment-text-multiple", KommentarInfo.KOMMENTARE_ANZEIGEN);
      } else {
        // Nur Info von Zählstelle liegt vor
        return new IconTooltip("mdi-comment-text", KommentarInfo.KOMMENTAR_ANZEIGEN);
      }
    } else {
      // Zählstellenkommentar NICHT vorhanden
      if (this.kommentarArray.length > 1)
          // Mehrere Kommentare vorhanden
        return new IconTooltip("mdi-comment-multiple", KommentarInfo.KOMMENTARE_ANZEIGEN);
      else {
        // Nur ein Kommentar vorhanden
        return new IconTooltip("mdi-comment", KommentarInfo.KOMMENTAR_ANZEIGEN);
      }
    }
  }

  // Zusammenbauen der Kommentare in ein Array. Hier wird auch die Anzeigereihenfolge bestimmt.
  get kommentarArray(): KeyVal[] {
    let kommArr: KeyVal[] = [] as KeyVal[];
    this.addToArrayIfNotEmpty(kommArr, "Kommentar zur Zählstelle", this.kommentarZaehlstelle);
    this.addToArrayIfNotEmpty(kommArr, "Kommentar zur Zählung", this.kommentarZaehlung);
    this.addToArrayIfNotEmpty(kommArr, "Zählsituation", this.zaehlsituation);
    this.addToArrayIfNotEmpty(kommArr, "Erweiterte Zählsituation", this.zaehlsituationErweitert);
    return kommArr;
  }

  // Hilfsfunktionen
  private addToArrayIfNotEmpty(kommArr: KeyVal[], title: string, value: string | undefined): void {
    if (this.isNotUndefinedOrEmpty(value)) {
      kommArr.push({text: title, value: value!})
    }
  }

  private isNotUndefinedOrEmpty(value: string | undefined): boolean {
    return (value != undefined && !isEmpty(value));
  }
}
</script>

<style scoped>

</style>