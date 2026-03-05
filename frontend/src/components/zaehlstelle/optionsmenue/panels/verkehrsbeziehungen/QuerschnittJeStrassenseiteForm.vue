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

import {cloneDeep, first, last } from "lodash";
import {computed, onMounted, reactive, ref, watch} from "vue";

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

const chosenOptions = defineModel<ZaehlstelleOptionsDTO>({
  required: true,
});
const chosenOptionsCopy = reactive(cloneDeep(chosenOptions.value)) // cloneDeep aus lodash/immer o.ä.


const activeColor = "#D50000";
const passiveColor = "#9E9E9E";

const firstStreetname = ref<Array<string>>([]);
const secondStreetname = ref<Array<string>>([]);

// const isSelectedArrowOne = ref(true)
// const isSelectedArrowTwo = ref(true)
// const isSelectedArrowThree = ref(true)
// const isSelectedArrowFour = ref(true)

// const selectedVerkehrsbeziehungen = computed(() => {
//   return activeZaehlung.value.verkehrsbeziehungen;
// });

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const availableNodeNumbers = computed(() => {
  return availableNodes.value.map((arm) => arm.nummer);
});
const availableNodes = computed(() => {
  // console.log("availableNodes")
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
  return !!activeZaehlung.value?.verkehrsbeziehungen?.some((vb) => {
    return (
        (vb.knotenarm === 1 && vb.nach === 3 && vb.strassenseite === Himmelsrichtung.W) ||
        (vb.knotenarm === 2 && vb.nach === 4 && vb.strassenseite === Himmelsrichtung.N) ||
        (vb.knotenarm === 5 && vb.nach === 7 && vb.strassenseite === Himmelsrichtung.NW) ||
        (vb.knotenarm === 6 && vb.nach === 8 && vb.strassenseite === Himmelsrichtung.SO)
    );
  });
})

const isAvailableArrowTwo = computed(() => {
  return !!activeZaehlung.value?.verkehrsbeziehungen?.some((vb) => {
    return (
        (vb.knotenarm === 3 && vb.nach === 1 && vb.strassenseite === Himmelsrichtung.W) ||
        (vb.knotenarm === 4 && vb.nach === 2 && vb.strassenseite === Himmelsrichtung.N) ||
        (vb.knotenarm === 7 && vb.nach === 5 && vb.strassenseite === Himmelsrichtung.NW) ||
        (vb.knotenarm === 8 && vb.nach === 6 && vb.strassenseite === Himmelsrichtung.SO)
    );
  });
})

const isAvailableArrowThree = computed(() => {
  return !!activeZaehlung.value?.verkehrsbeziehungen?.some((vb) => {
    return (
        (vb.knotenarm === 1 && vb.nach === 3 && vb.strassenseite === Himmelsrichtung.O) ||
        (vb.knotenarm === 2 && vb.nach === 4 && vb.strassenseite === Himmelsrichtung.S) ||
        (vb.knotenarm === 5 && vb.nach === 7 && vb.strassenseite === Himmelsrichtung.SO) ||
        (vb.knotenarm === 6 && vb.nach === 8 && vb.strassenseite === Himmelsrichtung.SW)
    );
  });
})

const isAvailableArrowFour = computed(() => {
  return !!activeZaehlung.value?.verkehrsbeziehungen?.some((vb) => {
    return (
        (vb.knotenarm === 3 && vb.nach === 1 && vb.strassenseite === Himmelsrichtung.O) ||
        (vb.knotenarm === 4 && vb.nach === 2 && vb.strassenseite === Himmelsrichtung.S) ||
        (vb.knotenarm === 7 && vb.nach === 5 && vb.strassenseite === Himmelsrichtung.SO) ||
        (vb.knotenarm === 8 && vb.nach === 6 && vb.strassenseite === Himmelsrichtung.SW)
    );
  });
})

const isSelectedArrowFour = computed(() => {

  const patterns = [
    { knotenarm: 1, nach: 3, strassenseite: Himmelsrichtung.O },
    { knotenarm: 4, nach: 2, strassenseite: Himmelsrichtung.S },
      // TODO
  ]

  return chosenOptionsCopy.verkehrsbeziehungenQJS
    .some(vb => patterns.some(p => vb.knotenarm === p.knotenarm && vb.nach === p.nach && vb.strassenseite === p.strassenseite))
})

