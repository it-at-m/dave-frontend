<template>
  <v-sheet
    id="belastungsplan-zaehlstelle"
  >
    <svg
        :width="dimension"
        :height="dimension"
        viewBox="0 0 1400 1400"
        version="1.1"
        id="svg1"
        fill-rule="evenodd"
        stroke-width="28.222"
        stroke-linejoin="round"
        preserveAspectRatio="xMidYMid"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg">
      <defs
          id="defs1" />
      <g
          id="querschnitt"
          :transform="rotateSvg"
      >
        <g
            id="description">
          <g
              id="first_street">
            <!-- Street Line 1 -->
            <text
                v-if="firstStreetname.length > 1"
                xml:space="preserve"
                style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:33.4058px;font-family:sans-serif;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:middle;fill:#000000;stroke-width:39.1848"
                id="multirow"
                x="699.24969"
                y="688.33734"><tspan
             id="tspan20"
             style="stroke-width:39.1848"
             x="699.24969"
             y="688.33734">{{ firstStreetname[0] }}</tspan>
            </text>
            <!-- Street Line 2 -->
            <text
                v-if="firstStreetname.length === 1 || firstStreetname.length === 3"
                xml:space="preserve"
                style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:33.4058px;font-family:sans-serif;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:middle;fill:#000000;stroke-width:39.1848"
                x="699.24969"
                y="709.21594"
                id="singlerow"><tspan
             id="tspan15"
             style="stroke-width:39.1848"
             x="699.24969"
             y="709.21594">{{firstStreetname.length === 1 ? firstStreetname[0] : firstStreetname[1] }}</tspan></text>
            <!-- Street Line 3 -->
            <text
                v-if="firstStreetname.length > 1"
                xml:space="preserve"
                style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:33.4058px;font-family:sans-serif;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:middle;fill:#000000;stroke-width:39.1848"
                id="multirow"
                x="699.24969"
                y="688.33734"><tspan
                id="tspan1"
                style="stroke-width:39.1848"
                x="699.24969"
                y="730.0946">{{firstStreetname.length === 2 ? firstStreetname[1] : firstStreetname[2] }}</tspan></text>
          </g>
        </g>
        <g
            id="arrows">
          <g
              id="arrow4">
            <path
                style="stroke-width:40.9429"
                d="m 210,860.99999 v -28 h 945 v 27.997 z"
                id="path4"
                :fill="colorArrowFour"
            />
            <path
                style="stroke-width:78.3672"
                id="spike4"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                :fill="colorArrowFour"
                transform="matrix(0.09192953,0,0,0.07964786,-213.39551,-544.45264)" />
          </g>
          <g
              id="arrow3">
            <path
                style="stroke-width:40.9429"
                d="m 245,804.99999 v -28 h 945 v 27.997 z"
                id="path3"
                :fill="colorArrowThree"
            />
            <path
                style="stroke-width:78.3672"
                id="spike3"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                :fill="colorArrowThree"
                transform="matrix(-0.09192953,0,0,-0.07964786,1613.3955,2182.4526)" />
          </g>
          <g
              id="arrow2">
            <path
                ref="pathArrowTwoRef"
                style="stroke-width:40.9429"
                :d="dArrowTwo"
                id="path2"
                :fill="colorArrowTwo"
                :transform="transformTwo"
            />
            <path
                style="stroke-width:78.3672"
                id="spike2"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                :fill="colorArrowTwo"
                transform="matrix(0.09192953,0,0,0.07964786,-213.39551,-782.45264)" />
          </g>
          <g
              id="arrow1">
            <path
                ref="pathArrowOneRef"
                style="stroke-width:40.9429"
                :d="dArrowOne"
                id="path1"
                :fill="colorArrowOne"
                :transform="transformOne"
            />
            <path
                style="stroke-width:78.3672"
                id="spike1"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                :fill="colorArrowOne"
                transform="matrix(-0.09192953,0,0,-0.07964786,1613.3955,1944.4526)"
                />
          </g>
        </g>
        <g
            id="layer1">
          <g
              id="layer2">
            <text
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
                id="text3"
                style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9482"
                x="376.95462"
                y="-93.991508"><tspan
             x="1533.9819"
             y="693.90204"
             id="tspan3"
             style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9482">{{ zaehlwertThree }}</tspan></text>
            <text
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
                id="text4"
                style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9482"
                x="376.95462"
                y="-45.435368"><tspan
             x="1533.9819"
             y="742.45807"
             id="tspan4"
             style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9482">{{ zaehlwertFour }}</tspan></text>
            <path
                style="fill:#000000;fill-opacity:1;stroke-width:29.8746"
                d="m 1231.93,859.24999 h 98 v 2.45 h -98 z"
                id="path5-1" />
            <text
                xml:space="preserve"
                transform="scale(0.86675167,1.153733)"
                id="text5"
                style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9644"
                x="377.93076"
                y="-18.683392"><tspan
             x="1535.3855"
             y="769.50153"
             id="tspan5"
             style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9644">{{ summeThreeFour }}</tspan></text>
          </g>
          <g
              id="layer3">
            <text
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
                id="node4_north_west_number_text"
                style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9482"
                x="-985.63147"
                y="-300.35461"><tspan
             x="171.3958"
             y="487.53894"
             id="node4_north_west_number_tspan"
             style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9482">{{ zaehlwertOne }}</tspan></text>
            <path
                style="fill:#000000;fill-opacity:1;stroke-width:29.8746"
                d="m 50.47,621.25 h 98 v 2.45 h -98 z"
                id="path5" />
            <text
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
                id="node4_north_east_number_text"
                style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9482"
                x="-985.63147"
                y="-251.79846"><tspan
             x="171.3958"
             y="536.09497"
             id="node4_north_east_number_tspan"
             style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9482">{{ zaehlwertTwo }}</tspan></text>
            <text
                xml:space="preserve"
                transform="scale(0.86675167,1.153733)"
                id="node4_north_sum_text"
                style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9644"
                x="-985.15863"
                y="-224.97026"><tspan
             x="172.29607"
             y="563.21466"
             id="node4_north_sum_tspan"
             style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9644">{{ summeOneTwo }}</tspan></text>
          </g>
          <text
              xml:space="preserve"
              transform="scale(0.86675167,1.153733)"
              id="node4_sum_text"
              style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9644"
              x="377.93076"
              y="-171.53239"><tspan
           x="1535.3855"
           y="616.65204"
           id="node4_sum_tspan"
           style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9644">{{ summeOneToFour }}</tspan></text>
          <text
              xml:space="preserve"
              transform="scale(0.86675167,1.153733)"
              id="text2"
              style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9644"
              x="-985.15863"
              y="-171.53239"><tspan
           x="172.29607"
           y="616.65204"
           id="tspan2"
           style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:Arial;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9644">{{ summeOneToFour }}</tspan></text>
        </g>
      </g>
    </svg>

  </v-sheet>
