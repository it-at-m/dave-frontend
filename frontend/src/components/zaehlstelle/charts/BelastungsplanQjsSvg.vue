<template>
  <v-sheet
    id="belastungsplan-zaehlstelle"
  >
    <svg
        :width="dimension"
        :height="dimension"
        viewBox="0 0 1400 1400"
        version="1.1"
        id="svg1"
        fill-rule="evenodd"
        stroke-width="28.222"
        stroke-linejoin="round"
        preserveAspectRatio="xMidYMid"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg">
      <defs
          id="defs1" />
      <g
          id="root">
        <g
            id="querschnitt"
            :transform="rotateSvg"
        >
          <g
              id="description">
            <g
                id="first_street">
              <text
                  v-if="firstStreetname.length > 1"
                  xml:space="preserve"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:33.4058px;font-family:sans-serif-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:middle;fill:#000000;stroke-width:39.1848"
                  x="699.24969"
                  y="709.21594"
                  id="singlerow"><tspan
               id="tspan15"
               style="stroke-width:39.1848"
               x="699.24969"
               y="709.21594">{{ firstStreetname[0] }}</tspan></text>
              <text
                  v-if="firstStreetname.length === 1 || firstStreetname.length === 3"
                  xml:space="preserve"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:33.4058px;font-family:sans-serif-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:middle;fill:#000000;stroke-width:39.1848"
                  id="multirow"
                  x="699.24969"
                  y="688.33734"><tspan
               id="tspan20"
               style="stroke-width:39.1848"
               x="699.24969"
               y="688.33734">{{firstStreetname.length === 1 ? firstStreetname[0] : firstStreetname[1] }}</tspan><tspan v-if="firstStreetname.length > 1"
                  id="tspan1"
                  style="stroke-width:39.1848"
                  x="699.24969"
                  y="730.0946">{{firstStreetname.length === 2 ? firstStreetname[1] : firstStreetname[2] }}</tspan></text>
            </g>
          </g>
          <g
              id="arrows">
            <g
                id="arrow4"
                ref="arrowFourGroupRef"
                :transform="transformFour"
            >
              <path
                  style="stroke-width:40.9429"
                  :d="dArrowFour"
                  id="path4"
                  :fill="colorArrowFour"
              />
              <path
                  style="stroke-width:78.3672"
                  id="spike4"
                  d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                  :fill="colorArrowFour"
                  transform="matrix(0.09192953,0,0,0.07964786,-213.39551,-544.45264)" />
            </g>
            <g
                id="arrow3"
                ref="arrowThreeGroupRef"
                :transform="transformThree"
            >
              <path
                  style="stroke-width:40.9429"
                  :d="dArrowThree"
                  id="path3"
                  :fill="colorArrowThree"
              />
              <path
                  style="stroke-width:78.3672"
                  id="spike3"
                  d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                  :fill="colorArrowThree"
                  transform="matrix(-0.09192953,0,0,-0.07964786,1613.3955,2182.4526)" />
            </g>
            <g
                id="arrow2"
                ref="arrowTwoGroupRef"
                :transform="transformTwo"
            >
              <path
                  style="stroke-width:40.943"
                  :d="dArrowTwo"
                  id="path2"
                  :fill="colorArrowTwo"
              />
              <path
                  style="stroke-width:78.3672"
                  id="spike2"
                  d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                  :fill="colorArrowTwo"
                  transform="matrix(0.09192953,0,0,0.07964786,-213.39551,-782.45264)" />
            </g>
            <g
                id="arrow1"
                ref="arrowOneGroupRef"
                :transform="transformOne"
            >
              <path
                  style="stroke-width:40.9431"
                  :d="dArrowOne"
                  id="path1"
                  :fill="colorArrowOne"
              />
              <path
                  style="stroke-width:78.3672"
                  id="spike1"
                  d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                  :fill="colorArrowOne"
                  transform="matrix(-0.09192953,0,0,-0.07964786,1613.3955,1944.4526)" />
            </g>
          </g>
          <g
              id="layer1">
            <g
                id="layer2">
              <text
                  xml:space="preserve"
                  transform="scale(0.86707182,1.153307)"
                  id="text3"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9482"
                  x="376.95462"
                  y="-93.991508"><tspan
               x="1533.9819"
               y="693.90204"
               id="tspan3"
               style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9482">{{ zaehlwertThree }}</tspan></text>
              <text
                  xml:space="preserve"
                  transform="scale(0.86707182,1.153307)"
                  id="text4"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9482"
                  x="376.95462"
                  y="-45.435368"><tspan
               x="1533.9819"
               y="742.45807"
               id="tspan4"
               style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9482">{{ zaehlwertFour }}</tspan></text>
              <path
                  style="fill:#000000;fill-opacity:1;stroke-width:29.8746"
                  d="m 1231.93,859.24999 h 98 v 2.45 h -98 z"
                  id="path5-1" />
              <text
                  xml:space="preserve"
                  transform="scale(0.86675167,1.153733)"
                  id="text5"
                  style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9644"
                  x="377.93076"
                  y="-18.683392"><tspan
               x="1535.3855"
               y="769.50153"
               id="tspan5"
               style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9644">{{ summeThreeFour }}</tspan></text>
            </g>
            <g
                id="layer3">
              <text
                  xml:space="preserve"
                  transform="scale(0.86707182,1.153307)"
                  id="node4_north_west_number_text"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9482"
                  x="-985.63147"
                  y="-300.35461"><tspan
               x="171.3958"
               y="487.53894"
               id="node4_north_west_number_tspan"
               style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9482">{{ zaehlwertOne }}</tspan></text>
              <path
                  style="fill:#000000;fill-opacity:1;stroke-width:29.8746"
                  d="m 50.47,621.25 h 98 v 2.45 h -98 z"
                  id="path5" />
              <text
                  xml:space="preserve"
                  transform="scale(0.86707182,1.153307)"
                  id="node4_north_east_number_text"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9482"
                  x="-985.63147"
                  y="-251.79846"><tspan
               x="171.3958"
               y="536.09497"
               id="node4_north_east_number_tspan"
               style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.0866px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9482">{{ zaehlwertTwo }}</tspan></text>
              <text
                  xml:space="preserve"
                  transform="scale(0.86675167,1.153733)"
                  id="node4_north_sum_text"
                  style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9644"
                  x="-985.15863"
                  y="-224.97026"><tspan
               x="172.29607"
               y="563.21466"
               id="node4_north_sum_tspan"
               style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9644">{{ summeOneTwo }}</tspan></text>
            </g>
            <text
                xml:space="preserve"
                transform="scale(0.86675167,1.153733)"
                id="node4_sum_text"
                style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9644"
                x="377.93076"
                y="-171.53239"><tspan
             x="1535.3855"
             y="616.65204"
             id="node4_sum_tspan"
             style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9644">{{ summeOneToFour }}</tspan></text>
            <text
                xml:space="preserve"
                transform="scale(0.86675167,1.153733)"
                id="text2"
                style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:rl-tb;direction:rtl;white-space:pre;display:inline;fill:#000000;fill-opacity:1;stroke-width:43.9644"
                x="-985.15863"
                y="-171.53239"><tspan
             x="172.29607"
             y="616.65204"
             id="tspan2"
             style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:28.097px;font-family:sans-serif-serif;-inkscape-font-specification:'Arial, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:43.9644">{{ summeOneToFour }}</tspan></text>
          </g>
        </g>
        <g
            id="legend">
          <g
              id="legend-zaehlinfo"
              style="stroke-width:28.2205;stroke-dasharray:none"
              transform="translate(50.006244,31.659644)">
            <text
                xml:space="preserve"
                style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:19.7556px;font-family:sans-serif;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:268.729;display:inline;fill:#000000;stroke-width:28.2205;stroke-dasharray:none"
                id="verkehrsart"
                x="168.24969"
                y="1230.3373"
                transform="matrix(1.000004,0,0,1,-152.56418,35.000043)"><tspan
             x="168.24969"
             y="1230.3373"
             id="tspan8"><tspan
               style="font-weight:bold;-inkscape-font-specification:'Sans Bold'"
               id="tspan7">{{ optionen.radverkehr ? 'RAD' : 'FUSS' }}</tspan></tspan></text>
            <g
                id="zaehlzeit2"
                style="stroke-width:28.2205;stroke-dasharray:none"
                transform="translate(-152.29421)">
              <text
                  xml:space="preserve"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:19.7556px;font-family:sans-serif;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:268.729;display:inline;fill:#000000;stroke-width:28.2205;stroke-dasharray:none"
                  id="zaehlzeit2-multirow"
                  x="168"
                  y="1210"><tspan
               x="168"
               y="1210"
               id="tspan9">{{ zaehlzeit2 }}</tspan></text>
            </g>
            <g
                id="zaehlzeit1"
                style="stroke-width:28.2205;stroke-dasharray:none">
              <text
                  xml:space="preserve"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:19.7556px;font-family:sans-serif;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:268.729;display:inline;fill:#000000;stroke-width:28.2205;stroke-dasharray:none"
                  id="zaehlzeit1-multirow"
                  x="168.24969"
                  y="1190.3373"
                  transform="translate(-150.84646,0.00162031)"><tspan
               x="168.24969"
               y="1190.3373"
               id="tspan11"><tspan
                 style="font-weight:bold;-inkscape-font-specification:'Sans Bold'"
                 id="tspan10">{{ optionen.zeitauswahl }}</tspan></tspan></text>
            </g>
          </g>
          <g
              id="legend-compass"
              transform="matrix(0.79169692,0,0,0.78817168,-25.092397,5.5190685)">
            <path
                style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:3.35093;stroke-linecap:butt;stroke-miterlimit:2.5;stroke-dasharray:none;stroke-opacity:1"
                id="compass2"
                d="m 399.4343,-24.60083 105.23313,182.26914 -210.46627,-1e-5 z"
                transform="matrix(0.16996929,0,0,0.4104001,81.91578,36.842952)" />
            <text
                xml:space="preserve"
                id="compass1"
                style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:24.6944px;font-family:RomanD;-inkscape-font-specification:'RomanD, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;stroke-width:2.2868"
                x="141.28348"
                y="93.924416"><tspan
             style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:24.6944px;font-family:RomanD;-inkscape-font-specification:'RomanD, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:2.2868"
             id="tspan6">N</tspan></text>
          </g>
          <g
              id="legend-massstab"
              transform="translate(-18.042256,33.984156)">
            <g
                id="massstab-size1"
                style="stroke-width:28.2205;stroke-dasharray:none"
                transform="matrix(0.62382516,0,0,0.76417899,670.41706,744.80969)">
              <text
                  xml:space="preserve"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.6128px;font-family:sans-serif;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:268.729;display:inline;fill:#000000;stroke-width:28.2205;stroke-dasharray:none"
                  id="massstab-size1-multirow"
                  x="699.24969"
                  y="688.33734"
                  transform="translate(181.39362,6.9760325e-4)"><tspan
               x="699.24969"
               y="688.33734"
               id="tspan12">{{ highestZaehlwertRounded / 2 }}</tspan></text>
            </g>
            <g
                id="massstab-size2"
                style="stroke-width:28.2205;stroke-dasharray:none"
                transform="matrix(0.62382516,0,0,0.76417899,423.85279,750.20592)">
              <text
                  xml:space="preserve"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:28.6128px;font-family:sans-serif;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:268.729;display:inline;fill:#000000;stroke-width:28.2205;stroke-dasharray:none"
                  id="massstab-size2-multirow"
                  x="699.24969"
                  y="688.33734"
                  transform="translate(670.97788,-7.8186747)"><tspan
               x="699.24969"
               y="688.33734"
               id="tspan13">{{ highestZaehlwertRounded }}</tspan></text>
            </g>
            <path
                style="fill:#000000;stroke:#000000;stroke-width:0.802209;stroke-linecap:square;stroke-miterlimit:2.5;stroke-dasharray:none"
                d="m 1244.823,1240.0379 c 0.4871,10.937 0.4871,10.8003 0.4871,10.8003 v 0"
                id="massstab-path2" />
            <path
                style="fill:none;stroke:#000000;stroke-width:0.880777;stroke-linecap:square;stroke-miterlimit:2.5;stroke-dasharray:none"
                d="m 1300.4928,1251.6987 -119.9017,-0.2413 119.9017,-22.432 z"
                id="path6" />
          </g>
          <g
              id="legend-zaehlstelle"
              transform="translate(-112.62637,-13.999124)">
            <g
                id="zaehlstelle2"
                style="stroke-width:28.2205;stroke-dasharray:none"
                transform="translate(163.18555,-589.09456)">
              <text
                  v-if="zaehlstelleStore.getZaehlstelleHeader.stadtbezirkNummer"
                  xml:space="preserve"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:19.7556px;font-family:sans-serif;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:268.729;display:inline;fill:#000000;stroke-width:28.2205;stroke-dasharray:none"
                  id="zaehlstelle2-multirow"
                  x="699.24969"
                  y="688.33734"
                  transform="translate(324.11416)"><tspan
               x="699.24969"
               y="688.33734"
               id="tspan14">Stadtbezirk {{ zaehlstelleStore.getZaehlstelleHeader.stadtbezirkNummer }}
