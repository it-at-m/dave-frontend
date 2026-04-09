<template>
  <v-sheet id="belastungsplan-zaehlstelle">
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
      <g
        id="legend"
        transform="translate(9.0201068e-4,-7.1314694e-4)"
      >
        <g
          id="legend-zaehlinfo"
          style="stroke-width: 28.2205; stroke-dasharray: none"
          transform="translate(50.006244,31.659644)"
        >
          <text
            id="verkehrsart"
            xml:space="preserve"
            style="
              font-style: normal;
              font-variant: normal;
              font-weight: normal;
              font-stretch: normal;
              font-size: 19.7556px;
              font-family: sans-serif;
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
            "
            x="168.24969"
            y="1230.3373"
            transform="matrix(1.000004,0,0,1,-152.56418,35.000043)"
          >
            <tspan
              id="tspan13"
              x="168.24969"
              y="1230.3373"
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
            transform="translate(-152.29421)"
          >
            <text
              id="zaehlzeit2-multirow"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 19.7556px;
                font-family: sans-serif;
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
              "
              x="168"
              y="1210"
            >
              <tspan
                id="tspan18"
                x="168"
                y="1210"
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
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 19.7556px;
                font-family: sans-serif;
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
              "
              x="168.24969"
              y="1190.3373"
              transform="translate(-150.84646,0.00360406)"
            >
              <tspan
                id="tspan20"
                x="168.24969"
                y="1190.3373"
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
        <g
          id="legend-compass"
          transform="matrix(0.79169692,0,0,0.78817168,-25.092397,5.5190685)"
        >
          <path
            id="compass2"
            style="
              fill: none;
              fill-opacity: 1;
              stroke: #000000;
              stroke-width: 3.35093;
              stroke-linecap: butt;
              stroke-miterlimit: 2.5;
              stroke-dasharray: none;
              stroke-opacity: 1;
            "
            d="m 399.4343,-24.60083 105.23313,182.26914 -210.46627,-1e-5 z"
            transform="matrix(0.16996929,0,0,0.4104001,81.91578,36.842952)"
          />
          <text
            id="compass1"
            xml:space="preserve"
            style="
              font-style: normal;
              font-variant: normal;
              font-weight: normal;
              font-stretch: normal;
              font-size: 24.6944px;
              font-family: RomanD;
              font-variant-ligatures: normal;
              font-variant-caps: normal;
              font-variant-numeric: normal;
              font-variant-east-asian: normal;
              text-align: start;
              writing-mode: lr-tb;
              direction: ltr;
              text-anchor: start;
              fill: #000000;
              stroke-width: 2.2868;
            "
            x="141.28041"
            y="93.924416"
          >
            <tspan
              id="tspan6-1"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 24.6944px;
                font-family: RomanD;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                stroke-width: 2.2868;
              "
            >
              N
            </tspan>
          </text>
        </g>
        <g
          id="legend-zaehlstelle"
          transform="translate(-112.62637,-13.999124)"
        >
          <g
            id="zaehlstelle2"
            style="stroke-width: 28.2205; stroke-dasharray: none"
            transform="translate(163.18555,-589.09456)"
          >
            <text
              v-if="zaehlstelleStore.getZaehlstelleHeader.stadtbezirkNummer"
              id="zaehlstelle2-multirow"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 19.7556px;
                font-family: sans-serif;
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
              "
              x="699.24969"
              y="688.33734"
              transform="translate(324.11416)"
            >
              <tspan
                id="tspan21"
                x="699.24969"
                y="688.33734"
              >
                Stadtbezirk
                {{ zaehlstelleStore.getZaehlstelleHeader.stadtbezirkNummer }}
              </tspan>
              <tspan
                id="tspan22"
                x="699.24969"
                y="713.03187"
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
            transform="translate(162.09712,-614.70735)"
          >
            <text
              id="zaehlstelle1-multirow"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 19.7556px;
                font-family: sans-serif;
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
              "
              x="699.24969"
              y="688.33734"
              transform="translate(324.11217)"
            >
              <tspan
                id="tspan24"
                x="699.24969"
                y="688.33734"
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
        id="nodes1To4"
        class="Page"
      >
        <g
          v-if="availableKnotenarmNummern.includes(1)"
          id="node1_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="node1">
            <path
              id="node1_spike"
              d="M 664.99999,665 V 185.409 L 699.99947,140 734.99999,185.4058 V 665 Z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <g id="node1_number">
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
                xml:space="preserve"
                style="
                  font-size: 19.7624px;
                  font-family: sans-serif;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                "
                y="622.00684"
                x="693.53955"
              >
                <tspan
                  id="node1_circle_tspan"
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
              id="node1_strassenname_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
              transform="rotate(-90)"
              x="-671.03851"
              y="629.34802"
            >
              <tspan
                id="tspan1"
                x="-438.67819"
                y="705.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeOne[0] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeOne.length > 1"
              id="node1_strassenname_multirow2_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
              transform="rotate(-90)"
              x="-671.03851"
              y="643.34802"
            >
              <tspan
                id="tspan2"
                x="-438.67819"
                y="719.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeOne[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeOne.length > 1"
              id="node1_strassenname_multirow1_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
              transform="rotate(-90)"
              x="-671.03851"
              y="615.34802"
            >
              <tspan
                id="tspan3"
                x="-438.67819"
                y="691.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeOne[0] }}
              </tspan>
            </text>
            <text
              id="node1_sum_text"
              xml:space="preserve"
              transform="matrix(0,-0.86675092,1.153734,0,0,0)"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: 28.097px;
                font-family: Arial;
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
              "
              x="-1207.2531"
              y="-171.53365"
            >
              <tspan
                id="node1_sum_tspan"
                x="-49.797398"
                y="616.65149"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 43.9645;
                "
              >
                {{ sumNodeOneArrows }}
              </tspan>
            </text>
          </g>
          <g id="node1_arrows">
            <g id="node1_west">
              <path
                id="node1_west_north"
                d="M 627.50029,395.409 V 220.40855 H 619.5 L 633.49931,185.409 647.5,220.40855 h -7.99962 V 395.409 Z"
                :fill="colorNodeOneArrowWestNorth"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <path
                id="node1_west_south"
                d="m 606.25,185.409 v 175.00052 h 8 L 600.25072,395.409 586.25,360.40952 h 8 V 185.409 Z"
                :fill="colorNodeOneArrowWestSouth"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <text
                id="node1_west_south_number_text"
                xml:space="preserve"
                transform="matrix(0,-0.86707182,1.153307,0,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1206.5183"
                y="-259.38544"
              >
                <tspan
                  id="node1_west_south_number_tspan"
                  x="-49.490978"
                  y="528.50812"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeOneArrowWestSouth }}
                </tspan>
              </text>
              <text
                id="node1_west_north_number_text"
                xml:space="preserve"
                transform="matrix(0,-0.86707182,1.153307,0,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1206.5183"
                y="-230.55521"
              >
                <tspan
                  id="node1_west_north_number_tspan"
                  x="-49.490978"
                  y="557.33826"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeOneArrowWestNorth }}
                </tspan>
              </text>
              <text
                id="node1_west_sum_text"
                xml:space="preserve"
                transform="matrix(0,-0.86675167,1.153733,0,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-1207.2521"
                y="-203.73477"
              >
                <tspan
                  id="node1_west_sum_tspan"
                  x="-49.797356"
                  y="584.45007"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeOneArrowsWest }}
                </tspan>
              </text>
              <path
                id="node1_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 645.75,142.03 v -98 h 2.45 v 98 z"
              />
            </g>
            <g id="node1_east">
              <path
                id="node1_east_north"
                d="M 793.75028,395.409 V 220.40855 h -8.00029 l 13.99931,-34.99955 14.00069,34.99955 h -7.99962 V 395.409 Z"
                :fill="colorNodeOneArrowEastNorth"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node1_east_south"
                d="m 772.49999,185.409 v 175.00052 h 8 L 766.50071,395.409 752.49999,360.40952 h 8 V 185.409 Z"
                :fill="colorNodeOneArrowEastSouth"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node1_east_south_number_text"
                xml:space="preserve"
                transform="matrix(0,-0.86707182,1.153307,0,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1206.5183"
                y="-115.23471"
              >
                <tspan
                  id="node1_east_south_number_tspan"
                  x="-49.490978"
                  y="672.65881"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeOneArrowEastSouth }}
                </tspan>
              </text>
              <text
                id="node1_east_north_number_text"
                xml:space="preserve"
                transform="matrix(0,-0.86707182,1.153307,0,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1206.5183"
                y="-86.404541"
              >
                <tspan
                  id="node1_east_north_number_tspan"
                  x="-49.490978"
                  y="701.48889"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeOneArrowEastNorth }}
                </tspan>
              </text>
              <text
                id="node1_east_sum_text"
                xml:space="preserve"
                transform="matrix(0,-0.86675167,1.153733,0,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-1207.2521"
                y="-59.637333"
              >
                <tspan
                  id="node1_east_sum_tspan"
                  x="-49.797356"
                  y="728.54749"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeOneArrowsEast }}
                </tspan>
              </text>
              <path
                id="node1_east_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 811.99999,142.03 v -98 h 2.45 v 98 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(2)"
          id="node2_group"
        >
          <g id="node2">
            <path
              id="node2_spike"
              d="M 734.99999,664.99999 H 1214.591 l 45.409,34.99948 -45.4058,35.00052 H 734.99999 Z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeTwo.length === 1"
              id="node2_strassenname_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
              x="728.96271"
              y="629.34802"
            >
              <tspan
                id="tspan4"
                x="961.323"
                y="705.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeTwo[0] }}
              </tspan>
            </text>
            <g id="node2_number">
              <circle
                id="node2_number_circle"
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
                id="node2_number_text"
                xml:space="preserve"
                style="
                  font-size: 19.7624px;
                  font-family: sans-serif;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                "
                y="707.33368"
                x="779.30457"
              >
                <tspan
                  id="node2_number_tspan"
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
              id="node2_strassenname_multirow2_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
              x="728.96271"
              y="643.34802"
            >
              <tspan
                id="tspan5"
                x="961.323"
                y="719.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeTwo[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeTwo.length > 1"
              id="node2_strassenname_multirow1_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
              x="728.96271"
              y="615.34802"
            >
              <tspan
                id="tspan6"
                x="961.323"
                y="691.79083"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeTwo[0] }}
              </tspan>
            </text>
            <text
              id="node2_sum_text"
              xml:space="preserve"
              transform="scale(0.86675092,1.153734)"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: 28.097px;
                font-family: Arial;
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
              "
              x="407.97421"
              y="-171.52608"
            >
              <tspan
                id="node2_sum_tspan"
                x="1565.4299"
                y="616.65906"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 43.9645;
                "
              >
                {{ sumNodeTwoArrows }}
              </tspan>
            </text>
          </g>
          <g id="node2_arrows">
            <g id="node2_north">
              <path
                id="node2_north_west"
                d="m 1214.591,606.25 h -175.0005 v 8 L 1004.591,600.25072 1039.5905,586.25 v 8 h 175.0005 z"
                :fill="colorNodeTwoArrowNorthWest"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node2_north_east"
                d="m 1004.591,627.5 h 175.0005 v -8 l 34.9995,13.9993 -34.9995,14.0007 v -8 H 1004.591 Z"
                :fill="colorNodeTwoArrowNorthEast"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node2_north_west_number_text"
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="406.98672"
                y="-259.38541"
              >
                <tspan
                  id="node2_north_west_number_tspan"
                  x="1564.014"
                  y="528.50812"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeTwoArrowNorthWest }}
                </tspan>
              </text>
              <text
                id="node2_north_east_number_text"
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="406.98672"
                y="-230.55528"
              >
                <tspan
                  id="node2_north_east_number_tspan"
                  x="1564.014"
                  y="557.33826"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeTwoArrowNorthEast }}
                </tspan>
              </text>
              <text
                id="node2_north_sum_text"
                xml:space="preserve"
                transform="scale(0.86675167,1.153733)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="407.97394"
                y="-203.73479"
              >
                <tspan
                  id="node2_north_sum_tspan"
                  x="1565.4286"
                  y="584.45001"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeTwoArrowsNorth }}
                </tspan>
              </text>
              <path
                id="node2_north_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8774"
                d="m 1260,645.75 h 98 v 2.45 h -98 z"
              />
            </g>
            <g id="node2_south">
              <path
                id="node2_south_west"
                d="m 1214.591,772.49999 h -175.0005 v 8 l -34.9995,-13.99928 34.9995,-14.00072 v 8 h 175.0005 z"
                :fill="colorNodeTwoArrowSouthWest"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node2_south_east"
                d="m 1004.591,793.74999 h 175.0005 v -8 l 34.9995,13.9993 -34.9995,14.0007 v -8 H 1004.591 Z"
                :fill="colorNodeTwoArrowSouthEast"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node2_south_west_number_text"
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="406.98672"
                y="-115.2347"
              >
                <tspan
                  id="node2_south_west_number_tspan"
                  x="1564.014"
                  y="672.65881"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeTwoArrowSouthWest }}
                </tspan>
              </text>
              <text
                id="node2_south_east_number_text"
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="406.98669"
                y="-86.404564"
              >
                <tspan
                  id="node2_south_east_number_tspan"
                  x="1564.014"
                  y="701.48889"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeTwoArrowSouthEast }}
                </tspan>
              </text>
              <text
                id="node2_south_sum_text"
                xml:space="preserve"
                transform="scale(0.86675167,1.153733)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="407.97397"
                y="-59.637352"
              >
                <tspan
                  id="node2_south_sum_tspan"
                  x="1565.4287"
                  y="728.54749"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeTwoArrowsSouth }}
                </tspan>
              </text>
              <path
                id="node2_south_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 1260,811.99999 h 98 v 2.45 h -98 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(3)"
          id="node3_group"
        >
          <g id="node3">
            <path
              id="node3_spike"
              d="M 734.99999,734.99999 V 1214.591 L 700.00051,1260 664.99999,1214.5942 V 734.99999 Z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeThree.length === 1"
              id="node3_strassenname_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              transform="rotate(-90)"
              x="-962.48126"
              y="705.79083"
            >
              <tspan
                id="node3_strassenname_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="-962.48126"
                y="705.79083"
              >
                {{ streetnameNodeThree[0] }}
              </tspan>
            </text>
            <g id="node3_number">
              <circle
                id="node3_number_circle"
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
                id="node3_number_text"
                xml:space="preserve"
                style="
                  font-size: 19.7624px;
                  font-family: sans-serif;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                "
                y="792.38141"
                x="693.75189"
              >
                <tspan
                  id="node3_number_tspan"
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
              id="node3_strassenname_multirow2_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              transform="rotate(-90)"
              x="-962.48126"
              y="719.79083"
            >
              <tspan
                id="node3_strassenname_multirow2_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="-962.48126"
                y="719.79083"
              >
                {{ streetnameNodeThree[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeThree.length > 1"
              id="node3_strassenname_multirow1_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              transform="rotate(-90)"
              x="-962.48126"
              y="691.79083"
            >
              <tspan
                id="node3_strassenname_multirow1_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="-962.48126"
                y="691.79083"
              >
                {{ streetnameNodeThree[0] }}
              </tspan>
            </text>
            <text
              id="node3_sum_text"
              xml:space="preserve"
              transform="matrix(0,-0.86675092,1.153734,0,0,0)"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: 28.097px;
                font-family: Arial;
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
              "
              x="-2630.3494"
              y="-171.53365"
            >
              <tspan
                id="node3_sum_tspan"
                x="-1472.8937"
                y="616.65149"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 43.9645;
                "
              >
                {{ sumNodeThreeArrows }}
              </tspan>
            </text>
          </g>
          <g id="node3_arrows">
            <g id="node3_east">
              <path
                id="node3_east_north"
                d="m 793.75028,1214.591 v -175.0005 h -8.00029 l 13.99931,-34.9995 14.00069,34.9995 h -7.99962 v 175.0005 z"
                :fill="colorNodeThreeArrowEastNorth"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node3_east_south"
                d="m 772.49999,1004.591 v 175.0005 h 8 l -13.99928,34.9995 -14.00072,-34.9995 h 8 V 1004.591 Z"
                :fill="colorNodeThreeArrowEastSouth"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node3_east_south_number_text"
                xml:space="preserve"
                transform="matrix(0,-0.86707182,1.153307,0,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-2629.0879"
                y="-115.23471"
              >
                <tspan
                  id="node3_east_south_number_tspan"
                  x="-1472.0605"
                  y="672.65881"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeThreeArrowEastSouth }}
                </tspan>
              </text>
              <text
                id="node3_east_north_number_text"
                xml:space="preserve"
                transform="matrix(0,-0.86707182,1.153307,0,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-2629.0879"
                y="-86.404541"
              >
                <tspan
                  id="node3_east_north_number_tspan"
                  x="-1472.0605"
                  y="701.48889"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeThreeArrowEastNorth }}
                </tspan>
              </text>
              <text
                id="node3_east_sum_text"
                xml:space="preserve"
                transform="matrix(0,-0.86675167,1.153733,0,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-2630.3472"
                y="-59.637333"
              >
                <tspan
                  id="node3_east_sum_tspan"
                  x="-1472.8923"
                  y="728.54749"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeThreeArrowsEast }}
                </tspan>
              </text>
              <path
                id="node3_east_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 811.99999,1375.5 v -98 h 2.45 v 98 z"
              />
            </g>
            <g id="node3_west">
              <path
                id="node3_west_north"
                d="M 627.50029,1214.591 V 1039.5905 H 619.5 l 13.99931,-34.9995 14.00069,34.9995 h -7.99962 v 175.0005 z"
                :fill="colorNodeThreeArrowWestNorth"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <path
                id="node3_west_south"
                d="m 606.25,1004.591 v 175.0005 h 8 L 600.25072,1214.591 586.25,1179.5915 h 8 V 1004.591 Z"
                :fill="colorNodeThreeArrowWestSouth"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <text
                id="node3_west_south_number_text"
                xml:space="preserve"
                transform="matrix(0,-0.86707182,1.153307,0,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-2629.0879"
                y="-259.38544"
              >
                <tspan
                  id="node3_west_south_number_tspan"
                  x="-1472.0605"
                  y="528.50812"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeThreeArrowWestSouth }}
                </tspan>
              </text>
              <text
                id="node3_west_north_number_text"
                xml:space="preserve"
                transform="matrix(0,-0.86707182,1.153307,0,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-2629.0879"
                y="-230.55521"
              >
                <tspan
                  id="node3_west_north_number_tspan"
                  x="-1472.0605"
                  y="557.33826"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeThreeArrowWestNorth }}
                </tspan>
              </text>
              <text
                id="node3_west_sum_text"
                xml:space="preserve"
                transform="matrix(0,-0.86675167,1.153733,0,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-2630.3472"
                y="-203.73477"
              >
                <tspan
                  id="node3_west_sum_tspan"
                  x="-1472.8923"
                  y="584.45007"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeThreeArrowsWest }}
                </tspan>
              </text>
              <path
                id="node3_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 645.75,1375.5 v -98 h 2.45 v 98 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(4)"
          id="node4_group"
        >
          <g id="node4">
            <path
              id="node4_spike"
              d="M 664.99998,734.99999 H 185.409 L 140,700.00052 185.4058,664.99999 h 479.59418 z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeFour.length === 1"
              id="node4_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              x="437.52008"
              y="705.79083"
            >
              <tspan
                id="node4_strassenname_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="437.52008"
                y="705.79083"
              >
                {{ streetnameNodeFour[0] }}
              </tspan>
            </text>
            <g id="node4_number">
              <circle
                id="node4_number_circle"
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
                id="node4_number_text"
                xml:space="preserve"
                style="
                  font-size: 19.7624px;
                  font-family: sans-serif;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                "
                y="707.20343"
                x="608.34302"
              >
                <tspan
                  id="node4_number_tspan"
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
              id="node4_strassenname_multirow2_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              x="437.52008"
              y="719.79083"
            >
              <tspan
                id="node4_strassenname_multirow2_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="437.52008"
                y="719.79083"
              >
                {{ streetnameNodeFour[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeFour.length > 1"
              id="node4_strassenname_multirow1_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              x="437.52008"
              y="691.79083"
            >
              <tspan
                id="node4_strassenname_multirow1_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="437.52008"
                y="691.79083"
              >
                {{ streetnameNodeFour[0] }}
              </tspan>
            </text>
            <text
              id="node4_sum_text"
              xml:space="preserve"
              transform="scale(0.86675167,1.153733)"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: 28.097px;
                font-family: Arial;
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
              "
              x="-1015.1211"
              y="-171.52489"
            >
              <tspan
                id="node4_sum_tspan"
                x="142.33362"
                y="616.65955"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 43.9644;
                "
              >
                {{ sumNodeFourArrows }}
              </tspan>
            </text>
          </g>
          <g id="node4_arrows">
            <g id="node4_south">
              <path
                id="node4_south_west"
                d="M 395.409,772.49999 H 220.4085 v 8 l -34.9995,-13.99928 34.9995,-14.00072 v 8 H 395.409 Z"
                :fill="colorNodeFourArrowSouthWest"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node4_south_east"
                d="m 185.409,793.74999 h 175.0005 v -8 l 34.9995,13.9993 -34.9995,14.0007 v -8 H 185.409 Z"
                :fill="colorNodeFourArrowSouthEast"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node4_south_west_number_text"
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1015.5829"
                y="-115.2348"
              >
                <tspan
                  id="node4_south_west_number_tspan"
                  x="141.44441"
                  y="672.65881"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeFourArrowSouthWest }}
                </tspan>
              </text>
              <text
                id="node4_south_east_number_text"
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1015.5829"
                y="-86.404541"
              >
                <tspan
                  id="node4_south_east_number_tspan"
                  x="141.44441"
                  y="701.48889"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeFourArrowSouthEast }}
                </tspan>
              </text>
              <text
                id="node4_south_sum_text"
                xml:space="preserve"
                transform="scale(0.86675167,1.153733)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-1015.1211"
                y="-59.637363"
              >
                <tspan
                  id="node4_south_sum_tspan"
                  x="142.33362"
                  y="728.54749"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeFourArrowsSouth }}
                </tspan>
              </text>
              <path
                id="node4_south_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 24.5,811.99999 h 98 v 2.45 h -98 z"
              />
            </g>
            <g id="node4_north">
              <path
                id="node4_north_west"
                d="M 395.409,606.25 H 220.4085 v 8 L 185.409,600.25072 220.4085,586.25 v 8 H 395.409 Z"
                :fill="colorNodeFourArrowNorthWest"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node4_north_east"
                d="m 185.409,627.5 h 175.0005 v -8 L 395.409,633.4993 360.4095,647.5 v -8 H 185.409 Z"
                :fill="colorNodeFourArrowNorthEast"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node4_north_west_number_text"
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1015.5829"
                y="-259.38544"
              >
                <tspan
                  id="node4_north_west_number_tspan"
                  x="141.44441"
                  y="528.50812"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeFourArrowNorthWest }}
                </tspan>
              </text>
              <text
                id="node4_north_east_number_text"
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1015.5829"
                y="-230.55518"
              >
                <tspan
                  id="node4_north_east_number_tspan"
                  x="141.44441"
                  y="557.33826"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeFourArrowNorthEast }}
                </tspan>
              </text>
              <text
                id="node4_north_sum_text"
                xml:space="preserve"
                transform="scale(0.86675167,1.153733)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-1015.1211"
                y="-203.7348"
              >
                <tspan
                  id="node4_north_sum_tspan"
                  x="142.33362"
                  y="584.45007"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeFourArrowsNorth }}
                </tspan>
              </text>
              <path
                id="node4_north_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 24.5,645.75 h 98 v 2.45 h -98 z"
              />
            </g>
          </g>
        </g>
      </g>
      <g id="nodes5To8">
        <g
          v-if="availableKnotenarmNummern.includes(5)"
          id="node5_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g id="node5">
            <path
              id="node5_spike"
              d="m 699.99999,650.50319 339.12201,-339.12205 56.8574,-7.36064 -7.3576,56.85586 -339.12433,339.12431 z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <g id="node5_number">
              <circle
                id="node5_number_circle"
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
                id="node5_number_text"
                xml:space="preserve"
                style="
                  font-size: 19.7624px;
                  font-family: sans-serif;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                "
                y="646.03784"
                x="754.23737"
              >
                <tspan
                  id="node5_number_tspan"
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
              id="node5_strassenname_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
              transform="rotate(-45)"
              x="28.961178"
              y="919.29749"
            >
              <tspan
                id="node5_strassenname_tspan"
                x="261.3215"
                y="995.74023"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeFive[0] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeFive.length > 1"
              id="node5_strassenname_multirow2_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
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
                {{ streetnameNodeFive[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeFive.length > 1"
              id="node5_strassenname_multirow1_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
              transform="rotate(-45)"
              x="28.961172"
              y="905.2995"
            >
              <tspan
                id="node5_strassenname_multirow1_tspan"
                x="261.3215"
                y="981.74231"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeFive[0] }}
              </tspan>
            </text>
            <text
              id="node5_sum_text"
              xml:space="preserve"
              transform="matrix(0.61288545,-0.61288545,0.81581313,0.81581313,0,0)"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: 28.097px;
                font-family: Arial;
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
              "
              x="-399.63812"
              y="79.779076"
            >
              <tspan
                id="node5_sum_tspan"
                x="757.8175"
                y="867.96423"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 43.9645;
                "
              >
                {{ sumNodeFiveArrows }}
              </tspan>
            </text>
          </g>
          <g id="node5_arrows">
            <g id="node5_north_west">
              <path
                id="node5_north_west_north_east"
                d="M 864.11499,433.35748 987.859,309.61347 l -5.65706,-5.65706 34.64746,-14.84941 -14.8485,34.6484 -5.65656,-5.65658 -123.744,123.744 z"
                :fill="colorNodeFiveArrowNorthWestNorthEast"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <path
                id="node5_north_west_south_west"
                d="m 997.57854,269.83728 -123.74405,123.74405 5.65685,5.65686 -34.64735,14.84938 14.84836,-34.64837 5.65686,5.65685 L 989.09326,261.352 Z"
                :fill="colorNodeFiveArrowNorthWestSouthWest"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <text
                id="node5_north_west_south_west_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,-0.61311236,0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-399.20233"
                y="-7.9779282"
              >
                <tspan
                  id="node5_north_west_south_west_number_tspan"
                  x="757.82507"
                  y="779.91565"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeFiveArrowNorthWestSouthWest }}
                </tspan>
              </text>
              <text
                id="node5_north_west_north_east_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,-0.61311236,0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-399.20517"
                y="20.852219"
              >
                <tspan
                  id="node5_north_west_north_east_number_tspan"
                  x="757.82214"
                  y="808.74573"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeFiveArrowNorthWestNorthEast }}
                </tspan>
              </text>
              <text
                id="node5_north_west_sum_text"
                xml:space="preserve"
                transform="matrix(0.61288598,-0.61288598,0.81581243,0.81581243,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-399.64072"
                y="47.580051"
              >
                <tspan
                  id="node5_north_west_sum_tspan"
                  x="757.81403"
                  y="835.76489"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeFiveArrowsNorthWest }}
                </tspan>
              </text>
              <path
                id="node5_north_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 1056.1845,267.09547 69.2965,-69.29647 1.7324,1.73241 -69.2965,69.29647 z"
              />
            </g>
            <g id="node5_south_east">
              <path
                id="node5_south_east_north_east"
                d="m 981.66949,550.91198 123.74401,-123.74401 -5.6571,-5.65706 34.6475,-14.84941 -14.8485,34.6484 -5.6566,-5.65658 -123.74396,123.744 z"
                :fill="colorNodeFiveArrowSouthEastNorthEast"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node5_south_east_south_west"
                d="m 1115.1365,387.39528 -123.74401,123.74405 5.65685,5.65686 -34.64735,14.84938 14.84836,-34.64837 5.65686,5.65685 L 1106.6513,378.91 Z"
                :fill="colorNodeFiveArrowSouthEastSouthWest"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node5_south_east_south_west_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,-0.61311236,0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-399.20517"
                y="136.17249"
              >
                <tspan
                  id="node5_south_east_south_west_number_tspan"
                  x="757.82214"
                  y="924.06604"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeFiveArrowSouthEastSouthWest }}
                </tspan>
              </text>
              <text
                id="node5_south_east_north_east_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,-0.61311236,0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-399.2023"
                y="165.00262"
              >
                <tspan
                  id="node5_south_east_north_east_number_tspan"
                  x="757.82501"
                  y="952.89612"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeFiveArrowSouthEastNorthEast }}
                </tspan>
              </text>
              <text
                id="node5_south_east_sum_text"
                xml:space="preserve"
                transform="matrix(0.61288598,-0.61288598,0.81581243,0.81581243,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-399.63785"
                y="191.67722"
              >
                <tspan
                  id="node5_south_east_sum_tspan"
                  x="757.81683"
                  y="979.86206"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeFiveArrowsSouthEast }}
                </tspan>
              </text>
              <path
                id="node5_south_east_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 1173.739,384.64997 69.2965,-69.29647 1.7324,1.73241 -69.2965,69.29647 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(6)"
          id="node6_group"
        >
          <g id="node6">
            <path
              id="node6_spike"
              d="m 749.49747,699.99999 339.12213,339.12201 7.3606,56.8574 -56.8559,-7.3576 -339.12431,-339.12434 z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeSix.length === 1"
              id="node6_strassenname_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
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
                {{ streetnameNodeSix[0] }}
              </tspan>
            </text>
            <g
              id="node6_number"
              transform="rotate(45,785.75,700)"
            >
              <circle
                id="node6_number_circle"
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
                id="node6_number_text"
                xml:space="preserve"
                style="
                  font-size: 19.7624px;
                  font-family: sans-serif;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                "
                y="1118.2867"
                x="29.266506"
                transform="rotate(-45)"
              >
                <tspan
                  id="node6_number_tspan"
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
              id="node6_strassenname_multirow2_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
              transform="rotate(45)"
              x="1018.9124"
              y="-56.65107"
            >
              <tspan
                id="node6_strassenname_multirow2_tspan"
                x="1251.2728"
                y="19.791721"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeSix[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeSix.length > 1"
              id="node6_strassenname_multirow1_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
                font-family: Arial;
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
              "
              transform="rotate(45)"
              x="1018.9124"
              y="-84.651787"
            >
              <tspan
                id="node6_strassenname_multirow1_tspan"
                x="1251.2728"
                y="-8.2089996"
                style="stroke-width: 26.4927"
              >
                {{ streetnameNodeSix[0] }}
              </tspan>
            </text>
            <text
              id="node6_sum_text"
              xml:space="preserve"
              transform="matrix(0.61288545,0.61288545,-0.81581313,0.81581313,0,0)"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: 28.097px;
                font-family: Arial;
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
              "
              x="742.49854"
              y="-778.25079"
            >
              <tspan
                id="node6_sum_tspan"
                x="1899.9543"
                y="9.9343462"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 43.9645;
                "
              >
                {{ sumNodeSixArrows }}
              </tspan>
            </text>
          </g>
          <g id="node6_arrows">
            <g id="node6_north_east">
              <path
                id="node6_north_east_north_west"
                d="m 1130.1618,997.57854 -123.7441,-123.74404 -5.6568,5.65686 -14.84941,-34.64737 34.64841,14.84838 -5.6569,5.65685 123.7441,123.74404 z"
                :fill="colorNodeSixArrowNorthEastNorthWest"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node6_north_east_south_east"
                d="m 966.64529,864.11149 123.74411,123.74404 5.6568,-5.65686 14.8494,34.64743 -34.6484,-14.8484 5.6569,-5.65689 -123.74411,-123.74404 z"
                :fill="colorNodeSixArrowNorthEastSouthEast"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node6_north_east_north_west_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,0.61311236,-0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="741.38873"
                y="-866.33527"
              >
                <tspan
                  id="node6_north_east_north_west_number_tspan"
                  x="1898.416"
                  y="-78.441635"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeSixArrowNorthEastNorthWest }}
                </tspan>
              </text>
              <text
                id="node6_north_east_south_east_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,0.61311236,-0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="741.38599"
                y="-837.50513"
              >
                <tspan
                  id="node6_north_east_south_east_number_tspan"
                  x="1898.4132"
                  y="-49.611588"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeSixArrowNorthEastSouthEast }}
                </tspan>
              </text>
              <text
                id="node6_north_east_sum_text"
                xml:space="preserve"
                transform="matrix(0.61288598,0.61288598,-0.81581243,0.81581243,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="742.49811"
                y="-810.4613"
              >
                <tspan
                  id="node6_north_east_sum_tspan"
                  x="1899.9528"
                  y="-22.276493"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeSixArrowsNorthEast }}
                </tspan>
              </text>
              <path
                id="node6_north_east_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8774"
                d="m 1134.3394,1057.6195 69.2964,69.2965 -1.7324,1.7324 -69.2964,-69.2965 z"
              />
            </g>
            <g id="node6_south_west">
              <path
                id="node6_south_west_north_west"
                d="m 1012.6073,1115.1365 -123.74411,-123.744 -5.6568,5.65686 -14.8494,-34.64737 34.6484,14.84838 -5.6569,5.65685 123.74411,123.74408 z"
                :fill="colorNodeSixArrowSouthWestNorthWest"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node6_south_west_south_east"
                d="m 849.08729,981.66949 123.7441,123.74401 5.6568,-5.6568 14.8494,34.6474 -34.6484,-14.8484 5.6569,-5.6569 -123.7441,-123.74403 z"
                :fill="colorNodeSixArrowSouthWestSouthEast"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node6_south_west_north_west_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,0.61311236,-0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="741.38593"
                y="-722.18481"
              >
                <tspan
                  id="node6_south_west_north_west_number_tspan"
                  x="1898.4132"
                  y="65.708748"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeSixArrowSouthWestNorthWest }}
                </tspan>
              </text>
              <text
                id="node6_south_west_south_east_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,0.61311236,-0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="741.38873"
                y="-693.35468"
              >
                <tspan
                  id="node6_south_west_south_east_number_tspan"
                  x="1898.416"
                  y="94.53878"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeSixArrowSouthWestSouthEast }}
                </tspan>
              </text>
              <text
                id="node6_south_west_sum_text"
                xml:space="preserve"
                transform="matrix(0.61288598,0.61288598,-0.81581243,0.81581243,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="742.49805"
                y="-666.362"
              >
                <tspan
                  id="node6_south_west_sum_tspan"
                  x="1899.9528"
                  y="121.82278"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeSixArrowsSouthWest }}
                </tspan>
              </text>
              <path
                id="node6_south_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 1016.7849,1175.1775 69.2964,69.2965 -1.7324,1.7324 -69.2964,-69.2965 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(7)"
          id="node7_group"
        >
          <g id="node7">
            <path
              id="node7_spike"
              d="m 699.99994,749.49747 -339.12205,339.12213 -56.85739,7.3606 7.35765,-56.8559 339.12432,-339.12431 z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeSeven.length === 1"
              id="node7_strassenname_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              transform="rotate(-45)"
              x="-262.48059"
              y="995.74023"
            >
              <tspan
                id="node7_strassenname_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="-262.48059"
                y="995.74023"
              >
                {{ streetnameNodeSeven[0] }}
              </tspan>
            </text>
            <g id="node7_number">
              <circle
                id="node7_number_circle"
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
                id="node7_number_text"
                xml:space="preserve"
                style="
                  font-size: 19.7624px;
                  font-family: sans-serif;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                "
                y="767.69238"
                x="633.51685"
              >
                <tspan
                  id="node7_number_tspan"
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
              id="node7_strassenname_multirow2_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              transform="rotate(-45)"
              x="-262.48306"
              y="1009.7406"
            >
              <tspan
                id="node7_strassenname_multirow2_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="-262.48306"
                y="1009.7406"
              >
                {{ streetnameNodeSeven[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeSeven.length > 1"
              id="node7_strassenname_multirow1_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              transform="rotate(-45)"
              x="-262.48306"
              y="981.73987"
            >
              <tspan
                id="node7_strassenname_multirow1_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="-262.48306"
                y="981.73987"
              >
                {{ streetnameNodeSeven[0] }}
              </tspan>
            </text>
            <text
              id="node7_sum_text"
              xml:space="preserve"
              transform="matrix(0.61288545,-0.61288545,0.81581313,0.81581313,0,0)"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: 28.097px;
                font-family: Arial;
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
              "
              x="-1822.7341"
              y="79.781219"
            >
              <tspan
                id="node7_sum_tspan"
                x="-665.27838"
                y="867.96637"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 43.9645;
                "
              >
                {{ sumNodeSevenArrows }}
              </tspan>
            </text>
          </g>
          <g id="node7_arrows">
            <g id="node7_south_east">
              <path
                id="node7_south_east_north_east"
                d="m 402.4195,1130.162 123.74404,-123.7441 -5.65706,-5.657 34.64739,-14.84941 -14.8484,34.64841 -5.65658,-5.6566 -123.74404,123.744 z"
                :fill="colorNodeSevenArrowSouthEastNorthEast"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node7_south_east_south_west"
                d="m 535.88655,966.64529 -123.74404,123.74411 5.65686,5.6568 -34.64737,14.8494 14.84838,-34.6484 5.65685,5.6569 123.74404,-123.74411 z"
                :fill="colorNodeSevenArrowSouthEastSouthWest"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node7_south_east_south_west_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,-0.61311236,0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1821.7715"
                y="136.17253"
              >
                <tspan
                  id="node7_south_east_south_west_number_tspan"
                  x="-664.74414"
                  y="924.06604"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeSevenArrowSouthEastSouthWest }}
                </tspan>
              </text>
              <text
                id="node7_south_east_north_east_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,-0.61311236,0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1821.7743"
                y="165.00264"
              >
                <tspan
                  id="node7_south_east_north_east_number_tspan"
                  x="-664.74701"
                  y="952.89606"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeSevenArrowSouthEastNorthEast }}
                </tspan>
              </text>
              <text
                id="node7_south_east_sum_text"
                xml:space="preserve"
                transform="matrix(0.61288598,-0.61288598,0.81581243,0.81581243,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-1822.7355"
                y="191.67723"
              >
                <tspan
                  id="node7_south_east_sum_tspan"
                  x="-665.28058"
                  y="979.86206"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeSevenArrowsSouthEast }}
                </tspan>
              </text>
              <path
                id="node7_south_east_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 301.546,1256.8464 69.29647,-69.2964 1.73241,1.7324 -69.29647,69.2964 z"
              />
            </g>
            <g id="node7_north_west">
              <path
                id="node7_north_west_north_east"
                d="m 284.865,1012.6075 123.74404,-123.74411 -5.65706,-5.657 34.64739,-14.8494 -14.8484,34.6484 -5.65658,-5.6566 -123.74404,123.74401 z"
                :fill="colorNodeSevenArrowNorthWestNorthEast"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <path
                id="node7_north_west_south_west"
                d="m 418.33205,849.08729 -123.74404,123.7441 5.65686,5.6568 -34.64737,14.8494 14.84838,-34.6484 5.65685,5.6569 123.74404,-123.7441 z"
                :fill="colorNodeSevenArrowNorthWestSouthWest"
                stroke="none"
                style="stroke-width: 17.8112"
              />
              <text
                id="node7_north_west_south_west_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,-0.61311236,0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1821.7744"
                y="-7.9778929"
              >
                <tspan
                  id="node7_north_west_south_west_number_tspan"
                  x="-664.74695"
                  y="779.91565"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeSevenArrowNorthWestSouthWest }}
                </tspan>
              </text>
              <text
                id="node7_north_west_north_east_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,-0.61311236,0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-1821.7715"
                y="20.852285"
              >
                <tspan
                  id="node7_north_west_north_east_number_tspan"
                  x="-664.74414"
                  y="808.74573"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeSevenArrowNorthWestNorthEast }}
                </tspan>
              </text>
              <text
                id="node7_north_west_sum_text"
                xml:space="preserve"
                transform="matrix(0.61288598,-0.61288598,0.81581243,0.81581243,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-1822.7325"
                y="47.580002"
              >
                <tspan
                  id="node7_north_west_sum_tspan"
                  x="-665.27777"
                  y="835.76489"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeSevenArrowsNorthWest }}
                </tspan>
              </text>
              <path
                id="node7_north_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 183.988,1139.2884 69.29647,-69.2964 1.73241,1.7324 -69.29647,69.2964 z"
              />
            </g>
          </g>
        </g>
        <g
          v-if="availableKnotenarmNummern.includes(8)"
          id="node8_group"
        >
          <g id="node8">
            <path
              id="node8_spike"
              d="M 650.50319,699.99991 311.38115,360.87788 304.0205,304.0205 l 56.85586,7.35764 339.1243,339.1243 z"
              fill="#9e9e9e"
              stroke="none"
              style="stroke-width: 14.949"
            />
            <text
              v-if="streetnameNodeEight.length === 1"
              id="node8_strassenname_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              x="727.46826"
              y="5.7913613"
              transform="rotate(45)"
            >
              <tspan
                id="node8_strassenname_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="727.46826"
                y="5.7913613"
              >
                {{ streetnameNodeEight[0] }}
              </tspan>
            </text>
            <g id="node8_number">
              <circle
                id="node8_number_circle"
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
                id="node8_number_text"
                xml:space="preserve"
                style="
                  font-size: 19.7624px;
                  font-family: sans-serif;
                  text-align: start;
                  writing-mode: lr-tb;
                  direction: ltr;
                  text-anchor: start;
                  fill: #000000;
                  stroke-width: 30.9229;
                "
                y="646.78491"
                x="633.36969"
              >
                <tspan
                  id="node8_number_tspan"
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
              id="node8_strassenname_multirow2_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              x="727.47076"
              y="19.791721"
              transform="rotate(45)"
            >
              <tspan
                id="node8_strassenname_multirow2_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="727.47076"
                y="19.791721"
              >
                {{ streetnameNodeEight[1] }}
              </tspan>
            </text>
            <text
              v-if="streetnameNodeEight.length > 1"
              id="node8_strassenname_multirow1_text"
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 22.3767px;
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
                fill: #000000;
                fill-opacity: 1;
                stroke-width: 26.4927;
              "
              x="727.47076"
              y="-8.2089996"
              transform="rotate(45)"
            >
              <tspan
                id="node8_strassenname_multirow1_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 22.3767px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 26.4927;
                "
                x="727.47076"
                y="-8.2089996"
              >
                {{ streetnameNodeEight[0] }}
              </tspan>
            </text>
            <text
              id="node8_sum_text"
              xml:space="preserve"
              transform="matrix(0.61288598,0.61288598,-0.81581243,0.81581243,0,0)"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: 28.097px;
                font-family: Arial;
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
              "
              x="-680.59656"
              y="-778.25226"
            >
              <tspan
                id="node8_sum_tspan"
                x="476.85812"
                y="9.9321899"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 43.9644;
                "
              >
                {{ sumNodeEightArrows }}
              </tspan>
            </text>
          </g>
          <g id="node8_arrows">
            <g id="node8_south_west">
              <path
                id="node8_south_west_north_west"
                d="M 433.35729,535.88655 309.61325,412.14251 303.9564,417.79937 289.107,383.152 l 34.64839,14.84838 -5.65686,5.65685 123.74404,123.74404 z"
                :fill="colorNodeEightArrowSouthWestNorthWest"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node8_south_west_south_east"
                d="m 269.83728,402.4195 123.74404,123.74404 5.65685,-5.65686 14.84939,34.64739 -34.64838,-14.8484 5.65686,-5.65685 L 261.352,410.90478 Z"
                :fill="colorNodeEightArrowSouthWestSouthEast"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node8_south_west_north_west_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,0.61311236,-0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-681.18036"
                y="-722.18488"
              >
                <tspan
                  id="node8_south_west_north_west_number_tspan"
                  x="475.84692"
                  y="65.708733"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeEightArrowSouthWestNorthWest }}
                </tspan>
              </text>
              <text
                id="node8_south_west_south_east_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,0.61311236,-0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-681.18329"
                y="-693.35461"
              >
                <tspan
                  id="node8_south_west_south_east_number_tspan"
                  x="475.84406"
                  y="94.538795"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeEightArrowSouthWestSouthEast }}
                </tspan>
              </text>
              <text
                id="node8_south_west_sum_text"
                xml:space="preserve"
                transform="matrix(0.61288598,0.61288598,-0.81581243,0.81581243,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-680.59656"
                y="-666.3642"
              >
                <tspan
                  id="node8_south_west_sum_tspan"
                  x="476.85815"
                  y="121.82064"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeEightArrowsSouthWest }}
                </tspan>
              </text>
              <path
                id="node8_south_west_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 143.15341,301.546 69.29647,69.29647 -1.73241,1.73241 -69.29647,-69.29647 z"
              />
            </g>
            <g id="node8_north_east">
              <path
                id="node8_north_east_north_west"
                d="m 550.91179,418.33205 -123.74404,-123.74404 -5.65685,5.65686 -14.8494,-34.64737 34.64839,14.84838 -5.65686,5.65685 123.74404,123.74404 z"
                :fill="colorNodeEightArrowNorthEastNorthWest"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <path
                id="node8_north_east_south_east"
                d="m 387.39528,284.865 123.74404,123.74404 5.65685,-5.65686 14.84939,34.64739 -34.64838,-14.8484 5.65686,-5.65685 L 378.91,293.35028 Z"
                :fill="colorNodeEightArrowNorthEastSouthEast"
                stroke="none"
                style="stroke-width: 17.8113"
              />
              <text
                id="node8_north_east_north_west_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,0.61311236,-0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-681.18323"
                y="-866.33521"
              >
                <tspan
                  id="node8_north_east_north_west_number_tspan"
                  x="475.84406"
                  y="-78.441643"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeEightArrowNorthEastNorthWest }}
                </tspan>
              </text>
              <text
                id="node8_north_east_south_east_number_text"
                xml:space="preserve"
                transform="matrix(0.61311236,0.61311236,-0.8155112,0.8155112,0,0)"
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
                  white-space: pre;
                  display: inline;
                  fill: #000000;
                  fill-opacity: 1;
                  stroke-width: 43.9482;
                "
                x="-681.18036"
                y="-837.505"
              >
                <tspan
                  id="node8_north_east_south_east_number_tspan"
                  x="475.84692"
                  y="-49.611568"
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
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertNodeEightArrowNorthEastSouthEast }}
                </tspan>
              </text>
              <text
                id="node8_north_east_sum_text"
                xml:space="preserve"
                transform="matrix(0.61288598,0.61288598,-0.81581243,0.81581243,0,0)"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: Arial;
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
                "
                x="-680.59656"
                y="-810.45923"
              >
                <tspan
                  id="node8_north_east_sum_tspan"
                  x="476.85815"
                  y="-22.274359"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: Arial;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumNodeEightArrowsNorthEast }}
                </tspan>
              </text>
              <path
                id="node8_north_east_sum_line"
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 260.71141,183.988 69.29647,69.29647 -1.73241,1.73241 -69.29647,-69.29647 z"
              />
            </g>
          </g>
        </g>
      </g>
      <path
        id="center"
        d="m 14253.004,17465.11 166.703,0 117.876,117.877 0,166.702 -117.876,117.877 -166.703,0 -117.876,-117.877 0,-166.702 z"
        fill="#9e9e9e"
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