</template>

<script setup lang="ts">
import type LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import { useDisplay } from "vuetify";
import { first } from "lodash";
import {computed, onMounted, ref, watch} from "vue";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import KnotenarmComparator from "@/util/KnotenarmComparator";
import {useZaehlstelleStore} from "@/store/ZaehlstelleStore";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type VerkehrsbeziehungQJS from "@/types/zaehlung/VerkehrsbeziehungQJS";

interface Props {
  data: LadeBelastungsplanDTO;
  dimension?: string;
}

const props = withDefaults(defineProps<Props>(), {
  dimension: "600vh",
});

const zaehlstelleStore = useZaehlstelleStore();
const display = useDisplay();

const firstStreetname = ref<Array<string>>([]);

const anchor = 'center' // 'center'|'bottom'|Number (Y)

// Refs zu den path-Elementen
const pathArrowOneRef = ref(null)
const pathArrowTwoRef = ref(null)

// berechnete Anker-Y-Werte (werden per getBBox ermittelt)
const centerYArrowOne = ref(0)
const centerYArrowTwo = ref(0)

function getArrowScale(zaelwert: number) {
  return zaelwert / Math.max(zaehlwertOne.value, zaehlwertTwo.value, zaehlwertThree.value, zaehlwertFour.value)
}

function computeAnchorY(el: SVGGraphicsElement | null, anchor: string|number) {
  if (!el) return 0
  // getBBox ist DOM-API; liefert x,y,width,height in user units
  const bbox = el.getBBox()
  if (typeof anchor === 'number') return anchor
  if (anchor === 'bottom') return bbox.y + bbox.height
  // default: center
  return bbox.y + bbox.height / 2
}

