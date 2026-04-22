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
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 33.4058px;
                  font-family: sans-serif-serif;
                  -inkscape-font-specification: &quot;sans-serif, Normal&quot;;
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
                "
                x="699.24969"
                y="709.21594"
                id="singlerow"
              >
                <tspan
                  id="tspan15"
                  style="stroke-width: 39.1848"
                  x="699.24969"
                  y="709.21594"
                >
                  {{ firstStreetname[0] }}
                </tspan>
              </text>
              <text
                v-if="firstStreetname.length > 1"
                xml:space="preserve"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 33.4058px;
                  font-family: sans-serif-serif;
                  -inkscape-font-specification: &quot;sans-serif, Normal&quot;;
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
                "
                id="multirow"
                x="699.24969"
                y="688.33734"
              >
                <tspan
                  id="tspan20"
                  style="stroke-width: 39.1848"
                  x="699.24969"
                  y="688.33734"
                >
                  {{ firstStreetname[0] }}
                </tspan>
                <tspan
                  id="tspan1"
                  style="stroke-width: 39.1848"
                  x="699.24969"
                  y="730.0946"
                >
                  {{ firstStreetname[1] }}
                </tspan>
              </text>
            </g>
          </g>
          <g id="arrows">
            <g
              id="arrow4"
              ref="groupRefArrowFour"
              :transform="transformArrowFour"
            >
              <path
                style="stroke-width: 40.9429"
                :d="dArrowFour"
                id="path4"
                :fill="colorArrowFour"
              />
              <path
                style="stroke-width: 78.3672"
                id="spike4"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                :fill="colorArrowFour"
                transform="matrix(0.09192953,0,0,0.07964786,-213.39551,-544.45264)"
              />
            </g>
            <g
              id="arrow3"
              ref="groupRefArrowThree"
              :transform="transformArrowThree"
            >
              <path
                style="stroke-width: 40.9429"
                :d="dArrowThree"
                id="path3"
                :fill="colorArrowThree"
              />
              <path
                style="stroke-width: 78.3672"
                id="spike3"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                :fill="colorArrowThree"
                transform="matrix(-0.09192953,0,0,-0.07964786,1613.3955,2182.4526)"
              />
            </g>
            <g
              id="arrow2"
              ref="groupRefArrowTwo"
              :transform="transformArrowTwo"
            >
              <path
                style="stroke-width: 40.943"
                :d="dArrowTwo"
                id="path2"
                :fill="colorArrowTwo"
              />
              <path
                style="stroke-width: 78.3672"
                id="spike2"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                :fill="colorArrowTwo"
                transform="matrix(0.09192953,0,0,0.07964786,-213.39551,-782.45264)"
              />
            </g>
            <g
              id="arrow1"
              ref="groupRefArrowOne"
              :transform="transformArrowOne"
            >
              <path
                style="stroke-width: 40.9431"
                :d="dArrowOne"
                id="path1"
                :fill="colorArrowOne"
              />
              <path
                style="stroke-width: 78.3672"
                id="spike1"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                :fill="colorArrowOne"
                transform="matrix(-0.09192953,0,0,-0.07964786,1613.3955,1944.4526)"
              />
            </g>
          </g>
          <g id="layer1">
            <g id="layer2">
              <text
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
                id="text3"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 28.0866px;
                  font-family: sans-serif-serif;
                  -inkscape-font-specification: &quot;Arial, Normal&quot;;
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
                x="376.95462"
                y="-93.991508"
              >
                <tspan
                  x="1533.9819"
                  y="693.90204"
                  id="tspan3"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: normal;
                    font-stretch: normal;
                    font-size: 28.0866px;
                    font-family: sans-serif-serif;
                    -inkscape-font-specification: &quot;Arial, Normal&quot;;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertArrowThree }}
                </tspan>
              </text>
              <text
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
                id="text4"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 28.0866px;
                  font-family: sans-serif-serif;
                  -inkscape-font-specification: &quot;Arial, Normal&quot;;
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
                x="376.95462"
                y="-45.435368"
              >
                <tspan
                  x="1533.9819"
                  y="742.45807"
                  id="tspan4"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: normal;
                    font-stretch: normal;
                    font-size: 28.0866px;
                    font-family: sans-serif-serif;
                    -inkscape-font-specification: &quot;Arial, Normal&quot;;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertArrowFour }}
                </tspan>
              </text>
              <path
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 1231.93,859.24999 h 98 v 2.45 h -98 z"
                id="path5-1"
              />
              <text
                xml:space="preserve"
                transform="scale(0.86675167,1.153733)"
                id="text5"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: sans-serif-serif;
                  -inkscape-font-specification: &quot;Arial, Bold&quot;;
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
                x="377.93076"
                y="-18.683392"
              >
                <tspan
                  x="1535.3855"
                  y="769.50153"
                  id="tspan5"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: sans-serif-serif;
                    -inkscape-font-specification: &quot;Arial, Bold&quot;;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumArrowsThreeFour }}
                </tspan>
              </text>
            </g>
            <g id="layer3">
              <text
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
                id="node4_north_west_number_text"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 28.0866px;
                  font-family: sans-serif-serif;
                  -inkscape-font-specification: &quot;Arial, Normal&quot;;
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
                x="-985.63147"
                y="-300.35461"
              >
                <tspan
                  x="171.3958"
                  y="487.53894"
                  id="node4_north_west_number_tspan"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: normal;
                    font-stretch: normal;
                    font-size: 28.0866px;
                    font-family: sans-serif-serif;
                    -inkscape-font-specification: &quot;Arial, Normal&quot;;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertArrowOne }}
                </tspan>
              </text>
              <path
                style="fill: #000000; fill-opacity: 1; stroke-width: 29.8746"
                d="m 50.47,621.25 h 98 v 2.45 h -98 z"
                id="path5"
              />
              <text
                xml:space="preserve"
                transform="scale(0.86707182,1.153307)"
                id="node4_north_east_number_text"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 28.0866px;
                  font-family: sans-serif-serif;
                  -inkscape-font-specification: &quot;Arial, Normal&quot;;
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
                x="-985.63147"
                y="-251.79846"
              >
                <tspan
                  x="171.3958"
                  y="536.09497"
                  id="node4_north_east_number_tspan"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: normal;
                    font-stretch: normal;
                    font-size: 28.0866px;
                    font-family: sans-serif-serif;
                    -inkscape-font-specification: &quot;Arial, Normal&quot;;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9482;
                  "
                >
                  {{ zaehlwertArrowTwo }}
                </tspan>
              </text>
              <text
                xml:space="preserve"
                transform="scale(0.86675167,1.153733)"
                id="node4_north_sum_text"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: sans-serif-serif;
                  -inkscape-font-specification: &quot;Arial, Bold&quot;;
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
                x="-985.15863"
                y="-224.97026"
              >
                <tspan
                  x="172.29607"
                  y="563.21466"
                  id="node4_north_sum_tspan"
                  style="
                    font-style: normal;
                    font-variant: normal;
                    font-weight: bold;
                    font-stretch: normal;
                    font-size: 28.097px;
                    font-family: sans-serif-serif;
                    -inkscape-font-specification: &quot;Arial, Bold&quot;;
                    font-variant-ligatures: normal;
                    font-variant-caps: normal;
                    font-variant-numeric: normal;
                    font-variant-east-asian: normal;
                    stroke-width: 43.9644;
                  "
                >
                  {{ sumArrowsOneTwo }}
                </tspan>
              </text>
            </g>
            <text
              xml:space="preserve"
              transform="scale(0.86675167,1.153733)"
              id="node4_sum_text"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: 28.097px;
                font-family: sans-serif-serif;
                -inkscape-font-specification: &quot;Arial, Bold&quot;;
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
              x="377.93076"
              y="-171.53239"
            >
              <tspan
                x="1535.3855"
                y="616.65204"
                id="node4_sum_tspan"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: sans-serif-serif;
                  -inkscape-font-specification: &quot;Arial, Bold&quot;;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 43.9644;
                "
              >
                {{ sumArrowsOneToFour }}
              </tspan>
            </text>
            <text
              xml:space="preserve"
              transform="scale(0.86675167,1.153733)"
              id="text2"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-stretch: normal;
                font-size: 28.097px;
                font-family: sans-serif-serif;
                -inkscape-font-specification: &quot;Arial, Bold&quot;;
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
              x="-985.15863"
              y="-171.53239"
            >
              <tspan
                x="172.29607"
                y="616.65204"
                id="tspan2"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: bold;
                  font-stretch: normal;
                  font-size: 28.097px;
                  font-family: sans-serif-serif;
                  -inkscape-font-specification: &quot;Arial, Bold&quot;;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 43.9644;
                "
              >
                {{ sumArrowsOneToFour }}
              </tspan>
            </text>
          </g>
        </g>
        <g id="legend">
          <g
            id="legend-zaehlinfo"
            style="stroke-width: 28.2205; stroke-dasharray: none"
            transform="translate(50.006244,31.659644)"
          >
            <text
              xml:space="preserve"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 19.7556px;
                font-family: sans-serif;
                -inkscape-font-specification: &quot;Sans, Normal&quot;;
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
              id="verkehrsart"
              x="168.24969"
              y="1230.3373"
              transform="matrix(1.000004,0,0,1,-152.56418,35.000043)"
            >
              <tspan
                x="168.24969"
                y="1230.3373"
                id="tspan8"
              >
                <tspan
                  style="
                    font-weight: bold;
                    -inkscape-font-specification: &quot;Sans Bold&quot;;
                  "
                  id="tspan7"
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
                xml:space="preserve"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 19.7556px;
                  font-family: sans-serif;
                  -inkscape-font-specification: &quot;Sans, Normal&quot;;
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
                id="zaehlzeit2-multirow"
                x="168"
                y="1210"
              >
                <tspan
                  x="168"
                  y="1210"
                  id="tspan9"
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
                xml:space="preserve"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 19.7556px;
                  font-family: sans-serif;
                  -inkscape-font-specification: &quot;Sans, Normal&quot;;
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
                id="zaehlzeit1-multirow"
                x="168.24969"
                y="1190.3373"
                transform="translate(-150.84646,0.00162031)"
              >
                <tspan
                  x="168.24969"
                  y="1190.3373"
                  id="tspan11"
                >
                  <tspan
                    style="
                      font-weight: bold;
                      -inkscape-font-specification: &quot;Sans Bold&quot;;
                    "
                    id="tspan10"
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
              id="compass2"
              d="m 399.4343,-24.60083 105.23313,182.26914 -210.46627,-1e-5 z"
              transform="matrix(0.16996929,0,0,0.4104001,81.91578,36.842952)"
            />
            <text
              xml:space="preserve"
              id="compass1"
              style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 24.6944px;
                font-family: RomanD;
                -inkscape-font-specification: &quot;RomanD, Normal&quot;;
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
              x="141.28348"
              y="93.924416"
            >
              <tspan
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 24.6944px;
                  font-family: RomanD;
                  -inkscape-font-specification: &quot;RomanD, Normal&quot;;
                  font-variant-ligatures: normal;
                  font-variant-caps: normal;
                  font-variant-numeric: normal;
                  font-variant-east-asian: normal;
                  stroke-width: 2.2868;
                "
                id="tspan6"
              >
                N
              </tspan>
            </text>
          </g>
          <g
            id="legend-massstab"
            transform="translate(-18.042256,33.984156)"
          >
            <g
              id="massstab-size1"
              style="stroke-width: 28.2205; stroke-dasharray: none"
              transform="matrix(0.62382516,0,0,0.76417899,670.41706,744.80969)"
            >
              <text
                xml:space="preserve"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 28.6128px;
                  font-family: sans-serif;
                  -inkscape-font-specification: &quot;Sans, Normal&quot;;
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
                id="massstab-size1-multirow"
                x="699.24969"
                y="688.33734"
                transform="translate(181.39362,6.9760325e-4)"
              >
                <tspan
                  x="699.24969"
                  y="688.33734"
                  id="tspan12"
                >
                  {{ highestZaehlwertRounded / 2 }}
                </tspan>
              </text>
            </g>
            <g
              id="massstab-size2"
              style="stroke-width: 28.2205; stroke-dasharray: none"
              transform="matrix(0.62382516,0,0,0.76417899,423.85279,750.20592)"
            >
              <text
                xml:space="preserve"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 28.6128px;
                  font-family: sans-serif;
                  -inkscape-font-specification: &quot;Sans, Normal&quot;;
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
                id="massstab-size2-multirow"
                x="699.24969"
                y="688.33734"
                transform="translate(670.97788,-7.8186747)"
              >
                <tspan
                  x="699.24969"
                  y="688.33734"
                  id="tspan13"
                >
                  {{ highestZaehlwertRounded }}
                </tspan>
              </text>
            </g>
            <path
              style="
                fill: #000000;
                stroke: #000000;
                stroke-width: 0.802209;
                stroke-linecap: square;
                stroke-miterlimit: 2.5;
                stroke-dasharray: none;
              "
              d="m 1244.823,1240.0379 c 0.4871,10.937 0.4871,10.8003 0.4871,10.8003 v 0"
              id="massstab-path2"
            />
            <path
              style="
                fill: none;
                stroke: #000000;
                stroke-width: 0.880777;
                stroke-linecap: square;
                stroke-miterlimit: 2.5;
                stroke-dasharray: none;
              "
              d="m 1300.4928,1251.6987 -119.9017,-0.2413 119.9017,-22.432 z"
              id="path6"
            />
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
                xml:space="preserve"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 19.7556px;
                  font-family: sans-serif;
                  -inkscape-font-specification: &quot;Sans, Normal&quot;;
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
                id="zaehlstelle2-multirow"
                x="699.24969"
                y="688.33734"
                transform="translate(324.11416)"
              >
                <tspan
                  x="699.24969"
                  y="688.33734"
                  id="tspan14"
                >
                  Stadtbezirk
                  {{ zaehlstelleStore.getZaehlstelleHeader.stadtbezirkNummer }}
                </tspan>
                <tspan
                  x="699.24969"
                  y="713.03187"
                  id="tspan16"
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
                xml:space="preserve"
                style="
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-stretch: normal;
                  font-size: 19.7556px;
                  font-family: sans-serif;
                  -inkscape-font-specification: &quot;Sans, Normal&quot;;
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
                id="zaehlstelle1-multirow"
                x="699.24969"
                y="688.33734"
                transform="translate(324.11416)"
              >
                <tspan
                  x="699.24969"
                  y="688.33734"
                  id="tspan18"
                >
                  <tspan
                    style="
                      font-weight: bold;
                      -inkscape-font-specification: &quot;Sans Bold&quot;;
                    "
                    id="tspan17"
                  >
                    Zählstelle
                    {{ zaehlstelleStore.getZaehlstelleHeader.nummer }}
                  </tspan>
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
import type BelastungsplanQJSDataDTO from "@/types/zaehlung/zaehldaten/BelastungsplanQJSDataDTO";
import type LadeBelastungsplanQJSDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanQJSDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { first } from "lodash";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import { BelastungsplanConstants } from "@/components/zaehlstelle/charts/BelastungsplanConstants";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import BelastungsplanTyp from "@/types/enum/BelastungsplanTyp";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import { useDateUtils } from "@/util/DateUtils";
import { useQjs } from "@/util/QjsUtils";

