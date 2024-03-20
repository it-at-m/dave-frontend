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

const rotation = new Map<string, number>([
    ["N", 180],
    ["O", 0],
    ["S", 0],
    ["W", 180],
]);

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
    let groupedByDirection = _.chain(
        props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList
    )
        .groupBy("direction")
        .map((value, key) => ({ direction: key, data: value }))
        .value();
    startX.value = 150;
    startY.value = 250;
    draw();
}

const chosenOptionsCopy = computed(() => {
    return store.getters["filteroptionsMessstelle/getFilteroptions"];
});

const chosenOptionsCopyFahrzeuge = computed(() => {
    return chosenOptionsCopy.value.fahrzeuge;
});

function drawTotal(querschnittGroup: any) {
    let positionTotalTextRight = 10;
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
        querschnittGroup.add(
            SVG.SVG()
                .text(`${props.belastungsplanData.totalKfz}`)
                .move(startX.value, startY.value - positionTotalTextRight)
                .rotate(
                    270,
                    startX.value,
                    startY.value - positionTotalTextRight
                )
        );
        positionTotalTextRight += 65;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
        querschnittGroup.add(
            SVG.SVG()
                .text(`${props.belastungsplanData.totalGv}`)
                .move(startX.value, startY.value - positionTotalTextRight)
                .rotate(
                    270,
                    startX.value,
                    startY.value - positionTotalTextRight
                )
        );
        positionTotalTextRight += 65;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
        querschnittGroup.add(
            SVG.SVG()
                .text(`${props.belastungsplanData.totalSv}`)
                .move(startX.value, startY.value - positionTotalTextRight)
                .rotate(
                    270,
                    startX.value,
                    startY.value - positionTotalTextRight
                )
        );
        positionTotalTextRight += 65;
    }
    if (isGv_pInBelastungsPlan.value) {
        querschnittGroup.add(
            SVG.SVG()
                .text(`${props.belastungsplanData.totalPercentGv}`)
                .move(startX.value, startY.value - positionTotalTextRight)
                .rotate(
                    270,
                    startX.value,
                    startY.value - positionTotalTextRight
                )
        );
        positionTotalTextRight += 65;
    }
    if (isSv_pInBelastungsPlan.value) {
        querschnittGroup.add(
            SVG.SVG()
                .text(`${props.belastungsplanData.totalPercentSv}`)
                .move(startX.value, startY.value - positionTotalTextRight)
                .rotate(
                    270,
                    startX.value,
                    startY.value - positionTotalTextRight
                )
        );
        positionTotalTextRight += 65;
    }

    let positionTotalTextLeft = 370;
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
        querschnittGroup.add(
            SVG.SVG()
                .text(`${props.belastungsplanData.totalKfz}`)
                .move(startX.value, startY.value + positionTotalTextLeft)
                .rotate(270, startX.value, startY.value + positionTotalTextLeft)
        );
        positionTotalTextLeft += 65;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
        querschnittGroup.add(
            SVG.SVG()
                .text(`${props.belastungsplanData.totalGv}`)
                .move(startX.value, startY.value + positionTotalTextLeft)
                .rotate(270, startX.value, startY.value + positionTotalTextLeft)
        );
        positionTotalTextLeft += 65;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
        querschnittGroup.add(
            SVG.SVG()
                .text(`${props.belastungsplanData.totalSv}`)
                .move(startX.value, startY.value + positionTotalTextLeft)
                .rotate(270, startX.value, startY.value + positionTotalTextLeft)
        );
        positionTotalTextLeft += 65;
    }
    if (isGv_pInBelastungsPlan.value) {
        querschnittGroup.add(
            SVG.SVG()
                .text(`${props.belastungsplanData.totalPercentGv}`)
                .move(startX.value, startY.value + positionTotalTextLeft)
                .rotate(270, startX.value, startY.value + positionTotalTextLeft)
        );
        positionTotalTextLeft += 65;
    }
    if (isSv_pInBelastungsPlan.value) {
        querschnittGroup.add(
            SVG.SVG()
                .text(`${props.belastungsplanData.totalPercentSv}`)
                .move(startX.value, startY.value + positionTotalTextLeft)
                .rotate(270, startX.value, startY.value + positionTotalTextLeft)
        );
        positionTotalTextLeft += 65;
    }
}