function scaleTransform(scaleY: number, centerY: number) {
  if (!scaleY || scaleY === 1) return null
  return `translate(0 ${centerY}) scale(1 ${scaleY}) translate(0 ${-centerY})`
}

const transformOne = computed(() => scaleTransform(getArrowScale(zaehlwertOne.value), centerYArrowOne.value))
const transformTwo = computed(() => scaleTransform(getArrowScale(zaehlwertTwo.value), centerYArrowTwo.value))

// --- Pfad-Daten
const dArrowOne = 'm 245,567 v -28 h 945 v 27.998 z'
const dArrowTwo = 'm 210,623 v -28 h 945 v 27.997 z'

const arrowOnePatterns = [
  { knotenarm: 1, nach: 3, strassenseite: Himmelsrichtung.W },
  { knotenarm: 2, nach: 4, strassenseite: Himmelsrichtung.N },
  { knotenarm: 5, nach: 7, strassenseite: Himmelsrichtung.NW },
  { knotenarm: 6, nach: 8, strassenseite: Himmelsrichtung.NO }
];

const arrowTwoPatterns = [
  { knotenarm: 3, nach: 1, strassenseite: Himmelsrichtung.W },
  { knotenarm: 4, nach: 2, strassenseite: Himmelsrichtung.N },
  { knotenarm: 7, nach: 5, strassenseite: Himmelsrichtung.NW },
  { knotenarm: 8, nach: 6, strassenseite: Himmelsrichtung.NO }
];

const arrowThreePatterns = [
  { knotenarm: 1, nach: 3, strassenseite: Himmelsrichtung.O },
  { knotenarm: 2, nach: 4, strassenseite: Himmelsrichtung.S },
  { knotenarm: 5, nach: 7, strassenseite: Himmelsrichtung.SO },
  { knotenarm: 6, nach: 8, strassenseite: Himmelsrichtung.SW }
];

const arrowFourPatterns = [
  { knotenarm: 3, nach: 1, strassenseite: Himmelsrichtung.O },
  { knotenarm: 4, nach: 2, strassenseite: Himmelsrichtung.S },
  { knotenarm: 7, nach: 5, strassenseite: Himmelsrichtung.SO },
  { knotenarm: 8, nach: 6, strassenseite: Himmelsrichtung.SW }
];

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const availableKnotenarmNummern = computed(() => {
  return availableKnotenarme.value.map((arm) => arm.nummer);
});

const availableKnotenarme = computed(() => {
  const nodes: LadeKnotenarmDTO[] = [];
  activeZaehlung.value.verkehrsbeziehungen.forEach((vb) => {
    const nr = vb.knotenarm
    const kn = activeZaehlung.value.knotenarme.find((kn) => kn.nummer === nr);
    if (kn) {
      nodes.push(kn);
    }
  })
  return nodes.toSorted(KnotenarmComparator.sortByNumber)
      .reverse();
});