import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import { BelastungsplanConstants } from "@/components/zaehlstelle/charts/BelastungsplanConstants";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import { useDateUtils } from "@/util/DateUtils";
import { useFjs } from "@/util/FjsUtils";

interface Props {
  data: LadeBelastungsplanDTO;
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

// Zaehlwerte of Node 1
const zaehlwertNodeOneArrowWestNorth = computed(() => {
  return 800; // TODO: wire real data
});

const zaehlwertNodeOneArrowWestSouth = computed(() => {
  return 200; // TODO: wire real data
});

const zaehlwertNodeOneArrowEastNorth = computed(() => {
  return 900; // TODO: wire real data
});

const zaehlwertNodeOneArrowEastSouth = computed(() => {
  return 100; // TODO: wire real data
});

const sumNodeOneArrowsWest = computed(() => {
  return (
    zaehlwertNodeOneArrowWestNorth.value + zaehlwertNodeOneArrowWestSouth.value
  );
});

const sumNodeOneArrowsEast = computed(() => {
  return (
    zaehlwertNodeOneArrowEastNorth.value + zaehlwertNodeOneArrowEastSouth.value
  );
});

const sumNodeOneArrows = computed(() => {
  return sumNodeOneArrowsWest.value + sumNodeOneArrowsEast.value;
});

// Zaehlwerte of Node 2
const zaehlwertNodeTwoArrowNorthWest = computed(() => {
  return 800; // TODO: wire real data
});

const zaehlwertNodeTwoArrowNorthEast = computed(() => {
  return 200; // TODO: wire real data
});

const zaehlwertNodeTwoArrowSouthWest = computed(() => {
  return 900; // TODO: wire real data
});

const zaehlwertNodeTwoArrowSouthEast = computed(() => {
  return 100; // TODO: wire real data
});

const sumNodeTwoArrowsNorth = computed(() => {
  return (
    zaehlwertNodeTwoArrowNorthWest.value + zaehlwertNodeTwoArrowNorthEast.value
  );
});

const sumNodeTwoArrowsSouth = computed(() => {
  return (
    zaehlwertNodeTwoArrowSouthWest.value + zaehlwertNodeTwoArrowSouthEast.value
  );
});

const sumNodeTwoArrows = computed(() => {
  return sumNodeTwoArrowsNorth.value + sumNodeTwoArrowsSouth.value;
});

// Zaehlwerte of Node 3
const zaehlwertNodeThreeArrowWestNorth = computed(() => {
  return 800; // TODO: wire real data
});

const zaehlwertNodeThreeArrowWestSouth = computed(() => {
  return 200; // TODO: wire real data
});

const zaehlwertNodeThreeArrowEastNorth = computed(() => {
  return 900; // TODO: wire real data
});

const zaehlwertNodeThreeArrowEastSouth = computed(() => {
  return 100; // TODO: wire real data
});

const sumNodeThreeArrowsWest = computed(() => {
  return (
    zaehlwertNodeThreeArrowWestNorth.value +
    zaehlwertNodeThreeArrowWestSouth.value
  );
});

const sumNodeThreeArrowsEast = computed(() => {
  return (
    zaehlwertNodeThreeArrowEastNorth.value +
    zaehlwertNodeThreeArrowEastSouth.value
  );
});

const sumNodeThreeArrows = computed(() => {
  return sumNodeThreeArrowsWest.value + sumNodeThreeArrowsEast.value;
});

// Zaehlwerte of Node 4
const zaehlwertNodeFourArrowNorthWest = computed(() => {
  return 800; // TODO: wire real data
});

const zaehlwertNodeFourArrowNorthEast = computed(() => {
  return 200; // TODO: wire real data
});

const zaehlwertNodeFourArrowSouthWest = computed(() => {
  return 900; // TODO: wire real data
});

const zaehlwertNodeFourArrowSouthEast = computed(() => {
  return 100; // TODO: wire real data
});

const sumNodeFourArrowsNorth = computed(() => {
  return (
    zaehlwertNodeFourArrowNorthWest.value +
    zaehlwertNodeFourArrowNorthEast.value
  );
});

const sumNodeFourArrowsSouth = computed(() => {
  return (
    zaehlwertNodeFourArrowSouthWest.value +
    zaehlwertNodeFourArrowSouthEast.value
  );
});

const sumNodeFourArrows = computed(() => {
  return sumNodeFourArrowsNorth.value + sumNodeFourArrowsSouth.value;
});

// Zaehlwerte of Node 5
const zaehlwertNodeFiveArrowNorthWestNorthEast = computed(() => {
  return 800; // TODO: wire real data
});

const zaehlwertNodeFiveArrowNorthWestSouthWest = computed(() => {
  return 200; // TODO: wire real data
});

const zaehlwertNodeFiveArrowSouthEastNorthEast = computed(() => {
  return 900; // TODO: wire real data
});

const zaehlwertNodeFiveArrowSouthEastSouthWest = computed(() => {
  return 100; // TODO: wire real data
});

const sumNodeFiveArrowsNorthWest = computed(() => {
  return (
    zaehlwertNodeFiveArrowNorthWestNorthEast.value +
    zaehlwertNodeFiveArrowNorthWestSouthWest.value
  );
});

const sumNodeFiveArrowsSouthEast = computed(() => {
  return (
    zaehlwertNodeFiveArrowSouthEastNorthEast.value +
    zaehlwertNodeFiveArrowSouthEastSouthWest.value
  );
});

const sumNodeFiveArrows = computed(() => {
  return sumNodeFiveArrowsNorthWest.value + sumNodeFiveArrowsSouthEast.value;
});

// Zaehlwerte of Node 6
const zaehlwertNodeSixArrowNorthEastNorthWest = computed(() => {
  return 800; // TODO: wire real data
});

const zaehlwertNodeSixArrowNorthEastSouthEast = computed(() => {
  return 200; // TODO: wire real data
});

const zaehlwertNodeSixArrowSouthWestNorthWest = computed(() => {
  return 900; // TODO: wire real data
});

const zaehlwertNodeSixArrowSouthWestSouthEast = computed(() => {
  return 100; // TODO: wire real data
});

const sumNodeSixArrowsNorthEast = computed(() => {
  return (
    zaehlwertNodeSixArrowNorthEastNorthWest.value +
    zaehlwertNodeSixArrowNorthEastSouthEast.value
  );
});

const sumNodeSixArrowsSouthWest = computed(() => {
  return (
    zaehlwertNodeSixArrowSouthWestNorthWest.value +
    zaehlwertNodeSixArrowSouthWestSouthEast.value
  );
});

const sumNodeSixArrows = computed(() => {
  return sumNodeSixArrowsNorthEast.value + sumNodeSixArrowsSouthWest.value;
});

// Zaehlwerte of Node 7
const zaehlwertNodeSevenArrowNorthWestNorthEast = computed(() => {
  return 800; // TODO: wire real data
});

const zaehlwertNodeSevenArrowNorthWestSouthWest = computed(() => {
  return 200; // TODO: wire real data
});

const zaehlwertNodeSevenArrowSouthEastNorthEast = computed(() => {
  return 900; // TODO: wire real data
});

const zaehlwertNodeSevenArrowSouthEastSouthWest = computed(() => {
  return 100; // TODO: wire real data
});

const sumNodeSevenArrowsNorthWest = computed(() => {
  return (
    zaehlwertNodeSevenArrowNorthWestNorthEast.value +
    zaehlwertNodeSevenArrowNorthWestSouthWest.value
  );
});

const sumNodeSevenArrowsSouthEast = computed(() => {
  return (
    zaehlwertNodeSevenArrowSouthEastNorthEast.value +
    zaehlwertNodeSevenArrowSouthEastSouthWest.value
  );
});

const sumNodeSevenArrows = computed(() => {
  return sumNodeSevenArrowsNorthWest.value + sumNodeSevenArrowsSouthEast.value;
});

// Zaehlwerte of Node 8
const zaehlwertNodeEightArrowNorthEastNorthWest = computed(() => {
  return 800; // TODO: wire real data
});

const zaehlwertNodeEightArrowNorthEastSouthEast = computed(() => {
  return 200; // TODO: wire real data
});

const zaehlwertNodeEightArrowSouthWestNorthWest = computed(() => {
  return 900; // TODO: wire real data
});

const zaehlwertNodeEightArrowSouthWestSouthEast = computed(() => {
  return 100; // TODO: wire real data
});

const sumNodeEightArrowsNorthEast = computed(() => {
  return (
    zaehlwertNodeEightArrowNorthEastNorthWest.value +
    zaehlwertNodeEightArrowNorthEastSouthEast.value
  );
});

const sumNodeEightArrowsSouthWest = computed(() => {
  return (
    zaehlwertNodeEightArrowSouthWestNorthWest.value +
    zaehlwertNodeEightArrowSouthWestSouthEast.value
  );
});

const sumNodeEightArrows = computed(() => {
  return sumNodeEightArrowsNorthEast.value + sumNodeEightArrowsSouthWest.value;
});

// Arrows of Node 1
const selectedArrowsNodeOne =
  ref<Map<Himmelsrichtung, Array<Bewegungsrichtung>>>();

const colorNodeOneArrowWestNorth = computed<string>(() => {
  if (
    !selectedArrowsNodeOne.value
      ?.get(Himmelsrichtung.W)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(1) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeOneArrowWestSouth = computed<string>(() => {
  if (
    !selectedArrowsNodeOne.value
      ?.get(Himmelsrichtung.W)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(1) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeOneArrowEastNorth = computed<string>(() => {
  if (
    !selectedArrowsNodeOne.value
      ?.get(Himmelsrichtung.O)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(1) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeOneArrowEastSouth = computed<string>(() => {
  if (
    !selectedArrowsNodeOne.value
      ?.get(Himmelsrichtung.O)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(1) ??
    BelastungsplanConstants.inaktivColor
  );
});

// Arrows of Node 2
const selectedArrowsNodeTwo =
  ref<Map<Himmelsrichtung, Array<Bewegungsrichtung>>>();

const colorNodeTwoArrowNorthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeTwo.value
      ?.get(Himmelsrichtung.N)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(2) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeTwoArrowNorthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeTwo.value
      ?.get(Himmelsrichtung.N)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(2) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeTwoArrowSouthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeTwo.value
      ?.get(Himmelsrichtung.S)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(2) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeTwoArrowSouthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeTwo.value
      ?.get(Himmelsrichtung.S)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(2) ??
    BelastungsplanConstants.inaktivColor
  );
});

// Arrows of Node 3
const selectedArrowsNodeThree =
  ref<Map<Himmelsrichtung, Array<Bewegungsrichtung>>>();

const colorNodeThreeArrowWestNorth = computed<string>(() => {
  if (
    !selectedArrowsNodeThree.value
      ?.get(Himmelsrichtung.W)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(3) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeThreeArrowWestSouth = computed<string>(() => {
  if (
    !selectedArrowsNodeThree.value
      ?.get(Himmelsrichtung.W)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(3) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeThreeArrowEastNorth = computed<string>(() => {
  if (
    !selectedArrowsNodeThree.value
      ?.get(Himmelsrichtung.O)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(3) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeThreeArrowEastSouth = computed<string>(() => {
  if (
    !selectedArrowsNodeThree.value
      ?.get(Himmelsrichtung.O)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(3) ??
    BelastungsplanConstants.inaktivColor
  );
});

// Arrows of Node 4
const selectedArrowsNodeFour =
  ref<Map<Himmelsrichtung, Array<Bewegungsrichtung>>>();

const colorNodeFourArrowNorthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeFour.value
      ?.get(Himmelsrichtung.N)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(4) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeFourArrowNorthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeFour.value
      ?.get(Himmelsrichtung.N)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(4) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeFourArrowSouthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeFour.value
      ?.get(Himmelsrichtung.S)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(4) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeFourArrowSouthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeFour.value
      ?.get(Himmelsrichtung.S)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(4) ??
    BelastungsplanConstants.inaktivColor
  );
});

// Arrows of Node 5
const selectedArrowsNodeFive =
  ref<Map<Himmelsrichtung, Array<Bewegungsrichtung>>>();

const colorNodeFiveArrowNorthWestNorthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeFive.value
      ?.get(Himmelsrichtung.NW)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(5) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeFiveArrowNorthWestSouthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeFive.value
      ?.get(Himmelsrichtung.NW)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(5) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeFiveArrowSouthEastNorthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeFive.value
      ?.get(Himmelsrichtung.SO)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(5) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeFiveArrowSouthEastSouthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeFive.value
      ?.get(Himmelsrichtung.SO)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(5) ??
    BelastungsplanConstants.inaktivColor
  );
});

// Arrows of Node 6
const selectedArrowsNodeSix =
  ref<Map<Himmelsrichtung, Array<Bewegungsrichtung>>>();

const colorNodeSixArrowNorthEastNorthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeSix.value
      ?.get(Himmelsrichtung.NO)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(6) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeSixArrowNorthEastSouthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeSix.value
      ?.get(Himmelsrichtung.NO)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(6) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeSixArrowSouthWestNorthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeSix.value
      ?.get(Himmelsrichtung.SW)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(6) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeSixArrowSouthWestSouthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeSix.value
      ?.get(Himmelsrichtung.SW)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(6) ??
    BelastungsplanConstants.inaktivColor
  );
});

// Arrows of Node 7
const selectedArrowsNodeSeven =
  ref<Map<Himmelsrichtung, Array<Bewegungsrichtung>>>();

const colorNodeSevenArrowNorthWestNorthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeSeven.value
      ?.get(Himmelsrichtung.NW)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(7) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeSevenArrowNorthWestSouthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeSeven.value
      ?.get(Himmelsrichtung.NW)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(7) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeSevenArrowSouthEastNorthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeSeven.value
      ?.get(Himmelsrichtung.SO)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(7) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeSevenArrowSouthEastSouthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeSeven.value
      ?.get(Himmelsrichtung.SO)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(7) ??
    BelastungsplanConstants.inaktivColor
  );
});

// Arrows of Node 8
const selectedArrowsNodeEight =
  ref<Map<Himmelsrichtung, Array<Bewegungsrichtung>>>();

const colorNodeEightArrowNorthEastNorthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeEight.value
      ?.get(Himmelsrichtung.NO)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(8) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeEightArrowNorthEastSouthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeEight.value
      ?.get(Himmelsrichtung.NO)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(8) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeEightArrowSouthWestNorthWest = computed<string>(() => {
  if (
    !selectedArrowsNodeEight.value
      ?.get(Himmelsrichtung.SW)
      ?.includes(Bewegungsrichtung.AUS)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(8) ??
    BelastungsplanConstants.inaktivColor
  );
});

const colorNodeEightArrowSouthWestSouthEast = computed<string>(() => {
  if (
    !selectedArrowsNodeEight.value
      ?.get(Himmelsrichtung.SW)
      ?.includes(Bewegungsrichtung.EIN)
  )
    return BelastungsplanConstants.inaktivColor;
  return (
    BelastungsplanConstants.farben.get(8) ??
    BelastungsplanConstants.inaktivColor
  );
});

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

  streetnameNodeOne.value = fjs.getStreetname(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 1)
  );
  streetnameNodeTwo.value = fjs.getStreetname(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 2)
  );
  streetnameNodeThree.value = fjs.getStreetname(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 3)
  );
  streetnameNodeFour.value = fjs.getStreetname(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 4)
  );
  streetnameNodeFive.value = fjs.getStreetname(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 5)
  );
  streetnameNodeSix.value = fjs.getStreetname(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 6)
  );
  streetnameNodeSeven.value = fjs.getStreetname(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 7)
  );
  streetnameNodeEight.value = fjs.getStreetname(
    availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 8)
  );

  selectedArrowsNodeOne.value = fjs.computeSelectedArrowsOfNode(
    1,
    optionen.value.chosenLaengsverkehre
  );
  selectedArrowsNodeTwo.value = fjs.computeSelectedArrowsOfNode(
    2,
    optionen.value.chosenLaengsverkehre
  );
  selectedArrowsNodeThree.value = fjs.computeSelectedArrowsOfNode(
    3,
    optionen.value.chosenLaengsverkehre
  );
  selectedArrowsNodeFour.value = fjs.computeSelectedArrowsOfNode(
    4,
    optionen.value.chosenLaengsverkehre
  );
  selectedArrowsNodeFive.value = fjs.computeSelectedArrowsOfNode(
    5,
    optionen.value.chosenLaengsverkehre
  );
  selectedArrowsNodeSix.value = fjs.computeSelectedArrowsOfNode(
    6,
    optionen.value.chosenLaengsverkehre
  );
  selectedArrowsNodeSeven.value = fjs.computeSelectedArrowsOfNode(
    7,
    optionen.value.chosenLaengsverkehre
  );
  selectedArrowsNodeEight.value = fjs.computeSelectedArrowsOfNode(
    8,
    optionen.value.chosenLaengsverkehre
  );
});

