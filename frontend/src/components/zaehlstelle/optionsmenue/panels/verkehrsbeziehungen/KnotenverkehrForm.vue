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
      viewBox="13891 17287 1111 1111"
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
        transform="rotate(45,14344.644,17924.82)"
      >
        <g
          id="node8_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(-90,14358.457,17794.588)"
        >
          <g
            id="node8"
            transform="matrix(1,0,0,1.0009009,-18.516399,-18.516303)"
          >
            <path
              id="path117"
              d="m 14332.005,17842 v -507 l 44.969,-48 44.969,48 v 507 z"
              :fill="getColorOfKnotenarm('8')"
              stroke="none"
            />
            <text
              id="text117"
              xml:space="preserve"
              style="
                font-size: 63.0885px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9418;
              "
              x="23207.291"
              y="2053.7427"
              transform="matrix(0.68301124,0.68239646,-0.73271189,0.73205238,0,0)"
              :style="{ cursor: getCursorType('8') }"
              @click="activateOrDeactivateTotalKnotenarm('8')"
            >
              8
            </text>
          </g>
          <g
            v-if="isKnotenarmAvailable('8')"
            id="node8_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node8_left"
              transform="matrix(0.94605826,0,0,0.98386895,758.7668,274.96713)"
            >
              <path
                v-if="isVerkehrsbeziehungAvailable('8LU')"
                id="path118"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('8LU')"
                @click="activateKnotenarm('8LU')"
              />
              <path
                v-if="isVerkehrsbeziehungAvailable('8LD')"
                id="path119"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('8LD')"
                @click="activateKnotenarm('8LD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node8_right"
              transform="matrix(0.94605826,0,0,0.98386895,906.90013,274.96713)"
            >
              <path
                v-if="isVerkehrsbeziehungAvailable('8RU')"
                id="path120"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('8RU')"
                @click="activateKnotenarm('8RU')"
              />
              <path
                v-if="isVerkehrsbeziehungAvailable('8RD')"
                id="path121"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('8RD')"
                @click="activateKnotenarm('8RD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="node8_crossing"
              transform="matrix(0,0.94605826,-0.79773158,0,28267.575,4038.8282)"
            >
              <path
                v-if="isVerkehrsbeziehungAvailable('8CL2R')"
                id="path124"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('8CL2R')"
                @click="activateKnotenarm('8CL2R')"
              />
              <path
                v-if="isVerkehrsbeziehungAvailable('8CR2L')"
                id="path125"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('8CR2L')"
                @click="activateKnotenarm('8CR2L')"
              />
            </g>
          </g>
        </g>
        <g
          id="node7_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(180,14358.458,17794.588)"
        >
          <g
            id="node7"
            transform="matrix(1,0,0,1.0009009,-18.516399,-18.516303)"
          >
            <path
              id="path108"
              d="m 14332.005,17842 v -507 l 44.969,-48 44.969,48 v 507 z"
              :fill="getColorOfKnotenarm('7')"
              stroke="none"
            />
            <text
              id="text108"
              xml:space="preserve"
              style="
                font-size: 63.0885px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9418;
              "
              x="2159.0249"
              y="-21628.908"
              transform="matrix(-0.68301123,0.68239646,-0.73271189,-0.73205239,0,0)"
              :style="{ cursor: getCursorType('7') }"
              @click="activateOrDeactivateTotalKnotenarm('7')"
            >
              7
            </text>
          </g>
          <g
            v-if="isKnotenarmAvailable('7')"
            id="node7_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node7_left"
              transform="matrix(0.94605826,0,0,0.98386895,758.7668,274.96713)"
            >
              <path
                v-if="isVerkehrsbeziehungAvailable('7LU')"
                id="path109"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('7LU')"
                @click="activateKnotenarm('7LU')"
              />
              <path
                v-if="isVerkehrsbeziehungAvailable('7LD')"
                id="path110"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('7LD')"
                @click="activateKnotenarm('7LD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node7_right"
              transform="matrix(0.94605826,0,0,0.98386895,906.90013,274.96713)"
            >
              <path
                v-if="isVerkehrsbeziehungAvailable('7RU')"
                id="path111"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('7RU')"
                @click="activateKnotenarm('7RU')"
              />
              <path
                v-if="isVerkehrsbeziehungAvailable('7RD')"
                id="path112"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('7RD')"
                @click="activateKnotenarm('7RD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="node7_crossing"
              transform="matrix(0,0.94605826,-0.79773158,0,28267.575,4038.8282)"
            >
              <path
                v-if="isVerkehrsbeziehungAvailable('7CL2R')"
                id="path115"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('7CL2R')"
                @click="activateKnotenarm('7CL2R')"
              />
              <path
                v-if="isVerkehrsbeziehungAvailable('7CR2L')"
                id="path116"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('7CR2L')"
                @click="activateKnotenarm('7CR2L')"
              />
            </g>
          </g>
        </g>
        <g
          id="node6_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(90,14358.458,17794.588)"
        >
          <g
            id="node6"
            transform="matrix(1,0,0,1.0009009,-18.516399,-18.516303)"
          >
            <path
              id="path99"
              d="m 14332.005,17842 v -507 l 44.969,-48 44.969,48 v 507 z"
              :fill="getColorOfKnotenarm('6')"
              stroke="none"
            />
            <text
              id="text99"
              xml:space="preserve"
              style="
                font-size: 63.0885px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9418;
              "
              x="-23247.984"
              y="-2008.0264"
              transform="matrix(-0.68301123,-0.68239646,0.73271189,-0.73205239,0,0)"
              :style="{ cursor: getCursorType('6') }"
              @click="activateOrDeactivateTotalKnotenarm('6')"
            >
              6
            </text>
          </g>
          <g
            v-if="isKnotenarmAvailable('6')"
            id="node6_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node6_left"
              transform="matrix(0.94605826,0,0,0.98386895,758.7668,274.96713)"
            >
              <path
                v-if="isVerkehrsbeziehungAvailable('6LU')"
                id="path100"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('6LU')"
                @click="activateKnotenarm('6LU')"
              />
              <path
                v-if="isVerkehrsbeziehungAvailable('6LD')"
                id="path101"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('6LD')"
                @click="activateKnotenarm('6LD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node6_right"
              transform="matrix(0.94605826,0,0,0.98386895,906.90013,274.96713)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('6RU')"
                id="path102"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('6RU')"
                @click="activateKnotenarm('6RU')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('6RD')"
                id="path103"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('6RD')"
                @click="activateKnotenarm('6RD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="node6_crossing"
              transform="matrix(0,0.94605826,-0.79773158,0,28267.575,4038.8282)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('6CL2R')"
                id="path106"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('6CL2R')"
                @click="activateKnotenarm('6CL2R')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('6CR2L')"
                id="path107"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('6CR2L')"
                @click="activateKnotenarm('6CR2L')"
              />
            </g>
          </g>
        </g>
        <g
          id="node5_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g
            id="node5_arrow"
            transform="matrix(1,0,0,1.0009009,-18.516399,-18.516303)"
          >
            <path
              id="path90"
              d="m 14332.005,17842 v -507 l 44.969,-48 44.969,48 v 507 z"
              :fill="getColorOfKnotenarm('5')"
              stroke="none"
            />
            <text
              id="text90"
              xml:space="preserve"
              style="
                font-size: 63.0885px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9418;
              "
              x="-2199.2236"
              y="21674.625"
              transform="matrix(0.68301124,-0.68239646,0.73271189,0.73205238,0,0)"
              :style="{ cursor: getCursorType('5') }"
              @click="activateOrDeactivateTotalKnotenarm('5')"
            >
              5
            </text>
          </g>
          <g
            v-if="isKnotenarmAvailable('5')"
            id="node5_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node5_left"
              transform="matrix(0.94605826,0,0,0.98386895,758.7668,274.96713)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('5LU')"
                id="path91"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('5LU')"
                @click="activateKnotenarm('5LU')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('5LD')"
                id="path92"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('5LD')"
                @click="activateKnotenarm('5LD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node5_right"
              transform="matrix(0.94605826,0,0,0.98386895,906.90013,274.96713)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('5RU')"
                id="path93"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('5RU')"
                @click="activateKnotenarm('5RU')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('5RD')"
                id="path94"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('5RD')"
                @click="activateKnotenarm('5RD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="node5_crossing"
              transform="matrix(0,0.94605826,-0.79773158,0,28267.575,4038.8282)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('5CL2R')"
                id="path97"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('5CL2R')"
                @click="activateKnotenarm('5CL2R')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('5CR2L')"
                id="path98"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('5CR2L')"
                @click="activateKnotenarm('5CR2L')"
              />
            </g>
          </g>
        </g>
      </g>

      <g
        id="nodes1To4"
        class="Page"
        transform="translate(88.042487,47.911987)"
      >
        <g
          id="node4_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(-90,14358.457,17794.588)"
        >
          <g
            id="node4"
            transform="matrix(1,0,0,1.0009009,-18.516399,-18.516303)"
          >
            <path
              id="path81"
              d="m 14332.005,17842 v -507 l 44.969,-48 44.969,48 v 507 z"
              :fill="getColorOfKnotenarm('4')"
              stroke="none"
            />
            <text
              id="text81"
              xml:space="preserve"
              style="
                font-size: 63.0885px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9418;
              "
              x="17945.223"
              y="-13850.833"
              transform="matrix(0,0.96505434,-1.0362111,0,0,0)"
              :style="{ cursor: getCursorType('4') }"
              @click="activateOrDeactivateTotalKnotenarm('4')"
            >
              4
            </text>
          </g>

          <g
            v-if="isKnotenarmAvailable('4')"
            id="node4_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node4_left"
              transform="matrix(0.94605826,0,0,0.98386895,758.7668,274.96713)"
            >
              <path
                v-if="isVerkehrsbeziehungAvailable('4LU')"
                id="path82"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('4LU')"
                @click="activateKnotenarm('4LU')"
              />
              <path
                v-if="isVerkehrsbeziehungAvailable('4LD')"
                id="path83"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('4LD')"
                @click="activateKnotenarm('4LD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node4_right"
              transform="matrix(0.94605826,0,0,0.98386895,906.90013,274.96713)"
            >
              <path
                v-if="isVerkehrsbeziehungAvailable('4RU')"
                id="path84"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('4RU')"
                @click="activateKnotenarm('4RU')"
              />
              <path
                v-if="isVerkehrsbeziehungAvailable('4RD')"
                id="path85"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('4RD')"
                @click="activateKnotenarm('4RD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="node4_crossing"
              transform="matrix(0,0.94605826,-0.79773158,0,28267.575,4038.8282)"
            >
              <path
                v-if="isVerkehrsbeziehungAvailable('4CL2R')"
                id="path88"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('4CL2R')"
                @click="activateKnotenarm('4CL2R')"
              />
              <path
                v-if="isVerkehrsbeziehungAvailable('4CR2L')"
                id="path89"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('4CR2L')"
                @click="activateKnotenarm('4CR2L')"
              />
            </g>
          </g>
        </g>
        <g
          id="node3_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(180,14358.458,17794.588)"
        >
          <g
            id="node3"
            transform="matrix(1,0,0,1.0009009,-18.516399,-18.516303)"
          >
            <path
              id="path72"
              d="m 14332.005,17842 v -507 l 44.969,-48 44.969,48 v 507 z"
              :fill="getColorOfKnotenarm('3')"
              stroke="none"
            />
            <text
              id="text72"
              xml:space="preserve"
              style="
                font-size: 63.0885px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9418;
              "
              x="-14903.439"
              y="-16723.537"
              transform="scale(-0.96592375,-1.0352784)"
              :style="{ cursor: getCursorType('3') }"
              @click="activateOrDeactivateTotalKnotenarm('3')"
            >
              3
            </text>
          </g>

          <g
            v-if="isKnotenarmAvailable('3')"
            id="node3_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node3_left"
              transform="matrix(0.94605826,0,0,0.98386895,758.7668,274.96713)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('3LU')"
                id="path73"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('3LU')"
                @click="activateKnotenarm('3LU')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('3LD')"
                id="path74"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('3LD')"
                @click="activateKnotenarm('3LD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node3_right"
              transform="matrix(0.94605826,0,0,0.98386895,906.90013,274.96713)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('3RU')"
                id="path75"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('3RU')"
                @click="activateKnotenarm('3RU')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('3RD')"
                id="path76"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('3RD')"
                @click="activateKnotenarm('3RD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="node3_crossing"
              transform="matrix(0,0.94605826,-0.79773158,0,28267.575,4038.8282)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('3CL2R')"
                id="path79"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('3CL2R')"
                @click="activateKnotenarm('3CL2R')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('3CR2L')"
                id="path80"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('3CR2L')"
                @click="activateKnotenarm('3CR2L')"
              />
            </g>
          </g>
        </g>
        <g
          id="node2_group"
          class="com.sun.star.drawing.ClosedBezierShape"
          transform="rotate(90,14358.458,17794.588)"
        >
          <g
            id="node2"
            transform="matrix(1,0,0,1.0009009,-18.516399,-18.516303)"
          >
            <path
              id="path54"
              d="m 14332.005,17842 v -507 l 44.969,-48 44.969,48 v 507 z"
              :fill="getColorOfKnotenarm('2')"
              stroke="none"
            />
            <text
              id="text54"
              xml:space="preserve"
              style="
                font-size: 63.0885px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9418;
              "
              x="-17983.836"
              y="13896.666"
              transform="matrix(0,-0.96505434,1.0362111,0,0,0)"
              :style="{ cursor: getCursorType('2') }"
              @click="activateOrDeactivateTotalKnotenarm('2')"
            >
              2
            </text>
          </g>

          <g
            v-if="isKnotenarmAvailable('2')"
            id="node2_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node2_left"
              transform="matrix(0.94605826,0,0,0.98386895,758.7668,274.96713)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('2LU')"
                id="path55"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('2LU')"
                @click="activateKnotenarm('2LU')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('2LD')"
                id="path56"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('2LD')"
                @click="activateKnotenarm('2LD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node2_right"
              transform="matrix(0.94605826,0,0,0.98386895,906.90013,274.96713)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('2RU')"
                id="path57"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('2RU')"
                @click="activateKnotenarm('2RU')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('2RD')"
                id="path58"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('2RD')"
                @click="activateKnotenarm('2RD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="node2_crossing"
              transform="matrix(0,0.94605826,-0.79773158,0,28267.575,4038.8282)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('2CL2R')"
                id="path61"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('2CL2R')"
                @click="activateKnotenarm('2CL2R')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('2CR2L')"
                id="path62"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('2CR2L')"
                @click="activateKnotenarm('2CR2L')"
              />
            </g>
          </g>
        </g>
        <g
          id="node1_group"
          class="com.sun.star.drawing.ClosedBezierShape"
        >
          <g
            id="node1"
            transform="matrix(1,0,0,1.0009009,-18.516399,-18.516303)"
          >
            <path
              id="path1"
              d="m 14332.005,17842 v -507 l 44.969,-48 44.969,48 v 507 z"
              :fill="getColorOfKnotenarm('1')"
              stroke="none"
            />
            <text
              id="text1"
              xml:space="preserve"
              style="
                font-size: 63.0885px;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #ffffff;
                stroke-width: 38.9418;
              "
              x="14863.547"
              y="16769.467"
              transform="scale(0.96592375,1.0352784)"
              :style="{ cursor: getCursorType('1') }"
              @click="activateOrDeactivateTotalKnotenarm('1')"
            >
              1
            </text>
          </g>

          <g
            v-if="isKnotenarmAvailable('1')"
            id="node1_arrows"
          >
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node1_left"
              transform="matrix(0.94605826,0,0,0.98386895,758.7668,274.96713)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('1LU')"
                id="path19"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('1LU')"
                @click="activateKnotenarm('1LU')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('1LD')"
                id="path20"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('1LD')"
                @click="activateKnotenarm('1LD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.FJS"
              id="node1_right"
              transform="matrix(0.94605826,0,0,0.98386895,906.90013,274.96713)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('1RU')"
                id="path39"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('1RU')"
                @click="activateKnotenarm('1RU')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('1RD')"
                id="path40"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('1RD')"
                @click="activateKnotenarm('1RD')"
              />
            </g>
            <g
              v-if="activeZaehlung.zaehlart === Zaehlart.QU"
              id="node1_crossing"
              transform="matrix(0,0.94605826,-0.79773158,0,28267.575,4038.8282)"
            >
              <path
                  v-if="isVerkehrsbeziehungAvailable('1CL2R')"
                id="path43"
                d="m 14305.233,17535.315 v -165.798 h -5.582 l 9.768,-33.159 9.769,33.159 h -5.582 v 165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('1CL2R')"
                @click="activateKnotenarm('1CL2R')"
              />
              <path
                  v-if="isVerkehrsbeziehungAvailable('1CR2L')"
                id="path44"
                d="m 14288.406,17336.358 v 165.798 h 5.582 l -9.768,33.159 -9.769,-33.159 h 5.582 v -165.798 z"
                stroke="none"
                :style="{ cursor: 'pointer' }"
                :fill="calculateColor('1CR2L')"
                @click="activateKnotenarm('1CR2L')"
              />
            </g>
          </g>
        </g>
      </g>

      <path
        v-if="hasAvailableKnotenarme"
        id="center"
        d="m 14253.004,17465.11 166.703,0 117.876,117.877 0,166.702 -117.876,117.877 -166.703,0 -117.876,-117.877 0,-166.702 z"
        transform="matrix(0.37991612,-0.37991612,0.37991612,0.37991612,2288.1609,16577.386)"
        fill="#1565c0"
      />
    </svg>
  </v-sheet>