const rotateSvg = computed(() => {
  console.log("rotateSvg")
  // Die Viewbox der SVG liegt bei 1400 1400. Die Rotation muss in deren Zentrum stattfinden, daher 700 700
  let rotation = "rotate(0,700,700)";
  if (availableKnotenarmNummern.value.includes(1)) {
    rotation = "rotate(-90,700,700)";
  }
  if (availableKnotenarmNummern.value.includes(2)) {
    rotation = "rotate(0,700,700)";
  }
  if (availableKnotenarmNummern.value.includes(5)) {
    rotation = "rotate(-45,700,700)";
  }
  if (availableKnotenarmNummern.value.includes(6)) {
    rotation = "rotate(45,700,700)";
  }
  return rotation;
});

const isSelectedArrowOne = computed(() => {
  return hasAnyArrowPatternIn(optionen.value?.verkehrsbeziehungenQJS, arrowOnePatterns);
})

const isSelectedArrowTwo = computed(() => {
  return hasAnyArrowPatternIn(optionen.value?.verkehrsbeziehungenQJS, arrowTwoPatterns);
})

const isSelectedArrowThree = computed(() => {
  return hasAnyArrowPatternIn(optionen.value?.verkehrsbeziehungenQJS, arrowThreePatterns);
})

const isSelectedArrowFour = computed(() => {
  return hasAnyArrowPatternIn(optionen.value?.verkehrsbeziehungenQJS, arrowFourPatterns);
})

const zaehlwertOne = computed(() => {
  return 900; // TODO
})

const zaehlwertTwo = computed(() => {
  return 100; // TODO
})

const zaehlwertThree = computed(() => {
  return 900; // TODO
})

const zaehlwertFour = computed(() => {
  return 100; // TODO
})

const summeOneTwo = computed(() => {
  return zaehlwertOne.value + zaehlwertTwo.value;
})

const summeThreeFour = computed(() => {
  return zaehlwertThree.value + zaehlwertFour.value;
})

const summeOneToFour = computed(() => {
  return summeOneTwo.value + summeThreeFour.value;
})

const colorArrowOne = computed<string>(() => {
  return isSelectedArrowOne.value ? "#D50000" : "#EFEFEF";
});
const colorArrowTwo = computed<string>(() => {
  return isSelectedArrowTwo.value ? "#D50000" : "#EFEFEF";
});
const colorArrowThree = computed<string>(() => {
  return isSelectedArrowThree.value ? "#0071C1" : "#EFEFEF";
});
const colorArrowFour = computed<string>(() => {
  return isSelectedArrowFour.value ? "#0071C1" : "#EFEFEF";
});

function matchesArrowPattern(verkehrsbeziehung: VerkehrsbeziehungQJS, arrowPattern: VerkehrsbeziehungQJS) {
  return verkehrsbeziehung.knotenarm === arrowPattern.knotenarm && verkehrsbeziehung.nach === arrowPattern.nach && verkehrsbeziehung.strassenseite === arrowPattern.strassenseite;
}

function hasAnyArrowPatternIn(verkehrsbeziehungen: Array<VerkehrsbeziehungQJS>, arrowPatterns: VerkehrsbeziehungQJS[]) {
  return !!verkehrsbeziehungen?.some(vb => arrowPatterns.some(p => matchesArrowPattern(vb, p)));
}

onMounted(() => {
  zaehlstelleStore.setSizeBelastungsplanSvg(
    Number.parseInt(sizeBelastungsplan.value.replace("px", ""))
  );
  zaehlstelleStore.setMaxSizeBelastungsplanSvg(maxSizeBelastungsplan.value);
  zaehlstelleStore.setMinSizeBelastungsplanSvg(minSizeBelastungsplan.value);

  prepareStreetnames();

  if (pathArrowOneRef.value) centerYArrowOne.value = computeAnchorY(pathArrowOneRef.value, anchor)
  if (pathArrowTwoRef.value) centerYArrowTwo.value = computeAnchorY(pathArrowTwoRef.value, anchor)


});

watch(
    () => activeZaehlung.value.knotenarme,
    () => {
      prepareStreetnames();
    },
    {deep: true, immediate: true}
);

