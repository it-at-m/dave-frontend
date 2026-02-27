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
        id="nodes5To8"
        class="Page"
        transform="rotate(45,700,700)"
      >
        <g
          id="node8_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(-90,700,700)"
        >
          <g id="node8">
            <path
              id="node8_spike"
              d="m 661.11087,699.99998 v -568.4076 l 38.889,-53.8146 38.889,53.8135 v 568.4087 z"
              :fill="getColorOfKnotenarm(8)"
              stroke="none"
            />
            <text
              id="node8_spike_text"
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
            id="node8_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node8_south_west"
            >
              <path
                  v-if="isLaengsverkehrAvailable(8, Bewegungsrichtung.AUS, Himmelsrichtung.SW)"
                  id="node8_south_west_north_west"
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
                  v-if="isLaengsverkehrAvailable(8, Bewegungsrichtung.EIN, Himmelsrichtung.SW)"
                  id="node8_south_west_south_east"
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
              id="node8_north_east"
            >
              <path
                  v-if="isLaengsverkehrAvailable(8, Bewegungsrichtung.AUS, Himmelsrichtung.NO)"
                id="node8_north_east_north_west"
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
                  v-if="isLaengsverkehrAvailable(8, Bewegungsrichtung.EIN, Himmelsrichtung.NO)"
                id="node8_north_east_south_east"
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
              id="node8_crossing"
            >
              <path
                  v-if="isQuerungsverkehrAvailable(8, Himmelsrichtung.NO)"
                id="node8_crossing_north_east"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(8, Himmelsrichtung.NO)"
                @click="handleClickOnQuerungsverkehr(8, Himmelsrichtung.NO)"
              />
              <path
                  v-if="isQuerungsverkehrAvailable(8, Himmelsrichtung.SW)"
                id="node8_crossing_south_west"
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
          id="node7_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="node7">
            <path
              id="node7_spike"
              d="m 738.88891,700.00002 v 568.40778 l -38.88831,53.8145 -38.88947,-53.8143 V 700.00002 Z"
              :fill="getColorOfKnotenarm(7)"
              stroke="none"
            />
            <text
              id="node7_text"
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
            id="node7_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node7_south_east"
            >
              <path
                  v-if="isLaengsverkehrAvailable(7, Bewegungsrichtung.AUS, Himmelsrichtung.SO)"
                id="node7_south_east_south_west"
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
                  v-if="isLaengsverkehrAvailable(7, Bewegungsrichtung.EIN, Himmelsrichtung.SO)"
                id="node7_south_east_north_east"
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
              id="node7_north_west"
            >
              <path
                  v-if="isLaengsverkehrAvailable(7, Bewegungsrichtung.AUS, Himmelsrichtung.NW)"
                id="node7_north_west_south_west"
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
                  v-if="isLaengsverkehrAvailable(7, Bewegungsrichtung.EIN, Himmelsrichtung.NW)"
                id="node7_north_west_north_east"
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
              id="node7_crossing"
            >
              <path
                  v-if="isQuerungsverkehrAvailable(7, Himmelsrichtung.NW)"
                id="node7_crossing_north_west"
                d="M 808.33025,1077.7756 H 613.88531 v 11.1116 l -38.8884,-19.4435 38.8884,-19.4454 v 11.1105 h 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(7, Himmelsrichtung.NW)"
                @click="handleClickOnQuerungsverkehr(7, Himmelsrichtung.NW)"
              />
              <path
                  v-if="isQuerungsverkehrAvailable(7, Himmelsrichtung.SO)"
                id="node7_crossing_south_east"
                d="m 591.66231,1099.9989 h 194.44506 v -11.1112 l 38.8883,19.4435 -38.8883,19.4454 v -11.1111 H 591.66231 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(7, Himmelsrichtung.SO)"
                @click="handleClickOnQuerungsverkehr(7, Himmelsrichtung.SO)"
              />
            </g>
          </g>
        </g>
        <g
          id="node6_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(90,700,700)"
        >
          <g id="node6">
            <path
              id="node6_spike"
              d="m 661.11113,699.99998 v -568.408 l 38.889,-53.814 38.889,53.813 v 568.409 z"
              :fill="getColorOfKnotenarm(6)"
              stroke="none"
            />
            <text
              id="node6_spike_text"
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
            id="node6_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node6_north_east"
            >
              <path
                  v-if="isLaengsverkehrAvailable(6, Bewegungsrichtung.AUS, Himmelsrichtung.NO)"
                id="node6_north_east_south_east"
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
                  v-if="isLaengsverkehrAvailable(6, Bewegungsrichtung.EIN, Himmelsrichtung.NO)"
                id="node6_north_east_north_west"
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
              id="node6_south_west"
            >
              <path
                  v-if="isLaengsverkehrAvailable(6, Bewegungsrichtung.AUS, Himmelsrichtung.SW)"
                id="node6_south_west_south_east"
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
                  v-if="isLaengsverkehrAvailable(6, Bewegungsrichtung.EIN, Himmelsrichtung.SW)"
                id="node6_south_west_north_west"
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
              id="node6_crossing"
            >
              <path
                  v-if="isQuerungsverkehrAvailable(6, Himmelsrichtung.SW)"
                id="node6_crossing_south_west"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(6, Himmelsrichtung.SW)"
                @click="handleClickOnQuerungsverkehr(6, Himmelsrichtung.SW)"
              />
              <path
                  v-if="isQuerungsverkehrAvailable(6, Himmelsrichtung.NO)"
                id="node6_crossing_north_east"
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
          id="node5_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="node5_arrow">
            <path
              id="node5_spike"
              d="M 661.11113,700.00002 V 131.59223 l 38.88831,-53.81445 38.88947,53.8143 v 568.40794 z"
              :fill="getColorOfKnotenarm(5)"
              stroke="none"
            />
            <text
              id="node5_spike_text"
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
            id="node5_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node5_north_west"
            >
              <path
                  v-if="isLaengsverkehrAvailable(5, Bewegungsrichtung.AUS, Himmelsrichtung.NW)"
                id="node5_north_west_north_east"
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
                  v-if="isLaengsverkehrAvailable(5, Bewegungsrichtung.EIN, Himmelsrichtung.NW)"
                id="node5_north_west_south_west"
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
              id="node5_south_east"
            >
              <path
                  v-if="isLaengsverkehrAvailable(5, Bewegungsrichtung.AUS, Himmelsrichtung.SO)"
                id="node5_south_east_north_east"
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
                  v-if="isLaengsverkehrAvailable(5, Bewegungsrichtung.EIN, Himmelsrichtung.SO)"
                id="node5_south_east_south_west"
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
              id="node5_crossing"
            >
              <path
                  v-if="isQuerungsverkehrAvailable(5, Himmelsrichtung.SO)"
                id="node5_crossing_south_east"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(5, Himmelsrichtung.SO)"
                @click="handleClickOnQuerungsverkehr(5, Himmelsrichtung.SO)"
              />
              <path
                  v-if="isQuerungsverkehrAvailable(5, Himmelsrichtung.NW)"
                id="node5_crossing_north_west"
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
        id="nodes1To4"
        class="Page"
      >
        <g
          id="node4_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(-90,700,700)"
        >
          <g id="node4">
            <path
              id="node4_spike"
              d="m 661.11087,699.99998 v -568.4076 l 38.889,-53.8146 38.889,53.8135 v 568.4087 z"
              :fill="getColorOfKnotenarm(4)"
              stroke="none"
            />
            <text
              id="node4_spike_text"
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
            id="node4_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node4_south"
            >
              <path
                  v-if="isLaengsverkehrAvailable(4, Bewegungsrichtung.AUS, Himmelsrichtung.S)"
                id="node4_south_west"
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
                  v-if="isLaengsverkehrAvailable(4, Bewegungsrichtung.EIN, Himmelsrichtung.S)"
                id="node4_south_east"
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
              id="node4_north"
            >
              <path
                  v-if="isLaengsverkehrAvailable(4, Bewegungsrichtung.AUS, Himmelsrichtung.N)"
                id="node4_north_west"
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
                  v-if="isLaengsverkehrAvailable(4, Bewegungsrichtung.EIN, Himmelsrichtung.N)"
                id="node4_north_east"
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
              id="node4_crossing"
            >
              <path
                  v-if="isQuerungsverkehrAvailable(4, Himmelsrichtung.N)"
                id="node4_crossing_north"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(4, Himmelsrichtung.N)"
                @click="handleClickOnQuerungsverkehr(4, Himmelsrichtung.N)"
              />
              <path
                  v-if="isQuerungsverkehrAvailable(4, Himmelsrichtung.S)"
                id="node4_crossing_south"
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
          id="node3_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="node3">
            <path
              id="node3_spike"
              d="m 738.88891,700.00002 v 568.40778 l -38.88831,53.8145 -38.88947,-53.8143 V 700.00002 Z"
              :fill="getColorOfKnotenarm(3)"
              stroke="none"
            />
            <text
              id="node3_spike_text"
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
            id="node3_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node3_east"
            >
              <path
                  v-if="isLaengsverkehrAvailable(3, Bewegungsrichtung.AUS, Himmelsrichtung.O)"
                id="node3_east_south"
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
                  v-if="isLaengsverkehrAvailable(3, Bewegungsrichtung.EIN, Himmelsrichtung.O)"
                id="node3_east_north"
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
              id="node3_west"
            >
              <path
                  v-if="isLaengsverkehrAvailable(3, Bewegungsrichtung.AUS, Himmelsrichtung.W)"
                id="node3_west_south"
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
                  v-if="isLaengsverkehrAvailable(3, Bewegungsrichtung.EIN, Himmelsrichtung.W)"
                id="node3_west_north"
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
              id="node3_crossing"
            >
              <path
                  v-if="isQuerungsverkehrAvailable(3, Himmelsrichtung.W)"
                id="node3_crossing_west"
                d="M 816.66669,1077.7774 H 622.22175 v 11.1115 l -38.8884,-19.4435 38.8884,-19.4454 v 11.1106 h 194.44494 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(3, Himmelsrichtung.W)"
                @click="handleClickOnQuerungsverkehr(3, Himmelsrichtung.W)"
              />
              <path
                  v-if="isQuerungsverkehrAvailable(3, Himmelsrichtung.O)"
                id="node3_crossing_east"
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
          id="node2_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(90, 700, 700)"
        >
          <g id="node2">
            <path
              id="node2_spike"
              d="m 661.11113,699.99998 v -568.408 l 38.889,-53.814 38.889,53.813 v 568.409 z"
              :fill="getColorOfKnotenarm(2)"
              stroke="none"
            />
            <text
              id="node2_spike_text"
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
            id="node2_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node2_north"
            >
              <path
                  v-if="isLaengsverkehrAvailable(2, Bewegungsrichtung.AUS, Himmelsrichtung.N)"
                id="node2_north_east"
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
                  v-if="isLaengsverkehrAvailable(2, Bewegungsrichtung.EIN, Himmelsrichtung.N)"
                id="node2_north_west"
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
              id="node2_south"
            >
              <path
                  v-if="isLaengsverkehrAvailable(2, Bewegungsrichtung.AUS, Himmelsrichtung.S)"
                id="node2_south_east"
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
                  v-if="isLaengsverkehrAvailable(2, Bewegungsrichtung.EIN, Himmelsrichtung.S)"
                id="node2_south_west"
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
              id="node2_crossing"
            >
              <path
                  v-if="isQuerungsverkehrAvailable(2, Himmelsrichtung.S)"
                id="node2_crossing_south"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(2, Himmelsrichtung.S)"
                @click="handleClickOnQuerungsverkehr(2, Himmelsrichtung.S)"
              />
              <path
                  v-if="isQuerungsverkehrAvailable(2, Himmelsrichtung.N)"
                id="node2_crossing_north"
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
          id="node1_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="node1">
            <path
              id="node1_spike"
              d="M 661.11113,700.00002 V 131.59223 l 38.88831,-53.81445 38.88947,53.8143 v 568.40794 z"
              :fill="getColorOfKnotenarm(1)"
              stroke="none"
            />
            <text
              id="node1_spike_text"
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
            id="node1_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node1_west"
            >
              <path
                  v-if="isLaengsverkehrAvailable(1, Bewegungsrichtung.AUS, Himmelsrichtung.W)"
                id="node1_west_north"
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
                  v-if="isLaengsverkehrAvailable(1, Bewegungsrichtung.EIN, Himmelsrichtung.W)"
                id="node1_west_south"
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
              id="node1_east"
            >
              <path
                  v-if="isLaengsverkehrAvailable(1, Bewegungsrichtung.AUS, Himmelsrichtung.O)"
                id="node1_east_north"
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
                  v-if="isLaengsverkehrAvailable(1, Bewegungsrichtung.EIN, Himmelsrichtung.O)"
                id="node1_east_south"
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
              id="node1_crossing"
            >
              <path
                  v-if="isQuerungsverkehrAvailable(1, Himmelsrichtung.O)"
                id="node1_crossing_east"
                d="m 583.33335,322.22223 h 194.44503 v -11.11111 l 38.88831,19.44345 -38.88831,19.44544 V 338.88889 H 583.33335 Z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColorOfQuerungsverkehr(1, Himmelsrichtung.O)"
                @click="handleClickOnQuerungsverkehr(1, Himmelsrichtung.O)"
              />
              <path
                  v-if="isQuerungsverkehrAvailable(1, Himmelsrichtung.W)"
                id="node1_crossing_west"
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
import type LaengsverkehrDTO from "@/types/zaehlung/LaengsverkehrDTO";
import type QuerungsverkehrDTO from "@/types/zaehlung/QuerungsverkehrDTO";

