<template>
  <v-sheet id="belastungsplan-zaehlung-fjs">
    <svg
      id="svg1"
      ref="svgRef"
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
              id="tspan13"
              x="56"
              y="1307.6622"
            >
              <tspan
                id="tspan12"
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
                id="tspan18"
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
                id="tspan20"
                x="56"
                y="1229.6622"
              >
                <tspan
                  id="tspan19"
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
              id="tspan6-1"
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
              v-if="zaehlstelleStore.getZaehlstelleHeader.stadtbezirkNummer"
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
                id="tspan21"
                x="1107.0699"
                y="84.662277"
              >
                Stadtbezirk
                {{ zaehlstelleStore.getZaehlstelleHeader.stadtbezirkNummer }}
              </tspan>
              <tspan
                id="tspan22"
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
                id="tspan24"
                x="1107.0699"
                y="58.662277"
              >
                <tspan
                  id="tspan23"
                  style="font-weight: bold"
                >
                  Zählstelle {{ zaehlstelleStore.getZaehlstelleHeader.nummer }}
                </tspan>
              </tspan>
            </text>
          </g>
        </g>
      </g>
      <g
        id="knotenarme_1_to_4"
        class="Page"
      >
        <g
          v-if="availableKnotenarmNummern.includes(1)"
          id="knotenarm1_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="knotenarm1">
            <path
              id="knotenarm1_spike"
              d="M 664.99999,665 V 185.409 L 699.99947,140 734.99999,185.4058 V 665 Z"
              fill="#ececec"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <g id="knotenarm1_number">
              <circle
                id="knotenarm1_number_circle"
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
                id="knotenarm1_number_text"
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
                y="622.00684"
                x="693.53955"
              >
                <tspan
                  id="knotenarm1_number_tspan"
                  style="stroke-width: 30.9229"
                  x="693.53955"
                  y="622.00684"
                >
                  1
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNodeOne.length === 1"
              id="knotenarm1_strassenname_text"
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
              transform="rotate(-90)"
              x="-671.03851"
              y="629.34802"
            >
              <tspan
                id="knotenarm1_strassenname_tspan"
                x="-438.67819"
                y="705.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeOne[0] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeOne.length > 1"
              id="knotenarm1_strassenname_multirow2_text"
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
              transform="rotate(-90)"
              x="-671.03851"
              y="643.34802"
            >
              <tspan
                id="knotenarm1_strassenname_multirow2_tspan"
                x="-438.67819"
                y="719.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeOne[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeOne.length > 1"
              id="knotenarm1_strassenname_multirow1_text"
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
              transform="rotate(-90)"
              x="-671.03851"
              y="615.34802"
            >
              <tspan
                id="knotenarm1_strassenname_multirow1_tspan"
                x="-438.67819"
                y="691.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeOne[0] }}
              </tspan>
            </text>
            <text
              id="knotenarm1_sum_text"
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
                stroke-width: 43.9645;
              `"
              x="-1188.4197"
              y="-79.837906"
            >
              <tspan
                id="knotenarm1_sum_tspan"
                x="-30.963991"
                y="708.34723"
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
                  stroke-width: 43.9645;
                `"
              >
                {{ sumNodeOneArrows }}
              </tspan>
            </text>
          </g>
          <g id="arrows_knotenarm1">
            <g id="arrows_knotenarm1_west">
              <path
                v-if="arrowNodeOneWestOutgoingAvailable"
                id="arrow_knotenarm1_west_ausgehend"
                d="M 627.50029,395.409 V 220.40855 H 619.5 L 633.49931,185.409 647.5,220.40855 h -7.99962 V 395.409 Z"
                :fill="colorArrowNodeOneWestOutgoing"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <path
                v-if="arrowNodeOneWestIncomingAvailable"
                id="arrow_knotenarm1_west_eingehend"
                d="m 606.25,185.409 v 175.00052 h 8 L 600.25072,395.409 586.25,360.40952 h 8 V 185.409 Z"
                :fill="colorArrowNodeOneWestIncoming"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <text
                v-if="arrowNodeOneWestIncomingAvailable"
                id="arrow_knotenarm1_west_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1188.8622"
                y="-181.45634"
              >
                <tspan
                  id="arrow_knotenarm1_west_eingehend_zaehlwert_tspan"
                  x="-31.834871"
                  y="606.43726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeOneWestIncoming }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeOneWestOutgoingAvailable"
                id="arrow_knotenarm1_west_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1188.8622"
                y="-148.20622"
              >
                <tspan
                  id="arrow_knotenarm1_west_ausgehend_zaehlwert_tspan"
                  x="-31.834871"
                  y="639.68726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeOneWestOutgoing }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeOneWestIncomingAvailable ||
                  arrowNodeOneWestOutgoingAvailable
                "
                id="arrows_knotenarm1_west_sum_text"
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
                  stroke-width: 43.9644;
                `"
                x="-1188.4188"
                y="-116.99011"
              >
                <tspan
                  id="arrows_knotenarm1_west_sum_tspan"
                  x="-30.963991"
                  y="671.1947"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeOneWest }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeOneWestIncomingAvailable ||
                  arrowNodeOneWestOutgoingAvailable
                "
                id="arrows_knotenarm1_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 644.2975,129.9655 v -98 h 2.45 v 98 z"
              />
            </g>
            <g id="arrows_knotenarm1_ost">
              <path
                v-if="arrowNodeOneEastOutgoingAvailable"
                id="arrow_knotenarm1_ost_ausgehend"
                d="M 793.75028,395.409 V 220.40855 h -8.00029 l 13.99931,-34.99955 14.00069,34.99955 h -7.99962 V 395.409 Z"
                :fill="colorArrowNodeOneEastOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeOneEastIncomingAvailable"
                id="arrow_knotenarm1_ost_eingehend"
                d="m 772.49999,185.409 v 175.00052 h 8 L 766.50071,395.409 752.49999,360.40952 h 8 V 185.409 Z"
                :fill="colorArrowNodeOneEastIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeOneEastIncomingAvailable"
                id="arrow_knotenarm1_ost_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1188.8622"
                y="-15.206282"
              >
                <tspan
                  id="arrow_knotenarm1_ost_eingehend_zaehlwert_tspan"
                  x="-31.834871"
                  y="772.68726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeOneEastIncoming }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeOneEastOutgoingAvailable"
                id="arrow_knotenarm1_ost_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1188.8622"
                y="18.043777"
              >
                <tspan
                  id="arrow_knotenarm1_ost_ausgehend_zaehlwert_tspan"
                  x="-31.834871"
                  y="805.93726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeOneEastOutgoing }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeOneEastIncomingAvailable ||
                  arrowNodeOneEastOutgoingAvailable
                "
                id="arrows_knotenarm1_ost_sum_text"
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
                  stroke-width: 43.9644;
                `"
                x="-1188.4188"
                y="49.25988"
              >
                <tspan
                  id="arrows_knotenarm1_ost_sum_tspan"
                  x="-30.963991"
                  y="837.4447"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeOneEast }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeOneEastIncomingAvailable ||
                  arrowNodeOneEastOutgoingAvailable
                "
                id="arrows_knotenarm1_ost_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 810.54749,129.9655 v -98 h 2.45 v 98 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(2)"
          id="knotenarm2_group"
        >
          <g id="knotenarm2">
            <path
              id="knotenarm2_spike"
              d="M 734.99999,664.99999 H 1214.591 l 45.409,34.99948 -45.4058,35.00052 H 734.99999 Z"
              fill="#ececec"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeTwo.length === 1"
              id="knotenarm2_strassenname_text"
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
              x="728.96271"
              y="629.34802"
            >
              <tspan
                id="knotenarm2_strassenname_tspan"
                x="961.323"
                y="705.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeTwo[0] }}
              </tspan>
            </text>
            <g id="knotenarm2_number">
              <circle
                id="knotenarm2_number_circle"
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
                id="knotenarm2_number_text"
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
                y="707.33368"
                x="779.30457"
              >
                <tspan
                  id="knotenarm2_number_tspan"
                  style="stroke-width: 30.9229"
                  x="779.30457"
                  y="707.33368"
                >
                  2
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNodeTwo.length > 1"
              id="knotenarm2_strassenname_multirow2_text"
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
              x="728.96271"
              y="643.34802"
            >
              <tspan
                id="knotenarm2_strassenname_multirow2_tspan"
                x="961.323"
                y="719.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeTwo[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeTwo.length > 1"
              id="knotenarm2_strassenname_multirow1_text"
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
              x="728.96271"
              y="615.34802"
            >
              <tspan
                id="knotenarm2_strassenname_multirow1_tspan"
                x="961.323"
                y="691.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeTwo[0] }}
              </tspan>
            </text>
            <text
              id="knotenarm2_sum_text"
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
                writing-mode: rl-tb;
                direction: rtl;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 43.9645;
              `"
              x="211.57898"
              y="-79.830925"
            >
              <tspan
                id="knotenarm2_sum_tspan"
                x="1369.0348"
                y="708.35419"
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
                  stroke-width: 43.9645;
                `"
              >
                {{ sumNodeTwoArrows }}
              </tspan>
            </text>
          </g>
          <g id="arrows_knotenarm2">
            <g id="arrows_knotenarm2_nord">
              <path
                v-if="arrowNodeTwoNorthIncomingAvailable"
                id="arrow_knotenarm2_nord_eingehend"
                d="m 1214.591,606.25 h -175.0005 v 8 L 1004.591,600.25072 1039.5905,586.25 v 8 h 175.0005 z"
                :fill="colorArrowNodeTwoNorthIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeTwoNorthOutgoingAvailable"
                id="arrow_knotenarm2_nord_ausgehend"
                d="m 1004.591,627.5 h 175.0005 v -8 l 34.9995,13.9993 -34.9995,14.0007 v -8 H 1004.591 Z"
                :fill="colorArrowNodeTwoNorthOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeTwoNorthIncomingAvailable"
                id="arrow_knotenarm2_nord_eingehend_zaehlwert_text"
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
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="211.13699"
                y="-181.45631"
              >
                <tspan
                  id="arrow_knotenarm2_nord_eingehend_zaehlwert_tspan"
                  x="1368.1643"
                  y="606.43726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeTwoNorthIncoming }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeTwoNorthOutgoingAvailable"
                id="arrow_knotenarm2_nord_ausgehend_zaehlwert_text"
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
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="211.13699"
                y="-148.2063"
              >
                <tspan
                  id="arrow_knotenarm2_nord_ausgehend_zaehlwert_tspan"
                  x="1368.1643"
                  y="639.68726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeTwoNorthOutgoing }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeTwoNorthIncomingAvailable ||
                  arrowNodeTwoNorthOutgoingAvailable
                "
                id="arrows_knotenarm2_nord_sum_text"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9644;
                `"
                x="211.58005"
                y="-116.99011"
              >
                <tspan
                  id="arrows_knotenarm2_nord_sum_tspan"
                  x="1369.0348"
                  y="671.1947"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeTwoNorth }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeTwoNorthIncomingAvailable ||
                  arrowNodeTwoNorthOutgoingAvailable
                "
                id="arrows_knotenarm2_nord_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8774"
                d="m 1270.0345,644.2975 h 98 v 2.45 h -98 z"
              />
            </g>
            <g id="arrows_knotenarm2_sued">
              <path
                v-if="arrowNodeTwoSouthIncomingAvailable"
                id="arrow_knotenarm2_sued_eingehend"
                d="m 1214.591,772.49999 h -175.0005 v 8 l -34.9995,-13.99928 34.9995,-14.00072 v 8 h 175.0005 z"
                :fill="colorArrowNodeTwoSouthIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeTwoSouthOutgoingAvailable"
                id="arrow_knotenarm2_sued_ausgehend"
                d="m 1004.591,793.74999 h 175.0005 v -8 l 34.9995,13.9993 -34.9995,14.0007 v -8 H 1004.591 Z"
                :fill="colorArrowNodeTwoSouthOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeTwoSouthIncomingAvailable"
                id="arrow_knotenarm2_sued_eingehend_zaehlwert_text"
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
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="211.13699"
                y="-15.206279"
              >
                <tspan
                  id="arrow_knotenarm2_sued_eingehend_zaehlwert_tspan"
                  x="1368.1643"
                  y="772.68726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeTwoSouthIncoming }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeTwoSouthOutgoingAvailable"
                id="arrow_knotenarm2_sued_ausgehend_zaehlwert_text"
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
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="211.13696"
                y="18.043781"
              >
                <tspan
                  id="arrow_knotenarm2_sued_ausgehend_zaehlwert_tspan"
                  x="1368.1643"
                  y="805.93726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeTwoSouthOutgoing }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeTwoSouthIncomingAvailable ||
                  arrowNodeTwoSouthOutgoingAvailable
                "
                id="arrows_knotenarm2_sued_sum_text"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9644;
                `"
                x="211.57996"
                y="49.259895"
              >
                <tspan
                  id="arrows_knotenarm2_sued_sum_tspan"
                  x="1369.0348"
                  y="837.4447"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeTwoSouth }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeTwoSouthIncomingAvailable ||
                  arrowNodeTwoSouthOutgoingAvailable
                "
                id="arrows_knotenarm2_sued_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 1270.0345,810.54749 h 98 v 2.45 h -98 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(3)"
          id="knotenarm3_group"
        >
          <g id="knotenarm3">
            <path
              id="knotenarm3_spike"
              d="M 734.99999,734.99999 V 1214.591 L 700.00051,1260 664.99999,1214.5942 V 734.99999 Z"
              fill="#ececec"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeThree.length === 1"
              id="knotenarm3_strassenname_text"
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
              transform="rotate(-90)"
              x="-962.48126"
              y="705.79083"
            >
              <tspan
                id="knotenarm3_strassenname_tspan"
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
                x="-962.48126"
                y="705.79083"
              >
                {{ streetnameNodeThree[0] }}
              </tspan>
            </text>
            <g id="knotenarm3_number">
              <circle
                id="knotenarm3_number_circle"
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
                id="knotenarm3_number_text"
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
                y="792.38141"
                x="693.75189"
              >
                <tspan
                  id="knotenarm3_number_tspan"
                  style="stroke-width: 30.9229"
                  x="693.75189"
                  y="792.38141"
                >
                  3
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNodeThree.length > 1"
              id="knotenarm3_strassenname_multirow2_text"
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
              transform="rotate(-90)"
              x="-962.48126"
              y="719.79083"
            >
              <tspan
                id="knotenarm3_strassenname_multirow2_tspan"
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
                x="-962.48126"
                y="719.79083"
              >
                {{ streetnameNodeThree[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeThree.length > 1"
              id="knotenarm3_strassenname_multirow1_text"
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
              transform="rotate(-90)"
              x="-962.48126"
              y="691.79083"
            >
              <tspan
                id="knotenarm3_strassenname_multirow1_tspan"
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
                x="-962.48126"
                y="691.79083"
              >
                {{ streetnameNodeThree[0] }}
              </tspan>
            </text>
            <text
              id="knotenarm3_sum_text"
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
                stroke-width: 43.9645;
              `"
              x="-2433.9543"
              y="-79.837982"
            >
              <tspan
                id="knotenarm3_sum_tspan"
                x="-1276.4985"
                y="708.34723"
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
                  stroke-width: 43.9645;
                `"
              >
                {{ sumNodeThreeArrows }}
              </tspan>
            </text>
          </g>
          <g id="arrows_knotenarm3">
            <g id="arrows_knotenarm3_ost">
              <path
                v-if="arrowNodeThreeEastIncomingAvailable"
                id="arrow_knotenarm3_ost_eingehend"
                d="m 793.75028,1214.591 v -175.0005 h -8.00029 l 13.99931,-34.9995 14.00069,34.9995 h -7.99962 v 175.0005 z"
                :fill="colorArrowNodeThreeEastIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeThreeEastOutgoingAvailable"
                id="arrow_knotenarm3_ost_ausgehend"
                d="m 772.49999,1004.591 v 175.0005 h 8 l -13.99928,34.9995 -14.00072,-34.9995 h 8 V 1004.591 Z"
                :fill="colorArrowNodeThreeEastOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeThreeEastOutgoingAvailable"
                id="arrow_knotenarm3_ost_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-2433.238"
                y="-15.206213"
              >
                <tspan
                  id="arrow_knotenarm3_ost_ausgehend_zaehlwert_tspan"
                  x="-1276.2108"
                  y="772.68726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeThreeEastOutgoing }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeThreeEastIncomingAvailable"
                id="arrow_knotenarm3_ost_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-2433.238"
                y="18.043785"
              >
                <tspan
                  id="arrow_knotenarm3_ost_eingehend_zaehlwert_tspan"
                  x="-1276.2108"
                  y="805.93726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeThreeEastIncoming }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeThreeEastIncomingAvailable ||
                  arrowNodeThreeEastOutgoingAvailable
                "
                id="arrows_knotenarm3_ost_sum_text"
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
                  stroke-width: 43.9644;
                `"
                x="-2433.9534"
                y="49.259911"
              >
                <tspan
                  id="arrows_knotenarm3_ost_sum_tspan"
                  x="-1276.4985"
                  y="837.4447"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeThreeEast }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeThreeEastIncomingAvailable ||
                  arrowNodeThreeEastOutgoingAvailable
                "
                id="arrows_knotenarm3_ost_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 810.54749,1375.5 v -98 h 2.45 v 98 z"
              />
            </g>
            <g id="arrows_knotenarm3_west">
              <path
                v-if="arrowNodeThreeWestIncomingAvailable"
                id="arrow_knotenarm3_west_eingehend"
                d="M 627.50029,1214.591 V 1039.5905 H 619.5 l 13.99931,-34.9995 14.00069,34.9995 h -7.99962 v 175.0005 z"
                :fill="colorArrowNodeThreeWestIncoming"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <path
                v-if="arrowNodeThreeWestOutgoingAvailable"
                id="arrow_knotenarm3_west_ausgehend"
                d="m 606.25,1004.591 v 175.0005 h 8 L 600.25072,1214.591 586.25,1179.5915 h 8 V 1004.591 Z"
                :fill="colorArrowNodeThreeWestOutgoing"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <text
                v-if="arrowNodeThreeWestOutgoingAvailable"
                id="arrow_knotenarm3_west_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-2433.2383"
                y="-181.45621"
              >
                <tspan
                  id="arrow_knotenarm3_west_ausgehend_zaehlwert_tspan"
                  x="-1276.2108"
                  y="606.43726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeThreeWestOutgoing }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeThreeWestIncomingAvailable"
                id="arrow_knotenarm3_west_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-90)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-2433.2383"
                y="-148.20621"
              >
                <tspan
                  id="arrow_knotenarm3_west_eingehend_zaehlwert_tspan"
                  x="-1276.2108"
                  y="639.68726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeThreeWestIncoming }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeThreeWestIncomingAvailable ||
                  arrowNodeThreeWestOutgoingAvailable
                "
                id="arrows_knotenarm3_west_sum_text"
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
                  stroke-width: 43.9644;
                `"
                x="-2433.9534"
                y="-116.99008"
              >
                <tspan
                  id="arrows_knotenarm3_west_sum_tspan"
                  x="-1276.4985"
                  y="671.1947"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeThreeWest }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeThreeWestIncomingAvailable ||
                  arrowNodeThreeWestOutgoingAvailable
                "
                id="arrows_knotenarm3_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 644.2975,1375.5 v -98 h 2.45 v 98 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(4)"
          id="knotenarm4_group"
        >
          <g id="knotenarm4">
            <path
              id="knotenarm4_spike"
              d="M 664.99998,734.99999 H 185.409 L 140,700.00052 185.4058,664.99999 h 479.59418 z"
              fill="#ececec"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeFour.length === 1"
              id="knotenarm4_strassenname_text"
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
              x="437.52008"
              y="705.79083"
            >
              <tspan
                id="knotenarm4_strassenname_tspan"
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
                x="437.52008"
                y="705.79083"
              >
                {{ streetnameNodeFour[0] }}
              </tspan>
            </text>
            <g id="knotenarm4_number">
              <circle
                id="knotenarm4_number_circle"
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
                id="knotenarm4_number_text"
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
                y="707.20343"
                x="608.34302"
              >
                <tspan
                  id="knotenarm4_number_tspan"
                  style="stroke-width: 30.9229"
                  x="608.34302"
                  y="707.20343"
                >
                  4
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNodeFour.length > 1"
              id="knotenarm4_strassenname_multirow2_text"
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
              x="437.52008"
              y="719.79083"
            >
              <tspan
                id="knotenarm4_strassenname_multirow2_tspan"
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
                x="437.52008"
                y="719.79083"
              >
                {{ streetnameNodeFour[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeFour.length > 1"
              id="knotenarm4_strassenname_multirow1_text"
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
              x="437.52008"
              y="691.79083"
            >
              <tspan
                id="knotenarm4_strassenname_multirow1_tspan"
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
                x="437.52008"
                y="691.79083"
              >
                {{ streetnameNodeFour[0] }}
              </tspan>
            </text>
            <text
              id="knotenarm4_sum_text"
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
                writing-mode: rl-tb;
                direction: rtl;
                white-space: pre;
                display: inline;
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 43.9644;
              `"
              x="-1033.9545"
              y="-79.830223"
            >
              <tspan
                x="123.50026"
                y="708.35419"
                id="knotenarm4_sum_tspan"
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
                  stroke-width: 43.9644;
                `"
              >
                {{ sumNodeFourArrows }}
              </tspan>
            </text>
          </g>
          <g id="arrows_knotenarm4">
            <g id="arrows_knotenarm4_sued">
              <path
                v-if="arrowNodeFourSouthOutgoingAvailable"
                id="arrow_knotenarm4_sued_ausgehend"
                d="M 395.409,772.49999 H 220.4085 v 8 l -34.9995,-13.99928 34.9995,-14.00072 v 8 H 395.409 Z"
                :fill="colorArrowNodeFourSouthOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeFourSouthIncomingAvailable"
                id="arrow_knotenarm4_sued_eingehend"
                d="m 185.409,793.74999 h 175.0005 v -8 l 34.9995,13.9993 -34.9995,14.0007 v -8 H 185.409 Z"
                :fill="colorArrowNodeFourSouthIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeFourSouthOutgoingAvailable"
                id="arrow_knotenarm4_sued_ausgehend_zaehlwert_text"
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
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1033.239"
                y="-15.206355"
              >
                <tspan
                  id="arrow_knotenarm4_sued_ausgehend_zaehlwert_tspan"
                  x="123.78831"
                  y="772.68726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeFourSouthOutgoing }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeFourSouthIncomingAvailable"
                id="arrow_knotenarm4_sued_eingehend_zaehlwert_text"
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
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1033.239"
                y="18.043804"
              >
                <tspan
                  id="arrow_knotenarm4_sued_eingehend_zaehlwert_tspan"
                  x="123.78831"
                  y="805.93726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeFourSouthIncoming }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeFourSouthIncomingAvailable ||
                  arrowNodeFourSouthOutgoingAvailable
                "
                id="arrows_knotenarm4_sued_sum_text"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9644;
                `"
                x="-1033.9545"
                y="49.259884"
              >
                <tspan
                  id="arrows_knotenarm4_sued_sum_tspan"
                  x="123.50026"
                  y="837.4447"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeFourSouth }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeFourSouthIncomingAvailable ||
                  arrowNodeFourSouthOutgoingAvailable
                "
                id="arrows_knotenarm4_sued_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 24.5,810.54749 h 98 v 2.45 h -98 z"
              />
            </g>
            <g id="arrows_knotenarm4_nord">
              <path
                v-if="arrowNodeFourNorthOutgoingAvailable"
                id="arrow_knotenarm4_nord_ausgehend"
                d="M 395.409,606.25 H 220.4085 v 8 L 185.409,600.25072 220.4085,586.25 v 8 H 395.409 Z"
                :fill="colorArrowNodeFourNorthOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeFourNorthIncomingAvailable"
                id="arrow_knotenarm4_nord_eingehend"
                d="m 185.409,627.5 h 175.0005 v -8 L 395.409,633.4993 360.4095,647.5 v -8 H 185.409 Z"
                :fill="colorArrowNodeFourNorthIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeFourNorthOutgoingAvailable"
                id="arrow_knotenarm4_nord_ausgehend_zaehlwert_text"
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
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1033.239"
                y="-181.45634"
              >
                <tspan
                  id="arrow_knotenarm4_nord_ausgehend_zaehlwert_tspan"
                  x="123.78831"
                  y="606.43726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeFourNorthOutgoing }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeFourNorthIncomingAvailable"
                id="arrow_knotenarm4_nord_eingehend_zaehlwert_text"
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
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1033.239"
                y="-148.20619"
              >
                <tspan
                  id="arrow_knotenarm4_nord_eingehend_zaehlwert_tspan"
                  x="123.78831"
                  y="639.68726"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeFourNorthIncoming }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeFourNorthIncomingAvailable ||
                  arrowNodeFourNorthOutgoingAvailable
                "
                id="arrows_knotenarm4_nord_sum_text"
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
                  writing-mode: rl-tb;
                  direction: rtl;
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9644;
                `"
                x="-1033.9545"
                y="-116.99019"
              >
                <tspan
                  id="arrows_knotenarm4_nord_sum_tspan"
                  x="123.50026"
                  y="671.1947"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeFourNorth }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeFourNorthIncomingAvailable ||
                  arrowNodeFourNorthOutgoingAvailable
                "
                id="arrows_knotenarm4_nord_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 24.5,644.2975 h 98 v 2.45 h -98 z"
              />
            </g>
          </g>
        </g>
      </g>
      <g id="knotenarme_5_to_8">
        <g
          v-if="availableKnotenarmNummern.includes(5)"
          id="knotenarm5_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="knotenarm5">
            <path
              id="knotenarm5_spike"
              d="m 699.99999,650.50319 339.12201,-339.12205 56.8574,-7.36064 -7.3576,56.85586 -339.12433,339.12431 z"
              fill="#ececec"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <g id="knotenarm5_number">
              <circle
                id="knotenarm5_number_circle"
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
                id="knotenarm5_number_text"
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
                  id="knotenarm5_number_tspan"
                  style="stroke-width: 30.9229"
                  x="754.23737"
                  y="646.03784"
                >
                  5
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNodeFive.length === 1"
              id="knotenarm5_strassenname_text"
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
              x="28.961178"
              y="919.29749"
            >
              <tspan
                id="knotenarm5_strassenname_tspan"
                x="261.3215"
                y="995.74023"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeFive[0] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeFive.length > 1"
              id="knotenarm5_strassenname_multirow2_text"
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
                id="knotenarm5_strassenname_multirow2_tspan"
                x="261.32397"
                y="1009.7406"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeFive[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeFive.length > 1"
              id="knotenarm5_strassenname_multirow1_text"
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
              y="905.2995"
            >
              <tspan
                id="knotenarm5_strassenname_multirow1_tspan"
                x="261.3215"
                y="981.74231"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeFive[0] }}
              </tspan>
            </text>
            <text
              id="knotenarm5_sum_text"
              xml:space="preserve"
              transform="rotate(-45)"
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
                stroke-width: 43.9645;
              `"
              x="-483.45068"
              y="211.86259"
            >
              <tspan
                id="knotenarm5_sum_tspan"
                x="674.005"
                y="1000.0479"
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
                  stroke-width: 43.9645;
                `"
              >
                {{ sumNodeFiveArrows }}
              </tspan>
            </text>
          </g>
          <g id="arrows_knotenarm5">
            <g id="arrows_knotenarm5_nord_west">
              <path
                v-if="arrowNodeFiveNorthWestOutgoingAvailable"
                id="arrow_knotenarm5_nord_west_ausgehend"
                d="M 864.11499,433.35748 987.859,309.61347 l -5.65706,-5.65706 34.64746,-14.84941 -14.8485,34.6484 -5.65656,-5.65658 -123.744,123.744 z"
                :fill="colorArrowNodeFiveNorthWestOutgoing"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <path
                v-if="arrowNodeFiveNorthWestIncomingAvailable"
                id="arrow_knotenarm5_nord_west_eingehend"
                d="m 997.57854,269.83728 -123.74405,123.74405 5.65685,5.65686 -34.64735,14.84938 14.84836,-34.64837 5.65686,5.65685 L 989.09326,261.352 Z"
                :fill="colorArrowNodeFiveNorthWestIncoming"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <text
                v-if="arrowNodeFiveNorthWestIncomingAvailable"
                id="arrow_knotenarm5_nord_west_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-482.82623"
                y="110.15491"
              >
                <tspan
                  id="arrow_knotenarm5_nord_west_eingehend_zaehlwert_tspan"
                  x="674.20111"
                  y="898.04852"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeFiveNorthWestIncoming }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeFiveNorthWestOutgoingAvailable"
                id="arrow_knotenarm5_nord_west_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-482.82864"
                y="143.40495"
              >
                <tspan
                  id="arrow_knotenarm5_nord_west_ausgehend_zaehlwert_tspan"
                  x="674.19867"
                  y="931.2984"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeFiveNorthWestOutgoing }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeFiveNorthWestIncomingAvailable ||
                  arrowNodeFiveNorthWestOutgoingAvailable
                "
                id="arrows_knotenarm5_nord_west_sum_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  stroke-width: 43.9644;
                `"
                x="-483.45218"
                y="174.71283"
              >
                <tspan
                  id="arrows_knotenarm5_nord_west_sum_tspan"
                  x="674.00256"
                  y="962.89758"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeFiveNorthWest }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeFiveNorthWestIncomingAvailable ||
                  arrowNodeFiveNorthWestOutgoingAvailable
                "
                id="arrows_knotenarm5_nord_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 1068.347,256.29097 69.2965,-69.29647 1.7324,1.73241 -69.2965,69.29647 z"
              />
            </g>
            <g id="arrows_knotenarm5_sued_ost">
              <path
                v-if="arrowNodeFiveSouthEastOutgoingAvailable"
                id="arrow_knotenarm5_sued_ost_ausgehend"
                d="m 981.66949,550.91198 123.74401,-123.74401 -5.6571,-5.65706 34.6475,-14.84941 -14.8485,34.6484 -5.6566,-5.65658 -123.74396,123.744 z"
                :fill="colorArrowNodeFiveSouthEastOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeFiveSouthEastIncomingAvailable"
                id="arrow_knotenarm5_sued_ost_eingehend"
                d="m 1115.1365,387.39528 -123.74401,123.74405 5.65685,5.65686 -34.64735,14.84938 14.84836,-34.64837 5.65686,5.65685 L 1106.6513,378.91 Z"
                :fill="colorArrowNodeFiveSouthEastIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeFiveSouthEastIncomingAvailable"
                id="arrow_knotenarm5_sued_ost_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-482.82867"
                y="276.40448"
              >
                <tspan
                  id="arrow_knotenarm5_sued_ost_eingehend_zaehlwert_tspan"
                  x="674.19867"
                  y="1064.2981"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeFiveSouthEastIncoming }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeFiveSouthEastOutgoingAvailable"
                id="arrow_knotenarm5_sued_ost_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-482.82614"
                y="309.65457"
              >
                <tspan
                  id="arrow_knotenarm5_sued_ost_ausgehend_zaehlwert_tspan"
                  x="674.20111"
                  y="1097.5481"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeFiveSouthEastOutgoing }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeFiveSouthEastIncomingAvailable ||
                  arrowNodeFiveSouthEastOutgoingAvailable
                "
                id="arrows_knotenarm5_sued_ost_sum_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  stroke-width: 43.9644;
                `"
                x="-483.44965"
                y="340.96234"
              >
                <tspan
                  id="arrows_knotenarm5_sued_ost_sum_tspan"
                  x="674.00494"
                  y="1129.1472"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeFiveSouthEast }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeFiveSouthEastIncomingAvailable ||
                  arrowNodeFiveSouthEastOutgoingAvailable
                "
                id="arrows_knotenarm5_sued_ost_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 1185.9015,373.84547 69.2965,-69.29647 1.7324,1.73241 -69.2965,69.29647 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(6)"
          id="knotenarm6_group"
        >
          <g id="knotenarm6">
            <path
              id="knotenarm6_spike"
              d="m 749.49747,699.99999 339.12213,339.12201 7.3606,56.8574 -56.8559,-7.3576 -339.12431,-339.12434 z"
              fill="#ececec"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeSix.length === 1"
              id="knotenarm6_strassenname_text"
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
                id="knotenarm6_strassenname_tspan"
                x="1251.2728"
                y="5.7888861"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeSix[0] }}
              </tspan>
            </text>
            <g
              id="knotenarm6_number"
              transform="rotate(45,785.75,700)"
            >
              <circle
                id="knotenarm6_number_circle"
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
                id="knotenarm6_number_text"
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
                  id="knotenarm6_number_tspan"
                  style="stroke-width: 30.9229"
                  x="29.266506"
                  y="1118.2867"
                >
                  6
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNodeSix.length > 1"
              id="knotenarm6_strassenname_multirow2_text"
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
              y="-56.65107"
            >
              <tspan
                id="knotenarm6_strassenname_multirow2_tspan"
                x="1251.2728"
                y="19.791721"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeSix[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeSix.length > 1"
              id="knotenarm6_strassenname_multirow1_text"
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
              y="-84.651787"
            >
              <tspan
                id="knotenarm6_strassenname_multirow1_tspan"
                x="1251.2728"
                y="-8.2089996"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeSix[0] }}
              </tspan>
            </text>
            <text
              id="knotenarm6_sum_text"
              xml:space="preserve"
              transform="rotate(45)"
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
                stroke-width: 43.9645;
              `"
              x="506.49976"
              y="-778.08771"
            >
              <tspan
                id="knotenarm6_sum_tspan"
                x="1663.9556"
                y="10.097366"
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
                  stroke-width: 43.9645;
                `"
              >
                {{ sumNodeSixArrows }}
              </tspan>
            </text>
          </g>
          <g id="arrows_knotenarm6">
            <g id="arrows_knotenarm6_nord_ost">
              <path
                v-if="arrowNodeSixNorthEastIncomingAvailable"
                id="arrow_knotenarm6_nord_ost_eingehend"
                d="m 1130.1618,997.57854 -123.7441,-123.74404 -5.6568,5.65686 -14.84941,-34.64737 34.64841,14.84838 -5.6569,5.65685 123.7441,123.74404 z"
                :fill="colorArrowNodeSixNorthEastIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeSixNorthEastOutgoingAvailable"
                id="arrow_knotenarm6_nord_ost_ausgehend"
                d="m 966.64529,864.11149 123.74411,123.74404 5.6568,-5.65686 14.8494,34.64743 -34.6484,-14.8484 5.6569,-5.65689 -123.74411,-123.74404 z"
                :fill="colorArrowNodeSixNorthEastOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeSixNorthEastIncomingAvailable"
                id="arrow_knotenarm6_nord_ost_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="506.0639"
                y="-879.72052"
              >
                <tspan
                  id="arrow_knotenarm6_nord_ost_eingehend_zaehlwert_tspan"
                  x="1663.0913"
                  y="-91.826622"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeSixNorthEastIncoming }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeSixNorthEastOutgoingAvailable"
                id="arrow_knotenarm6_nord_ost_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="506.06149"
                y="-846.47015"
              >
                <tspan
                  id="arrow_knotenarm6_nord_ost_ausgehend_zaehlwert_tspan"
                  x="1663.0887"
                  y="-58.576717"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeSixNorthEastOutgoing }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeSixNorthEastIncomingAvailable ||
                  arrowNodeSixNorthEastOutgoingAvailable
                "
                id="arrows_knotenarm6_nord_ost_sum_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  stroke-width: 43.9644;
                `"
                x="506.50089"
                y="-815.25012"
              >
                <tspan
                  id="arrows_knotenarm6_nord_ost_sum_tspan"
                  x="1663.9556"
                  y="-27.06534"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeSixNorthEast }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeSixNorthEastIncomingAvailable ||
                  arrowNodeSixNorthEastOutgoingAvailable
                "
                id="arrows_knotenarm6_nord_ost_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8774"
                d="m 1144.3774,1067.9235 69.2964,69.2965 -1.7324,1.7324 -69.2964,-69.2965 z"
              />
            </g>
            <g id="arrows_knotenarm6_sued_west">
              <path
                v-if="arrowNodeSixSouthWestIncomingAvailable"
                id="arrow_knotenarm6_sued_west_eingehend"
                d="m 1012.6073,1115.1365 -123.74411,-123.744 -5.6568,5.65686 -14.8494,-34.64737 34.6484,14.84838 -5.6569,5.65685 123.74411,123.74408 z"
                :fill="colorArrowNodeSixSouthWestIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeSixSouthWestOutgoingAvailable"
                id="arrow_knotenarm6_sued_west_ausgehend"
                d="m 849.08729,981.66949 123.7441,123.74401 5.6568,-5.6568 14.8494,34.6474 -34.6484,-14.8484 5.6569,-5.6569 -123.7441,-123.74403 z"
                :fill="colorArrowNodeSixSouthWestOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeSixSouthWestIncomingAvailable"
                id="arrow_knotenarm6_sued_west_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="506.0614"
                y="-713.47058"
              >
                <tspan
                  id="arrow_knotenarm6_sued_west_eingehend_zaehlwert_tspan"
                  x="1663.0887"
                  y="74.422997"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeSixSouthWestIncoming }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeSixSouthWestOutgoingAvailable"
                id="arrow_knotenarm6_sued_west_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="506.06403"
                y="-680.22058"
              >
                <tspan
                  id="arrow_knotenarm6_sued_west_ausgehend_zaehlwert_tspan"
                  x="1663.0913"
                  y="107.67294"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeSixSouthWestOutgoing }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeSixSouthWestIncomingAvailable ||
                  arrowNodeSixSouthWestOutgoingAvailable
                "
                id="arrows_knotenarm6_sued_west_sum_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  stroke-width: 43.9644;
                `"
                x="506.50089"
                y="-648.99805"
              >
                <tspan
                  id="arrows_knotenarm6_sued_west_sum_tspan"
                  x="1663.9556"
                  y="139.18677"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeSixSouthWest }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeSixSouthWestIncomingAvailable ||
                  arrowNodeSixSouthWestOutgoingAvailable
                "
                id="arrows_knotenarm6_sued_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 1026.8229,1185.4815 69.2964,69.2965 -1.7324,1.7324 -69.2964,-69.2965 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(7)"
          id="knotenarm7_group"
        >
          <g id="knotenarm7">
            <path
              id="knotenarm7_spike"
              d="m 699.99994,749.49747 -339.12205,339.12213 -56.85739,7.3606 7.35765,-56.8559 339.12432,-339.12431 z"
              fill="#ececec"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeSeven.length === 1"
              id="knotenarm7_strassenname_text"
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
              x="-262.48059"
              y="995.74023"
            >
              <tspan
                id="knotenarm7_strassenname_tspan"
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
                x="-262.48059"
                y="995.74023"
              >
                {{ streetnameNodeSeven[0] }}
              </tspan>
            </text>
            <g id="knotenarm7_number">
              <circle
                id="knotenarm7_number_circle"
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
                id="knotenarm7_number_text"
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
                  id="knotenarm7_number_tspan"
                  style="stroke-width: 30.9229"
                  x="633.51685"
                  y="767.69238"
                >
                  7
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNodeSeven.length > 1"
              id="knotenarm7_strassenname_multirow2_text"
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
                id="knotenarm7_strassenname_multirow2_tspan"
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
                {{ streetnameNodeSeven[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeSeven.length > 1"
              id="knotenarm7_strassenname_multirow1_text"
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
                id="knotenarm7_strassenname_multirow1_tspan"
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
                {{ streetnameNodeSeven[0] }}
              </tspan>
            </text>
            <text
              id="knotenarm7_sum_text"
              xml:space="preserve"
              transform="rotate(-45)"
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
                stroke-width: 43.9645;
              `"
              x="-1738.3558"
              y="210.94797"
            >
              <tspan
                id="knotenarm7_sum_tspan"
                x="-580.90033"
                y="999.13306"
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
                  stroke-width: 43.9645;
                `"
              >
                {{ sumNodeSevenArrows }}
              </tspan>
            </text>
          </g>
          <g id="arrows_knotenarm7">
            <g id="arrows_knotenarm7_sued_ost">
              <path
                v-if="arrowNodeSevenSouthEastIncomingAvailable"
                id="arrow_knotenarm7_sued_ost_eingehend"
                d="m 402.4195,1130.162 123.74404,-123.7441 -5.65706,-5.657 34.64739,-14.84941 -14.8484,34.64841 -5.65658,-5.6566 -123.74404,123.744 z"
                :fill="colorArrowNodeSevenSouthEastIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeSevenSouthEastOutgoingAvailable"
                id="arrow_knotenarm7_sued_ost_ausgehend"
                d="m 535.88655,966.64529 -123.74404,123.74411 5.65686,5.6568 -34.64737,14.8494 14.84838,-34.6484 5.65685,5.6569 123.74404,-123.74411 z"
                :fill="colorArrowNodeSevenSouthEastOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeSevenSouthEastOutgoingAvailable"
                id="arrow_knotenarm7_sued_ost_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1738.4728"
                y="276.22891"
              >
                <tspan
                  id="arrow_knotenarm7_sued_ost_ausgehend_zaehlwert_tspan"
                  x="-581.4458"
                  y="1064.1224"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeSevenSouthEastOutgoing }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeSevenSouthEastIncomingAvailable"
                id="arrow_knotenarm7_sued_ost_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1738.4755"
                y="309.47891"
              >
                <tspan
                  id="arrow_knotenarm7_sued_ost_eingehend_zaehlwert_tspan"
                  x="-581.4483"
                  y="1097.3723"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeSevenSouthEastIncoming }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeSevenSouthEastIncomingAvailable ||
                  arrowNodeSevenSouthEastOutgoingAvailable
                "
                id="arrows_knotenarm7_sued_ost_sum_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  stroke-width: 43.9644;
                `"
                x="-1739.099"
                y="340.78668"
              >
                <tspan
                  id="arrows_knotenarm7_sued_ost_sum_tspan"
                  x="-581.64447"
                  y="1128.9714"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeSevenSouthEast }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeSevenSouthEastIncomingAvailable ||
                  arrowNodeSevenSouthEastOutgoingAvailable
                "
                id="arrows_knotenarm7_sued_ost_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 297.899,1261.5994 69.29647,-69.2964 1.73241,1.7324 -69.29647,69.2964 z"
              />
            </g>
            <g id="arrows_knotenarm7_nord_west">
              <path
                v-if="arrowNodeSevenNorthWestIncomingAvailable"
                id="arrow_knotenarm7_nord_west_eingehend"
                d="m 284.865,1012.6075 123.74404,-123.74411 -5.65706,-5.657 34.64739,-14.8494 -14.8484,34.6484 -5.65658,-5.6566 -123.74404,123.74401 z"
                :fill="colorArrowNodeSevenNorthWestIncoming"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <path
                v-if="arrowNodeSevenNorthWestOutgoingAvailable"
                id="arrow_knotenarm7_nord_west_ausgehend"
                d="m 418.33205,849.08729 -123.74404,123.7441 5.65686,5.6568 -34.64737,14.8494 14.84838,-34.6484 5.65685,5.6569 123.74404,-123.7441 z"
                :fill="colorArrowNodeSevenNorthWestOutgoing"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <text
                v-if="arrowNodeSevenNorthWestOutgoingAvailable"
                id="arrow_knotenarm7_nord_west_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1738.4756"
                y="109.97922"
              >
                <tspan
                  id="arrow_knotenarm7_nord_west_ausgehend_zaehlwert_tspan"
                  x="-581.4483"
                  y="897.87274"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeSevenNorthWestOutgoing }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeSevenNorthWestIncomingAvailable"
                id="arrow_knotenarm7_nord_west_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-1738.473"
                y="143.22932"
              >
                <tspan
                  id="arrow_knotenarm7_nord_west_eingehend_zaehlwert_tspan"
                  x="-581.44586"
                  y="931.12274"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeSevenNorthWestIncoming }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeSevenNorthWestIncomingAvailable ||
                  arrowNodeSevenNorthWestOutgoingAvailable
                "
                id="arrows_knotenarm7_nord_west_sum_text"
                xml:space="preserve"
                transform="rotate(-45)"
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
                  stroke-width: 43.9644;
                `"
                x="-1739.0966"
                y="174.53697"
              >
                <tspan
                  id="arrows_knotenarm7_nord_west_sum_tspan"
                  x="-581.64203"
                  y="962.72186"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeSevenNorthWest }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeSevenNorthWestIncomingAvailable ||
                  arrowNodeSevenNorthWestOutgoingAvailable
                "
                id="arrows_knotenarm7_nord_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 180.341,1144.0414 69.29647,-69.2964 1.73241,1.7324 -69.29647,69.2964 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(8)"
          id="knotenarm8_group"
        >
          <g id="knotenarm8">
            <path
              id="knotenarm8_spike"
              d="M 650.50319,699.99991 311.38115,360.87788 304.0205,304.0205 l 56.85586,7.35764 339.1243,339.1243 z"
              fill="#ececec"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeEight.length === 1"
              id="knotenarm8_strassenname_text"
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
                id="knotenarm8_strassenname_tspan"
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
                {{ streetnameNodeEight[0] }}
              </tspan>
            </text>
            <g id="knotenarm8_number">
              <circle
                id="knotenarm8_number_circle"
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
                id="knotenarm8_number_text"
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
                  id="knotenarm8_number_tspan"
                  style="stroke-width: 30.9229"
                  x="633.36969"
                  y="646.78491"
                >
                  8
                </tspan>
              </text>
            </g>
            <text
              v-if="streetnameNodeEight.length > 1"
              id="knotenarm8_strassenname_multirow2_text"
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
                id="knotenarm8_strassenname_multirow2_tspan"
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
                {{ streetnameNodeEight[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeEight.length > 1"
              id="knotenarm8_strassenname_multirow1_text"
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
                id="knotenarm8_strassenname_multirow1_tspan"
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
                {{ streetnameNodeEight[0] }}
              </tspan>
            </text>
            <text
              id="knotenarm8_sum_text"
              xml:space="preserve"
              transform="rotate(45)"
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
                stroke-width: 43.9644;
              `"
              x="-749.14612"
              y="-778.26025"
            >
              <tspan
                id="knotenarm8_sum_tspan"
                x="408.30856"
                y="9.9241133"
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
                  stroke-width: 43.9644;
                `"
              >
                {{ sumNodeEightArrows }}
              </tspan>
            </text>
          </g>
          <g id="arrows_knotenarm8">
            <g id="arrows_knotenarm8_sued_west">
              <path
                v-if="arrowNodeEightSouthWestOutgoingAvailable"
                id="arrow_knotenarm8_sued_west_ausgehend"
                d="M 433.35729,535.88655 309.61325,412.14251 303.9564,417.79937 289.107,383.152 l 34.64839,14.84838 -5.65686,5.65685 123.74404,123.74404 z"
                :fill="colorArrowNodeEightSouthWestOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeEightSouthWestIncomingAvailable"
                id="arrow_knotenarm8_sued_west_eingehend"
                d="m 269.83728,402.4195 123.74404,123.74404 5.65685,-5.65686 14.84939,34.64739 -34.64838,-14.8484 5.65686,-5.65685 L 261.352,410.90478 Z"
                :fill="colorArrowNodeEightSouthWestIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeEightSouthWestOutgoingAvailable"
                id="arrow_knotenarm8_sued_west_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-749.58295"
                y="-713.6413"
              >
                <tspan
                  id="arrow_knotenarm8_sued_west_ausgehend_zaehlwert_tspan"
                  x="407.44427"
                  y="74.252251"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeEightSouthWestOutgoing }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeEightSouthWestIncomingAvailable"
                id="arrow_knotenarm8_sued_west_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-749.58551"
                y="-680.39124"
              >
                <tspan
                  id="arrow_knotenarm8_sued_west_eingehend_zaehlwert_tspan"
                  x="407.4418"
                  y="107.50217"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeEightSouthWestIncoming }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeEightSouthWestIncomingAvailable ||
                  arrowNodeEightSouthWestOutgoingAvailable
                "
                id="arrows_knotenarm8_sued_west_sum_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  stroke-width: 43.9644;
                `"
                x="-749.14618"
                y="-649.1712"
              >
                <tspan
                  id="arrows_knotenarm8_sued_west_sum_tspan"
                  x="408.30856"
                  y="139.01353"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeEightSouthWest }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeEightSouthWestIncomingAvailable ||
                  arrowNodeEightSouthWestOutgoingAvailable
                "
                id="arrows_knotenarm8_sued_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 139.47841,297.8955 69.29647,69.29647 -1.73241,1.73241 -69.29647,-69.29647 z"
              />
            </g>
            <g id="arrows_knotenarm8_nord_ost">
              <path
                v-if="arrowNodeEightNorthEastOutgoingAvailable"
                id="arrow_knotenarm8_nord_ost_ausgehend"
                d="m 550.91179,418.33205 -123.74404,-123.74404 -5.65685,5.65686 -14.8494,-34.64737 34.64839,14.84838 -5.65686,5.65685 123.74404,123.74404 z"
                :fill="colorArrowNodeEightNorthEastOutgoing"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                v-if="arrowNodeEightNorthEastIncomingAvailable"
                id="arrow_knotenarm8_nord_ost_eingehend"
                d="m 387.39528,284.865 123.74404,123.74404 5.65685,-5.65686 14.84939,34.64739 -34.64838,-14.8484 5.65686,-5.65685 L 378.91,293.35028 Z"
                :fill="colorArrowNodeEightNorthEastIncoming"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                v-if="arrowNodeEightNorthEastOutgoingAvailable"
                id="arrow_knotenarm8_nord_ost_ausgehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-749.58545"
                y="-879.89099"
              >
                <tspan
                  id="arrow_knotenarm8_nord_ost_ausgehend_zaehlwert_tspan"
                  x="407.4418"
                  y="-91.997398"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeEightNorthEastOutgoing }}
                </tspan>
              </text>
              <text
                v-if="arrowNodeEightNorthEastIncomingAvailable"
                id="arrow_knotenarm8_nord_ost_eingehend_zaehlwert_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                `"
                x="-749.58295"
                y="-846.64087"
              >
                <tspan
                  id="arrow_knotenarm8_nord_ost_eingehend_zaehlwert_tspan"
                  x="407.44427"
                  y="-58.747467"
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
                    stroke-width: 43.9482;
                  `"
                >
                  {{ zaehlwertArrowNodeEightNorthEastIncoming }}
                </tspan>
              </text>
              <text
                v-if="
                  arrowNodeEightNorthEastIncomingAvailable ||
                  arrowNodeEightNorthEastOutgoingAvailable
                "
                id="arrows_knotenarm8_nord_ost_sum_text"
                xml:space="preserve"
                transform="rotate(45)"
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
                  stroke-width: 43.9644;
                `"
                x="-749.14618"
                y="-815.41846"
              >
                <tspan
                  id="arrows_knotenarm8_nord_ost_sum_tspan"
                  x="408.30856"
                  y="-27.233639"
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
                    stroke-width: 43.9644;
                  `"
                >
                  {{ sumArrowsNodeEightNorthEast }}
                </tspan>
              </text>
              <path
                v-if="
                  arrowNodeEightNorthEastIncomingAvailable ||
                  arrowNodeEightNorthEastOutgoingAvailable
                "
                id="arrows_knotenarm8_nord_ost_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 257.03641,180.3375 69.29647,69.29647 -1.73241,1.73241 -69.29647,-69.29647 z"
              />
            </g>
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
import type AbstractLadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/AbstractLadeBelastungsplanDTO";
import type LadeBelastungsplanFjsDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanFjsDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import { BelastungsplanConstants } from "@/components/zaehlstelle/charts/BelastungsplanConstants";
import { useBelastungsplanMethods } from "@/components/zaehlstelle/charts/BelastungsplanMethods";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import BelastungsplanTyp from "@/types/enum/BelastungsplanTyp";
import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import { useDateUtils } from "@/util/DateUtils";
import { useFjs } from "@/util/FjsUtils";
import { useStrassennameUtils } from "@/util/StrassennameUtils";

interface Props {
  data: LadeBelastungsplanFjsDTO;
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
const fjs = useFjs();
const belastungsplanMethods = useBelastungsplanMethods();
const strassennameUtils = useStrassennameUtils();

const streetnameNodeOne = ref<Array<string>>([]);
const streetnameNodeTwo = ref<Array<string>>([]);
const streetnameNodeThree = ref<Array<string>>([]);
const streetnameNodeFour = ref<Array<string>>([]);
const streetnameNodeFive = ref<Array<string>>([]);
const streetnameNodeSix = ref<Array<string>>([]);
const streetnameNodeSeven = ref<Array<string>>([]);
const streetnameNodeEight = ref<Array<string>>([]);
const svgRef = ref<SVGSVGElement | null>(null);

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const availableKnotenarmNummern = computed(() => {
  return fjs.computeAvailableKnotenarmNummernFromZaehlung(activeZaehlung.value);
});

const availableKnotenarme = computed(() => {
  return fjs.computeAvailableKnotenarme(activeZaehlung.value);
});

/**
 * Auslesen des Zählwertes aus dem LadeBelastungsplanFjsDTO für den angegebenen Knotenarm, Strassenseite und Richtung.
 * Wird eines davon nicht gefunden, wird 0 als anzuzeigender Wert zurückgegeben.
 *
 * @return Gefundener Zählwert oder 0
 */
function getArrowZaehlwertOrZero(
  knotenarm: number,
  richtung: Bewegungsrichtung,
  strassenseite: Himmelsrichtung
) {
  if (!isFjsBelastungsplan(props.data) || !props.data.value1) {
    return 0;
  }
  const kn = props.data.value1.valuesKnotenarme.find(
    (k) => k.knotenarm === knotenarm
  );
  if (!kn) return 0;
  const seite = kn.valuesStrassenseiten.find(
    (s) => s.strassenseite === strassenseite
  );
  if (!seite) return 0;
  const laengsverkehr = seite.valuesLaengsverkehre.find(
    (l) => l.richtung === richtung
  );
  return laengsverkehr?.value ?? 0;
}

/**
 * Auslesen der Zählwert-Summe aus dem LadeBelastungsplanFjsDTO für den angegebenen Knotenarm und Strassenseite.
 * Wird eines davon nicht gefunden, wird 0 als anzuzeigender Wert zurückgegeben.
 *
 * @return Gefundene Summe oder 0
 */
function getSumArrowsKnotenarmStrassenseiteOrZero(
  knotenarm: number,
  strassenseite: Himmelsrichtung
) {
  if (!isFjsBelastungsplan(props.data) || !props.data.value1) {
    return 0;
  }
  const kn = props.data.value1.valuesKnotenarme.find(
    (k) => k.knotenarm === knotenarm
  );
  if (!kn) return 0;
  const seite = kn.valuesStrassenseiten.find(
    (s) => s.strassenseite === strassenseite
  );
  return seite?.sumStrassenseite ?? 0;
}

/**
 * Auslesen der Zählwert-Summe aus dem LadeBelastungsplanFjsDTO für den angegebenen Knotenarm.
 * Wird dieser nicht gefunden, wird 0 als anzuzeigender Wert zurückgegeben.
 *
 * @return Gefundene Summe oder 0
 */
function getSumArrowsKnotenarmOrZero(knotenarm: number) {
  if (!isFjsBelastungsplan(props.data) || !props.data.value1) {
    return 0;
  }
  const kn = props.data.value1.valuesKnotenarme.find(
    (k) => k.knotenarm === knotenarm
  );
  return kn?.sumKnotenarm ?? 0;
}

// Zaehlwerte of Node 1
const zaehlwertArrowNodeOneWestOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(1, Bewegungsrichtung.AUS, Himmelsrichtung.W);
});

const zaehlwertArrowNodeOneWestIncoming = computed(() => {
  return getArrowZaehlwertOrZero(1, Bewegungsrichtung.EIN, Himmelsrichtung.W);
});

const zaehlwertArrowNodeOneEastOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(1, Bewegungsrichtung.AUS, Himmelsrichtung.O);
});

const zaehlwertArrowNodeOneEastIncoming = computed(() => {
  return getArrowZaehlwertOrZero(1, Bewegungsrichtung.EIN, Himmelsrichtung.O);
});

const sumArrowsNodeOneWest = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(1, Himmelsrichtung.W);
});

const sumArrowsNodeOneEast = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(1, Himmelsrichtung.O);
});

const sumNodeOneArrows = computed(() => {
  return getSumArrowsKnotenarmOrZero(1);
});

// Zaehlwerte of Node 2
const zaehlwertArrowNodeTwoNorthIncoming = computed(() => {
  return getArrowZaehlwertOrZero(2, Bewegungsrichtung.EIN, Himmelsrichtung.N);
});

const zaehlwertArrowNodeTwoNorthOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(2, Bewegungsrichtung.AUS, Himmelsrichtung.N);
});

const zaehlwertArrowNodeTwoSouthIncoming = computed(() => {
  return getArrowZaehlwertOrZero(2, Bewegungsrichtung.EIN, Himmelsrichtung.S);
});

const zaehlwertArrowNodeTwoSouthOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(2, Bewegungsrichtung.AUS, Himmelsrichtung.S);
});

const sumArrowsNodeTwoNorth = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(2, Himmelsrichtung.N);
});

const sumArrowsNodeTwoSouth = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(2, Himmelsrichtung.S);
});

const sumNodeTwoArrows = computed(() => {
  return getSumArrowsKnotenarmOrZero(2);
});

// Zaehlwerte of Node 3
const zaehlwertArrowNodeThreeWestIncoming = computed(() => {
  return getArrowZaehlwertOrZero(3, Bewegungsrichtung.EIN, Himmelsrichtung.W);
});

const zaehlwertArrowNodeThreeWestOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(3, Bewegungsrichtung.AUS, Himmelsrichtung.W);
});

const zaehlwertArrowNodeThreeEastOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(3, Bewegungsrichtung.AUS, Himmelsrichtung.O);
});

const zaehlwertArrowNodeThreeEastIncoming = computed(() => {
  return getArrowZaehlwertOrZero(3, Bewegungsrichtung.EIN, Himmelsrichtung.O);
});

const sumArrowsNodeThreeWest = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(3, Himmelsrichtung.W);
});

const sumArrowsNodeThreeEast = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(3, Himmelsrichtung.O);
});

const sumNodeThreeArrows = computed(() => {
  return getSumArrowsKnotenarmOrZero(3);
});

// Zaehlwerte of Node 4
const zaehlwertArrowNodeFourNorthOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(4, Bewegungsrichtung.AUS, Himmelsrichtung.N);
});

const zaehlwertArrowNodeFourNorthIncoming = computed(() => {
  return getArrowZaehlwertOrZero(4, Bewegungsrichtung.EIN, Himmelsrichtung.N);
});

const zaehlwertArrowNodeFourSouthOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(4, Bewegungsrichtung.AUS, Himmelsrichtung.S);
});

const zaehlwertArrowNodeFourSouthIncoming = computed(() => {
  return getArrowZaehlwertOrZero(4, Bewegungsrichtung.EIN, Himmelsrichtung.S);
});

const sumArrowsNodeFourNorth = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(4, Himmelsrichtung.N);
});

const sumArrowsNodeFourSouth = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(4, Himmelsrichtung.S);
});

const sumNodeFourArrows = computed(() => {
  return getSumArrowsKnotenarmOrZero(4);
});

// Zaehlwerte of Node 5
const zaehlwertArrowNodeFiveNorthWestOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(5, Bewegungsrichtung.AUS, Himmelsrichtung.NW);
});

const zaehlwertArrowNodeFiveNorthWestIncoming = computed(() => {
  return getArrowZaehlwertOrZero(5, Bewegungsrichtung.EIN, Himmelsrichtung.NW);
});

const zaehlwertArrowNodeFiveSouthEastOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(5, Bewegungsrichtung.AUS, Himmelsrichtung.SO);
});

const zaehlwertArrowNodeFiveSouthEastIncoming = computed(() => {
  return getArrowZaehlwertOrZero(5, Bewegungsrichtung.EIN, Himmelsrichtung.SO);
});

const sumArrowsNodeFiveNorthWest = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(5, Himmelsrichtung.NW);
});

const sumArrowsNodeFiveSouthEast = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(5, Himmelsrichtung.SO);
});

const sumNodeFiveArrows = computed(() => {
  return getSumArrowsKnotenarmOrZero(5);
});

// Zaehlwerte of Node 6
const zaehlwertArrowNodeSixNorthEastIncoming = computed(() => {
  return getArrowZaehlwertOrZero(6, Bewegungsrichtung.EIN, Himmelsrichtung.NO);
});

const zaehlwertArrowNodeSixNorthEastOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(6, Bewegungsrichtung.AUS, Himmelsrichtung.NO);
});

const zaehlwertArrowNodeSixSouthWestIncoming = computed(() => {
  return getArrowZaehlwertOrZero(6, Bewegungsrichtung.EIN, Himmelsrichtung.SW);
});

const zaehlwertArrowNodeSixSouthWestOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(6, Bewegungsrichtung.AUS, Himmelsrichtung.SW);
});

const sumArrowsNodeSixNorthEast = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(6, Himmelsrichtung.NO);
});

const sumArrowsNodeSixSouthWest = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(6, Himmelsrichtung.SW);
});

const sumNodeSixArrows = computed(() => {
  return getSumArrowsKnotenarmOrZero(6);
});

// Zaehlwerte of Node 7
const zaehlwertArrowNodeSevenNorthWestIncoming = computed(() => {
  return getArrowZaehlwertOrZero(7, Bewegungsrichtung.EIN, Himmelsrichtung.NW);
});

const zaehlwertArrowNodeSevenNorthWestOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(7, Bewegungsrichtung.AUS, Himmelsrichtung.NW);
});

const zaehlwertArrowNodeSevenSouthEastIncoming = computed(() => {
  return getArrowZaehlwertOrZero(7, Bewegungsrichtung.EIN, Himmelsrichtung.SO);
});

const zaehlwertArrowNodeSevenSouthEastOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(7, Bewegungsrichtung.AUS, Himmelsrichtung.SO);
});

const sumArrowsNodeSevenNorthWest = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(7, Himmelsrichtung.NW);
});

const sumArrowsNodeSevenSouthEast = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(7, Himmelsrichtung.SO);
});

const sumNodeSevenArrows = computed(() => {
  return getSumArrowsKnotenarmOrZero(7);
});

// Zaehlwerte of Node 8
const zaehlwertArrowNodeEightNorthEastOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(8, Bewegungsrichtung.AUS, Himmelsrichtung.NO);
});

const zaehlwertArrowNodeEightNorthEastIncoming = computed(() => {
  return getArrowZaehlwertOrZero(8, Bewegungsrichtung.EIN, Himmelsrichtung.NO);
});

const zaehlwertArrowNodeEightSouthWestOutgoing = computed(() => {
  return getArrowZaehlwertOrZero(8, Bewegungsrichtung.AUS, Himmelsrichtung.SW);
});

const zaehlwertArrowNodeEightSouthWestIncoming = computed(() => {
  return getArrowZaehlwertOrZero(8, Bewegungsrichtung.EIN, Himmelsrichtung.SW);
});

const sumArrowsNodeEightNorthEast = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(8, Himmelsrichtung.NO);
});

const sumArrowsNodeEightSouthWest = computed(() => {
  return getSumArrowsKnotenarmStrassenseiteOrZero(8, Himmelsrichtung.SW);
});

const sumNodeEightArrows = computed(() => {
  return getSumArrowsKnotenarmOrZero(8);
});

// Arrows of Node 1
const colorArrowNodeOneWestOutgoing = setColor(
  1,
  Himmelsrichtung.W,
  Bewegungsrichtung.AUS
);
const arrowNodeOneWestOutgoingAvailable = isArrowAvailable(
  1,
  Himmelsrichtung.W,
  Bewegungsrichtung.AUS
);

const colorArrowNodeOneWestIncoming = setColor(
  1,
  Himmelsrichtung.W,
  Bewegungsrichtung.EIN
);
const arrowNodeOneWestIncomingAvailable = isArrowAvailable(
  1,
  Himmelsrichtung.W,
  Bewegungsrichtung.EIN
);

const colorArrowNodeOneEastOutgoing = setColor(
  1,
  Himmelsrichtung.O,
  Bewegungsrichtung.AUS
);
const arrowNodeOneEastOutgoingAvailable = isArrowAvailable(
  1,
  Himmelsrichtung.O,
  Bewegungsrichtung.AUS
);

const colorArrowNodeOneEastIncoming = setColor(
  1,
  Himmelsrichtung.O,
  Bewegungsrichtung.EIN
);
const arrowNodeOneEastIncomingAvailable = isArrowAvailable(
  1,
  Himmelsrichtung.O,
  Bewegungsrichtung.EIN
);

// Arrows of Node 2
const colorArrowNodeTwoNorthIncoming = setColor(
  2,
  Himmelsrichtung.N,
  Bewegungsrichtung.EIN
);
const arrowNodeTwoNorthIncomingAvailable = isArrowAvailable(
  2,
  Himmelsrichtung.N,
  Bewegungsrichtung.EIN
);

const colorArrowNodeTwoNorthOutgoing = setColor(
  2,
  Himmelsrichtung.N,
  Bewegungsrichtung.AUS
);
const arrowNodeTwoNorthOutgoingAvailable = isArrowAvailable(
  2,
  Himmelsrichtung.N,
  Bewegungsrichtung.AUS
);

const colorArrowNodeTwoSouthIncoming = setColor(
  2,
  Himmelsrichtung.S,
  Bewegungsrichtung.EIN
);
const arrowNodeTwoSouthIncomingAvailable = isArrowAvailable(
  2,
  Himmelsrichtung.S,
  Bewegungsrichtung.EIN
);

const colorArrowNodeTwoSouthOutgoing = setColor(
  2,
  Himmelsrichtung.S,
  Bewegungsrichtung.AUS
);
const arrowNodeTwoSouthOutgoingAvailable = isArrowAvailable(
  2,
  Himmelsrichtung.S,
  Bewegungsrichtung.AUS
);

// Arrows of Node 3
const colorArrowNodeThreeWestIncoming = setColor(
  3,
  Himmelsrichtung.W,
  Bewegungsrichtung.EIN
);
const arrowNodeThreeWestIncomingAvailable = isArrowAvailable(
  3,
  Himmelsrichtung.W,
  Bewegungsrichtung.EIN
);

const colorArrowNodeThreeWestOutgoing = setColor(
  3,
  Himmelsrichtung.W,
  Bewegungsrichtung.AUS
);
const arrowNodeThreeWestOutgoingAvailable = isArrowAvailable(
  3,
  Himmelsrichtung.W,
  Bewegungsrichtung.AUS
);

const colorArrowNodeThreeEastOutgoing = setColor(
  3,
  Himmelsrichtung.O,
  Bewegungsrichtung.AUS
);
const arrowNodeThreeEastOutgoingAvailable = isArrowAvailable(
  3,
  Himmelsrichtung.O,
  Bewegungsrichtung.AUS
);

const colorArrowNodeThreeEastIncoming = setColor(
  3,
  Himmelsrichtung.O,
  Bewegungsrichtung.EIN
);
const arrowNodeThreeEastIncomingAvailable = isArrowAvailable(
  3,
  Himmelsrichtung.O,
  Bewegungsrichtung.EIN
);

// Arrows of Node 4
const colorArrowNodeFourNorthOutgoing = setColor(
  4,
  Himmelsrichtung.N,
  Bewegungsrichtung.AUS
);
const arrowNodeFourNorthOutgoingAvailable = isArrowAvailable(
  4,
  Himmelsrichtung.N,
  Bewegungsrichtung.AUS
);

const colorArrowNodeFourNorthIncoming = setColor(
  4,
  Himmelsrichtung.N,
  Bewegungsrichtung.EIN
);
const arrowNodeFourNorthIncomingAvailable = isArrowAvailable(
  4,
  Himmelsrichtung.N,
  Bewegungsrichtung.EIN
);

const colorArrowNodeFourSouthOutgoing = setColor(
  4,
  Himmelsrichtung.S,
  Bewegungsrichtung.AUS
);
const arrowNodeFourSouthOutgoingAvailable = isArrowAvailable(
  4,
  Himmelsrichtung.S,
  Bewegungsrichtung.AUS
);

const colorArrowNodeFourSouthIncoming = setColor(
  4,
  Himmelsrichtung.S,
  Bewegungsrichtung.EIN
);
const arrowNodeFourSouthIncomingAvailable = isArrowAvailable(
  4,
  Himmelsrichtung.S,
  Bewegungsrichtung.EIN
);

// Arrows of Node 5
const colorArrowNodeFiveNorthWestOutgoing = setColor(
  5,
  Himmelsrichtung.NW,
  Bewegungsrichtung.AUS
);
const arrowNodeFiveNorthWestOutgoingAvailable = isArrowAvailable(
  5,
  Himmelsrichtung.NW,
  Bewegungsrichtung.AUS
);

const colorArrowNodeFiveNorthWestIncoming = setColor(
  5,
  Himmelsrichtung.NW,
  Bewegungsrichtung.EIN
);
const arrowNodeFiveNorthWestIncomingAvailable = isArrowAvailable(
  5,
  Himmelsrichtung.NW,
  Bewegungsrichtung.EIN
);

const colorArrowNodeFiveSouthEastOutgoing = setColor(
  5,
  Himmelsrichtung.SO,
  Bewegungsrichtung.AUS
);
const arrowNodeFiveSouthEastOutgoingAvailable = isArrowAvailable(
  5,
  Himmelsrichtung.SO,
  Bewegungsrichtung.AUS
);

const colorArrowNodeFiveSouthEastIncoming = setColor(
  5,
  Himmelsrichtung.SO,
  Bewegungsrichtung.EIN
);
const arrowNodeFiveSouthEastIncomingAvailable = isArrowAvailable(
  5,
  Himmelsrichtung.SO,
  Bewegungsrichtung.EIN
);

// Arrows of Node 6
const colorArrowNodeSixNorthEastIncoming = setColor(
  6,
  Himmelsrichtung.NO,
  Bewegungsrichtung.EIN
);
const arrowNodeSixNorthEastIncomingAvailable = isArrowAvailable(
  6,
  Himmelsrichtung.NO,
  Bewegungsrichtung.EIN
);

const colorArrowNodeSixNorthEastOutgoing = setColor(
  6,
  Himmelsrichtung.NO,
  Bewegungsrichtung.AUS
);
const arrowNodeSixNorthEastOutgoingAvailable = isArrowAvailable(
  6,
  Himmelsrichtung.NO,
  Bewegungsrichtung.AUS
);

const colorArrowNodeSixSouthWestIncoming = setColor(
  6,
  Himmelsrichtung.SW,
  Bewegungsrichtung.EIN
);
const arrowNodeSixSouthWestIncomingAvailable = isArrowAvailable(
  6,
  Himmelsrichtung.SW,
  Bewegungsrichtung.EIN
);

const colorArrowNodeSixSouthWestOutgoing = setColor(
  6,
  Himmelsrichtung.SW,
  Bewegungsrichtung.AUS
);
const arrowNodeSixSouthWestOutgoingAvailable = isArrowAvailable(
  6,
  Himmelsrichtung.SW,
  Bewegungsrichtung.AUS
);

// Arrows of Node 7
const colorArrowNodeSevenNorthWestIncoming = setColor(
  7,
  Himmelsrichtung.NW,
  Bewegungsrichtung.EIN
);
const arrowNodeSevenNorthWestIncomingAvailable = isArrowAvailable(
  7,
  Himmelsrichtung.NW,
  Bewegungsrichtung.EIN
);

const colorArrowNodeSevenNorthWestOutgoing = setColor(
  7,
  Himmelsrichtung.NW,
  Bewegungsrichtung.AUS
);
const arrowNodeSevenNorthWestOutgoingAvailable = isArrowAvailable(
  7,
  Himmelsrichtung.NW,
  Bewegungsrichtung.AUS
);

const colorArrowNodeSevenSouthEastIncoming = setColor(
  7,
  Himmelsrichtung.SO,
  Bewegungsrichtung.EIN
);
const arrowNodeSevenSouthEastIncomingAvailable = isArrowAvailable(
  7,
  Himmelsrichtung.SO,
  Bewegungsrichtung.EIN
);

const colorArrowNodeSevenSouthEastOutgoing = setColor(
  7,
  Himmelsrichtung.SO,
  Bewegungsrichtung.AUS
);
const arrowNodeSevenSouthEastOutgoingAvailable = isArrowAvailable(
  7,
  Himmelsrichtung.SO,
  Bewegungsrichtung.AUS
);

// Arrows of Node 8
const colorArrowNodeEightNorthEastOutgoing = setColor(
  8,
  Himmelsrichtung.NO,
  Bewegungsrichtung.AUS
);
const arrowNodeEightNorthEastOutgoingAvailable = isArrowAvailable(
  8,
  Himmelsrichtung.NO,
  Bewegungsrichtung.AUS
);

const colorArrowNodeEightNorthEastIncoming = setColor(
  8,
  Himmelsrichtung.NO,
  Bewegungsrichtung.EIN
);
const arrowNodeEightNorthEastIncomingAvailable = isArrowAvailable(
  8,
  Himmelsrichtung.NO,
  Bewegungsrichtung.EIN
);

const colorArrowNodeEightSouthWestOutgoing = setColor(
  8,
  Himmelsrichtung.SW,
  Bewegungsrichtung.AUS
);
const arrowNodeEightSouthWestOutgoingAvailable = isArrowAvailable(
  8,
  Himmelsrichtung.SW,
  Bewegungsrichtung.AUS
);

const colorArrowNodeEightSouthWestIncoming = setColor(
  8,
  Himmelsrichtung.SW,
  Bewegungsrichtung.EIN
);
const arrowNodeEightSouthWestIncomingAvailable = isArrowAvailable(
  8,
  Himmelsrichtung.SW,
  Bewegungsrichtung.EIN
);

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

function setColor(
  node: number,
  strassenseite: Himmelsrichtung,
  richtung: Bewegungsrichtung
) {
  return computed(() =>
    fjs.existsLaengsverkehr(
      optionen.value.chosenLaengsverkehre,
      node,
      strassenseite,
      richtung
    )
      ? zaehlstelleStore.isBlackprintMode
        ? BelastungsplanConstants.blackPrintColor
        : (BelastungsplanConstants.farben.get(node) ??
          BelastungsplanConstants.inaktivColor)
      : BelastungsplanConstants.inaktivColor
  );
}

function isArrowAvailable(
  node: number,
  strassenseite: Himmelsrichtung,
  richtung: Bewegungsrichtung
) {
  return computed(() =>
    fjs.existsLaengsverkehr(
      activeZaehlung.value.laengsverkehr,
      node,
      strassenseite,
      richtung
    )
  );
}

onMounted(() => {
  zaehlstelleStore.setSizeBelastungsplanSvg(
    Number.parseInt(sizeBelastungsplan.value.replace("px", ""))
  );
  zaehlstelleStore.setMaxSizeBelastungsplanSvg(maxSizeBelastungsplan.value);
  zaehlstelleStore.setMinSizeBelastungsplanSvg(minSizeBelastungsplan.value);
});

watch(
  [
    () => props.data,
    () => activeZaehlung.value.laengsverkehr,
    () => activeZaehlung.value.knotenarme,
    () => optionen.value.zeitauswahl,
    () => optionen.value.chosenLaengsverkehre,
    () => zaehlstelleStore.isBlackprintMode,
  ],
  async () => {
    setStreetnameNodes();
    await nextTick();

    emitSvgAsBlob();
  },
  { deep: true, immediate: true }
);

function setStreetnameNodes() {
  streetnameNodeOne.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 1)
  );
  streetnameNodeTwo.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 2)
  );
  streetnameNodeThree.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 3)
  );
  streetnameNodeFour.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 4)
  );
  streetnameNodeFive.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 5)
  );
  streetnameNodeSix.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 6)
  );
  streetnameNodeSeven.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 7)
  );
  streetnameNodeEight.value = strassennameUtils.getStreetLines(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 8)
  );
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

function isFjsBelastungsplan(
  data: AbstractLadeBelastungsplanDTO | undefined
): data is LadeBelastungsplanFjsDTO {
  return !!data && data.belastungsplanTyp === BelastungsplanTyp.FJS;
}
</script>