const optionen = computed<ZaehlstelleOptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});

const sizeBelastungsplan = computed(() => {
  let sizeBelastungsplanSvg: number = zaehlstelleStore.getSizeBelastungsplanSvg;
  if (sizeBelastungsplanSvg === 0) {
    sizeBelastungsplanSvg = minSizeBelastungsplan.value;
  }
  return sizeBelastungsplanSvg + "px";
});

const minSizeBelastungsplan = computed(() => {
  return (
    (parseInt(props.dimension.trim().replace("vh", "")) *
      display.height.value) /
    100
  );
});

const maxSizeBelastungsplan = computed(() => {
  return (
    (parseInt(props.dimension.trim().replace("vh", "")) * display.width.value) /
    100
  );
});

/**
 * Liefert die LineWidth für die Legende
 * Wenn alle 3 Spalten im Belastungsplan gefüllt sind,
 * so wird die maxlineWidth verwendet, ansonsten ist mehr Platz da
 */
// const getLegendLineWidth = computed(() => {
//   // Wenn alles gefüllt ist, dann die maxLineWidth
//   if (
//     props.data &&
//     props.data.value1.filled &&
//     props.data.value2.filled &&
//     props.data.value3.filled
//   ) {
//     return belastungsplanMethods.maxlineWidth;
//   } else {
//     // sonst geht mehr
//     return belastungsplanMethods.maxLegendLineWidth;
//   }
// });

/**
 * Über diesen Wert wird die Liniendicke gesteuert, wenn zu wenig Platz vorhanden ist.
 */
// const lineFactor = computed(() => {
//   return lineWidth.value / highestVerkehrsbeziehungsValue.value;
// });

const isDifferenzdatendarstellung = computed(() => {
  return zaehlstelleStore.isDifferenzdatenDarstellung;
});

/**
 * Holt sich bei einer Diffenzdatendarstellung die Vergleichszählung
 */
const vergleichsZaehlung = computed(() => {
  if (
    isDifferenzdatendarstellung.value &&
    optionen.value.vergleichszaehlungsId
  ) {
    return zaehlstelleStore.getZaehlungById(
      optionen.value.vergleichszaehlungsId
    );
  }
  return undefined;
});

function prepareStreetnames(): void {
  firstStreetname.value = getStreetname(first(availableKnotenarme.value));
}

function getStreetname(knotenarm: LadeKnotenarmDTO | undefined): Array<string> {
  console.log("getStreetname")
  let strasse = "";
  if (knotenarm && knotenarm.strassenname) {
    strasse = knotenarm.strassenname;
  }
  let pieces = [strasse];
  const zeichen = strasse.length;
  // Anzahl Zeichen
  if (zeichen > 17) {
    pieces = ["", ""];
    if (strasse.endsWith("str.")) {
      const index = strasse.indexOf("str.");
      pieces[0] = strasse.substring(0, zeichen - 4);
      pieces[1] = strasse.substring(index, 4);
    }
    // Platz
    if (strasse.endsWith("pl.")) {
      const index = strasse.indexOf("pl.");
      pieces[0] = strasse.substring(0, zeichen - 3);
      pieces[1] = strasse.substring(index, 3);
    }
    // Bindestrich
    if (strasse.includes("-")) {
      // pieces = strasse.split(trenner);
      const index = strasse.indexOf("-");
      pieces[0] = strasse.substring(0, index + 1);
      pieces[1] = strasse.substring(index + 1);
    }
    // Leerzeichen
    else if (strasse.includes(" ")) {
      const index = strasse.indexOf(" ");
      pieces[0] = strasse.substring(0, index + 1);
      pieces[1] = strasse.substring(index + 1);
    }
  }
  return pieces;
}

