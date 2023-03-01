<template>
  <v-chart
      :style="belastungsplanHeightAndWidth"
      :options="optionsBelastunsplan"
      ref="chart"
      autoresize/>
</template>

<script lang="ts">

import {Component, Prop, Ref, Vue, Watch} from "vue-property-decorator";
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'
// eslint-disable-next-line no-unused-vars
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
// eslint-disable-next-line no-unused-vars
import LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import {Levels} from "@/api/error";

/**
 * Die Berechnung der Koordinaten für die einzelnen Fahrbeziehungen erfolgt anhand einer Drehmatrix.
 * Lediglich die Koordinaten für die Fahrbeziehungen 1 nach * wurden händisch festgelegt.
 * Daraus ergeben sich folgende Drehmatrizen.
 *
 * Drehmatrix 1 nach n:
 *
 *   0*PI  | 0,25*PI |  0,5*PI | 0,75*PI |    PI   | 1,25*PI |  1,5*PI | 1,75*PI
 * start1s | start5s | start2s | start6s | start3s | start7s | start4s | start8s
 * ende1s  | ende5s  | ende2s  | ende6s  | ende3s  | ende7s  | ende4s  | ende8s
 *
 */

@Component
export default class BelastungsplanKreisverkehr extends Vue {

  /** Aufbau der Datenstruktur:
   * Ebene 1: Index ist die Knotenarmnummer - 1
   * Ebene 2: Index = 0 => HINEIN
   *          Index = 1 => VORBEI
   *          Index = 2 => HERAUS
   */
  @Prop()
  private readonly data!: LadeBelastungsplanDTO;

  // BEARBEITUNG: Wenn du folgende Zeile einkommentierst, werden dir immer die Kreissymbole eingeblendet
  // Zusätzlich die beiden danach folgenden Zeilen auskommentier (Prop und private...)
  // private readonly visibleNodes: boolean[] = [true,true,true,true,true,true,true,true];
  @Prop()
  private readonly visibleNodes!: boolean[];
  @Prop()
  private readonly streets!: string[];
  @Prop()
  private readonly name!: string;

  // Variable zum Anzeigen, ob eine Fahrzeugkategorie ausgewählt wurde
  private fahrzeugkategorieSelected: boolean = this.isFahrzeugkategorieSelected;

  /** Konstante für die Farben des Kreisverkehrs
   * [Knotenarm 1, Knotenarm 2, Knotenarm 3, Knotenarm 4, Knotenarm 5, Knotenarm 6, Knotenarm 7, Knotenarm 8, Kreisbahn]
   * * ['black', 'red', 'green', 'blue', 'lime', 'purple', 'orange', 'brown', 'gray darken-2'] als MaterialDesignColors
   */
      // private readonly COLOR: Array<string> = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
  private readonly COLOR: Array<string> = ['#000000', '#F44336', '#4CAF50', '#2196F3', '#CDDC39', '#9C27B0', '#FF9800', '#795548', '#9E9E9E'];

  /** Maximale Länge eines Straßennamens */
  private readonly MAX_STREET_LENGTH: number = 35;

  /** Maximale Anzahl an Fahrzeugen 1.000.000 */
  private readonly MAX_CARS_LENGTH: number = 7;

  /** Maximale Länge des ein- & ausfahrenden Verkehrs */
  private readonly MAX_LABEL_LENGTH: number = 35;

  /** Konstante für das Keyword 'none'  */
  private readonly NONE = 'none';

  /** Konstante für zwei Leerzeichen '  '  */
  private readonly BlANK = '  ';

  /** Konstanten für die unterschiedlichen Stärken der Biegungen */
  private readonly CURVENESS_02: number = 0.2;

  /** Konstanten für die Position des Knoten-Labels (Kreis mit der Zahl innen) von Knoten 1*/
  private readonly XCOORD_DEFAULT_NODELABEL = 0;
  private readonly YCOORD_DEFAULT_NODELABEL = -425;

  /** Konstanten für die Position der Dreiecke bei der Ausfahrt von Knoten 1 */
  private readonly XCOORD_DEFAULT_TRIANGLE = 50;
  private readonly YCOORD_DEFAULT_TRIANGLE = -510;

  /** Konstanten für die Position der Einfahrt von Knoten 1 */
  private readonly XCOORD_DEFAULT = -50;
  private readonly YCOORD_DEFAULT = -475;

  /** Konstanten für die Position der Kreisbahn */
  private readonly XCOORD_CIRCLE_DEFAULT = 0;
  private readonly YCOORD_CIRCLE_DEFAULT = -225;

  /** Laenge der geraden Strecke */
  private readonly STRAIGHT_DEFAULT = 150;

  /** Konstanten für die Winkel der Drehmatrix */
  private readonly ANGLE_0125_PI = 0.125 * Math.PI;
  private readonly ANGLE_025_PI = 0.25 * Math.PI;
  private readonly ANGLE_0375_PI = 0.375 * Math.PI;
  private readonly ANGLE_05_PI = 0.5 * Math.PI;
  private readonly ANGLE_0625_PI = 0.625 * Math.PI;
  private readonly ANGLE_075_PI = 0.75 * Math.PI;
  private readonly ANGLE_0875_PI = 0.875 * Math.PI;
  private readonly ANGLE_1_PI = Math.PI;
  private readonly ANGLE_1125_PI = 1.125 * Math.PI;
  private readonly ANGLE_125_PI = 1.25 * Math.PI;
  private readonly ANGLE_1375_PI = 1.375 * Math.PI;
  private readonly ANGLE_15_PI = 1.5 * Math.PI;
  private readonly ANGLE_1625_PI = 1.625 * Math.PI;
  private readonly ANGLE_175_PI = 1.75 * Math.PI;
  private readonly ANGLE_1875_PI = 1.875 * Math.PI;

  /** Konstanten für Winkel bei Rotate der Labels.
   * PI ist leider nicht möglich, daher als Zahl
   */
  private readonly ROTATE_0 = 0;
  private readonly ROTATE_22_5 = 22.5;
  private readonly ROTATE_45 = 45;
  private readonly ROTATE_67_5 = 67.5;
  private readonly ROTATE_90 = 90;
  private readonly ROTATE_135 = 135;
  private readonly ROTATE_180 = 180;
  private readonly ROTATE_225 = 225;
  private readonly ROTATE_270 = 270;
  private readonly ROTATE_315 = 315;

  /** SVG-Path für das Dreick bei der Ausfahrt */
  private readonly TRIANGLE = 'path://M12,2L1,21H23M12,6L19.53,19H4.47';
  /** Triangle Symbol Size */
  private readonly TRIANGLE_SYMBOL_SIZE: Array<number> = [37.5, 15];

  /** SVG-Path für die Icons der einzelnen Knotenarme (Kreis mit Zahl in der Mitte) */
  private readonly NODE_ICON_1 = 'path://M10,7H14V17H12V9H10V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z';
  private readonly NODE_ICON_2 = 'path://M9,7H13A2,2 0 0,1 15,9V11A2,2 0 0,1 13,13H11V15H15V17H11L9,17V13A2,2 0 0,1 11,11H13V9H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z';
  private readonly NODE_ICON_3 = 'path://M15,15A2,2 0 0,1 13,17H9V15H13V13H11V11H13V9H9V7H13A2,2 0 0,1 15,9V10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 15,13.5V15M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z';
  private readonly NODE_ICON_4 = 'path://M9,7H11V11H13V7H15V17H13V13H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z';
  private readonly NODE_ICON_5 = 'path://M9,7H15V9H11V11H13A2,2 0 0,1 15,13V15A2,2 0 0,1 13,17H9V15H13V13H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z';
  private readonly NODE_ICON_6 = 'path://M11,7H15V9H11V11H13A2,2 0 0,1 15,13V15A2,2 0 0,1 13,17H11A2,2 0 0,1 9,15V9A2,2 0 0,1 11,7M11,13V15H13V13H11M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z';
  private readonly NODE_ICON_7 = 'path://M11,17H9L13,9H9V7H15V9L11,17M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z';
  private readonly NODE_ICON_8 = 'path://M11,13V15H13V13H11M11,9V11H13V9H11M11,17A2,2 0 0,1 9,15V13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 9,10.5V9A2,2 0 0,1 11,7H13A2,2 0 0,1 15,9V10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 15,13.5V15A2,2 0 0,1 13,17H11M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z';
  /** Node Symbol Size */
  private readonly NODE_SYMBOL_SIZE: number = 22;

  /** Label Styling */
  private readonly FONT_SIZE: number = 15;
  private readonly FONT_FAMILY: string = 'Arial';
  private readonly FONT_COLOR: string = 'black';