watch(chosenOptionsCopyFahrzeuge, () => {
    canvas.value.clear();
    drawingConfig();
});
function draw() {
    let querschnittGroup = canvas.value.group();
    let groupedByDirecition = _.chain(
        props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList
    )
        .groupBy("direction")
        .map((value, key) => ({ direction: key, data: value }))
        .value();

    drawArrowsPointingSouth(groupedByDirecition, querschnittGroup);
    startX.value += 50;
    drawStreetName(querschnittGroup);
    drawTotal(querschnittGroup);
    startX.value += 90;
    drawArrowsPointingNorth(groupedByDirecition, querschnittGroup);
    rotateArrowsIfNeccacary(querschnittGroup);
    drawMessstelleInfo();
    drawNorthSymbol();
    drawLegende();
}
function rotateArrowsIfNeccacary(querschnittGroup: any) {
    const direction =
        props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList[0]
            .direction;
    if (direction == "W" || direction == "O") {
        querschnittGroup.rotate(90).translate(100, -150);
        startX.value = startY.value + 500;
    }
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
            add.tspan("Tageswert ");
            add.tspan("0-24 Uhr").newLine();
            if (chosenFahrzeugartAsTextArray.length != 0) {
                let textstart = 0;
                add.tspan(chosenFahrzeugartAsTextArray[0])
                    .newLine()
                    .x(textstart);
                textstart += 60;
                for (let i = 1; i < chosenFahrzeugartAsTextArray.length; i++) {
                    add.tspan(chosenFahrzeugartAsTextArray[i]).x(textstart);
                    textstart += 60;
                }
                chosenFahrzeugartAsTextArray.forEach((text) => {
                    add.tspan(formeln.get(text)!).newLine();
                });
            }
        })
        .move(0, startY.value + 500);
}

function drawArrowsPointingSouth(
    groupedByDirecition: {
        data: LadeBelastungsplanMessqueschnittDataDTO[];
        direction: string;
    }[],
    querschnittGroup: any
) {
    let arrayOfDataForDirectionSouth = groupedByDirecition.find(
        (obj) => obj.direction == "S" || obj.direction == "O"
    );
    arrayOfDataForDirectionSouth?.data.forEach((mq) => {
        querschnittGroup.add(
            SVG.SVG()
                .line(
                    startX.value + 10,
                    startY.value,
                    startX.value + 10,
                    startY.value + 300
                )
                .stroke({ width: 10, color: "black" })
        );
        querschnittGroup.add(
            SVG.SVG()
                .polygon(
                    `${startX.value + 20},${startY.value + 301} ${
                        startX.value
                    },${startY.value + 301} ${startX.value + 10} ${
                        startY.value + 310
                    }`
                )
                .stroke({ width: 1, color: "black" })
                .attr("fill", "none")
        );
        let textstart = 10;
        if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${mq.sumKfz}`)
                    .move(startX.value + textstart, startY.value)
                    .rotate(270, startX.value, startY.value)
            );
            textstart += 65;
        }
        if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${mq.sumSv}`)
                    .move(startX.value + textstart, startY.value)
                    .font({ anchor: "start" })
                    .rotate(270, startX.value, startY.value)
            );
            textstart += 65;
        }
        if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${mq.sumGv}`)
                    .move(startX.value + textstart, startY.value)
                    .font({ anchor: "start" })
                    .rotate(270, startX.value, startY.value)
            );
            textstart += 65;
        }
        if (isGv_pInBelastungsPlan.value) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${mq.percentGV}`)
                    .move(startX.value + textstart, startY.value)
                    .font({ anchor: "start" })
                    .rotate(270, startX.value, startY.value)
            );
            textstart += 65;
        }
        if (isSv_pInBelastungsPlan.value) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${mq.percentSv}`)
                    .move(startX.value + textstart, startY.value)
                    .font({ anchor: "start" })
                    .rotate(270, startX.value, startY.value)
            );
            textstart += 65;
        }
        startX.value += 50;
    });
    addSumSouthIfNeccacary(arrayOfDataForDirectionSouth, querschnittGroup);
}

function drawStreetName(querschnittGroup: any) {
    querschnittGroup.add(
        SVG.SVG()
            .text("Dave-STraße")
            .move(startX.value, startY.value + 150)
            .font({ anchor: "middle", size: 25 })
            .rotate(270, startX.value, startY.value + 150)
    );
}

function addSumNorthIfNeccacary(
    arrayOfDataForDirectionNorth: {
        data: LadeBelastungsplanMessqueschnittDataDTO[] | undefined;
        direction: string | undefined;
    },
    querschnittGroup: any
) {
    if (arrayOfDataForDirectionNorth?.data.length > 1) {
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
        querschnittGroup.add(
            SVG.SVG()
                .line(
                    startX.value - 25,
                    startY.value + 500,
                    startX.value - 25,
                    startY.value + 315
                )
                .stroke({ width: 1, color: "black" })
        );
        if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${sumMqKfz}`)
                    .move(startX.value - 20, startY.value + 455)
                    .font({ anchor: "end" })
                    .rotate(270, startX.value - 20, startY.value + 455)
            );
        }
        if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${sumMqSv}`)
                    .move(startX.value - 20, startY.value + 390)
                    .font({ anchor: "end" })
                    .rotate(270, startX.value - 20, startY.value + 390)
            );
        }
        if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${sumMqGv}`)
                    .move(startX.value - 20, startY.value + 325)
                    .font({ anchor: "end" })
                    .rotate(270, startX.value - 20, startY.value + 325)
            );
        }
        if (isSv_pInBelastungsPlan.value) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${percentageMqSv}`)
                    .move(startX.value - 20, startY.value + 325)
                    .font({ anchor: "end" })
                    .rotate(270, startX.value - 20, startY.value + 325)
            );
        }
        if (isGv_pInBelastungsPlan.value) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${percentageMqGv}`)
                    .move(startX.value - 20, startY.value + 325)
                    .font({ anchor: "end" })
                    .rotate(270, startX.value - 20, startY.value + 325)
            );
        }
    }
}