import { cloneDeep, isEmpty, remove, toArray } from "lodash";
import {computed } from "vue";

import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Zaehlart from "@/types/enum/Zaehlart";
import {useZaehlstelleStore} from "@/store/ZaehlstelleStore";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";

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
  return activeZaehlung.value.knotenarme.map((arm: LadeKnotenarmDTO) => arm.nummer);
});
const hasAvailableKnotenarme = computed(() => {
  return availableKnotenarme.value.length > 0;
});

const selectedLaengsverkehre = computed(() => {
  return chosenOptionsCopy.value.laengsverkehr;
});
const selectedQuerungsverkehre = computed(() => {
  return chosenOptionsCopy.value.querungsverkehr;
});

function isLaengsverkehrAvailable(knotenarm: number, richtung: Bewegungsrichtung, strassenseite: Himmelsrichtung): boolean {
  return activeZaehlung.value.laengsverkehr.filter(element => element.knotenarm === knotenarm && element.richtung === richtung && element.strassenseite === strassenseite).length > 0;
}

function isQuerungsverkehrAvailable(knotenarm: number, richtung: Himmelsrichtung): boolean {
  return activeZaehlung.value.querungsverkehr.filter(element => element.knotenarm === knotenarm && element.richtung === richtung).length > 0;
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
  chosenOptionsCopy.value.laengsverkehr = laengsverkehre;
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

  let laengsverkehr = createLaengsverkehr(
    8,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.NO
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    8,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.NO
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    8,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.SW
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    8,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.SW
  );
  laengsverkehre.push(laengsverkehr);

  chosenOptionsCopy.value.laengsverkehr = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmSeven() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  let laengsverkehr = createLaengsverkehr(
    7,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.NW
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    7,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.NW
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    7,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.SO
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    7,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.SO
  );
  laengsverkehre.push(laengsverkehr);

  chosenOptionsCopy.value.laengsverkehr = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmSix() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  let laengsverkehr = createLaengsverkehr(
    6,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.NO
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    6,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.NO
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    6,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.SW
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    6,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.SW
  );
  laengsverkehre.push(laengsverkehr);

  chosenOptionsCopy.value.laengsverkehr = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmFive() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  let laengsverkehr = createLaengsverkehr(
    5,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.NW
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    5,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.NW
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    5,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.SO
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    5,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.SO
  );
  laengsverkehre.push(laengsverkehr);

  chosenOptionsCopy.value.laengsverkehr = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmFour() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  let laengsverkehr = createLaengsverkehr(
    4,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.N
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    4,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.N
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    4,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.S
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    4,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.S
  );
  laengsverkehre.push(laengsverkehr);

  chosenOptionsCopy.value.laengsverkehr = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmThree() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  let laengsverkehr = createLaengsverkehr(
    3,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.W
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    3,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.W
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    3,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.O
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    3,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.O
  );
  laengsverkehre.push(laengsverkehr);

  chosenOptionsCopy.value.laengsverkehr = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmTwo() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  let laengsverkehr = createLaengsverkehr(
    2,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.N
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    2,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.N
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    2,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.S
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    2,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.S
  );
  laengsverkehre.push(laengsverkehr);

  chosenOptionsCopy.value.laengsverkehr = laengsverkehre;
}

