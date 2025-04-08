<template>
  <v-sheet
    :id="sheetId"
    :height="dimension"
    :width="dimension"
  />
</template>
<script setup lang="ts">
import type BelastungsplanMessquerschnitteDTO from "@/types/messstelle/BelastungsplanMessquerschnitteDTO";
import type LadeBelastungsplanMessqueschnittDataDTO from "@/types/messstelle/LadeBelastungsplanMessqueschnittDataDTO";
import type { Ref } from "vue";

import * as SVG from "@svgdotjs/svg.js";
import { Svg } from "@svgdotjs/svg.js";
import { chain } from "lodash";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import { useMessstelleStore } from "@/store/MessstelleStore";
import Himmelsrichtungen from "@/types/enum/Himmelsrichtungen";
import { belastungsplanAnzeigeUtils } from "@/util/BelastungsplanAnzeigeUtils";

interface Props {
  belastungsplanData: BelastungsplanMessquerschnitteDTO;
  dimension?: string;
}

const props = withDefaults(defineProps<Props>(), {
  dimension: "600vh",
});
const emits = defineEmits<{
  (e: "print", v: Blob): void;
}>();

const sheetId = "belastungsplan-messquerschnitt-schema";

const messstelleStore = useMessstelleStore();
const display = useDisplay();
const calcStrokeSize = 20;
const canvas = ref<Svg>(SVG.SVG());
const viewbox = ref(1400);
const querschnittGroup = ref(canvas.value.group());
const fontfamily = "Roboto, Arial, Helvetica, sans-serif";
const defaultFontSize = 20;

const maxVerhiclesPerMq = ref(0);
const vehiclesPerMq: Ref<Map<string, number>> = ref(new Map<string, number>());

const startX = ref(0);
const startY = ref(0);
const { isSvpInBelastungsPlan, isGvpInBelastungsPlan } =
  belastungsplanAnzeigeUtils();

const svgHeight = computed(() => {
  return (
    messstelleStore.getBelastungsplanMinSize *
      (0.9 + messstelleStore.getBelastungsplanChosenSize / 10) +
    "vh"
  );
});

onMounted(() => {
  calcLineWidth();
  drawingConfig();
});

function drawingConfig() {
  canvas.value = SVG.SVG()
    .addTo(`#${sheetId}`)
    .size(svgHeight.value, svgHeight.value)
    .font({ size: defaultFontSize, family: fontfamily })
    .viewbox(0, 0, viewbox.value, viewbox.value);
  draw();
}

const chosenOptionsCopy = computed(() => {
  return messstelleStore.getFilteroptions;
});

const chosenOptionsCopyFahrzeuge = computed(() => {
  return chosenOptionsCopy.value.fahrzeuge;
});

watch(
  () => props.belastungsplanData,
  () => {
    redraw();
  }
);

/**
 * Wenn der Nutzer auf den Tabs navigiert, dann bekommt die Belastungsplan
 * Komponente das als Event mit. Dies ist notwendig, da es Probleme gibt,
 * das SVG zu zeichen, wenn der Tab mit dem Diagramm nicht sichtbar ist.
 */
const activeTab = computed(() => {
  return messstelleStore.getActiveTab;
});

/**
 * Diese Methode zeichnet den Balastungsplan immer dann, wenn von einem anderen Tab auf
 * den Belastungsplan Tab gewechselt wird.
 */
watch(activeTab, (tab: number) => {
  if (tab === 0) {
    redraw();
  }
});

function redraw() {
  nextTick(() => {
    draw();
  });
}

/**
 * Die Pfeile werden immer zuerst nach Norden und Süden gezeichnet,
 * wenn es sich um einem Messquerschnitt mit richtung Osten/Westen
 * handelt wird die Zeichnung im anschluss gedreht und in die richtige position geschoben
 */
function draw() {
  startX.value = 450;
  startY.value = 250;
  canvas.value.clear();
  querschnittGroup.value = canvas.value.group();
  const groupedByDirection = chain(
    props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList
  )
    .groupBy("direction")
    .map((value, key) => ({ direction: key, data: value }))
    .value();
  drawArrowsPointingSouth(groupedByDirection);
  startX.value += 85;
  drawStreetName();
  startX.value += 130;
  drawArrowsPointingNorth(groupedByDirection);
  rotateArrowsIfNecessary();
  storeImageForPrinting();
}

