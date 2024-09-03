<template>
  <v-sheet
    id="drawingMessquerschnittBelastungsplan"
    :width="props.dimension"
    :height="props.dimension"
  />
</template>
<script setup lang="ts">
import type BelastungsplanMessquerschnitteDTO from "@/types/messstelle/BelastungsplanMessquerschnitteDTO";
import type LadeBelastungsplanMessqueschnittDataDTO from "@/types/messstelle/LadeBelastungsplanMessqueschnittDataDTO";

import * as SVG from "@svgdotjs/svg.js";
import { Svg } from "@svgdotjs/svg.js";
import _ from "lodash";
import { computed, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import { belastungsplanAnzeigeUtils } from "@/components/messstelle/optionsmenue/composable/belastungsplanAnzeigeUtils";
import { useMessstelleStore } from "@/store/MessstelleStore";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import { zeitblockInfo } from "@/types/enum/Zeitblock";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import { useDateUtils } from "@/util/DateUtils";

interface Props {
  belastungsplanData: BelastungsplanMessquerschnitteDTO;
  dimension?: string;
}
const emits = defineEmits<{
  (e: "print", v: Blob): void;
}>();

const messstelleStore = useMessstelleStore();
const display = useDisplay();
const dateUtils = useDateUtils();
const canvas = ref<Svg>(SVG.SVG());
const viewbox = ref(1400);
const querschnittGroup = ref(canvas.value.group());
const fontfamily = "Roboto, Arial, Helvetica, sans-serif";
const defaultFontSize = 20;

const farben = new Map<string, string>([
  ["N", "#000000"],
  ["O", "#F44336"],
  ["S", "#4CAF50"],
  ["W", "#2196F3"],
]);

const startX = ref(0);
const startY = ref(0);
const { isSvpInBelastungsPlan, isGvpInBelastungsPlan } =
  belastungsplanAnzeigeUtils();
const props = defineProps<Props>();

const svgHeight = computed(() => {
  return (
    messstelleStore.getBelastungsplanMinSize *
      (0.9 + messstelleStore.getBelastungsplanChosenSize / 10) +
    "vh"
  );
});

onMounted(() => {
  drawingConfig();
});

function drawingConfig() {
  canvas.value
    .addTo("#drawingMessquerschnittBelastungsplan")
    .size(svgHeight.value, svgHeight.value)
    .font({ size: defaultFontSize, family: fontfamily })
    .viewbox(0, 0, viewbox.value, viewbox.value);
  startX.value = 450;
  startY.value = 250;
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
    canvas.value.clear();
    drawingConfig();
  }
);

/**
 * Die Pfeile werden immer zuerst nach Norden und Süden gezeichnet,
 * wenn es sich um einem Messquerschnitt mit richtung Osten/Westen
 * handelt wird die Zeichnung im anschluss gedreht und in die richtige position geschoben
 */
function draw() {
  querschnittGroup.value = canvas.value.group();
  const groupedByDirection = _.chain(
    props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList
  )
    .groupBy("direction")
    .map((value, key) => ({ direction: key, data: value }))
    .value();
  drawArrowsPointingSouth(groupedByDirection);
  startX.value += 50;
  drawStreetName();
  drawTotal();
  startX.value += 90;
  drawArrowsPointingNorth(groupedByDirection);
  rotateArrowsIfNecessary();
  drawMessstelleInfo();
  drawNorthSymbol();
  drawLegende();
  storeImageForPrinting();
}

function drawArrowsPointingSouth(
  groupedByDirection: {
    data: LadeBelastungsplanMessqueschnittDataDTO[];
    direction: string;
  }[]
) {
  const arrayOfDataForDirectionSouth = groupedByDirection.find(
    (obj) => obj.direction === "S" || obj.direction === "O"
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
          width: calcStrokeSize(mq),
          color: getLineColor(mq.direction),
        })
    );
    querschnittGroup.value.add(
      SVG.SVG()
        .polygon(
          `${startX.value + 20},${startY.value + 851} ${
            startX.value
          },${startY.value + 851} ${startX.value + 10} ${startY.value + 860}`
        )
        .stroke({ width: 1, color: "black" })
        .attr("fill", "none")
    );
    addTextNorthSide(
      startX.value,
      startY.value - 10,
      mq.sumKfz,
      mq.sumGv,
      mq.sumSv,
      mq.sumRad,
      mq.percentGV,
      mq.percentSv
    );
    startX.value += 50;
  });
  addSumSouthIfNecessary(arrayOfDataForDirectionSouth);
}

