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
      <g id="root">
        <g
          id="querschnitt"
          :transform="rotateSvg"
        >
          <g id="description">
            <g id="first_street">
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
                id="singlerow"
              >
                <tspan
                  id="tspan21"
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
                id="multirow"
                x="699.24969"
                y="688.33734"
              >
                <tspan
                  id="tspan19"
                  x="699.24969"
                  y="688.33734"
                >
                  {{ firstStreetname[0] }}
                </tspan>
                <tspan
                  id="tspan20"
                  x="699.24969"
                  y="713.56885"
                >
                  {{ firstStreetname[1] }}
                </tspan>
              </text>
            </g>
          </g>
          <g id="arrows">
            <g id="arrow1">
              <path
                style="stroke-width: 40.1656"
                :d="dArrowOne"
                id="shaft1"
                ref="groupRefArrowOne"
                :fill="colorArrowOne"
                :transform="transformArrowOne"
              />
              <path
                style="
                  fill: none;
                  stroke: #000000;
                  stroke-width: 2.08902;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                id="tip1"
                d="m 221.73348,553.05942 19.31149,-25.58133 0.0167,51.09625 z"
              />
            </g>
            <g id="arrow2">
              <path
                style="stroke-width: 40.1708"
                :d="dArrowTwo"
                id="shaft2"
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
                id="tip2"
                d="m 1178.1206,609.06771 -18.7975,-22.45207 -0.017,44.84587 z"
              />
            </g>
            <g id="arrow3">
              <path
                style="stroke-width: 40.1798"
                :d="dArrowThree"
                id="shaft3"
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
                id="tip3"
                d="m 221.49329,791.09394 19.39305,-22.32164 0.0169,44.58532 z"
              />
            </g>
            <g id="arrow4">
              <path
                style="stroke-width: 40.1798"
                :d="dArrowFour"
                id="shaft4"
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
                id="tip4"
                d="m 1178.1774,846.90543 -18.6954,-22.33904 -0.017,44.62008 z"
              />
            </g>
          </g>
          <g id="zaehlwerte">
            <text
              xml:space="preserve"
              id="sumArrowsOneToFourLeft"
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
                id="tspan32"
                x="215.22824"
                y="707.44586"
              >
                {{ sumArrowsOneToFour }}
              </tspan>
            </text>
            <text
              xml:space="preserve"
              id="sumArrowsOneToFourRight"
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
                id="tspan33"
                x="1274.7208"
                y="708.8515"
              >
                {{ sumArrowsOneToFour }}
              </tspan>
            </text>
            <g id="zaehlwerteArrowsOneTwo">
              <text
                xml:space="preserve"
                id="zaehlwertArrowOne"
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
                y="562.0257"
              >
                <tspan
                  id="tspan36"
                  x="215.24681"
                  y="562.0257"
                >
                  {{ zaehlwertArrowOne }}
                </tspan>
              </text>
              <text
                xml:space="preserve"
                id="zaehlwertArrowTwo"
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
                y="615.81903"
              >
                <tspan
                  id="tspan13"
                  x="215.83165"
                  y="615.81903"
                >
                  {{ zaehlwertArrowTwo }}
                </tspan>
              </text>
              <path
                style="
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 3.26332;
                  stroke-dasharray: none;
                "
                d="m 133.56306,621.30263 h 80.44096 v 1.0263 h -80.44096 z"
                id="separatorOneTwo"
              />
              <text
                xml:space="preserve"
                id="sumArrowsOneTwo"
                :style="`
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${belastungsplanMethods.maxlineWidth};
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
                y="642.70013"
              >
                <tspan
                  id="tspan34"
                  x="215.26794"
                  y="642.70013"
                >
                  {{ sumArrowsOneTwo }}
                </tspan>
              </text>
            </g>
            <g id="zaehlwerteArrowsThreeFour">
              <text
                xml:space="preserve"
                id="zaehlwertArrowThree"
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
                y="799.2951"
              >
                <tspan
                  id="tspan39"
                  x="1274.4691"
                  y="799.2951"
                >
                  {{ zaehlwertArrowThree }}
                </tspan>
              </text>
              <text
                xml:space="preserve"
                id="zaehlwertArrowFour"
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
                x="1273.3658"
                y="855.68152"
              >
                <tspan
                  id="tspan14"
                  x="1273.3658"
                  y="855.68152"
                >
                  {{ zaehlwertArrowFour }}
                </tspan>
              </text>
              <path
                style="fill: #000000; fill-opacity: 1; stroke-width: 13.4005"
                d="m 1186.6029,862.50248 h 87.5595 v 0.55173 h -87.5595 z"
                id="separatorThreeFour"
              />
              <text
                xml:space="preserve"
                id="sumArrowsThreeFour"
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
                y="884.09052"
              >
                <tspan
                  id="tspan37"
                  x="1274.8474"
                  y="884.09052"
                >
                  {{ sumArrowsThreeFour }}
                </tspan>
              </text>
            </g>
          </g>
        </g>
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
                x="1107.2496"
                y="60.337341"
              >
                <tspan
                  x="1107.2496"
                  y="60.337341"
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
                x="1107.2496"
                y="85.837341"
              >
                <tspan
                  x="1107.2496"
                  y="85.837341"
                  id="tspan17"
                >
                  Stadtbezirk
                  {{ zaehlstelleStore.getZaehlstelleHeader.stadtbezirkNummer }}
                </tspan>
                <tspan
                  x="1107.2496"
                  y="112.26053"
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
                x="56.249691"
                y="1230.3373"
              >
                <tspan
                  x="56.249691"
                  y="1230.3373"
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
                x="56.249691"
                y="1257"
              >
                <tspan
                  x="56.249691"
                  y="1257"
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
              x="56.249691"
              y="1310.3373"
            >
              <tspan
                x="56.249691"
                y="1310.3373"
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
                stroke-width: 1.99499999;
                stroke-linecap: square;
                stroke-miterlimit: 2.5;
                stroke-dasharray: none;
                stroke-opacity: 1;
              `"
              d="m 1316.5243,1294.7302 -124.9982,-0.2134 124.9982,-19.8383 z"
              id="massstab-path1"
            />
            <path
              :style="`
                fill: #000000;
                stroke: ${BelastungsplanConstants.legendColor};
                stroke-width: 1.50489;
                stroke-linecap: square;
                stroke-miterlimit: 2.5;
                stroke-dasharray: none;
                stroke-opacity: 1;
              `"
              d="m 1252.7468,1284.8273 c 0.1805,8.9058 0.185,8.7945 0.185,8.7945 v 0"
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
                x="1250.2496"
                y="1315.3373"
              >
                <tspan
                  x="1250.2496"
                  y="1315.3373"
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
                x="1316.2496"
                y="1315.3373"
              >
                <tspan
                  x="1316.2496"
                  y="1315.3373"
                  id="tspan28"
                >
                  {{ highestZaehlwertRounded }}
                </tspan>
              </text>
            </g>
          </g>
        </g>
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
const dArrowOne = "m 245,567 v -28 h 909.4546 v 27.998 z";
const dArrowTwo = "m 245.31124,623 v -28 h 909.68866 v 27.997 z";
const dArrowThree = "m 245,804.99999 v -28 h 910.1007 v 27.997 z";
const dArrowFour = "m 244.89933,860.99999 v -28 H 1155 v 27.997 z";

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
  return calculateColorArrowOneTwo();
});

const colorArrowTwo = computed<string>(() => {
  if (!isSelectedArrowTwo.value) return BelastungsplanConstants.inaktivColor;
  return calculateColorArrowOneTwo();
});

const colorArrowThree = computed<string>(() => {
  if (!isSelectedArrowThree.value) return BelastungsplanConstants.inaktivColor;
  return calculateColorArrowThreeFour();
});

const colorArrowFour = computed<string>(() => {
  if (!isSelectedArrowFour.value) return BelastungsplanConstants.inaktivColor;
  return calculateColorArrowThreeFour();
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
