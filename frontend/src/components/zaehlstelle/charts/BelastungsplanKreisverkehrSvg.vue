<script setup lang="ts">
/*
 const x = Math.round(Math.sin(point * (Math.PI / 180)) * 100 + 200);
  const y = Math.round(Math.cos(point * (Math.PI / 180)) * 100 + 200);
 */

import LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import { computed, ref } from "vue";

const rotation = new Map([
    [0, -90],
    [1, 0],
    [4, -45],
    [5, 45],
]);

const rotationLeft = new Map([
    [2, -90],
    [3, 0],
    [6, -45],
    [7, 45],
]);

const helpLinesRight = computed(() => {
    let map = new Map();
    if (props.plan.streets[4] != null) {
        map.set(1, -22.5);
        map.set(4, -67.5);
    } else {
        map.set(1, -22.5);
    }
    if (props.plan.streets[5] != null) {
        map.set(5, 22.5);
        map.set(2, 67.5);
    } else {
        map.set(2, 45);
    }
    return map;
});

const helpLinesLeft = computed(() => {
    let map = new Map();
    if (props.plan.streets[4] != null) {
        map.set(3, -22.5);
        map.set(6, -67.5);
    } else {
        map.set(3, -22.5);
    }
    if (props.plan.streets[5] != null) {
        map.set(0, 22.5);
        map.set(7, 67.5);
    } else {
        map.set(0, 45);
    }
    return map;
});

interface Props {
    plan: LadeBelastungsplanDTO;
}

const props = defineProps<Props>();

const rightStreetsNumbers = [0, 1, 4, 5];
const leftStreetsNumbers = [2, 3, 6, 7];
const rightHelpLineNumbers = computed(() => {
    let array = [];
    if (props.plan.streets[4] != null) {
        array.push(1);
        array.push(4);
    } else {
        array.push(1);
    }
    if (props.plan.streets[5] != null) {
        array.push(2);
        array.push(5);
    } else {
        array.push(2);
    }
    return array;
});

const leftLineNumbers = computed(() => {
    let array = [];
    if (props.plan.streets[4] != null) {
        array.push(3);
        array.push(6);
    } else {
        array.push(3);
    }
    if (props.plan.streets[5] != null) {
        array.push(0);
        array.push(7);
    } else {
        array.push(0);
    }
    return array;
});
</script>