</template>

<script setup lang="ts">

import { isEmpty } from "lodash";
import { computed, onMounted, watch } from "vue";

import { useEventbus } from "@/store/Eventbus";
import Zaehlart from "@/types/enum/Zaehlart";

import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";

interface Props {
  height: string;
}
defineProps<Props>();

const zaehlstelleStore = useZaehlstelleStore();

const activeColor = "#D50000";
const passiveColor = "#9E9E9E";

const arrowMappings = {
  1: {
    'W': ['1LU', '1LD'],
    'O': ['1RU', '1RD']
  },
  2: {
    'N': ['2LU', '2LD'],
    'S': ['2RU', '2RD']
  },
  3: {
    'W': ['3RU', '3RD'],
    'O': ['3LU', '3LD']
  },
  4: {
    'N': ['4RU', '4RD'],
    'S': ['4LU', '4LD']
  },
  5: {
    'NW': ['5RU', '5RD'],
    'SO': ['5LU', '5LD']
  },
  6: {
    'NO': ['6RU', '6RD'],
    'SW': ['6LU', '6LD']
  },
  7: {
    'NW': ['7RD', '7RU'],
    'SO': ['7LD', '7LU']
  },
  8: {
    'NO': ['8RU', '8RD'],
    'SW': ['8LU', '8LD']
  }
};

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const availableKnotenarme = computed(() => {
  return activeZaehlung.value.knotenarme.map((arm) => `${arm.nummer}`);
});

