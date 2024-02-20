<script setup lang="ts">
import type LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import { computed, ref } from "vue";

interface Props {
    plan: LadeBelastungsplanDTO;
}

const props = defineProps<Props>();

const getMaxIn = computed(() => {
    let input = 0;
    for (let i = 0; i < 8; i++) {
        input +=
            props.plan.value1.values[i][0] +
            props.plan.value2.values[i][0] +
            props.plan.value3.values[i][0];
    }
    return input;
});

const getMaxOut = computed(() => {
    let input = 0;
    for (let i = 0; i < 8; i++) {
        input +=
            props.plan.value1.values[i][2] +
            props.plan.value2.values[i][2] +
            props.plan.value3.values[i][2];
    }
    return input;
});

function calcWidth(input: number): number {
    let t = getMaxIn.value / 6;
    let strokeWith = input / t;
    if (strokeWith < 1) {
        return 1;
    }
    return Math.round(strokeWith * 100) / 100;
}

function style(number: number) {
    return `stroke: ${farben.get(number)}; fill: transparent`;
}

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

const xSize = ref(140);
const ySize = ref(140);

const viewbox = computed(() => {
    return `100 120 ${xSize.value * 10} ${xSize.value * 10}`;
});

const farben = new Map<number, string>([
    [0, "#000000"],
    [1, "#F44336"],
    [2, "#4CAF50"],
    [3, "#2196F3"],
    [4, "#CDDC39"],
    [5, "#9C27B0"],
    [6, "#FF9800"],
    [7, "#795548"],
]);
</script>
<template>
    <div>
        <v-slider
            v-model="xSize"
            class="pt-10"
            min="40"
            max="200"
            thumb-label="always"
        />
        <svg
            v-if="plan.streets"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            :viewBox="viewbox"
        >
            <!-- Legende 1-->
            <g>
                <text
                    x="550"
                    y="150"
                    style="font-size: xx-small"
                >
                    Zählstelle: 12345
                </text>
                <text
                    x="550"
                    y="160"
                    style="font-size: xx-small"
                >
                    Stadtbezirk: 18
                </text>
                <text
                    x="550"
                    y="170"
                    style="font-size: xx-small"
                >
                    Zähldatum: 22.11.2022
                </text>
            </g>
            <!-- Legende2-->
            <g>
                <path
                    d="M 550 660 L 600 660 L 600 640 L 550 660"
                    style="stroke: black; fill: transparent"
                />
                <text
                    x="560"
                    y="670"
                    style="font-size: xx-small"
                >
                    123
                </text>
            </g>
            <!-- Legende 3-->
            <g>
                <text
                    x="150"
                    y="630"
                    style="font-size: x-small; font-weight: bold"
                >
                    Tageswert
                </text>
                <text
                    x="150"
                    y="640"
                    style="font-size: xx-small"
                >
                    Hochgerechnet
                </text>
                <text
                    x="150"
                    y="660"
                    style="font-size: xx-small"
                >
                    KFZ (SV) GV
                </text>
                <text
                    x="150"
                    y="670"
                    style="font-size: xx-small"
                >
                    KFZ = Pkw + Lkw + LZ + Bus + Krad
                </text>
                <text
                    x="150"
                    y="680"
                    style="font-size: xx-small"
                >
                    SV = Lkw + Lz + Bus
                </text>
                <text
                    x="150"
                    y="690"
                    style="font-size: xx-small"
                >
                    GV = Lkw + Lz
                </text>
            </g>
            <!-- Pfad 2-->
            <g
                v-for="(number, i) in rightStreetsNumbers"
                :key="i + Math.random()"
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
                    <path
                        v-if="
                            plan.value1.values[number][0] ||
                            (0 && plan.value2.values[number][0] != 0) ||
                            plan.value3.values[number][0] != 0
                        "
                        d="M 490 387.5 L 540 387.5 L 535 390 M 540 387.5 L 535 385"
                        :style="style(number)"
                        stroke-linecap="round"
                        :stroke-width="
                            calcWidth(
                                plan.value1.values[number][0] +
                                    plan.value2.values[number][0] +
                                    plan.value3.values[number][0]
                            )
                        "
                        :transform="`rotate(${rotation.get(number)} 400,400)`"
                    />
                    <path
                        v-if="
                            plan.value1.values[number][2] != 0 ||
                            plan.value2.values[number][2] != 0 ||
                            plan.value3.values[number][2] != 0
                        "
                        d="M 490 412.5 L 540 412.5 M 490 412.5 L 495 415 M 490 412.5 L 495 410"
                        :style="style(number)"
                        :stroke-width="
                            calcWidth(
                                plan.value1.values[number][2] +
                                    plan.value2.values[number][2] +
                                    plan.value3.values[number][2]
                            )
                        "
                        :transform="`rotate(${rotation.get(number)} 400,400)`"
                    />
                    <g
                        v-if="
                            plan.value1.values[number][0] != 0 &&
                            plan.value2.values[number][0] != 0 &&
                            plan.value3.values[number][0] != 0
                        "
                    >
                        <text
                            x="560"
                            y="390"
                            style="font-size: xx-small"
                            :transform="`rotate(${rotation.get(
                                number
                            )} 400,400)`"
                        >
                            {{ plan.value1.values[number][0] }}
                        </text>
                        <text
                            x="600"
                            y="390"
                            style="font-size: xx-small"
                            :transform="`rotate(${rotation.get(
                                number
                            )} 400,400)`"
                        >
                            {{ plan.value2.values[number][0] }}
                        </text>
                        <text
                            x="640"
                            y="390"
                            style="font-size: xx-small"
                            :transform="`rotate(${rotation.get(
                                number
                            )} 400,400)`"
                        >
                            {{ plan.value3.values[number][0] }}
                        </text>
                    </g>
                    <g>
                        <text
                            x="560"
                            y="415"
                            style="font-size: xx-small"
                            :transform="`rotate(${rotation.get(
                                number
                            )} 400,400)`"
                        >
                            {{
                                plan.value1.values[number][0] +
                                plan.value1.values[number][2]
                            }}
                        </text>
                        <text
                            x="600"
                            y="415"
                            style="font-size: xx-small"
                            :transform="`rotate(${rotation.get(
                                number
                            )} 400,400)`"
                        >
                            {{
                                plan.value2.values[number][0] +
                                plan.value2.values[number][2]
                            }}
                        </text>
                        <text
                            x="640"
                            y="415"
                            style="font-size: xx-small"
                            :transform="`rotate(${rotation.get(
                                number
                            )} 400,400)`"
                        >
                            {{
                                plan.value3.values[number][0] +
                                plan.value3.values[number][2]
                            }}
                        </text>
                    </g>
                    <g
                        v-if="
                            plan.value1.values[number][2] != 0 ||
                            plan.value2.values[number][2] != 0 ||
                            plan.value3.values[number][2] != 0
                        "
                    >
                        <text
                            x="560"
                            y="430"
                            style="font-size: xx-small"
                            :transform="`rotate(${rotation.get(
                                number
                            )} 400,400)`"
                        >
                            {{ plan.value1.values[number][2] }}
                        </text>
                        <text
                            x="600"
                            y="430"
                            style="font-size: xx-small"
                            :transform="`rotate(${rotation.get(
                                number
                            )} 400,400)`"
                        >
                            {{ plan.value2.values[number][2] }}
                        </text>
                        <text
                            x="640"
                            y="430"
                            style="font-size: xx-small"
                            :transform="`rotate(${rotation.get(
                                number
                            )} 400,400)`"
                        >
                            {{ plan.value3.values[number][2] }}
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
                :key="i + Math.random()"
            >
                <g v-if="plan.streets[number]">
                    <path
                        d="M 308 438 Q 302 420 272 420 M 272 380 Q 302 380 308 362"
                        style="stroke: black; fill: transparent"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    />
                    <text
                        x="270"
                        y="403"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.streets[number] }}
                    </text>
                    <circle
                        cx="260"
                        cy="400"
                        r="6"
                        style="stroke: black; fill: transparent"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    />
                    <text
                        x="257,5"
                        y="403"
                        style="font-size: xx-small"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{ number + 1 }}
                    </text>
                    <path
                        v-if="
                            plan.value1.values[number][2] != 0 ||
                            plan.value2.values[number][2] ||
                            (0 && plan.value3.values[number][2] != 0)
                        "
                        d="M 260 387.5 L 310 387.5 M 260 387.5 L 265 390 M 260 387.5 L 265 385"
                        :style="style(number)"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                        :stroke-width="
                            calcWidth(
                                plan.value1.values[number][2] +
                                    plan.value2.values[number][2] +
                                    plan.value3.values[number][2]
                            )
                        "
                        stroke-linecap="round"
                    />
                    <path
                        v-if="
                            plan.value1.values[number][0] != 0 ||
                            plan.value2.values[number][0] != 0 ||
                            plan.value1.values[number][0] != 0
                        "
                        d="M 260 412.5 L 310 412.5 L 305 415 M 310 412.5 L 305 410 "
                        :style="style(number)"
                        :transform="`rotate(${rotationLeft.get(
                            number
                        )} 400,400)`"
                        :stroke-width="
                            calcWidth(
                                plan.value1.values[number][0] +
                                    plan.value2.values[number][0] +
                                    plan.value1.values[number][0]
                            )
                        "
                        stroke-linecap="round"
                    />
                    <g
                        v-if="
                            plan.value1.values[number][0] != 0 ||
                            plan.value2.values[number][0] != 0 ||
                            plan.value3.values[number][0] != 0
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
                    <g
                        v-if="
                            plan.value1.values[number][2] != 0 ||
                            plan.value2.values[number][2] != 0 ||
                            plan.value3.values[number][2] != 0
                        "
                    >
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
                    :key="i + Math.random()"
                >
                    <line
                        x1="500"
                        y1="400"
                        x2="550"
                        y2="400"
                        stroke="black"
                        :transform="`rotate(${helpLinesRight.get(
                            number
                        )} 400,400)`"
                    />
                    <text
                        x="560"
                        y="402.5"
                        style="font-size: xx-small"
                        :transform="`rotate(${helpLinesRight.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value1.sumIn[number] }}
                    </text>
                    <text
                        x="600"
                        y="402.5"
                        style="font-size: xx-small"
                        :transform="`rotate(${helpLinesRight.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value3.sumIn[number] }}
                    </text>
                    <text
                        x="640"
                        y="402.5"
                        style="font-size: xx-small"
                        :transform="`rotate(${helpLinesRight.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value3.sumIn[number] }}
                    </text>
                </g>
                <g
                    v-for="(number, i) in leftLineNumbers"
                    :key="i + Math.random()"
                >
                    <line
                        x1="250"
                        y1="400"
                        x2="300"
                        y2="400"
                        stroke="black"
                        :transform="`rotate(${helpLinesLeft.get(
                            number
                        )} 400,400)`"
                    />
                    <text
                        x="140"
                        y="402.5"
                        style="font-size: xx-small"
                        :transform="`rotate(${helpLinesLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value1.sumIn[number] }}
                    </text>
                    <text
                        x="180"
                        y="402.5"
                        style="font-size: xx-small"
                        :transform="`rotate(${helpLinesLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value3.sumIn[number] }}
                    </text>
                    <text
                        x="220"
                        y="402.5"
                        style="font-size: xx-small"
                        :transform="`rotate(${helpLinesLeft.get(
                            number
                        )} 400,400)`"
                    >
                        {{ plan.value3.sumIn[number] }}
                    </text>
                </g>
            </g>
        </svg>
    </div>
</template>

<style scoped>

</style>