<template>
    <svg
        v-if="plan.streets"
        width="1000"
        height="1000"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="100 100  700 700"
    >
        <!-- Pfad 2-->
        <g
            v-for="(number, i) in rightStreetsNumbers"
            :key="`${Math.random()} + ${i}`"
        >
            <g v-if="plan.streets[number]">
                <path
                    d="M 492 362 Q 498 380 528 380  M 528 420 Q 498 420 492 438 "
                    :transform="`rotate(${rotation.get(number)} 400,400)`"
                    style="stroke: black; fill: transparent"
                />
                <text
                    x="500"
                    y="403"
                    style="font-size: xx-small"
                    :transform="`rotate(${rotation.get(number)} 400,400)`"
                >
                    {{ plan.streets[number] }}
                </text>
                <circle
                    cx="490"
                    cy="400"
                    r="6"
                    style="stroke: black; fill: transparent"
                    :transform="`rotate(${rotation.get(number)} 400,400)`"
                />
                <text
                    x="487.5"
                    y="403"
                    style="font-size: xx-small"
                    :transform="`rotate(${rotation.get(number)} 400,400)`"
                >
                    {{ number + 1 }}
                </text>
                <g
                    v-if="
                        plan.value1.values[number][0] != 0 &&
                        plan.value2.values[number][0] != 0 &&
                        plan.value1.values[number][0] != 0
                    "
                >
                    <text
                        x="560"
                        y="390"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotation.get(number)} 400,400)`"
                    >
                        {{ plan.value1.values[number][0] }}
                    </text>
                    <text
                        x="600"
                        y="390"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotation.get(number)} 400,400)`"
                    >
                        {{ plan.value2.values[number][0] }}
                    </text>
                    <text
                        x="640"
                        y="390"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotation.get(number)} 400,400)`"
                    >
                        {{ plan.value3.values[number][0] }}
                    </text>
                </g>
                <g>
                    <text
                        x="560"
                        y="415"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotation.get(number)} 400,400)`"
                    >
                        {{
                            plan.value1.values[number][0] +
                            plan.value1.values[1][2]
                        }}
                    </text>
                    <text
                        x="600"
                        y="415"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotation.get(number)} 400,400)`"
                    >
                        {{
                            plan.value2.values[number][0] +
                            plan.value2.values[1][2]
                        }}
                    </text>
                    <text
                        x="640"
                        y="415"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotation.get(number)} 400,400)`"
                    >
                        {{
                            plan.value3.values[number][0] +
                            plan.value3.values[1][2]
                        }}
                    </text>
                </g>
                <g>
                    <text
                        x="560"
                        y="430"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotation.get(number)} 400,400)`"
                    >
                        {{ plan.value1.values[1][2] }}
                    </text>
                    <text
                        x="600"
                        y="430"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotation.get(number)} 400,400)`"
                    >
                        {{ plan.value2.values[1][2] }}
                    </text>
                    <text
                        x="640"
                        y="430"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotation.get(number)} 400,400)`"
                    >
                        {{ plan.value3.values[1][2] }}
                    </text>
                </g>
            </g>
            <path
                v-else
                d="M 492 362 Q 510 400 492 438"
                style="stroke: black; fill: transparent"
                :transform="`rotate(${rotation.get(number)} 400,400)`"
            />
        </g>
        <!-- Pfad 4-->
        <g
            v-for="(number, i) in leftStreetsNumbers"
            :key="`${Math.random()} + ${i}`"
        >
            <g v-if="plan.streets[number]">
                <path
                    d="M 308 438 Q 302 420 272 420 M 272 380 Q 302 380 308 362"
                    style="stroke: black; fill: transparent"
                    :transform="`rotate(${rotationLeft.get(number)} 400,400)`"
                />
                <text
                    x="270"
                    y="403"
                    style="font-size: xx-small"
                    :transform="`rotate(${rotationLeft.get(number)} 400,400)`"
                >
                    {{ plan.streets[number] }}
                </text>
                <circle
                    cx="260"
                    cy="400"
                    r="6"
                    style="stroke: black; fill: transparent"
                    :transform="`rotate(${rotationLeft.get(number)} 400,400)`"
                />
                <text
                    x="257,5"
                    y="403"
                    style="font-size: xx-small"
                    :transform="`rotate(${rotationLeft.get(number)} 400,400)`"
                >
                    {{ number + 1 }}
                </text>
                <g
                    v-if="
                        plan.value1.values[number][0] != 0 &&
                        plan.value2.values[number][0] != 0 &&
                        plan.value1.values[number][0] != 0
                    "
                >
                    <text
                        x="140"
                        y="390"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value1.values[number][0] }}
                    </text>
                    <text
                        x="180"
                        y="390"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value2.values[number][0] }}
                    </text>
                    <text
                        x="220"
                        y="390"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value3.values[number][0] }}
                    </text>
                </g>
                <g>
                    <text
                        x="140"
                        y="415"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{
                            plan.value1.values[number][0] +
                            plan.value1.values[1][2]
                        }}
                    </text>
                    <text
                        x="180"
                        y="415"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{
                            plan.value2.values[number][0] +
                            plan.value2.values[1][2]
                        }}
                    </text>
                    <text
                        x="220"
                        y="415"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{
                            plan.value3.values[number][0] +
                            plan.value3.values[1][2]
                        }}
                    </text>
                </g>
                <g>
                    <text
                        x="140"
                        y="430"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value1.values[number][2] }}
                    </text>
                    <text
                        x="180"
                        y="430"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value2.values[number][2] }}
                    </text>
                    <text
                        x="220"
                        y="430"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value3.values[number][2] }}
                    </text>
                </g>
            </g>
            <path
                v-else
                d="M 308 438 Q 290 400 308 362"
                style="stroke: black; fill: transparent"
                :transform="`rotate(${rotationLeft.get(number)} 400,400)`"
            />
        </g>
        <g>
            <!-- Marker für die zählung im Kreisverkehr Selbst-->
            <g
                v-for="(number, i) in rightHelpLineNumbers"
                :key="`${Math.random()} + ${i}`"
            >
                <line
                    x1="500"
                    y1="400"
                    x2="550"
                    y2="400"
                    stroke="black"
                    :transform="`rotate(${helpLinesRight.get(number)} 400,400)`"
                />
                <text
                    x="560"
                    y="402.5"
                    style="font-size: xx-small"
                    :transform="`rotate(${helpLinesRight.get(number)} 400,400)`"
                >
                    {{ plan.value1.sumIn[number] }}
                </text>
                <text
                    x="600"
                    y="402.5"
                    style="font-size: xx-small"
                    :transform="`rotate(${helpLinesRight.get(number)} 400,400)`"
                >
                    {{ plan.value3.sumIn[number] }}
                </text>
                <text
                    x="640"
                    y="402.5"
                    style="font-size: xx-small"
                    :transform="`rotate(${helpLinesRight.get(number)} 400,400)`"
                >
                    {{ plan.value3.sumIn[number] }}
                </text>
            </g>
            <g
                v-for="(number, i) in leftLineNumbers"
                :key="`${Math.random()} + ${i}`"
            >
                <line
                    x1="250"
                    y1="400"
                    x2="300"
                    y2="400"
                    stroke="black"
                    :transform="`rotate(${helpLinesLeft.get(number)} 400,400)`"
                />
                <text
                    x="140"
                    y="402.5"
                    style="font-size: xx-small"
                    :transform="`rotate(${helpLinesLeft.get(number)} 400,400)`"
                >
                    {{ plan.value1.sumIn[number] }}
                </text>
                <text
                    x="180"
                    y="402.5"
                    style="font-size: xx-small"
                    :transform="`rotate(${helpLinesLeft.get(number)} 400,400)`"
                >
                    {{ plan.value3.sumIn[number] }}
                </text>
                <text
                    x="220"
                    y="402.5"
                    style="font-size: xx-small"
                    :transform="`rotate(${helpLinesLeft.get(number)} 400,400)`"
                >
                    {{ plan.value3.sumIn[number] }}
                </text>
            </g>
        </g>
    </svg>
</template>

<style scoped>

</style>