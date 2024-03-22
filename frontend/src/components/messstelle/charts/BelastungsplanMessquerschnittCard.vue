<template>
    <v-sheet
        id="drawingMessquerschnittBelastungsplan"
        :width="props.dimension"
        :height="props.dimension"
    />
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import ListBelastungsplanMessquerschnitteDTO from "@/types/messstelle/ListBelastungsplanMessquerschnitteDTO";
import * as SVG from "@svgdotjs/svg.js";
import { Svg } from "@svgdotjs/svg.js";
import _ from "lodash";
import LadeBelastungsplanMessqueschnittDataDTO from "@/types/messstelle/LadeBelastungsplanMessqueschnittDataDTO";
import { useStore } from "@/api/util/useStore";
import { useVuetify } from "@/util/useVuetify";
import { belastungsplanAnzeigeUtils } from "@/components/messstelle/optionsmenue/composable/belastungsplanAnzeigeUtils";

interface Props {
    belastungsplanData: ListBelastungsplanMessquerschnitteDTO;
    dimension: string;
}

const store = useStore();
const vuetify = useVuetify();
const canvas = ref<Svg>(SVG.SVG());
const viewbox = ref(900);
const querschnittGroup = ref(canvas.value.group());

const farben = new Map<string, string>([
    ["N", "#000000"],
    ["O", "#F44336"],
    ["S", "#4CAF50"],
    ["W", "#2196F3"],
]);

const startX = ref(0);
const startY = ref(0);
const { isSv_pInBelastungsPlan, isGv_pInBelastungsPlan } =
    belastungsplanAnzeigeUtils();
const props = defineProps<Props>();

const svgHeight = computed(() => {
    const minSizeWithVh =
        store.getters["filteroptionsMessstelle/getBelastungsplanMinSize"];
    const minSitzeWithoutVh = minSizeWithVh.substring(
        0,
        minSizeWithVh.length - 2
    );
    const sizeMultiplikator =
        store.getters["filteroptionsMessstelle/getBelastungsplanChosenSize"];
    return minSitzeWithoutVh * (0.9 + sizeMultiplikator / 10) + "vh";
});

onMounted(() => {
    drawingConfig();
});

function drawingConfig() {
    canvas.value
        .addTo("#drawingMessquerschnittBelastungsplan")
        .size(svgHeight.value, svgHeight.value)
        .viewbox(0, 0, viewbox.value, viewbox.value);
    startX.value = 350;
    startY.value = 200;
    draw();
}

const chosenOptionsCopy = computed(() => {
    return store.getters["filteroptionsMessstelle/getFilteroptions"];
});

const chosenOptionsCopyFahrzeuge = computed(() => {
    return chosenOptionsCopy.value.fahrzeuge;
});

watch(chosenOptionsCopyFahrzeuge, () => {
    canvas.value.clear();
    drawingConfig();
});

/**
 * Die Pfeile werden immer zuerst nach Norden und Süden gezeichnet,
 * wenn es sich um einem Messquerschnitt mit richtung Osten/Westen
 * handelt wird die Zeichnung im anschluss gedreht und in die richtige position geschoben
 */