</tspan><tspan
                  x="699.24969"
                  y="713.03187"
                  id="tspan16">Zähldatum: {{ dateUtils.getShortVersionOfDate(new Date(activeZaehlung.datum)) }}</tspan></text>
            </g>
            <g
                id="zaehlstelle1"
                style="stroke-width:28.2205;stroke-dasharray:none"
                transform="translate(162.09712,-614.70735)">
              <text
                  xml:space="preserve"
                  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:19.7556px;font-family:sans-serif;-inkscape-font-specification:'Sans, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;white-space:pre;inline-size:268.729;display:inline;fill:#000000;stroke-width:28.2205;stroke-dasharray:none"
                  id="zaehlstelle1-multirow"
                  x="699.24969"
                  y="688.33734"
                  transform="translate(324.11416)"><tspan
               x="699.24969"
               y="688.33734"
               id="tspan18"><tspan
                 style="font-weight:bold;-inkscape-font-specification:'Sans Bold'"
                 id="tspan17">Zählstelle {{ zaehlstelleStore.getZaehlstelleHeader.nummer }}</tspan></tspan></text>
            </g>
          </g>
        </g>
      </g>
    </svg>

  </v-sheet>
</template>

<script setup lang="ts">
import type LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import { useDisplay } from "vuetify";
import { first } from "lodash";
import { computed, onMounted, ref, watch, nextTick } from "vue";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import KnotenarmComparator from "@/util/KnotenarmComparator";
import {useZaehlstelleStore} from "@/store/ZaehlstelleStore";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type VerkehrsbeziehungQJS from "@/types/zaehlung/VerkehrsbeziehungQJS";
import { BelastungsplanConstants } from "@/components/zaehlstelle/charts/BelastungsplanConstants";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitblock, {zeitblockInfo} from "@/types/enum/Zeitblock";
import {zeitblockStuendlichInfo} from "@/types/enum/ZeitblockStuendlich";
import type {StartEndeUhrzeitIntervalls} from "@/types/zaehlung/StartEndeUhrzeitIntervalls";
import {useDateUtils} from "@/util/DateUtils";

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

