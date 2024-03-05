<template>
    <v-sheet
        :height="height"
        :width="width"
        color="transparent"
    >
        <svg
            version="1.2"
            :width="width"
            :height="height"
            viewBox="13891 17287 1111 1111"
            preserveAspectRatio="xMidYMid"
            fill-rule="evenodd"
            stroke-width="28.222"
            stroke-linejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            xml:space="preserve"
        >
            <g class="Page">
                <g
                    id="node1"
                    class="com.sun.star.drawing.PolyPolygonShape"
                >
                    <rect
                        class="BoundingBox"
                        stroke="none"
                        fill="none"
                        x="14327"
                        y="17287"
                        width="238"
                        height="557"
                    />
                    <path
                        :fill="calculateColor('N')"
                        stroke="none"
                        d="M 14375,17546 L 14375,17581 14515,17581 14515,17546 14470,17546 14470,17381 14421,17381 14374,17391 14374,17426 14421,17416 14421,17546 14375,17546 Z M 14328,17842 L 14328,17335 14446,17287 14564,17335 14564,17842 14328,17842 Z"
                    />
                </g>

                <g
                    id="node2"
                    class="com.sun.star.drawing.ClosedBezierShape"
                >
                    <rect
                        class="BoundingBox"
                        stroke="none"
                        fill="none"
                        x="14446"
                        y="17724"
                        width="556"
                        height="238"
                    />
                    <path
                        :fill="calculateColor('O')"
                        stroke="none"
                        d="M 14803,17902 L 14845,17864 C 14864,17848 14875,17836 14881,17826 14887,17817 14889,17807 14889,17796 14889,17777 14883,17762 14870,17751 14856,17741 14838,17736 14814,17736 14803,17736 14792,17737 14780,17739 14769,17741 14757,17744 14746,17747 L 14746,17791 C 14757,17785 14767,17780 14776,17776 14786,17773 14795,17771 14803,17771 14813,17771 14822,17774 14828,17780 14834,17785 14838,17793 14838,17802 14838,17808 14836,17814 14833,17820 14830,17825 14825,17831 14818,17837 L 14745,17902 14745,17940 14891,17940 14891,17902 14803,17902 Z M 14446,17724 L 14953,17724 15001,17842 14953,17961 14446,17961 14446,17724 Z"
                    />
                </g>

                <g
                    id="node3"
                    class="com.sun.star.drawing.ClosedBezierShape"
                >
                    <rect
                        class="BoundingBox"
                        stroke="none"
                        fill="none"
                        x="14327"
                        y="17842"
                        width="238"
                        height="556"
                    />
                    <path
                        :fill="calculateColor('S')"
                        stroke="none"
                        d="M 14483,18162 C 14495,18159 14504,18154 14510,18146 14516,18139 14519,18129 14519,18118 14519,18100 14513,18088 14500,18079 14487,18070 14468,18066 14442,18066 14432,18066 14422,18067 14412,18068 14402,18070 14392,18072 14382,18075 L 14382,18113 C 14390,18109 14399,18106 14407,18104 14416,18102 14424,18101 14432,18101 14444,18101 14452,18104 14458,18108 14465,18112 14468,18118 14468,18126 14468,18134 14465,18140 14458,18144 14452,18148 14442,18150 14429,18150 L 14407,18150 14407,18184 14428,18184 C 14443,18184 14454,18186 14461,18191 14469,18195 14472,18202 14472,18211 14472,18220 14469,18227 14461,18232 14454,18237 14444,18239 14430,18239 14421,18239 14411,18238 14402,18235 14392,18233 14383,18229 14373,18224 L 14373,18264 C 14383,18267 14393,18270 14404,18272 14414,18273 14424,18274 14435,18274 14464,18274 14486,18269 14501,18259 14516,18248 14524,18233 14524,18213 14524,18200 14521,18189 14514,18180 14507,18172 14496,18166 14483,18162 Z M 14328,17842 L 14564,17842 14564,18349 14446,18397 14328,18349 14328,17842 Z"
                    />
                </g>

                <g
                    id="node4"
                    class="com.sun.star.drawing.PolyPolygonShape"
                >
                    <rect
                        class="BoundingBox"
                        stroke="none"
                        fill="none"
                        x="13891"
                        y="17724"
                        width="556"
                        height="238"
                    />
                    <path
                        :fill="calculateColor('W')"
                        stroke="none"
                        d="M 14066,17782 L 14066,17866 14010,17866 14066,17782 Z M 14058,17739 L 13977,17859 13977,17903 14066,17903 14066,17940 14115,17940 14115,17903 14144,17903 14144,17866 14115,17866 14115,17739 14058,17739 Z M 14446,17724 L 14446,17961 13939,17961 13891,17842 13939,17724 14446,17724 Z"
                    />
                </g>

                <g
                    id="nodeCenter"
                    class="com.sun.star.drawing.PolyPolygonShape"
                >
                    <rect
                        class="BoundingBox"
                        stroke="none"
                        fill="none"
                        x="14243"
                        y="17637"
                        width="408"
                        height="408"
                    />
                    <path
                        v-if="hasKnotenarme"
                        :fill="activeColor"
                        stroke="none"
                        d="m 14375.794,17961 -48.794,0.582 v -48.913 -138.008 -50.661 h 48.794 137.669 50.537 l -0.581,50.661 v 138.008 l 0.581,48.913 -50.537,-0.582 z"
                    />
                    <path
                        v-if="includesKnotenarm1and3"
                        :fill="activeColor"
                        stroke="none"
                        d="m 14327.291,17758.947 -0.582,-58.692 h 48.913 138.008 50.661 v 58.692 165.593 60.787 l -50.661,-0.699 h -138.008 l -48.913,0.699 0.582,-60.787 z"
                    />
                    <path
                        v-if="includesKnotenarm2and4"
                        :fill="activeColor"
                        stroke="none"
                        d="m 14361.656,17961 -58.692,0.582 v -48.913 -138.008 -50.661 h 58.692 165.593 60.787 l -0.699,50.661 v 138.008 l 0.699,48.913 -60.787,-0.582 z"
                    />
                </g>
            </g>
        </svg>
    </v-sheet>
