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
                {{ secondKnotenarm?.nummer }}
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
                {{ firstKnotenarm?.nummer }}
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
import type LadeVerkehrsbeziehungDTO from "@/types/zaehlung/LadeVerkehrsbeziehungDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { first, last } from "lodash";
import { computed, onMounted, ref, watch } from "vue";

import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import { useQjs } from "@/util/QjsUtils";
import { useStrassennameUtils } from "@/util/StrassennameUtils";

interface Props {
  height: string;
}

defineProps<Props>();

const zaehlstelleStore = useZaehlstelleStore();
const qjs = useQjs();
const strassennameUtils = useStrassennameUtils();

const chosenOptionsCopy = defineModel<ZaehlstelleOptionsDTO>({
  required: true,
});

const activeColor = "#D50000";
const passiveColor = "#9E9E9E";

const firstStreetname = ref<Array<string>>([]);
const secondStreetname = ref<Array<string>>([]);

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

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowOne() {
  if (isSelectedArrowOne.value) {
    chosenOptionsCopy.value.chosenVerkehrsbeziehungen =
      chosenOptionsCopy.value.chosenVerkehrsbeziehungen.filter(
        (vb) =>
          !qjs.patternsArrowOne.some((p) => qjs.matchesArrowPattern(vb, p))
      );
  } else {
    availableKnotenarmNummern.value.forEach((kn) => {
      const pattern = qjs.patternsArrowOne.find((p) => p.von === kn);
      if (pattern) {
        const { von, nach, strassenseite } = pattern;
        chosenOptionsCopy.value.chosenVerkehrsbeziehungen.push({
          von,
          nach,
          strassenseite,
        });
      }
    });
  }
}

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowTwo() {
  if (isSelectedArrowTwo.value) {
    chosenOptionsCopy.value.chosenVerkehrsbeziehungen =
      chosenOptionsCopy.value.chosenVerkehrsbeziehungen.filter(
        (vb) =>
          !qjs.patternsArrowTwo.some((p) => qjs.matchesArrowPattern(vb, p))
      );
  } else {
    availableKnotenarmNummern.value.forEach((kn) => {
      const pattern = qjs.patternsArrowTwo.find((p) => p.von === kn);
      if (pattern) {
        const { von, nach, strassenseite } = pattern;
        chosenOptionsCopy.value.chosenVerkehrsbeziehungen.push({
          von,
          nach,
          strassenseite,
        });
      }
    });
  }
}

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowThree() {
  if (isSelectedArrowThree.value) {
    chosenOptionsCopy.value.chosenVerkehrsbeziehungen =
      chosenOptionsCopy.value.chosenVerkehrsbeziehungen.filter(
        (vb) =>
          !qjs.patternsArrowThree.some((p) => qjs.matchesArrowPattern(vb, p))
      );
  } else {
    availableKnotenarmNummern.value.forEach((kn) => {
      const pattern = qjs.patternsArrowThree.find((p) => p.von === kn);
      if (pattern) {
        const { von, nach, strassenseite } = pattern;
        chosenOptionsCopy.value.chosenVerkehrsbeziehungen.push({
          von,
          nach,
          strassenseite,
        });
      }
    });
  }
}

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowFour() {
  if (isSelectedArrowFour.value) {
    chosenOptionsCopy.value.chosenVerkehrsbeziehungen =
      chosenOptionsCopy.value.chosenVerkehrsbeziehungen.filter(
        (vb) =>
          !qjs.patternsArrowFour.some((p) => qjs.matchesArrowPattern(vb, p))
      );
  } else {
    availableKnotenarmNummern.value.forEach((kn) => {
      const pattern = qjs.patternsArrowFour.find((p) => p.von === kn);
      if (pattern) {
        const { von, nach, strassenseite } = pattern;
        chosenOptionsCopy.value.chosenVerkehrsbeziehungen.push({
          von,
          nach,
          strassenseite,
        });
      }
    });
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
  { deep: true, immediate: true }
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
});

function resetForm(): void {
  firstStreetname.value = [];
  secondStreetname.value = [];
}

function prepareStreetnames(): void {
  firstStreetname.value = strassennameUtils.getStreetLines(
    firstKnotenarm.value
  );
  secondStreetname.value = strassennameUtils.getStreetLines(
    secondKnotenarm.value
  );
}
</script>
