<template>
  <v-sheet
    width="100%"
    :height="dimension"
    :max-height="dimension"
    color="transparent"
    class="d-flex flex-row justify-center overflow-y-auto"
  >
    <svg
      ref="svgRef"
      :height="dimension"
      :width="dimension"
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
        <g id="knotenarmnummern">
          <g id="knotenarmnummer1">
            <ellipse
              id="knotenarmnummer1_circle"
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
              id="knotenarmnummer1_text"
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
                id="knotenarmnummer1_tspan"
                style="stroke-width: 52.2711"
                x="465.80084"
                y="711.73895"
              >
                {{ firstKnotenarm?.nummer }}
              </tspan>
            </text>
          </g>
          <g id="knotenarmnummer2">
            <ellipse
              id="knotenarmnummer2_circle"
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
              id="knotenarmnummer2_text"
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
                id="knotenarmnummer2_tspan"
                x="913.19183"
                y="711.73895"
                style="stroke-width: 52.2711"
              >
                {{ secondKnotenarm?.nummer }}
              </tspan>
            </text>
          </g>
        </g>
        <g id="arrows">
          <g
            v-if="isAvailableArrowOne"
            id="arrow1"
          >
            <path
              id="arrow1_line"
              :fill="colorOfVerkehrsbeziehungArrowOne"
              d="M 69.999999,567 V 539 H 1330 v 27.998 z"
            />
            <path
              id="arrow1_tip"
              :fill="colorOfVerkehrsbeziehungArrowOne"
              d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
              transform="matrix(-0.09192953,0,0,-0.07964786,1438.3955,1944.4526)"
            />
          </g>
          <g
            v-if="isAvailableArrowTwo"
            id="arrow2"
          >
            <path
              id="arrow2_line"
              :fill="colorOfVerkehrsbeziehungArrowTwo"
              d="M 69.999999,623 V 595 H 1330 v 27.997 z"
            />
            <path
              id="arrow2_tip"
              :fill="colorOfVerkehrsbeziehungArrowTwo"
              d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
              transform="matrix(0.09192953,0,0,0.07964786,-38.395512,-782.45264)"
            />
          </g>
          <g
            v-if="isAvailableArrowThree"
            id="arrow3"
          >
            <path
              id="arrow3_line"
              :fill="colorOfVerkehrsbeziehungArrowThree"
              d="m 69.999999,804.99999 v -28 H 1330 v 27.997 z"
            />
            <path
              id="arrow3_tip"
              :fill="colorOfVerkehrsbeziehungArrowThree"
              d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
              transform="matrix(-0.09192953,0,0,-0.07964786,1438.3955,2182.4526)"
            />
          </g>
          <g
            v-if="isAvailableArrowFour"
            id="arrow4"
          >
            <path
              id="arrow4_line"
              :fill="colorOfVerkehrsbeziehungArrowFour"
              d="m 69.999999,860.99999 v -28 H 1330 v 27.997 z"
            />
            <path
              id="arrow4_tip"
              :fill="colorOfVerkehrsbeziehungArrowFour"
              d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
              transform="matrix(0.09192953,0,0,0.07964786,-38.395512,-544.45264)"
            />
          </g>
        </g>
      </g>
    </svg>
  </v-sheet>
</template>

<script setup lang="ts">
import type LadeVerkehrsbeziehungDTO from "@/types/zaehlung/LadeVerkehrsbeziehungDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type LadeBelastungsplanQjsDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanQjsDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { first, last } from "lodash";
import { computed, nextTick, onMounted, ref, watch } from "vue";

import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import { useQjs } from "@/util/QjsUtils";

interface Props {
  data: LadeBelastungsplanQjsDTO;
  dimension: string;
}

const props = withDefaults(defineProps<Props>(), {
  dimension: "600vh",
});

const emits = defineEmits<{
  (e: "print", v: Blob): void;
}>();

const zaehlstelleStore = useZaehlstelleStore();
const qjs = useQjs();

const chosenOptionsCopy = defineModel<ZaehlstelleOptionsDTO>({
  required: true,
});

const svgRef = ref<SVGSVGElement | null>(null);

