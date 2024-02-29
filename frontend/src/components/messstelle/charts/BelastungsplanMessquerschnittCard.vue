<template>
    <div id="drawingMessquerschnittBelastungsplan" />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import ListBelastungsplanMessquerschnitteDTO from "@/types/messstelle/ListBelastungsplanMessquerschnitteDTO";
import * as SVG from "@svgdotjs/svg.js";
import { Svg } from "@svgdotjs/svg.js";
import _ from "lodash";
import LadeBelastungsplanMessqueschnittDataDTO from "@/types/messstelle/LadeBelastungsplanMessqueschnittDataDTO";

interface Props {
    belastungsplanData: ListBelastungsplanMessquerschnitteDTO;
}

const canvas = ref<Svg>(SVG.SVG());

const rotation = new Map<string, number>([
    ["N", 180],
    ["O", 270],
    ["S", 0],
    ["W", 90],
]);

const props = defineProps<Props>();

onMounted(() => {
    canvas.value
        .addTo("#drawingMessquerschnittBelastungsplan")
        .size(1000, 1000);
    let groupedByDirecition = _.chain(
        props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList
    )
        .groupBy("direction")
        .map((value, key) => ({ direction: key, data: value }))
        .value();
    console.log(groupedByDirecition);
    drawArrowDownwards(150, 250, "S");
});

function drawArrowDownwards(startX: number, startY: number, direction: string) {
    let groupedByDirecition = _.chain(
        props.belastungsplanData.ladeBelastungsplanMessquerschnittDataDTOList
    )
        .groupBy("direction")
        .map((value, key) => ({ direction: key, data: value }))
        .value();
    let arrayOfDataForDirectionNorth = groupedByDirecition.find(
        (obj) => obj.direction == "N"
    );
    let arrayOfDataForDirectionSouth = groupedByDirecition.find(
        (obj) => obj.direction == "S"
    );
    arrayOfDataForDirectionSouth?.data.forEach((mq) => {
        canvas.value
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
            });
        canvas.value
            .text(`${mq.sumKfz}`)
            .rotate(270, startX, startY)
            .move(startX + 10, startY);
        canvas.value
            .text(`${mq.sumSv}`)
            .rotate(270, startX, startY)
            .move(startX + 75, startY);
        canvas.value
            .text(`${mq.sumGv}`)
            .rotate(270, startX, startY)
            .move(startX + 140, startY);
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
        canvas.value
            .line(startX - 25, startY, startX - 25, startY - 180)
            .stroke({ width: 1, color: "black" });
        canvas.value
            .text(`${sumMqKfz}`)
            .rotate(270, startX, startY)
            .move(startX + 10, startY - 20);
        canvas.value
            .text(`${sumMqSv}`)
            .rotate(270, startX, startY)
            .move(startX + 75, startY - 20);
        canvas.value
            .text(`${sumMqGv}`)
            .rotate(270, startX, startY)
            .move(startX + 140, startY - 20);
    }
    startX += 20;
    canvas.value
        .text("Dave-STraße")
        .move(startX, startY + 150)
        .font({ anchor: "middle", size: 25 })
        .rotate(270, startX, startY + 150);
    startX += 90;
    arrayOfDataForDirectionNorth?.data.forEach((mq) => {
        canvas.value
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
            });
        canvas.value
            .text(`${mq.sumKfz}`)
            .move(startX, startY + 455)
            .font({ anchor: "end" })
            .rotate(270, startX, startY + 455);
        canvas.value
            .text(`${mq.sumSv}`)
            .move(startX, startY + 390)
            .font({ anchor: "end" })
            .rotate(270, startX, startY + 390);
        canvas.value
            .text(`${mq.sumGv}`)
            .move(startX, startY + 325)
            .font({ anchor: "end" })
            .rotate(270, startX, startY + 325);
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
        canvas.value
            .line(startX - 25, startY + 500, startX - 25, startY + 315)
            .stroke({ width: 1, color: "black" });
        canvas.value
            .text(`${sumMqKfz}`)
            .move(startX - 20, startY + 455)
            .font({ anchor: "end" })
            .rotate(270, startX - 20, startY + 455);
        canvas.value
            .text(`${sumMqSv}`)
            .move(startX - 20, startY + 390)
            .font({ anchor: "end" })
            .rotate(270, startX - 20, startY + 390);
        canvas.value
            .text(`${sumMqGv}`)
            .move(startX - 20, startY + 325)
            .font({ anchor: "end" })
            .rotate(270, startX - 20, startY + 325);
    }
    canvas.value.rotate(90, 100, 350);
}
</script>

<style scoped>

</style>