function selectAllLaengsverkehreForKnotenarmOne() {
  const laengsverkehre = toArray(cloneDeep(selectedLaengsverkehre.value));

  let laengsverkehr = createLaengsverkehr(
    1,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.W
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    1,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.W
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    1,
    Bewegungsrichtung.EIN,
    Himmelsrichtung.O
  );
  laengsverkehre.push(laengsverkehr);
  laengsverkehr = createLaengsverkehr(
    1,
    Bewegungsrichtung.AUS,
    Himmelsrichtung.O
  );
  laengsverkehre.push(laengsverkehr);

  chosenOptionsCopy.value.laengsverkehr = laengsverkehre;
}

function deselectQuerungsverkehreOfKnotenarm(knotenarm: number) {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));
  remove(querungsverkehre, function (querungsverkehr: QuerungsverkehrDTO) {
    return querungsverkehr.knotenarm === knotenarm;
  });
  chosenOptionsCopy.value.querungsverkehr = querungsverkehre;
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

  let querungsverkehr = createQuerungsverkehr(8, Himmelsrichtung.NO);
  querungsverkehre.push(querungsverkehr);
  querungsverkehr = createQuerungsverkehr(8, Himmelsrichtung.SW);
  querungsverkehre.push(querungsverkehr);

  chosenOptionsCopy.value.querungsverkehr = querungsverkehre;
}

