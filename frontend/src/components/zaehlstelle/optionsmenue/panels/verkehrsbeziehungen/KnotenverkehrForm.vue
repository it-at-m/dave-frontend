<template>
  <v-sheet
    width="100%"
    :height="height"
    :max-height="height"
    color="transparent"
    class="d-flex flex-row justify-center overflow-y-auto"
  >
    <svg
      :height="height"
      :width="height"
      viewBox="0 0 1400 1400"
      preserveAspectRatio="xMidYMid"
      fill-rule="evenodd"
      stroke-width="28.222"
      stroke-linejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
    >
      <g
        id="knotenarme_5_to_8"
        class="Page"
        transform="rotate(45,700,700)"
      >
        <g
          id="knotenarm8_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(-90,700,700)"
        >
          <g id="knotenarm8">
            <path
              id="knotenarm8_spike"
              d="m 661.11087,699.99998 v -568.4076 l 38.889,-53.8146 38.889,53.8135 v 568.4087 z"
              :fill="getColorOfKnotenarm(8)"
              stroke="none"
            />
            <text
              id="knotenarm8_number_text"
              class="prevent-select"
              xml:space="preserve"
              style="
                font-size: 63.0899px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9426;
              "
              x="603.00354"
              y="-354.56787"
              transform="matrix(0.68244987,0.68244987,-0.73265455,0.73265455,0,0)"
              :style="{ cursor: getCursorType(8) }"
              @click="activateOrDeactivateTotalKnotenarm(8)"
            >
              8
            </text>
          </g>
          <g
            v-if="isKnotenarmAvailable(8)"
            id="arrows_knotenarm8"
          >
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
                d="m 621.66642,364.92523 v -194.445 h -11.111 l 19.443,-38.888 19.446,38.888 h -11.111 v 194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    8,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SW
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 599.44453,131.59223 v 194.445 h 11.111 l -19.444,38.888 -19.445,-38.888 h 11.111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    8,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SW
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 800.55532,364.92563 v -194.4453 h -11.111 l 19.444,-38.8881 19.445,38.8881 h -11.111 v 194.4453 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    8,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NO
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 778.33343,131.59223 v 194.445 h 11.111 l -19.443,38.888 -19.446,-38.888 h 11.111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    8,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NO
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(8, Himmelsrichtung.NO)"
                @click="handleClickOnQuerungsverkehr(8, Himmelsrichtung.NO)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(8, Himmelsrichtung.SW)"
                id="arrow_knotenarm8_crossing_sued_west"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(8, Himmelsrichtung.SW)"
                @click="handleClickOnQuerungsverkehr(8, Himmelsrichtung.SW)"
              />
            </g>
          </g>
        </g>
        <g
          id="knotenarm7_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="knotenarm7">
            <path
              id="knotenarm7_spike"
              d="m 738.88891,700.00002 v 568.40778 l -38.88831,53.8145 -38.88947,-53.8143 V 700.00002 Z"
              :fill="getColorOfKnotenarm(7)"
              stroke="none"
            />
            <text
              id="knotenarm7_number_text"
              class="prevent-select"
              xml:space="preserve"
              style="
                font-size: 63.0799px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9365;
              "
              x="-424.5455"
              y="1352.3147"
              transform="matrix(0.68289963,-0.68289963,0.73217202,0.73217202,0,0)"
              :style="{ cursor: getCursorType(7) }"
              @click="activateOrDeactivateTotalKnotenarm(7)"
            >
              7
            </text>
          </g>
          <g
            v-if="isKnotenarmAvailable(7)"
            id="arrows_knotenarm7"
          >
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
                d="m 778.33336,1035.0745 v 194.445 h 11.11111 l -19.44345,38.8883 -19.44544,-38.8883 h 11.11111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    7,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SO
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 800.55599,1268.4078 v -194.4449 h -11.11152 l 19.4435,-38.8884 19.44539,38.8884 h -11.11057 v 194.4449 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    7,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SO
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 599.44446,1035.0745 v 194.445 h 11.11111 l -19.44345,38.8883 -19.44544,-38.8883 h 11.11111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    7,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NW
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 621.66709,1268.4078 v -194.4449 h -11.11152 l 19.4435,-38.8884 19.44539,38.8884 h -11.11057 v 194.4449 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    7,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NW
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(7, Himmelsrichtung.NW)"
                @click="handleClickOnQuerungsverkehr(7, Himmelsrichtung.NW)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(7, Himmelsrichtung.SO)"
                id="arrow_knotenarm7_crossing_sued_ost"
                d="m 575.66231,1099.9989 h 194.44506 v -11.1112 l 38.8883,19.4435 -38.8883,19.4454 v -11.1111 H 575.66231 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(7, Himmelsrichtung.SO)"
                @click="handleClickOnQuerungsverkehr(7, Himmelsrichtung.SO)"
              />
            </g>
          </g>
        </g>
        <g
          id="knotenarm6_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(90,700,700)"
        >
          <g id="knotenarm6">
            <path
              id="knotenarm6_spike"
              d="m 661.11113,699.99998 v -568.408 l 38.889,-53.814 38.889,53.813 v 568.409 z"
              :fill="getColorOfKnotenarm(6)"
              stroke="none"
            />
            <text
              id="knotenarm6_number_text"
              class="prevent-select"
              xml:space="preserve"
              style="
                font-size: 63.0799px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9365;
              "
              x="-640.21271"
              y="397.35382"
              transform="matrix(-0.68289963,-0.68289963,0.73217202,-0.73217202,0,0)"
              :style="{ cursor: getCursorType(6) }"
              @click="activateOrDeactivateTotalKnotenarm(6)"
            >
              6
            </text>
          </g>
          <g
            v-if="isKnotenarmAvailable(6)"
            id="arrows_knotenarm6"
          >
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
                d="m 621.66667,364.92553 v -194.445 h -11.1111 l 19.4435,-38.888 19.4454,38.888 h -11.1111 v 194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    6,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NO
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 599.44448,131.59253 v 194.445 h 11.1111 l -19.4434,38.888 -19.4455,-38.888 h 11.1111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    6,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NO
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 800.55557,364.92553 v -194.445 h -11.1111 l 19.4434,-38.888 19.4455,38.888 h -11.1111 v 194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    6,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SW
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 778.33338,131.59253 v 194.445 h 11.1111 l -19.4435,38.888 -19.4454,-38.888 h 11.1111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    6,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SW
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(6, Himmelsrichtung.SW)"
                @click="handleClickOnQuerungsverkehr(6, Himmelsrichtung.SW)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(6, Himmelsrichtung.NO)"
                id="arrow_knotenarm6_crossing_nord_ost"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(6, Himmelsrichtung.NO)"
                @click="handleClickOnQuerungsverkehr(6, Himmelsrichtung.NO)"
              />
            </g>
          </g>
        </g>
        <g
          id="knotenarm5_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="knotenarm5">
            <path
              id="knotenarm5_spike"
              d="M 661.11113,700.00002 V 131.59223 l 38.88831,-53.81445 38.88947,53.8143 v 568.40794 z"
              :fill="getColorOfKnotenarm(5)"
              stroke="none"
            />
            <text
              id="knotenarm5_number_text"
              class="prevent-select"
              xml:space="preserve"
              style="
                font-size: 63.0799px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9365;
              "
              x="371.39447"
              y="610.23108"
              transform="matrix(0.68289962,-0.68289962,0.73217203,0.73217203,0,0)"
              :style="{ cursor: getCursorType(5) }"
              @click="activateOrDeactivateTotalKnotenarm(5)"
            >
              5
            </text>
          </g>
          <g
            v-if="isKnotenarmAvailable(5)"
            id="arrows_knotenarm5"
          >
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
                d="M 621.66709,364.92557 V 170.48063 h -11.11152 l 19.4435,-38.8884 19.44539,38.8884 h -11.11057 v 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    5,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.NW
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 599.44446,131.59223 v 194.44503 h 11.11111 l -19.44345,38.88831 -19.44544,-38.88831 h 11.11111 V 131.59223 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    5,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.NW
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="M 800.55599,364.92557 V 170.48063 h -11.11152 l 19.4435,-38.8884 19.44539,38.8884 h -11.11057 v 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    5,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.SO
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 778.33336,131.59223 v 194.44503 h 11.11111 l -19.44345,38.88831 -19.44544,-38.88831 h 11.11111 V 131.59223 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    5,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.SO
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(5, Himmelsrichtung.SO)"
                @click="handleClickOnQuerungsverkehr(5, Himmelsrichtung.SO)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(5, Himmelsrichtung.NW)"
                id="arrow_knotenarm5_crossing_nord_west"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(5, Himmelsrichtung.NW)"
                @click="handleClickOnQuerungsverkehr(5, Himmelsrichtung.NW)"
              />
            </g>
          </g>
        </g>
      </g>

      <g
        id="knotenarme_1_to_4"
        class="Page"
      >
        <g
          id="knotenarm4_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(-90,700,700)"
        >
          <g id="knotenarm4">
            <path
              id="knotenarm4_spike"
              d="m 661.11087,699.99998 v -568.4076 l 38.889,-53.8146 38.889,53.8135 v 568.4087 z"
              :fill="getColorOfKnotenarm(4)"
              stroke="none"
            />
            <text
              id="knotenarm4_number_text"
              class="prevent-select"
              xml:space="preserve"
              style="
                font-size: 63.0899px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9426;
              "
              x="133.91887"
              y="-654.36975"
              transform="matrix(0,0.96512986,-1.03613,0,0,0)"
              :style="{ cursor: getCursorType(4) }"
              @click="activateOrDeactivateTotalKnotenarm(4)"
            >
              4
            </text>
          </g>

          <g
            v-if="isKnotenarmAvailable(4)"
            id="arrows_knotenarm4"
          >
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
                d="m 621.66642,364.92523 v -194.445 h -11.111 l 19.443,-38.888 19.446,38.888 h -11.111 v 194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    4,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.S
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 599.44453,131.59223 v 194.445 h 11.111 l -19.444,38.888 -19.445,-38.888 h 11.111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    4,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.S
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 800.55532,364.92563 v -194.4453 h -11.111 l 19.444,-38.8881 19.445,38.8881 h -11.111 v 194.4453 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    4,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.N
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 778.33343,131.59223 v 194.445 h 11.111 l -19.443,38.888 -19.446,-38.888 h 11.111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    4,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.N
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(4, Himmelsrichtung.N)"
                @click="handleClickOnQuerungsverkehr(4, Himmelsrichtung.N)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(4, Himmelsrichtung.S)"
                id="arrow_knotenarm4_crossing_sued"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(4, Himmelsrichtung.S)"
                @click="handleClickOnQuerungsverkehr(4, Himmelsrichtung.S)"
              />
            </g>
          </g>
        </g>
        <g
          id="knotenarm3_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="knotenarm3">
            <path
              id="knotenarm3_spike"
              d="m 738.88891,700.00002 v 568.40778 l -38.88831,53.8145 -38.88947,-53.8143 V 700.00002 Z"
              :fill="getColorOfKnotenarm(3)"
              stroke="none"
            />
            <text
              id="knotenarm3_number_text"
              class="prevent-select"
              xml:space="preserve"
              style="
                font-size: 63.0799px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9365;
              "
              x="701.77631"
              y="1229.7999"
              transform="scale(0.96576591,1.0354476)"
              :style="{ cursor: getCursorType(3) }"
              @click="activateOrDeactivateTotalKnotenarm(3)"
            >
              3
            </text>
          </g>

          <g
            v-if="isKnotenarmAvailable(3)"
            id="arrows_knotenarm3"
          >
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
                d="m 778.33336,1035.0745 v 194.445 h 11.11111 l -19.44345,38.8883 -19.44544,-38.8883 h 11.11111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    3,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.O
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 800.55599,1268.4078 v -194.4449 h -11.11152 l 19.4435,-38.8884 19.44539,38.8884 h -11.11057 v 194.4449 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    3,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.O
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 599.44446,1035.0745 v 194.445 h 11.11111 l -19.44345,38.8883 -19.44544,-38.8883 h 11.11111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    3,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.W
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 621.66709,1268.4078 v -194.4449 h -11.11152 l 19.4435,-38.8884 19.44539,38.8884 h -11.11057 v 194.4449 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    3,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.W
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(3, Himmelsrichtung.W)"
                @click="handleClickOnQuerungsverkehr(3, Himmelsrichtung.W)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(3, Himmelsrichtung.O)"
                id="arrow_knotenarm3_crossing_ost"
                d="m 583.33335,1100 h 194.44503 v -11.1111 l 38.88831,19.4435 -38.88831,19.4454 v -11.1111 H 583.33335 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(3, Himmelsrichtung.O)"
                @click="handleClickOnQuerungsverkehr(3, Himmelsrichtung.O)"
              />
            </g>
          </g>
        </g>
        <g
          id="knotenarm2_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(90, 700, 700)"
        >
          <g id="knotenarm2">
            <path
              id="knotenarm2_spike"
              d="m 661.11113,699.99998 v -568.408 l 38.889,-53.814 38.889,53.813 v 568.409 z"
              :fill="getColorOfKnotenarm(2)"
              stroke="none"
            />
            <text
              id="knotenarm2_number_text"
              class="prevent-select"
              xml:space="preserve"
              style="
                font-size: 63.0799px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9365;
              "
              x="-174.92575"
              y="696.33978"
              transform="matrix(0,-0.96576591,1.0354476,0,0,0)"
              :style="{ cursor: getCursorType(2) }"
              @click="activateOrDeactivateTotalKnotenarm(2)"
            >
              2
            </text>
          </g>

          <g
            v-if="isKnotenarmAvailable(2)"
            id="arrows_knotenarm2"
          >
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
                d="m 621.66667,364.92553 v -194.445 h -11.1111 l 19.4435,-38.888 19.4454,38.888 h -11.1111 v 194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    2,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.N
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 599.44448,131.59253 v 194.445 h 11.1111 l -19.4434,38.888 -19.4455,-38.888 h 11.1111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    2,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.N
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 800.55557,364.92553 v -194.445 h -11.1111 l 19.4434,-38.888 19.4455,38.888 h -11.1111 v 194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    2,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.S
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 778.33338,131.59253 v 194.445 h 11.1111 l -19.4435,38.888 -19.4454,-38.888 h 11.1111 v -194.445 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    2,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.S
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(2, Himmelsrichtung.S)"
                @click="handleClickOnQuerungsverkehr(2, Himmelsrichtung.S)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(2, Himmelsrichtung.N)"
                id="arrow_knotenarm2_crossing_nord"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(2, Himmelsrichtung.N)"
                @click="handleClickOnQuerungsverkehr(2, Himmelsrichtung.N)"
              />
            </g>
          </g>
        </g>
        <g
          id="knotenarm1_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="knotenarm1">
            <path
              id="knotenarm1_spike"
              d="M 661.11113,700.00002 V 131.59223 l 38.88831,-53.81445 38.88947,53.8143 v 568.40794 z"
              :fill="getColorOfKnotenarm(1)"
              stroke="none"
            />
            <text
              id="knotenarm1_number_text"
              class="prevent-select"
              xml:space="preserve"
              style="
                font-size: 63.0799px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9365;
              "
              x="701.77631"
              y="179.69041"
              transform="scale(0.96576588,1.0354476)"
              :style="{ cursor: getCursorType(1) }"
              @click="activateOrDeactivateTotalKnotenarm(1)"
            >
              1
            </text>
          </g>

          <g
            v-if="isKnotenarmAvailable(1)"
            id="arrows_knotenarm1"
          >
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
                d="M 621.66709,364.92557 V 170.48063 h -11.11152 l 19.4435,-38.8884 19.44539,38.8884 h -11.11057 v 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    1,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.W
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 599.44446,131.59223 v 194.44503 h 11.11111 l -19.44345,38.88831 -19.44544,-38.88831 h 11.11111 V 131.59223 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    1,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.W
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="M 800.55599,364.92557 V 170.48063 h -11.11152 l 19.4435,-38.8884 19.44539,38.8884 h -11.11057 v 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    1,
                    Bewegungsrichtung.AUS,
                    Himmelsrichtung.O
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                d="m 778.33336,131.59223 v 194.44503 h 11.11111 l -19.44345,38.88831 -19.44544,-38.88831 h 11.11111 V 131.59223 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="
                  calculateColorOfLaengsverkehr(
                    1,
                    Bewegungsrichtung.EIN,
                    Himmelsrichtung.O
                  )
                "
                @click="
                  handleClickOnLaengsverkehr(
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
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(1, Himmelsrichtung.O)"
                @click="handleClickOnQuerungsverkehr(1, Himmelsrichtung.O)"
              />
              <path
                v-if="isQuerungsverkehrAvailable(1, Himmelsrichtung.W)"
                id="arrow_knotenarm1_crossing_west"
                d="M 816.66669,299.99959 H 622.22175 v 11.11153 l -38.8884,-19.4435 38.8884,-19.44539 v 11.11057 h 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(1, Himmelsrichtung.W)"
                @click="handleClickOnQuerungsverkehr(1, Himmelsrichtung.W)"
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
        fill="#1565c0"
      />
    </svg>
  </v-sheet>
</template>

<script setup lang="ts">
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type LaengsverkehrDTO from "@/types/zaehlung/LaengsverkehrDTO";
import type QuerungsverkehrDTO from "@/types/zaehlung/QuerungsverkehrDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { cloneDeep, isEmpty, remove, toArray } from "lodash";
import { computed } from "vue";

import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Zaehlart from "@/types/enum/Zaehlart";

interface Props {
  height: string;
}
defineProps<Props>();

const zaehlstelleStore = useZaehlstelleStore();

const chosenOptionsCopy = defineModel<ZaehlstelleOptionsDTO>({
  required: true,
});

const activeColor = "#D50000";
const passiveColor = "#9E9E9E";

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
  return chosenOptionsCopy.value.chosenLaengsverkehre;
});
const selectedQuerungsverkehre = computed(() => {
  return chosenOptionsCopy.value.chosenQuerungsverkehre;
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
  let color = passiveColor;
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
 */
function calculateColorOfQuerungsverkehr(
  knotenarm: number,
  richtung: Himmelsrichtung
): string | undefined {
  let color = passiveColor;
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

function activateOrDeactivateTotalKnotenarm(knotenarm: number) {
  if (!isKnotenarmAvailable(knotenarm)) {
    // remove all
    return;
  }

  if (activeZaehlung.value.zaehlart === Zaehlart.QU) {
    if (querungsverkehreForKnotenarmStillSelected(knotenarm)) {
      // Deselect
      deselectQuerungsverkehreOfKnotenarm(knotenarm);
    } else {
      // Select All
      if (knotenarm === 8) {
        selectAllQuerungenForKnotenarmEight();
      } else if (knotenarm === 7) {
        selectAllQuerungenForKnotenarmSeven();
      } else if (knotenarm === 6) {
        selectAllQuerungenForKnotenarmSix();
      } else if (knotenarm === 5) {
        selectAllQuerungenForKnotenarmFive();
      } else if (knotenarm === 4) {
        selectAllQuerungenForKnotenarmFour();
      } else if (knotenarm === 3) {
        selectAllQuerungenForKnotenarmThree();
      } else if (knotenarm === 2) {
        selectAllQuerungenForKnotenarmTwo();
      } else {
        // knotenarm === 1
        selectAllQuerungenForKnotenarmOne();
      }
    }
  }
  if (activeZaehlung.value.zaehlart === Zaehlart.FJS) {
    if (laengsverkehrForKnotenarmStillSelected(knotenarm)) {
      // Deselect
      deselectLaengsverkehreOfKnotenarm(knotenarm);
    } else {
      // Select All
      if (knotenarm === 8) {
        selectAllLaengsverkehreForKnotenarmEight();
      } else if (knotenarm === 7) {
        selectAllLaengsverkehreForKnotenarmSeven();
      } else if (knotenarm === 6) {
        selectAllLaengsverkehreForKnotenarmSix();
      } else if (knotenarm === 5) {
        selectAllLaengsverkehreForKnotenarmFive();
      } else if (knotenarm === 4) {
        selectAllLaengsverkehreForKnotenarmFour();
      } else if (knotenarm === 3) {
        selectAllLaengsverkehreForKnotenarmThree();
      } else if (knotenarm === 2) {
        selectAllLaengsverkehreForKnotenarmTwo();
      } else {
        // knotenarm === 1
        selectAllLaengsverkehreForKnotenarmOne();
      }
    }
  }
}

function deselectLaengsverkehreOfKnotenarm(knotenarm: number) {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));
  remove(laengsverkehre, function (laengsverkehr: LaengsverkehrDTO) {
    return laengsverkehr.knotenarm === knotenarm;
  });
  chosenOptionsCopy.value.chosenLaengsverkehre = laengsverkehre;
}

function laengsverkehrForKnotenarmStillSelected(knotenarm: number): boolean {
  return !isEmpty(
    selectedLaengsverkehre.value.filter(
      (laengsverkehr: LaengsverkehrDTO) => laengsverkehr.knotenarm === knotenarm
    )
  );
}

function selectAllLaengsverkehreForKnotenarmEight() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  if (isLaengsverkehrAvailable(8, Bewegungsrichtung.EIN, Himmelsrichtung.NO)) {
    laengsverkehre.push(
      createLaengsverkehr(8, Bewegungsrichtung.EIN, Himmelsrichtung.NO)
    );
  }
  if (isLaengsverkehrAvailable(8, Bewegungsrichtung.AUS, Himmelsrichtung.NO)) {
    laengsverkehre.push(
      createLaengsverkehr(8, Bewegungsrichtung.AUS, Himmelsrichtung.NO)
    );
  }
  if (isLaengsverkehrAvailable(8, Bewegungsrichtung.EIN, Himmelsrichtung.SW)) {
    laengsverkehre.push(
      createLaengsverkehr(8, Bewegungsrichtung.EIN, Himmelsrichtung.SW)
    );
  }
  if (isLaengsverkehrAvailable(8, Bewegungsrichtung.AUS, Himmelsrichtung.SW)) {
    laengsverkehre.push(
      createLaengsverkehr(8, Bewegungsrichtung.AUS, Himmelsrichtung.SW)
    );
  }
  chosenOptionsCopy.value.chosenLaengsverkehre = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmSeven() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  if (isLaengsverkehrAvailable(7, Bewegungsrichtung.EIN, Himmelsrichtung.NW)) {
    laengsverkehre.push(
      createLaengsverkehr(7, Bewegungsrichtung.EIN, Himmelsrichtung.NW)
    );
  }
  if (isLaengsverkehrAvailable(7, Bewegungsrichtung.AUS, Himmelsrichtung.NW)) {
    laengsverkehre.push(
      createLaengsverkehr(7, Bewegungsrichtung.AUS, Himmelsrichtung.NW)
    );
  }
  if (isLaengsverkehrAvailable(7, Bewegungsrichtung.EIN, Himmelsrichtung.SO)) {
    laengsverkehre.push(
      createLaengsverkehr(7, Bewegungsrichtung.EIN, Himmelsrichtung.SO)
    );
  }
  if (isLaengsverkehrAvailable(7, Bewegungsrichtung.AUS, Himmelsrichtung.SO)) {
    laengsverkehre.push(
      createLaengsverkehr(7, Bewegungsrichtung.AUS, Himmelsrichtung.SO)
    );
  }
  chosenOptionsCopy.value.chosenLaengsverkehre = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmSix() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  if (isLaengsverkehrAvailable(6, Bewegungsrichtung.EIN, Himmelsrichtung.NO)) {
    laengsverkehre.push(
      createLaengsverkehr(6, Bewegungsrichtung.EIN, Himmelsrichtung.NO)
    );
  }
  if (isLaengsverkehrAvailable(6, Bewegungsrichtung.AUS, Himmelsrichtung.NO)) {
    laengsverkehre.push(
      createLaengsverkehr(6, Bewegungsrichtung.AUS, Himmelsrichtung.NO)
    );
  }
  if (isLaengsverkehrAvailable(6, Bewegungsrichtung.EIN, Himmelsrichtung.SW)) {
    laengsverkehre.push(
      createLaengsverkehr(6, Bewegungsrichtung.EIN, Himmelsrichtung.SW)
    );
  }
  if (isLaengsverkehrAvailable(6, Bewegungsrichtung.AUS, Himmelsrichtung.SW)) {
    laengsverkehre.push(
      createLaengsverkehr(6, Bewegungsrichtung.AUS, Himmelsrichtung.SW)
    );
  }
  chosenOptionsCopy.value.chosenLaengsverkehre = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmFive() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  if (isLaengsverkehrAvailable(5, Bewegungsrichtung.EIN, Himmelsrichtung.NW)) {
    laengsverkehre.push(
      createLaengsverkehr(5, Bewegungsrichtung.EIN, Himmelsrichtung.NW)
    );
  }
  if (isLaengsverkehrAvailable(5, Bewegungsrichtung.AUS, Himmelsrichtung.NW)) {
    laengsverkehre.push(
      createLaengsverkehr(5, Bewegungsrichtung.AUS, Himmelsrichtung.NW)
    );
  }
  if (isLaengsverkehrAvailable(5, Bewegungsrichtung.EIN, Himmelsrichtung.SO)) {
    laengsverkehre.push(
      createLaengsverkehr(5, Bewegungsrichtung.EIN, Himmelsrichtung.SO)
    );
  }
  if (isLaengsverkehrAvailable(5, Bewegungsrichtung.AUS, Himmelsrichtung.SO)) {
    laengsverkehre.push(
      createLaengsverkehr(5, Bewegungsrichtung.AUS, Himmelsrichtung.SO)
    );
  }
  chosenOptionsCopy.value.chosenLaengsverkehre = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmFour() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  if (isLaengsverkehrAvailable(4, Bewegungsrichtung.EIN, Himmelsrichtung.N)) {
    laengsverkehre.push(
      createLaengsverkehr(4, Bewegungsrichtung.EIN, Himmelsrichtung.N)
    );
  }
  if (isLaengsverkehrAvailable(4, Bewegungsrichtung.AUS, Himmelsrichtung.N)) {
    laengsverkehre.push(
      createLaengsverkehr(4, Bewegungsrichtung.AUS, Himmelsrichtung.N)
    );
  }
  if (isLaengsverkehrAvailable(4, Bewegungsrichtung.EIN, Himmelsrichtung.S)) {
    laengsverkehre.push(
      createLaengsverkehr(4, Bewegungsrichtung.EIN, Himmelsrichtung.S)
    );
  }
  if (isLaengsverkehrAvailable(4, Bewegungsrichtung.AUS, Himmelsrichtung.S)) {
    laengsverkehre.push(
      createLaengsverkehr(4, Bewegungsrichtung.AUS, Himmelsrichtung.S)
    );
  }
  chosenOptionsCopy.value.chosenLaengsverkehre = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmThree() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  if (isLaengsverkehrAvailable(3, Bewegungsrichtung.EIN, Himmelsrichtung.W)) {
    laengsverkehre.push(
      createLaengsverkehr(3, Bewegungsrichtung.EIN, Himmelsrichtung.W)
    );
  }
  if (isLaengsverkehrAvailable(3, Bewegungsrichtung.AUS, Himmelsrichtung.W)) {
    laengsverkehre.push(
      createLaengsverkehr(3, Bewegungsrichtung.AUS, Himmelsrichtung.W)
    );
  }
  if (isLaengsverkehrAvailable(3, Bewegungsrichtung.EIN, Himmelsrichtung.O)) {
    laengsverkehre.push(
      createLaengsverkehr(3, Bewegungsrichtung.EIN, Himmelsrichtung.O)
    );
  }
  if (isLaengsverkehrAvailable(3, Bewegungsrichtung.AUS, Himmelsrichtung.O)) {
    laengsverkehre.push(
      createLaengsverkehr(3, Bewegungsrichtung.AUS, Himmelsrichtung.O)
    );
  }
  chosenOptionsCopy.value.chosenLaengsverkehre = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmTwo() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  if (isLaengsverkehrAvailable(2, Bewegungsrichtung.EIN, Himmelsrichtung.N)) {
    laengsverkehre.push(
      createLaengsverkehr(2, Bewegungsrichtung.EIN, Himmelsrichtung.N)
    );
  }
  if (isLaengsverkehrAvailable(2, Bewegungsrichtung.AUS, Himmelsrichtung.N)) {
    laengsverkehre.push(
      createLaengsverkehr(2, Bewegungsrichtung.AUS, Himmelsrichtung.N)
    );
  }
  if (isLaengsverkehrAvailable(2, Bewegungsrichtung.EIN, Himmelsrichtung.S)) {
    laengsverkehre.push(
      createLaengsverkehr(2, Bewegungsrichtung.EIN, Himmelsrichtung.S)
    );
  }
  if (isLaengsverkehrAvailable(2, Bewegungsrichtung.AUS, Himmelsrichtung.S)) {
    laengsverkehre.push(
      createLaengsverkehr(2, Bewegungsrichtung.AUS, Himmelsrichtung.S)
    );
  }
  chosenOptionsCopy.value.chosenLaengsverkehre = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmOne() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  if (isLaengsverkehrAvailable(1, Bewegungsrichtung.EIN, Himmelsrichtung.W)) {
    laengsverkehre.push(
      createLaengsverkehr(1, Bewegungsrichtung.EIN, Himmelsrichtung.W)
    );
  }
  if (isLaengsverkehrAvailable(1, Bewegungsrichtung.AUS, Himmelsrichtung.W)) {
    laengsverkehre.push(
      createLaengsverkehr(1, Bewegungsrichtung.AUS, Himmelsrichtung.W)
    );
  }
  if (isLaengsverkehrAvailable(1, Bewegungsrichtung.EIN, Himmelsrichtung.O)) {
    laengsverkehre.push(
      createLaengsverkehr(1, Bewegungsrichtung.EIN, Himmelsrichtung.O)
    );
  }
  if (isLaengsverkehrAvailable(1, Bewegungsrichtung.AUS, Himmelsrichtung.O)) {
    laengsverkehre.push(
      createLaengsverkehr(1, Bewegungsrichtung.AUS, Himmelsrichtung.O)
    );
  }
  chosenOptionsCopy.value.chosenLaengsverkehre = laengsverkehre;
}

