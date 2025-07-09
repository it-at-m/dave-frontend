<template>
  <v-sheet
    id="geometrieMessstelle"
    :height="height"
    :width="width"
    color="transparent"
  />
</template>
<script setup lang="ts">
import type MessquerschnittInfoDTO from "@/types/messstelle/MessquerschnittInfoDTO";

import * as SVG from "@svgdotjs/svg.js";
import { Svg } from "@svgdotjs/svg.js";
import { computed, nextTick, onMounted, ref, watch } from "vue";

import { useMessstelleStore } from "@/store/MessstelleStore";
import Himmelsrichtungen from "@/types/enum/Himmelsrichtungen";

interface Props {
  height?: number;
  width?: number;
  activeColor?: string;
  passiveColor?: string;
  messquerschnitte: MessquerschnittInfoDTO[];
}

const props = withDefaults(defineProps<Props>(), {
  height: 60,
  width: 60,
  activeColor: "#FFFFFF",
  passiveColor: "#757575",
});
const strokeSize = 175;
const canvas = ref<Svg>(SVG.SVG());
const viewbox = ref(1400);
const querschnittGroup = ref(canvas.value.group());
const fontfamily = "Roboto, Arial, Helvetica, sans-serif";
const defaultFontSize = 20;

const startX = ref(0);
const startY = ref(0);

const messstelleStore = useMessstelleStore();

onMounted(() => {
  drawingConfig();
});

const selectedMessquerschnitte = computed(() => {
  const messquerschnittIds =
    messstelleStore.getFilteroptions.messquerschnittIds;
  return props.messquerschnitte.filter((value) =>
    messquerschnittIds.includes(value.mqId)
  );
});

function drawingConfig() {
  canvas.value = SVG.SVG()
    .addTo(`#geometrieMessstelle`)
    .size(props.width, props.height)
    .font({ size: defaultFontSize, family: fontfamily })
    .viewbox(0, 0, viewbox.value, viewbox.value);
  draw();
}

watch(selectedMessquerschnitte, () => {
  redraw();
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
  drawArrowsPointingSouth();
  startX.value += 500;
  drawArrowsPointingNorth();
  rotateArrowsIfNecessary();
}

function drawArrowsPointingSouth() {
  querschnittGroup.value.add(
    SVG.SVG()
      .line(
        startX.value + 10,
        startY.value,
        startX.value + 10,
        startY.value + 850
      )
      .stroke({
        width: strokeSize,
        color: calculateColor(Himmelsrichtungen.SUED, Himmelsrichtungen.WEST),
      })
  );
  querschnittGroup.value.add(
    SVG.SVG()
      .polygon(
        `${startX.value + 25},${startY.value + 853} ${
          startX.value - 5
        },${startY.value + 853} ${startX.value + 10} ${startY.value + 872}`
      )
      .stroke({
        width: strokeSize,
        color: calculateColor(Himmelsrichtungen.SUED, Himmelsrichtungen.WEST),
      })
      .attr(
        "fill",
        calculateColor(Himmelsrichtungen.SUED, Himmelsrichtungen.WEST)
      )
  );
  startX.value += 50;
}

function drawArrowsPointingNorth() {
  querschnittGroup.value.add(
    SVG.SVG()
      .line(
        startX.value + 10,
        startY.value,
        startX.value + 10,
        startY.value + 850
      )
      .stroke({
        width: strokeSize,
        color: calculateColor(Himmelsrichtungen.OST, Himmelsrichtungen.NORD),
      })
  );
  querschnittGroup.value.add(
    SVG.SVG()
      .polygon(
        `${startX.value + 25},${startY.value - 3} ${startX.value - 5},${
          startY.value - 3
        } ${startX.value + 10} ${startY.value - 22}`
      )
      .stroke({
        width: strokeSize,
        color: calculateColor(Himmelsrichtungen.OST, Himmelsrichtungen.NORD),
      })
      .attr(
        "fill",
        calculateColor(Himmelsrichtungen.OST, Himmelsrichtungen.NORD)
      )
  );
  startX.value += 50;
}

function rotateArrowsIfNecessary() {
  const direction = props.messquerschnitte[0]?.fahrtrichtung;
  if (
    direction === Himmelsrichtungen.OST ||
    direction === Himmelsrichtungen.WEST
  ) {
    querschnittGroup.value.rotate(90).translate(100, -50);
  }
}

function calculateColor(
  himmelsrichtung1: Himmelsrichtungen,
  himmelsrichtung2: Himmelsrichtungen
): string | undefined {
  // Wenn selected dann active
  const selectedKnotenarm = selectedMessquerschnitte.value.filter(
    (k) =>
      k.fahrtrichtung === himmelsrichtung1 ||
      k.fahrtrichtung === himmelsrichtung2
  )[0];
  if (selectedKnotenarm) {
    return props.activeColor;
  }
  // Wenn nicht selected, aber vorhanden, dann passiv
  const existingKnotenarm = props.messquerschnitte.filter(
    (k) =>
      k.fahrtrichtung === himmelsrichtung1 ||
      k.fahrtrichtung === himmelsrichtung2
  )[0];
  if (existingKnotenarm) {
    return props.passiveColor;
  }
  // wenn nicht selected und nicht vorhanden, dann transparent
  return "transparent";
}
</script>