function addSumSouthIfNecessary(
  arrayOfDataForDirectionSouth:
    | { data: LadeBelastungsplanMessqueschnittDataDTO[]; direction: string }
    | undefined
) {
  if (
    arrayOfDataForDirectionSouth &&
    arrayOfDataForDirectionSouth.data.length > 1
  ) {
    let sumMqKfz = arrayOfDataForDirectionSouth?.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.sumKfz,
      0
    );
    let sumMqSv = arrayOfDataForDirectionSouth?.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.sumSv,
      0
    );
    let sumMqGv = arrayOfDataForDirectionSouth?.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.sumGv,
      0
    );
    let sumMqRad = arrayOfDataForDirectionSouth?.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.sumRad,
      0
    );
    const sumTotal = sumMqKfz + sumMqSv + sumMqGv;
    const percentageMqSv = calcPercentage(sumMqSv, sumTotal);
    const percentageMqGv = calcPercentage(sumMqGv, sumTotal);

    querschnittGroup.value.add(
      SVG.SVG()
        .line(
          startX.value - 25,
          startY.value,
          startX.value - 25,
          startY.value - numberOfChosenFahrzeugOptions.value * 75
        )
        .stroke({ width: 1, color: "black" })
    );
    addTextNorthSide(
      startX.value - 20,
      startY.value - 10,
      sumMqKfz,
      sumMqGv,
      sumMqSv,
      sumMqRad,
      percentageMqGv,
      percentageMqSv
    );
  }
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

function drawTotal() {
  addTextNorthSide(
    startX.value,
    startY.value - 10,
    props.belastungsplanData.totalKfz,
    props.belastungsplanData.totalGv,
    props.belastungsplanData.totalSv,
    props.belastungsplanData.totalRad,
    props.belastungsplanData.totalPercentGv,
    props.belastungsplanData.totalPercentSv
  );
  addTextSouthSide(
    startX.value,
    startY.value + 910,
    props.belastungsplanData.totalKfz,
    props.belastungsplanData.totalGv,
    props.belastungsplanData.totalSv,
    props.belastungsplanData.totalRad,
    props.belastungsplanData.totalPercentGv,
    props.belastungsplanData.totalPercentSv
  );
}

function drawArrowsPointingNorth(
  groupedByDirection: {
    data: LadeBelastungsplanMessqueschnittDataDTO[];
    direction: string;
  }[]
) {
  const arrayOfDataForDirectionNorth = groupedByDirection.find(
    (obj) => obj.direction === "N" || obj.direction === "W"
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
          width: calcStrokeSize(mq),
          color: getLineColor(mq.direction),
        })
    );
    querschnittGroup.value.add(
      SVG.SVG()
        .polygon(
          `${startX.value + 20},${startY.value - 1} ${startX.value},${
            startY.value - 1
          } ${startX.value + 10} ${startY.value - 10}`
        )
        .stroke({ width: 1, color: "black" })
        .attr("fill", "none")
    );
    addTextSouthSide(
      startX.value,
      startY.value + 910,
      mq.sumKfz,
      mq.sumGv,
      mq.sumSv,
      mq.sumRad,
      mq.percentGV,
      mq.percentSv
    );
    startX.value += 50;
  });
  addSumNorthIfNecessary(arrayOfDataForDirectionNorth);
}

