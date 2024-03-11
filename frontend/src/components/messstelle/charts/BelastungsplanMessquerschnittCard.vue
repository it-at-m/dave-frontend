<template>
    <v-sheet
        id="drawingMessquerschnittBelastungsplan"
        :width="props.dimension"
        :height="props.dimension"
    />
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ListBelastungsplanMessquerschnitteDTO from "@/types/messstelle/ListBelastungsplanMessquerschnitteDTO";
import * as SVG from "@svgdotjs/svg.js";
import { Svg } from "@svgdotjs/svg.js";
import _ from "lodash";
import LadeBelastungsplanMessqueschnittDataDTO from "@/types/messstelle/LadeBelastungsplanMessqueschnittDataDTO";
import { useStore } from "@/api/util/useStore";
import { Ref } from "vue-property-decorator";
import { FilteroptionsMessstelle } from "@/store/modules/filteroptionsMessstelle";

interface Props {
    belastungsplanData: ListBelastungsplanMessquerschnitteDTO;
    dimension: string;
}

const store = useStore();
const canvas = ref<Svg>(SVG.SVG());
const viewbox = ref(800);

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

const props = defineProps<Props>();

onMounted(() => {
    canvas.value
        .addTo("#drawingMessquerschnittBelastungsplan")
        .size(1500, 1500)
        .viewbox(0, 0, viewbox.value + 200, viewbox.value + 200);
    let groupedByDirecition = _.chain(
        props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList
    )
        .groupBy("direction")
        .map((value, key) => ({ direction: key, data: value }))
        .value();
    console.log(groupedByDirecition);
    startX.value = 150;
    startY.value = 250;
    drawArrowDownwards();
});

const chosenOptionsCopy = computed(() => {
    return store.getters["filteroptionsMessstelle/getFilteroptions"];
});

const chosenOptionsCopyFahrzeuge = computed(() => {
    return chosenOptionsCopy.value.fahrzeuge;
});

const isSv_pInBelastungsPlan = computed(() => {
    let actualNumberOfSelectedKfzSvAndGv = 0;
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
        actualNumberOfSelectedKfzSvAndGv++;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
        actualNumberOfSelectedKfzSvAndGv++;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
        actualNumberOfSelectedKfzSvAndGv++;
    }
    return (
        chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent &&
        (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr ||
            chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
            chosenOptionsCopyFahrzeuge.value.gueterverkehr) &&
        actualNumberOfSelectedKfzSvAndGv < 3
    );
});

/**
 * Hilfsmethode, um zu schauen, ob der Wert GV% im Belastungsplan angezeigt wird.
 * Dies ist nur der Fall, wenn KFZ, SV oder GV aktiviert sind und inklusive GV_P nicht
 * mehr wie 3 Verkehrsarten (ohne RAD und FUSS) ausgewählt sind
 */
const isGv_pInBelastungsPlan = computed(() => {
    let actualNumberOfSelectedKfzSvGvAndSV_P = 0;
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
        actualNumberOfSelectedKfzSvGvAndSV_P++;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
        actualNumberOfSelectedKfzSvGvAndSV_P++;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
        actualNumberOfSelectedKfzSvGvAndSV_P++;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent) {
        actualNumberOfSelectedKfzSvGvAndSV_P++;
    }
    return (
        chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent &&
        (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr ||
            chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
            chosenOptionsCopyFahrzeuge.value.gueterverkehr) &&
        actualNumberOfSelectedKfzSvGvAndSV_P < 3
    );
});