function deselectQuerungsverkehreOfKnotenarm(knotenarm: number) {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));
  remove(querungsverkehre, function (querungsverkehr: QuerungsverkehrDTO) {
    return querungsverkehr.knotenarm === knotenarm;
  });
  chosenOptionsCopy.value.chosenQuerungsverkehre = querungsverkehre;
}

function querungsverkehreForKnotenarmStillSelected(knotenarm: number): boolean {
  return !isEmpty(
    selectedQuerungsverkehre.value.filter(
      (querungsverkehr: QuerungsverkehrDTO) =>
        querungsverkehr.knotenarm === knotenarm
    )
  );
}

function selectAllQuerungenForKnotenarmEight() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  if (isQuerungsverkehrAvailable(8, Himmelsrichtung.NO)) {
    querungsverkehre.push(createQuerungsverkehr(8, Himmelsrichtung.NO));
  }
  if (isQuerungsverkehrAvailable(8, Himmelsrichtung.SW)) {
    querungsverkehre.push(createQuerungsverkehr(8, Himmelsrichtung.SW));
  }
  chosenOptionsCopy.value.chosenQuerungsverkehre = querungsverkehre;
}

function selectAllQuerungenForKnotenarmSeven() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  if (isQuerungsverkehrAvailable(7, Himmelsrichtung.NW)) {
    querungsverkehre.push(createQuerungsverkehr(7, Himmelsrichtung.NW));
  }
  if (isQuerungsverkehrAvailable(7, Himmelsrichtung.SO)) {
    querungsverkehre.push(createQuerungsverkehr(7, Himmelsrichtung.SO));
  }
  chosenOptionsCopy.value.chosenQuerungsverkehre = querungsverkehre;
}

