<template>
  <v-sheet id="belastungsplan-zaehlstelle">
    <svg
      ref="svgRef"
      :width="sizeBelastungsplan"
      :height="sizeBelastungsplan"
      viewBox="0 0 1400 1400"
      version="1.1"
      id="svg1"
      fill-rule="evenodd"
      stroke-width="28.222"
      stroke-linejoin="round"
      preserveAspectRatio="xMidYMid"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <defs id="defs1" />
      <g id="legend">
        <g id="legend-compass">
          <text
            xml:space="default"
            id="compass1"
            :style="`
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: ${belastungsplanMethods.maxlineWidth}px;
                font-family: sans-serif;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: middle;
                fill: ${BelastungsplanConstants.legendColor};
                stroke-width: 2;
              `"
            x="107.33477"
            y="83.332977"
          >
            <tspan
              :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  fill: ${BelastungsplanConstants.legendColor};
                  fill-opacity: 1;
                  stroke-width: 2;
                `"
            >
              N
            </tspan>
          </text>
          <path
            :style="`
                fill: none;
                fill-opacity: 1;
                stroke: ${BelastungsplanConstants.legendColor};
                stroke-width: 2;
                stroke-linecap: butt;
                stroke-miterlimit: 2.5;
                stroke-dasharray: none;
                stroke-opacity: 1;
              `"
            id="compass2"
            d="m 93.333333,93.333333 h 27.999997 l -14,-63 z"
          />
        </g>
        <g id="legend-zaehlstelle">
          <g
            id="zaehlstelle1"
            style="stroke-width: 28.2205; stroke-dasharray: none"
          >
            <text
              xml:space="preserve"
              :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  white-space: pre;
                  inline-size: 268.729;
                  display: inline;
                  fill: #000000;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
              id="zaehlstelle1-multirow"
              x="1107.0699"
              y="58.662277"
            >
              <tspan
                x="1107.0699"
                y="58.662277"
                id="tspan16"
              >
                Zählstelle
                {{ zaehlstelleStore.getZaehlstelleHeader.nummer }}
              </tspan>
            </text>
          </g>
          <g
            id="zaehlstelle2"
            style="stroke-width: 28.2205; stroke-dasharray: none"
          >
            <text
              v-if="zaehlstelleStore.getZaehlstelleHeader.stadtbezirkNummer"
              xml:space="preserve"
              :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  white-space: pre;
                  inline-size: 268.729;
                  display: inline;
                  fill: #000000;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
              id="zaehlstelle2-multirow"
              x="1107.0699"
              y="84.662277"
            >
              <tspan
                x="1107.0699"
                y="84.662277"
                id="tspan17"
              >
                Stadtbezirk
                {{ zaehlstelleStore.getZaehlstelleHeader.stadtbezirkNummer }}
              </tspan>
              <tspan
                x="1107.0699"
                y="110.83184"
                id="tspan18"
              >
                Zähldatum:
                {{
                  dateUtils.getShortVersionOfDate(
                    new Date(activeZaehlung.datum)
                  )
                }}
              </tspan>
            </text>
          </g>
        </g>
        <g
          id="legend-zaehlinfo"
          style="stroke-width: 28.2205; stroke-dasharray: none"
        >
          <g
            id="zaehlzeit1"
            style="stroke-width: 28.2205; stroke-dasharray: none"
          >
            <text
              xml:space="preserve"
              :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  white-space: pre;
                  inline-size: 268.729;
                  display: inline;
                  fill: #000000;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
              id="zaehlzeit1-multirow"
              x="56"
              y="1229.6622"
            >
              <tspan
                x="56"
                y="1229.6622"
                id="tspan23"
              >
                <tspan
                  style="font-weight: bold"
                  id="tspan22"
                >
                  {{ optionen.zeitauswahl }}
                </tspan>
              </tspan>
            </text>
          </g>
          <g
            id="zaehlzeit2"
            style="stroke-width: 28.2205; stroke-dasharray: none"
          >
            <text
              xml:space="preserve"
              :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  white-space: pre;
                  inline-size: 268.729;
                  display: inline;
                  fill: #000000;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
              id="zaehlzeit2-multirow"
              x="56"
              y="1255.6622"
            >
              <tspan
                x="56"
                y="1255.6622"
                id="tspan24"
              >
                {{ zaehlzeit2 }}
              </tspan>
            </text>
          </g>
          <text
            xml:space="preserve"
            :style="`
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: ${belastungsplanMethods.maxlineWidth}px;
                font-family: ${BelastungsplanConstants.fontfamily};
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                white-space: pre;
                inline-size: 268.729;
                display: inline;
                fill: #000000;
                stroke-width: 28.2205;
                stroke-dasharray: none;
              `"
            id="verkehrsart"
            x="56"
            y="1307.6622"
          >
            <tspan
              x="56"
              y="1307.6622"
              id="tspan26"
            >
              <tspan
                style="font-weight: bold"
                id="tspan25"
              >
                {{ optionen.radverkehr ? "RAD" : "FUSS" }}
              </tspan>
            </tspan>
          </text>
        </g>
        <g id="legend-massstab">
          <path
            :style="`
                fill: none;
                stroke: ${BelastungsplanConstants.legendColor};
                stroke-width: 2;
                stroke-linecap: square;
                stroke-miterlimit: 2.5;
                stroke-dasharray: none;
                stroke-opacity: 1;
              `"
            d="M 1190.6,1295 H 1316 v -20 z"
            id="massstab-path1"
          />
          <path
            :style="`
                fill: #000000;
                stroke: ${BelastungsplanConstants.legendColor};
                stroke-width: 2;
                stroke-linecap: square;
                stroke-miterlimit: 2.5;
                stroke-dasharray: none;
                stroke-opacity: 1;
              `"
            d="m 1253,1295 v -10"
            id="massstab-path2"
          />
          <g
            id="massstab-size1"
            style="stroke-width: 28.2205; stroke-dasharray: none"
          >
            <text
              xml:space="preserve"
              :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: center;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: middle;
                  white-space: pre;
                  inline-size: 268.729;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
              id="massstab-size1-multirow"
              x="1253"
              y="1315"
            >
              <tspan
                x="1253"
                y="1315"
                id="tspan27"
              >
                {{ highestZaehlwertRounded / 2 }}
              </tspan>
            </text>
          </g>
          <g
            id="massstab-size2"
            style="stroke-width: 28.2205; stroke-dasharray: none"
          >
            <text
              xml:space="preserve"
              :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: center;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: middle;
                  white-space: pre;
                  inline-size: 268.729;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
              id="massstab-size2-multirow"
              x="1316"
              y="1315"
            >
              <tspan
                x="1316"
                y="1315"
                id="tspan28"
              >
                {{ highestZaehlwertRounded }}
              </tspan>
            </text>
          </g>
        </g>
      </g>
      <g
        id="querschnitt"
        :transform="rotateSvg"
      >
        <g id="strassenname">
          <text
            v-if="firstStreetname.length === 1"
            xml:space="preserve"
            :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: middle;
                  fill: #000000;
                  stroke-width: 39.1848;
                `"
            x="697.23627"
            y="704.51794"
            id="strassenname_text"
          >
            <tspan
              id="strassenname_tspan"
              x="697.23627"
              y="704.51794"
            >
              {{ firstStreetname[0] }}
            </tspan>
          </text>
          <text
            v-if="firstStreetname.length > 1"
            xml:space="preserve"
            :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: middle;
                  fill: #000000;
                  stroke-width: 39.1848;
                `"
            id="strassenname_multirow1_text"
            x="699.24969"
            y="688.33734"
          >
            <tspan
              id="strassenname_multirow1_tspan"
              x="699.24969"
              y="688.33734"
            >
              {{ firstStreetname[0] }}
            </tspan>
          </text>
          <text
            v-if="firstStreetname.length > 1"
            xml:space="preserve"
            :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: middle;
                  fill: #000000;
                  stroke-width: 39.1848;
                `"
            id="strassenname_multirow2_text"
            x="699.24969"
            y="720.33734"
          >
            <tspan
              id="strassenname_multirow2_tspan"
              x="699.24969"
              y="720.33734"
            >
              {{ firstStreetname[1] }}
            </tspan>
          </text>
        </g>
        <g id="arrows">
          <g
            v-if="isCountedArrowOne || isCountedArrowTwo"
            id="arrows_1_and_2"
          >
            <g
              v-if="isCountedArrowOne"
              id="arrow1"
            >
              <path
                style="stroke-width: 40.1656"
                :d="dArrowOne"
                id="arrow1_shaft"
                ref="groupRefArrowOne"
                :fill="colorArrowOne"
                :transform="transformArrowOne"
              />
              <path
                style="
                  fill: none;
                  stroke: #000000;
                  stroke-width: 1.75545;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                id="arrow1_tip"
                d="m 221.73348,557.05942 19.31149,-18.45207 0.0167,36.84587 z"
              />
              <text
                xml:space="preserve"
                id="arrow1_zaehlwert_text"
                :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: end;
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="215.24681"
                y="563.9740875"
              >
                <tspan
                  id="arrow1_zaehlwert_tspan"
                  x="215.24681"
                  y="563.9740875"
                >
                  {{ zaehlwertArrowOne }}
                </tspan>
              </text>
            </g>
            <g
              v-if="isCountedArrowTwo"
              id="arrow2"
            >
              <path
                style="stroke-width: 40.1708"
                :d="dArrowTwo"
                id="arrow2_shaft"
                ref="groupRefArrowTwo"
                :fill="colorArrowTwo"
                :transform="transformArrowTwo"
              />
              <path
                style="
                  fill: none;
                  stroke: #000000;
                  stroke-width: 1.75545;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                id="arrow2_tip"
                d="m 1178.1206,613.06771 -19.31149,-18.45207 -0.0169,36.84587 z"
              />
              <text
                xml:space="preserve"
                id="arrow2_zaehlwert_text"
                :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: end;
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="215.83165"
                y="619.9740821"
              >
                <tspan
                  id="arrow2_zaehlwert_tspan"
                  x="215.83165"
                  y="619.9740821"
                >
                  {{ zaehlwertArrowTwo }}
                </tspan>
              </text>
            </g>
            <path
              style="
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 3.26332;
                stroke-dasharray: none;
              "
              d="m 133.56306,626.5 h 80.44096 v 1.0263 h -80.44096 z"
              id="arrows_1_and_2_sum_line"
            />
            <text
              xml:space="preserve"
              id="arrows_1_and_2_sum_text"
              :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: end;
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9644;
                `"
              x="215.26794"
              y="647.69934"
            >
              <tspan
                id="arrows_1_and_2_sum_tspan"
                x="215.26794"
                y="647.69934"
              >
                {{ sumArrowsOneTwo }}
              </tspan>
            </text>
          </g>
          <g
            v-if="isCountedArrowThree || isCountedArrowFour"
            id="arrows_3_and_4"
          >
            <g
              v-if="isCountedArrowThree"
              id="arrow3"
            >
              <path
                style="stroke-width: 40.1798"
                :d="dArrowThree"
                id="arrow3_shaft"
                ref="groupRefArrowThree"
                :fill="colorArrowThree"
                :transform="transformArrowThree"
              />
              <path
                style="
                  fill: none;
                  stroke: #000000;
                  stroke-width: 1.7698;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                id="arrow3_tip"
                d="m 221.49329,795.09394 19.31149,-18.45207 0.0169,36.84587 z"
              />
              <text
                xml:space="preserve"
                id="arrow3_zaehlwert_text"
                :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: end;
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="1274.4691"
                y="801.974045"
              >
                <tspan
                  id="arrow3_zaehlwert_tspan"
                  x="1274.4691"
                  y="801.974045"
                >
                  {{ zaehlwertArrowThree }}
                </tspan>
              </text>
            </g>
            <g
              v-if="isCountedArrowFour"
              id="arrow4"
            >
              <path
                style="stroke-width: 40.1798"
                :d="dArrowFour"
                id="arrow4_shaft"
                ref="groupRefArrowFour"
                :fill="colorArrowFour"
                :transform="transformArrowFour"
              />
              <path
                style="
                  fill: none;
                  stroke: #000000;
                  stroke-width: 1.75413;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                id="arrow4_tip"
                d="m 1178.1774,850.90543 -19.31149,-18.45207 -0.0169,36.84587 z"
              />
              <text
                xml:space="preserve"
                id="arrow4_zaehlwert_text"
                :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: end;
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="1274.4691"
                y="857.974051"
              >
                <tspan
                  id="arrow4_zaehlwert_tspan"
                  x="1274.4691"
                  y="857.974051"
                >
                  {{ zaehlwertArrowFour }}
                </tspan>
              </text>
            </g>
            <path
              style="fill: #000000; fill-opacity: 1; stroke-width: 13.4005"
              d="m 1186.6029,864.49999 h 87.5595 v 1.0263 h -87.5595 z"
              id="arrows_3_and_4_sum_line"
            />
            <text
              xml:space="preserve"
              id="arrows_3_and_4_sum_text"
              :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  text-align: end;
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9644;
                `"
              x="1274.8474"
              y="885.69934"
            >
              <tspan
                id="arrows_3_and_4_sum_tspan"
                x="1274.8474"
                y="885.69934"
              >
                {{ sumArrowsThreeFour }}
              </tspan>
            </text>
          </g>
        </g>
        <text
          xml:space="preserve"
          id="arrows_1_to_4_sum_left_text"
          :style="`
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: ${belastungsplanMethods.maxlineWidth}px;
                font-family: ${BelastungsplanConstants.fontfamily};
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: end;
                writing-mode: rl-tb;
                direction: rtl;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 43.9644;
              `"
          x="215.22824"
          y="707.44586"
        >
          <tspan
            id="arrows_1_to_4_sum_left_tspan"
            x="215.22824"
            y="707.44586"
          >
            {{ sumArrowsOneToFour }}
          </tspan>
        </text>
        <text
          xml:space="preserve"
          id="arrows_1_to_4_sum_right_text"
          :style="`
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: ${belastungsplanMethods.maxlineWidth}px;
                font-family: ${BelastungsplanConstants.fontfamily};
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: end;
                writing-mode: rl-tb;
                direction: rtl;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 43.9644;
              `"
          x="1274.7208"
          y="708.8515"
        >
          <tspan
            id="arrows_1_to_4_sum_right_tspan"
            x="1274.7208"
            y="708.8515"
          >
            {{ sumArrowsOneToFour }}
          </tspan>
        </text>
      </g>
    </svg>
  </v-sheet>
</template>

<script setup lang="ts">
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type { StartEndeUhrzeitIntervalls } from "@/types/zaehlung/StartEndeUhrzeitIntervalls";
import type VerkehrsbeziehungDTO from "@/types/zaehlung/VerkehrsbeziehungDTO";
import type AbstractLadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/AbstractLadeBelastungsplanDTO";
import type LadeBelastungsplanQjsDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanQjsDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { first } from "lodash";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import { BelastungsplanConstants } from "@/components/zaehlstelle/charts/BelastungsplanConstants";
import { useBelastungsplanMethods } from "@/components/zaehlstelle/charts/BelastungsplanMethods";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import BelastungsplanTyp from "@/types/enum/BelastungsplanTyp";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import { useDateUtils } from "@/util/DateUtils";
import { useQjs } from "@/util/QjsUtils";
import { useStrassennameUtils } from "@/util/StrassennameUtils";

interface Props {
  data: LadeBelastungsplanQjsDTO;
  dimension?: string;
}

const props = withDefaults(defineProps<Props>(), {
  dimension: "600vh",
});

const emits = defineEmits<{
  (e: "print", v: Blob): void;
}>();

const zaehlstelleStore = useZaehlstelleStore();
const display = useDisplay();
const dateUtils = useDateUtils();
const qjs = useQjs();
const strassennameUtils = useStrassennameUtils();
const belastungsplanMethods = useBelastungsplanMethods();

const firstStreetname = ref<Array<string>>([]);
const svgRef = ref<SVGSVGElement | null>(null);

// Refs zu den arrow-Gruppen (statt nur den path-Elementen)
const groupRefArrowOne = ref<SVGGElement | null>(null);
const groupRefArrowTwo = ref<SVGGElement | null>(null);
const groupRefArrowThree = ref<SVGGElement | null>(null);
const groupRefArrowFour = ref<SVGGElement | null>(null);

// berechnete Anker-Y-Werte (werden per getBBox ermittelt)
const centerYArrowOne = ref(0);
const centerYArrowTwo = ref(0);
const centerYArrowThree = ref(0);
const centerYArrowFour = ref(0);

function getArrowScale(zaehlwert: number) {
  const max = highestZaehlwert.value;
  if (!Number.isFinite(max) || max <= 0) return 0;
  const scale = Math.max(zaehlwert, 0) / max;
  return Math.max(BelastungsplanConstants.minimum_arrow_scale, scale);
}

function computeAnchorY(el: SVGGraphicsElement | null) {
  if (!el) return 0;
  // getBBox ist DOM-API; liefert x,y,width,height in user units
  const bbox = el.getBBox();
  return bbox.y + bbox.height / 2;
}

function scaleTransform(scaleY: number, centerY: number) {
  if (!Number.isFinite(scaleY) || scaleY === 1) return undefined;
  return `translate(0 ${centerY}) scale(1 ${scaleY}) translate(0 ${-centerY})`;
}

const transformArrowOne = computed(() =>
  scaleTransform(getArrowScale(zaehlwertArrowOne.value), centerYArrowOne.value)
);
const transformArrowTwo = computed(() =>
  scaleTransform(getArrowScale(zaehlwertArrowTwo.value), centerYArrowTwo.value)
);
const transformArrowThree = computed(() =>
  scaleTransform(
    getArrowScale(zaehlwertArrowThree.value),
    centerYArrowThree.value
  )
);
const transformArrowFour = computed(() =>
  scaleTransform(
    getArrowScale(zaehlwertArrowFour.value),
    centerYArrowFour.value
  )
);

// --- Pfad-Daten
const dArrowOne = `m 245,567 v -${belastungsplanMethods.maxlineWidth} h 909.4546 v ${belastungsplanMethods.maxlineWidth} z`;
const dArrowTwo = `m 245.31124,623 v -${belastungsplanMethods.maxlineWidth} h 909.68866 v ${belastungsplanMethods.maxlineWidth} z`;
const dArrowThree = `m 245,804.99999 v -${belastungsplanMethods.maxlineWidth} h 910.1007 v ${belastungsplanMethods.maxlineWidth} z`;
const dArrowFour = `m 244.89933,860.99999 v -${belastungsplanMethods.maxlineWidth} H 1155 v ${belastungsplanMethods.maxlineWidth} z`;

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const availableKnotenarmNummern = computed(() => {
  return qjs.computeAvailableKnotenarmNummernFromZaehlung(activeZaehlung.value);
});

const availableKnotenarme = computed(() => {
  return qjs.computeAvailableKnotenarme(activeZaehlung.value);
});

const rotateSvg = qjs.rotateSvgFor(availableKnotenarmNummern);

const isSelectedArrowOne = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    optionen.value?.chosenVerkehrsbeziehungen,
    qjs.patternsArrowOne
  );
});

const isSelectedArrowTwo = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    optionen.value?.chosenVerkehrsbeziehungen,
    qjs.patternsArrowTwo
  );
});

const isSelectedArrowThree = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    optionen.value?.chosenVerkehrsbeziehungen,
    qjs.patternsArrowThree
  );
});

const isSelectedArrowFour = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    optionen.value?.chosenVerkehrsbeziehungen,
    qjs.patternsArrowFour
  );
});

const isCountedArrowOne = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    activeZaehlung.value.verkehrsbeziehungen,
    qjs.patternsArrowOne
  );
});

const isCountedArrowTwo = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    activeZaehlung.value.verkehrsbeziehungen,
    qjs.patternsArrowTwo
  );
});

const isCountedArrowThree = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    activeZaehlung.value.verkehrsbeziehungen,
    qjs.patternsArrowThree
  );
});

const isCountedArrowFour = computed(() => {
  return qjs.hasAnyArrowPatternIn(
    activeZaehlung.value.verkehrsbeziehungen,
    qjs.patternsArrowFour
  );
});

function getArrowZaehlwert(patterns: VerkehrsbeziehungDTO[]) {
  if (!isQjsBelastungsplan(props.data) || !props.data.value1) {
    return 0;
  }
  const match = patterns.find(
    (p) =>
      availableKnotenarmNummern.value.includes(p.von) &&
      availableKnotenarmNummern.value.includes(p.nach)
  );
  if (!match) return 0;
  const values = props.data.value1.valuesVerkehrsbeziehungen;
  const zaehlwert = values.find(
    (k) =>
      k.von === match.von &&
      k.nach === match.nach &&
      k.strassenseite === match.strassenseite
  );
  return zaehlwert ? (zaehlwert.value ?? 0) : 0;
}

const zaehlwertArrowOne = computed(() => {
  return getArrowZaehlwert(qjs.patternsArrowOne);
});

const zaehlwertArrowTwo = computed(() => {
  return getArrowZaehlwert(qjs.patternsArrowTwo);
});

const zaehlwertArrowThree = computed(() => {
  return getArrowZaehlwert(qjs.patternsArrowThree);
});

const zaehlwertArrowFour = computed(() => {
  return getArrowZaehlwert(qjs.patternsArrowFour);
});

const sumArrowsOneTwo = computed(() => {
  if (!isQjsBelastungsplan(props.data) || !props.data.value1) {
    return 0;
  }
  let sum: number | undefined = 0;
  if (availableKnotenarmNummern.value.includes(1)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.W
    )?.value;
  } else if (availableKnotenarmNummern.value.includes(2)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.N
    )?.value;
  } else if (availableKnotenarmNummern.value.includes(5)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.NW
    )?.value;
  } else if (availableKnotenarmNummern.value.includes(6)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.NO
    )?.value;
  }
  return sum ?? 0;
});

const sumArrowsThreeFour = computed(() => {
  if (!isQjsBelastungsplan(props.data) || !props.data.value1) {
    return 0;
  }
  let sum: number | undefined = 0;
  if (availableKnotenarmNummern.value.includes(1)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.O
    )?.value;
  } else if (availableKnotenarmNummern.value.includes(2)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.S
    )?.value;
  } else if (availableKnotenarmNummern.value.includes(5)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.SO
    )?.value;
  } else if (availableKnotenarmNummern.value.includes(6)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.SW
    )?.value;
  }
  return sum ?? 0;
});

const sumArrowsOneToFour = computed(() => {
  if (!isQjsBelastungsplan(props.data) || !props.data.value1) {
    return 0;
  }
  return props.data.value1.sumAll;
});

const highestZaehlwert = computed(() => {
  return Math.max(
    zaehlwertArrowOne.value,
    zaehlwertArrowTwo.value,
    zaehlwertArrowThree.value,
    zaehlwertArrowFour.value
  );
});

const highestZaehlwertRounded = computed(() => {
  const v = Number(highestZaehlwert.value ?? 0);
  const ceil = Math.ceil(v / 1000) * 1000;
  return v % 1000 === 0 ? v + 1000 : ceil;
});

const colorArrowOne = computed<string>(() => {
  if (!isSelectedArrowOne.value) return BelastungsplanConstants.inaktivColor;
  return zaehlstelleStore.isBlackprintMode
    ? BelastungsplanConstants.blackPrintColor
    : calculateColorArrowOneTwo();
});

const colorArrowTwo = computed<string>(() => {
  if (!isSelectedArrowTwo.value) return BelastungsplanConstants.inaktivColor;
  return zaehlstelleStore.isBlackprintMode
    ? BelastungsplanConstants.blackPrintColor
    : calculateColorArrowOneTwo();
});

const colorArrowThree = computed<string>(() => {
  if (!isSelectedArrowThree.value) return BelastungsplanConstants.inaktivColor;
  return zaehlstelleStore.isBlackprintMode
    ? BelastungsplanConstants.blackPrintColor
    : calculateColorArrowThreeFour();
});

const colorArrowFour = computed<string>(() => {
  if (!isSelectedArrowFour.value) return BelastungsplanConstants.inaktivColor;
  return zaehlstelleStore.isBlackprintMode
    ? BelastungsplanConstants.blackPrintColor
    : calculateColorArrowThreeFour();
});

function calculateColorArrowOneTwo() {
  if (availableKnotenarmNummern.value.includes(1))
    return (
      BelastungsplanConstants.farben.get(1) ??
      BelastungsplanConstants.inaktivColor
    );
  if (availableKnotenarmNummern.value.includes(2))
    return (
      BelastungsplanConstants.farben.get(2) ??
      BelastungsplanConstants.inaktivColor
    );
  if (availableKnotenarmNummern.value.includes(5))
    return (
      BelastungsplanConstants.farben.get(5) ??
      BelastungsplanConstants.inaktivColor
    );
  if (availableKnotenarmNummern.value.includes(6))
    return (
      BelastungsplanConstants.farben.get(6) ??
      BelastungsplanConstants.inaktivColor
    );
  return BelastungsplanConstants.inaktivColor;
}

function calculateColorArrowThreeFour() {
  if (availableKnotenarmNummern.value.includes(3))
    return (
      BelastungsplanConstants.farben.get(3) ??
      BelastungsplanConstants.inaktivColor
    );
  if (availableKnotenarmNummern.value.includes(4))
    return (
      BelastungsplanConstants.farben.get(4) ??
      BelastungsplanConstants.inaktivColor
    );
  if (availableKnotenarmNummern.value.includes(7))
    return (
      BelastungsplanConstants.farben.get(7) ??
      BelastungsplanConstants.inaktivColor
    );
  if (availableKnotenarmNummern.value.includes(8))
    return (
      BelastungsplanConstants.farben.get(8) ??
      BelastungsplanConstants.inaktivColor
    );
  return BelastungsplanConstants.inaktivColor;
}

const optionen = computed<ZaehlstelleOptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});

const sizeBelastungsplan = computed(() => {
  let sizeBelastungsplanSvg: number = zaehlstelleStore.getSizeBelastungsplanSvg;
  if (sizeBelastungsplanSvg === 0) {
    sizeBelastungsplanSvg = minSizeBelastungsplan.value;
  }
  return sizeBelastungsplanSvg + "px";
});

const minSizeBelastungsplan = computed(() => {
  return (
    (parseInt(props.dimension.trim().replace("vh", "")) *
      display.height.value) /
    100
  );
});

const maxSizeBelastungsplan = computed(() => {
  return (
    (parseInt(props.dimension.trim().replace("vh", "")) * display.width.value) /
    100
  );
});

const zaehlzeit2 = computed(() => {
  if (optionen.value.zeitauswahl === Zeitauswahl.TAGESWERT) {
    if (activeZaehlung.value.zaehldauer === Zaehldauer.DAUER_24_STUNDEN) {
      return zeitblockInfo.get(Zeitblock.ZB_00_24)?.title;
    } else {
      return "hochgerechnet";
    }
  } else if (optionen.value.zeitauswahl === Zeitauswahl.BLOCK) {
    return zeitblockInfo.get(optionen.value.zeitblock)?.title;
  } else if (optionen.value.zeitauswahl === Zeitauswahl.STUNDE) {
    return zeitblockStuendlichInfo.get(optionen.value.zeitblock)?.title;
  } else if (
    optionen.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
    optionen.value.zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
  ) {
    const startEndeUhrzeitIntervalls: StartEndeUhrzeitIntervalls =
      zaehlstelleStore.getStartEndeUhrzeitIntervalls;
    return `${startEndeUhrzeitIntervalls.startUhrzeitIntervalls} - ${startEndeUhrzeitIntervalls.endeUhrzeitIntervalls} Uhr`;
  }
});

onMounted(() => {
  zaehlstelleStore.setSizeBelastungsplanSvg(
    Number.parseInt(sizeBelastungsplan.value.replace("px", ""))
  );
  zaehlstelleStore.setMaxSizeBelastungsplanSvg(maxSizeBelastungsplan.value);
  zaehlstelleStore.setMinSizeBelastungsplanSvg(minSizeBelastungsplan.value);

  firstStreetname.value = strassennameUtils.getStreetLines(
    first(availableKnotenarme.value)
  );

  // Berechnet Anker aus der gesamten Gruppe (Rumpf + Spitze)
  if (groupRefArrowOne.value)
    centerYArrowOne.value = computeAnchorY(groupRefArrowOne.value);
  if (groupRefArrowTwo.value)
    centerYArrowTwo.value = computeAnchorY(groupRefArrowTwo.value);
  if (groupRefArrowThree.value)
    centerYArrowThree.value = computeAnchorY(groupRefArrowThree.value);
  if (groupRefArrowFour.value)
    centerYArrowFour.value = computeAnchorY(groupRefArrowFour.value);
});

watch(
  [
    () => activeZaehlung.value.knotenarme,
    () => props.data,
    () => optionen.value.chosenVerkehrsbeziehungen,
    () => optionen.value.zeitauswahl,
    () => zaehlstelleStore.getStartEndeUhrzeitIntervalls,
    () => zaehlstelleStore.isBlackprintMode,
  ],
  async () => {
    firstStreetname.value = strassennameUtils.getStreetLines(
      first(availableKnotenarme.value)
    );
    // Warte auf DOM-Update, damit arrowOneGroupRef / arrowTwoGroupRef gesetzt/aktualisiert wird
    // Andernfalls wird nur rotateSvg ausgeführt, was zur Verschiebung der Pfeile führt.
    await nextTick();
    if (groupRefArrowOne.value) {
      centerYArrowOne.value = computeAnchorY(groupRefArrowOne.value);
    }
    if (groupRefArrowTwo.value) {
      centerYArrowTwo.value = computeAnchorY(groupRefArrowTwo.value);
    }
    if (groupRefArrowThree.value) {
      centerYArrowThree.value = computeAnchorY(groupRefArrowThree.value);
    }
    if (groupRefArrowFour.value) {
      centerYArrowFour.value = computeAnchorY(groupRefArrowFour.value);
    }

    emitSvgAsBlob();
  },
  { deep: true, immediate: true }
);

/**
 * Serialisiert das SVG Element, um einen Blob für die Print-Funktion zu erstellen.
 */
function serializeSvgElement(svgEl: SVGSVGElement): string {
  const clone = svgEl.cloneNode(true) as SVGSVGElement;

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

function isQjsBelastungsplan(
  data: AbstractLadeBelastungsplanDTO | undefined
): data is LadeBelastungsplanQjsDTO {
  return !!data && data.belastungsplanTyp === BelastungsplanTyp.QJS;
}
</script>
