<template>
  <v-sheet
    width="100%"
    :height="dimension"
    :max-height="dimension"
    color="transparent"
    class="d-flex flex-row justify-center overflow-y-auto"
  >
    <svg
      ref="svgRef"
      :height="dimension"
      :width="dimension"
      viewBox="0 0 1400 1400"
      preserveAspectRatio="xMidYMid"
      fill-rule="evenodd"
      stroke-width="28.222"
      stroke-linejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      xml:space="default"
    >
      <g
        id="knotenarme_1_to_4"
        class="Page"
      >
        <g
          v-if="isKnotenarmAvailable(1)"
          id="knotenarm1_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="knotenarm1">
            <path
              id="knotenarm1_spike"
              d="M 661.11113,700.00002 V 291.59223 l 38.88831,-53.81445 38.88947,53.8143 v 568.40794 z"
              fill="#ececec"
              stroke="none"
            />
            <g id="knotenarm1_number">
              <circle
                id="knotenarm1_number_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 3;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="700"
                cy="195"
                r="32"
              />
              <text
                id="knotenarm1_number_text"
                xml:space="default"
                :style="`
                font-size: 60px;
                font-family: ${BelastungsplanConstants.fontfamily};
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 38.9365;
              `"
                x="708.77631"
                y="210.69041"
                transform="scale(0.96576588,1.0354476)"
              >
                1
              </text>
            </g>
          </g>
          <g id="arrows_knotenarm1">
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm1_west"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    1,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.W
                  )
                "
                id="arrow_knotenarm1_west_ausgehend"
                d="M 640.66709,434.92557 V 320.48063 h -19.11152 l 14.4435,-38.8884 14.44539,38.8884 h -19.11057 v 114.44494 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    1,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.W
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    1,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.W
                  )
                "
                id="arrow_knotenarm1_west_eingehend"
                d="m 603.44446,281.59223 v 114.44503 h 19.11111 l -14.44345,38.88831 -14.44544,-38.88831 h 19.11111 V 281.59223 Z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    1,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.W
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm1_ost"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    1,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.O
                  )
                "
                id="arrow_knotenarm1_ost_ausgehend"
                d="M 796.55599,434.92557 V 320.48063 h -19.11152 l 14.4435,-38.8884 14.44539,38.8884 h -19.11057 v 114.44494 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    1,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.O
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    1,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.O
                  )
                "
                id="arrow_knotenarm1_ost_eingehend"
                d="m 759.33336,281.59223 v 114.44503 h 19.11111 l -14.44345,38.88831 -14.44544,-38.88831 h 19.11111 V 281.59223 Z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    1,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.O
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="arrows_knotenarm1_crossing"
            >
              <path
                v-if="isQuerungsverkehrAvailable(1, Himmelsrichtung.O)"
                id="arrow_knotenarm1_crossing_ost"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                :stroke="
                  calculateColorOfQuerungsverkehr(1, Himmelsrichtung.O, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(1, Himmelsrichtung.O, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(1, Himmelsrichtung.W)"
                id="arrow_knotenarm1_crossing_west"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                :stroke="
                  calculateColorOfQuerungsverkehr(1, Himmelsrichtung.W, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(1, Himmelsrichtung.W, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
            </g>
          </g>
        </g>
        <g
          v-if="isKnotenarmAvailable(2)"
          id="knotenarm2_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(90, 700, 700)"
        >
          <g id="knotenarm2">
            <path
              id="knotenarm2_spike"
              d="m 661.11113,699.99998 v -408.408 l 38.889,-53.814 38.889,53.813 v 568.409 z"
              fill="#ececec"
              stroke="none"
            />
            <g id="knotenarm2_number">
              <circle
                id="knotenarm2_number_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 3;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="700"
                cy="195"
                r="32"
              />
              <text
                id="knotenarm2_number_text"
                xml:space="default"
                :style="`
                font-size: 60px;
                font-family: ${BelastungsplanConstants.fontfamily};
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 38.9365;
              `"
                x="-217.92575"
                y="695.33978"
                transform="matrix(0,-0.96576591,1.0354476,0,0,0)"
              >
                2
              </text>
            </g>
          </g>

          <g id="arrows_knotenarm2">
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm2_nord"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    2,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.N
                  )
                "
                id="arrow_knotenarm2_nord_ausgehend"
                d="m 640.66667,434.92553 v -114.445 h -19.1111 l 14.4435,-38.888 14.4454,38.888 h -19.1111 v 114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    2,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.N
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    2,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.N
                  )
                "
                id="arrow_knotenarm2_nord_eingehend"
                d="m 603.44448,281.59253 v 114.445 h 19.1111 l -14.4434,38.888 -14.4455,-38.888 h 19.1111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    2,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.N
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm2_sued"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    2,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.S
                  )
                "
                id="arrow_knotenarm2_sued_ausgehend"
                d="m 796.55557,434.92553 v -114.445 h -19.1111 l 14.4434,-38.888 14.4455,38.888 h -19.1111 v 114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    2,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.S
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    2,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.S
                  )
                "
                id="arrow_knotenarm2_sued_eingehend"
                d="m 759.33338,281.59253 v 114.445 h 19.1111 l -14.4435,38.888 -14.4454,-38.888 h 19.1111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    2,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.S
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="arrows_knotenarm2_crossing"
            >
              <path
                v-if="isQuerungsverkehrAvailable(2, Himmelsrichtung.S)"
                id="arrow_knotenarm2_crossing_sued"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                :stroke="
                  calculateColorOfQuerungsverkehr(2, Himmelsrichtung.S, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(2, Himmelsrichtung.S, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(2, Himmelsrichtung.N)"
                id="arrow_knotenarm2_crossing_nord"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                :stroke="
                  calculateColorOfQuerungsverkehr(2, Himmelsrichtung.N, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(2, Himmelsrichtung.N, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
            </g>
          </g>
        </g>
        <g
          v-if="isKnotenarmAvailable(3)"
          id="knotenarm3_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="knotenarm3">
            <path
              id="knotenarm3_spike"
              d="m 738.88891,700.00002 v 408.40778 l -38.88831,53.8145 -38.88947,-53.8143 V 700.00002 Z"
              fill="#ececec"
              stroke="none"
            />
            <g id="knotenarm3_number_circle">
              <circle
                id="knotenarm3_number_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 3;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="700"
                cy="1205"
                r="32"
              />
              <text
                id="knotenarm3_number_text"
                xml:space="default"
                :style="`
                font-size: 60px;
                font-family: ${BelastungsplanConstants.fontfamily};
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 38.9365;
              `"
                x="708.77631"
                y="1183.7999"
                transform="scale(0.96576591,1.0354476)"
              >
                3
              </text>
            </g>
          </g>

          <g id="arrows_knotenarm3">
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm3_ost"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    3,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.O
                  )
                "
                id="arrow_knotenarm3_ost_ausgehend"
                d="m 759.33336,965.0745 v 114.445 h 19.11111 l -14.44345,38.8883 -14.44544,-38.8883 h 19.11111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    3,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.O
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    3,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.O
                  )
                "
                id="arrow_knotenarm3_ost_eingehend"
                d="m 796.55599,1118.4078 v -114.4449 h -19.11152 l 14.4435,-38.8884 14.44539,38.8884 h -19.11057 v 114.4449 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    3,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.O
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm3_west"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    3,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.W
                  )
                "
                id="arrow_knotenarm3_west_ausgehend"
                d="m 603.44446,965.0745 v 114.445 h 19.11111 l -14.44345,38.8883 -14.44544,-38.8883 h 19.11111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    3,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.W
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    3,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.W
                  )
                "
                id="arrow_knotenarm3_west_eingehend"
                d="m 640.66709,1118.4078 v -114.4449 h -19.11152 l 14.4435,-38.8884 14.44539,38.8884 h -19.11057 v 114.4449 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    3,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.W
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="arrows_knotenarm3_crossing"
            >
              <path
                v-if="isQuerungsverkehrAvailable(3, Himmelsrichtung.W)"
                id="arrow_knotenarm3_crossing_west"
                d="M 816.66669,1077.7774 H 622.22175 v 11.1115 l -38.8884,-19.4435 38.8884,-19.4454 v 11.1106 h 194.44494 z"
                :stroke="
                  calculateColorOfQuerungsverkehr(3, Himmelsrichtung.W, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(3, Himmelsrichtung.W, false)
                "
                transform="translate(140,160) scale(0.8)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(3, Himmelsrichtung.O)"
                id="arrow_knotenarm3_crossing_ost"
                d="m 583.33335,1100 h 194.44503 v -11.1111 l 38.88831,19.4435 -38.88831,19.4454 v -11.1111 H 583.33335 Z"
                :stroke="
                  calculateColorOfQuerungsverkehr(3, Himmelsrichtung.O, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(3, Himmelsrichtung.O, false)
                "
                transform="translate(140,160) scale(0.8)"
              />
            </g>
          </g>
        </g>
        <g
          v-if="isKnotenarmAvailable(4)"
          id="knotenarm4_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(-90,700,700)"
        >
          <g id="knotenarm4">
            <path
              id="knotenarm4_spike"
              d="m 661.11087,699.99998 v -408.4076 l 38.889,-53.8146 38.889,53.8135 v 568.4087 z"
              fill="#ececec"
              stroke="none"
            />
            <g id="knotenarm4_number">
              <circle
                id="knotenarm4_number_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 3;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="700"
                cy="195"
                r="32"
              />
              <text
                id="knotenarm4_number_text"
                xml:space="default"
                :style="`
                font-size: 60px;
                font-family: ${BelastungsplanConstants.fontfamily};
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 38.9426;
              `"
                x="182.91887"
                y="-656.36975"
                transform="matrix(0,0.96512986,-1.03613,0,0,0)"
              >
                4
              </text>
            </g>
          </g>

          <g id="arrows_knotenarm4">
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm4_sued"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    4,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.S
                  )
                "
                id="arrow_knotenarm4_sued_ausgehend"
                d="m 640.66642,434.92523 v -114.445 h -19.111 l 14.443,-38.888 14.446,38.888 h -19.111 v 114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    4,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.S
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    4,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.S
                  )
                "
                id="arrow_knotenarm4_sued_eingehend"
                d="m 603.44453,281.59223 v 114.445 h 19.111 l -14.444,38.888 -14.445,-38.888 h 19.111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    4,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.S
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm4_nord"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    4,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.N
                  )
                "
                id="arrow_knotenarm4_nord_ausgehend"
                d="m 796.55532,434.92563 v -114.4453 h -19.111 l 14.444,-38.8881 14.445,38.8881 h -19.111 v 114.4453 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    4,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.N
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    4,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.N
                  )
                "
                id="arrow_knotenarm4_nord_eingehend"
                d="m 759.33343,281.59223 v 114.445 h 19.111 l -14.443,38.888 -14.446,-38.888 h 19.111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    4,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.N
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="arrows_knotenarm4_crossing"
            >
              <path
                v-if="isQuerungsverkehrAvailable(4, Himmelsrichtung.N)"
                id="arrow_knotenarm4_crossing_nord"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                :stroke="
                  calculateColorOfQuerungsverkehr(4, Himmelsrichtung.N, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(4, Himmelsrichtung.N, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(4, Himmelsrichtung.S)"
                id="arrow_knotenarm4_crossing_sued"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                :stroke="
                  calculateColorOfQuerungsverkehr(4, Himmelsrichtung.S, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(4, Himmelsrichtung.S, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
            </g>
          </g>
        </g>
      </g>
      <g
        id="knotenarme_5_to_8"
        class="Page"
        transform="rotate(45,700,700)"
      >
        <g
          v-if="isKnotenarmAvailable(5)"
          id="knotenarm5_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="knotenarm5">
            <path
              id="knotenarm5_spike"
              d="M 661.11113,700.00002 V 291.59223 l 38.88831,-53.81445 38.88947,53.8143 v 568.40794 z"
              fill="#ececec"
              stroke="none"
            />
            <g id="knotenarm5_number">
              <circle
                id="knotenarm5_number_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 3;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="700"
                cy="195"
                r="32"
              />
              <text
                id="knotenarm5_number_text"
                xml:space="default"
                :style="`
                font-size: 60px;
                font-family: ${BelastungsplanConstants.fontfamily};
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 38.9365;
              `"
                x="352.39447"
                y="633.23108"
                transform="matrix(0.68289962,-0.68289962,0.73217203,0.73217203,0,0)"
              >
                5
              </text>
            </g>
          </g>
          <g id="arrows_knotenarm5">
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm5_nord_west"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    5,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NW
                  )
                "
                id="arrow_knotenarm5_nord_west_ausgehend"
                d="M 640.66709,434.92557 V 320.48063 h -19.11152 l 14.4435,-38.8884 14.44539,38.8884 h -19.11057 v 114.44494 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    5,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NW
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    5,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NW
                  )
                "
                id="arrow_knotenarm5_nord_west_eingehend"
                d="m 603.44446,281.59223 v 114.44503 h 19.11111 l -14.44345,38.88831 -14.44544,-38.88831 h 19.11111 V 281.59223 Z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    5,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NW
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm5_sued_ost"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    5,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SO
                  )
                "
                id="arrow_knotenarm5_sued_ost_ausgehend"
                d="M 796.55599,434.92557 V 320.48063 h -19.11152 l 14.4435,-38.8884 14.44539,38.8884 h -19.11057 v 114.44494 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    5,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SO
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    5,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SO
                  )
                "
                id="arrow_knotenarm5_sued_ost_eingehend"
                d="m 759.33336,281.59223 v 114.44503 h 19.11111 l -14.44345,38.88831 -14.44544,-38.88831 h 19.11111 V 281.59223 Z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    5,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SO
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="arrows_knotenarm5_crossing"
            >
              <path
                v-if="isQuerungsverkehrAvailable(5, Himmelsrichtung.SO)"
                id="arrow_knotenarm5_crossing_sued_ost"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                :stroke="
                  calculateColorOfQuerungsverkehr(5, Himmelsrichtung.SO, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(5, Himmelsrichtung.SO, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(5, Himmelsrichtung.NW)"
                id="arrow_knotenarm5_crossing_nord_west"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                :stroke="
                  calculateColorOfQuerungsverkehr(5, Himmelsrichtung.NW, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(5, Himmelsrichtung.NW, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
            </g>
          </g>
        </g>
        <g
          v-if="isKnotenarmAvailable(6)"
          id="knotenarm6_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(90,700,700)"
        >
          <g id="knotenarm6">
            <path
              id="knotenarm6_spike"
              d="m 661.11113,699.99998 v -408.408 l 38.889,-53.814 38.889,53.813 v 568.409 z"
              fill="#ececec"
              stroke="none"
            />
            <g id="knotenarm6_number">
              <circle
                id="knotenarm6_number_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 3;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="700"
                cy="195"
                r="32"
              />
              <text
                id="knotenarm6_number_text"
                xml:space="default"
                :style="`
                font-size: 60px;
                font-family: ${BelastungsplanConstants.fontfamily};
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 38.9365;
              `"
                x="-673.21271"
                y="366.35382"
                transform="matrix(-0.68289963,-0.68289963,0.73217202,-0.73217202,0,0)"
              >
                6
              </text>
            </g>
          </g>
          <g id="arrows_knotenarm6">
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm6_nord_ost"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    6,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NO
                  )
                "
                id="arrow_knotenarm6_nord_ost_ausgehend"
                d="m 640.66667,434.92553 v -114.445 h -19.1111 l 14.4435,-38.888 14.4454,38.888 h -19.1111 v 114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    6,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NO
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    6,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NO
                  )
                "
                id="arrow_knotenarm6_nord_ost_eingehend"
                d="m 603.44448,281.59253 v 114.445 h 19.1111 l -14.4434,38.888 -14.4455,-38.888 h 19.1111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    6,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NO
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm6_sued_west"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    6,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SW
                  )
                "
                id="arrow_knotenarm6_sued_west_ausgehend"
                d="m 796.55557,434.92553 v -114.445 h -19.1111 l 14.4434,-38.888 14.4455,38.888 h -19.1111 v 114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    6,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SW
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    6,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SW
                  )
                "
                id="arrow_knotenarm6_sued_west_eingehend"
                d="m 759.33338,281.59253 v 114.445 h 19.1111 l -14.4435,38.888 -14.4454,-38.888 h 19.1111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    6,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SW
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="arrows_knotenarm6_crossing"
            >
              <path
                v-if="isQuerungsverkehrAvailable(6, Himmelsrichtung.SW)"
                id="arrow_knotenarm6_crossing_sued_west"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                :stroke="
                  calculateColorOfQuerungsverkehr(6, Himmelsrichtung.SW, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(6, Himmelsrichtung.SW, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(6, Himmelsrichtung.NO)"
                id="arrow_knotenarm6_crossing_nord_ost"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                :stroke="
                  calculateColorOfQuerungsverkehr(6, Himmelsrichtung.NO, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(6, Himmelsrichtung.NO, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
            </g>
          </g>
        </g>
        <g
          v-if="isKnotenarmAvailable(7)"
          id="knotenarm7_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="knotenarm7">
            <path
              id="knotenarm7_spike"
              d="m 738.88891,700.00002 v 408.40778 l -38.88831,53.8145 -38.88947,-53.8143 V 700.00002 Z"
              fill="#ececec"
              stroke="none"
            />
            <g id="knotenarm7_number">
              <circle
                id="knotenarm7_number_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 3;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="700"
                cy="1205"
                r="32"
              />
              <text
                id="knotenarm7_number_text"
                xml:space="default"
                :style="`
                font-size: 60px;
                font-family: ${BelastungsplanConstants.fontfamily};
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 38.9365;
              `"
                x="-385.5455"
                y="1323.3147"
                transform="matrix(0.68289963,-0.68289963,0.73217202,0.73217202,0,0)"
              >
                7
              </text>
            </g>
          </g>
          <g id="arrows_knotenarm7">
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm7_sued_ost"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    7,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SO
                  )
                "
                id="arrow_knotenarm7_sued_ost_ausgehend"
                d="m 759.33336,965.0745 v 114.445 h 19.11111 l -14.44345,38.8883 -14.44544,-38.8883 h 19.11111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    7,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SO
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    7,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SO
                  )
                "
                id="arrow_knotenarm7_sued_ost_eingehend"
                d="m 796.55599,1118.4078 v -114.4449 h -19.11152 l 14.4435,-38.8884 14.44539,38.8884 h -19.11057 v 114.4449 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    7,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SO
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm7_nord_west"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    7,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NW
                  )
                "
                id="arrow_knotenarm7_nord_west_ausgehend"
                d="m 603.44446,965.0745 v 114.445 h 19.11111 l -14.44345,38.8883 -14.44544,-38.8883 h 19.11111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    7,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NW
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    7,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NW
                  )
                "
                id="arrow_knotenarm7_nord_west_eingehend"
                d="m 640.66709,1118.4078 v -114.4449 h -19.11152 l 14.4435,-38.8884 14.44539,38.8884 h -19.11057 v 114.4449 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    7,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NW
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="arrows_knotenarm7_crossing"
            >
              <path
                v-if="isQuerungsverkehrAvailable(7, Himmelsrichtung.NW)"
                id="arrow_knotenarm7_crossing_nord_west"
                d="M 808.33025,1077.7756 H 613.88531 v 11.1116 l -38.8884,-19.4435 38.8884,-19.4454 v 11.1105 h 194.44494 z"
                :stroke="
                  calculateColorOfQuerungsverkehr(7, Himmelsrichtung.NW, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(7, Himmelsrichtung.NW, false)
                "
                transform="translate(140,160) scale(0.8)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(7, Himmelsrichtung.SO)"
                id="arrow_knotenarm7_crossing_sued_ost"
                d="m 575.66231,1099.9989 h 194.44506 v -11.1112 l 38.8883,19.4435 -38.8883,19.4454 v -11.1111 H 575.66231 Z"
                :stroke="
                  calculateColorOfQuerungsverkehr(7, Himmelsrichtung.SO, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(7, Himmelsrichtung.SO, false)
                "
                transform="translate(140,160) scale(0.8)"
              />
            </g>
          </g>
        </g>
        <g
          v-if="isKnotenarmAvailable(8)"
          id="knotenarm8_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(-90,700,700)"
        >
          <g id="knotenarm8">
            <path
              id="knotenarm8_spike"
              d="m 661.11087,699.99998 v -408.4076 l 38.889,-53.8146 38.889,53.8135 v 568.4087 z"
              fill="#ececec"
              stroke="none"
            />
            <g id="knotenarm8_number">
              <circle
                id="knotenarm8_number_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 3;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="700"
                cy="195"
                r="32"
              />
              <text
                id="knotenarm8_number_text"
                xml:space="default"
                :style="`
                font-size: 60px;
                font-family: ${BelastungsplanConstants.fontfamily};
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 38.9426;
              `"
                x="639.00354"
                y="-324.56787"
                transform="matrix(0.68244987,0.68244987,-0.73265455,0.73265455,0,0)"
              >
                8
              </text>
            </g>
          </g>
          <g id="arrows_knotenarm8">
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm8_sued_west"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    8,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SW
                  )
                "
                id="arrow_knotenarm8_sued_west_ausgehend"
                d="m 640.66642,434.92523 v -114.445 h -19.111 l 14.443,-38.888 14.446,38.888 h -19.111 v 114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    8,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SW
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    8,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SW
                  )
                "
                id="arrow_knotenarm8_sued_west_eingehend"
                d="m 603.44453,281.59223 v 114.445 h 19.111 l -14.444,38.888 -14.445,-38.888 h 19.111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    8,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SW
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="arrows_knotenarm8_nord_ost"
            >
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    8,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NO
                  )
                "
                id="arrow_knotenarm8_nord_ost_ausgehend"
                d="m 796.55532,434.92563 v -114.4453 h -19.111 l 14.444,-38.8881 14.445,38.8881 h -19.111 v 114.4453 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    8,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NO
                  )
                "
              />
              <path
                v-if="
                  isLaengsverkehrAvailable(
                    8,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NO
                  )
                "
                id="arrow_knotenarm8_nord_ost_eingehend"
                d="m 759.33343,281.59223 v 114.445 h 19.111 l -14.443,38.888 -14.446,-38.888 h 19.111 v -114.445 z"
                stroke="none"
                :fill="
                  calculateColorOfLaengsverkehr(
                    8,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NO
                  )
                "
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="arrows_knotenarm8_crossing"
            >
              <path
                v-if="isQuerungsverkehrAvailable(8, Himmelsrichtung.NO)"
                id="arrow_knotenarm8_crossing_nord_ost"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                :stroke="
                  calculateColorOfQuerungsverkehr(8, Himmelsrichtung.NO, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(8, Himmelsrichtung.NO, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(8, Himmelsrichtung.SW)"
                id="arrow_knotenarm8_crossing_sued_west"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                :stroke="
                  calculateColorOfQuerungsverkehr(8, Himmelsrichtung.SW, true)
                "
                stroke-width="3"
                :fill="
                  calculateColorOfQuerungsverkehr(8, Himmelsrichtung.SW, false)
                "
                transform="translate(140,110) scale(0.8)"
              />
            </g>
          </g>
        </g>
      </g>
      <path
        v-if="hasAvailableKnotenarme"
        id="center"
        d="m 14253.004,17465.11 166.703,0 117.876,117.877 0,166.702 -117.876,117.877 -166.703,0 -117.876,-117.877 0,-166.702 z"
        transform="matrix(0.46656362,0,0,0.46656362,-5988.8219,-7542.4705)"
        fill="#ececec"
      />
    </svg>
  </v-sheet>
</template>

<script setup lang="ts">
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type LaengsverkehrDTO from "@/types/zaehlung/LaengsverkehrDTO";
import type QuerungsverkehrDTO from "@/types/zaehlung/QuerungsverkehrDTO";
import type LadeBelastungsplanFjsDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanFjsDTO";
import type LadeBelastungsplanQuDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanQuDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { computed, nextTick, ref, watch } from "vue";

import { BelastungsplanConstants } from "@/components/zaehlstelle/charts/BelastungsplanConstants";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Zaehlart from "@/types/enum/Zaehlart";

interface Props {
  data: LadeBelastungsplanFjsDTO | LadeBelastungsplanQuDTO;
  dimension: string;
  options: ZaehlstelleOptionsDTO;
}

const props = withDefaults(defineProps<Props>(), {
  dimension: "600vh",
});

const emits = defineEmits<{
  (e: "print", v: Blob): void;
}>();

const zaehlstelleStore = useZaehlstelleStore();

const svgRef = ref<SVGSVGElement | null>(null);

const activeColor = "#000000";

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const availableKnotenarme = computed(() => {
  return (activeZaehlung.value.knotenarme ?? []).map(
    (arm: LadeKnotenarmDTO) => arm.nummer
  );
});
const hasAvailableKnotenarme = computed(() => {
  return availableKnotenarme.value.length > 0;
});

const selectedLaengsverkehre = computed(() => {
  return props.options.chosenLaengsverkehre;
});
const selectedQuerungsverkehre = computed(() => {
  return props.options.chosenQuerungsverkehre;
});

function isLaengsverkehrAvailable(
  knotenarm: number,
  richtung: Bewegungsrichtung,
  strassenseite: Himmelsrichtung
): boolean {
  return (activeZaehlung.value.laengsverkehr ?? []).some(
    (element) =>
      element.knotenarm === knotenarm &&
      element.richtung === richtung &&
      element.strassenseite === strassenseite
  );
}

function isQuerungsverkehrAvailable(
  knotenarm: number,
  richtung: Himmelsrichtung
): boolean {
  return (activeZaehlung.value.querungsverkehr ?? []).some(
    (element) =>
      element.knotenarm === knotenarm && element.richtung === richtung
  );
}

function isKnotenarmAvailable(knotenarm: number): boolean {
  return availableKnotenarme.value.includes(knotenarm);
}

/**
 * Gibt den Wert der aktiven oder passiven Pfeilfarbe für den Längsverkehr zurück.
 *
 * @param knotenarm
 * @param richtung
 * @param strassenseite
 */
function calculateColorOfLaengsverkehr(
  knotenarm: number,
  richtung: Bewegungsrichtung,
  strassenseite: Himmelsrichtung
): string | undefined {
  let color = "#E0E0E0";
  const clickedLaengsverkehr: LaengsverkehrDTO = createLaengsverkehr(
    knotenarm,
    richtung,
    strassenseite
  );
  const index =
    findIndexInSelectedLaengsverkehreForClickedLaengsverkehr(
      clickedLaengsverkehr
    );
  if (index >= 0) {
    color = activeColor;
  }
  return color;
}

/**
 * Gibt den Wert der aktiven oder passiven Pfeilfarbe für den Querungsverkehr zurück.
 *
 * @param knotenarm
 * @param richtung
 * @param isStroke
 */
function calculateColorOfQuerungsverkehr(
  knotenarm: number,
  richtung: Himmelsrichtung,
  isStroke: boolean
): string | undefined {
  let color = isStroke ? BelastungsplanConstants.inaktivColor : "#FFFFFF";
  const clickedQuerungsverkehr: QuerungsverkehrDTO = createQuerungsverkehr(
    knotenarm,
    richtung
  );
  const index = findIndexInSelectedQuerungsverkehreForClickedQuerungsverkehr(
    clickedQuerungsverkehr
  );
  if (index >= 0) {
    color = activeColor;
  }

  return color;
}

function findIndexInSelectedLaengsverkehreForClickedLaengsverkehr(
  clickedLaengsverkehr: LaengsverkehrDTO
) {
  if (!selectedLaengsverkehre.value) return -1;
  return selectedLaengsverkehre.value.findIndex(
    (laengsverkehr: LaengsverkehrDTO) => {
      return (
        laengsverkehr.knotenarm === clickedLaengsverkehr.knotenarm &&
        laengsverkehr.richtung === clickedLaengsverkehr.richtung &&
        laengsverkehr.strassenseite === clickedLaengsverkehr.strassenseite
      );
    }
  );
}

function findIndexInSelectedQuerungsverkehreForClickedQuerungsverkehr(
  clickedQuerungsverkehr: QuerungsverkehrDTO
) {
  if (!selectedQuerungsverkehre.value) return -1;
  return selectedQuerungsverkehre.value.findIndex(
    (querungsverkehr: QuerungsverkehrDTO) => {
      return (
        querungsverkehr.knotenarm === clickedQuerungsverkehr.knotenarm &&
        querungsverkehr.richtung === clickedQuerungsverkehr.richtung
      );
    }
  );
}

function createLaengsverkehr(
  knotenarm: number,
  richtung: Bewegungsrichtung,
  strassenseite: Himmelsrichtung
): LaengsverkehrDTO {
  const laengsverkehr = {} as LaengsverkehrDTO;
  laengsverkehr.knotenarm = knotenarm;
  laengsverkehr.richtung = richtung;
  laengsverkehr.strassenseite = strassenseite;
  return laengsverkehr;
}

function createQuerungsverkehr(
  knotenarm: number,
  richtung: Himmelsrichtung
): QuerungsverkehrDTO {
  const querungsverkehr = {} as QuerungsverkehrDTO;
  querungsverkehr.knotenarm = knotenarm;
  querungsverkehr.richtung = richtung;
  return querungsverkehr;
}

/**
 * Serialisiert das SVG Element, um einen Blob für die Print-Funktion zu erstellen.
 */
function serializeSvgElement(svgEl: SVGSVGElement): string {
  const clone = svgEl.cloneNode(true) as SVGSVGElement;

  let width = svgEl.getBoundingClientRect().width;
  let height = svgEl.getBoundingClientRect().height;

  if (!width || !height) {
    width = 600;
    height = 600;
  }

  clone.setAttribute("width", `${Math.round(width)}`);
  clone.setAttribute("height", `${Math.round(height)}`);

  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(clone);

  const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n';
  if (!svgString.startsWith("<?xml")) {
    svgString = xmlDeclaration + svgString;
  }
  return svgString;
}

/**
 * Erzeugt einen Blob aus dem aktuellen SVG und emittiert ihn.
 */
function emitSvgAsBlob(): void {
  const svgEl = svgRef.value;
  if (!svgEl) {
    return;
  }
  const svgString = serializeSvgElement(svgEl);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  emits("print", blob);
}

watch(
  [
    () => props.options.chosenLaengsverkehre,
    () => props.options.chosenQuerungsverkehre,
  ],
  () => {
    nextTick(() => emitSvgAsBlob());
  },
  { deep: true }
);
</script>
