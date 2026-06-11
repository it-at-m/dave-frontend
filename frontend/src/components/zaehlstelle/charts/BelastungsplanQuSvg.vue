<template>
  <v-sheet id="belastungsplan-zaehlstelle">
    <svg
      ref="svgRef"
      id="svg1"
      :width="sizeBelastungsplan"
      :height="sizeBelastungsplan"
      viewBox="0 0 1400 1400"
      version="1.1"
      fill-rule="evenodd"
      stroke-width="28.222"
      stroke-linejoin="round"
      preserveAspectRatio="xMidYMid"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <defs id="defs1" />
      <g
        id="nodes1To4"
        class="Page"
        style="stroke-width: 28.22049979; stroke-dasharray: none"
      >
        <g
          v-if="isKnotenarm(1)"
          id="node1_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          style="stroke-width: 28.22049979; stroke-dasharray: none"
        >
          <g
            id="node1"
            style="stroke-width: 28.22049979; stroke-dasharray: none"
          >
            <path
              id="node1_spike"
              d="M 664.99999,665 V 185.409 L 699.99947,140 734.99999,185.4058 V 665 Z"
              fill="#9e9e9e"
              stroke="none"
              style="
                stroke-width: 28.22049979;
                stroke-dasharray: none;
                fill: #ececec;
              "
            />
            <g
              id="node1_number"
              style="stroke-width: 28.22049979; stroke-dasharray: none"
            >
              <circle
                id="node1_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 0.597525;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="700"
                cy="614.25"
                r="11.951238"
              />
              <text
                id="node1_circle_text"
                xml:space="default"
                :style="`
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 28.22049979;
                  stroke-dasharray: none;
                `"
                y="622.00684"
                x="693.53955"
              >
                <tspan
                  id="node1_circle_tspan"
                  style="stroke-width: 28.22049979; stroke-dasharray: none"
                  x="693.53955"
                  y="622.00684"
                >
                  1
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNode1.length === 1"
              id="node1_strassenname_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.22049979;
                stroke-dasharray: none;
              `"
              transform="rotate(-90)"
              x="-671.03851"
              y="629.34802"
            >
              <tspan
                id="node1_strassenname_tspan"
                x="-438.67819"
                y="705.79083"
                style="stroke-width: 28.22049979; stroke-dasharray: none"
              >
                {{ streetnameNode1[0] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNode1.length > 1"
              id="node1_strassenname_multirow1_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.22049979;
                stroke-dasharray: none;
              `"
              transform="rotate(-90)"
              x="-671.03851"
              y="615.34802"
            >
              <tspan
                id="node1_strassenname_multirow1_tspan"
                x="-438.67819"
                y="691.79083"
                style="stroke-width: 28.22049979; stroke-dasharray: none"
              >
                {{ streetnameNode1[0] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNode1.length > 1"
              id="node1_strassenname_multirow2_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.22049979;
                stroke-dasharray: none;
              `"
              transform="rotate(-90)"
              x="-671.03851"
              y="643.34802"
            >
              <tspan
                id="node1_strassenname_multirow2_tspan"
                x="-438.67819"
                y="719.79083"
                style="stroke-width: 28.22049979; stroke-dasharray: none"
              >
                {{ streetnameNode1[1] }}
              </tspan>
            </text>
            <g id="node1_sum">
              <text
                id="node1_sum_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
                x="-1347.4354"
                y="37.009502"
              >
                <tspan
                  id="node1_sum_tspan"
                  x="-200"
                  y="818"
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
                    stroke-width: 28.2205;
                    stroke-dasharray: none;
                  `"
                >
                  {{ sumNode1Arrows }}
                </tspan>
              </text>
              <path
                style="
                  fill: #000000;
                  stroke: #000000;
                  stroke-width: 3.32425;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                d="M 796.33788,299.49696 796.16212,193.00269"
                id="node1_sum_line"
              />
            </g>
          </g>
          <g
            id="arrows_node1"
            style="stroke-width: 28.22049979; stroke-dasharray: none"
          >
            <path
              v-if="node1WestToEastCensusComissioned"
              id="arrow_node1_west_to_east"
              d="M 612.5,252.424 H 745.2445 V 239.5 l 42.2555,28 -42.2555,28 V 282.576 H 612.5 Z"
              fill="#FFFFFF"
              :stroke="colorArrowNode1WestToEast"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <path
              v-if="node1EastToWestCensusComissioned"
              id="arrow_node1_east_to_west"
              d="M 787.5,230.076 H 654.7555 V 243 L 612.5,215 654.7555,187 v 12.924 H 787.5 Z"
              fill="#FFFFFF"
              :stroke="colorArrowNode1EastToWest"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <text
              v-if="node1WestToEastCensusComissioned"
              id="arrow_node1_west_to_east_number_text"
              xml:space="preserve"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.2628px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 28.22049989;
                stroke-dasharray: none;
              "
              x="-465.17621"
              y="-520.35779"
            >
              <tspan
                id="arrow_node1_west_to_east_number_tspan"
                x="699.1098"
                y="272.47839"
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
                  stroke-width: 28.22049989;
                  stroke-dasharray: none;
                `"
              >
                {{ zaehlwertArrowNode1WestToEast }}
              </tspan>
            </text>
            <text
              v-if="node1EastToWestCensusComissioned"
              id="arrow_node1_east_to_west_number_text"
              xml:space="preserve"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.2628px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 28.22049989;
                stroke-dasharray: none;
              "
              x="-465.17548"
              y="-572.85791"
            >
              <tspan
                id="arrow_node1_east_to_west_number_tspan"
                x="699.1098"
                y="219.97839"
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
                  stroke-width: 28.2204997;
                  stroke-dasharray: none;
                `"
              >
                {{ zaehlwertArrowNode1EastToWest }}
              </tspan>
            </text>
          </g>
        </g>
        <g
          v-if="isKnotenarm(2)"
          id="node2_group"
          style="stroke-width: 28.22049979; stroke-dasharray: none"
        >
          <g
            id="node2"
            style="
              display: inline;
              stroke-width: 28.2205;
              stroke-dasharray: none;
            "
          >
            <path
              id="node2_spike"
              d="M 734.99999,664.99999 H 1214.591 l 45.409,34.99948 -45.4058,35.00052 H 734.99999 Z"
              fill="#9e9e9e"
              stroke="none"
              style="
                stroke-width: 28.2205;
                stroke-dasharray: none;
                fill: #ececec;
              "
            />
            <text
              v-if="streetnameNode2.length === 1"
              id="node2_strassenname_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.2205;
                stroke-dasharray: none;
              `"
              x="728.96271"
              y="629.34802"
            >
              <tspan
                id="node2_strassenname_tspan"
                x="961.323"
                y="705.79083"
                style="stroke-width: 28.2205; stroke-dasharray: none"
              >
                {{ streetnameNode2[0] }}
              </tspan>
            </text>
            <g
              id="node2_number"
              style="stroke-width: 28.2205; stroke-dasharray: none"
            >
              <circle
                id="node2_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 0.597525;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="785.75"
                cy="700"
                r="11.951238"
              />
              <text
                id="node2_circle_text"
                xml:space="default"
                :style="`
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
                y="707.33368"
                x="779.30457"
              >
                <tspan
                  id="node2_circle_tspan"
                  style="stroke-width: 28.2205; stroke-dasharray: none"
                  x="779.30457"
                  y="707.33368"
                >
                  2
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNode2.length > 1"
              id="node2_strassenname_multirow2_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.2205;
                stroke-dasharray: none;
              `"
              x="728.96271"
              y="643.34802"
            >
              <tspan
                id="node2_strassenname_multirow2_tspan"
                x="961.323"
                y="719.79083"
                style="stroke-width: 28.2205; stroke-dasharray: none"
              >
                {{ streetnameNode2[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNode2.length > 1"
              id="node2_strassenname_multirow1_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.2205;
                stroke-dasharray: none;
              `"
              x="728.96271"
              y="615.34802"
            >
              <tspan
                id="node2_strassenname_multirow1_tspan"
                x="961.323"
                y="691.79083"
                style="stroke-width: 28.2205; stroke-dasharray: none"
              >
                {{ streetnameNode2[0] }}
              </tspan>
            </text>
            <g
              id="node2_sum"
              style="stroke-width: 28.2205; stroke-dasharray: none"
              transform="rotate(90,699.99982,699.99982)"
            >
              <text
                id="node2_sum_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
                x="-1383.7572"
                y="-70.255974"
              >
                <tspan
                  id="node2_sum_tspan"
                  x="-195"
                  y="818"
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
                    stroke-width: 28.2205;
                    stroke-dasharray: none;
                  `"
                >
                  {{ sumNode2Arrows }}
                </tspan>
              </text>
              <path
                id="node2_sum_line"
                style="
                  display: inline;
                  fill: #000000;
                  stroke: #000000;
                  stroke-width: 3.32425;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                d="M 796.33788,290.49696 796.16212,182.00269"
              />
            </g>
          </g>
          <g
            id="arrows_node2"
            style="stroke-width: 28.22049979; stroke-dasharray: none"
          >
            <path
              v-if="node2NorthToSouthCensusComissioned"
              id="arrow_node2_north_to_south"
              d="m 1147.576,612.49999 v 132.74447 h 12.924 l -28,42.25553 -28,-42.25553 h 12.924 V 612.49999 Z"
              fill="#FFFFFF"
              :stroke="colorArrowNode2NorthToSouth"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <path
              v-if="node2SouthToNorthCensusComissioned"
              id="arrow_node2_south_to_north"
              d="M 1170.924,787.49999 V 654.75552 H 1158 l 28,-42.25553 28,42.25553 h -12.924 v 132.74447 z"
              fill="#FFFFFF"
              :stroke="colorArrowNode2SouthToNorth"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <text
              v-if="node2NorthToSouthCensusComissioned"
              id="arrow_node2_north_to_south_number_text"
              xml:space="preserve"
              transform="rotate(-90)"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.0866px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 28.22049979;
                stroke-dasharray: none;
              "
              x="-1857.6315"
              y="359.45795"
            >
              <tspan
                id="arrow_node2_north_to_south_number_tspan"
                x="-700.60413"
                y="1140.3517"
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
                  stroke-width: 28.22049979;
                  stroke-dasharray: none;
                `"
              >
                {{ zaehlwertArrowNode2NorthToSouth }}
              </tspan>
            </text>
            <text
              v-if="node2SouthToNorthCensusComissioned"
              id="arrow_node2_south_to_north_number_text"
              xml:space="preserve"
              transform="rotate(-90)"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.0866px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 28.22049979;
                stroke-dasharray: none;
              "
              x="-1857.6313"
              y="411.95795"
            >
              <tspan
                id="arrow_node2_south_to_north_number_tspan"
                x="-700.60413"
                y="1194"
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
                  stroke-width: 28.22049979;
                  stroke-dasharray: none;
                 `"
              >
                {{ zaehlwertArrowNode2SouthToNorth }}
              </tspan>
            </text>
          </g>
        </g>
        <g
          v-if="isKnotenarm(3)"
          id="node3_group"
          style="stroke-width: 28.22049979; stroke-dasharray: none"
        >
          <g
            id="node3"
            style="stroke-width: 28.22049979; stroke-dasharray: none"
          >
            <path
              id="node3_spike"
              d="M 734.99999,734.99999 V 1214.591 L 700.00051,1260 664.99999,1214.5942 V 734.99999 Z"
              fill="#9e9e9e"
              stroke="none"
              style="
                stroke-width: 28.22049979;
                stroke-dasharray: none;
                fill: #ececec;
              "
            />
            <text
              v-if="streetnameNode3.length === 1"
              id="node3_strassenname_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.22049979;
                stroke-dasharray: none;
              `"
              transform="rotate(-90)"
              x="-962.48126"
              y="705.79083"
            >
              <tspan
                id="node3_strassenname_tspan"
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
                  stroke-width: 28.22049979;
                  stroke-dasharray: none;
                `"
                x="-962.48126"
                y="705.79083"
              >
                {{ streetnameNode3[0] }}
              </tspan>
            </text>
            <g
              id="node3_number"
              style="stroke-width: 28.22049979; stroke-dasharray: none"
            >
              <circle
                id="node3_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 0.597525;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="700"
                cy="785.75"
                r="11.951238"
              />
              <text
                id="node3_circle_text"
                xml:space="default"
                :style="`
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 28.22049979;
                  stroke-dasharray: none;
                `"
                y="792.38141"
                x="693.75189"
              >
                <tspan
                  id="node3_circle_tspan"
                  style="stroke-width: 28.22049979; stroke-dasharray: none"
                  x="693.75189"
                  y="792.38141"
                >
                  3
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNode3.length > 1"
              id="node3_strassenname_multirow2_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.22049979;
                stroke-dasharray: none;
              `"
              transform="rotate(-90)"
              x="-962.48126"
              y="719.79083"
            >
              <tspan
                id="node3_strassenname_multirow2_tspan"
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
                  stroke-width: 28.22049979;
                  stroke-dasharray: none;
                `"
                x="-962.48126"
                y="719.79083"
              >
                {{ streetnameNode3[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNode3.length > 1"
              id="node3_strassenname_multirow1_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.22049979;
                stroke-dasharray: none;
              `"
              transform="rotate(-90)"
              x="-962.48126"
              y="691.79083"
            >
              <tspan
                id="node3_strassenname_multirow1_tspan"
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
                  stroke-width: 28.22049979;
                  stroke-dasharray: none;
                `"
                x="-962.48126"
                y="691.79083"
              >
                {{ streetnameNode3[0] }}
              </tspan>
            </text>
            <g
              id="node3_sum"
              style="stroke-width: 28.2205; stroke-dasharray: none"
              transform="translate(-3.251155e-6,927.49999)"
            >
              <text
                id="node3_sum_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 28.2204997;
                  stroke-dasharray: none;
                `"
                x="-1383.7572"
                y="-70.255974"
              >
                <tspan
                  id="node3_sum_tspan"
                  x="-195"
                  y="818"
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
                    stroke-width: 28.2204997;
                    stroke-dasharray: none;
                  `"
                >
                  {{ sumNode3Arrows }}
                </tspan>
              </text>
              <path
                id="node3_sum_line"
                style="
                  fill: #000000;
                  stroke: #000000;
                  stroke-width: 3.32425;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                d="M 796.33788,290.49696 796.16212,182.00269"
              />
            </g>
          </g>
          <g
            id="arrows_node3"
            style="stroke-width: 28.22049979; stroke-dasharray: none"
          >
            <path
              v-if="node3WestToEastCensusComissioned"
              id="arrow_node3_west_to_east"
              d="M 612.5,1174.924 H 745.2445 V 1162 l 42.2555,28 -42.2555,28 v -12.924 H 612.5 Z"
              fill="#FFFFFF"
              :stroke="colorArrowNode3WestToEast"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <path
              v-if="node3EastToWestCensusComissioned"
              id="arrow_node3_east_to_west"
              d="M 787.5,1152.576 H 654.7555 v 12.924 l -42.2555,-28 42.2555,-28 v 12.924 H 787.5 Z"
              fill="#FFFFFF"
              :stroke="colorArrowNode3EastToWest"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <text
              v-if="node3WestToEastCensusComissioned"
              id="arrow_node3_west_to_east_number_text"
              xml:space="preserve"
              fill="#000000"
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
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 28.22049989;
                stroke-dasharray: none;
              `"
              x="-465.17621"
              y="407.14215"
            >
              <tspan
                id="arrow_node3_west_to_east_number_tspan"
                x="699.1098"
                y="1196"
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
                  stroke-width: 28.22049989;
                  stroke-dasharray: none;
                `"
              >
                {{ zaehlwertArrowNode3WestToEast }}
              </tspan>
            </text>
            <text
              v-if="node3EastToWestCensusComissioned"
              id="arrow_node3_east_to_west_number_text"
              xml:space="preserve"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.2628px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 28.22049989;
                stroke-dasharray: none;
              "
              x="-465.17545"
              y="354.64206"
            >
              <tspan
                id="arrow_node3_east_to_west_number_tspan"
                x="699.1098"
                y="1144"
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
                  stroke-width: 28.22049989;
                  stroke-dasharray: none;
                `"
              >
                {{ zaehlwertArrowNode3EastToWest }}
              </tspan>
            </text>
          </g>
        </g>
        <g
          v-if="isKnotenarm(4)"
          id="node4_group"
          style="stroke-width: 28.22049979; stroke-dasharray: none"
        >
          <g
            id="node4"
            style="stroke-width: 28.22049979; stroke-dasharray: none"
          >
            <path
              id="node4_spike"
              d="M 664.99998,734.99999 H 185.409 L 140,700.00052 185.4058,664.99999 h 479.59418 z"
              fill="#9e9e9e"
              stroke="none"
              style="
                stroke-width: 28.22049979;
                stroke-dasharray: none;
                fill: #ececec;
              "
            />
            <text
              v-if="streetnameNode4.length === 1"
              id="node4_strassenname_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.22049979;
                stroke-dasharray: none;
              `"
              x="437.52008"
              y="705.79083"
            >
              <tspan
                id="node4_strassenname_tspan"
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
                  stroke-width: 28.22049979;
                  stroke-dasharray: none;
                `"
                x="437.52008"
                y="705.79083"
              >
                {{ streetnameNode4[0] }}
              </tspan>
            </text>
            <g
              id="node4_number"
              style="stroke-width: 28.22049979; stroke-dasharray: none"
            >
              <circle
                id="node4_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 0.597525;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="614.25"
                cy="700"
                r="11.951238"
              />
              <text
                id="node4_circle_text"
                xml:space="default"
                :style="`
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 28.22049979;
                  stroke-dasharray: none;
                `"
                y="707.20343"
                x="608.34302"
              >
                <tspan
                  id="node4_circle_tspan"
                  style="stroke-width: 28.22049979; stroke-dasharray: none"
                  x="608.34302"
                  y="707.20343"
                >
                  4
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNode4.length > 1"
              id="node4_strassenname_multirow2_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.22049979;
                stroke-dasharray: none;
              `"
              x="437.52008"
              y="719.79083"
            >
              <tspan
                id="node4_strassenname_multirow2_tspan"
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
                  stroke-width: 28.22049979;
                  stroke-dasharray: none;
                `"
                x="437.52008"
                y="719.79083"
              >
                {{ streetnameNode4[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNode4.length > 1"
              id="node4_strassenname_multirow1_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 28.22049979;
                stroke-dasharray: none;
              `"
              x="437.52008"
              y="691.79083"
            >
              <tspan
                id="node4_strassenname_multirow1_tspan"
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
                  stroke-width: 28.22049979;
                  stroke-dasharray: none;
                `"
                x="437.52008"
                y="691.79083"
              >
                {{ streetnameNode4[0] }}
              </tspan>
            </text>
            <g
              id="node4_sum"
              style="
                display: inline;
                stroke-width: 28.2205;
                stroke-dasharray: none;
              "
              transform="rotate(90,236.24983,236.24982)"
            >
              <text
                id="node4_sum_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 28.22049972;
                  stroke-dasharray: none;
                `"
                x="-1383.7572"
                y="-70.255974"
              >
                <tspan
                  id="node4_sum_tspan"
                  x="-190"
                  y="817"
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
                    stroke-width: 28.22049972;
                    stroke-dasharray: none;
                  `"
                >
                  {{ sumNode4Arrows }}
                </tspan>
              </text>
              <path
                id="node4_sum_line"
                style="
                  display: inline;
                  fill: #000000;
                  stroke: #000000;
                  stroke-width: 3.32425;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                d="M 796.33788,290.49696 796.16212,182.00269"
              />
            </g>
          </g>
          <g
            id="arrows_node4"
            style="stroke-width: 28.22049979; stroke-dasharray: none"
          >
            <path
              v-if="node4NorthToSouthCensusComissioned"
              id="arrow_node4_north_to_south"
              d="M 225.076,612.49999 V 745.24446 H 238 l -28,42.25553 -28,-42.25553 h 12.924 V 612.49999 Z"
              fill="#FFFFFF"
              :stroke="colorArrowNode4NorthToSouth"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <path
              v-if="node4SouthToNorthCensusComissioned"
              id="arrow_node4_south_to_north"
              d="M 247.424,787.49999 V 654.75552 H 234.5 l 28,-42.25553 28,42.25553 h -12.924 v 132.74447 z"
              fill="#FFFFFF"
              :stroke="colorArrowNode4SouthToNorth"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <text
              v-if="node4NorthToSouthCensusComissioned"
              xml:space="preserve"
              id="arrow_node4_north_to_south_number_text"
              transform="rotate(-90)"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.0866px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 28.2205;
                stroke-dasharray: none;
              "
              x="-1857.6313"
              y="-568.04199"
            >
              <tspan
                x="-700.60413"
                y="217"
                id="arrow_node4_north_to_south_number_tspan"
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
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
               `"
              >
                {{ zaehlwertArrowNode4NorthToSouth }}
              </tspan>
            </text>
            <text
              v-if="node4SouthToNorthCensusComissioned"
              xml:space="preserve"
              transform="rotate(-90)"
              id="arrow_node4_south_to_north_number_text"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.0866px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 28.2205;
                stroke-dasharray: none;
              "
              x="-1857.6316"
              y="-515.54205"
            >
              <tspan
                x="-700.60413"
                y="271"
                id="arrow_node4_south_to_north_number_tspan"
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
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
              >
                {{ zaehlwertArrowNode4SouthToNorth }}
              </tspan>
            </text>
          </g>
        </g>
      </g>
      <g id="nodes5To8">
        <g
          v-if="isKnotenarm(5)"
          id="node5_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="node5">
            <path
              id="node5_spike"
              d="m 699.99999,650.50319 339.12201,-339.12205 56.8574,-7.36064 -7.3576,56.85586 -339.12433,339.12431 z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949; fill: #ececec"
            />
            <g id="node5_number">
              <circle
                id="node5_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 0.597525;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="760.63751"
                cy="639.36597"
                r="11.951238"
              />
              <text
                id="node5_circle_text"
                xml:space="default"
                :style="`
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                `"
                y="646.03784"
                x="754.23737"
              >
                <tspan
                  id="node5_circle_tspan"
                  style="stroke-width: 30.9229"
                  x="754.23737"
                  y="646.03784"
                >
                  5
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNode5.length === 1"
              id="node5_strassenname_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              transform="rotate(-45)"
              x="28.961172"
              y="919.29742"
            >
              <tspan
                id="node5_strassenname_tspan"
                x="261.3215"
                y="995.74023"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNode5[0] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNode5.length > 1"
              id="node5_strassenname_multirow2_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              transform="rotate(-45)"
              x="28.963634"
              y="933.29785"
            >
              <tspan
                id="node5_strassenname_multirow2_tspan"
                x="261.32397"
                y="1009.7406"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNode5[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNode5.length > 1"
              id="node5_strassenname_multirow1_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              transform="rotate(-45)"
              x="28.961161"
              y="905.2995"
            >
              <tspan
                id="node5_strassenname_multirow1_tspan"
                x="261.32147"
                y="981.74231"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNode5[0] }}
              </tspan>
            </text>
            <g
              id="node5_sum"
              style="
                display: inline;
                stroke-width: 28.2205;
                stroke-dasharray: none;
              "
              transform="rotate(45,720.59848,699.99663)"
            >
              <text
                id="node5_sum_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
                x="-1383.7572"
                y="-70.255974"
              >
                <tspan
                  id="node5_sum_tspan"
                  x="-210"
                  y="818"
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
                    stroke-width: 28.2205;
                    stroke-dasharray: none;
                  `"
                >
                  {{ sumNode5Arrows }}
                </tspan>
              </text>
              <path
                id="node5_sum_line"
                style="
                  display: inline;
                  fill: #000000;
                  stroke: #000000;
                  stroke-width: 3.32425;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                d="M 796.33788,310.49696 796.16212,204.00269"
              />
            </g>
          </g>
          <g
            id="arrows_node5"
            transform="translate(6.0322729,-14.56374)"
          >
            <path
              v-if="node5NorthWestToSouthEastCensusComissioned"
              id="arrow_node5_north_west_to_south_east"
              d="m 948.14818,331.108 93.86452,93.86454 9.1387,-9.13865 10.0801,49.67814 -49.6781,-10.08016 9.1386,-9.13865 -93.86451,-93.86453 z"
              fill="#FFFFFF"
              :stroke="colorArrowNode5NorthWestToSouthEast"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <path
              v-if="node5SouthEastToNorthWestCensusComissioned"
              id="arrow_node5_south_east_to_north_west"
              d="m 1086.6928,441.04853 -93.8645,-93.86454 -9.13865,9.13865 -10.08016,-49.67814 49.67811,10.08016 -9.1386,9.13865 93.8645,93.86453 z"
              fill="#FFFFFF"
              :stroke="colorArrowNode5SouthEastToNorthWest"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <text
              v-if="node5NorthWestToSouthEastCensusComissioned"
              id="arrow_node5_north_west_to_south_east_number_text"
              xml:space="preserve"
              transform="rotate(45)"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.2628px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 44.2239;
              "
              x="-170.68669"
              y="-1220.1736"
            >
              <tspan
                id="arrow_node5_north_west_to_south_east_number_tspan"
                x="993.59924"
                y="-416"
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
                  stroke-width: 44.2239;
                `"
              >
                {{ zaehlwertArrowNode5NorthWestToSouthEast }}
              </tspan>
            </text>
            <text
              v-if="node5SouthEastToNorthWestCensusComissioned"
              id="arrow_node5_south_east_to_north_west_number_text"
              xml:space="preserve"
              transform="rotate(45)"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.2628px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 44.2239;
              "
              x="-170.68846"
              y="-1272.6682"
            >
              <tspan
                id="arrow_node5_south_east_to_north_west_number_tspan"
                x="993.59674"
                y="-464"
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
                  stroke-width: 44.2239;
                `"
              >
                {{ zaehlwertArrowNode5SouthEastToNorthWest }}
              </tspan>
            </text>
          </g>
        </g>
        <g
          v-if="isKnotenarm(6)"
          id="node6_group"
        >
          <g id="node6">
            <path
              id="node6_spike"
              d="m 749.49747,699.99999 339.12213,339.12201 7.3606,56.8574 -56.8559,-7.3576 -339.12431,-339.12434 z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949; fill: #ececec"
            />
            <text
              v-if="streetnameNode6.length === 1"
              id="node6_strassenname_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              transform="rotate(45)"
              x="1018.9124"
              y="-70.653908"
            >
              <tspan
                id="node6_strassenname_tspan"
                x="1251.2728"
                y="5.7888861"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNode6[0] }}
              </tspan>
            </text>
            <g
              id="node6_number"
              transform="rotate(45,785.75,700)"
            >
              <circle
                id="node6_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 0.597525;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="810.86731"
                cy="760.6344"
                r="11.951238"
              />
              <text
                id="node6_circle_text"
                xml:space="default"
                :style="`
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                `"
                y="1118.2867"
                x="29.266506"
                transform="rotate(-45)"
              >
                <tspan
                  id="node6_circle_tspan"
                  style="stroke-width: 30.9229"
                  x="29.266506"
                  y="1118.2867"
                >
                  6
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNode6.length > 1"
              id="node6_strassenname_multirow2_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              transform="rotate(45)"
              x="1018.9124"
              y="-56.651062"
            >
              <tspan
                id="node6_strassenname_multirow2_tspan"
                x="1251.2728"
                y="19.791727"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNode6[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNode6.length > 1"
              id="node6_strassenname_multirow1_text"
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
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              transform="rotate(45)"
              x="1018.9124"
              y="-84.651779"
            >
              <tspan
                id="node6_strassenname_multirow1_tspan"
                x="1251.2728"
                y="-8.208993"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNode6[0] }}
              </tspan>
            </text>
            <g
              id="node6_sum"
              style="stroke-width: 28.2205; stroke-dasharray: none"
              transform="rotate(135,706.03406,706.03209)"
            >
              <text
                id="node6_sum_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
                x="-1383.7572"
                y="-70.255974"
              >
                <tspan
                  id="node6_sum_tspan"
                  x="-209"
                  y="816"
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
                    stroke-width: 28.2205;
                    stroke-dasharray: none;
                  `"
                >
                  {{ sumNode6Arrows }}
                </tspan>
              </text>
              <path
                id="node6_sum_line"
                style="
                  fill: #000000;
                  stroke: #000000;
                  stroke-width: 3.32425;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                d="M 797.33788,290.49696 795.16212,198.00269"
              />
            </g>
          </g>
          <g
            id="arrows_node6"
            transform="translate(14.564164,6.031585)"
          >
            <path
              v-if="node6SouthWestToNorthEastCensusComissioned"
              id="arrow_node6_south_west_to_north_east"
              d="m 963.94849,1083.6928 93.86451,-93.8645 -9.1386,-9.13865 49.6781,-10.08016 -10.0801,49.67811 -9.1387,-9.1386 -93.86452,93.8645 z"
              fill="#FFFFFF"
              :stroke="colorArrowNode6SouthWestToNorthEast"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <path
              v-if="node6NorthEastToSouthWestCensusComissioned"
              id="arrow_node6_north_east_to_south_west"
              d="m 1068.8925,950.14818 -93.86452,93.86452 9.13865,9.1387 -49.67814,10.0801 10.08016,-49.6781 9.13865,9.1386 93.8645,-93.86451 z"
              fill="#FFFFFF"
              :stroke="colorArrowNode6NorthEastToSouthWest"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <text
              v-if="node6NorthEastToSouthWestCensusComissioned"
              id="arrow_node6_north_east_to_south_west_number_text"
              xml:space="preserve"
              transform="rotate(-45)"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.2628px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 44.2239;
              "
              x="-1172.4175"
              y="644.03931"
            >
              <tspan
                id="arrow_node6_north_east_to_south_west_number_tspan"
                x="-8.1312895"
                y="1420.8754"
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
                  stroke-width: 44.2239;
                `"
              >
                {{ zaehlwertArrowNode6NorthEastToSouthWest }}
              </tspan>
            </text>
            <text
              v-if="node6SouthWestToNorthEastCensusComissioned"
              id="arrow_node6_south_west_to_north_east_number_text"
              xml:space="preserve"
              transform="rotate(-45)"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.2628px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 44.2239;
              "
              x="-1172.6617"
              y="696.29114"
            >
              <tspan
                id="arrow_node6_south_west_to_north_east_number_tspan"
                x="-8.3763189"
                y="1470"
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
                  stroke-width: 44.2239;
                `"
              >
                {{ zaehlwertArrowNode6SouthWestToNorthEast }}
              </tspan>
            </text>
          </g>
        </g>
        <g
          v-if="isKnotenarm(7)"
          id="node7_group"
        >
          <g id="node7">
            <path
              id="node7_spike"
              d="m 699.99994,749.49747 -339.12205,339.12213 -56.85739,7.3606 7.35765,-56.8559 339.12432,-339.12431 z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949; fill: #ececec"
            />
            <text
              v-if="streetnameNode7.length === 1"
              id="node7_strassenname_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              transform="rotate(-45)"
              x="-262.48056"
              y="995.74023"
            >
              <tspan
                id="node7_strassenname_tspan"
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
                  stroke-width: 26.4927;
                `"
                x="-262.48056"
                y="995.74023"
              >
                {{ streetnameNode7[0] }}
              </tspan>
            </text>
            <g id="node7_number">
              <circle
                id="node7_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 0.597525;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="639.36597"
                cy="760.63751"
                r="11.951238"
              />
              <text
                id="node7_circle_text"
                xml:space="default"
                :style="`
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                `"
                y="767.69238"
                x="633.51685"
              >
                <tspan
                  id="node7_circle_tspan"
                  style="stroke-width: 30.9229"
                  x="633.51685"
                  y="767.69238"
                >
                  7
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNode7.length > 1"
              id="node7_strassenname_multirow2_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              transform="rotate(-45)"
              x="-262.48306"
              y="1009.7406"
            >
              <tspan
                id="node7_strassenname_multirow2_tspan"
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
                  stroke-width: 26.4927;
                `"
                x="-262.48306"
                y="1009.7406"
              >
                {{ streetnameNode7[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNode7.length > 1"
              id="node7_strassenname_multirow1_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              transform="rotate(-45)"
              x="-262.48306"
              y="981.73987"
            >
              <tspan
                id="node7_strassenname_multirow1_tspan"
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
                  stroke-width: 26.4927;
                `"
                x="-262.48306"
                y="981.73987"
              >
                {{ streetnameNode7[0] }}
              </tspan>
            </text>
            <g
              id="node7_sum"
              style="stroke-width: 28.2205; stroke-dasharray: none"
              transform="rotate(45,-434.15313,221.6861)"
            >
              <text
                id="node7_sum_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
                x="-1383.7572"
                y="-70.255974"
              >
                <tspan
                  id="node7_sum_tspan"
                  x="-177"
                  y="821"
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
                    stroke-width: 28.2205;
                    stroke-dasharray: none;
                  `"
                >
                  {{ sumNode7Arrows }}
                </tspan>
              </text>
              <path
                id="node7_sum_line"
                style="
                  fill: #000000;
                  stroke: #000000;
                  stroke-width: 3.32425;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                d="M 800.33788,282.49696 800.16212,169.00269"
              />
            </g>
          </g>
          <g
            id="arrows_node7"
            transform="translate(-14.563392,6.0334257)"
          >
            <path
              v-if="node7NorthWestToSouthEastCensusComissioned"
              id="arrow_node7_north_west_to_south_east"
              d="m 318.30769,965.94849 93.86453,93.86451 9.13865,-9.1386 10.08016,49.6781 -49.67814,-10.0801 9.13865,-9.1387 -93.86454,-93.86452 z"
              fill="#FFFFFF"
              :stroke="colorArrowNode7NorthWestToSouthEast"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <path
              v-if="node7SouthEastToNorthWestCensusComissioned"
              id="arrow_node7_south_east_to_north_west"
              d="m 457.85234,1073.8925 -93.86453,-93.8645 -9.13865,9.1386 -10.08016,-49.67811 49.67814,10.08016 -9.13865,9.13865 93.86454,93.8645 z"
              fill="#FFFFFF"
              :stroke="colorArrowNode7SouthEastToNorthWest"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <text
              v-if="node7SouthEastToNorthWestCensusComissioned"
              id="arrow_node7_south_east_to_north_west_number_text"
              xml:space="preserve"
              transform="rotate(45)"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.2628px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 44.2239;
              "
              x="-170.48979"
              y="-345.38342"
            >
              <tspan
                id="arrow_node7_south_east_to_north_west_number_tspan"
                x="993.79614"
                y="428"
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
                  stroke-width: 44.2239;
                `"
              >
                {{ zaehlwertArrowNode7SouthEastToNorthWest }}
              </tspan>
            </text>
            <text
              v-if="node7NorthWestToSouthEastCensusComissioned"
              id="arrow_node7_north_west_to_south_east_number_text"
              xml:space="preserve"
              transform="rotate(45)"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.2628px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 44.2239;
              "
              x="-170.48906"
              y="-292.88657"
            >
              <tspan
                id="arrow_node7_north_west_to_south_east_number_tspan"
                x="993.79614"
                y="480"
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
                  stroke-width: 44.2239;
                `"
              >
                {{ zaehlwertArrowNode7NorthWestToSouthEast }}
              </tspan>
            </text>
          </g>
        </g>
        <g
          v-if="isKnotenarm(8)"
          id="node8_group"
        >
          <g id="node8">
            <path
              id="node8_spike"
              d="M 650.50319,699.99991 311.38115,360.87788 304.0205,304.0205 l 56.85586,7.35764 339.1243,339.1243 z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949; fill: #ececec"
            />
            <text
              v-if="streetnameNode8.length === 1"
              id="node8_strassenname_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              x="727.46826"
              y="5.7913613"
              transform="rotate(45)"
            >
              <tspan
                id="node8_strassenname_tspan"
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
                  stroke-width: 26.4927;
                `"
                x="727.46826"
                y="5.7913613"
              >
                {{ streetnameNode8[0] }}
              </tspan>
            </text>
            <g id="node8_number">
              <circle
                id="node8_circle"
                style="
                  fill: none;
                  fill-opacity: 1;
                  stroke: #000000;
                  stroke-width: 0.597525;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                  paint-order: normal;
                "
                cx="639.36597"
                cy="639.36597"
                r="11.951238"
              />
              <text
                id="node8_circle_text"
                xml:space="default"
                :style="`
                  font-size: ${belastungsplanMethods.maxlineWidth}px;
                  font-family: ${BelastungsplanConstants.fontfamily};
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                `"
                y="646.78491"
                x="633.36969"
              >
                <tspan
                  id="node8_circle_tspan"
                  style="stroke-width: 30.9229"
                  x="633.36969"
                  y="646.78491"
                >
                  8
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNode8.length > 1"
              id="node8_strassenname_multirow2_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              x="727.47076"
              y="19.791721"
              transform="rotate(45)"
            >
              <tspan
                id="node8_strassenname_multirow2_tspan"
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
                  stroke-width: 26.4927;
                `"
                x="727.47076"
                y="19.791721"
              >
                {{ streetnameNode8[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNode8.length > 1"
              id="node8_strassenname_multirow1_text"
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
                writing-mode: rl-tb;
                direction: ltr;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              `"
              x="727.47076"
              y="-8.2089996"
              transform="rotate(45)"
            >
              <tspan
                id="node8_strassenname_multirow1_tspan"
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
                  stroke-width: 26.4927;
                `"
                x="727.47076"
                y="-8.2089996"
              >
                {{ streetnameNode8[0] }}
              </tspan>
            </text>
            <g
              id="node8_sum"
              style="stroke-width: 28.2205; stroke-dasharray: none"
              transform="rotate(135,507.90765,227.71915)"
            >
              <text
                xml:space="preserve"
                transform="rotate(-90)"
                id="node8_sum_text"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 28.2205;
                  stroke-dasharray: none;
                `"
                x="-1383.7572"
                y="-70.255974"
              >
                <tspan
                  id="node8_sum_tspan"
                  x="-175"
                  y="820"
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
                    stroke-width: 28.2205;
                    stroke-dasharray: none;
                  `"
                >
                  {{ sumNode8Arrows }}
                </tspan>
              </text>
              <path
                id="node8_sum_line"
                style="
                  fill: #000000;
                  stroke: #000000;
                  stroke-width: 3.32425;
                  stroke-dasharray: none;
                  stroke-opacity: 1;
                "
                d="M 800.33788,275.49696 798.16212,170.00269"
              />
            </g>
          </g>
          <g
            id="arrows_node8"
            transform="translate(-6.0332912,-14.564242)"
          >
            <path
              v-if="node8SouthWestToNorthEastCensusComissioned"
              id="arrow_node8_south_west_to_north_east"
              d="m 328.108,456.85234 93.86454,-93.86453 -9.13865,-9.13865 49.67814,-10.08016 -10.08016,49.67814 -9.13865,-9.13865 -93.86453,93.86454 z"
              fill="#FFFFFF"
              :stroke="colorArrowNode8SouthWestToNorthEast"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <path
              v-if="node8NorthEastToSouthWestCensusComissioned"
              id="arrow_node8_north_east_to_south_west"
              d="m 436.04853,318.30769 -95.86454,96.86453 9.13865,9.13865 -49.67814,10.08016 10.08016,-49.67814 9.13865,9.13865 93.86453,-93.86454 z"
              fill="#FFFFFF"
              :stroke="colorArrowNode8NorthEastToSouthWest"
              style="stroke-width: 3; stroke-dasharray: none"
            />
            <text
              v-if="node8SouthWestToNorthEastCensusComissioned"
              id="arrow_node8_south_west_to_north_east_number_text"
              xml:space="preserve"
              transform="rotate(-45)"

              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.2628px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 44.2239;
              "
              x="-1171.1313"
              y="-283.24542"
            >
              <tspan
                id="arrow_node8_south_west_to_north_east_number_tspan"
                x="-6.8456869"
                y="578"
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
                  stroke-width: 44.2239;
                `"
              >
                {{ zaehlwertArrowNode8SouthWestToNorthEast }}
              </tspan>
            </text>
            <text
              v-if="node8NorthEastToSouthWestCensusComissioned"
              id="arrow_node8_north_east_to_south_west_number_text"
              xml:space="preserve"
              transform="rotate(-45)"
              fill="#000000"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 28.2628px;
                font-family: Arial;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: middle;
                white-space: pre;
                display: inline;
                fill-opacity: 1;
                stroke-width: 44.2239;
              "
              x="-1172.6158"
              y="-231.24287"
            >
              <tspan
                id="arrow_node8_north_east_to_south_west_number_tspan"
                x="-8.3306265"
                y="525"
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
                  stroke-width: 44.2239;
                `"
              >
                {{ zaehlwertArrowNode8NorthEastToSouthWest }}
              </tspan>
            </text>
          </g>
        </g>
      </g>
      <g id="legend">
        <g
          id="legend-zaehlinfo"
          style="stroke-width: 28.2205; stroke-dasharray: none"
        >
          <text
            id="verkehrsart"
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
            x="56"
            y="1307.6622"
          >
            <tspan
              id="tspan35"
              x="56"
              y="1307.6622"
            >
              <tspan
                id="tspan34"
                style="font-weight: bold"
              >
                {{ optionen.radverkehr ? "RAD" : "FUSS" }}
              </tspan>
            </tspan>
          </text>
          <g
            id="zaehlzeit2"
            style="stroke-width: 28.2205; stroke-dasharray: none"
          >
            <text
              id="zaehlzeit2-multirow"
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
              x="56"
              y="1255.6622"
            >
              <tspan
                id="tspan36"
                x="56"
                y="1255.6622"
              >
                {{ zaehlzeit2 }}
              </tspan>
            </text>
          </g>
          <g
            id="zaehlzeit1"
            style="stroke-width: 28.2205; stroke-dasharray: none"
          >
            <text
              id="zaehlzeit1-multirow"
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
              x="56"
              y="1229.6622"
            >
              <tspan
                id="tspan38"
                x="56"
                y="1229.6622"
              >
                <tspan
                  id="tspan37"
                  style="font-weight: bold"
                >
                  {{ optionen.zeitauswahl }}
                </tspan>
              </tspan>
            </text>
          </g>
        </g>
        <g id="legend-compass">
          <path
            id="compass2"
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
            d="m 93.333333,93.333333 h 27.999997 l -14,-63 z"
          />
          <text
            id="compass1"
            xml:space="default"
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
              fill: ${BelastungsplanConstants.legendColor};
              stroke-width: 2;
            `"
            x="107.33477"
            y="83.332977"
          >
            <tspan
              id="tspan6"
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
                stroke-width: 2;
              `"
            >
              N
            </tspan>
          </text>
        </g>
        <g id="legend-zaehlstelle">
          <g
            id="zaehlstelle2"
            style="stroke-width: 28.2205; stroke-dasharray: none"
          >
            <text
              id="zaehlstelle2-multirow"
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
              x="1107.0699"
              y="84.662277"
            >
              <tspan
                id="tspan39"
                x="1107.0699"
                y="84.662277"
              >
                Stadtbezirk
                {{ zaehlstelleStore.getZaehlstelleHeader.stadtbezirkNummer }}
              </tspan>
              <tspan
                id="tspan40"
                x="1107.0699"
                y="110.83184"
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
          <g
            id="zaehlstelle1"
            style="stroke-width: 28.2205; stroke-dasharray: none"
          >
            <text
              id="zaehlstelle1-multirow"
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
              x="1107.0699"
              y="58.662277"
            >
              <tspan
                id="tspan42"
                x="1107.0699"
                y="58.662277"
              >
                <tspan
                  id="tspan41"
                  style="font-weight: bold"
                >
                  Zählstelle {{ zaehlstelleStore.getZaehlstelleHeader.nummer }}
                </tspan>
              </tspan>
            </text>
          </g>
        </g>
      </g>
      <path
        id="center"
        d="m 14253.004,17465.11 166.703,0 117.876,117.877 0,166.702 -117.876,117.877 -166.703,0 -117.876,-117.877 0,-166.702 z"
        fill="#ececec"
        transform="matrix(0.31493043,0,0,0.31493043,-3814.9546,-4863.6674)"
      />
    </svg>
  </v-sheet>
</template>

<script setup lang="ts">
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type { StartEndeUhrzeitIntervalls } from "@/types/zaehlung/StartEndeUhrzeitIntervalls";
import type LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";
import type { ComputedRef } from "vue";

import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify/framework";

import { BelastungsplanConstants } from "@/components/zaehlstelle/charts/BelastungsplanConstants";
import { useBelastungsplanMethods } from "@/components/zaehlstelle/charts/BelastungsplanMethods";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import { useDateUtils } from "@/util/DateUtils";
import {
  existsQuerungOnKnotenarmInRichtung,
  isQuerungOnKnotenarmInRichtungActive,
} from "@/util/Querungspruefung";
import { useQu } from "@/util/QuUtils";
import { useStrassennameUtils } from "@/util/StrassennameUtils";

interface Props {
  data: LadeBelastungsplanDTO;
  dimension?: string;
}

const props = withDefaults(defineProps<Props>(), {
  dimension: "600vh",
});

const zaehlstelleStore = useZaehlstelleStore();
const display = useDisplay();
const dateUtils = useDateUtils();
const belastungsplanMethods = useBelastungsplanMethods();

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

const qu = useQu();
const strassennameUtils = useStrassennameUtils();

const streetnameNode1 = ref<Array<string>>([]);
const streetnameNode2 = ref<Array<string>>([]);
const streetnameNode3 = ref<Array<string>>([]);
const streetnameNode4 = ref<Array<string>>([]);
const streetnameNode5 = ref<Array<string>>([]);
const streetnameNode6 = ref<Array<string>>([]);
const streetnameNode7 = ref<Array<string>>([]);
const streetnameNode8 = ref<Array<string>>([]);

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const availableKnotenarme = computed(() => {
  return qu.computeAvailableKnotenarme(activeZaehlung.value);
});

// Zaehlwerte of Node1/North
const nodeNumber1 = 1;

const zaehlwertArrowNode1WestToEast = createZaehlwert(150); // TODO: wire real data
const zaehlwertArrowNode1EastToWest = createZaehlwert(850); // TODO: wire real data
const sumNode1Arrows = calculateSum(
  zaehlwertArrowNode1WestToEast.value,
  zaehlwertArrowNode1EastToWest.value
);

const node1WestToEastCensusComissioned = isCommissioned(
  nodeNumber1,
  Himmelsrichtung.O
);
const node1EastToWestCensusComissioned = isCommissioned(
  nodeNumber1,
  Himmelsrichtung.W
);

const colorArrowNode1WestToEast = setColor(nodeNumber1, Himmelsrichtung.O);
const colorArrowNode1EastToWest = setColor(nodeNumber1, Himmelsrichtung.W);

// Zaehlwerte of Node2/East
const nodeNumber2 = 2;

const zaehlwertArrowNode2SouthToNorth = createZaehlwert(250); // TODO: wire real data
const zaehlwertArrowNode2NorthToSouth = createZaehlwert(750); // TODO: wire real data
const sumNode2Arrows = calculateSum(
  zaehlwertArrowNode2SouthToNorth.value,
  zaehlwertArrowNode2NorthToSouth.value
);

const node2NorthToSouthCensusComissioned = isCommissioned(
  nodeNumber2,
  Himmelsrichtung.S
);
const node2SouthToNorthCensusComissioned = isCommissioned(
  nodeNumber2,
  Himmelsrichtung.N
);

const colorArrowNode2NorthToSouth = setColor(nodeNumber2, Himmelsrichtung.S);
const colorArrowNode2SouthToNorth = setColor(nodeNumber2, Himmelsrichtung.N);

// Zaehlwerte of Node3/South
const nodeNumber3 = 3;

const zaehlwertArrowNode3WestToEast = createZaehlwert(350); // TODO: wire real data
const zaehlwertArrowNode3EastToWest = createZaehlwert(650); // TODO: wire real data
const sumNode3Arrows = calculateSum(
  zaehlwertArrowNode3WestToEast.value,
  zaehlwertArrowNode3EastToWest.value
);

const node3WestToEastCensusComissioned = isCommissioned(
  nodeNumber3,
  Himmelsrichtung.O
);
const node3EastToWestCensusComissioned = isCommissioned(
  nodeNumber3,
  Himmelsrichtung.W
);

const colorArrowNode3WestToEast = setColor(nodeNumber3, Himmelsrichtung.O);
const colorArrowNode3EastToWest = setColor(nodeNumber3, Himmelsrichtung.W);

// Zaehlwerte of Node4/West
const nodeNumber4 = 4;

const zaehlwertArrowNode4SouthToNorth = createZaehlwert(450); // TODO: wire real data
const zaehlwertArrowNode4NorthToSouth = createZaehlwert(450); // TODO: wire real data
const sumNode4Arrows = calculateSum(
  zaehlwertArrowNode4SouthToNorth.value,
  zaehlwertArrowNode4NorthToSouth.value
);

const node4NorthToSouthCensusComissioned = isCommissioned(
  nodeNumber4,
  Himmelsrichtung.S
);
const node4SouthToNorthCensusComissioned = isCommissioned(
  nodeNumber4,
  Himmelsrichtung.N
);

const colorArrowNode4NorthToSouth = setColor(nodeNumber4, Himmelsrichtung.S);
const colorArrowNode4SouthToNorth = setColor(nodeNumber4, Himmelsrichtung.N);

// Zaehlwerte of Node5
const nodeNumber5 = 5;

const zaehlwertArrowNode5NorthWestToSouthEast = createZaehlwert(800); // TODO: wire real data
const zaehlwertArrowNode5SouthEastToNorthWest = createZaehlwert(200); // TODO: wire real data
const sumNode5Arrows = calculateSum(
  zaehlwertArrowNode5NorthWestToSouthEast.value,
  zaehlwertArrowNode5SouthEastToNorthWest.value
);

const node5NorthWestToSouthEastCensusComissioned = isCommissioned(
  nodeNumber5,
  Himmelsrichtung.SO
);
const node5SouthEastToNorthWestCensusComissioned = isCommissioned(
  nodeNumber5,
  Himmelsrichtung.NW
);

const colorArrowNode5NorthWestToSouthEast = setColor(
  nodeNumber5,
  Himmelsrichtung.SO
);
const colorArrowNode5SouthEastToNorthWest = setColor(
  nodeNumber5,
  Himmelsrichtung.NW
);

// Zaehlwerte of Node6
const nodeNumber6 = 6;

const zaehlwertArrowNode6NorthEastToSouthWest = createZaehlwert(700); // TODO: wire real data
const zaehlwertArrowNode6SouthWestToNorthEast = createZaehlwert(300); // TODO: wire real data
const sumNode6Arrows = calculateSum(
  zaehlwertArrowNode6NorthEastToSouthWest.value,
  zaehlwertArrowNode6SouthWestToNorthEast.value
);

const node6NorthEastToSouthWestCensusComissioned = isCommissioned(
  nodeNumber6,
  Himmelsrichtung.SW
);
const node6SouthWestToNorthEastCensusComissioned = isCommissioned(
  nodeNumber6,
  Himmelsrichtung.NO
);

const colorArrowNode6NorthEastToSouthWest = setColor(
  nodeNumber6,
  Himmelsrichtung.SW
);
const colorArrowNode6SouthWestToNorthEast = setColor(
  nodeNumber6,
  Himmelsrichtung.NO
);

// Zaehlwerte of Node7
const nodeNumber7 = 7;

const zaehlwertArrowNode7NorthWestToSouthEast = createZaehlwert(600); // TODO: wire real data
const zaehlwertArrowNode7SouthEastToNorthWest = createZaehlwert(400); // TODO: wire real data
const sumNode7Arrows = calculateSum(
  zaehlwertArrowNode7NorthWestToSouthEast.value,
  zaehlwertArrowNode7SouthEastToNorthWest.value
);

const node7NorthWestToSouthEastCensusComissioned = isCommissioned(
  nodeNumber7,
  Himmelsrichtung.SO
);
const node7SouthEastToNorthWestCensusComissioned = isCommissioned(
  nodeNumber7,
  Himmelsrichtung.NW
);

const colorArrowNode7NorthWestToSouthEast = setColor(
  nodeNumber7,
  Himmelsrichtung.SO
);
const colorArrowNode7SouthEastToNorthWest = setColor(
  nodeNumber7,
  Himmelsrichtung.NW
);

// Zaehlwerte of Node8
const nodeNumber8 = 8;

const zaehlwertArrowNode8NorthEastToSouthWest = createZaehlwert(900); // TODO: wire real data
const zaehlwertArrowNode8SouthWestToNorthEast = createZaehlwert(100); // TODO: wire real data
const sumNode8Arrows = calculateSum(
  zaehlwertArrowNode8NorthEastToSouthWest.value,
  zaehlwertArrowNode8SouthWestToNorthEast.value
);

const node8NorthEastToSouthWestCensusComissioned = isCommissioned(
  nodeNumber8,
  Himmelsrichtung.SW
);
const node8SouthWestToNorthEastCensusComissioned = isCommissioned(
  nodeNumber8,
  Himmelsrichtung.NO
);

const colorArrowNode8NorthEastToSouthWest = setColor(
  nodeNumber8,
  Himmelsrichtung.SW
);
const colorArrowNode8SouthWestToNorthEast = setColor(
  nodeNumber8,
  Himmelsrichtung.NO
);

/**
 * Erstellt eine computed Property für einen Wert.
 */
function createZaehlwert(value: number) {
  return computed(() => value);
}

function calculateSum(zaehlwert1: number, zaehlwert2: number) {
  return computed(() => {
    return zaehlwert1 + zaehlwert2;
  });
}

function setColor(knNumber: number, direction: Himmelsrichtung) {
  return computed(() =>
    isKnotenarm(knNumber) &&
    isQuerungOnKnotenarmInRichtungActive(
      optionen.value.chosenQuerungsverkehre,
      knNumber,
      direction
    )
      ? (BelastungsplanConstants.farben.get(knNumber) ??
        BelastungsplanConstants.inaktivColor)
      : BelastungsplanConstants.inaktivColor
  );
}

function isCommissioned(knNumber: number, direction: Himmelsrichtung) {
  return computed(
    () =>
      isKnotenarm(knNumber) &&
      existsQuerungOnKnotenarmInRichtung(
        activeZaehlung.value?.querungsverkehr,
        knNumber,
        direction
      )
  );
}

function setTextColor(arrowColor: ComputedRef<string>) {
  return computed(() =>
    arrowColor.value === BelastungsplanConstants.inaktivColor
      ? "#000000"
      : "#ffffff"
  );
}

/**
 * Prüft, ob ein Knotenarm mit der gegebenen Nummer existiert.
 * @param {number} knNummer - Die Nummer des Knotenarms, nach der gesucht werden soll.
 * @returns {boolean} - True, wenn ein Eintrag gefunden wurde, sonst false.
 */
function isKnotenarm(knNummer: number) {
  return availableKnotenarme.value.some((kn) => kn.nummer === knNummer);
}

const optionen = computed<ZaehlstelleOptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});

const emits = defineEmits<{
  (e: "print", v: Blob): void;
}>();

const svgRef = ref<SVGSVGElement | null>(null);

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

function setStreetnameNodes() {
  streetnameNode1.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 1)
  );
  streetnameNode2.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 2)
  );
  streetnameNode3.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 3)
  );
  streetnameNode4.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 4)
  );
  streetnameNode5.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 5)
  );
  streetnameNode6.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 6)
  );
  streetnameNode7.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 7)
  );
  streetnameNode8.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 8)
  );
}

onMounted(() => {
  setStreetnameNodes();
  zaehlstelleStore.setSizeBelastungsplanSvg(
    Number.parseInt(sizeBelastungsplan.value.replace("px", ""))
  );
  zaehlstelleStore.setMaxSizeBelastungsplanSvg(maxSizeBelastungsplan.value);
  zaehlstelleStore.setMinSizeBelastungsplanSvg(minSizeBelastungsplan.value);
});

watch(
  [
    () => props.data,
    () => optionen.value.chosenQuerungsverkehre,
    () => activeZaehlung.value.knotenarme,
  ],
  async () => {
    setStreetnameNodes();
    await nextTick();

    emitSvgAsBlob();
  }
);
</script>

<style scoped lang="css"></style>
