<template>
    <v-chart
        ref="chart"
        :style="belastungsplanHeightAndWidth"
        :option="optionsBelastunsplan"
        autoresize
    />
</template>

<script setup lang="ts">
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GraphChart } from "echarts/charts";
import {
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { computed, ComputedRef, provide, ref, watch } from "vue";
import { useVuetify } from "@/util/useVuetify";
import { useSnackbarStore } from "@/store/snackbar";
import { useZaehlstelleStore } from "@/store/zaehlstelle";

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

use([
    CanvasRenderer,
    GraphChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
]);

/** Konstante für die Farben des Kreisverkehrs
 * [Knotenarm 1, Knotenarm 2, Knotenarm 3, Knotenarm 4, Knotenarm 5, Knotenarm 6, Knotenarm 7, Knotenarm 8, Kreisbahn]
 * * ['black', 'red', 'green', 'blue', 'lime', 'purple', 'orange', 'brown', 'gray darken-2'] als MaterialDesignColors
 */
// const COLOR: Array<string> = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
const COLOR: Array<string> = [
    "#000000",
    "#F44336",
    "#4CAF50",
    "#2196F3",
    "#CDDC39",
    "#9C27B0",
    "#FF9800",
    "#795548",
    "#9E9E9E",
];

/** Maximale Länge eines Straßennamens */
const MAX_STREET_LENGTH = 35;

/** Maximale Anzahl an Fahrzeugen 1.000.000 */
const MAX_CARS_LENGTH = 7;

/** Maximale Länge des ein- & ausfahrenden Verkehrs */
const MAX_LABEL_LENGTH = 35;

/** Konstante für das Keyword 'none'  */
const NONE = "none";

/** Konstante für zwei Leerzeichen '  '  */
const BlANK = "  ";

/** Konstanten für die unterschiedlichen Stärken der Biegungen */
const CURVENESS_02 = 0.2;

/** Konstanten für die Position des Knoten-Labels (Kreis mit der Zahl innen) von Knoten 1*/
const XCOORD_DEFAULT_NODELABEL = 0;
const YCOORD_DEFAULT_NODELABEL = -425;

/** Konstanten für die Position der Dreiecke bei der Ausfahrt von Knoten 1 */
const XCOORD_DEFAULT_TRIANGLE = 50;
const YCOORD_DEFAULT_TRIANGLE = -510;

/** Konstanten für die Position der Einfahrt von Knoten 1 */
const XCOORD_DEFAULT = -50;
const YCOORD_DEFAULT = -475;

/** Konstanten für die Position der Kreisbahn */
const XCOORD_CIRCLE_DEFAULT = 0;
const YCOORD_CIRCLE_DEFAULT = -225;

/** Laenge der geraden Strecke */
const STRAIGHT_DEFAULT = 150;

/** Konstanten für die Winkel der Drehmatrix */
const ANGLE_0125_PI = 0.125 * Math.PI;
const ANGLE_025_PI = 0.25 * Math.PI;
const ANGLE_0375_PI = 0.375 * Math.PI;
const ANGLE_05_PI = 0.5 * Math.PI;
const ANGLE_0625_PI = 0.625 * Math.PI;
const ANGLE_075_PI = 0.75 * Math.PI;
const ANGLE_0875_PI = 0.875 * Math.PI;
const ANGLE_1_PI = Math.PI;
const ANGLE_1125_PI = 1.125 * Math.PI;
const ANGLE_125_PI = 1.25 * Math.PI;
const ANGLE_1375_PI = 1.375 * Math.PI;
const ANGLE_15_PI = 1.5 * Math.PI;
const ANGLE_1625_PI = 1.625 * Math.PI;
const ANGLE_175_PI = 1.75 * Math.PI;
const ANGLE_1875_PI = 1.875 * Math.PI;

/** Konstanten für Winkel bei Rotate der Labels.
 * PI ist leider nicht möglich, daher als Zahl
 */
const ROTATE_0 = 0;
const ROTATE_22_5 = 22.5;
const ROTATE_45 = 45;
const ROTATE_67_5 = 67.5;
const ROTATE_90 = 90;
const ROTATE_135 = 135;
const ROTATE_180 = 180;
const ROTATE_225 = 225;
const ROTATE_270 = 270;
const ROTATE_315 = 315;

/** SVG-Path für das Dreick bei der Ausfahrt */
const TRIANGLE = "path://M12,2L1,21H23M12,6L19.53,19H4.47";
/** Triangle Symbol Size */
const TRIANGLE_SYMBOL_SIZE: Array<number> = [37.5, 15];

/** SVG-Path für die Icons der einzelnen Knotenarme (Kreis mit Zahl in der Mitte) */
const NODE_ICON_1 =
    "path://M10,7H14V17H12V9H10V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z";
const NODE_ICON_2 =
    "path://M9,7H13A2,2 0 0,1 15,9V11A2,2 0 0,1 13,13H11V15H15V17H11L9,17V13A2,2 0 0,1 11,11H13V9H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z";
const NODE_ICON_3 =
    "path://M15,15A2,2 0 0,1 13,17H9V15H13V13H11V11H13V9H9V7H13A2,2 0 0,1 15,9V10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 15,13.5V15M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z";
const NODE_ICON_4 =
    "path://M9,7H11V11H13V7H15V17H13V13H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z";
const NODE_ICON_5 =
    "path://M9,7H15V9H11V11H13A2,2 0 0,1 15,13V15A2,2 0 0,1 13,17H9V15H13V13H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z";
const NODE_ICON_6 =
    "path://M11,7H15V9H11V11H13A2,2 0 0,1 15,13V15A2,2 0 0,1 13,17H11A2,2 0 0,1 9,15V9A2,2 0 0,1 11,7M11,13V15H13V13H11M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z";
const NODE_ICON_7 =
    "path://M11,17H9L13,9H9V7H15V9L11,17M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z";
const NODE_ICON_8 =
    "path://M11,13V15H13V13H11M11,9V11H13V9H11M11,17A2,2 0 0,1 9,15V13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 9,10.5V9A2,2 0 0,1 11,7H13A2,2 0 0,1 15,9V10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 15,13.5V15A2,2 0 0,1 13,17H11M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z";
/** Node Symbol Size */
const NODE_SYMBOL_SIZE = 22;

/** Label Styling */
const FONT_SIZE = 15;
const FONT_FAMILY = "Arial";
const FONT_COLOR = "black";

/** Zoom-Lvls */
const ZOOM_LVL_XL = 1;
const ZOOM_LVL_LG = 0.8;

/** Konstanten für die Namen der einzelnen Punkte, die verbunden werden */
const KREIS_5_1 = "kreis51";
const KREIS_1_8 = "kreis18";
const KREIS_2_5 = "kreis25";
const KREIS_6_2 = "kreis62";
const KREIS_3_6 = "kreis36";
const KREIS_7_3 = "kreis73";
const KREIS_4_7 = "kreis47";
const KREIS_8_4 = "kreis84";

const START_1S = "start1s";
const ENDE_1S = "ende1s";
const START_1T = "start1t";
const ENDE_1T = "ende1t";

const START_2S = "start2s";
const ENDE_2S = "ende2s";
const START_2T = "start2t";
const ENDE_2T = "ende2t";

const START_3S = "start3s";
const ENDE_3S = "ende3s";
const START_3T = "start3t";
const ENDE_3T = "ende3t";

const START_4S = "start4s";
const ENDE_4S = "ende4s";
const START_4T = "start4t";
const ENDE_4T = "ende4t";

const START_5S = "start5s";
const ENDE_5S = "ende5s";
const START_5T = "start5t";
const ENDE_5T = "ende5t";

const START_6S = "start6s";
const ENDE_6S = "ende6s";
const START_6T = "start6t";
const ENDE_6T = "ende6t";

const START_7S = "start7s";
const ENDE_7S = "ende7s";
const START_7T = "start7t";
const ENDE_7T = "ende7t";

const START_8S = "start8s";
const ENDE_8S = "ende8s";
const START_8T = "start8t";
const ENDE_8T = "ende8t";

provide(THEME_KEY, "default");
interface Props {
    /** Aufbau der Datenstruktur:
     * Ebene 1: Index ist die Knotenarmnummer - 1
     * Ebene 2: Index = 0 => HINEIN
     *          Index = 1 => VORBEI
     *          Index = 2 => HERAUS
     */
    data: LadeBelastungsplanDTO;
    // BEARBEITUNG: Wenn du folgende Zeile einkommentierst, werden dir immer die Kreissymbole eingeblendet
    // Zusätzlich die beiden danach folgenden Zeilen auskommentier (Prop und private...)
    // const visibleNodes: boolean[] = [true,true,true,true,true,true,true,true];
    visibleNodes: Array<boolean>;
    streets: Array<string>;
    name?: string;
}

const props = defineProps<Props>();
const chart = ref<InstanceType<typeof VChart> | null>();
defineExpose({
    chart,
});
const vuetify = useVuetify();
const zaehlstelleStore = useZaehlstelleStore();
const snackbarStore = useSnackbarStore();

const maxNumberOfCars = ref(0);

const belastungsplanHeightAndWidth = computed(() => {
    let height = "800px";
    if (vuetify.breakpoint.xl || vuetify.breakpoint.lg) {
        height = "1000px";
    }
    return `width: 100%; height: ${height}`;
});

const selectedOptions: ComputedRef<OptionsDTO> = computed(() => {
    return zaehlstelleStore.getFilteroptions;
});

/** Damit nicht für jede Linie die maximale an Fahrzeugen über alle Fahrbeziehungen berechnet wird,
 * wird dieser Wert in der Variable this.maxNumberOfCars zwischengespeichert.
 * Wenn dort bereits ein Wert enthalten ist, wird dieser verwendet und nicht neu berechnet.
 */
const maxNumberOfCarsForWidth = computed(() => {
    return maxNumberOfCars.value > 0
        ? maxNumberOfCars.value
        : calculateMaxNumberOfCars();
});

/** Zoomstufen für die einzelnen Bildschirmgrößen
 * XL ist Default und dementsprechend Faktor 1
 */
const zoomLvlChart = computed(() => {
    let zoomlvl = 1;
    switch (vuetify.breakpoint.name) {
        // case "xs": break;
        // case "sm": break;
        // case "md": break;
        case "lg":
            zoomlvl = ZOOM_LVL_LG;
            break;
        case "xl":
            zoomlvl = ZOOM_LVL_XL;
            break;
    }
    return zoomlvl.toString();
});

const isFahrzeugkategorieSelected = computed(() => {
    return (
        selectedOptions.value.kraftfahrzeugverkehr ||
        selectedOptions.value.schwerverkehr ||
        selectedOptions.value.gueterverkehr ||
        selectedOptions.value.radverkehr ||
        selectedOptions.value.fussverkehr
    );
});

const optionsBelastunsplan = computed(() => {
    return {
        tooltip: {
            trigger: "item",
            show: false,
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
                name: props.name,
                type: "graph",
                layout: NONE,
                // height: this.belastungsplanHeightOfSeries,
                height: "550px",
                width: "550px",
                zoom: zoomLvlChart.value,
                symbol: NONE,
                color: COLOR[0],
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
                            fontFamily: FONT_FAMILY,
                            color: FONT_COLOR,
                        },
                        dividerLeft: {
                            lineHeight: 30,
                            fontSize: FONT_SIZE,
                            fontFamily: FONT_FAMILY,
                            color: FONT_COLOR,
                            align: "left",
                            verticalAlign: "top",
                        },
                        dividerRight: {
                            lineHeight: 30,
                            fontSize: FONT_SIZE,
                            fontFamily: FONT_FAMILY,
                            color: FONT_COLOR,
                            align: "right",
                            verticalAlign: "top",
                        },
                        streetRight: {
                            fontSize: FONT_SIZE,
                            fontFamily: FONT_FAMILY,
                            color: FONT_COLOR,
                            align: "right",
                        },
                        streetLeft: {
                            fontSize: FONT_SIZE,
                            fontFamily: FONT_FAMILY,
                            color: FONT_COLOR,
                            align: "left",
                        },
                        valueRight: {
                            fontSize: FONT_SIZE,
                            fontFamily: FONT_FAMILY,
                            fontWeight: "bold",
                            color: FONT_COLOR,
                            align: "right",
                        },
                        valueLeft: {
                            fontSize: FONT_SIZE,
                            fontFamily: FONT_FAMILY,
                            fontWeight: "bold",
                            color: FONT_COLOR,
                            align: "left",
                        },
                    },
                },
                silent: true,
                lineStyle: {
                    opacity: 1,
                },
                data: [
                    {
                        name: "Legende",
                        x: 0,
                        y: 0,
                        symbol: "dot",
                        symbolSize: 0.001,
                        label: {
                            rich: {
                                valueBold: {
                                    fontSize: FONT_SIZE,
                                    fontFamily: FONT_FAMILY,
                                    fontWeight: "bold",
                                    color: FONT_COLOR,
                                    align: "left",
                                },
                                value: {
                                    fontSize: FONT_SIZE,
                                    fontFamily: FONT_FAMILY,
                                    color: FONT_COLOR,
                                    align: "left",
                                },
                            },
                            formatter: formatLegend(),
                            show: true,
                            position: calculatePositionLegend(),
                        },
                    },
                    /**
                     * Node-Label
                     * Als Node-Label wird die Kombination aus dem textuellen Label und dem Icon (Kreis mit Zahl innen) bezeichnet.
                     * Die Zahl gibt dabei an, um welchen Knotenarm es sich handelt.
                     */
                    {
                        name: "NodeLabel1",
                        x: XCOORD_DEFAULT_NODELABEL,
                        y: YCOORD_DEFAULT_NODELABEL,
                        symbol: getSymbolForDataLabel(0),
                        symbolSize: calculateSymbolSizeForNode(),
                        label: {
                            formatter: formatLabelNode(0),
                            show: props.visibleNodes[0],
                            position: calculatePositionLabelNode(0),
                            rotate: ROTATE_90,
                        },
                    },
                    {
                        name: "NodeLabel2",
                        x: calculateXCoordNodeLabel(ANGLE_05_PI),
                        y: calculateYCoordNodeLabel(ANGLE_05_PI),
                        symbol: getSymbolForDataLabel(1),
                        symbolSize: calculateSymbolSizeForNode(),
                        label: {
                            formatter: formatLabelNode(1),
                            show: props.visibleNodes[1],
                            position: calculatePositionLabelNode(1),
                        },
                    },
                    {
                        name: "NodeLabel3",
                        x: calculateXCoordNodeLabel(ANGLE_1_PI),
                        y: calculateYCoordNodeLabel(ANGLE_1_PI),
                        symbol: getSymbolForDataLabel(2),
                        symbolSize: calculateSymbolSizeForNode(),
                        label: {
                            formatter: formatLabelNode(2),
                            show: props.visibleNodes[2],
                            position: calculatePositionLabelNode(2),
                            rotate: ROTATE_90,
                        },
                    },
                    {
                        name: "NodeLabel4",
                        x: calculateXCoordNodeLabel(ANGLE_15_PI),
                        y: calculateYCoordNodeLabel(ANGLE_15_PI),
                        symbol: getSymbolForDataLabel(3),
                        symbolSize: calculateSymbolSizeForNode(),
                        label: {
                            formatter: formatLabelNode(3),
                            show: props.visibleNodes[3],
                            position: calculatePositionLabelNode(3),
                        },
                    },
                    {
                        name: "NodeLabel5",
                        x: calculateXCoordNodeLabel(ANGLE_025_PI),
                        y: calculateYCoordNodeLabel(ANGLE_025_PI),
                        symbol: getSymbolForDataLabel(4),
                        symbolSize: calculateSymbolSizeForNode(),
                        label: {
                            formatter: formatLabelNode(4),
                            show: props.visibleNodes[4],
                            position: calculatePositionLabelNode(4),
                            rotate: ROTATE_45,
                        },
                    },
                    {
                        name: "NodeLabel6",
                        x: calculateXCoordNodeLabel(ANGLE_075_PI),
                        y: calculateYCoordNodeLabel(ANGLE_075_PI),
                        symbol: getSymbolForDataLabel(5),
                        symbolSize: calculateSymbolSizeForNode(),
                        label: {
                            formatter: formatLabelNode(5),
                            show: props.visibleNodes[5],
                            position: calculatePositionLabelNode(5),
                            rotate: -ROTATE_45,
                        },
                    },
                    {
                        name: "NodeLabel7",
                        x: calculateXCoordNodeLabel(ANGLE_125_PI),
                        y: calculateYCoordNodeLabel(ANGLE_125_PI),
                        symbol: getSymbolForDataLabel(6),
                        symbolSize: calculateSymbolSizeForNode(),
                        label: {
                            formatter: formatLabelNode(6),
                            show: props.visibleNodes[6],
                            position: calculatePositionLabelNode(6),
                            rotate: ROTATE_45,
                        },
                    },
                    {
                        name: "NodeLabel8",
                        x: calculateXCoordNodeLabel(ANGLE_175_PI),
                        y: calculateYCoordNodeLabel(ANGLE_175_PI),
                        symbol: getSymbolForDataLabel(7),
                        symbolSize: calculateSymbolSizeForNode(),
                        label: {
                            formatter: formatLabelNode(7),
                            show: props.visibleNodes[7],
                            position: calculatePositionLabelNode(7),
                            rotate: -ROTATE_45,
                        },
                    },

                    /**
                     * Triangles
                     * Als Triange wird das Icon bezeichnet, welches die Ausfahrt eines Knotenarms überspannt.
                     * Die Zahl gibt dabei an, um welchen Knotenarm es sich handelt.
                     */
                    {
                        name: "Triangle1",
                        x: XCOORD_DEFAULT_TRIANGLE,
                        y: YCOORD_DEFAULT_TRIANGLE,
                        symbol: getSymbolForTriangle(0),
                        symbolRotate: ROTATE_0,
                        symbolSize: calculateSymbolSizeForTriangle(0),
                        label: {
                            formatter: formatLabelTriangle(0, true),
                            show: props.visibleNodes[0],
                            position: calculatePositionLabelTriangle(0),
                            rotate: props.visibleNodes[previousNodeindex(0)]
                                ? ROTATE_67_5
                                : ROTATE_45,
                        },
                    },
                    {
                        name: "Triangle2",
                        x: calculateXCoordTriangle(ANGLE_05_PI),
                        y: calculateYCoordTriangle(ANGLE_05_PI),
                        symbol: getSymbolForTriangle(1),
                        symbolRotate: ROTATE_270,
                        symbolSize: calculateSymbolSizeForTriangle(1),
                        label: {
                            formatter: formatLabelTriangle(1, true),
                            show: props.visibleNodes[1],
                            position: calculatePositionLabelTriangle(1),
                            rotate: props.visibleNodes[previousNodeindex(1)]
                                ? -ROTATE_22_5
                                : -ROTATE_45,
                        },
                    },
                    {
                        name: "Triangle3",
                        x: calculateXCoordTriangle(ANGLE_1_PI),
                        y: calculateYCoordTriangle(ANGLE_1_PI),
                        symbol: getSymbolForTriangle(2),
                        symbolRotate: ROTATE_180,
                        symbolSize: calculateSymbolSizeForTriangle(2),
                        label: {
                            formatter: formatLabelTriangle(2, false),
                            show: props.visibleNodes[2],
                            position: calculatePositionLabelTriangle(2),
                            rotate: props.visibleNodes[previousNodeindex(2)]
                                ? ROTATE_67_5
                                : ROTATE_45,
                        },
                    },
                    {
                        name: "Triangle4",
                        x: calculateXCoordTriangle(ANGLE_15_PI),
                        y: calculateYCoordTriangle(ANGLE_15_PI),
                        symbol: getSymbolForTriangle(3),
                        symbolRotate: ROTATE_90,
                        symbolSize: calculateSymbolSizeForTriangle(3),
                        label: {
                            formatter: formatLabelTriangle(3, false),
                            show: props.visibleNodes[3],
                            position: calculatePositionLabelTriangle(3),
                            rotate: props.visibleNodes[previousNodeindex(3)]
                                ? -ROTATE_22_5
                                : -ROTATE_45,
                        },
                    },
                    {
                        name: "Triangle5",
                        x: calculateXCoordTriangle(ANGLE_025_PI),
                        y: calculateYCoordTriangle(ANGLE_025_PI),
                        symbol: getSymbolForTriangle(4),
                        symbolRotate: ROTATE_315,
                        symbolSize: calculateSymbolSizeForTriangle(4),
                        label: {
                            formatter: formatLabelTriangle(4, true),
                            show: props.visibleNodes[4],
                            position: calculatePositionLabelTriangle(4),
                            rotate: props.visibleNodes[previousNodeindex(4)]
                                ? ROTATE_22_5
                                : ROTATE_0,
                        },
                    },
                    {
                        name: "Triangle6",
                        x: calculateXCoordTriangle(ANGLE_075_PI),
                        y: calculateYCoordTriangle(ANGLE_075_PI),
                        symbol: getSymbolForTriangle(5),
                        symbolRotate: ROTATE_225,
                        symbolSize: calculateSymbolSizeForTriangle(5),
                        label: {
                            formatter: formatLabelTriangle(
                                5,
                                props.visibleNodes[previousNodeindex(5)]
                            ),
                            show: props.visibleNodes[5],
                            position: calculatePositionLabelTriangle(5),
                            rotate: props.visibleNodes[previousNodeindex(5)]
                                ? -ROTATE_67_5
                                : ROTATE_90,
                        },
                    },
                    {
                        name: "Triangle7",
                        x: calculateXCoordTriangle(ANGLE_125_PI),
                        y: calculateYCoordTriangle(ANGLE_125_PI),
                        symbol: getSymbolForTriangle(6),
                        symbolRotate: ROTATE_135,
                        symbolSize: calculateSymbolSizeForTriangle(6),
                        label: {
                            formatter: formatLabelTriangle(6, false),
                            show: props.visibleNodes[6],
                            position: calculatePositionLabelTriangle(6),
                            rotate: props.visibleNodes[previousNodeindex(6)]
                                ? ROTATE_22_5
                                : ROTATE_0,
                        },
                    },
                    {
                        name: "Triangle8",
                        x: calculateXCoordTriangle(ANGLE_175_PI),
                        y: calculateYCoordTriangle(ANGLE_175_PI),
                        symbol: getSymbolForTriangle(7),
                        symbolRotate: ROTATE_45,
                        symbolSize: calculateSymbolSizeForTriangle(7),
                        label: {
                            formatter: formatLabelTriangle(
                                7,
                                !props.visibleNodes[previousNodeindex(7)]
                            ),
                            show: props.visibleNodes[7],
                            position: calculatePositionLabelTriangle(7),
                            rotate: props.visibleNodes[previousNodeindex(7)]
                                ? -ROTATE_67_5
                                : ROTATE_90,
                        },
                    },

                    // 1
                    {
                        name: START_1S,
                        x: XCOORD_DEFAULT,
                        y: YCOORD_DEFAULT,
                    },
                    {
                        name: ENDE_1S,
                        x: XCOORD_DEFAULT,
                        y: YCOORD_DEFAULT + STRAIGHT_DEFAULT,
                    },
                    {
                        name: START_1T,
                        x: -XCOORD_DEFAULT,
                        y: YCOORD_DEFAULT + STRAIGHT_DEFAULT,
                    },
                    {
                        name: ENDE_1T,
                        x: -XCOORD_DEFAULT,
                        y: YCOORD_DEFAULT,
                    },

                    // 2
                    {
                        name: START_2S,
                        x: calculateXCoord(
                            ANGLE_05_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_05_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_2S,
                        x: calculateXCoord(
                            ANGLE_05_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_05_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: START_2T,
                        x: calculateXCoord(
                            ANGLE_05_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_05_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_2T,
                        x: calculateXCoord(
                            ANGLE_05_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_05_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },

                    // Start und Ende 3
                    {
                        name: START_3S,
                        x: calculateXCoord(
                            ANGLE_1_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_1_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_3S,
                        x: calculateXCoord(
                            ANGLE_1_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_1_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: START_3T,
                        x: calculateXCoord(
                            ANGLE_1_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_1_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_3T,
                        x: calculateXCoord(
                            ANGLE_1_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_1_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },

                    // Start und Ende 4
                    {
                        name: START_4S,
                        x: calculateXCoord(
                            ANGLE_15_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_15_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_4S,
                        x: calculateXCoord(
                            ANGLE_15_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_15_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: START_4T,
                        x: calculateXCoord(
                            ANGLE_15_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_15_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_4T,
                        x: calculateXCoord(
                            ANGLE_15_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_15_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },

                    // Start und Ende 5
                    {
                        name: START_5S,
                        x: calculateXCoord(
                            ANGLE_025_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_025_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_5S,
                        x: calculateXCoord(
                            ANGLE_025_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_025_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: START_5T,
                        x: calculateXCoord(
                            ANGLE_025_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_025_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_5T,
                        x: calculateXCoord(
                            ANGLE_025_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_025_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },

                    // Start und Ende 6
                    {
                        name: START_6S,
                        x: calculateXCoord(
                            ANGLE_075_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_075_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_6S,
                        x: calculateXCoord(
                            ANGLE_075_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_075_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: START_6T,
                        x: calculateXCoord(
                            ANGLE_075_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_075_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_6T,
                        x: calculateXCoord(
                            ANGLE_075_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_075_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },

                    // Start und Ende 7
                    {
                        name: START_7S,
                        x: calculateXCoord(
                            ANGLE_125_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_125_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_7S,
                        x: calculateXCoord(
                            ANGLE_125_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_125_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: START_7T,
                        x: calculateXCoord(
                            ANGLE_125_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_125_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_7T,
                        x: calculateXCoord(
                            ANGLE_125_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_125_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },

                    // Start und Ende 8
                    {
                        name: START_8S,
                        x: calculateXCoord(
                            ANGLE_175_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_175_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_8S,
                        x: calculateXCoord(
                            ANGLE_175_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_175_PI,
                            XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: START_8T,
                        x: calculateXCoord(
                            ANGLE_175_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_175_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT + STRAIGHT_DEFAULT
                        ),
                    },
                    {
                        name: ENDE_8T,
                        x: calculateXCoord(
                            ANGLE_175_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_175_PI,
                            -XCOORD_DEFAULT,
                            YCOORD_DEFAULT
                        ),
                    },

                    // Kreis
                    {
                        name: KREIS_5_1,
                        x: calculateXCoord(
                            ANGLE_0125_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_0125_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                    },
                    {
                        name: KREIS_2_5,
                        x: calculateXCoord(
                            ANGLE_0375_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_0375_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                    },
                    {
                        name: KREIS_6_2,
                        x: calculateXCoord(
                            ANGLE_0625_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_0625_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                    },
                    {
                        name: KREIS_3_6,
                        x: calculateXCoord(
                            ANGLE_0875_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_0875_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                    },
                    {
                        name: KREIS_7_3,
                        x: calculateXCoord(
                            ANGLE_1125_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_1125_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                    },
                    {
                        name: KREIS_4_7,
                        x: calculateXCoord(
                            ANGLE_1375_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_1375_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                    },
                    {
                        name: KREIS_8_4,
                        x: calculateXCoord(
                            ANGLE_1625_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_1625_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                    },
                    {
                        name: KREIS_1_8,
                        x: calculateXCoord(
                            ANGLE_1875_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                        y: calculateYCoord(
                            ANGLE_1875_PI,
                            XCOORD_CIRCLE_DEFAULT,
                            YCOORD_CIRCLE_DEFAULT
                        ),
                    },
                ],
                edges: [
                    // Einfahrend
                    {
                        source: START_1S,
                        target: ENDE_1S,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[0][0]),
                            color: COLOR[0],
                        },
                    },
                    {
                        source: ENDE_1S,
                        target: KREIS_1_8,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[0][0]),
                            color: COLOR[0],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_2S,
                        target: ENDE_2S,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[1][0]),
                            color: COLOR[1],
                        },
                    },
                    {
                        source: ENDE_2S,
                        target: KREIS_2_5,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[1][0]),
                            color: COLOR[1],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_3S,
                        target: ENDE_3S,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[2][0]),
                            color: COLOR[2],
                        },
                    },
                    {
                        source: ENDE_3S,
                        target: KREIS_3_6,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[2][0]),
                            color: COLOR[2],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_4S,
                        target: ENDE_4S,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[3][0]),
                            color: COLOR[3],
                        },
                    },
                    {
                        source: ENDE_4S,
                        target: KREIS_4_7,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[3][0]),
                            color: COLOR[3],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_5S,
                        target: ENDE_5S,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[4][0]),
                            color: COLOR[4],
                        },
                    },
                    {
                        source: ENDE_5S,
                        target: KREIS_5_1,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[4][0]),
                            color: COLOR[4],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_6S,
                        target: ENDE_6S,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[5][0]),
                            color: COLOR[5],
                        },
                    },
                    {
                        source: ENDE_6S,
                        target: KREIS_6_2,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[5][0]),
                            color: COLOR[5],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_7S,
                        target: ENDE_7S,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[6][0]),
                            color: COLOR[6],
                        },
                    },
                    {
                        source: ENDE_7S,
                        target: KREIS_7_3,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[6][0]),
                            color: COLOR[6],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_8S,
                        target: ENDE_8S,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[7][0]),
                            color: COLOR[7],
                        },
                    },
                    {
                        source: ENDE_8S,
                        target: KREIS_8_4,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[7][0]),
                            color: COLOR[7],
                            curveness: CURVENESS_02,
                        },
                    },

                    // Ausfahrend
                    {
                        source: KREIS_5_1,
                        target: START_1T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[0][2]),
                            color: COLOR[0],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_1T,
                        target: ENDE_1T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[0][2]),
                            color: COLOR[0],
                        },
                    },
                    {
                        source: KREIS_6_2,
                        target: START_2T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[1][2]),
                            color: COLOR[1],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_2T,
                        target: ENDE_2T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[1][2]),
                            color: COLOR[1],
                        },
                    },
                    {
                        source: KREIS_7_3,
                        target: START_3T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[2][2]),
                            color: COLOR[2],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_3T,
                        target: ENDE_3T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[2][2]),
                            color: COLOR[2],
                        },
                    },
                    {
                        source: KREIS_8_4,
                        target: START_4T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[3][2]),
                            color: COLOR[3],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_4T,
                        target: ENDE_4T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[3][2]),
                            color: COLOR[3],
                        },
                    },
                    {
                        source: KREIS_2_5,
                        target: START_5T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[4][2]),
                            color: COLOR[4],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_5T,
                        target: ENDE_5T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[4][2]),
                            color: COLOR[4],
                        },
                    },
                    {
                        source: KREIS_3_6,
                        target: START_6T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[5][2]),
                            color: COLOR[5],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_6T,
                        target: ENDE_6T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[5][2]),
                            color: COLOR[5],
                        },
                    },
                    {
                        source: KREIS_4_7,
                        target: START_7T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[6][2]),
                            color: COLOR[6],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_7T,
                        target: ENDE_7T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[6][2]),
                            color: COLOR[6],
                        },
                    },
                    {
                        source: KREIS_1_8,
                        target: START_8T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[7][2]),
                            color: COLOR[7],
                            curveness: CURVENESS_02,
                        },
                    },
                    {
                        source: START_8T,
                        target: ENDE_8T,
                        lineStyle: {
                            width: calculateLineWidth(getDataToShow()[7][2]),
                            color: COLOR[7],
                        },
                    },

                    // Kreis verbleibend
                    // Vorbei an der 8
                    {
                        source: KREIS_1_8,
                        target: KREIS_8_4,
                        lineStyle: {
                            width: calculateLineWidthVorbei(8),
                            color: COLOR[8],
                            curveness: -CURVENESS_02,
                        },
                    },
                    // Vorbei an der 4
                    {
                        source: KREIS_8_4,
                        target: KREIS_4_7,
                        lineStyle: {
                            width: calculateLineWidthVorbei(4),
                            color: COLOR[8],
                            curveness: -CURVENESS_02,
                        },
                    },
                    // Vorbei an der 7
                    {
                        source: KREIS_4_7,
                        target: KREIS_7_3,
                        lineStyle: {
                            width: calculateLineWidthVorbei(7),
                            color: COLOR[8],
                            curveness: -CURVENESS_02,
                        },
                    },
                    // Vorbei an der 3
                    {
                        source: KREIS_7_3,
                        target: KREIS_3_6,
                        lineStyle: {
                            width: calculateLineWidthVorbei(3),
                            color: COLOR[8],
                            curveness: -CURVENESS_02,
                        },
                    },
                    // Vorbei an der 6
                    {
                        source: KREIS_3_6,
                        target: KREIS_6_2,
                        lineStyle: {
                            width: calculateLineWidthVorbei(6),
                            color: COLOR[8],
                            curveness: -CURVENESS_02,
                        },
                    },
                    // Vorbei an der 2
                    {
                        source: KREIS_6_2,
                        target: KREIS_2_5,
                        lineStyle: {
                            width: calculateLineWidthVorbei(2),
                            color: COLOR[8],
                            curveness: -CURVENESS_02,
                        },
                    },
                    // Vorbei an der 5
                    {
                        source: KREIS_2_5,
                        target: KREIS_5_1,
                        lineStyle: {
                            width: calculateLineWidthVorbei(5),
                            color: COLOR[8],
                            curveness: -CURVENESS_02,
                        },
                    },
                    // Vorbei an der 1
                    {
                        source: KREIS_5_1,
                        target: KREIS_1_8,
                        lineStyle: {
                            width: calculateLineWidthVorbei(1),
                            color: COLOR[8],
                            curveness: -CURVENESS_02,
                        },
                    },
                ],
            },
        ],
    };
});