const availableVerkehrsbeziehungen = computed(() => {
  const verkehrsbeziehungen: string[] = [];
  activeZaehlung.value.verkehrsbeziehungen.forEach((vb) => {
    const arrow = getVerkehrsbeziehungArrow(vb.knotenarm, vb.hinein, vb.heraus, vb.strassenseite);
    verkehrsbeziehungen.push(arrow);
  });
  return verkehrsbeziehungen;
})

const hasAvailableKnotenarme = computed(() => {
  return availableKnotenarme.value.length > 0;
});

const eventbus = useEventbus();
const selectedKnotenarme = computed(() => {
  return eventbus.getSelectedKnotenarme;
});

onMounted(() => {
  resetForm();
});

watch(
  () => activeZaehlung.value.knotenarme,
  () => {
    resetForm();
  },
  { deep: true, immediate: true }
);

function getVerkehrsbeziehungArrow(knotenarm: number, hinein: boolean, heraus: boolean, strassenseite: string) : string {
  if (knotenarm in arrowMappings && strassenseite in arrowMappings[knotenarm]) {
    const index = hinein && !heraus ? 0 : 1; // 0 für hinein, 1 für heraus
    return arrowMappings[knotenarm][strassenseite][index];
  }
  return '';
}

function isKnotenarmAvailable(knotenarm: string): boolean {
  return availableKnotenarme.value.includes(knotenarm);
}