const firstStreetname = ref<Array<string>>([]);

// Refs zu den arrow-Gruppen (statt nur den path-Elementen)
const arrowOneGroupRef = ref<SVGGElement | null>(null)
const arrowTwoGroupRef = ref<SVGGElement | null>(null)
const arrowThreeGroupRef = ref<SVGGElement | null>(null)
const arrowFourGroupRef = ref<SVGGElement | null>(null)

// berechnete Anker-Y-Werte (werden per getBBox ermittelt)
const centerYArrowOne = ref(0)
const centerYArrowTwo = ref(0)
const centerYArrowThree = ref(0)
const centerYArrowFour = ref(0)

function getArrowScale(zaelwert: number) {
  return zaelwert / highestZaehlwert.value;
}

function computeAnchorY(el: SVGGraphicsElement | null) {
  if (!el) return 0
  // getBBox ist DOM-API; liefert x,y,width,height in user units
  const bbox = el.getBBox()
  return bbox.y + bbox.height / 2
}

function scaleTransform(scaleY: number, centerY: number) {
  if (!scaleY || scaleY === 1) return null
  return `translate(0 ${centerY}) scale(1 ${scaleY}) translate(0 ${-centerY})`
}

function calculateMassstabSizeTransform(baseTransform: string){
  // originaler translate-Wert aus der Template-Vorlage
  const base = 'translate(181.39362,6.9760325e-4)';
  // gewünschte Verschiebung in "sichtbaren" Pixeln (anpassen nach Bedarf)
  const desiredPixelShift = 10;

  // Die Gruppe hat die matrix(...) mit scaleX = 0.62382516 (siehe transform der Gruppe).
  // Weil Kind-Transforms von der Gruppen-Skalierung betroffen sind, muss
  // eine visuelle Pixelverschiebung durch scaleX geteilt werden.
  const groupScaleX = 0.62382516;

  const value = Number(highestZaehlwertRounded.value ?? 0) / 2;

  let offsetPx = 0;
  if (value < 1000) {
    offsetPx = desiredPixelShift;
  } else if (value > 10000) {
    offsetPx = -desiredPixelShift;
  } else {
    offsetPx = 0;
  }

  const offsetInGroupUnits = offsetPx === 0 ? 0 : offsetPx / groupScaleX;

  // Wir hängen eine zusätzliche translate an den bestehenden transform an.
  return `${base} translate(${offsetInGroupUnits}, 0)`;
}