/** Berechnet die maximale Anzahl an Fahrzeugen über alle Fahrbeziehungen und Zeitintervalle */
function calculateMaxNumberOfCars() {
    let maxValue = 0;
    getDataToShow().forEach((mm: number[]) => {
        mm.forEach((m) => {
            m > maxValue ? (maxValue = m) : null;
        });
    });
    maxNumberOfCars.value = maxValue;
    return maxValue;
}

/** Berechnet die Breite der einzelnen Linien anhand der maximalen Anzahl der Autos für Vorbeifahrende Autos*/
function calculateLineWidthVorbei(node: number): number {
    let nodeIndex = node - 1;
    let numberOfCars = getDataToShow()[nodeIndex][1];
    // Wenn ein Knoten nicht exisitiert, wird die Summe aus dem letzen Vorbei-Knoten und der letzten Einfahrt berechnet
    let counter = 0;
    while (numberOfCars === 0 && nodeIndex >= 0 && counter < 8) {
        nodeIndex = previousNodeindex(nodeIndex);
        numberOfCars =
            getDataToShow()[nodeIndex][1] + getDataToShow()[nodeIndex][0];
        counter++;
    }
    return calculateLineWidth(numberOfCars);
}

/** Berechnet die Breite der einzelnen Linien anhand der maximalen Anzahl der Autos */
function calculateLineWidth(cars: number): number {
    let step = maxNumberOfCarsForWidth.value / 5;
    let lineWidth = 0;
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
function previousNodeindex(nodeIndex: number) {
    let previousIndex = -1;
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
function padStringAtStart(stringToPad: string, maxLength: number) {
    let paddedString: string = stringToPad;
    for (
        let actualLength = stringToPad.length;
        actualLength < maxLength;
        actualLength++
    ) {
        paddedString = BlANK + paddedString;
    }
    return paddedString;
}

/** Erzeugt eine Leerzeile mit maximalen Zeichenlänge (pro Zeichen 2 Leerzeichen) */
function getMaxEmptyLine(maxLength: number): string {
    let emptyLine = ``;
    for (let index = 0; index < maxLength; index++) {
        emptyLine += BlANK;
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
function calculateXCoord(winkel: number, xCoord: number, yCoord: number) {
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
function calculateYCoord(winkel: number, xCoord: number, yCoord: number) {
    return xCoord * Math.sin(winkel) + yCoord * Math.cos(winkel);
}

/** Getter liefert anhand des Optionsmenüs die Daten
 * der ausgewählten Fahrzeugkategorie zurück.
 */
function getDataToShow() {
    if (props.data.value1.filled && !props.data.value1.label.endsWith("%")) {
        return props.data.value1.values;
    }
    if (props.data.value2.filled && !props.data.value2.label.endsWith("%")) {
        return props.data.value2.values;
    }
    if (props.data.value3.filled && !props.data.value3.label.endsWith("%")) {
        return props.data.value3.values;
    }
    // mit 0 gefülltes Array zurückgeben
    let emptyArray: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];
    return [
        emptyArray,
        emptyArray,
        emptyArray,
        emptyArray,
        emptyArray,
        emptyArray,
        emptyArray,
        emptyArray,
    ];
}

// Alle Methoden für die Triangles
function getSymbolForTriangle(index: number) {
    // Wird nur angezeigt, wenn der Knoten vorhanden ist und auch Daten vorliegen (herausfahrende Fahrzeuge)
    // return (props.visibleNodes[index] && getDataToShow()[index][2]) ? this.TRIANGLE : NONE;
    return props.visibleNodes[index] ? TRIANGLE : NONE;
}

function calculateSymbolSizeForTriangle(nodeIndex: number) {
    if (isFahrzeugkategorieSelected.value) {
        // Ist ein kleiner Hack, da die Labels nur mit Symbol gezeichnet werden können.
        // Wenn keine Daten (herausfahrende Fahrzeuge) vorliegen, wird einfach das Symbol geschrumpft, damit das Label da bleibt
        return props.visibleNodes[nodeIndex] && getDataToShow()[nodeIndex][2]
            ? TRIANGLE_SYMBOL_SIZE
            : 0.001;
    } else {
        return 0;
    }
}

/** Methode, um die Labels passend zu formatieren.
 *
 * @param node Index des aktuellen Knotens zur Datenberechnung
 * @param alignLeft rechts oder linksbündiger Text
 */
function formatLabelTriangle(node: number, alignLeft: boolean) {
    let text = "";

    if (props.data.value1.filled) {
        // Textbausteine mit Daten befüllen
        text += getTextPartLabelTriangle(
            props.data.value1.sumIn,
            previousNodeindex(node),
            props.data.value1.percent
        );
    }
    if (props.data.value2.filled) {
        // Textbausteine mit Daten befüllen
        text += getTextPartLabelTriangle(
            props.data.value2.sumIn,
            previousNodeindex(node),
            props.data.value2.percent
        );
    }
    if (props.data.value3.filled) {
        // Textbausteine mit Daten befüllen
        text += getTextPartLabelTriangle(
            props.data.value3.sumIn,
            previousNodeindex(node),
            props.data.value3.percent
        );
    }

    text = text.trim();

    const emptyLine = `${getMaxEmptyLine(MAX_LABEL_LENGTH)}`;

    if (alignLeft) {
        if (vuetify.breakpoint.name === "lg") {
            return `{dividerLeft|____}{valueLeft| ${text}}\n{dividerLeft|${emptyLine}}`;
        } else {
            return `{dividerLeft|_____}{valueLeft| ${text}}\n{dividerLeft|${emptyLine}}`;
        }
    } else {
        if (vuetify.breakpoint.name === "lg") {
            return `{valueRight|${text} }{dividerRight|____}\n{dividerRight|${emptyLine}}`;
        } else {
            return `{valueRight|${text} }{dividerRight|_____}\n{dividerRight|${emptyLine}}`;
        }
    }
}

/** Baut die Textzeile zusammen */
function getTextPartLabelTriangle(
    data: number[],
    nodeIndex: number,
    percent: boolean
): string {
    // Summe aus dem letzen Vorbei-Knoten und der letzten Einfahrt
    let street = props.data.streets[nodeIndex];
    let counter = 0;
    while (
        (street === undefined || street === null || street.trim() === "") &&
        counter < 8
    ) {
        nodeIndex = previousNodeindex(nodeIndex);
        street = props.data.streets[nodeIndex];
        counter++;
    }
    if (percent) {
        return `${padStringAtStart(`${data[nodeIndex]}%`, 7)}`;
    } else {
        return `${padStringAtStart(data[nodeIndex].toString(), 7)}`;
    }
}

/** Methode zum Berechnen der Pixelverschiebung für die Labels bei den Dreiecken
 * für die unterschiedlichen Bildschirmgrößen.
 * Default sind die Konstanten, weicht der Wert ab, wird dieser extra angegeben
 */
function zoomLvlTriangleLabel(nodeIndex: number): Array<number> {
    let zoomlvl: Array<number> = [1, 1, 1, 1];
    if (existsTriangle(nodeIndex)) {
        switch (vuetify.breakpoint.name) {
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
                        zoomlvl = [ZOOM_LVL_LG, 1.07, 0.74, 0.77];
                        break;
                    case 6: // [X,X,X,X]
                        zoomlvl = [1.11, ZOOM_LVL_LG, 1.15, -1.2];
                        break;
                    case 7: // [X,X,X,X]
                        zoomlvl = [ZOOM_LVL_LG, ZOOM_LVL_LG, 0.44, 1.14];
                        break;
                    default:
                        zoomlvl = [
                            ZOOM_LVL_LG,
                            ZOOM_LVL_LG,
                            ZOOM_LVL_LG,
                            ZOOM_LVL_LG,
                        ];
                        break;
                }
                break;
            }
            case "xl":
                zoomlvl = [ZOOM_LVL_XL, ZOOM_LVL_XL, ZOOM_LVL_XL, ZOOM_LVL_XL];
                break;
        }
    } else {
        switch (vuetify.breakpoint.name) {
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
                        zoomlvl = [ZOOM_LVL_LG, 1.08, 0.74, 0.77];
                        break;
                    case 6: // [X,X,X,X]
                        zoomlvl = [1.08, ZOOM_LVL_LG, 1.11, 0.2];
                        break;
                    case 7: // [X,X,X,X]
                        zoomlvl = [ZOOM_LVL_LG, ZOOM_LVL_LG, 0.1, 1.12];
                        break;
                    default:
                        zoomlvl = [
                            ZOOM_LVL_LG,
                            ZOOM_LVL_LG,
                            ZOOM_LVL_LG,
                            ZOOM_LVL_LG,
                        ];
                        break;
                }
                break;
            }
            case "xl":
                zoomlvl = [ZOOM_LVL_XL, ZOOM_LVL_XL, ZOOM_LVL_XL, ZOOM_LVL_XL];
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
function calculatePositionLabelTriangle(node: number): Array<number> {
    let position: Array<number> = [0, 0];
    if (existsTriangle(node)) {
        switch (node) {
            case 0: {
                let zoomlvl1: Array<number> = zoomLvlTriangleLabel(0);
                position = [67 * zoomlvl1[0], 186 * zoomlvl1[1]]; // Dreiecke da, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [25 * zoomlvl1[2], 165 * zoomlvl1[3]]; // Dreiecke da, xl & lg
                }
                break;
            }
            case 1: {
                let zoomlvl2: Array<number> = zoomLvlTriangleLabel(1);
                position = [-171 * zoomlvl2[0], 67 * zoomlvl2[1]]; // Dreiecke da, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [-150 * zoomlvl2[2], 25 * zoomlvl2[3]]; // Dreiecke da, xl & lg
                }
                break;
            }
            case 2: {
                let zoomlvl3: Array<number> = zoomLvlTriangleLabel(2);
                position = [-255 * zoomlvl3[0], 15 * zoomlvl3[1]]; // Dreiecke da, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [-125 * zoomlvl3[2], 110 * zoomlvl3[3]]; // Dreiecke da, xl & lg
                }
                break;
            }
            case 3: {
                let zoomlvl4: Array<number> = zoomLvlTriangleLabel(3);
                position = [2 * zoomlvl4[0], -255 * zoomlvl4[1]]; // Dreiecke da, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [-95 * zoomlvl4[2], -125 * zoomlvl4[3]]; // Dreiecke da, xl & lg
                }
                break;
            }
            case 4: {
                let zoomlvl5: Array<number> = zoomLvlTriangleLabel(4);
                position = [-75 * zoomlvl5[0], 180 * zoomlvl5[1]]; // Dreiecke da, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    // zwischen 5 und 2
                    position = [-85 * zoomlvl5[2], 135 * zoomlvl5[3]]; // Dreiecke da, xl & lg
                }
                break;
            }
            case 5: {
                let zoomlvl6: Array<number> = zoomLvlTriangleLabel(5);
                position = [-168 * zoomlvl6[0], 218 * zoomlvl6[1]]; // Dreiecke da, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [-100 * zoomlvl6[2], -90 * zoomlvl6[3]]; // Dreiecke da, xl & lg
                }
                break;
            }
            case 6: {
                let zoomlvl7: Array<number> = zoomLvlTriangleLabel(6);
                position = [-180 * zoomlvl7[0], -168 * zoomlvl7[1]]; // Dreiecke da, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [-155 * zoomlvl7[2], -10 * zoomlvl7[3]]; // Dreiecke da, xl & lg
                }
                break;
            }
            case 7: {
                let zoomlvl8: Array<number> = zoomLvlTriangleLabel(7);
                position = [180 * zoomlvl8[0], 112 * zoomlvl8[1]]; // Dreiecke da, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [50 * zoomlvl8[2], -155 * zoomlvl8[3]]; // Dreiecke da, xl & lg
                }
                break;
            }
        }
    } else {
        switch (node) {
            case 0: {
                let zoomlvl1: Array<number> = zoomLvlTriangleLabel(0);
                position = [45 * zoomlvl1[0], 180 * zoomlvl1[1]]; // Dreieck weg xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [6 * zoomlvl1[2], 157 * zoomlvl1[3]]; // Dreiecke weg, xl & lg
                }
                break;
            }
            case 1: {
                let zoomlvl2: Array<number> = zoomLvlTriangleLabel(1);
                position = [-180 * zoomlvl2[0], 45 * zoomlvl2[1]]; // Dreieck weg xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [-159 * zoomlvl2[2], 6 * zoomlvl2[3]]; // Dreiecke weg, xl & lg
                }
                break;
            }
            case 2: {
                let zoomlvl3: Array<number> = zoomLvlTriangleLabel(2);
                position = [-274 * zoomlvl3[0], 9 * zoomlvl3[1]]; // Dreieck weg, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [-144 * zoomlvl3[2], 101 * zoomlvl3[3]]; //  // Dreiecke weg, xl & lg
                }
                break;
            }
            case 3: {
                let zoomlvl4: Array<number> = zoomLvlTriangleLabel(3);
                position = [-5 * zoomlvl4[0], -275 * zoomlvl4[1]]; // Dreieck weg, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [-104 * zoomlvl4[2], -144 * zoomlvl4[3]]; // Dreiecke weg, xl & lg
                }
                break;
            }
            case 4: {
                let zoomlvl5: Array<number> = zoomLvlTriangleLabel(4);
                position = [-92 * zoomlvl5[0], 160 * zoomlvl5[1]]; // Dreieck weg, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [-104 * zoomlvl5[2], 116 * zoomlvl5[3]]; // Dreiecke weg, xl & lg
                }
                break;
            }
            case 5: {
                let zoomlvl6: Array<number> = zoomLvlTriangleLabel(5);
                position = [-190 * zoomlvl6[0], 200 * zoomlvl6[1]]; // Dreieck weg, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [-119 * zoomlvl6[2], -109 * zoomlvl6[3]]; // Dreiecke weg, xl & lg
                }
                break;
            }
            case 6: {
                let zoomlvl7: Array<number> = zoomLvlTriangleLabel(6);
                position = [-200 * zoomlvl7[0], -190 * zoomlvl7[1]]; // Dreieck weg, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [-174 * zoomlvl7[2], -29 * zoomlvl7[3]]; // Dreiecke weg, xl & lg
                }
                break;
            }
            case 7: {
                let zoomlvl8: Array<number> = zoomLvlTriangleLabel(7);
                position = [160 * zoomlvl8[0], 92 * zoomlvl8[1]]; // Dreieck weg, xl & lg
                if (props.visibleNodes[previousNodeindex(node)]) {
                    position = [31 * zoomlvl8[2], -174 * zoomlvl8[3]]; // Dreiecke weg, xl & lg
                }
                break;
            }
        }
    }
    return position;
}