interface Props {
  data: LadeBelastungsplanQJSDTO;
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

function getArrowScale(zaelwert: number) {
  const max = highestZaehlwert.value;
  if (!Number.isFinite(max) || max <= 0) return 0;
  const scale = Math.max(zaelwert, 0) / max;
  return Math.max(BelastungsplanConstants.minimum_arrow_scale, scale);
}

function computeAnchorY(el: SVGGraphicsElement | null) {
  if (!el) return 0;
  // getBBox ist DOM-API; liefert x,y,width,height in user units
  const bbox = el.getBBox();
  return bbox.y + bbox.height / 2;
}

function scaleTransform(scaleY: number, centerY: number) {
  if (!Number.isFinite(scaleY) || scaleY === 1) return null;
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
const dArrowOne = "m 245,567 v -28 h 945 v 27.998 z";
const dArrowTwo = "m 210,623 v -28 h 945 v 27.997 z";
const dArrowThree = "m 245,804.99999 v -28 h 945 v 27.997 z";
const dArrowFour = "m 210,860.99999 v -28 h 945 v 27.997 z";

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
  }
  else if (availableKnotenarmNummern.value.includes(2)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.N
    )?.value;
  }
  else if (availableKnotenarmNummern.value.includes(5)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.NW
    )?.value;
  }
  else if (availableKnotenarmNummern.value.includes(6)) {
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
  }
  else if (availableKnotenarmNummern.value.includes(2)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.S
    )?.value;
  }
  else if (availableKnotenarmNummern.value.includes(5)) {
    sum = props.data.value1.valuesStrassenseite.find(
      (k) => k.strassenseite === Himmelsrichtung.SO
    )?.value;
  }
  else if (availableKnotenarmNummern.value.includes(6)) {
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

  firstStreetname.value = qjs.getStreetname(first(availableKnotenarme.value));

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
    firstStreetname.value = qjs.getStreetname(first(availableKnotenarme.value));
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
): data is LadeBelastungsplanQJSDTO {
  return !!data && data.belastungsplanTyp === BelastungsplanTyp.QJS;
}
</script>