function selectAllQuerungenForKnotenarmSeven() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  let querungsverkehr = createQuerungsverkehr(7, Himmelsrichtung.NW);
  querungsverkehre.push(querungsverkehr);
  querungsverkehr = createQuerungsverkehr(7, Himmelsrichtung.SO);
  querungsverkehre.push(querungsverkehr);

  chosenOptionsCopy.value.querungsverkehr = querungsverkehre;
}

function selectAllQuerungenForKnotenarmSix() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  let querungsverkehr = createQuerungsverkehr(6, Himmelsrichtung.NO);
  querungsverkehre.push(querungsverkehr);
  querungsverkehr = createQuerungsverkehr(6, Himmelsrichtung.SW);
  querungsverkehre.push(querungsverkehr);

  chosenOptionsCopy.value.querungsverkehr = querungsverkehre;
}

function selectAllQuerungenForKnotenarmFive() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  let querungsverkehr = createQuerungsverkehr(5, Himmelsrichtung.NW);
  querungsverkehre.push(querungsverkehr);
  querungsverkehr = createQuerungsverkehr(5, Himmelsrichtung.SO);
  querungsverkehre.push(querungsverkehr);

  chosenOptionsCopy.value.querungsverkehr = querungsverkehre;
}

function selectAllQuerungenForKnotenarmFour() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  let querungsverkehr = createQuerungsverkehr(4, Himmelsrichtung.N);
  querungsverkehre.push(querungsverkehr);
  querungsverkehr = createQuerungsverkehr(4, Himmelsrichtung.S);
  querungsverkehre.push(querungsverkehr);

  chosenOptionsCopy.value.querungsverkehr = querungsverkehre;
}

