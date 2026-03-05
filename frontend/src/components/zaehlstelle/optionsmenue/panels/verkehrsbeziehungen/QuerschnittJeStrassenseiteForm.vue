<template>
  <v-sheet
      width="100%"
      :height="height"
      :max-height="height"
      color="transparent"
      class="d-flex flex-row justify-center overflow-y-auto"
  >
    <svg
        :height="height"
        :width="height"
        viewBox="0 0 1400 1400"
        preserveAspectRatio="xMidYMid"
        fill-rule="evenodd"
        stroke-width="28.222"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
    >
      <g
          id="querschnitt"
          :transform="rotateSvg"
      >
        <g id="description">
          <g id="second_street">
            <text
                v-if="secondStreetname.length === 1"
                id="singlerow2"
                xml:space="preserve"
                style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 33.4058px;
                font-family: sans-serif;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: start;
                fill: #000000;
                stroke-width: 39.1848;
              "
                x="1332.2212"
                y="712.01141"
            >
              <tspan
                  id="tspan21"
                  style="stroke-width: 38.9194; unicode-bidi: plaintext"
                  x="1332.2212"
                  y="712.01141"
              >
                {{ secondStreetname[0] }}
              </tspan>
            </text>
            <text
                v-if="secondStreetname.length === 2"
                id="multirow2"
                xml:space="preserve"
                style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 33.4058px;
                font-family: sans-serif;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: start;
                fill: #000000;
                stroke-width: 39.1848;
              "
                y="691.19336"
                x="1332.2212"
            >
              <tspan
                  id="tspan17"
                  style="stroke-width: 39.1848; unicode-bidi: plaintext"
                  x="1332.2212"
                  y="691.19336"
              >
                {{ secondStreetname[0] }}
              </tspan>
              <tspan
                  id="tspan18"
                  style="stroke-width: 39.1848; unicode-bidi: plaintext"
                  x="1332.2212"
                  y="732.95062"
              >
                {{ secondStreetname[1] }}
              </tspan>
            </text>
          </g>
          <g id="second_number">
            <ellipse
                id="ellipse13"
                style="
                fill: none;
                fill-opacity: 1;
                stroke: #000000;
                stroke-width: 1.02435;
                stroke-dasharray: none;
                stroke-opacity: 1;
              "
                cx="924"
                cy="700"
                rx="20.487822"
                ry="20.487823"
            />
            <text
                id="text14"
                xml:space="preserve"
                style="
                font-size: 33.4058px;
                font-family: sans-serif;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 52.2711;
              "
                x="913.19183"
                y="711.73895"
            >
              <tspan
                  id="tspan14"
                  x="913.19183"
                  y="711.73895"
                  style="stroke-width: 52.2711"
              >
                {{ secondNode?.nummer }}
              </tspan>
            </text>
          </g>
          <g id="first_street">
            <text
                v-if="firstStreetname.length === 1"
                id="singlerow"
                xml:space="preserve"
                style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 33.4058px;
                font-family: sans-serif;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 39.1848;
              "
                x="68.368858"
                y="712.17938"
            >
              <tspan
                  id="tspan15"
                  style="stroke-width: 39.1848"
                  x="68.368858"
                  y="712.17938"
              >
                {{ firstStreetname[0] }}
              </tspan>
            </text>
            <text
                v-if="firstStreetname.length === 2"
                id="multirow"
                xml:space="preserve"
                style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 33.4058px;
                font-family: sans-serif;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 39.1848;
              "
                x="68.368858"
                y="691.19336"
            >
              <tspan
                  id="tspan20"
                  style="stroke-width: 39.1848"
                  x="68.368858"
                  y="691.19336"
              >
                {{ firstStreetname[0] }}
              </tspan>
              <tspan
                  id="tspan1"
                  style="stroke-width: 39.1848"
                  x="68.368858"
                  y="732.95062"
              >
                {{ firstStreetname[1] }}
              </tspan>
            </text>
          </g>
          <g id="first_number">
            <ellipse
                id="ellipse3"
                style="
                fill: none;
                fill-opacity: 1;
                stroke: #000000;
                stroke-width: 1.02435;
                stroke-dasharray: none;
                stroke-opacity: 1;
              "
                cx="476"
                cy="700"
                rx="20.487822"
                ry="20.487823"
            />
            <text
                id="text2"
                xml:space="preserve"
                style="
                font-size: 33.4058px;
                font-family: sans-serif;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 52.2711;
              "
                y="711.73895"
                x="465.80084"
            >
              <tspan
                  id="tspan2"
                  style="stroke-width: 52.2711"
                  x="465.80084"
                  y="711.73895"
              >
                {{ firstNode?.nummer }}
              </tspan>
            </text>
          </g>
        </g>
        <g id="arrows">
          <g
              v-if="isAvailableArrowFour"
              id="arrow4"
              style="cursor: pointer"
              @click="handleClickOnQuerschnittsverkehrJeStrassenseiteArrowFour()"
          >
            <path
                id="path4"
                :fill="calculateColorOfVerkehrsbeziehungArrowFour"
                d="m 69.999999,860.99999 v -28 H 1330 v 27.997 z"
            />
            <path
                id="spike4"
                :fill="calculateColorOfVerkehrsbeziehungArrowFour"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                transform="matrix(0.09192953,0,0,0.07964786,-38.395512,-544.45264)"
            />
          </g>
          <g
              v-if="isAvailableArrowThree"
              id="arrow3"
              style="cursor: pointer"
              @click="handleClickOnQuerschnittsverkehrJeStrassenseiteArrowThree()"
          >
            <path
                id="path3"
                :fill="calculateColorOfVerkehrsbeziehungArrowThree()"
                d="m 69.999999,804.99999 v -28 H 1330 v 27.997 z"
            />
            <path
                id="spike3"
                :fill="calculateColorOfVerkehrsbeziehungArrowThree()"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                transform="matrix(-0.09192953,0,0,-0.07964786,1438.3955,2182.4526)"
            />
          </g>
          <g
              v-if="isAvailableArrowTwo"
              id="arrow2"
              style="cursor: pointer"
              @click="handleClickOnQuerschnittsverkehrJeStrassenseiteArrowTwo()"
          >
            <path
                id="path2"
                :fill="calculateColorOfVerkehrsbeziehungArrowTwo()"
                d="M 69.999999,623 V 595 H 1330 v 27.997 z"
            />
            <path
                id="spike2"
                :fill="calculateColorOfVerkehrsbeziehungArrowTwo()"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                transform="matrix(0.09192953,0,0,0.07964786,-38.395512,-782.45264)"
            />
          </g>
          <g
              v-if="isAvailableArrowOne"
              id="arrow1"
              style="cursor: pointer"
              @click="handleClickOnQuerschnittsverkehrJeStrassenseiteArrowOne()"
          >
            <path
                id="path1"
                :fill="calculateColorOfVerkehrsbeziehungArrowOne()"
                d="M 69.999999,567 V 539 H 1330 v 27.998 z"
            />
            <path
                id="spike1"
                :fill="calculateColorOfVerkehrsbeziehungArrowOne()"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                transform="matrix(-0.09192953,0,0,-0.07964786,1438.3955,1944.4526)"
            />
          </g>
        </g>
      </g>
    </svg>

  </v-sheet>