const transformOne = computed(() => scaleTransform(getArrowScale(zaehlwertOne.value), centerYArrowOne.value))
const transformTwo = computed(() => scaleTransform(getArrowScale(zaehlwertTwo.value), centerYArrowTwo.value))
const transformThree = computed(() => scaleTransform(getArrowScale(zaehlwertThree.value), centerYArrowThree.value))
const transformFour = computed(() => scaleTransform(getArrowScale(zaehlwertFour.value), centerYArrowFour.value))

// --- Pfad-Daten
const dArrowOne = 'm 245,567 v -28 h 945 v 27.998 z'
const dArrowTwo = 'm 210,623 v -28 h 945 v 27.997 z'
const dArrowThree = 'm 245,804.99999 v -28 h 945 v 27.997 z'
const dArrowFour = 'm 210,860.99999 v -28 h 945 v 27.997 z'

const arrowOnePatterns = [
  { knotenarm: 1, nach: 3, strassenseite: Himmelsrichtung.W },
  { knotenarm: 2, nach: 4, strassenseite: Himmelsrichtung.N },
  { knotenarm: 5, nach: 7, strassenseite: Himmelsrichtung.NW },
  { knotenarm: 6, nach: 8, strassenseite: Himmelsrichtung.NO }
];

const arrowTwoPatterns = [
  { knotenarm: 3, nach: 1, strassenseite: Himmelsrichtung.W },
  { knotenarm: 4, nach: 2, strassenseite: Himmelsrichtung.N },
  { knotenarm: 7, nach: 5, strassenseite: Himmelsrichtung.NW },
  { knotenarm: 8, nach: 6, strassenseite: Himmelsrichtung.NO }
];