function selectAllQuerungenForKnotenarmSix() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  if (isQuerungsverkehrAvailable(6, Himmelsrichtung.NO)) {
    querungsverkehre.push(createQuerungsverkehr(6, Himmelsrichtung.NO));
  }
  if (isQuerungsverkehrAvailable(6, Himmelsrichtung.SW)) {
    querungsverkehre.push(createQuerungsverkehr(6, Himmelsrichtung.SW));
  }
  chosenOptionsCopy.value.chosenQuerungsverkehre = querungsverkehre;
}

function selectAllQuerungenForKnotenarmFive() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  if (isQuerungsverkehrAvailable(5, Himmelsrichtung.NW)) {
    querungsverkehre.push(createQuerungsverkehr(5, Himmelsrichtung.NW));
  }
  if (isQuerungsverkehrAvailable(5, Himmelsrichtung.SO)) {
    querungsverkehre.push(createQuerungsverkehr(5, Himmelsrichtung.SO));
  }
  chosenOptionsCopy.value.chosenQuerungsverkehre = querungsverkehre;
}

function selectAllQuerungenForKnotenarmFour() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  if (isQuerungsverkehrAvailable(4, Himmelsrichtung.N)) {
    querungsverkehre.push(createQuerungsverkehr(4, Himmelsrichtung.N));
  }
  if (isQuerungsverkehrAvailable(4, Himmelsrichtung.S)) {
    querungsverkehre.push(createQuerungsverkehr(4, Himmelsrichtung.S));
  }
  chosenOptionsCopy.value.chosenQuerungsverkehre = querungsverkehre;
}