const activeColor = "#000000";
const passiveColor = "#9E9E9E";

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const availableKnotenarmNummern = computed(() => {
  return qjs.computeAvailableKnotenarmNummernFromZaehlung(activeZaehlung.value);
});

const availableKnotenarme = computed(() => {
  return qjs.computeAvailableKnotenarme(activeZaehlung.value);
});

const firstKnotenarm = computed(() => {
  return first(availableKnotenarme.value);
});

const secondKnotenarm = computed(() => {
  return last(availableKnotenarme.value);
});

const rotateSvg = qjs.rotateSvgFor(availableKnotenarmNummern);

const isAvailableArrowOne = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    convertToVerkehrsbeziehungenQjs(activeZaehlung.value?.verkehrsbeziehungen),
    qjs.patternsArrowOne
  );
});

const isAvailableArrowTwo = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    convertToVerkehrsbeziehungenQjs(activeZaehlung.value?.verkehrsbeziehungen),
    qjs.patternsArrowTwo
  );
});

const isAvailableArrowThree = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    convertToVerkehrsbeziehungenQjs(activeZaehlung.value?.verkehrsbeziehungen),
    qjs.patternsArrowThree
  );
});

const isAvailableArrowFour = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    convertToVerkehrsbeziehungenQjs(activeZaehlung.value?.verkehrsbeziehungen),
    qjs.patternsArrowFour
  );
});

const isSelectedArrowOne = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    chosenOptionsCopy.value.chosenVerkehrsbeziehungen,
    qjs.patternsArrowOne
  );
});

const isSelectedArrowTwo = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    chosenOptionsCopy.value.chosenVerkehrsbeziehungen,
    qjs.patternsArrowTwo
  );
});

const isSelectedArrowThree = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    chosenOptionsCopy.value.chosenVerkehrsbeziehungen,
    qjs.patternsArrowThree
  );
});

const isSelectedArrowFour = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    chosenOptionsCopy.value.chosenVerkehrsbeziehungen,
    qjs.patternsArrowFour
  );
});

function convertToVerkehrsbeziehungenQjs(
  verkehrsbeziehungen: LadeVerkehrsbeziehungDTO[] | undefined
) {
  return (
    verkehrsbeziehungen?.map(({ von, nach, strassenseite }) => ({
      von,
      nach,
      strassenseite,
    })) ?? []
  );
}

onMounted(() => {
  nextTick(() => emitSvgAsBlob());
});

const colorOfVerkehrsbeziehungArrowOne = computed(() =>
  isSelectedArrowOne.value ? activeColor : passiveColor
);

const colorOfVerkehrsbeziehungArrowTwo = computed(() =>
  isSelectedArrowTwo.value ? activeColor : passiveColor
);

const colorOfVerkehrsbeziehungArrowThree = computed(() =>
  isSelectedArrowThree.value ? activeColor : passiveColor
);

const colorOfVerkehrsbeziehungArrowFour = computed(() =>
  isSelectedArrowFour.value ? activeColor : passiveColor
);

/**
 * Serialisiert das SVG Element, um einen Blob für die Print-Funktion zu erstellen.
 */
function serializeSvgElement(svgEl: SVGSVGElement): string {
  const clone = svgEl.cloneNode(true) as SVGSVGElement;

  let width = svgEl.getBoundingClientRect().width;
  let height = svgEl.getBoundingClientRect().height;

  if (!width || !height) {
    width = 600;
    height = 600;
  }

  clone.setAttribute("width", `${Math.round(width)}`);
  clone.setAttribute("height", `${Math.round(height)}`);

  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(clone);

  const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n';
  if (!svgString.startsWith("<?xml")) {
    svgString = xmlDeclaration + svgString;
  }
  return svgString;
}

/**
 * Erzeugt einen Blob aus dem aktuellen SVG und emittiert ihn.
 */
function emitSvgAsBlob(): void {
  const svgEl = svgRef.value;
  if (!svgEl) {
    return;
  }
  const svgString = serializeSvgElement(svgEl);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  emits("print", blob);
}

watch(
  () => chosenOptionsCopy.value.chosenVerkehrsbeziehungen,
  () => {
    nextTick(() => emitSvgAsBlob());
  }
);
</script>