function calculateXCoordTriangle(winkel: number) {
    return calculateXCoord(
        winkel,
        XCOORD_DEFAULT_TRIANGLE,
        YCOORD_DEFAULT_TRIANGLE
    );
}

function calculateYCoordTriangle(winkel: number) {
    return calculateYCoord(
        winkel,
        XCOORD_DEFAULT_TRIANGLE,
        YCOORD_DEFAULT_TRIANGLE
    );
}

function existsTriangle(nodeIndex: number): boolean {
    return calculateSymbolSizeForTriangle(nodeIndex) === TRIANGLE_SYMBOL_SIZE;
}

// Alle Methoden für die Nodes
/** Liefert anhand des Knotenarmindex (Knotenarmnummer -1) das passende Icon (Kreis mit Knotenarmnummer) */
function getSymbolForDataLabel(index: number) {
    if (props.visibleNodes[index]) {
        switch (index) {
            case 0:
                return NODE_ICON_1;
            case 1:
                return NODE_ICON_2;
            case 2:
                return NODE_ICON_3;
            case 3:
                return NODE_ICON_4;
            case 4:
                return NODE_ICON_5;
            case 5:
                return NODE_ICON_6;
            case 6:
                return NODE_ICON_7;
            case 7:
                return NODE_ICON_8;
            default:
                return NONE;
        }
    } else {
        return NONE;
    }
}