function drawArrowsPointingNorth(
    groupedByDirecition: {
        data: LadeBelastungsplanMessqueschnittDataDTO[];
        direction: string;
    }[],
    querschnittGroup: any
) {
    let arrayOfDataForDirectionNorth = groupedByDirecition.find(
        (obj) => obj.direction == "N" || obj.direction == "W"
    );
    arrayOfDataForDirectionNorth?.data.forEach((mq) => {
        querschnittGroup.add(
            SVG.SVG()
                .line(
                    startX.value + 10,
                    startY.value,
                    startX.value + 10,
                    startY.value + 300
                )
                .stroke({ width: 10, color: farben.get(mq.direction) })
        );
        querschnittGroup.add(
            SVG.SVG()
                .polygon(
                    `${startX.value + 20},${startY.value - 1} ${startX.value},${
                        startY.value - 1
                    } ${startX.value + 10} ${startY.value - 10}`
                )
                .stroke({ width: 1, color: "black" })
                .attr("fill", "none")
        );
        let textstart = 455;
        if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${mq.sumKfz}`)
                    .move(startX.value, startY.value + textstart)
                    .font({ anchor: "end" })
                    .rotate(270, startX.value, startY.value + textstart)
            );
            textstart -= 65;
        }
        if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${mq.sumSv}`)
                    .move(startX.value, startY.value + textstart)
                    .font({ anchor: "end" })
                    .rotate(270, startX.value, startY.value + textstart)
            );
            textstart -= 65;
        }
        if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${mq.sumGv}`)
                    .move(startX.value, startY.value + textstart)
                    .font({ anchor: "end" })
                    .rotate(270, startX.value, startY.value + textstart)
            );
            textstart -= 65;
        }
        if (isGv_pInBelastungsPlan.value) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${mq.percentGV}`)
                    .move(startX.value, startY.value + textstart)
                    .font({ anchor: "end" })
                    .rotate(270, startX.value, startY.value + textstart)
            );
            textstart -= 65;
        }
        if (isSv_pInBelastungsPlan.value) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${mq.percentSv}`)
                    .move(startX.value, startY.value + textstart)
                    .font({ anchor: "end" })
                    .rotate(270, startX.value, startY.value + textstart)
            );
            textstart -= 65;
        }
        startX.value += 50;
    });
    addSumNorthIfNeccacary(arrayOfDataForDirectionNorth, querschnittGroup);
}

function drawMessstelleInfo() {
    canvas.value
        .text(function (add) {
            add.tspan("Messstelle ").font({ weight: "bold" });
            add.tspan("Stadtbezirk").newLine();
            add.tspan("Messtag").newLine();
            add.tspan("Messzeitraum").newLine();
        })
        .move(startX.value, 0);
}

function drawNorthSymbol() {
    canvas.value
        .path("M 30 0 L 20 30 L 40 30 L 30 0")
        .stroke({ width: 1, color: "black" })
        .attr("fill", "none");
    canvas.value.text("N").move(25, 15).font({ size: 13 });
}

function addSumSouthIfNeccacary(
    arrayOfDataForDirectionSouth:
        | { data: LadeBelastungsplanMessqueschnittDataDTO[]; direction: string }
        | undefined,
    querschnittGroup: any
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

        querschnittGroup.add(
            SVG.SVG()
                .line(
                    startX.value - 25,
                    startY.value,
                    startX.value - 25,
                    startY.value - 180
                )
                .stroke({ width: 1, color: "black" })
        );
        let positionX = 10;
        if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${sumMqKfz}`)
                    .rotate(270, startX.value, startY.value)
                    .move(startX.value + positionX, startY.value - 20)
            );
            positionX += 65;
        }
        if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${sumMqSv}`)
                    .rotate(270, startX.value, startY.value)
                    .move(startX.value + positionX, startY.value - 20)
            );
            positionX += 65;
        }
        if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${sumMqGv}`)
                    .rotate(270, startX.value, startY.value)
                    .move(startX.value + positionX, startY.value - 20)
            );
            positionX += 65;
        }
        if (isSv_pInBelastungsPlan.value) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${percentageMqSv}`)
                    .rotate(270, startX.value, startY.value)
                    .move(startX.value + positionX, startY.value - 20)
            );
            positionX += 65;
        }
        if (isGv_pInBelastungsPlan.value) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${percentageMqGv}`)
                    .rotate(270, startX.value, startY.value)
                    .move(startX.value + positionX, startY.value - 20)
            );
            positionX += 65;
        }
    }
}

function calcPercentage(partial: number, total: number) {
    return ((100 * partial) / total).toFixed(1);
}
</script>

<style scoped>

</style>