const arrowThreePatterns = [
  { knotenarm: 1, nach: 3, strassenseite: Himmelsrichtung.O },
  { knotenarm: 2, nach: 4, strassenseite: Himmelsrichtung.S },
  { knotenarm: 5, nach: 7, strassenseite: Himmelsrichtung.SO },
  { knotenarm: 6, nach: 8, strassenseite: Himmelsrichtung.SW }
];

const arrowFourPatterns = [
  { knotenarm: 3, nach: 1, strassenseite: Himmelsrichtung.O },
  { knotenarm: 4, nach: 2, strassenseite: Himmelsrichtung.S },
  { knotenarm: 7, nach: 5, strassenseite: Himmelsrichtung.SO },
  { knotenarm: 8, nach: 6, strassenseite: Himmelsrichtung.SW }
];

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const availableKnotenarmNummern = computed(() => {
  return availableKnotenarme.value.map((arm) => arm.nummer);
});

const availableKnotenarme = computed(() => {
  const nodes: LadeKnotenarmDTO[] = [];
  activeZaehlung.value.verkehrsbeziehungen.forEach((vb) => {
    const nr = vb.knotenarm
    const kn = activeZaehlung.value.knotenarme.find((kn) => kn.nummer === nr);
    if (kn) {
      nodes.push(kn);
    }
  })
  return nodes.toSorted(KnotenarmComparator.sortByNumber)
      .reverse();
});

const rotateSvg = computed(() => {
  // Die Viewbox der SVG liegt bei 1400 1400. Die Rotation muss in deren Zentrum stattfinden, daher 700 700
  let rotation = "rotate(0,700,700)";
  if (availableKnotenarmNummern.value.includes(1)) {
    rotation = "rotate(-90,700,700)";
  }
  if (availableKnotenarmNummern.value.includes(2)) {
    rotation = "rotate(0,700,700)";
  }
  if (availableKnotenarmNummern.value.includes(5)) {
    rotation = "rotate(-45,700,700)";
  }
  if (availableKnotenarmNummern.value.includes(6)) {
    rotation = "rotate(45,700,700)";
  }
  return rotation;
});

const isSelectedArrowOne = computed(() => {
  return hasAnyArrowPatternIn(optionen.value?.verkehrsbeziehungenQJS, arrowOnePatterns);
})

const isSelectedArrowTwo = computed(() => {
  return hasAnyArrowPatternIn(optionen.value?.verkehrsbeziehungenQJS, arrowTwoPatterns);
})

const isSelectedArrowThree = computed(() => {
  return hasAnyArrowPatternIn(optionen.value?.verkehrsbeziehungenQJS, arrowThreePatterns);
})

const isSelectedArrowFour = computed(() => {
  return hasAnyArrowPatternIn(optionen.value?.verkehrsbeziehungenQJS, arrowFourPatterns);
})

const zaehlwertOne = computed(() => {
  return 800; // TODO
})

const zaehlwertTwo = computed(() => {
  return 200; // TODO
})

const zaehlwertThree = computed(() => {
  return 900; // TODO
})