function addSumNorthIfNecessary(
  arrayOfDataForDirectionNorth:
    | { data: LadeBelastungsplanMessqueschnittDataDTO[]; direction: string }
    | undefined
) {
  if (
    arrayOfDataForDirectionNorth != undefined &&
    arrayOfDataForDirectionNorth?.data.length > 1
  ) {
    let sumMqKfz = arrayOfDataForDirectionNorth?.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.sumKfz,
      0
    );
    let sumMqSv = arrayOfDataForDirectionNorth?.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.sumSv,
      0
    );
    let sumMqGv = arrayOfDataForDirectionNorth?.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.sumGv,
      0
    );
    let sumMqRad = arrayOfDataForDirectionNorth?.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.sumRad,
      0
    );
    const sumTotal = sumMqKfz + sumMqSv + sumMqGv;
    const percentageMqSv = calcPercentage(sumMqSv, sumTotal);
    const percentageMqGv = calcPercentage(sumMqGv, sumTotal);
    querschnittGroup.value.add(
      SVG.SVG()
        .line(
          startX.value - 25,
          startY.value + 860,
          startX.value - 25,
          startY.value + (1080 - (3 - numberOfChosenFahrzeugOptions.value) * 65)
        )
        .stroke({ width: 1, color: "black" })
    );
    addTextSouthSide(
      startX.value - 20,
      startY.value + 910,
      sumMqKfz,
      sumMqGv,
      sumMqSv,
      sumMqRad,
      percentageMqGv,
      percentageMqSv
    );
  }
}

function rotateArrowsIfNecessary() {
  const direction =
    props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList[0]
      .direction;
  if (direction == "S" || direction == "W") {
    querschnittGroup.value.rotate(90).translate(100, -50);
  }
}

function addTextToQuerschnittGroup(
  text: number | string,
  x: number,
  y: number
) {
  querschnittGroup.value.add(
    SVG.SVG().text(`${text}`).rotate(270, x, y).move(x, y)
  );
}

function calcPercentage(partial: number, total: number) {
  return ((100 * partial) / total).toFixed(1);
}

function addTextSouthSide(
  startPointX: number,
  startPointY: number,
  kfz: number,
  gv: number,
  sv: number,
  rad: number,
  percentGv: number | string,
  percentSv: number | string
) {
  let textposition = 2;
  if (chosenOptionsCopyFahrzeuge.value.radverkehr) {
    addTextToQuerschnittGroup(`${rad}`, startPointX, startPointY);
    startPointY += 85;
  }
  if (isGvpInBelastungsPlan.value) {
    addTextToQuerschnittGroup(
      addBracketsDependingOnPostition(`${percentGv}%`, textposition),
      startPointX,
      startPointY
    );
    startPointY += 85;
    textposition -= 1;
  }
  if (isSvpInBelastungsPlan.value) {
    addTextToQuerschnittGroup(
      addBracketsDependingOnPostition(`${percentSv}%`, textposition),
      startPointX,
      startPointY
    );
    startPointY += 85;
    textposition -= 1;
  }
  if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
    addTextToQuerschnittGroup(
      addBracketsDependingOnPostition(gv, textposition),
      startPointX,
      startPointY
    );
    startPointY += 85;
    textposition -= 1;
  }
  if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
    addTextToQuerschnittGroup(
      addBracketsDependingOnPostition(`${sv}`, textposition),
      startPointX,
      startPointY
    );
    startPointY += 85;
  }
  if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
    addTextToQuerschnittGroup(kfz, startPointX, startPointY);
  }
}

