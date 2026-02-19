<template>
  <v-sheet
    width="100%"
    :height="height"
    :max-height="height"
    color="transparent"
    class="d-flex flex-row justify-center overflow-y-auto"
  >
    <svg
      v-if="isKnotenLageFormValid"
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
            id="arrow4"
            style="cursor: pointer"
            @click="activateArrow('4')"
          >
            <path
              id="path4"
              :fill="calculateColor('4')"
              d="m 69.999999,860.99999 v -28 H 1330 v 27.997 z"
            />
            <path
              id="spike4"
              :fill="calculateColor('4')"
              d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
              transform="matrix(0.09192953,0,0,0.07964786,-38.395512,-544.45264)"
            />
          </g>
          <g
            id="arrow3"
            style="cursor: pointer"
            @click="activateArrow('3')"
          >
            <path
              id="path3"
              :fill="calculateColor('3')"
              d="m 69.999999,804.99999 v -28 H 1330 v 27.997 z"
            />
            <path
              id="spike3"
              :fill="calculateColor('3')"
              d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
              transform="matrix(-0.09192953,0,0,-0.07964786,1438.3955,2182.4526)"
            />
          </g>
          <g
            id="arrow2"
            style="cursor: pointer"
            @click="activateArrow('2')"
          >
            <path
              id="path2"
              :fill="calculateColor('2')"
              d="M 69.999999,623 V 595 H 1330 v 27.997 z"
            />
            <path
              id="spike2"
              :fill="calculateColor('2')"
              d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
              transform="matrix(0.09192953,0,0,0.07964786,-38.395512,-782.45264)"
            />
          </g>
          <g
            id="arrow1"
            style="cursor: pointer"
            @click="activateArrow('1')"
          >
            <path
              id="path1"
              :fill="calculateColor('1')"
              d="M 69.999999,567 V 539 H 1330 v 27.998 z"
            />
            <path
              id="spike1"
              :fill="calculateColor('1')"
              d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
              transform="matrix(-0.09192953,0,0,-0.07964786,1438.3955,1944.4526)"
            />
          </g>
        </g>
      </g>
    </svg>

    <v-banner
      v-else
      lines="one"
      width="100%"
      text="Es wurden nicht exakt 2 gegenüberliegende Knotenarme ausgewählt."
    >
      <template #prepend>
        <v-icon
          icon="mdi-alert-decagram-outline"
          size="36"
          color="error"
        />
      </template>
    </v-banner>
  </v-sheet>
</template>

<script setup lang="ts">

import { first, isEmpty, last } from "lodash";
import { computed, onMounted, ref, watch } from "vue";

import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";

const zaehlstelleStore = useZaehlstelleStore();

interface Props {
  height: string;
}
defineProps<Props>();

const isKnotenLageFormValid = ref(true); // TODO: needed?

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const activeColor = "#D50000";
const passiveColor = "#9E9E9E";

// const eventbus = useEventbus();
const selectedKnotenarme = computed(() => {
  // return eventbus.getSelectedKnotenarme;
  return ["1"]; // TODO
});
const firstStreetname = ref<Array<string>>([]);
const secondStreetname = ref<Array<string>>([]);

const availableNodeNumbers = computed(() => {
  return availableNodes.value.map((arm) => arm.nummer);
});
const availableNodes = computed(() => {
  // return activeZaehlung.value.knotenarme
  //   .toSorted(KnotenarmComparator.sortByNumber)
  //   .reverse();
  return activeZaehlung.value.knotenarme; // TODO
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
  { deep: true, immediate: true }
);

/**
 * Wenn die Nummer des Pfeils im Array gefunden wurde, wird diese in der Grafik in der "activeColor" dargestellt,
 * ansonsten in der passiveColor.
 */
function calculateColor(arrow: string): string | undefined {
  let color = passiveColor;
  if (
    !isEmpty(
      selectedKnotenarme.value.filter(
        (selectedArrow) => selectedArrow === arrow
      )
    )
  ) {
    color = activeColor;
  }
  return color;
}

function activateArrow(arrow: string): void {
  // eventbus.activateKnotenarm(arrow);
  console.log("TODO: activateArrow: " + arrow);
}

function resetForm(): void {
  // eventbus.resetSelectedKnotenarme();
  console.log("TODO: resetSelectedKnotenarme")
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