const zaehlwertFour = computed(() => {
  return 100; // TODO
})

const summeOneTwo = computed(() => {
  return zaehlwertOne.value + zaehlwertTwo.value;
})

const summeThreeFour = computed(() => {
  return zaehlwertThree.value + zaehlwertFour.value;
})

const summeOneToFour = computed(() => {
  return summeOneTwo.value + summeThreeFour.value;
})

const highestZaehlwert = computed(() => {
  return Math.max(zaehlwertOne.value, zaehlwertTwo.value, zaehlwertThree.value, zaehlwertFour.value);
})

const highestZaehlwertRounded = computed(() => {
  const v = Number(highestZaehlwert.value ?? 0);
  const ceil = Math.ceil(v / 1000) * 1000;
  return v % 1000 === 0 ? v + 1000 : ceil;
})

const colorArrowOne = computed<string>(() => {
  if (!isSelectedArrowOne.value)
    return BelastungsplanConstants.inaktivColor;
  return calculateColorOneOrTwo();
});

const colorArrowTwo = computed<string>(() => {
  if (!isSelectedArrowTwo.value)
    return BelastungsplanConstants.inaktivColor;
  return calculateColorOneOrTwo();
});
const colorArrowThree = computed<string>(() => {
  if (!isSelectedArrowThree.value)
    return BelastungsplanConstants.inaktivColor;
  return calculateColorThreeOrFour();
});
const colorArrowFour = computed<string>(() => {
  if (!isSelectedArrowFour.value)
    return BelastungsplanConstants.inaktivColor;
  return calculateColorThreeOrFour();
});

function calculateColorOneOrTwo(){
  if (availableKnotenarmNummern.value.includes(1))
    return BelastungsplanConstants.farben.get(1) ?? BelastungsplanConstants.inaktivColor
  if (availableKnotenarmNummern.value.includes(2))
    return BelastungsplanConstants.farben.get(2) ?? BelastungsplanConstants.inaktivColor
  if (availableKnotenarmNummern.value.includes(5))
    return BelastungsplanConstants.farben.get(5) ?? BelastungsplanConstants.inaktivColor
  if (availableKnotenarmNummern.value.includes(6))
    return BelastungsplanConstants.farben.get(6) ?? BelastungsplanConstants.inaktivColor
  return BelastungsplanConstants.inaktivColor;
}

function calculateColorThreeOrFour() {
  if (availableKnotenarmNummern.value.includes(3))
    return BelastungsplanConstants.farben.get(3) ?? BelastungsplanConstants.inaktivColor
  if (availableKnotenarmNummern.value.includes(4))
    return BelastungsplanConstants.farben.get(4) ?? BelastungsplanConstants.inaktivColor
  if (availableKnotenarmNummern.value.includes(7))
    return BelastungsplanConstants.farben.get(7) ?? BelastungsplanConstants.inaktivColor
  if (availableKnotenarmNummern.value.includes(8))
    return BelastungsplanConstants.farben.get(8) ?? BelastungsplanConstants.inaktivColor
  return BelastungsplanConstants.inaktivColor;
}

function matchesArrowPattern(verkehrsbeziehung: VerkehrsbeziehungQJS, arrowPattern: VerkehrsbeziehungQJS) {
  return verkehrsbeziehung.knotenarm === arrowPattern.knotenarm && verkehrsbeziehung.nach === arrowPattern.nach && verkehrsbeziehung.strassenseite === arrowPattern.strassenseite;
}

function hasAnyArrowPatternIn(verkehrsbeziehungen: Array<VerkehrsbeziehungQJS>, arrowPatterns: VerkehrsbeziehungQJS[]) {
  return !!verkehrsbeziehungen?.some(vb => arrowPatterns.some(p => matchesArrowPattern(vb, p)));
}

onMounted(() => {
  zaehlstelleStore.setSizeBelastungsplanSvg(
    Number.parseInt(sizeBelastungsplan.value.replace("px", ""))
  );
  zaehlstelleStore.setMaxSizeBelastungsplanSvg(maxSizeBelastungsplan.value);
  zaehlstelleStore.setMinSizeBelastungsplanSvg(minSizeBelastungsplan.value);

  prepareStreetnames();

  // Berechne Anker aus der gesamten Gruppe (Rumpf + Spitze)
  if (arrowOneGroupRef.value) centerYArrowOne.value = computeAnchorY(arrowOneGroupRef.value)
  if (arrowTwoGroupRef.value) centerYArrowTwo.value = computeAnchorY(arrowTwoGroupRef.value)

});