</template>

<script setup lang="ts">

import { first, last } from "lodash";
import {computed, onMounted, ref, watch} from "vue";

import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import KnotenarmComparator from "@/util/KnotenarmComparator";
import {useZaehlstelleStore} from "@/store/ZaehlstelleStore";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";

interface Props {
  height: string;
}

defineProps<Props>();

const zaehlstelleStore = useZaehlstelleStore();

const chosenOptionsCopy = defineModel<ZaehlstelleOptionsDTO>({
  required: true,
});

const activeColor = "#D50000";
const passiveColor = "#9E9E9E";

const firstStreetname = ref<Array<string>>([]);
const secondStreetname = ref<Array<string>>([]);

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

const availableNodeNumbers = computed(() => {
  return availableNodes.value.map((arm) => arm.nummer);
});

const availableNodes = computed(() => {
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

const firstNode = computed(() => {
  return first(availableNodes.value);
});

const secondNode = computed(() => {
  return last(availableNodes.value);
});

const rotateSvg = computed(() => {
  // Die Viewbox der SVG liegt bei 1400 1400. Die Rotation muss in deren Zentrum stattfinden, daher 700 700
  let rotation = "rotate(0,700,700)";
  if (availableNodeNumbers.value.includes(1)) {
    rotation = "rotate(-90,700,700)";
  }
  if (availableNodeNumbers.value.includes(2)) {
    rotation = "rotate(0,700,700)";
  }
  if (availableNodeNumbers.value.includes(5)) {
    rotation = "rotate(-45,700,700)";
  }
  if (availableNodeNumbers.value.includes(6)) {
    rotation = "rotate(45,700,700)";
  }
  return rotation;
});

const isAvailableArrowOne = computed(() => {
  return hasAnyArrowPatternIn(activeZaehlung.value?.verkehrsbeziehungen, arrowOnePatterns);
})

const isAvailableArrowTwo = computed(() => {
  return hasAnyArrowPatternIn(activeZaehlung.value?.verkehrsbeziehungen, arrowTwoPatterns);
})

const isAvailableArrowThree = computed(() => {
  return hasAnyArrowPatternIn(activeZaehlung.value?.verkehrsbeziehungen, arrowThreePatterns);
})

const isAvailableArrowFour = computed(() => {
  return hasAnyArrowPatternIn(activeZaehlung.value?.verkehrsbeziehungen, arrowFourPatterns);
})

const isSelectedArrowOne = computed(() => {
  return hasAnyArrowPatternIn(chosenOptionsCopy.value.verkehrsbeziehungenQJS, arrowOnePatterns);
})

const isSelectedArrowTwo = computed(() => {
  return hasAnyArrowPatternIn(chosenOptionsCopy.value.verkehrsbeziehungenQJS, arrowTwoPatterns);
})

const isSelectedArrowThree = computed(() => {
  return hasAnyArrowPatternIn(chosenOptionsCopy.value.verkehrsbeziehungenQJS, arrowThreePatterns);
})

const isSelectedArrowFour = computed(() => {
  return hasAnyArrowPatternIn(chosenOptionsCopy.value.verkehrsbeziehungenQJS, arrowFourPatterns);
})

function matchesArrowPattern(verkehrsbeziehung, arrowPattern) {
  return verkehrsbeziehung.knotenarm === arrowPattern.knotenarm && verkehrsbeziehung.nach === arrowPattern.nach && verkehrsbeziehung.strassenseite === arrowPattern.strassenseite;
}

function hasAnyArrowPatternIn(verkehrsbeziehungen, arrowPatterns) {
  return !!verkehrsbeziehungen?.some(vb => arrowPatterns.some(p => matchesArrowPattern(vb, p)));
}

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowOne() {
  if (isSelectedArrowOne.value) {
    chosenOptionsCopy.value.verkehrsbeziehungenQJS = chosenOptionsCopy.value.verkehrsbeziehungenQJS
        .filter(vb => !arrowOnePatterns.some(p => matchesArrowPattern(vb, p)));
  } else {
    availableNodeNumbers.value.forEach((kn) => {
      const pattern = arrowOnePatterns.find((p) => p.knotenarm === kn);
      if (pattern) {
        const { knotenarm, nach, strassenseite } = pattern;
        chosenOptionsCopy.value.verkehrsbeziehungenQJS.push({ knotenarm, nach, strassenseite });
      }
    })
  }
}

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowTwo() {
  if (isSelectedArrowTwo.value) {
    chosenOptionsCopy.value.verkehrsbeziehungenQJS = chosenOptionsCopy.value.verkehrsbeziehungenQJS
        .filter(vb => !arrowTwoPatterns.some(p => matchesArrowPattern(vb, p)));
  } else {
    availableNodeNumbers.value.forEach((kn) => {
      const pattern = arrowTwoPatterns.find((p) => p.knotenarm === kn);
      if (pattern) {
        const { knotenarm, nach, strassenseite } = pattern;
        chosenOptionsCopy.value.verkehrsbeziehungenQJS.push({ knotenarm, nach, strassenseite });
      }
    })
  }
}

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowThree() {
  if (isSelectedArrowThree.value) {
    chosenOptionsCopy.value.verkehrsbeziehungenQJS = chosenOptionsCopy.value.verkehrsbeziehungenQJS
        .filter(vb => !arrowThreePatterns.some(p => matchesArrowPattern(vb, p)));
  } else {
    availableNodeNumbers.value.forEach((kn) => {
      const pattern = arrowThreePatterns.find((p) => p.knotenarm === kn);
      if (pattern) {
        const { knotenarm, nach, strassenseite } = pattern;
        chosenOptionsCopy.value.verkehrsbeziehungenQJS.push({ knotenarm, nach, strassenseite });
      }
    })
  }
}

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowFour() {
  if (isSelectedArrowFour.value) {
    chosenOptionsCopy.value.verkehrsbeziehungenQJS = chosenOptionsCopy.value.verkehrsbeziehungenQJS
        .filter(vb => !arrowFourPatterns.some(p => matchesArrowPattern(vb, p)));
  } else {
    availableNodeNumbers.value.forEach((kn) => {
      const pattern = arrowFourPatterns.find((p) => p.knotenarm === kn);
      if (pattern) {
        const { knotenarm, nach, strassenseite } = pattern;
        chosenOptionsCopy.value.verkehrsbeziehungenQJS.push({ knotenarm, nach, strassenseite });
      }
    })
  }
}

onMounted(() => {
  resetForm();
  prepareStreetnames();
});

watch(
    () => activeZaehlung.value.knotenarme,
    () => {
      resetForm();
      prepareStreetnames();
    },
    {deep: true, immediate: true}
);

function calculateColorOfVerkehrsbeziehungArrowOne(): string | undefined {
  return isSelectedArrowOne.value ? activeColor : passiveColor;
}

function calculateColorOfVerkehrsbeziehungArrowTwo(): string | undefined {
  return isSelectedArrowTwo.value ? activeColor : passiveColor;
}

function calculateColorOfVerkehrsbeziehungArrowThree(): string | undefined {
  return isSelectedArrowThree.value ? activeColor : passiveColor;
}

const calculateColorOfVerkehrsbeziehungArrowFour = computed(() => {
  return isSelectedArrowFour.value ? activeColor : passiveColor;
})

function resetForm(): void {
  firstStreetname.value = [];
  secondStreetname.value = [];
}

function prepareStreetnames(): void {
  firstStreetname.value = getStreetname(firstNode.value);
  secondStreetname.value = getStreetname(secondNode.value);
}

function getStreetname(knotenarm: LadeKnotenarmDTO | undefined): Array<string> {
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
</script>