  /** Zoom-Lvls */
  private readonly ZOOM_LVL_XL: number = 1;
  private readonly ZOOM_LVL_LG: number = 0.8;

  /** Konstanten für die Namen der einzelnen Punkte, die verbunden werden */
  private readonly KREIS_5_1: string = 'kreis51';
  private readonly KREIS_1_8: string = 'kreis18';
  private readonly KREIS_2_5: string = 'kreis25';
  private readonly KREIS_6_2: string = 'kreis62';
  private readonly KREIS_3_6: string = 'kreis36';
  private readonly KREIS_7_3: string = 'kreis73';
  private readonly KREIS_4_7: string = 'kreis47';
  private readonly KREIS_8_4: string = 'kreis84';

  private readonly START_1S: string = 'start1s';
  private readonly ENDE_1S: string = 'ende1s';
  private readonly START_1T: string = 'start1t';
  private readonly ENDE_1T: string = 'ende1t';

  private readonly START_2S: string = 'start2s';
  private readonly ENDE_2S: string = 'ende2s';
  private readonly START_2T: string = 'start2t';
  private readonly ENDE_2T: string = 'ende2t';

  private readonly START_3S: string = 'start3s';
  private readonly ENDE_3S: string = 'ende3s';
  private readonly START_3T: string = 'start3t';
  private readonly ENDE_3T: string = 'ende3t';

  private readonly START_4S: string = 'start4s';
  private readonly ENDE_4S: string = 'ende4s';
  private readonly START_4T: string = 'start4t';
  private readonly ENDE_4T: string = 'ende4t';

  private readonly START_5S: string = 'start5s';
  private readonly ENDE_5S: string = 'ende5s';
  private readonly START_5T: string = 'start5t';
  private readonly ENDE_5T: string = 'ende5t';

  private readonly START_6S: string = 'start6s';
  private readonly ENDE_6S: string = 'ende6s';
  private readonly START_6T: string = 'start6t';
  private readonly ENDE_6T: string = 'ende6t';

  private readonly START_7S: string = 'start7s';
  private readonly ENDE_7S: string = 'ende7s';
  private readonly START_7T: string = 'start7t';
  private readonly ENDE_7T: string = 'ende7t';

  private readonly START_8S: string = 'start8s';
  private readonly ENDE_8S: string = 'ende8s';
  private readonly START_8T: string = 'start8t';
  private readonly ENDE_8T: string = 'ende8t';


  private maxNumberOfCars: number = 0;

  @Ref('chart')
  public readonly chart!: any;

  @Watch('fahrzeugkategorieSelected')
  private showToastIfFalse() {
    if (!this.fahrzeugkategorieSelected) {
      this.$store.dispatch('snackbar/showToast', {
        level: Levels.ERROR,
        snackbarTextPart1: 'Es wurde keine der 3 Fahrzeugkategorien (KFZ, SV oder GV) ausgewählt.',
        snackbarTextPart2: 'Eine Anzeige des Belastungsplans ist daher nicht möglich.'
      });
    }
  }

  get belastungsplanHeightAndWidth() {
    let height = '800px';
    if (this.$vuetify.breakpoint.xl || this.$vuetify.breakpoint.lg) {
      height = '1000px';
    }
    return `width: 100%; height: ${height}`;
  }

  get selectedOptions(): OptionsDTO {
    return this.$store.getters.getFilteroptions;
  }

