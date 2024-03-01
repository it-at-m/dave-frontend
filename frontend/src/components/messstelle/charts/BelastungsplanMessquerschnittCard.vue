<template>
    <v-sheet
        id="drawingMessquerschnittBelastungsplan"
        :width="props.dimension"
        :height="props.dimension"
    />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import ListBelastungsplanMessquerschnitteDTO from "@/types/messstelle/ListBelastungsplanMessquerschnitteDTO";
import * as SVG from "@svgdotjs/svg.js";
import { Svg } from "@svgdotjs/svg.js";
import _ from "lodash";

interface Props {
    belastungsplanData: ListBelastungsplanMessquerschnitteDTO;
    dimension: string;
}

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

const props = defineProps<Props>();

onMounted(() => {
    canvas.value
        .addTo("#drawingMessquerschnittBelastungsplan")
        .size(props.dimension, props.dimension)
        .viewbox(0, 0, viewbox.value, viewbox.value);
    let groupedByDirecition = _.chain(
        props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList
    )
        .groupBy("direction")
        .map((value, key) => ({ direction: key, data: value }))
        .value();
    console.log(groupedByDirecition);
    drawArrowDownwards(150, 250);
});

function drawArrowDownwards(startX: number, startY: number) {
    let querschnittGroup = canvas.value.group();
    let groupedByDirecition = _.chain(
        props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList
    )
        .groupBy("direction")
        .map((value, key) => ({ direction: key, data: value }))
        .value();
    let arrayOfDataForDirectionNorth = groupedByDirecition.find(
        (obj) => obj.direction == "N" || obj.direction == "W"
    );
    let arrayOfDataForDirectionSouth = groupedByDirecition.find(
        (obj) => obj.direction == "S" || obj.direction == "O"
    );
    arrayOfDataForDirectionSouth?.data.forEach((mq) => {
        querschnittGroup.add(
            SVG.SVG()
                .path(
                    `M ${startX} ${startY} L ${startX} ${startY + 300} L ${
                        startX - 10
                    } ${startY + 300} L ${startX + 10} ${startY + 315} L ${
                        startX + 30
                    } ${startY + 300} L ${startX + 20} ${startY + 300} L ${
                        startX + 20
                    } ${startY} L ${startX} ${startY}`
                )
                .stroke({ width: 2, color: "black" })
                .attr("fill", "none")
                .transform({
                    rotate: rotation.get(mq.direction),
                })
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${mq.sumKfz}`)
                .rotate(270, startX, startY)
                .move(startX + 10, startY)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${mq.sumSv}`)
                .rotate(270, startX, startY)
                .move(startX + 75, startY)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${mq.sumGv}`)
                .rotate(270, startX, startY)
                .move(startX + 140, startY)
        );
        startX += 50;
    });
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
                .line(startX - 25, startY, startX - 25, startY - 180)
                .stroke({ width: 1, color: "black" })
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqKfz}`)
                .rotate(270, startX, startY)
                .move(startX + 10, startY - 20)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqSv}`)
                .rotate(270, startX, startY)
                .move(startX + 75, startY - 20)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqGv}`)
                .rotate(270, startX, startY)
                .move(startX + 140, startY - 20)
        );
    }
    startX += 20;
    querschnittGroup.add(
        SVG.SVG()
            .text("Dave-STraße")
            .move(startX, startY + 150)
            .font({ anchor: "middle", size: 25 })
            .rotate(270, startX, startY + 150)
    );
    startX += 90;
    arrayOfDataForDirectionNorth?.data.forEach((mq) => {
        querschnittGroup.add(
            SVG.SVG()
                .path(
                    `M ${startX} ${startY} L ${startX} ${startY + 300} L ${
                        startX - 10
                    } ${startY + 300} L ${startX + 10} ${startY + 315} L ${
                        startX + 30
                    } ${startY + 300} L ${startX + 20} ${startY + 300} L ${
                        startX + 20
                    } ${startY} L ${startX} ${startY}`
                )
                .stroke({ width: 2, color: "black" })
                .attr("fill", "none")
                .transform({
                    rotate: rotation.get(mq.direction),
                })
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${mq.sumKfz}`)
                .move(startX, startY + 455)
                .font({ anchor: "end" })
                .rotate(270, startX, startY + 455)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${mq.sumSv}`)
                .move(startX, startY + 390)
                .font({ anchor: "end" })
                .rotate(270, startX, startY + 390)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${mq.sumGv}`)
                .move(startX, startY + 325)
                .font({ anchor: "end" })
                .rotate(270, startX, startY + 325)
        );
        startX += 50;
    });
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
                .line(startX - 25, startY + 500, startX - 25, startY + 315)
                .stroke({ width: 1, color: "black" })
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqKfz}`)
                .move(startX - 20, startY + 455)
                .font({ anchor: "end" })
                .rotate(270, startX - 20, startY + 455)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqSv}`)
                .move(startX - 20, startY + 390)
                .font({ anchor: "end" })
                .rotate(270, startX - 20, startY + 390)
        );
        querschnittGroup.add(
            SVG.SVG()
                .text(`${sumMqGv}`)
                .move(startX - 20, startY + 325)
                .font({ anchor: "end" })
                .rotate(270, startX - 20, startY + 325)
        );
    }
    let messtelleInfoGroupXCoords = startX;
    if (arrayOfDataForDirectionSouth?.direction == "W") {
        querschnittGroup.rotate(90).translate(100, -150);
        messtelleInfoGroupXCoords = startY + 500;
    }
    let messstelleInfoGroup = canvas.value.group();
    messstelleInfoGroup.add(
        SVG.SVG().text("Messstelle: 4xxx").move(messtelleInfoGroupXCoords, 0)
    );
    messstelleInfoGroup.add(
        SVG.SVG().text("Stadtbezirk: 4xxx").move(messtelleInfoGroupXCoords, 20)
    );
    messstelleInfoGroup.add(
        SVG.SVG().text("Messtag: 4xxx").move(messtelleInfoGroupXCoords, 40)
    );
    messstelleInfoGroup.add(
        SVG.SVG().text("Messzeitraum: 4xxx").move(messtelleInfoGroupXCoords, 60)
    );
    let northGroup = canvas.value.group();
    northGroup
        .path("M 30 0 L 20 30 L 40 30 L 30 0")
        .stroke({ width: 1, color: "black" })
        .attr("fill", "none");
    northGroup.text("N").move(25, 15).font({ size: 13 });
    canvas.value
        .text(function (add) {
            add.tspan("Tageswert ");
            add.tspan("0-24 Uhr").newLine();
            add.tspan("KV = Pkw + Lfw + Lkw + Lz + Bus + Krad").newLine();
            add.tspan("SV = Lkw + lz + Bus").newLine();
            add.tspan("GV = Lkw + Lz").newLine();
        })
        .move(0, startY + 500);
}
</script>

<style scoped>

</style>