function draw() {
    querschnittGroup.value = canvas.value.group();
    let groupedByDirection = _.chain(
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
}

function drawArrowsPointingSouth(
    groupedByDirection: {
        data: LadeBelastungsplanMessqueschnittDataDTO[];
        direction: string;
    }[]
) {
    let arrayOfDataForDirectionSouth = groupedByDirection.find(
        (obj) => obj.direction == "S" || obj.direction == "O"
    );
    arrayOfDataForDirectionSouth?.data.forEach((mq) => {
        querschnittGroup.value.add(
            SVG.SVG()
                .line(
                    startX.value + 10,
                    startY.value,
                    startX.value + 10,
                    startY.value + 450
                )
                .stroke({
                    width: calcStrokeSize(mq),
                    color: farben.get(mq.direction),
                })
        );
        querschnittGroup.value.add(
            SVG.SVG()
                .polygon(
                    `${startX.value + 20},${startY.value + 451} ${
                        startX.value
                    },${startY.value + 451} ${startX.value + 10} ${
                        startY.value + 460
                    }`
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
        const sumTotal = sumMqKfz + sumMqSv + sumMqGv;
        const percentageMqSv = calcPercentage(sumMqSv, sumTotal);
        const percentageMqGv = calcPercentage(sumMqGv, sumTotal);

        querschnittGroup.value.add(
            SVG.SVG()
                .line(
                    startX.value - 25,
                    startY.value,
                    startX.value - 25,
                    startY.value - 180
                )
                .stroke({ width: 1, color: "black" })
        );
        addTextNorthSide(
            startX.value - 20,
            startY.value - 10,
            sumMqKfz,
            sumMqGv,
            sumMqSv,
            percentageMqGv,
            percentageMqSv
        );
    }
}

function drawStreetName() {
    querschnittGroup.value.add(
        SVG.SVG()
            .text(`${props.belastungsplanData.strassenname}`)
            .move(startX.value, startY.value + 225)
            .font({ anchor: "middle", size: 20 })
            .rotate(270, startX.value, startY.value + 225)
    );
}

function drawTotal() {
    addTextNorthSide(
        startX.value,
        startY.value - 10,
        props.belastungsplanData.totalKfz,
        props.belastungsplanData.totalGv,
        props.belastungsplanData.totalSv,
        props.belastungsplanData.totalPercentGv,
        props.belastungsplanData.totalPercentSv
    );
    addTextSouthSide(
        startX.value,
        startY.value + 510,
        props.belastungsplanData.totalKfz,
        props.belastungsplanData.totalGv,
        props.belastungsplanData.totalSv,
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
    let arrayOfDataForDirectionNorth = groupedByDirection.find(
        (obj) => obj.direction == "N" || obj.direction == "W"
    );
    arrayOfDataForDirectionNorth?.data.forEach((mq) => {
        querschnittGroup.value.add(
            SVG.SVG()
                .line(
                    startX.value + 10,
                    startY.value,
                    startX.value + 10,
                    startY.value + 450
                )
                .stroke({
                    width: calcStrokeSize(mq),
                    color: farben.get(mq.direction),
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
            startY.value + 510,
            mq.sumKfz,
            mq.sumGv,
            mq.sumSv,
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
        const sumTotal = sumMqKfz + sumMqSv + sumMqGv;
        const percentageMqSv = calcPercentage(sumMqSv, sumTotal);
        const percentageMqGv = calcPercentage(sumMqGv, sumTotal);
        querschnittGroup.value.add(
            SVG.SVG()
                .line(
                    startX.value - 25,
                    startY.value + 650,
                    startX.value - 25,
                    startY.value + 465
                )
                .stroke({ width: 1, color: "black" })
        );
        addTextSouthSide(
            startX.value - 20,
            startY.value + 510,
            sumMqKfz,
            sumMqGv,
            sumMqSv,
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
        querschnittGroup.value.rotate(90).translate(-100, -50);
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
    percentGv: number | string,
    percentSv: number | string
) {
    if (isGv_pInBelastungsPlan.value) {
        addTextToQuerschnittGroup(percentSv, startPointX, startPointY);
        startPointY += 65;
    }
    if (isSv_pInBelastungsPlan.value) {
        addTextToQuerschnittGroup(percentGv, startPointX, startPointY);
        startPointY += 65;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
        addTextToQuerschnittGroup(sv, startPointX, startPointY);
        startPointY += 65;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
        addTextToQuerschnittGroup(gv, startPointX, startPointY);
        startPointY += 65;
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
    percentGv: number | string,
    percentSv: number | string
) {
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
        addTextToQuerschnittGroup(kfz, startPointX, startPointY);
        startPointY -= 65;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
        addTextToQuerschnittGroup(gv, startPointX, startPointY);
        startPointY -= 65;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
        addTextToQuerschnittGroup(sv, startPointX, startPointY);
        startPointY -= 65;
    }
    if (isSv_pInBelastungsPlan.value) {
        addTextToQuerschnittGroup(percentGv, startPointX, startPointY);
        startPointY -= 65;
    }
    if (isGv_pInBelastungsPlan.value) {
        addTextToQuerschnittGroup(percentSv, startPointX, startPointY);
    }
}

function drawNorthSymbol() {
    canvas.value
        .path("M 40 10 L 30 40 L 50 40 L 40 10")
        .stroke({ width: 1, color: "black" })
        .attr("fill", "none");
    canvas.value.text("N").move(35, 25).font({ size: 13 });
}

function drawMessstelleInfo() {
    canvas.value
        .text(function (add) {
            add.tspan("Messstelle ").font({ weight: "bold" });
            add.tspan("Stadtbezirk").newLine();
            add.tspan("Messtag").newLine();
            add.tspan("Messzeitraum").newLine();
        })
        .move(startX.value + 50, 10);
}

function drawLegende() {
    const formeln = new Map<string, string>();
    formeln.set("KFZ", "KFZ = Pkw + Lkw + Lz + Bus + Krad");
    formeln.set("SV", "SV = Lkw + Lz + Bus");
    formeln.set("GV", "GV = Lkw + Lz");
    formeln.set("SV%", "SV-Anteil = SV : KFZ x 100(%)");
    formeln.set("GV%", "GV-Anteil = GV : KFZ x 100(%)");
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
    if (isSv_pInBelastungsPlan.value) {
        chosenFahrzeugartAsTextArray.push("SV%");
    }
    if (isGv_pInBelastungsPlan.value) {
        chosenFahrzeugartAsTextArray.push("GV%");
    }

    canvas.value
        .text(function (add) {
            add.tspan("Tageswert").font({ weight: "bold" });
            add.tspan("0-24 Uhr").newLine();
            if (chosenFahrzeugartAsTextArray.length != 0) {
                let textstart = 0;
                add.tspan("").newLine();
                add.tspan(chosenFahrzeugartAsTextArray[0])
                    .newLine()
                    .x(textstart)
                    .font({ weight: "bold" });
                textstart += 60;
                for (let i = 1; i < chosenFahrzeugartAsTextArray.length; i++) {
                    add.tspan(chosenFahrzeugartAsTextArray[i])
                        .x(textstart)
                        .font({ weight: "bold" });
                    textstart += 60;
                }
                chosenFahrzeugartAsTextArray.forEach((text) => {
                    add.tspan(formeln.get(text)!).newLine();
                });
            }
        })
        .move(10, startY.value + 550);
}

function calcStrokeSize(mq: LadeBelastungsplanMessqueschnittDataDTO): number {
    const maxLineWidth = 20;
    const totalVerkehrMq = mq.sumKfz + mq.sumGv + mq.sumSv;
    const totalVerkehr =
        props.belastungsplanData.totalKfz +
        props.belastungsplanData.totalGv +
        props.belastungsplanData.totalSv;
    const percentageMqComparedToTotal = totalVerkehrMq / totalVerkehr;
    let result = percentageMqComparedToTotal * maxLineWidth;
    return result > 1 ? result : 1;
}
</script>

<style scoped>

</style>