//
// /**
//  * Zeigt die Informationen zur Zählstelle rechts oben in der Ecke an.
//  */
// function legendeZaehlstellenInfo() {
//   const info = canvas.value.group();
//   const startX =
//     belastungsplanMethods.viewbox -
//     belastungsplanMethods.ecke.value -
//     belastungsplanMethods.spalt.value;
//   const startY = belastungsplanMethods.chartPosition.value / 7;
//
//   info
//     .text((add) => {
//       add.tspan(`Zählstelle ${zaehlstelle.value.nummer}`).font({
//         weight: "bold",
//       });
//       add.tspan(`Stadtbezirk ${zaehlstelle.value.stadtbezirkNummer}`).newLine();
//       add
//         .tspan(
//           `Zähldatum: ${dateUtils.getShortVersionOfDate(
//             new Date(zaehlung.value.datum)
//           )}`
//         )
//         .newLine();
//       if (isDifferenzdatendarstellung.value && vergleichsZaehlung.value) {
//         const localdate = dateUtils.getShortVersionOfDate(
//           new Date(vergleichsZaehlung.value.datum)
//         );
//         add.tspan(`Vergleichszählung: ${localdate}`).newLine();
//       }
//     })
//     .font({
//       family: belastungsplanMethods.fontfamily,
//       size: belastungsplanMethods.maxlineWidth,
//     })
//     .x(startX)
//     .y(startY);
// }
//
// /**
//  * Erzeugt die Benennung der Datenspalten und die entsprechenden Formeln.
//  */
// function legendeSpalten() {
//   const spalten = canvas.value.group();
//   const startX = belastungsplanMethods.chartPosition.value / 5;
//   const startY =
//     belastungsplanMethods.viewbox - belastungsplanMethods.spalt.value * 4.5;
//   const formeln = new Map<string, string>();
//   if (isDifferenzdatendarstellung.value) {
//     formeln.set("KFZ", "KFZ = KFZ (Basis) - KFZ (Vergleich)");
//     formeln.set("SV", "SV = SV (Basis) - SV (Vergleich)");
//     formeln.set("GV", "GV = GV (Basis) - GV (Vergleich)");
//     formeln.set("SV%", "kein SV% beim Vergleich");
//     formeln.set("GV%", "kein GV% beim Vergleich");
//     formeln.set("RAD", "RAD = RAD (Basis) - RAD (Vergleich)");
//     formeln.set(
//       "RAD (KI-Hochrechnung)",
//       "RAD-KI = RAD-KI (Basis) - RAD-KI (Vergleich)"
//     );
//     formeln.set("FUSS", "FUSS = KFZ (Basis) - FUSS (Vergleich)");
//   } else {
//     formeln.set("KFZ", "KFZ = Pkw + Lkw + Lz + Bus + Krad");
//     formeln.set("SV", "SV = Lkw + Lz + Bus");
//     formeln.set("GV", "GV = Lkw + Lz");
//     formeln.set("SV%", "SV-Anteil = SV : KFZ x 100(%)");
//     formeln.set("GV%", "GV-Anteil = GV : KFZ x 100(%)");
//     formeln.set("RAD", "");
//     formeln.set("RAD (KI-Hochrechnung)", "");
//     formeln.set("FUSS", "");
//   }

  // Zählzeit