  get optionsBelastunsplan() {
    return {
      tooltip: {
        trigger: 'item',
        show: false
      },
      /**
       * Start- und Endpunkte der Fahrbeziehungen
       * Seitens des Fachbereiches war gefordert, dass die gezeichneten Linien geradeaus starten,
       * dann die Kurve beschreiben. Dazu wurde folgenden Struktur aufgebaut:
       *
       * Die Benennung der Punkte erfolgt nach folgendem Schema:
       * Ausfahrender Verkehr (s kommt vor t)
       * start1s bedeutet, dass es sich um den Startpunkt einer Linie handelt, die
       * - als Quelle (s = Source) den Knotenarm 1 hat
       *
       * ende1s bedeutet, dass es sich um den Endpunkt einer Linie handelt, die
       * - als Quelle (s = Source) den Knotenarm 1 hat
       *
       * Einfahrender Verkehr (t kommt vor s) analog zum ausfahrenden Verkehr mit dem Unterschied, dass s und t vertauscht sind.
       *
       * Aufbau der Fahrbeziehungen:
       * Es gibt keine genauen Fahrbeziehungen, sondern nur n nach * und * nach n
       * Beispiel: 1 nach *
       *
       * start1s -> ende1s: gerade Linie
       * ende1s -> kreis18: Kurve Teil
       *
       * Beispiel: * nach 1
       * kreis51 -> start1t: Kurve Teil
       * start1t -> ende1t: gerade Linie
       */
      series: [
        {
          name: this.name,
          type: 'graph',
          layout: this.NONE,
          // height: this.belastungsplanHeightOfSeries,
          height: '550px',
          width: '550px',
          zoom: this.zoomLvlChart,
          symbol: this.NONE,
          color: this.COLOR[0],
          label: {
            // BEARBEITUNG: wenn du folgende 3 Zeilen einkommentierst, dann erscheint ein Rahmen um das gesamte Label
            //  Ist ganz hilfreich, wenn du versucht beide Labels zur einem Knotenarm auf eine Höhe zu bringen.
            // borderColor: '#aaa',
            // borderWidth: 1,
            // borderRadius: 1,
            rich: {
              // Neu
              divider: {
                lineHeight: 5,
                fontFamily: this.FONT_FAMILY,
                color: this.FONT_COLOR,
              },
              dividerLeft: {
                lineHeight: 30,
                fontSize: this.FONT_SIZE,
                fontFamily: this.FONT_FAMILY,
                color: this.FONT_COLOR,
                align: 'left',
                verticalAlign: 'top'
              },
              dividerRight: {
                lineHeight: 30,
                fontSize: this.FONT_SIZE,
                fontFamily: this.FONT_FAMILY,
                color: this.FONT_COLOR,
                align: 'right',
                verticalAlign: 'top'
              },
              streetRight: {
                fontSize: this.FONT_SIZE,
                fontFamily: this.FONT_FAMILY,
                color: this.FONT_COLOR,
                align: 'right',
              },
              streetLeft: {
                fontSize: this.FONT_SIZE,
                fontFamily: this.FONT_FAMILY,
                color: this.FONT_COLOR,
                align: 'left',
              },
              valueRight: {
                fontSize: this.FONT_SIZE,
                fontFamily: this.FONT_FAMILY,
                fontWeight: 'bold',
                color: this.FONT_COLOR,
                align: 'right',
              },
              valueLeft: {
                fontSize: this.FONT_SIZE,
                fontFamily: this.FONT_FAMILY,
                fontWeight: 'bold',
                color: this.FONT_COLOR,
                align: 'left',
              }
            }
          },
          silent: true,
          lineStyle: {
            opacity: 1,
          },
          data: [
            {
              name: 'Legende',
              x: 0,
              y: 0,
              symbol: 'dot',
              symbolSize: 0.001,
              label: {
                rich: {
                  valueBold: {
                    fontSize: this.FONT_SIZE,
                    fontFamily: this.FONT_FAMILY,
                    fontWeight: 'bold',
                    color: this.FONT_COLOR,
                    align: 'left',
                  },
                  value: {
                    fontSize: this.FONT_SIZE,
                    fontFamily: this.FONT_FAMILY,
                    color: this.FONT_COLOR,
                    align: 'left',
                  }
                },
                formatter: this.formatLegend(),
                show: true,
                position: this.calculatePositionLegend()
              }
            },
            /**
             * Node-Label
             * Als Node-Label wird die Kombination aus dem textuellen Label und dem Icon (Kreis mit Zahl innen) bezeichnet.
             * Die Zahl gibt dabei an, um welchen Knotenarm es sich handelt.
             */
            {
              name: 'NodeLabel1',
              x: this.XCOORD_DEFAULT_NODELABEL,
              y: this.YCOORD_DEFAULT_NODELABEL,
              symbol: this.getSymbolForDataLabel(0),
              symbolSize: this.calculateSymbolSizeForNode(),
              label: {
                formatter: this.formatLabelNode(0),
                show: this.visibleNodes[0],
                position: this.calculatePositionLabelNode(0),
                rotate: this.ROTATE_90
              }
            },
            {
              name: 'NodeLabel2',
              x: this.calculateXCoordNodeLabel(this.ANGLE_05_PI),
              y: this.calculateYCoordNodeLabel(this.ANGLE_05_PI),
              symbol: this.getSymbolForDataLabel(1),
              symbolSize: this.calculateSymbolSizeForNode(),
              label: {
                formatter: this.formatLabelNode(1),
                show: this.visibleNodes[1],
                position: this.calculatePositionLabelNode(1),
              },
            },
            {
              name: 'NodeLabel3',
              x: this.calculateXCoordNodeLabel(this.ANGLE_1_PI),
              y: this.calculateYCoordNodeLabel(this.ANGLE_1_PI),
              symbol: this.getSymbolForDataLabel(2),
              symbolSize: this.calculateSymbolSizeForNode(),
              label: {
                formatter: this.formatLabelNode(2),
                show: this.visibleNodes[2],
                position: this.calculatePositionLabelNode(2),
                rotate: this.ROTATE_90
              }
            },
            {
              name: 'NodeLabel4',
              x: this.calculateXCoordNodeLabel(this.ANGLE_15_PI),
              y: this.calculateYCoordNodeLabel(this.ANGLE_15_PI),
              symbol: this.getSymbolForDataLabel(3),
              symbolSize: this.calculateSymbolSizeForNode(),
              label: {
                formatter: this.formatLabelNode(3),
                show: this.visibleNodes[3],
                position: this.calculatePositionLabelNode(3),
              }
            },
            {
              name: 'NodeLabel5',
              x: this.calculateXCoordNodeLabel(this.ANGLE_025_PI),
              y: this.calculateYCoordNodeLabel(this.ANGLE_025_PI),
              symbol: this.getSymbolForDataLabel(4),
              symbolSize: this.calculateSymbolSizeForNode(),
              label: {
                formatter: this.formatLabelNode(4),
                show: this.visibleNodes[4],
                position: this.calculatePositionLabelNode(4),
                rotate: this.ROTATE_45
              }
            },
            {
              name: 'NodeLabel6',
              x: this.calculateXCoordNodeLabel(this.ANGLE_075_PI),
              y: this.calculateYCoordNodeLabel(this.ANGLE_075_PI),
              symbol: this.getSymbolForDataLabel(5),
              symbolSize: this.calculateSymbolSizeForNode(),
              label: {
                formatter: this.formatLabelNode(5),
                show: this.visibleNodes[5],
                position: this.calculatePositionLabelNode(5),
                rotate: -this.ROTATE_45,
              }
            },
            {
              name: 'NodeLabel7',
              x: this.calculateXCoordNodeLabel(this.ANGLE_125_PI),
              y: this.calculateYCoordNodeLabel(this.ANGLE_125_PI),
              symbol: this.getSymbolForDataLabel(6),
              symbolSize: this.calculateSymbolSizeForNode(),
              label: {
                formatter: this.formatLabelNode(6),
                show: this.visibleNodes[6],
                position: this.calculatePositionLabelNode(6),
                rotate: this.ROTATE_45
              }
            },
            {
              name: 'NodeLabel8',
              x: this.calculateXCoordNodeLabel(this.ANGLE_175_PI),
              y: this.calculateYCoordNodeLabel(this.ANGLE_175_PI),
              symbol: this.getSymbolForDataLabel(7),
              symbolSize: this.calculateSymbolSizeForNode(),
              label: {
                formatter: this.formatLabelNode(7),
                show: this.visibleNodes[7],
                position: this.calculatePositionLabelNode(7),
                rotate: -this.ROTATE_45
              }
            },

            /**
             * Triangles
             * Als Triange wird das Icon bezeichnet, welches die Ausfahrt eines Knotenarms überspannt.
             * Die Zahl gibt dabei an, um welchen Knotenarm es sich handelt.
             */
            {
              name: 'Triangle1',
              x: this.XCOORD_DEFAULT_TRIANGLE,
              y: this.YCOORD_DEFAULT_TRIANGLE,
              symbol: this.getSymbolForTriangle(0),
              symbolRotate: this.ROTATE_0,
              symbolSize: this.calculateSymbolSizeForTriangle(0),
              label: {
                formatter: this.formatLabelTriangle(0, true),
                show: this.visibleNodes[0],
                position: this.calculatePositionLabelTriangle(0),
                rotate: this.visibleNodes[this.previousNodeindex(0)] ? this.ROTATE_67_5 : this.ROTATE_45
              }
            },
            {
              name: 'Triangle2',
              x: this.calculateXCoordTriangle(this.ANGLE_05_PI),
              y: this.calculateYCoordTriangle(this.ANGLE_05_PI),
              symbol: this.getSymbolForTriangle(1),
              symbolRotate: this.ROTATE_270,
              symbolSize: this.calculateSymbolSizeForTriangle(1),
              label: {
                formatter: this.formatLabelTriangle(1, true),
                show: this.visibleNodes[1],
                position: this.calculatePositionLabelTriangle(1),
                rotate: this.visibleNodes[this.previousNodeindex(1)] ? -this.ROTATE_22_5 : -this.ROTATE_45
              }
            },
            {
              name: 'Triangle3',
              x: this.calculateXCoordTriangle(this.ANGLE_1_PI),
              y: this.calculateYCoordTriangle(this.ANGLE_1_PI),
              symbol: this.getSymbolForTriangle(2),
              symbolRotate: this.ROTATE_180,
              symbolSize: this.calculateSymbolSizeForTriangle(2),
              label: {
                formatter: this.formatLabelTriangle(2, false),
                show: this.visibleNodes[2],
                position: this.calculatePositionLabelTriangle(2),
                rotate: this.visibleNodes[this.previousNodeindex(2)] ? this.ROTATE_67_5 : this.ROTATE_45
              }
            },
            {
              name: 'Triangle4',
              x: this.calculateXCoordTriangle(this.ANGLE_15_PI),
              y: this.calculateYCoordTriangle(this.ANGLE_15_PI),
              symbol: this.getSymbolForTriangle(3),
              symbolRotate: this.ROTATE_90,
              symbolSize: this.calculateSymbolSizeForTriangle(3),
              label: {
                formatter: this.formatLabelTriangle(3, false),
                show: this.visibleNodes[3],
                position: this.calculatePositionLabelTriangle(3),
                rotate: this.visibleNodes[this.previousNodeindex(3)] ? -this.ROTATE_22_5 : -this.ROTATE_45
              }
            },
            {
              name: 'Triangle5',
              x: this.calculateXCoordTriangle(this.ANGLE_025_PI),
              y: this.calculateYCoordTriangle(this.ANGLE_025_PI),
              symbol: this.getSymbolForTriangle(4),
              symbolRotate: this.ROTATE_315,
              symbolSize: this.calculateSymbolSizeForTriangle(4),
              label: {
                formatter: this.formatLabelTriangle(4, true),
                show: this.visibleNodes[4],
                position: this.calculatePositionLabelTriangle(4),
                rotate: this.visibleNodes[this.previousNodeindex(4)] ? this.ROTATE_22_5 : this.ROTATE_0
              }
            },
            {
              name: 'Triangle6',
              x: this.calculateXCoordTriangle(this.ANGLE_075_PI),
              y: this.calculateYCoordTriangle(this.ANGLE_075_PI),
              symbol: this.getSymbolForTriangle(5),
              symbolRotate: this.ROTATE_225,
              symbolSize: this.calculateSymbolSizeForTriangle(5),
              label: {
                formatter: this.formatLabelTriangle(5, this.visibleNodes[this.previousNodeindex(5)]),
                show: this.visibleNodes[5],
                position: this.calculatePositionLabelTriangle(5),
                rotate: this.visibleNodes[this.previousNodeindex(5)] ? -this.ROTATE_67_5 : this.ROTATE_90
              }
            },
            {
              name: 'Triangle7',
              x: this.calculateXCoordTriangle(this.ANGLE_125_PI),
              y: this.calculateYCoordTriangle(this.ANGLE_125_PI),
              symbol: this.getSymbolForTriangle(6),
              symbolRotate: this.ROTATE_135,
              symbolSize: this.calculateSymbolSizeForTriangle(6),
              label: {
                formatter: this.formatLabelTriangle(6, false),
                show: this.visibleNodes[6],
                position: this.calculatePositionLabelTriangle(6),
                rotate: this.visibleNodes[this.previousNodeindex(6)] ? this.ROTATE_22_5 : this.ROTATE_0
              }
            },
            {
              name: 'Triangle8',
              x: this.calculateXCoordTriangle(this.ANGLE_175_PI),
              y: this.calculateYCoordTriangle(this.ANGLE_175_PI),
              symbol: this.getSymbolForTriangle(7),
              symbolRotate: this.ROTATE_45,
              symbolSize: this.calculateSymbolSizeForTriangle(7),
              label: {
                formatter: this.formatLabelTriangle(7, !this.visibleNodes[this.previousNodeindex(7)]),
                show: this.visibleNodes[7],
                position: this.calculatePositionLabelTriangle(7),
                rotate: this.visibleNodes[this.previousNodeindex(7)] ? -this.ROTATE_67_5 : this.ROTATE_90
              }
            },

            // 1
            {
              name: this.START_1S,
              x: this.XCOORD_DEFAULT,
              y: this.YCOORD_DEFAULT,
            },
            {
              name: this.ENDE_1S,
              x: this.XCOORD_DEFAULT,
              y: this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT,
            },
            {
              name: this.START_1T,
              x: -this.XCOORD_DEFAULT,
              y: this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT,
            },
            {
              name: this.ENDE_1T,
              x: -this.XCOORD_DEFAULT,
              y: this.YCOORD_DEFAULT,
            },

            // 2
            {
              name: this.START_2S,
              x: this.calculateXCoord(this.ANGLE_05_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_05_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },
            {
              name: this.ENDE_2S,
              x: this.calculateXCoord(this.ANGLE_05_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_05_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.START_2T,
              x: this.calculateXCoord(this.ANGLE_05_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_05_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.ENDE_2T,
              x: this.calculateXCoord(this.ANGLE_05_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_05_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },

            // Start und Ende 3
            {
              name: this.START_3S,
              x: this.calculateXCoord(this.ANGLE_1_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_1_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },
            {
              name: this.ENDE_3S,
              x: this.calculateXCoord(this.ANGLE_1_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_1_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.START_3T,
              x: this.calculateXCoord(this.ANGLE_1_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_1_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.ENDE_3T,
              x: this.calculateXCoord(this.ANGLE_1_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_1_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },

            // Start und Ende 4
            {
              name: this.START_4S,
              x: this.calculateXCoord(this.ANGLE_15_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_15_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },
            {
              name: this.ENDE_4S,
              x: this.calculateXCoord(this.ANGLE_15_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_15_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.START_4T,
              x: this.calculateXCoord(this.ANGLE_15_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_15_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.ENDE_4T,
              x: this.calculateXCoord(this.ANGLE_15_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_15_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },

            // Start und Ende 5
            {
              name: this.START_5S,
              x: this.calculateXCoord(this.ANGLE_025_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_025_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },
            {
              name: this.ENDE_5S,
              x: this.calculateXCoord(this.ANGLE_025_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_025_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.START_5T,
              x: this.calculateXCoord(this.ANGLE_025_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_025_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.ENDE_5T,
              x: this.calculateXCoord(this.ANGLE_025_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_025_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },

            // Start und Ende 6
            {
              name: this.START_6S,
              x: this.calculateXCoord(this.ANGLE_075_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_075_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },
            {
              name: this.ENDE_6S,
              x: this.calculateXCoord(this.ANGLE_075_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_075_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.START_6T,
              x: this.calculateXCoord(this.ANGLE_075_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_075_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.ENDE_6T,
              x: this.calculateXCoord(this.ANGLE_075_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_075_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },

            // Start und Ende 7
            {
              name: this.START_7S,
              x: this.calculateXCoord(this.ANGLE_125_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_125_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },
            {
              name: this.ENDE_7S,
              x: this.calculateXCoord(this.ANGLE_125_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_125_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.START_7T,
              x: this.calculateXCoord(this.ANGLE_125_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_125_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.ENDE_7T,
              x: this.calculateXCoord(this.ANGLE_125_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_125_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },

            // Start und Ende 8
            {
              name: this.START_8S,
              x: this.calculateXCoord(this.ANGLE_175_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_175_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },
            {
              name: this.ENDE_8S,
              x: this.calculateXCoord(this.ANGLE_175_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_175_PI, this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.START_8T,
              x: this.calculateXCoord(this.ANGLE_175_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_175_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT + this.STRAIGHT_DEFAULT),
            },
            {
              name: this.ENDE_8T,
              x: this.calculateXCoord(this.ANGLE_175_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_175_PI, -this.XCOORD_DEFAULT, this.YCOORD_DEFAULT),
            },

            // Kreis
            {
              name: this.KREIS_5_1,
              x: this.calculateXCoord(this.ANGLE_0125_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_0125_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
            },
            {
              name: this.KREIS_2_5,
              x: this.calculateXCoord(this.ANGLE_0375_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_0375_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
            },
            {
              name: this.KREIS_6_2,
              x: this.calculateXCoord(this.ANGLE_0625_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_0625_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
            },
            {
              name: this.KREIS_3_6,
              x: this.calculateXCoord(this.ANGLE_0875_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_0875_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
            },
            {
              name: this.KREIS_7_3,
              x: this.calculateXCoord(this.ANGLE_1125_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_1125_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
            },
            {
              name: this.KREIS_4_7,
              x: this.calculateXCoord(this.ANGLE_1375_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_1375_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
            },
            {
              name: this.KREIS_8_4,
              x: this.calculateXCoord(this.ANGLE_1625_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_1625_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
            },
            {
              name: this.KREIS_1_8,
              x: this.calculateXCoord(this.ANGLE_1875_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
              y: this.calculateYCoord(this.ANGLE_1875_PI, this.XCOORD_CIRCLE_DEFAULT, this.YCOORD_CIRCLE_DEFAULT),
            },
          ],
          edges: [
            // Einfahrend
            {
              source: this.START_1S,
              target: this.ENDE_1S,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[0][0]),
                color: this.COLOR[0],
              },
            },
            {
              source: this.ENDE_1S,
              target: this.KREIS_1_8,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[0][0]),
                color: this.COLOR[0],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_2S,
              target: this.ENDE_2S,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[1][0]),
                color: this.COLOR[1],
              },
            },
            {
              source: this.ENDE_2S,
              target: this.KREIS_2_5,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[1][0]),
                color: this.COLOR[1],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_3S,
              target: this.ENDE_3S,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[2][0]),
                color: this.COLOR[2],
              },
            },
            {
              source: this.ENDE_3S,
              target: this.KREIS_3_6,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[2][0]),
                color: this.COLOR[2],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_4S,
              target: this.ENDE_4S,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[3][0]),
                color: this.COLOR[3],
              },
            },
            {
              source: this.ENDE_4S,
              target: this.KREIS_4_7,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[3][0]),
                color: this.COLOR[3],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_5S,
              target: this.ENDE_5S,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[4][0]),
                color: this.COLOR[4],
              },
            },
            {
              source: this.ENDE_5S,
              target: this.KREIS_5_1,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[4][0]),
                color: this.COLOR[4],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_6S,
              target: this.ENDE_6S,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[5][0]),
                color: this.COLOR[5],
              },
            },
            {
              source: this.ENDE_6S,
              target: this.KREIS_6_2,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[5][0]),
                color: this.COLOR[5],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_7S,
              target: this.ENDE_7S,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[6][0]),
                color: this.COLOR[6],
              },
            },
            {
              source: this.ENDE_7S,
              target: this.KREIS_7_3,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[6][0]),
                color: this.COLOR[6],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_8S,
              target: this.ENDE_8S,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[7][0]),
                color: this.COLOR[7],
              },
            },
            {
              source: this.ENDE_8S,
              target: this.KREIS_8_4,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[7][0]),
                color: this.COLOR[7],
                curveness: this.CURVENESS_02
              },
            },

            // Ausfahrend
            {
              source: this.KREIS_5_1,
              target: this.START_1T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[0][2]),
                color: this.COLOR[0],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_1T,
              target: this.ENDE_1T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[0][2]),
                color: this.COLOR[0],
              },
            },
            {
              source: this.KREIS_6_2,
              target: this.START_2T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[1][2]),
                color: this.COLOR[1],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_2T,
              target: this.ENDE_2T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[1][2]),
                color: this.COLOR[1],
              },
            },
            {
              source: this.KREIS_7_3,
              target: this.START_3T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[2][2]),
                color: this.COLOR[2],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_3T,
              target: this.ENDE_3T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[2][2]),
                color: this.COLOR[2],
              },
            },
            {
              source: this.KREIS_8_4,
              target: this.START_4T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[3][2]),
                color: this.COLOR[3],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_4T,
              target: this.ENDE_4T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[3][2]),
                color: this.COLOR[3],
              },
            },
            {
              source: this.KREIS_2_5,
              target: this.START_5T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[4][2]),
                color: this.COLOR[4],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_5T,
              target: this.ENDE_5T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[4][2]),
                color: this.COLOR[4],
              },
            },
            {
              source: this.KREIS_3_6,
              target: this.START_6T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[5][2]),
                color: this.COLOR[5],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_6T,
              target: this.ENDE_6T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[5][2]),
                color: this.COLOR[5],
              },
            },
            {
              source: this.KREIS_4_7,
              target: this.START_7T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[6][2]),
                color: this.COLOR[6],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_7T,
              target: this.ENDE_7T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[6][2]),
                color: this.COLOR[6],
              },
            },
            {
              source: this.KREIS_1_8,
              target: this.START_8T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[7][2]),
                color: this.COLOR[7],
                curveness: this.CURVENESS_02
              },
            },
            {
              source: this.START_8T,
              target: this.ENDE_8T,
              lineStyle: {
                width: this.calculateLineWidth(this.getDataToShow()[7][2]),
                color: this.COLOR[7],
              },
            },

            // Kreis verbleibend
            // Vorbei an der 8
            {
              source: this.KREIS_1_8,
              target: this.KREIS_8_4,
              lineStyle: {
                width: this.calculateLineWidthVorbei(8),
                color: this.COLOR[8],
                curveness: -this.CURVENESS_02,
              },
            },
            // Vorbei an der 4
            {
              source: this.KREIS_8_4,
              target: this.KREIS_4_7,
              lineStyle: {
                width: this.calculateLineWidthVorbei(4),
                color: this.COLOR[8],
                curveness: -this.CURVENESS_02,
              },
            },
            // Vorbei an der 7
            {
              source: this.KREIS_4_7,
              target: this.KREIS_7_3,
              lineStyle: {
                width: this.calculateLineWidthVorbei(7),
                color: this.COLOR[8],
                curveness: -this.CURVENESS_02,
              },
            },
            // Vorbei an der 3
            {
              source: this.KREIS_7_3,
              target: this.KREIS_3_6,
              lineStyle: {
                width: this.calculateLineWidthVorbei(3),
                color: this.COLOR[8],
                curveness: -this.CURVENESS_02,
              },
            },
            // Vorbei an der 6
            {
              source: this.KREIS_3_6,
              target: this.KREIS_6_2,
              lineStyle: {
                width: this.calculateLineWidthVorbei(6),
                color: this.COLOR[8],
                curveness: -this.CURVENESS_02,
              },
            },
            // Vorbei an der 2
            {
              source: this.KREIS_6_2,
              target: this.KREIS_2_5,
              lineStyle: {
                width: this.calculateLineWidthVorbei(2),
                color: this.COLOR[8],
                curveness: -this.CURVENESS_02,
              },
            },
            // Vorbei an der 5
            {
              source: this.KREIS_2_5,
              target: this.KREIS_5_1,
              lineStyle: {
                width: this.calculateLineWidthVorbei(5),
                color: this.COLOR[8],
                curveness: -this.CURVENESS_02,
              },
            },
            // Vorbei an der 1
            {
              source: this.KREIS_5_1,
              target: this.KREIS_1_8,
              lineStyle: {
                width: this.calculateLineWidthVorbei(1),
                color: this.COLOR[8],
                curveness: -this.CURVENESS_02,
              },
            },
          ]
        }
      ]
    }
  }

  /** Damit nicht für jede Linie die maximale an Fahrzeugen über alle Fahrbeziehungen berechnet wird,
   * wird dieser Wert in der Variable this.maxNumberOfCars zwischengespeichert.
   * Wenn dort bereits ein Wert enthalten ist, wird dieser verwendet und nicht neu berechnet.
   */
  get maxNumberOfCarsForWidth() {
    return this.maxNumberOfCars > 0 ? this.maxNumberOfCars : this.calculateMaxNumberOfCars();
  }

  /** Zoomstufen für die einzelnen Bildschirmgrößen
   * XL ist Default und dementsprechend Faktor 1
   */
  get zoomLvlChart(): string {
    let zoomlvl: number = 1;
    switch (this.$vuetify.breakpoint.name) {
        // case "xs": break;
        // case "sm": break;
        // case "md": break;
      case "lg":
        zoomlvl = this.ZOOM_LVL_LG;
        break;
      case "xl":
        zoomlvl = this.ZOOM_LVL_XL;
        break;
    }
    return zoomlvl.toString();
  }

  get isFahrzeugkategorieSelected() {
    return this.selectedOptions.kraftfahrzeugverkehr || this.selectedOptions.schwerverkehr || this.selectedOptions.gueterverkehr || this.selectedOptions.radverkehr || this.selectedOptions.fussverkehr
  }

  /** Berechnet die maximale Anzahl an Fahrzeugen über alle Fahrbeziehungen und Zeitintervalle */
  private calculateMaxNumberOfCars() {
    let maxValue: number = 0;
    this.getDataToShow().forEach((mm: number[]) => {
      mm.forEach(m => {
        m > maxValue ? maxValue = m : null;
      })
    });
    this.maxNumberOfCars = maxValue;
    return maxValue;
  }

  /** Berechnet die Breite der einzelnen Linien anhand der maximalen Anzahl der Autos für Vorbeifahrende Autos*/
  private calculateLineWidthVorbei(node: number): number {
    let nodeIndex = node - 1;
    let numberOfCars = this.getDataToShow()[nodeIndex][1];
    // Wenn ein Knoten nicht exisitiert, wird die Summe aus dem letzen Vorbei-Knoten und der letzten Einfahrt berechnet
    let counter: number = 0;
    while (numberOfCars === 0 && nodeIndex >= 0 && counter < 8) {
      nodeIndex = this.previousNodeindex(nodeIndex);
      numberOfCars = this.getDataToShow()[nodeIndex][1] + this.getDataToShow()[nodeIndex][0];
      counter++;
    }
    return this.calculateLineWidth(numberOfCars);
  }

  /** Berechnet die Breite der einzelnen Linien anhand der maximalen Anzahl der Autos */
  private calculateLineWidth(cars: number): number {
    let step = this.maxNumberOfCarsForWidth / 5;
    let lineWidth: number = 0;
    // BEARBEITUNG: wenn du alle Linien sehen willst, einfach folgende Zeile einkommentieren
    // Das löst allerdings Warnung in Typescript/eslint aus (unreachable/unused Code)
    // return 5;

    if (cars === 0) {
      return 0;
    }

    if (cars < step) {
      lineWidth = 5;
    } else if (cars < step * 2) {
      lineWidth = 8;
    } else if (cars < step * 3) {
      lineWidth = 11;
    } else if (cars < step * 4) {
      lineWidth = 15;
    } else {
      lineWidth = 20;
    }
    return lineWidth;
  }

  /** Liefert den Knotenarmindex des Vorgängers im Kreis */
  private previousNodeindex(nodeIndex: number) {
    let previousIndex: number = -1;
    switch (nodeIndex) {
      case 0:
        previousIndex = 4;
        break;
      case 1:
        previousIndex = 5;
        break;
      case 2:
        previousIndex = 6;
        break;
      case 3:
        previousIndex = 7;
        break;
      case 4:
        previousIndex = 1;
        break;
      case 5:
        previousIndex = 2;
        break;
      case 6:
        previousIndex = 3;
        break;
      case 7:
        previousIndex = 0;
        break;
    }
    return previousIndex;
  }

  /**
   * Damit die Anzahl der Fahrzeuge rechtsbündig untereinander steht, werden pro fehlende Ziffer
   * zwei Leerzeichen vorne angehängt
   */
  private padStringAtStart(stringToPad: string, maxLength: number) {
    let paddedString: string = stringToPad;
    for (let actualLength = stringToPad.length; actualLength < maxLength; actualLength++) {
      paddedString = this.BlANK + paddedString;
    }
    return paddedString
  }

  /** Erzeugt eine Leerzeile mit maximalen Zeichenlänge (pro Zeichen 2 Leerzeichen) */
  private getMaxEmptyLine(maxLength: number): string {
    let emptyLine: string = ``;
    for (let index = 0; index < maxLength; index++) {
      emptyLine += this.BlANK;
    }
    return emptyLine;
  }

  /**
   * Berechnet x' anhand der Drehmatrix
   *
   * x'= x * cos(α) - y * sin(α)
   *
   * @param winkel Winkel um den gedreht werden soll
   * @param xCoord X-Ausgangskoordinate
   * @param yCoord Y-Ausgangskoordinate
   */
  private calculateXCoord(winkel: number, xCoord: number, yCoord: number) {
    return xCoord * Math.cos(winkel) - yCoord * Math.sin(winkel);
  }

  /**
   * Berechnet y' anhand der Drehmatrix
   *
   * y'= x * sin(α) + y * cos(α)
   *
   * @param winkel Winkel um den gedreht werden soll
   * @param xCoord X-Ausgangskoordinate
   * @param yCoord Y-Ausgangskoordinate
   */
  private calculateYCoord(winkel: number, xCoord: number, yCoord: number) {
    return xCoord * Math.sin(winkel) + yCoord * Math.cos(winkel);
  }

  /** Getter liefert anhand des Optionsmenüs die Daten
   * der ausgewählten Fahrzeugkategorie zurück.
   */
  private getDataToShow() {
    if (this.data.value1.filled && !this.data.value1.label.endsWith('%')) {
      return this.data.value1.values;
    }
    if (this.data.value2.filled && !this.data.value2.label.endsWith('%')) {
      return this.data.value2.values;
    }
    if (this.data.value3.filled && !this.data.value3.label.endsWith('%')) {
      return this.data.value3.values;
    }
    // mit 0 gefülltes Array zurückgeben
    let emptyArray: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];
    return [emptyArray, emptyArray, emptyArray, emptyArray, emptyArray, emptyArray, emptyArray, emptyArray];
  }

  // Alle Methoden für die Triangles
  private getSymbolForTriangle(index: number) {
    // Wird nur angezeigt, wenn der Knoten vorhanden ist und auch Daten vorliegen (herausfahrende Fahrzeuge)
    // return (this.visibleNodes[index] && this.getDataToShow()[index][2]) ? this.TRIANGLE : this.NONE;
    return (this.visibleNodes[index]) ? this.TRIANGLE : this.NONE;
  }

  private calculateSymbolSizeForTriangle(nodeIndex: number) {
    if (this.fahrzeugkategorieSelected) {
      // Ist ein kleiner Hack, da die Labels nur mit Symbol gezeichnet werden können.
      // Wenn keine Daten (herausfahrende Fahrzeuge) vorliegen, wird einfach das Symbol geschrumpft, damit das Label da bleibt
      return (this.visibleNodes[nodeIndex] && this.getDataToShow()[nodeIndex][2]) ? this.TRIANGLE_SYMBOL_SIZE : 0.001;
    } else {
      return 0;
    }
  }

  /** Methode, um die Labels passend zu formatieren.
   *
   * @param node Index des aktuellen Knotens zur Datenberechnung
   * @param alignLeft rechts oder linksbündiger Text
   */
  private formatLabelTriangle(node: number, alignLeft: boolean) {
    let text: string = '';

    if (this.data.value1.filled) {
      // Textbausteine mit Daten befüllen
      text += this.getTextPartLabelTriangle(this.data.value1.sumIn, this.previousNodeindex(node), this.data.value1.percent);
    }
    if (this.data.value2.filled) {
      // Textbausteine mit Daten befüllen
      text += this.getTextPartLabelTriangle(this.data.value2.sumIn, this.previousNodeindex(node), this.data.value2.percent);
    }
    if (this.data.value3.filled) {
      // Textbausteine mit Daten befüllen
      text += this.getTextPartLabelTriangle(this.data.value3.sumIn, this.previousNodeindex(node), this.data.value3.percent);
    }

    text = text.trim();

    const emptyLine = `${this.getMaxEmptyLine(this.MAX_LABEL_LENGTH)}`;

    if (alignLeft) {
      if (this.$vuetify.breakpoint.name === 'lg') {
        return `{dividerLeft|____}{valueLeft| ${text}}\n{dividerLeft|${emptyLine}}`;
      } else {
        return `{dividerLeft|_____}{valueLeft| ${text}}\n{dividerLeft|${emptyLine}}`;
      }
    } else {
      if (this.$vuetify.breakpoint.name === 'lg') {
        return `{valueRight|${text} }{dividerRight|____}\n{dividerRight|${emptyLine}}`;
      } else {
        return `{valueRight|${text} }{dividerRight|_____}\n{dividerRight|${emptyLine}}`;
      }
    }
  }

  /** Baut die Textzeile zusammen */
  private getTextPartLabelTriangle(data: number[], nodeIndex: number, percent: boolean): string {
    // Summe aus dem letzen Vorbei-Knoten und der letzten Einfahrt
    let street = this.data.streets[nodeIndex];
    let counter: number = 0;
    while ((street === undefined || street === null || street.trim() === "") && counter < 8) {
      nodeIndex = this.previousNodeindex(nodeIndex);
      street = this.data.streets[nodeIndex];
      counter++;
    }
    if (percent) {
      return `${this.padStringAtStart(`${data[nodeIndex]}%`, 7)}`;
    } else {
      return `${this.padStringAtStart(data[nodeIndex].toString(), 7)}`;
    }

  }

  /** Methode zum Berechnen der Pixelverschiebung für die Labels bei den Dreiecken
   * für die unterschiedlichen Bildschirmgrößen.
   * Default sind die Konstanten, weicht der Wert ab, wird dieser extra angegeben
   */
  private zoomLvlTriangleLabel(nodeIndex: number): Array<number> {
    let zoomlvl: Array<number> = [1, 1, 1, 1];
    if (this.existsTriangle(nodeIndex)) {
      switch (this.$vuetify.breakpoint.name) {
          // case "xs": break;
          // case "sm": break;
          // case "md": break;
        case "lg": {
          // Alle auf der linken Seite mit Text-Align right
          switch (nodeIndex) {
            case 2: // [X,X,X,X]
              zoomlvl = [0.96, 3.3, 1, 1.27];
              break;
            case 3: // [X,X,X,X]
              zoomlvl = [-19, 0.97, 1.32, 1];
              break;
            case 5: // [X,X,X,X]
              zoomlvl = [this.ZOOM_LVL_LG, 1.07, 0.74, 0.77];
              break;
            case 6: // [X,X,X,X]
              zoomlvl = [1.11, this.ZOOM_LVL_LG, 1.15, -1.2];
              break;
            case 7: // [X,X,X,X]
              zoomlvl = [this.ZOOM_LVL_LG, this.ZOOM_LVL_LG, 0.44, 1.14];
              break;
            default:
              zoomlvl = [this.ZOOM_LVL_LG, this.ZOOM_LVL_LG, this.ZOOM_LVL_LG, this.ZOOM_LVL_LG];
              break;
          }
          break;
        }
        case "xl":
          zoomlvl = [this.ZOOM_LVL_XL, this.ZOOM_LVL_XL, this.ZOOM_LVL_XL, this.ZOOM_LVL_XL];
          break;
      }
    } else {
      switch (this.$vuetify.breakpoint.name) {
          // case "xs": break;
          // case "sm": break;
          // case "md": break;
        case "lg": {
          // Alle auf der linken Seite mit Text-Align right
          switch (nodeIndex) {
            case 2: // [X,X,X,X]
              zoomlvl = [0.96, 4.6, 0.97, 1.33];
              break;
            case 3: // [X,X,X,X]
              zoomlvl = [9, 0.95, 1.28, 0.98];
              break;
            case 5: // [X,X,X,X]
              zoomlvl = [this.ZOOM_LVL_LG, 1.08, 0.74, 0.77];
              break;
            case 6: // [X,X,X,X]
              zoomlvl = [1.08, this.ZOOM_LVL_LG, 1.11, 0.2];
              break;
            case 7: // [X,X,X,X]
              zoomlvl = [this.ZOOM_LVL_LG, this.ZOOM_LVL_LG, 0.1, 1.12];
              break;
            default:
              zoomlvl = [this.ZOOM_LVL_LG, this.ZOOM_LVL_LG, this.ZOOM_LVL_LG, this.ZOOM_LVL_LG];
              break;
          }
          break;
        }
        case "xl":
          zoomlvl = [this.ZOOM_LVL_XL, this.ZOOM_LVL_XL, this.ZOOM_LVL_XL, this.ZOOM_LVL_XL];
          break;
      }
    }

    return zoomlvl;
  }

  /** Liefert die Position [x, y] des Labels pro Knotenarm
   * Hier ist die Besonderheit, dass die Labels an verschiedenen Stellen sein können.
   * Existiert der vorangegangene Knotenarm, muss das Label an eine andere Position.
   * Die x- & y-Koordinaten werden dabei immer mit dem entsprechenden Zoomfaktor multipliziert
   */
  private calculatePositionLabelTriangle(node: number): Array<number> {
    let position: Array<number> = [0, 0];
    if (this.existsTriangle(node)) {
      switch (node) {
        case 0: {
          let zoomlvl1: Array<number> = this.zoomLvlTriangleLabel(0);
          position = [67 * zoomlvl1[0], 186 * zoomlvl1[1]]; // Dreiecke da, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [25 * zoomlvl1[2], 165 * zoomlvl1[3]]; // Dreiecke da, xl & lg
          }
          break;
        }
        case 1: {
          let zoomlvl2: Array<number> = this.zoomLvlTriangleLabel(1);
          position = [-171 * zoomlvl2[0], 67 * zoomlvl2[1]]; // Dreiecke da, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [-150 * zoomlvl2[2], 25 * zoomlvl2[3]]; // Dreiecke da, xl & lg
          }
          break;
        }
        case 2: {
          let zoomlvl3: Array<number> = this.zoomLvlTriangleLabel(2);
          position = [-255 * zoomlvl3[0], 15 * zoomlvl3[1]]; // Dreiecke da, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [-125 * zoomlvl3[2], 110 * zoomlvl3[3]]; // Dreiecke da, xl & lg
          }
          break;
        }
        case 3: {
          let zoomlvl4: Array<number> = this.zoomLvlTriangleLabel(3);
          position = [2 * zoomlvl4[0], -255 * zoomlvl4[1]]; // Dreiecke da, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [-95 * zoomlvl4[2], -125 * zoomlvl4[3]]; // Dreiecke da, xl & lg
          }
          break;
        }
        case 4: {
          let zoomlvl5: Array<number> = this.zoomLvlTriangleLabel(4);
          position = [-75 * zoomlvl5[0], 180 * zoomlvl5[1]]; // Dreiecke da, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            // zwischen 5 und 2
            position = [-85 * zoomlvl5[2], 135 * zoomlvl5[3]]; // Dreiecke da, xl & lg
          }
          break;
        }
        case 5: {
          let zoomlvl6: Array<number> = this.zoomLvlTriangleLabel(5);
          position = [-168 * zoomlvl6[0], 218 * zoomlvl6[1]]; // Dreiecke da, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [-100 * zoomlvl6[2], -90 * zoomlvl6[3]]; // Dreiecke da, xl & lg
          }
          break;
        }
        case 6: {
          let zoomlvl7: Array<number> = this.zoomLvlTriangleLabel(6);
          position = [-180 * zoomlvl7[0], -168 * zoomlvl7[1]]; // Dreiecke da, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [-155 * zoomlvl7[2], -10 * zoomlvl7[3]]; // Dreiecke da, xl & lg
          }
          break;
        }
        case 7: {
          let zoomlvl8: Array<number> = this.zoomLvlTriangleLabel(7);
          position = [180 * zoomlvl8[0], 112 * zoomlvl8[1]]; // Dreiecke da, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [50 * zoomlvl8[2], -155 * zoomlvl8[3]]; // Dreiecke da, xl & lg
          }
          break;
        }
      }
    } else {
      switch (node) {
        case 0: {
          let zoomlvl1: Array<number> = this.zoomLvlTriangleLabel(0);
          position = [45 * zoomlvl1[0], 180 * zoomlvl1[1]]; // Dreieck weg xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [6 * zoomlvl1[2], 157 * zoomlvl1[3]]; // Dreiecke weg, xl & lg
          }
          break;
        }
        case 1: {
          let zoomlvl2: Array<number> = this.zoomLvlTriangleLabel(1);
          position = [-180 * zoomlvl2[0], 45 * zoomlvl2[1]]; // Dreieck weg xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [-159 * zoomlvl2[2], 6 * zoomlvl2[3]]; // Dreiecke weg, xl & lg
          }
          break;
        }
        case 2: {
          let zoomlvl3: Array<number> = this.zoomLvlTriangleLabel(2);
          position = [-274 * zoomlvl3[0], 9 * zoomlvl3[1]]; // Dreieck weg, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [-144 * zoomlvl3[2], 101 * zoomlvl3[3]];//  // Dreiecke weg, xl & lg
          }
          break;
        }
        case 3: {
          let zoomlvl4: Array<number> = this.zoomLvlTriangleLabel(3);
          position = [-5 * zoomlvl4[0], -275 * zoomlvl4[1]]; // Dreieck weg, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [-104 * zoomlvl4[2], -144 * zoomlvl4[3]]; // Dreiecke weg, xl & lg
          }
          break;
        }
        case 4: {
          let zoomlvl5: Array<number> = this.zoomLvlTriangleLabel(4);
          position = [-92 * zoomlvl5[0], 160 * zoomlvl5[1]]; // Dreieck weg, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [-104 * zoomlvl5[2], 116 * zoomlvl5[3]]; // Dreiecke weg, xl & lg
          }
          break;
        }
        case 5: {
          let zoomlvl6: Array<number> = this.zoomLvlTriangleLabel(5);
          position = [-190 * zoomlvl6[0], 200 * zoomlvl6[1]]; // Dreieck weg, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [-119 * zoomlvl6[2], -109 * zoomlvl6[3]]; // Dreiecke weg, xl & lg
          }
          break;
        }
        case 6: {
          let zoomlvl7: Array<number> = this.zoomLvlTriangleLabel(6);
          position = [-200 * zoomlvl7[0], -190 * zoomlvl7[1]]; // Dreieck weg, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [-174 * zoomlvl7[2], -29 * zoomlvl7[3]]; // Dreiecke weg, xl & lg
          }
          break;
        }
        case 7: {
          let zoomlvl8: Array<number> = this.zoomLvlTriangleLabel(7);
          position = [160 * zoomlvl8[0], 92 * zoomlvl8[1]]; // Dreieck weg, xl & lg
          if (this.visibleNodes[this.previousNodeindex(node)]) {
            position = [31 * zoomlvl8[2], -174 * zoomlvl8[3]]; // Dreiecke weg, xl & lg
          }
          break;
        }
      }
    }
    return position;
  }

  private calculateXCoordTriangle(winkel: number) {
    return this.calculateXCoord(winkel, this.XCOORD_DEFAULT_TRIANGLE, this.YCOORD_DEFAULT_TRIANGLE);
  }

  private calculateYCoordTriangle(winkel: number) {
    return this.calculateYCoord(winkel, this.XCOORD_DEFAULT_TRIANGLE, this.YCOORD_DEFAULT_TRIANGLE);
  }

  private existsTriangle(nodeIndex: number): boolean {
    return this.calculateSymbolSizeForTriangle(nodeIndex) === this.TRIANGLE_SYMBOL_SIZE;
  }

  // Alle Methoden für die Nodes
  /** Liefert anhand des Knotenarmindex (Knotenarmnummer -1) das passende Icon (Kreis mit Knotenarmnummer) */
  private getSymbolForDataLabel(index: number) {
    if (this.visibleNodes[index]) {
      switch (index) {
        case 0:
          return this.NODE_ICON_1;
        case 1:
          return this.NODE_ICON_2;
        case 2:
          return this.NODE_ICON_3;
        case 3:
          return this.NODE_ICON_4;
        case 4:
          return this.NODE_ICON_5;
        case 5:
          return this.NODE_ICON_6;
        case 6:
          return this.NODE_ICON_7;
        case 7:
          return this.NODE_ICON_8;
        default:
          return this.NONE;
      }
    } else {
      return this.NONE;
    }
  }

  private calculateSymbolSizeForNode() {
    if (this.fahrzeugkategorieSelected) {
      return this.NODE_SYMBOL_SIZE;
    } else {
      return 0;
    }
  }

  /** Formatiert das Label am Kreis passend für den Knotenarm */
  private formatLabelNode(node: number) {
    let lineRein: string = '';
    let lineCombined: string = '';
    let lineRaus: string = '';

    let dataAvailableRein: boolean = false;
    let dataAvailableRaus: boolean = false;
    if (this.data.value1.filled) {
      // Textbausteine mit Daten befüllen
      let kreisReinKfz: number = this.data.value1.values[node][0];
      let kreisRausKfz: number = this.data.value1.values[node][2];
      let combinedKfz: number = parseFloat((this.data.value1.sum[node]).toFixed(1));
      dataAvailableRein = dataAvailableRein || kreisReinKfz > 0;
      dataAvailableRaus = dataAvailableRaus || kreisRausKfz > 0;
      lineRein += `${this.padStringAtStart(kreisReinKfz.toString(), this.MAX_CARS_LENGTH)}`;
      lineCombined += `${this.padStringAtStart(combinedKfz.toString(), this.MAX_CARS_LENGTH)}`;
      lineRaus += `${this.padStringAtStart(kreisRausKfz.toString(), this.MAX_CARS_LENGTH)}`;
    }
    if (this.data.value2.filled) {
      // Textbausteine mit Daten befüllen
      let kreisReinSv: number = this.data.value2.values[node][0];
      let kreisRausSv: number = this.data.value2.values[node][2];
      let combinedSv: number = parseFloat((this.data.value2.sum[node]).toFixed(1));
      dataAvailableRein = dataAvailableRein || kreisReinSv > 0;
      dataAvailableRaus = dataAvailableRaus || kreisRausSv > 0;
      if (this.data.value2.percent) {
        lineRein += `${this.padStringAtStart(kreisReinSv.toString() + '%', this.MAX_CARS_LENGTH)}`;
        lineCombined += `${this.padStringAtStart(combinedSv.toString() + '%', this.MAX_CARS_LENGTH)}`;
        lineRaus += `${this.padStringAtStart(kreisRausSv.toString() + '%', this.MAX_CARS_LENGTH)}`;
      } else {
        lineRein += `${this.padStringAtStart(kreisReinSv.toString(), this.MAX_CARS_LENGTH)}`;
        lineCombined += `${this.padStringAtStart(combinedSv.toString(), this.MAX_CARS_LENGTH)}`;
        lineRaus += `${this.padStringAtStart(kreisRausSv.toString(), this.MAX_CARS_LENGTH)}`;
      }

    }
    if (this.data.value3.filled) {
      // Textbausteine mit Daten befüllen
      let kreisReinGv: number = this.data.value3.values[node][0];
      let kreisRausGv: number = this.data.value3.values[node][2];
      let combinedGv: number = parseFloat((this.data.value3.sum[node]).toFixed(1));
      dataAvailableRein = dataAvailableRein || kreisReinGv > 0;
      dataAvailableRaus = dataAvailableRaus || kreisRausGv > 0;
      if (this.data.value3.percent) {
        lineRein += `${this.padStringAtStart(kreisReinGv.toString() + '%', this.MAX_CARS_LENGTH)}`;
        lineCombined += `${this.padStringAtStart(combinedGv.toString() + '%', this.MAX_CARS_LENGTH)}`;
        lineRaus += `${this.padStringAtStart(kreisRausGv.toString() + '%', this.MAX_CARS_LENGTH)}`;
      } else {
        lineRein += `${this.padStringAtStart(kreisReinGv.toString(), this.MAX_CARS_LENGTH)}`;
        lineCombined += `${this.padStringAtStart(combinedGv.toString(), this.MAX_CARS_LENGTH)}`;
        lineRaus += `${this.padStringAtStart(kreisRausGv.toString(), this.MAX_CARS_LENGTH)}`;
      }
    }

    // Summe aus Rein und Raus, muss immer am größten sein
    let maxLineLength = lineCombined.trim().length;
    lineRein = `${this.padStringAtStart(lineRein.trim(), maxLineLength)}`;
    lineCombined = `${this.padStringAtStart(lineCombined.trim(), maxLineLength)}`;
    lineRaus = `${this.padStringAtStart(lineRaus.trim(), maxLineLength)}`;

    // Wenn keine Daten vorhanden sind, dann darf die Zeile nicht angezeigt werden
    if (!dataAvailableRein) {
      lineRein = '';
    }
    if (!dataAvailableRein && !dataAvailableRaus) {
      lineCombined = ''
    }
    if (!dataAvailableRaus) {
      lineRaus = ''
    }

    // Achtung Node ist ein Index
    // Wenn raus === 0 , dann Leerzeichen schreiben
    // Wenn rein === 0 , dann Leerzeichen schreiben
    if (node === 2 || node === 3 || node === 6 || node === 7) {
      return `{valueRight|${lineRaus}}\n\n`
          + `{streetRight|${this.streets[node]}}`
          + `{divider|\n}`
          + `{valueRight|${lineCombined}}\n\n`
          + `{valueRight|${lineRein}}\n`
          + `{streetRight|${this.getMaxEmptyLine(this.MAX_STREET_LENGTH)}}`
          ;
    } else {
      return `{valueLeft|${lineRein}}\n\n`
          + `{streetLeft|${this.streets[node]}}`
          + `{divider|\n}`
          + `{valueLeft|${lineCombined}}\n\n`
          + `{valueLeft|${lineRaus}}\n`
          + `{streetLeft|${this.getMaxEmptyLine(this.MAX_STREET_LENGTH)}}`
          ;
    }
  }

  /** Methode zum Berechnen der Pixelverschiebung für die Labels bei den Kreisen mit Nummern
   * für die unterschiedlichen Bildschirmgrößen.
   * Default sind die Konstanten, weicht der Wert ab, wird dieser extra angegeben
   */
  private zoomLvlNodeLabel(nodeIndex: number): number {
    let zoomlvl: number = 1;
    switch (this.$vuetify.breakpoint.name) {
        // case "xs": break;
        // case "sm": break;
        // case "md": break;
      case "lg": {
        zoomlvl = this.ZOOM_LVL_LG;
        // Alle auf der linken Seite mit Text-Align right
        if (nodeIndex === 2 || nodeIndex === 3 || nodeIndex === 6 || nodeIndex === 7) {
          zoomlvl = 0.97;
        }
        break;
      }
      case "xl":
        zoomlvl = this.ZOOM_LVL_XL;
        break;
    }
    return zoomlvl;
  }

  /** Liefert die Position [x, y] des Labels pro Knotenarm
   * Die x- & y-Koordinaten werden dabei immer mit dem entsprechenden Zoomfaktor multipliziert
   */
  private calculatePositionLabelNode(node: number): Array<number> {
    let position: Array<number> = [0, 0];
    switch (node) {
      case 0:
        position = [-31 * this.zoomLvlNodeLabel(0), -55 * this.zoomLvlNodeLabel(0)];
        break;
      case 1:
        position = [75 * this.zoomLvlNodeLabel(1), -30 * this.zoomLvlNodeLabel(1)];
        break;
      case 2:
        position = [-30 * this.zoomLvlNodeLabel(2), 365 * this.zoomLvlNodeLabel(2)];
        break;
      case 3:
        position = [-345 * this.zoomLvlNodeLabel(3), -30 * this.zoomLvlNodeLabel(3)];
        break;
      case 4:
        position = [24 * this.zoomLvlNodeLabel(4), -60 * this.zoomLvlNodeLabel(4)];
        break;
      case 5:
        position = [88 * this.zoomLvlNodeLabel(5), 28 * this.zoomLvlNodeLabel(5)];
        break;
      case 6:
        position = [-270 * this.zoomLvlNodeLabel(6), 232 * this.zoomLvlNodeLabel(6)];
        break;
      case 7:
        position = [-212 * this.zoomLvlNodeLabel(7), -272 * this.zoomLvlNodeLabel(7)];
        break;
    }
    return position;
  }

  private calculateXCoordNodeLabel(winkel: number) {
    return this.calculateXCoord(winkel, this.XCOORD_DEFAULT_NODELABEL, this.YCOORD_DEFAULT_NODELABEL);
  }

  private calculateYCoordNodeLabel(winkel: number) {
    return this.calculateYCoord(winkel, this.XCOORD_DEFAULT_NODELABEL, this.YCOORD_DEFAULT_NODELABEL);
  }

  // Legende
  private formatLegend() {
    let selectedValues: string = '';
    let explanationToDisplay: string = '';
    if (this.selectedOptions.kraftfahrzeugverkehr) {
      // selectedValues += 'KFZ ';
      explanationToDisplay += `{value|KFZ = Pkw + Lkw + Lz + Bus + Krad}\n`;
    }
    if (this.selectedOptions.schwerverkehr) {
      // selectedValues += 'SV ';
      explanationToDisplay += `{value|SV = Lkw + Lz + Bus}\n`;
    }
    if (this.selectedOptions.gueterverkehr) {
      // selectedValues += 'GV ';
      explanationToDisplay += `{value|GV = Lkw + Lz}`;
    }

    if (this.data.value1.filled) {
      selectedValues += `${this.data.value1.label} `;
    }
    if (this.data.value2.filled) {
      selectedValues += `${this.data.value2.label} `;
    }
    if (this.data.value3.filled) {
      selectedValues += `${this.data.value3.label} `;
    }

    return `{valueBold|${selectedValues.trim()}}\n\n`
        + explanationToDisplay
        ;
  }

  private calculatePositionLegend() {
    let position: Array<number> = [-445, -450];
    switch (this.$vuetify.breakpoint.name) {
        // case "xs": break;
        // case "sm": break;
        // case "md": break;
      case "lg":
        position = [-445, -450];
        break;
      case "xl":
        position = [-650, -450];
        break;
    }
    return position;
  }
}
</script>