function addTextNorthSide(
  startPointX: number,
  startPointY: number,
  kfz: number,
  gv: number,
  sv: number,
  rad: number,
  percentGv: number | string,
  percentSv: number | string
) {
  let textposition = 0;
  if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
    addTextToQuerschnittGroup(kfz, startPointX, startPointY);
    startPointY -= 85;
    textposition += 1;
  }
  if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
    addTextToQuerschnittGroup(
      addBracketsDependingOnPostition(sv, textposition),
      startPointX,
      startPointY
    );
    startPointY -= 85;
    textposition += 1;
  }
  if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
    addTextToQuerschnittGroup(
      addBracketsDependingOnPostition(gv, textposition),
      startPointX,
      startPointY
    );
    startPointY -= 85;
    textposition += 1;
  }
  if (isSvpInBelastungsPlan.value) {
    addTextToQuerschnittGroup(
      addBracketsDependingOnPostition(`${percentSv}%`, textposition),
      startPointX,
      startPointY
    );
    startPointY -= 85;
    textposition += 1;
  }
  if (isGvpInBelastungsPlan.value) {
    addTextToQuerschnittGroup(
      addBracketsDependingOnPostition(`${percentGv}%`, textposition),
      startPointX,
      startPointY
    );
  }
  if (chosenOptionsCopyFahrzeuge.value.radverkehr) {
    addTextToQuerschnittGroup(`${rad}`, startPointX, startPointY);
  }
}

function drawNorthSymbol() {
  canvas.value
    .path("M 45 10 L 20 80 L 70 80 L 45 10")
    .stroke({ width: 1, color: "black" })
    .attr("fill", "none");
  canvas.value.text("N").move(37.5, 45).font({ size: 20 });
}

function drawMessstelleInfo() {
  canvas.value
    .text(function (add) {
      add.tspan(`Messstelle ${props.belastungsplanData.mstId}`).font({
        weight: "bold",
        size: defaultFontSize,
        family: fontfamily,
      });
      add
        .tspan(`Stadtbezirk: ${props.belastungsplanData.stadtbezirkNummer}`)
        .font({ size: defaultFontSize, family: fontfamily })
        .newLine();
      if (chosenOptionsCopy.value.zeitraum.length == 2) {
        add
          .tspan(
            `Messzeitraum:  ${dateUtils.formatDate(
              chosenOptionsCopy.value.zeitraum[0]
            )} -  ${dateUtils.formatDate(chosenOptionsCopy.value.zeitraum[1])}`
          )
          .font({ size: defaultFontSize, family: fontfamily })
          .newLine();
      } else {
        add
          .tspan(
            `Messtag: ${dateUtils.formatDate(
              chosenOptionsCopy.value.zeitraum[0]
            )}`
          )
          .font({ size: defaultFontSize, family: fontfamily })
          .newLine();
      }
    })
    .move(1000, 50);
}

function drawLegende() {
  const formeln = new Map<string, string>();
  formeln.set("KFZ", "KFZ = Pkw + Lkw + Lz + Lfw + Bus + Krad");
  formeln.set("SV", "SV = Lkw + Lz + Bus");
  formeln.set("GV", "GV = Lkw + Lz");
  formeln.set("SV%", "SV-Anteil = SV : KFZ x 100(%)");
  formeln.set("GV%", "GV-Anteil = GV : KFZ x 100(%)");
  formeln.set("Rad", "");
  let chosenFahrzeugartAsTextArray: string[] = [];
  if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
    chosenFahrzeugartAsTextArray.push("KFZ");
  }
  if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
    chosenFahrzeugartAsTextArray.push("SV");
  }
  if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
    chosenFahrzeugartAsTextArray.push("GV");
  }
  if (isSvpInBelastungsPlan.value) {
    chosenFahrzeugartAsTextArray.push("SV%");
  }
  if (isGvpInBelastungsPlan.value) {
    chosenFahrzeugartAsTextArray.push("GV%");
  }
  if (chosenOptionsCopyFahrzeuge.value.radverkehr) {
    chosenFahrzeugartAsTextArray.push("Rad");
  }

  canvas.value
    .text(function (add) {
      add.tspan(`${chosenOptionsCopy.value.zeitauswahl}`).font({
        weight: "bold",
        size: defaultFontSize,
        family: fontfamily,
      });
      add
        .tspan(`${getZeitblockText.value}`)
        .font({ size: defaultFontSize, family: fontfamily })
        .newLine();
      if (chosenFahrzeugartAsTextArray.length != 0) {
        let textstart = 0;
        add.tspan("").newLine();
        add.tspan(chosenFahrzeugartAsTextArray[0]).newLine().x(textstart).font({
          weight: "bold",
          size: defaultFontSize,
          family: fontfamily,
        });
        if (chosenFahrzeugartAsTextArray.length >= 2) {
          textstart += 100;
          add.tspan(`(${chosenFahrzeugartAsTextArray[1]})`).x(textstart).font({
            weight: "bold",
            size: defaultFontSize,
            family: fontfamily,
          });
        }
        if (chosenFahrzeugartAsTextArray.length == 3) {
          textstart += 60;
          add.tspan(chosenFahrzeugartAsTextArray[2]).x(textstart).font({
            weight: "bold",
            size: defaultFontSize,
            family: fontfamily,
          });
        }

        chosenFahrzeugartAsTextArray.forEach((text) => {
          add
            .tspan(formeln.get(text)!)
            .font({ size: defaultFontSize, family: fontfamily })
            .newLine();
        });
      }
    })
    .move(50, startY.value + 950);
}