//   const zeitauswahl: string = optionen.value.zeitauswahl;
//   const zaehlzeitFirstLine: string = zeitauswahl;
//   let zaehlzeitSecondLine = "";
//   if (zeitauswahl === Zeitauswahl.TAGESWERT) {
//     zaehlzeitSecondLine = `${
//       zaehlung.value.zaehldauer === Zaehldauer.DAUER_24_STUNDEN
//         ? zeitblockInfo.get(Zeitblock.ZB_00_24)?.title
//         : "hochgerechnet"
//     }`;
//   } else if (zeitauswahl === Zeitauswahl.BLOCK) {
//     zaehlzeitSecondLine = `${
//       zeitblockInfo.get(optionen.value.zeitblock)?.title
//     }`;
//   } else if (zeitauswahl === Zeitauswahl.STUNDE) {
//     zaehlzeitSecondLine = `${
//       zeitblockStuendlichInfo.get(optionen.value.zeitblock)?.title
//     }`;
//   } else if (
//     zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ ||
//     zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
//     zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
//   ) {
//     const startEndeUhrzeitIntervalls: StartEndeUhrzeitIntervalls =
//       zaehlstelleStore.getStartEndeUhrzeitIntervalls;
//     zaehlzeitSecondLine = `${startEndeUhrzeitIntervalls.startUhrzeitIntervalls} - ${startEndeUhrzeitIntervalls.endeUhrzeitIntervalls} Uhr`;
//   }
//
//   spalten
//     .text((add) => {
//       add.tspan(`${zaehlzeitFirstLine}`).font({ weight: "bold" }).x(startX);
//       add.tspan(`${zaehlzeitSecondLine}`).newLine().x(startX);
//       add.tspan(``).newLine().x(startX);
//
//       // Spaltenüberschriften
//       add
//         .tspan(`${props.data.value1.label}`)
//         .font({ weight: "bold" })
//         .newLine()
//         .x(startX);
//       // Datenblock 2 gefüllt?
//       if (props.data.value2.filled) {
//         add
//           .tspan(`(${props.data.value2.label})`)
//           .font({ weight: "bold" })
//           .x(startX + 60);
//       }
//       // Datenblock 3 gefüllt?
//       if (props.data.value3.filled) {
//         add
//           .tspan(`${props.data.value3.label}`)
//           .font({ weight: "bold" })
//           .x(startX + 120);
//       }
//
//       // Formeln
//       add
//         .tspan(`${formeln.get(props.data.value1.label)}`)
//         .newLine()
//         .x(startX);
//       // Datenblock 2 gefüllt?
//       if (props.data.value2.filled) {
//         add
//           .tspan(`${formeln.get(props.data.value2.label)}`)
//           .newLine()
//           .x(startX);
//       }
//       // Datenblock 3 gefüllt?
//       if (props.data.value3.filled) {
//         add
//           .tspan(`${formeln.get(props.data.value3.label)}`)
//           .newLine()
//           .x(startX);
//       }
//     })
//     .font({
//       family: belastungsplanMethods.fontfamily,
//       size: getLegendLineWidth.value,
//     })
//     .x(startX)
//     .y(startY);
// }
//
// /**
//  * Erzeugt die Legende für die Linienstärke.
//  */
// function legendeLinienStaerke() {
//   const size = canvas.value.group();
//   const startX =
//     belastungsplanMethods.viewbox - belastungsplanMethods.spalt.value * 5;
//   const startY =
//     belastungsplanMethods.viewbox - belastungsplanMethods.spalt.value * 2.5;
//   const path = `M${startX} ${startY}
//                   L${startX + 3 * belastungsplanMethods.spalt.value} ${startY}
//                   L${startX + 3 * belastungsplanMethods.spalt.value} ${startY - belastungsplanMethods.maxlineWidth}
//                   z`;
//   // Legende für die Farbgebung der Linien bei Differenzdatendarstellung
//   // rot = Zunahme
//   // grün = Abnahme
//   if (isDifferenzdatendarstellung.value) {
//     size
//       .rect(lineWidth.value, lineWidth.value)
//       .fill(belastungsplanMethods.zunahmeValueColor)
//       .x(startX)
//       .y(startY + 35);
//     size
//       .rect(lineWidth.value, lineWidth.value)
//       .fill(belastungsplanMethods.abnahmeValueColor)
//       .x(startX)
//       .y(startY + 35 + 5 + lineWidth.value);
//
//     size
//       .text((add) => {
//         add
//           .tspan("Zunahme")
//           .x(startX + 28)
//           .dy(startY + 35 + lineWidth.value);
//       })
//       .font({
//         family: belastungsplanMethods.fontfamily,
//         size: belastungsplanMethods.maxlineWidth,
//       });
//
//     size
//       .text((add) => {
//         add
//           .tspan("Abnahme")
//           .x(startX + 28)
//           .dy(startY + 35 + 5 + lineWidth.value * 2);
//       })
//       .font({
//         family: belastungsplanMethods.fontfamily,
//         size: belastungsplanMethods.maxlineWidth,
//       });
//   }
//
//   size
//     .path(path)
//     .stroke({ width: 2, color: belastungsplanMethods.legendColor })
//     .attr("fill", "none");
//
//   const path2 = `M${startX + 1.5 * belastungsplanMethods.spalt.value} ${startY}
//                    L${startX + 1.5 * belastungsplanMethods.spalt.value} ${
//                      startY - belastungsplanMethods.maxlineWidth / 2
//                    }`;
//   size
//     .path(path2)
//     .stroke({ width: 2, color: belastungsplanMethods.legendColor })
//     .attr("fill", "none");
//
//   const high =
//     highestVerkehrsbeziehungsValue.value +
//     (1000 - (highestVerkehrsbeziehungsValue.value % 1000));
//   size
//     .text((add) => {
//       add
//         .tspan(`${high}`)
//         .x(startX + 3 * belastungsplanMethods.spalt.value)
//         .dy(startY + belastungsplanMethods.maxlineWidth);
//     })
//     .font({
//       family: belastungsplanMethods.fontfamily,
//       size: belastungsplanMethods.maxlineWidth,
//       anchor: "middle",
//     });
//
//   size
//     .text((add) => {
//       add
//         .tspan(`${high / 2}`)
//         .x(startX + 1.5 * belastungsplanMethods.spalt.value)
//         .dy(startY + belastungsplanMethods.maxlineWidth);
//     })
//     .font({
//       family: belastungsplanMethods.fontfamily,
//       size: belastungsplanMethods.maxlineWidth,
//       anchor: "middle",
//     });
// }