function calculateSymbolSizeForNode() {
    if (isFahrzeugkategorieSelected.value) {
        return NODE_SYMBOL_SIZE;
    } else {
        return 0;
    }
}

/** Formatiert das Label am Kreis passend für den Knotenarm */
function formatLabelNode(node: number) {
    let lineRein = "";
    let lineCombined = "";
    let lineRaus = "";

    let dataAvailableRein = false;
    let dataAvailableRaus = false;
    if (props.data.value1.filled) {
        // Textbausteine mit Daten befüllen
        let kreisReinKfz: number = props.data.value1.values[node][0];
        let kreisRausKfz: number = props.data.value1.values[node][2];
        let combinedKfz: number = parseFloat(
            props.data.value1.sum[node].toFixed(1)
        );
        dataAvailableRein = dataAvailableRein || kreisReinKfz > 0;
        dataAvailableRaus = dataAvailableRaus || kreisRausKfz > 0;
        lineRein += `${padStringAtStart(
            kreisReinKfz.toString(),
            MAX_CARS_LENGTH
        )}`;
        lineCombined += `${padStringAtStart(
            combinedKfz.toString(),
            MAX_CARS_LENGTH
        )}`;
        lineRaus += `${padStringAtStart(
            kreisRausKfz.toString(),
            MAX_CARS_LENGTH
        )}`;
    }
    if (props.data.value2.filled) {
        // Textbausteine mit Daten befüllen
        let kreisReinSv: number = props.data.value2.values[node][0];
        let kreisRausSv: number = props.data.value2.values[node][2];
        let combinedSv: number = parseFloat(
            props.data.value2.sum[node].toFixed(1)
        );
        dataAvailableRein = dataAvailableRein || kreisReinSv > 0;
        dataAvailableRaus = dataAvailableRaus || kreisRausSv > 0;
        if (props.data.value2.percent) {
            lineRein += `${padStringAtStart(
                kreisReinSv.toString() + "%",
                MAX_CARS_LENGTH
            )}`;
            lineCombined += `${padStringAtStart(
                combinedSv.toString() + "%",
                MAX_CARS_LENGTH
            )}`;
            lineRaus += `${padStringAtStart(
                kreisRausSv.toString() + "%",
                MAX_CARS_LENGTH
            )}`;
        } else {
            lineRein += `${padStringAtStart(
                kreisReinSv.toString(),
                MAX_CARS_LENGTH
            )}`;
            lineCombined += `${padStringAtStart(
                combinedSv.toString(),
                MAX_CARS_LENGTH
            )}`;
            lineRaus += `${padStringAtStart(
                kreisRausSv.toString(),
                MAX_CARS_LENGTH
            )}`;
        }
    }
    if (props.data.value3.filled) {
        // Textbausteine mit Daten befüllen
        let kreisReinGv: number = props.data.value3.values[node][0];
        let kreisRausGv: number = props.data.value3.values[node][2];
        let combinedGv: number = parseFloat(
            props.data.value3.sum[node].toFixed(1)
        );
        dataAvailableRein = dataAvailableRein || kreisReinGv > 0;
        dataAvailableRaus = dataAvailableRaus || kreisRausGv > 0;
        if (props.data.value3.percent) {
            lineRein += `${padStringAtStart(
                kreisReinGv.toString() + "%",
                MAX_CARS_LENGTH
            )}`;
            lineCombined += `${padStringAtStart(
                combinedGv.toString() + "%",
                MAX_CARS_LENGTH
            )}`;
            lineRaus += `${padStringAtStart(
                kreisRausGv.toString() + "%",
                MAX_CARS_LENGTH
            )}`;
        } else {
            lineRein += `${padStringAtStart(
                kreisReinGv.toString(),
                MAX_CARS_LENGTH
            )}`;
            lineCombined += `${padStringAtStart(
                combinedGv.toString(),
                MAX_CARS_LENGTH
            )}`;
            lineRaus += `${padStringAtStart(
                kreisRausGv.toString(),
                MAX_CARS_LENGTH
            )}`;
        }
    }

    // Summe aus Rein und Raus, muss immer am größten sein
    let maxLineLength = lineCombined.trim().length;
    lineRein = `${padStringAtStart(lineRein.trim(), maxLineLength)}`;
    lineCombined = `${padStringAtStart(lineCombined.trim(), maxLineLength)}`;
    lineRaus = `${padStringAtStart(lineRaus.trim(), maxLineLength)}`;

    // Wenn keine Daten vorhanden sind, dann darf die Zeile nicht angezeigt werden
    if (!dataAvailableRein) {
        lineRein = "";
    }
    if (!dataAvailableRein && !dataAvailableRaus) {
        lineCombined = "";
    }
    if (!dataAvailableRaus) {
        lineRaus = "";
    }

    // Achtung Node ist ein Index
    // Wenn raus === 0 , dann Leerzeichen schreiben
    // Wenn rein === 0 , dann Leerzeichen schreiben
    if (node === 2 || node === 3 || node === 6 || node === 7) {
        return (
            `{valueRight|${lineRaus}}\n\n` +
            `{streetRight|${props.streets[node]}}` +
            `{divider|\n}` +
            `{valueRight|${lineCombined}}\n\n` +
            `{valueRight|${lineRein}}\n` +
            `{streetRight|${getMaxEmptyLine(MAX_STREET_LENGTH)}}`
        );
    } else {
        return (
            `{valueLeft|${lineRein}}\n\n` +
            `{streetLeft|${props.streets[node]}}` +
            `{divider|\n}` +
            `{valueLeft|${lineCombined}}\n\n` +
            `{valueLeft|${lineRaus}}\n` +
            `{streetLeft|${getMaxEmptyLine(MAX_STREET_LENGTH)}}`
        );
    }
}