// function createVerkehrsbeziehungArrowOne(): VerkehrsbeziehungDTO {
//   const verkehrsbeziehung = {} as VerkehrsbeziehungDTO;
//   if (availableNodeNumbers.value.includes(1)) {
//     verkehrsbeziehung.von = 1;
//     verkehrsbeziehung.nach = 3;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.W;
//   }
//   if (availableNodeNumbers.value.includes(2)) {
//     verkehrsbeziehung.von = 2;
//     verkehrsbeziehung.nach = 4;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.N;
//   }
//   if (availableNodeNumbers.value.includes(5)) {
//     verkehrsbeziehung.von = 5;
//     verkehrsbeziehung.nach = 7;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.NW;
//   }
//   if (availableNodeNumbers.value.includes(6)) {
//     verkehrsbeziehung.von = 6;
//     verkehrsbeziehung.nach = 8;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.NO;
//   }
//   return verkehrsbeziehung;
// }
//
// function createVerkehrsbeziehungArrowTwo(): VerkehrsbeziehungDTO {
//   const verkehrsbeziehung = {} as VerkehrsbeziehungDTO;
//   if (availableNodeNumbers.value.includes(1)) {
//     verkehrsbeziehung.von = 3;
//     verkehrsbeziehung.nach = 1;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.W;
//   }
//   if (availableNodeNumbers.value.includes(2)) {
//     verkehrsbeziehung.von = 4;
//     verkehrsbeziehung.nach = 2;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.N;
//   }
//   if (availableNodeNumbers.value.includes(5)) {
//     verkehrsbeziehung.von = 7;
//     verkehrsbeziehung.nach = 5;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.NW;
//   }
//   if (availableNodeNumbers.value.includes(6)) {
//     verkehrsbeziehung.von = 8;
//     verkehrsbeziehung.nach = 6;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.NO;
//   }
//   return verkehrsbeziehung;
// }
//
// function createVerkehrsbeziehungArrowThree(): VerkehrsbeziehungDTO {
//   const verkehrsbeziehung = {} as VerkehrsbeziehungDTO;
//   if (availableNodeNumbers.value.includes(1)) {
//     verkehrsbeziehung.von = 1;
//     verkehrsbeziehung.nach = 3;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.O;
//   }
//   if (availableNodeNumbers.value.includes(2)) {
//     verkehrsbeziehung.von = 2;
//     verkehrsbeziehung.nach = 4;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.S;
//   }
//   if (availableNodeNumbers.value.includes(5)) {
//     verkehrsbeziehung.von = 5;
//     verkehrsbeziehung.nach = 7;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.SO;
//   }
//   if (availableNodeNumbers.value.includes(6)) {
//     verkehrsbeziehung.von = 6;
//     verkehrsbeziehung.nach = 8;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.SW;
//   }
//   return verkehrsbeziehung;
// }
//
// function createVerkehrsbeziehungArrowFour(): VerkehrsbeziehungDTO {
//   const verkehrsbeziehung = {} as VerkehrsbeziehungDTO;
//   if (availableNodeNumbers.value.includes(1)) {
//     verkehrsbeziehung.von = 3;
//     verkehrsbeziehung.nach = 1;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.O;
//   }
//   if (availableNodeNumbers.value.includes(2)) {
//     verkehrsbeziehung.von = 4;
//     verkehrsbeziehung.nach = 2;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.S;
//   }
//   if (availableNodeNumbers.value.includes(5)) {
//     verkehrsbeziehung.von = 7;
//     verkehrsbeziehung.nach = 5;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.SO;
//   }
//   if (availableNodeNumbers.value.includes(6)) {
//     verkehrsbeziehung.von = 8;
//     verkehrsbeziehung.nach = 6;
//     verkehrsbeziehung.strassenseite = Himmelsrichtung.SW;
//   }
//   return verkehrsbeziehung;
// }

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowOne() {
//   const verkehrsbeziehung = createVerkehrsbeziehungArrowOne();
//
//   const index =
//     findIndexInSelectedVerkehrsbeziehungForClickedVerkehrsbeziehung(
//       verkehrsbeziehung
//     );
//
//   const verkehrsbeziehungen = toArray(
//     cloneDeep(selectedVerkehrsbeziehungen.value)
//   );
//
//   if (index >= 0) {
//     verkehrsbeziehungen.splice(index, 1);
//   } else {
//     verkehrsbeziehungen.push(verkehrsbeziehung);
//   }
//
//   activeZaehlung.value.verkehrsbeziehungen = verkehrsbeziehungen;
}

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowTwo() {
}

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowThree() {
}