function isVerkehrsbeziehungAvailable(verkehrsbeziehung: string): boolean {
  return availableVerkehrsbeziehungen.value.includes(verkehrsbeziehung);
}

/**
 * Wenn die Knotenarmnummer im Array gefunden wurde, wird diese in der Grafik in der "activeColor" dargestellt,
 * ansonsten in der "passiveColor".
 */
function calculateColor(knotenarm: string): string | undefined {
  let color = passiveColor;
  if (
    !isEmpty(
      selectedKnotenarme.value.filter(
        (selectedKnotenarm) => selectedKnotenarm === knotenarm
      )
    )
  ) {
    color = activeColor;
  }
  return color;
}

function activateKnotenarm(knotenarm: string) {
  eventbus.activateKnotenarm(knotenarm);
}

function activateOrDeactivateTotalKnotenarm(knotenarm: string) {
  if (!isKnotenarmAvailable(knotenarm)) {
    // remove all
    return;
  }

  const endings = [];

  if (activeZaehlung.value.zaehlart === Zaehlart.QU) {
    endings.push("CL2R");
    endings.push("CR2L");
  }
  if (activeZaehlung.value.zaehlart === Zaehlart.FJS) {
    endings.push("LU");
    endings.push("LD");
    endings.push("RU");
    endings.push("RD");
  }

  const knotenarmStrings = endings.map((value) => knotenarm + value);

  let nothingRemoved = true;

  knotenarmStrings.forEach((knotenarmString) => {
    if (selectedKnotenarme.value.includes(knotenarmString)) {
      nothingRemoved = false;
      eventbus.deactivateKnotenarm(knotenarmString);
    }
  });

  if (nothingRemoved && isKnotenarmAvailable(knotenarm)) {
    knotenarmStrings.forEach((value) => {
      activateKnotenarm(value);
    });
  }
}

function getCursorType(knotenarm: string) {
  if (isKnotenarmAvailable(knotenarm)) {
    return `pointer`;
  } else {
    return "default";
  }
}

function getColorOfKnotenarm(knotenarm: string) {
  if (isKnotenarmAvailable(knotenarm)) {
    return `#1565C0`;
  } else {
    return `#EEEEEE`;
  }
}

function resetForm() {
  eventbus.resetSelectedKnotenarme();
  activeZaehlung.value.verkehrsbeziehungen.forEach((vb) => {
    const arrow = getVerkehrsbeziehungArrow(vb.knotenarm, vb.hinein, vb.heraus, vb.strassenseite)
    activateKnotenarm(arrow);
  })
}
</script>