const getZeitblockText = computed(() => {
  if (chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.TAGESWERT) {
    return "0-24 Uhr";
  } else if (chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.BLOCK) {
    return zeitblockInfo.get(chosenOptionsCopy.value.zeitblock)?.title;
  } else if (chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.STUNDE) {
    return zeitblockStuendlichInfo.get(chosenOptionsCopy.value.zeitblock)
      ?.title;
  } else if (
    chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ ||
    chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
    chosenOptionsCopy.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
  ) {
    return zeitblockInfo.get(chosenOptionsCopy.value.zeitblock)?.title;
  } else {
    return "";
  }
});

function calcStrokeSize(mq: LadeBelastungsplanMessqueschnittDataDTO): number {
  const maxLineWidth = 20;
  let totalVerkehr = 0;
  let totalVerkehrMq = 0;
  if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
    totalVerkehrMq += mq.sumKfz;
    totalVerkehr += props.belastungsplanData.totalKfz;
  }
  if (
    chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
    isSvpInBelastungsPlan
  ) {
    totalVerkehrMq += mq.sumSv;
    totalVerkehr += props.belastungsplanData.totalSv;
  }
  if (
    chosenOptionsCopyFahrzeuge.value.gueterverkehr ||
    isGvpInBelastungsPlan
  ) {
    totalVerkehrMq += mq.sumGv;
    totalVerkehr += props.belastungsplanData.totalGv;
  }
  if (chosenOptionsCopyFahrzeuge.value.radverkehr) {
    totalVerkehrMq += mq.sumRad;
    totalVerkehr += props.belastungsplanData.totalRad;
  }
  const percentageMqComparedToTotal = totalVerkehrMq / totalVerkehr;
  let result = percentageMqComparedToTotal * maxLineWidth;
  return result > 1 ? result : 1;
}

/**
 * gibt einen wert zwischen 0-3 zurück, welcher benötigt wird um den Trennstrich bei den summen zu berechnen
 */
const numberOfChosenFahrzeugOptions = computed(() => {
  const number = Object.values(chosenOptionsCopyFahrzeuge.value).reduce(
    (accumulator: number, currentObject) =>
      accumulator + (currentObject === true ? 1 : 0),
    0
  );
  return number > 3 ? 3 : number;
});

function storeImageForPrinting() {
  const ex = canvas.value
    .flatten(canvas.value)
    .size(getSizeInPx.value + "px", getSizeInPx.value + "px")
    .svg() as string;
  emits("print", new Blob([ex], { type: "image/svg+xml;charset=utf-8" }));
}

function getLineColor(direction: string) {
  return chosenOptionsCopy.value.blackPrintMode
    ? "#000000"
    : farben.get(direction);
}

const getSizeInPx = computed(() => {
  return (
    (parseInt(svgHeight.value.trim().replace("vh", "")) *
      display.height.value) /
    100
  );
});

function addBracketsDependingOnPostition(
  text: string | number,
  position: number
) {
  return position == 1 ? `(${text})` : text;
}
</script>