function drawStreetName() {
  querschnittGroup.value.add(
    SVG.SVG()
      .text(`${props.belastungsplanData.strassenname}`)
      .move(startX.value, startY.value + 425)
      .font({ anchor: "middle", size: 30 })
      .rotate(270, startX.value, startY.value + 425)
  );
}

function drawArrowsPointingSouth(
  groupedByDirection: {
    data: LadeBelastungsplanMessqueschnittDataDTO[];
    direction: string;
  }[]
) {
  const arrayOfDataForDirectionSouth = groupedByDirection.find(
    (obj) =>
      obj.direction === Himmelsrichtungen.SUED ||
      obj.direction === Himmelsrichtungen.WEST
  );
  arrayOfDataForDirectionSouth?.data.forEach((mq) => {
    querschnittGroup.value.add(
      SVG.SVG()
        .line(
          startX.value + 10,
          startY.value,
          startX.value + 10,
          startY.value + 850
        )
        .stroke({
          width: calcStrokeSize,
          color: getLineColor(mq.mqId),
        })
    );
    querschnittGroup.value.add(
      SVG.SVG()
        .polygon(
          `${startX.value + 25},${startY.value + 853} ${
            startX.value - 5
          },${startY.value + 853} ${startX.value + 10} ${startY.value + 872}`
        )
        .stroke({ width: 1, color: "black" })
        .attr("fill", getLineColor(mq.mqId))
    );
    startX.value += 50;
  });
}

function drawArrowsPointingNorth(
  groupedByDirection: {
    data: LadeBelastungsplanMessqueschnittDataDTO[];
    direction: string;
  }[]
) {
  const arrayOfDataForDirectionNorth = groupedByDirection.find(
    (obj) =>
      obj.direction === Himmelsrichtungen.NORD ||
      obj.direction === Himmelsrichtungen.OST
  );
  arrayOfDataForDirectionNorth?.data.forEach((mq) => {
    querschnittGroup.value.add(
      SVG.SVG()
        .line(
          startX.value + 10,
          startY.value,
          startX.value + 10,
          startY.value + 850
        )
        .stroke({
          width: calcStrokeSize,
          color: getLineColor(mq.mqId),
        })
    );
    querschnittGroup.value.add(
      SVG.SVG()
        .polygon(
          `${startX.value + 25},${startY.value - 3} ${startX.value - 5},${
            startY.value - 3
          } ${startX.value + 10} ${startY.value - 22}`
        )
        .stroke({ width: 1, color: "black" })
        .attr("fill", getLineColor(mq.mqId))
    );
    startX.value += 50;
  });
}

function rotateArrowsIfNecessary() {
  const direction =
    props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList[0]
      .direction;
  if (
    direction === Himmelsrichtungen.OST ||
    direction === Himmelsrichtungen.WEST
  ) {
    querschnittGroup.value.rotate(90).translate(100, -50);
  }
}

function calcLineWidth() {
  // reset
  maxVerhiclesPerMq.value = 0;
  vehiclesPerMq.value = new Map<string, number>();
  props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList.forEach(
    (mq) => {
      let totalVerkehrMq = 0;
      if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
        totalVerkehrMq += mq.sumKfz;
      }
      if (
        chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
        isSvpInBelastungsPlan
      ) {
        totalVerkehrMq += mq.sumSv;
      }
      if (
        chosenOptionsCopyFahrzeuge.value.gueterverkehr ||
        isGvpInBelastungsPlan
      ) {
        totalVerkehrMq += mq.sumGv;
      }
      if (chosenOptionsCopyFahrzeuge.value.radverkehr) {
        totalVerkehrMq += mq.sumRad;
      }
      maxVerhiclesPerMq.value =
        totalVerkehrMq > maxVerhiclesPerMq.value
          ? totalVerkehrMq
          : maxVerhiclesPerMq.value;
      vehiclesPerMq.value.set(mq.mqId, totalVerkehrMq);
    }
  );
}

function storeImageForPrinting() {
  const ex = canvas.value
    .flatten(canvas.value)
    .size(getSizeInPx.value + "px", getSizeInPx.value + "px")
    .svg() as string;
  emits("print", new Blob([ex], { type: "image/svg+xml;charset=utf-8" }));
}

function getLineColor(mqId: string) {
  return chosenOptionsCopy.value.messquerschnittIds.includes(mqId)
    ? "#000000"
    : "#E0E0E0";
}

const getSizeInPx = computed(() => {
  return (
    (parseInt(svgHeight.value.trim().replace("vh", "")) *
      display.height.value) /
    100
  );
});
</script>