function selectAllQuerungenForKnotenarmThree() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  if (isQuerungsverkehrAvailable(3, Himmelsrichtung.W)) {
    querungsverkehre.push(createQuerungsverkehr(3, Himmelsrichtung.W));
  }
  if (isQuerungsverkehrAvailable(3, Himmelsrichtung.O)) {
    querungsverkehre.push(createQuerungsverkehr(3, Himmelsrichtung.O));
  }
  chosenOptionsCopy.value.chosenQuerungsverkehre = querungsverkehre;
}

function selectAllQuerungenForKnotenarmTwo() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  if (isQuerungsverkehrAvailable(2, Himmelsrichtung.N)) {
    querungsverkehre.push(createQuerungsverkehr(2, Himmelsrichtung.N));
  }
  if (isQuerungsverkehrAvailable(2, Himmelsrichtung.S)) {
    querungsverkehre.push(createQuerungsverkehr(2, Himmelsrichtung.S));
  }
  chosenOptionsCopy.value.chosenQuerungsverkehre = querungsverkehre;
}

function selectAllQuerungenForKnotenarmOne() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  if (isQuerungsverkehrAvailable(1, Himmelsrichtung.W)) {
    querungsverkehre.push(createQuerungsverkehr(1, Himmelsrichtung.W));
  }
  if (isQuerungsverkehrAvailable(1, Himmelsrichtung.O)) {
    querungsverkehre.push(createQuerungsverkehr(1, Himmelsrichtung.O));
  }
  chosenOptionsCopy.value.chosenQuerungsverkehre = querungsverkehre;
}