</template>
<script setup lang="ts">
/* eslint-disable no-unused-vars */
import { computed, ComputedRef } from "vue";
import MessquerschnittInfoDTO from "@/types/messstelle/MessquerschnittInfoDTO";
/* eslint-enable no-unused-vars */

interface Props {
    height: number;
    width: number;
    activeColor: string;
    passiveColor: string;
    knotenarme: MessquerschnittInfoDTO[];
}

const props = withDefaults(defineProps<Props>(), {
    height: 72,
    width: 72,
    activeColor: "#FFFFFF",
    passiveColor: "#757575",
});

/**
 * Wenn für der knotenarm im Array gefunden wurde, wird diese in der Grafik in der "activeColor" dargestellt,
 * ansonsten in der passiveColor.
 */
function calculateColor(himmelsrichtung: string): string | undefined {
    let color = props.passiveColor;

    const gefilteterKnotenarm = props.knotenarme?.filter(
        (k) => k.fahrtrichtung === himmelsrichtung
    )[0];
    if (gefilteterKnotenarm) {
        color = props.activeColor;
    }
    return color;
}

const hasKnotenarme: ComputedRef<boolean> = computed(() => {
    return props.knotenarme && props.knotenarme.length > 0;
});

const includesKnotenarm1and3: ComputedRef<boolean> = computed(() => {
    let north = false;
    let south = false;
    props.knotenarme.forEach((q) => {
        north = north || q.fahrtrichtung === "N" || q.fahrtrichtung === "n";
        south = south || q.fahrtrichtung === "S" || q.fahrtrichtung === "s";
    });
    return north && south;
});

const includesKnotenarm2and4: ComputedRef<boolean> = computed(() => {
    let east = false;
    let west = false;
    props.knotenarme.forEach((q) => {
        east = east || q.fahrtrichtung === "O" || q.fahrtrichtung === "o";
        west = west || q.fahrtrichtung === "W" || q.fahrtrichtung === "w";
    });
    return east && west;
});
</script>