watch(
    () => activeZaehlung.value.knotenarme,
    async () => {
      prepareStreetnames();
      // Warte auf DOM-Update, damit arrowOneGroupRef / arrowTwoGroupRef gesetzt/aktualisiert wird
      // Andernfalls wird nur rotateSvg ausgeführt, was zur Verschiebung der Pfeile führt.
      await nextTick();
      if (arrowOneGroupRef.value) {
        centerYArrowOne.value = computeAnchorY(arrowOneGroupRef.value);
      }
      if (arrowTwoGroupRef.value) {
        centerYArrowTwo.value = computeAnchorY(arrowTwoGroupRef.value);
      }
      if (arrowThreeGroupRef.value) {
        centerYArrowThree.value = computeAnchorY(arrowThreeGroupRef.value);
      }
      if (arrowFourGroupRef.value) {
        centerYArrowFour.value = computeAnchorY(arrowFourGroupRef.value);
      }
    },
    {deep: true, immediate: true}
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

/**
 * Liefert die LineWidth für die Legende
 * Wenn alle 3 Spalten im Belastungsplan gefüllt sind,
 * so wird die maxlineWidth verwendet, ansonsten ist mehr Platz da
 */
// const getLegendLineWidth = computed(() => {
//   // Wenn alles gefüllt ist, dann die maxLineWidth
//   if (
//     props.data &&
//     props.data.value1.filled &&
//     props.data.value2.filled &&
//     props.data.value3.filled
//   ) {
//     return belastungsplanMethods.maxlineWidth;
//   } else {
//     // sonst geht mehr
//     return belastungsplanMethods.maxLegendLineWidth;
//   }
// });

/**
 * Über diesen Wert wird die Liniendicke gesteuert, wenn zu wenig Platz vorhanden ist.
 */
// const lineFactor = computed(() => {
//   return lineWidth.value / highestVerkehrsbeziehungsValue.value;
// });

const zaehlzeit2 = computed(() => {
  if (optionen.value.zeitauswahl === Zeitauswahl.TAGESWERT) {
    if (activeZaehlung.value.zaehldauer === Zaehldauer.DAUER_24_STUNDEN){
      zeitblockInfo.get(Zeitblock.ZB_00_24)?.title
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

function prepareStreetnames(): void {
  firstStreetname.value = getStreetname(first(availableKnotenarme.value));
}

function getStreetname(knotenarm: LadeKnotenarmDTO | undefined): Array<string> {
  let strasse = "";
  if (knotenarm && knotenarm.strassenname) {
    strasse = knotenarm.strassenname;
  }
  let pieces = [strasse];
  const zeichen = strasse.length;
  // Anzahl Zeichen
  if (zeichen > 17) {
    pieces = ["", ""];
    if (strasse.endsWith("str.")) {
      const index = strasse.indexOf("str.");
      pieces[0] = strasse.substring(0, zeichen - 4);
      pieces[1] = strasse.substring(index, 4);
    }
    // Platz
    if (strasse.endsWith("pl.")) {
      const index = strasse.indexOf("pl.");
      pieces[0] = strasse.substring(0, zeichen - 3);
      pieces[1] = strasse.substring(index, 3);
    }
    // Bindestrich
    if (strasse.includes("-")) {
      // pieces = strasse.split(trenner);
      const index = strasse.indexOf("-");
      pieces[0] = strasse.substring(0, index + 1);
      pieces[1] = strasse.substring(index + 1);
    }
    // Leerzeichen
    else if (strasse.includes(" ")) {
      const index = strasse.indexOf(" ");
      pieces[0] = strasse.substring(0, index + 1);
      pieces[1] = strasse.substring(index + 1);
    }
  }
  return pieces;
}

// /**
//  * Erzeugt die Legende für die Linienstärke.
//  */
// function legendeLinienStaerke() {
//   const size = canvas.value.group();
//   const startX =
//     belastungsplanMethods.viewbox - belastungsplanMethods.spalt.value * 5;
//   const startY =
//     belastungsplanMethods.viewbox - belastungsplanMethods.spalt.value * 2.5;
//   const path = `M${startX} ${startY}
//                   L${startX + 3 * belastungsplanMethods.spalt.value} ${startY}
//                   L${startX + 3 * belastungsplanMethods.spalt.value} ${startY - belastungsplanMethods.maxlineWidth}
//                   z`;
//   // Legende für die Farbgebung der Linien bei Differenzdatendarstellung
//   // rot = Zunahme
//   // grün = Abnahme
//   if (isDifferenzdatendarstellung.value) {
//     size
//       .rect(lineWidth.value, lineWidth.value)
//       .fill(belastungsplanMethods.zunahmeValueColor)
//       .x(startX)
//       .y(startY + 35);
//     size
//       .rect(lineWidth.value, lineWidth.value)
//       .fill(belastungsplanMethods.abnahmeValueColor)
//       .x(startX)
//       .y(startY + 35 + 5 + lineWidth.value);
//
//     size
//       .text((add) => {
//         add
//           .tspan("Zunahme")
//           .x(startX + 28)
//           .dy(startY + 35 + lineWidth.value);
//       })
//       .font({
//         family: belastungsplanMethods.fontfamily,
//         size: belastungsplanMethods.maxlineWidth,
//       });
//
//     size
//       .text((add) => {
//         add
//           .tspan("Abnahme")
//           .x(startX + 28)
//           .dy(startY + 35 + 5 + lineWidth.value * 2);
//       })
//       .font({
//         family: belastungsplanMethods.fontfamily,
//         size: belastungsplanMethods.maxlineWidth,
//       });
//   }
//
//   size
//     .path(path)
//     .stroke({ width: 2, color: belastungsplanMethods.legendColor })
//     .attr("fill", "none");
//
//   const path2 = `M${startX + 1.5 * belastungsplanMethods.spalt.value} ${startY}
//                    L${startX + 1.5 * belastungsplanMethods.spalt.value} ${
//                      startY - belastungsplanMethods.maxlineWidth / 2
//                    }`;
//   size
//     .path(path2)
//     .stroke({ width: 2, color: belastungsplanMethods.legendColor })
//     .attr("fill", "none");
//
//   const high =
//     highestVerkehrsbeziehungsValue.value +
//     (1000 - (highestVerkehrsbeziehungsValue.value % 1000));
//   size
//     .text((add) => {
//       add
//         .tspan(`${high}`)
//         .x(startX + 3 * belastungsplanMethods.spalt.value)
//         .dy(startY + belastungsplanMethods.maxlineWidth);
//     })
//     .font({
//       family: belastungsplanMethods.fontfamily,
//       size: belastungsplanMethods.maxlineWidth,
//       anchor: "middle",
//     });
//
//   size
//     .text((add) => {
//       add
//         .tspan(`${high / 2}`)
//         .x(startX + 1.5 * belastungsplanMethods.spalt.value)
//         .dy(startY + belastungsplanMethods.maxlineWidth);
//     })
//     .font({
//       family: belastungsplanMethods.fontfamily,
//       size: belastungsplanMethods.maxlineWidth,
//       anchor: "middle",
//     });
// }

/**
 * Die maximale Dicke der Linien wird errechnet. Maßgeblich ist hierbei, ob die Summe des
 * größten "von" oder "nach" Knotenarms, mutlipliziert mit der maximalen Linien Stärke und
 * der jeweiligen Lücke zwischen den Linien, größer oder kleiner als die maximale Breite
 * einer Fahrtrichtung ist. Ist sie kleiner, so kann die maximale Linienbreite verwendet
 * werden, ist sie größer, so muss die Linienbreite so weit reduziert werden, dass alle
 * Verkehrsbeziehungen mit ihrer maximalen Breite aus eine Fahrtrichtung passen.
 */
// function calcMaxLineWidth() {
//   const mw = belastungsplanMethods.maxlineWidth + belastungsplanMethods.lineGap;
//   let mv: number;
//   if (vonMaxValue.value > nachMaxValue.value) {
//     mv = vonMaxValue.value;
//   } else {
//     mv = nachMaxValue.value;
//   }
//   if (mv * mw > belastungsplanMethods.maxFahrtrichtungWidth.value) {
//     // die maximale Breite der Linien muss reduziert werden
//
//     // Der Platz, der nach Abzug der Lücke je Linie bleibt, muss durch die Anzahl
//     // der maximalen linien geteilt werden. Die Breite der Linie wird abgerundet,
//     // damit wir einen glatten Wert für die Textgröße haben.
//     lineWidth.value = Math.ceil(
//       (belastungsplanMethods.maxFahrtrichtungWidth.value -
//         mv * belastungsplanMethods.lineGap) /
//         mv
//     );
//     fahrtrichtungWidth.value =
//       belastungsplanMethods.maxFahrtrichtungWidth.value;
//   } else {
//     // die maximale Breite der Linien kann so bleiben
//     fahrtrichtungWidth.value = mv * mw;
//     lineWidth.value = belastungsplanMethods.maxlineWidth;
//   }
// }

</script>