function getCursorType(knotenarm: number) {
  if (isKnotenarmAvailable(knotenarm)) {
    return `pointer`;
  } else {
    return "default";
  }
}

function getColorOfKnotenarm(knotenarm: number) {
  if (isKnotenarmAvailable(knotenarm)) {
    return `#1565C0`;
  } else {
    return `#EEEEEE`;
  }
}

function handleClickOnLaengsverkehr(
  knotenarm: number,
  richtung: Bewegungsrichtung,
  strassenseite: Himmelsrichtung
): void {
  const clickedLaengsverkehr: LaengsverkehrDTO = createLaengsverkehr(
    knotenarm,
    richtung,
    strassenseite
  );

  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  const index =
    findIndexInSelectedLaengsverkehreForClickedLaengsverkehr(
      clickedLaengsverkehr
    );

  if (index >= 0) {
    laengsverkehre.splice(index, 1);
  } else {
    laengsverkehre.push(clickedLaengsverkehr);
  }

  chosenOptionsCopy.value.chosenLaengsverkehre = laengsverkehre;
}

function handleClickOnQuerungsverkehr(
  knotenarm: number,
  richtung: Himmelsrichtung
): void {
  const clickedQuerungsverkehr: QuerungsverkehrDTO = createQuerungsverkehr(
    knotenarm,
    richtung
  );

  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  const index = findIndexInSelectedQuerungsverkehreForClickedQuerungsverkehr(
    clickedQuerungsverkehr
  );

  if (index >= 0) {
    querungsverkehre.splice(index, 1);
  } else {
    querungsverkehre.push(clickedQuerungsverkehr);
  }

  chosenOptionsCopy.value.chosenQuerungsverkehre = querungsverkehre;
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
</script>
<style scoped>
.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