function selectAllQuerungenForKnotenarmThree() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  let querungsverkehr = createQuerungsverkehr(3, Himmelsrichtung.W);
  querungsverkehre.push(querungsverkehr);
  querungsverkehr = createQuerungsverkehr(3, Himmelsrichtung.O);
  querungsverkehre.push(querungsverkehr);

  chosenOptionsCopy.value.querungsverkehr = querungsverkehre;
}

function selectAllQuerungenForKnotenarmTwo() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  let querungsverkehr = createQuerungsverkehr(2, Himmelsrichtung.N);
  querungsverkehre.push(querungsverkehr);
  querungsverkehr = createQuerungsverkehr(2, Himmelsrichtung.S);
  querungsverkehre.push(querungsverkehr);

  chosenOptionsCopy.value.querungsverkehr = querungsverkehre;
}

function selectAllQuerungenForKnotenarmOne() {
  const querungsverkehre = toArray(cloneDeep(selectedQuerungsverkehre.value));

  let querungsverkehr = createQuerungsverkehr(1, Himmelsrichtung.W);
  querungsverkehre.push(querungsverkehr);
  querungsverkehr = createQuerungsverkehr(1, Himmelsrichtung.O);
  querungsverkehre.push(querungsverkehr);

  chosenOptionsCopy.value.querungsverkehr = querungsverkehre;
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

  chosenOptionsCopy.value.laengsverkehr = laengsverkehre;
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

  chosenOptionsCopy.value.querungsverkehr = querungsverkehre;
}

function findIndexInSelectedLaengsverkehreForClickedLaengsverkehr(
  clickedLaengsverkehr: LaengsverkehrDTO
) {
  if (!selectedLaengsverkehre.value)
    return null
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
  if (!selectedQuerungsverkehre.value)
    return null
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