function drawTotal(querschnittGroup: any) {
    querschnittGroup.add(
        SVG.SVG()
            .text("asdff")
            .move(startX.value, startY.value - 10)
            .rotate(270, startX.value, startY.value - 10)
    );
    querschnittGroup.add(
        SVG.SVG()
            .text("asdff")
            .move(startX.value, startY.value - 75)
            .rotate(270, startX.value, startY.value - 75)
    );
    querschnittGroup.add(
        SVG.SVG()
            .text("asdff")
            .move(startX.value, startY.value - 140)
            .rotate(270, startX.value, startY.value - 140)
    );
    querschnittGroup.add(
        SVG.SVG()
            .text("123")
            .font({ anchor: "start" })
            .move(startX.value, startY.value + 360)
            .rotate(270, startX.value, startY.value + 360)
    );
    querschnittGroup.add(
        SVG.SVG()
            .text("123")
            .font({ anchor: "start" })
            .move(startX.value, startY.value + 425)
            .rotate(270, startX.value, startY.value + 425)
    );
    querschnittGroup.add(
        SVG.SVG()
            .text("1234")
            .font({ anchor: "end" })
            .move(startX.value, startY.value + 500)
            .rotate(270, startX.value, startY.value + 500)
    );
}

function drawArrowDownwards() {
    let querschnittGroup = canvas.value.group();
    let groupedByDirecition = _.chain(
        props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList
    )
        .groupBy("direction")
        .map((value, key) => ({ direction: key, data: value }))
        .value();

    drawArrowsPointingSouth(groupedByDirecition, querschnittGroup);
    startX.value += 20;
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
    if (direction == "S" || direction == "N") {
        querschnittGroup.rotate(90).translate(100, -150);
        startX.value = startY.value + 500;
    }
}
function drawLegende() {
    canvas.value
        .text(function (add) {
            add.tspan("Tageswert ");
            add.tspan("0-24 Uhr").newLine();
            add.tspan("KV = Pkw + Lfw + Lkw + Lz + Bus + Krad").newLine();
            add.tspan("SV = Lkw + lz + Bus").newLine();
            add.tspan("GV = Lkw + Lz").newLine();
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
        let startXCoordsForText = startX.value + 10;
        if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
            querschnittGroup.add(
                SVG.SVG()
                    .text(`${mq.sumKfz}`)
                    .rotate(270, startX.value, startY.value)
                    .move(startX.value + 10, startY.value)
            );
        }

        querschnittGroup.add(
            SVG.SVG()
                .text(`${mq.sumSv}`)
                .rotate(270, startX.value, startY.value)
                .move(startX.value + 75, startY.value)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${mq.sumGv}`)
                .rotate(270, startX.value, startY.value)
                .move(startX.value + 140, startY.value)
        );
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
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqKfz}`)
                .move(startX.value - 20, startY.value + 455)
                .font({ anchor: "end" })
                .rotate(270, startX.value - 20, startY.value + 455)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqSv}`)
                .move(startX.value - 20, startY.value + 390)
                .font({ anchor: "end" })
                .rotate(270, startX.value - 20, startY.value + 390)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqGv}`)
                .move(startX.value - 20, startY.value + 325)
                .font({ anchor: "end" })
                .rotate(270, startX.value - 20, startY.value + 325)
        );
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
        querschnittGroup.add(
            SVG.SVG()
                .text(`${mq.sumKfz}`)
                .move(startX.value, startY.value + 455)
                .font({ anchor: "end" })
                .rotate(270, startX.value, startY.value + 455)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${mq.sumSv}`)
                .move(startX.value, startY.value + 390)
                .font({ anchor: "end" })
                .rotate(270, startX.value, startY.value + 390)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${mq.sumGv}`)
                .move(startX.value, startY.value + 325)
                .font({ anchor: "end" })
                .rotate(270, startX.value, startY.value + 325)
        );
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
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqKfz}`)
                .rotate(270, startX.value, startY.value)
                .move(startX.value + 10, startY.value - 20)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqSv}`)
                .rotate(270, startX.value, startY.value)
                .move(startX.value + 75, startY.value - 20)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqGv}`)
                .rotate(270, startX.value, startY.value)
                .move(startX.value + 140, startY.value - 20)
        );
    }
}
</script>

<style scoped>

</style>