/** Methode zum Berechnen der Pixelverschiebung für die Labels bei den Kreisen mit Nummern
 * für die unterschiedlichen Bildschirmgrößen.
 * Default sind die Konstanten, weicht der Wert ab, wird dieser extra angegeben
 */
function zoomLvlNodeLabel(nodeIndex: number): number {
    let zoomlvl = 1;
    switch (vuetify.breakpoint.name) {
        case "lg": {
            zoomlvl = ZOOM_LVL_LG;
            // Alle auf der linken Seite mit Text-Align right
            if (
                nodeIndex === 2 ||
                nodeIndex === 3 ||
                nodeIndex === 6 ||
                nodeIndex === 7
            ) {
                zoomlvl = 0.97;
            }
            break;
        }
        case "xl":
            zoomlvl = ZOOM_LVL_XL;
            break;
    }
    return zoomlvl;
}

/** Liefert die Position [x, y] des Labels pro Knotenarm
 * Die x- & y-Koordinaten werden dabei immer mit dem entsprechenden Zoomfaktor multipliziert
 */
function calculatePositionLabelNode(node: number): Array<number> {
    let position: Array<number> = [0, 0];
    switch (node) {
        case 0:
            position = [-31 * zoomLvlNodeLabel(0), -55 * zoomLvlNodeLabel(0)];
            break;
        case 1:
            position = [75 * zoomLvlNodeLabel(1), -30 * zoomLvlNodeLabel(1)];
            break;
        case 2:
            position = [-30 * zoomLvlNodeLabel(2), 365 * zoomLvlNodeLabel(2)];
            break;
        case 3:
            position = [-345 * zoomLvlNodeLabel(3), -30 * zoomLvlNodeLabel(3)];
            break;
        case 4:
            position = [24 * zoomLvlNodeLabel(4), -60 * zoomLvlNodeLabel(4)];
            break;
        case 5:
            position = [88 * zoomLvlNodeLabel(5), 28 * zoomLvlNodeLabel(5)];
            break;
        case 6:
            position = [-270 * zoomLvlNodeLabel(6), 232 * zoomLvlNodeLabel(6)];
            break;
        case 7:
            position = [-212 * zoomLvlNodeLabel(7), -272 * zoomLvlNodeLabel(7)];
            break;
    }
    return position;
}