/**
 * Die maximale Dicke der Linien wird errechnet. Maßgeblich ist hierbei, ob die Summe des
 * größten "von" oder "nach" Knotenarms, mutlipliziert mit der maximalen Linien Stärke und
 * der jeweiligen Lücke zwischen den Linien, größer oder kleiner als die maximale Breite
 * einer Fahrtrichtung ist. Ist sie kleiner, so kann die maximale Linienbreite verwendet
 * werden, ist sie größer, so muss die Linienbreite so weit reduziert werden, dass alle
 * Verkehrsbeziehungen mit ihrer maximalen Breite aus eine Fahrtrichtung passen.
 */
// function calcMaxLineWidth() {
//   const mw = belastungsplanMethods.maxlineWidth + belastungsplanMethods.lineGap;
//   let mv: number;
//   if (vonMaxValue.value > nachMaxValue.value) {
//     mv = vonMaxValue.value;
//   } else {
//     mv = nachMaxValue.value;
//   }
//   if (mv * mw > belastungsplanMethods.maxFahrtrichtungWidth.value) {
//     // die maximale Breite der Linien muss reduziert werden
//
//     // Der Platz, der nach Abzug der Lücke je Linie bleibt, muss durch die Anzahl
//     // der maximalen linien geteilt werden. Die Breite der Linie wird abgerundet,
//     // damit wir einen glatten Wert für die Textgröße haben.
//     lineWidth.value = Math.ceil(
//       (belastungsplanMethods.maxFahrtrichtungWidth.value -
//         mv * belastungsplanMethods.lineGap) /
//         mv
//     );
//     fahrtrichtungWidth.value =
//       belastungsplanMethods.maxFahrtrichtungWidth.value;
//   } else {
//     // die maximale Breite der Linien kann so bleiben
//     fahrtrichtungWidth.value = mv * mw;
//     lineWidth.value = belastungsplanMethods.maxlineWidth;
//   }
// }

</script>