function handleClickOnQuerschnittsverkehrJeStrassenseiteArrowFour() {
  console.log("handleClickOnQuerschnittsverkehrJeStrassenseiteArrowFour")
  if (isSelectedArrowFour.value) {
    console.log("isSelectedArrowFour")
    if (firstNode.value?.nummer === 1) {
      const idx = chosenOptionsCopy.verkehrsbeziehungenQJS.findIndex(q =>
          q.knotenarm === 1 && q.nach === 3 && q.strassenseite === Himmelsrichtung.O
      )
      if (idx !== -1) {
        chosenOptionsCopy.verkehrsbeziehungenQJS.splice(idx, 1)
      }
    }
    if (firstNode.value?.nummer === 2) {
      const idx = chosenOptionsCopy.verkehrsbeziehungenQJS.findIndex(q =>
          q.knotenarm === 2 && q.nach === 4 && q.strassenseite === Himmelsrichtung.N
      )
      if (idx !== -1) {
        chosenOptionsCopy.verkehrsbeziehungenQJS.splice(idx, 1)
      }
    }
    if (firstNode.value?.nummer === 3) {
      const idx = chosenOptionsCopy.verkehrsbeziehungenQJS.findIndex(q =>
          q.knotenarm === 3 && q.nach === 1 && q.strassenseite === Himmelsrichtung.W
      )
      if (idx !== -1) {
        chosenOptionsCopy.verkehrsbeziehungenQJS.splice(idx, 1)
      }
    }
    if (firstNode.value?.nummer === 4) {
      const idx = chosenOptionsCopy.verkehrsbeziehungenQJS.findIndex(q =>
          q.knotenarm === 4 && q.nach === 2 && q.strassenseite === Himmelsrichtung.S
      )
      if (idx !== -1) {
        chosenOptionsCopy.verkehrsbeziehungenQJS.splice(idx, 1)
      }
    }
    // TODO: 5 - 8

  } else { // !isSelectedArrowFour
    if (availableNodeNumbers.value.includes(1)) {
      chosenOptionsCopy.verkehrsbeziehungenQJS.push({
        knotenarm: 1,
        nach: 3,
        strassenseite: Himmelsrichtung.O
      })
    }
    if (firstNode.value?.nummer === 2) {
      chosenOptionsCopy.verkehrsbeziehungenQJS.push({
        knotenarm: 2,
        nach: 4,
        strassenseite: Himmelsrichtung.N
      })
    }
    if (firstNode.value?.nummer === 3) {
      chosenOptionsCopy.verkehrsbeziehungenQJS.push({
        knotenarm: 3,
        nach: 1,
        strassenseite: Himmelsrichtung.W
      })
    }
    if (firstNode.value?.nummer === 4) {
      chosenOptionsCopy.verkehrsbeziehungenQJS.push({
        knotenarm: 4,
        nach: 2,
        strassenseite: Himmelsrichtung.S
      })
    }
    // TODO 5 - 8
  }


// activeZaehlung.value?.verkehrsbeziehungen.forEach((vb) => {

//   const verkehrsbeziehung = createVerkehrsbeziehungArrowFour();
//
//   const index =
//     findIndexInSelectedVerkehrsbeziehungForClickedVerkehrsbeziehung(
//       verkehrsbeziehung
//     );
//
//   const verkehrsbeziehungen = toArray(
//     cloneDeep(selectedVerkehrsbeziehungen.value)
//   );
//
//   if (index >= 0) {
//     verkehrsbeziehungen.splice(index, 1);
//   } else {
//     verkehrsbeziehungen.push(verkehrsbeziehung);
//   }
//
//   activeZaehlung.value.verkehrsbeziehungen = verkehrsbeziehungen;
}

// function findIndexInSelectedVerkehrsbeziehungForClickedVerkehrsbeziehung(
//   clickedVerkehrsbeziehung: VerkehrsbeziehungDTO
// ) {
//   return selectedVerkehrsbeziehungen.value.findIndex(
//     (verkehrsbeziehung: VerkehrsbeziehungDTO) => {
//       return (
//         verkehrsbeziehung.von === clickedVerkehrsbeziehung.von &&
//         verkehrsbeziehung.nach === clickedVerkehrsbeziehung.nach &&
//         verkehrsbeziehung.strassenseite ===
//           clickedVerkehrsbeziehung.strassenseite
//       );
//     }
//   );
// }

onMounted(() => {
  console.log("mounted - VB:" + chosenOptionsCopy.verkehrsbeziehungenQJS.length)
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
  return isAvailableArrowOne.value ? activeColor : passiveColor;
}

function calculateColorOfVerkehrsbeziehungArrowTwo(): string | undefined {
  return isAvailableArrowTwo.value ? activeColor : passiveColor;
}

function calculateColorOfVerkehrsbeziehungArrowThree(): string | undefined {
  return isAvailableArrowThree.value ? activeColor : passiveColor;
}

const calculateColorOfVerkehrsbeziehungArrowFour = computed(() => {
  console.log("calculateColorOfVerkehrsbeziehungArrowFour - VB:" + chosenOptionsCopy.verkehrsbeziehungenQJS.length)
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