function calculateXCoordNodeLabel(winkel: number) {
    return calculateXCoord(
        winkel,
        XCOORD_DEFAULT_NODELABEL,
        YCOORD_DEFAULT_NODELABEL
    );
}

function calculateYCoordNodeLabel(winkel: number) {
    return calculateYCoord(
        winkel,
        XCOORD_DEFAULT_NODELABEL,
        YCOORD_DEFAULT_NODELABEL
    );
}

// Legende
function formatLegend() {
    let selectedValues = "";
    let explanationToDisplay = "";
    if (selectedOptions.value.kraftfahrzeugverkehr) {
        explanationToDisplay += `{value|KFZ = Pkw + Lkw + Lz + Bus + Krad}\n`;
    }
    if (selectedOptions.value.schwerverkehr) {
        explanationToDisplay += `{value|SV = Lkw + Lz + Bus}\n`;
    }
    if (selectedOptions.value.gueterverkehr) {
        explanationToDisplay += `{value|GV = Lkw + Lz}`;
    }

    if (props.data.value1.filled) {
        selectedValues += `${props.data.value1.label} `;
    }
    if (props.data.value2.filled) {
        selectedValues += `${props.data.value2.label} `;
    }
    if (props.data.value3.filled) {
        selectedValues += `${props.data.value3.label} `;
    }

    return `{valueBold|${selectedValues.trim()}}\n\n` + explanationToDisplay;
}

function calculatePositionLegend() {
    let position: Array<number> = [-445, -450];
    switch (vuetify.breakpoint.name) {
        case "lg":
            position = [-445, -450];
            break;
        case "xl":
            position = [-650, -450];
            break;
    }
    return position;
}

watch(isFahrzeugkategorieSelected, () => {
    if (!isFahrzeugkategorieSelected.value) {
        snackbarStore.showError(
            "Es wurde keine der 3 Fahrzeugkategorien (KFZ, SV oder GV) ausgewählt.",
            "Eine Anzeige des Belastungsplans ist daher nicht möglich."
        );
    }
});
</script>