watch(
  [
    () => props.data,
    () => activeZaehlung.value.laengsverkehr,
    () => activeZaehlung.value.knotenarme,
    () => optionen.value.zeitauswahl,
    () => optionen.value.chosenLaengsverkehre,
  ],
  async () => {
    streetnameNodeOne.value = fjs.getStreetname(
      availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 1)
    );
    streetnameNodeTwo.value = fjs.getStreetname(
      availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 2)
    );
    streetnameNodeThree.value = fjs.getStreetname(
      availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 3)
    );
    streetnameNodeFour.value = fjs.getStreetname(
      availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 4)
    );
    streetnameNodeFive.value = fjs.getStreetname(
      availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 5)
    );
    streetnameNodeSix.value = fjs.getStreetname(
      availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 6)
    );
    streetnameNodeSeven.value = fjs.getStreetname(
      availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 7)
    );
    streetnameNodeEight.value = fjs.getStreetname(
      availableKnotenarme.value.find((kn: LadeKnotenarmDTO) => kn.nummer === 8)
    );

    selectedArrowsNodeOne.value = fjs.computeSelectedArrowsOfNode(
      1,
      optionen.value.chosenLaengsverkehre
    );
    selectedArrowsNodeTwo.value = fjs.computeSelectedArrowsOfNode(
      2,
      optionen.value.chosenLaengsverkehre
    );
    selectedArrowsNodeThree.value = fjs.computeSelectedArrowsOfNode(
      3,
      optionen.value.chosenLaengsverkehre
    );
    selectedArrowsNodeFour.value = fjs.computeSelectedArrowsOfNode(
      4,
      optionen.value.chosenLaengsverkehre
    );
    selectedArrowsNodeFive.value = fjs.computeSelectedArrowsOfNode(
      5,
      optionen.value.chosenLaengsverkehre
    );
    selectedArrowsNodeSix.value = fjs.computeSelectedArrowsOfNode(
      6,
      optionen.value.chosenLaengsverkehre
    );
    selectedArrowsNodeSeven.value = fjs.computeSelectedArrowsOfNode(
      7,
      optionen.value.chosenLaengsverkehre
    );
    selectedArrowsNodeEight.value = fjs.computeSelectedArrowsOfNode(
      8,
      optionen.value.chosenLaengsverkehre
    );
    await nextTick();

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
</script>
