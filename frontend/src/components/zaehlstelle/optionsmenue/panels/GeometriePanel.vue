<template>
  <v-expansion-panel v-if="zaehlung.zaehlart === Zaehlart.QJS">
    <v-expansion-panel-title>
      <div>
        <v-icon
          start
          icon="mdi-arrow-decision"
        />
        Verkehrsbeziehungen
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-1">
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 10px 0"
        header-text="Verkehrsbeziehungen zwischen den Knotenarmen"
      />

      <v-row
        align="start"
        justify="center"
        dense
      >
        <v-col cols="4">
          <v-select
            v-model="von"
            :items="vonKnotenarme"
            label="Von Knotenarm"
            item-title="strassenname"
            item-value="nummer"
            variant="filled"
            density="comfortable"
            @mouseover="hoverSelectVon = true"
            @mouseleave="hoverSelectVon = false"
          />
          <v-select
            v-model="nach"
            :items="nachKnotenarme"
            label="Nach Knotenarm"
            item-title="strassenname"
            item-value="nummer"
            variant="filled"
            density="comfortable"
            @mouseover="hoverSelectNach = true"
            @mouseleave="hoverSelectNach = false"
          />
          <v-checkbox
            v-if="beideRichtungenAnzeigen"
            v-model="chosenOptionsCopy.beideRichtungen"
            class="mb-3"
            :label="'Zulaufend/Ablaufend'"
            hide-details
            color="quaternary"
            density="compact"
            :disabled="!beideRichtungenAnzeigen"
            @mouseover="hoverBeideRichtungen = true"
            @mouseleave="hoverBeideRichtungen = false"
          />
        </v-col>
        <v-spacer />
        <v-col cols="4">
          <v-card variant="flat">
            <div
              :style="{ color: `${hoverBeideRichtungen ? 'red' : 'black'}` }"
            >
              {{ helpTextVerkehrsbeziehung }}
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>

  <svg
      v-if="isKnotenLageFormValid"
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
          id="querschnitt"
          :transform="rotateSvg"
      >
        <g id="description">
          <g id="second_street">
            <text
                v-if="secondStreetname.length === 1"
                id="singlerow2"
                xml:space="preserve"
                style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 33.4058px;
                font-family: sans-serif;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: start;
                fill: #000000;
                stroke-width: 39.1848;
              "
                x="1332.2212"
                y="712.01141"
            >
              <tspan
                  id="tspan21"
                  style="stroke-width: 38.9194; unicode-bidi: plaintext"
                  x="1332.2212"
                  y="712.01141"
              >
                {{ secondStreetname[0] }}
              </tspan>
            </text>
            <text
                v-if="secondStreetname.length === 2"
                id="multirow2"
                xml:space="preserve"
                style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 33.4058px;
                font-family: sans-serif;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: rl-tb;
                direction: rtl;
                text-anchor: start;
                fill: #000000;
                stroke-width: 39.1848;
              "
                y="691.19336"
                x="1332.2212"
            >
              <tspan
                  id="tspan17"
                  style="stroke-width: 39.1848; unicode-bidi: plaintext"
                  x="1332.2212"
                  y="691.19336"
              >
                {{ secondStreetname[0] }}
              </tspan>
              <tspan
                  id="tspan18"
                  style="stroke-width: 39.1848; unicode-bidi: plaintext"
                  x="1332.2212"
                  y="732.95062"
              >
                {{ secondStreetname[1] }}
              </tspan>
            </text>
          </g>
          <g id="second_number">
            <ellipse
                id="ellipse13"
                style="
                fill: none;
                fill-opacity: 1;
                stroke: #000000;
                stroke-width: 1.02435;
                stroke-dasharray: none;
                stroke-opacity: 1;
              "
                cx="924"
                cy="700"
                rx="20.487822"
                ry="20.487823"
            />
            <text
                id="text14"
                xml:space="preserve"
                style="
                font-size: 33.4058px;
                font-family: sans-serif;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 52.2711;
              "
                x="913.19183"
                y="711.73895"
            >
              <tspan
                  id="tspan14"
                  x="913.19183"
                  y="711.73895"
                  style="stroke-width: 52.2711"
              >
                {{ secondNode?.nummer }}
              </tspan>
            </text>
          </g>
          <g id="first_street">
            <text
                v-if="firstStreetname.length === 1"
                id="singlerow"
                xml:space="preserve"
                style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 33.4058px;
                font-family: sans-serif;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 39.1848;
              "
                x="68.368858"
                y="712.17938"
            >
              <tspan
                  id="tspan15"
                  style="stroke-width: 39.1848"
                  x="68.368858"
                  y="712.17938"
              >
                {{ firstStreetname[0] }}
              </tspan>
            </text>
            <text
                v-if="firstStreetname.length === 2"
                id="multirow"
                xml:space="preserve"
                style="
                font-style: normal;
                font-variant: normal;
                font-weight: normal;
                font-stretch: normal;
                font-size: 33.4058px;
                font-family: sans-serif;
                font-variant-ligatures: normal;
                font-variant-caps: normal;
                font-variant-numeric: normal;
                font-variant-east-asian: normal;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 39.1848;
              "
                x="68.368858"
                y="691.19336"
            >
              <tspan
                  id="tspan20"
                  style="stroke-width: 39.1848"
                  x="68.368858"
                  y="691.19336"
              >
                {{ firstStreetname[0] }}
              </tspan>
              <tspan
                  id="tspan1"
                  style="stroke-width: 39.1848"
                  x="68.368858"
                  y="732.95062"
              >
                {{ firstStreetname[1] }}
              </tspan>
            </text>
          </g>
          <g id="first_number">
            <ellipse
                id="ellipse3"
                style="
                fill: none;
                fill-opacity: 1;
                stroke: #000000;
                stroke-width: 1.02435;
                stroke-dasharray: none;
                stroke-opacity: 1;
              "
                cx="476"
                cy="700"
                rx="20.487822"
                ry="20.487823"
            />
            <text
                id="text2"
                xml:space="preserve"
                style="
                font-size: 33.4058px;
                font-family: sans-serif;
                text-align: start;
                writing-mode: lr-tb;
                direction: ltr;
                text-anchor: start;
                fill: #000000;
                stroke-width: 52.2711;
              "
                y="711.73895"
                x="465.80084"
            >
              <tspan
                  id="tspan2"
                  style="stroke-width: 52.2711"
                  x="465.80084"
                  y="711.73895"
              >
                {{ firstNode?.nummer }}
              </tspan>
            </text>
          </g>
        </g>
        <g id="arrows">
          <g
              id="arrow4"
              style="cursor: pointer"
              @click="activateArrow('4')"
          >
            <path
                id="path4"
                :fill="calculateColor('4')"
                d="m 69.999999,860.99999 v -28 H 1330 v 27.997 z"
            />
            <path
                id="spike4"
                :fill="calculateColor('4')"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                transform="matrix(0.09192953,0,0,0.07964786,-38.395512,-544.45264)"
            />
          </g>
          <g
              id="arrow3"
              style="cursor: pointer"
              @click="activateArrow('3')"
          >
            <path
                id="path3"
                :fill="calculateColor('3')"
                d="m 69.999999,804.99999 v -28 H 1330 v 27.997 z"
            />
            <path
                id="spike3"
                :fill="calculateColor('3')"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                transform="matrix(-0.09192953,0,0,-0.07964786,1438.3955,2182.4526)"
            />
          </g>
          <g
              id="arrow2"
              style="cursor: pointer"
              @click="activateArrow('2')"
          >
            <path
                id="path2"
                :fill="calculateColor('2')"
                d="M 69.999999,623 V 595 H 1330 v 27.997 z"
            />
            <path
                id="spike2"
                :fill="calculateColor('2')"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                transform="matrix(0.09192953,0,0,0.07964786,-38.395512,-782.45264)"
            />
          </g>
          <g
              id="arrow1"
              style="cursor: pointer"
              @click="activateArrow('1')"
          >
            <path
                id="path1"
                :fill="calculateColor('1')"
                d="M 69.999999,567 V 539 H 1330 v 27.998 z"
            />
            <path
                id="spike1"
                :fill="calculateColor('1')"
                d="m 15265.992,17469.828 -304.316,176.002 -0.265,-351.547 z"
                transform="matrix(-0.09192953,0,0,-0.07964786,1438.3955,1944.4526)"
            />
          </g>
        </g>
      </g>
    </svg>

</template>

<script setup lang="ts">
import type KnotenarmVerbindungen from "@/types/zaehlung/KnotenarmVerbindungen";
import type LadeVerkehrsbeziehungDTO from "@/types/zaehlung/LadeVerkehrsbeziehungDTO";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { isNil, union } from "lodash";
import { computed, onMounted, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import LadeKnotenarmComperator from "@/types/zaehlung/LadeKnotenarmComperator";

const chosenOptionsCopy = defineModel<ZaehlstelleOptionsDTO>({
  required: true,
});

const zaehlstelleStore = useZaehlstelleStore();

/**
 * Je im von-Dropdown wählbaren Knotenarm werden die für den nach-Dropdown möglichen Zielknotenarme vorgehalten.
 */
const moeglicheBeziehungenVon = ref(new Map<number, KnotenarmVerbindungen>());
/**
 * Je im nach-Dropdown wählbaren Knotenarm werden die für den von-Dropdown möglichen Knotenarme vorgehalten.
 */
const moeglicheBeziehungenNach = ref(new Map<number, KnotenarmVerbindungen>());

/**
 * Der gewählte von-Knotenarm
 */
const von = ref(0);
/**
 * Der gewählte nach-Knotenarm
 */
const nach = ref(0);

const alle = { nummer: 0, strassenname: "Alle Knotenarme" };

// const beideRichtungen = ref(false);
const hoverSelectVon = ref(false);
const hoverSelectNach = ref(false);
const hoverBeideRichtungen = ref(false);

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

// Lädt die "von" Knotenarme für den aktuell gewählten "nach" Knotenarm
const vonKnotenarme = computed<Array<LadeKnotenarmDTO>>(() => {
  const k = moeglicheBeziehungenNach.value.get(nach.value);
  if (k) {
    return k.moeglicheVerbindungen.sort(LadeKnotenarmComperator.sortByNumber);
  } else {
    return [alle];
  }
});
// Lädt die "nach" Knotenarme für den aktuell gewählten "von" Knotenarm
const nachKnotenarme = computed<Array<LadeKnotenarmDTO>>(() => {
  const k = moeglicheBeziehungenVon.value.get(von.value);
  if (k) {
    return k.moeglicheVerbindungen.sort(LadeKnotenarmComperator.sortByNumber);
  } else {
    return [alle];
  }
});

const helpTextVerkehrsbeziehung = computed(() => {
  if (hoverSelectVon.value) {
    return "Auf den Knoten zulaufende Fahrtrichtung.";
  }
  if (hoverSelectNach.value) {
    return "Vom Knoten ablaufende Fahrtrichtung.";
  }
  if (hoverBeideRichtungen.value) {
    return "Zulaufende und Ablaufende Fahrtrichtung. Hat nur eine Auswirkung auf den Belastungsplan.";
  }
  return "";
});

/**
 * reaktiver Getter zum Steuern der Anzeige der Checkbox
 * fuer den Zulauf/Ablauf
 */
const beideRichtungenAnzeigen = computed(() => {
  return von.value > 0 || nach.value > 0;
});

watch(
  chosenOptionsCopy,
  () => {
    reset();
  },
  { deep: true }
);

// Setzt die Auswahlelemente auf der Oberfläche zurück, oder mit den
//  Werten im Optionsobjekt
function reset() {
  chosenOptionsCopy.value.vonKnotenarm === null
    ? (von.value = 0)
    : (von.value = chosenOptionsCopy.value.vonKnotenarm);
  chosenOptionsCopy.value.nachKnotenarm === null
    ? (nach.value = 0)
    : (nach.value = chosenOptionsCopy.value.nachKnotenarm);
}

/**
 * In dieser Methode werden die wählbaren von- und nach-Knotenarme ermittelt.
 *
 * Jeder wählbare von-Knotenarm wird mit den möglichen nach-Knotearmen befüllt.
 * Jeder wählbare nach-Knotenarm wird mit den möglichen von-Knotearmen befüllt.
 *
 * Als Basis zur Ermittlung der relevanten Knotenarme dient die Klasse "LadeVerkehrsbeziehungDTO"
 * welche als relevante Attribute "von" und "nach" für Kreuzungen sowie "knotenarmKreisverkehr"
 * und "hinein" vorhält.
 */
function initVerkehrsbeziehungen(): void {
  // Knotenarmbezeichnung je Knotenarm für spätere effiziente Extraktion der Knotenarmbezeichnung.
  const knotenarme: Map<number, string> = new Map<number, string>(
    activeZaehlung.value.knotenarme.map((knotenarm) => [
      knotenarm.nummer,
      knotenarm.nummer + " - " + knotenarm.strassenname,
    ])
  );

  // Wird für die Erstellung der Zielknotenarme und eingehenden Knotenarme bei Auswahl "alle" benötigt.
  const alleZielknotenarmeVon: Set<LadeKnotenarmDTO> =
    new Set<LadeKnotenarmDTO>();
  const alleEingehendeKnotenarmeNach: Set<LadeKnotenarmDTO> =
    new Set<LadeKnotenarmDTO>();

  // Befüllung der wählbaren von-Knotenarme mit den möglichen nach-Knotenarmen
  // sowie Befüllung der wählbaren nach-Knotenarme mit den möglichen von-Knotenarmen
  const verkehrsbeziehungen = activeZaehlung.value.verkehrsbeziehungen;
  if (verkehrsbeziehungen && Array.isArray(verkehrsbeziehungen)) {
    verkehrsbeziehungen?.forEach((verkehrsbeziehung) => {
      if (isZaehlungForKreuzung()) {
        addVonKnotenarmWithPossibleNachKnotenarm(
          verkehrsbeziehung,
          alleZielknotenarmeVon,
          knotenarme
        );
        addNachKnotenarmWithPossibleVonKnotenarm(
          verkehrsbeziehung,
          alleEingehendeKnotenarmeNach,
          knotenarme
        );
      } else {
        // Kreisverkehr
        if (!isNil(verkehrsbeziehung.knotenarm)) {
          if (verkehrsbeziehung.hinein) {
            alleEingehendeKnotenarmeNach.add({
              nummer: verkehrsbeziehung.knotenarm,
              strassenname: getKnotenarmBezeichnung(
                verkehrsbeziehung.knotenarm,
                knotenarme
              ),
            });
          }
          if (verkehrsbeziehung.heraus) {
            alleZielknotenarmeVon.add({
              nummer: verkehrsbeziehung.knotenarm,
              strassenname: getKnotenarmBezeichnung(
                verkehrsbeziehung.knotenarm,
                knotenarme
              ),
            });
          }
        }
      }
    });

    // Nachfolgend werden die eingehenden bzw. ausgehenden Beziehungen bei Auswahl von "alle" gesetzt.
    if (isZaehlungForKreuzung()) {
      const kv: KnotenarmVerbindungen = {
        knotenarm: alle,
        moeglicheVerbindungen: union(
          [alle],
          Array.from(alleZielknotenarmeVon.values())
        ),
        moeglicheVerbindungenIds: union(
          [alle],
          Array.from(alleZielknotenarmeVon.values())
        ).map((knotenarm) => knotenarm.nummer),
      };
      moeglicheBeziehungenVon.value.set(alle.nummer, kv);
    } else {
      // Kreisverkehr
      const kv = {
        knotenarm: alle,
        moeglicheVerbindungen: [alle],
        moeglicheVerbindungenIds: union(
          [alle],
          Array.from(alleZielknotenarmeVon.values())
        ).map((knotenarm) => knotenarm.nummer),
      };
      moeglicheBeziehungenVon.value.set(alle.nummer, kv);
    }
    // Kreuzung und Kreisverkehr
    const kv: KnotenarmVerbindungen = {
      knotenarm: alle,
      moeglicheVerbindungen: union(
        [alle],
        Array.from(alleEingehendeKnotenarmeNach.values())
      ),
      moeglicheVerbindungenIds: union(
        [alle],
        Array.from(alleEingehendeKnotenarmeNach.values())
      ).map((knotenarm) => knotenarm.nummer),
    };
    moeglicheBeziehungenNach.value.set(alle.nummer, kv);
  }
}

/**
 * Diese Methode fügt an den wählbaren Knotenarm für das Dropdown von-Knotenarm
 * die möglichen nach-Knotenarme an.
 */
function addVonKnotenarmWithPossibleNachKnotenarm(
    verkehrsbeziehung: LadeVerkehrsbeziehungDTO,
    alleZielknotenarmeVon: Set<LadeKnotenarmDTO>,
    knotenarme: Map<number, string>
): void {
  if (moeglicheBeziehungenVon.value.has(verkehrsbeziehung.von)) {
    // Erweitern bereits vorhandener von-Knotenarm um zusätzlichen möglichen nach-Knotenarm
    const kv: KnotenarmVerbindungen | undefined =
      moeglicheBeziehungenVon.value.get(verkehrsbeziehung.von);
    kv?.moeglicheVerbindungen.push({
      nummer: verkehrsbeziehung.nach,
      strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.nach, knotenarme),
    });
    kv?.moeglicheVerbindungenIds.push(verkehrsbeziehung.nach);
  } else {
    // Erstbefüllung noch nicht vorhandener von-Knotenarm
    const kv: KnotenarmVerbindungen = {
      knotenarm: {
        nummer: verkehrsbeziehung.von,
        strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.von, knotenarme),
      },
      moeglicheVerbindungen: [
        alle,
        {
          nummer: verkehrsbeziehung.nach,
          strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.nach, knotenarme),
        },
      ],
      moeglicheVerbindungenIds: [alle.nummer, verkehrsbeziehung.nach],
    };
    moeglicheBeziehungenVon.value.set(verkehrsbeziehung.von, kv);
  }

  let alreadyExists = false;
  alleZielknotenarmeVon.forEach((value) => {
    alreadyExists = alreadyExists || value.nummer === verkehrsbeziehung.nach;
  });

  if (!alreadyExists) {
    alleZielknotenarmeVon.add({
      nummer: verkehrsbeziehung.nach,
      strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.nach, knotenarme),
    });
  }
}

/**
 * Diese Methode fügt an den wählbaren Knotenarm für das Dropdown nach-Knotenarm
 * die möglichen von-Knotenarme an.
 */
function addNachKnotenarmWithPossibleVonKnotenarm(
    verkehrsbeziehung: LadeVerkehrsbeziehungDTO,
    alleEingehendeKnotenarmeNach: Set<LadeKnotenarmDTO>,
    knotenarme: Map<number, string>
): void {
  if (moeglicheBeziehungenNach.value.has(verkehrsbeziehung.nach)) {
    // Erweitern bereits vorhandener nach-Knotenarm um zusätzlichen möglichen von-Knotenarm
    const kv: KnotenarmVerbindungen | undefined =
      moeglicheBeziehungenNach.value.get(verkehrsbeziehung.nach);
    kv?.moeglicheVerbindungen.push({
      nummer: verkehrsbeziehung.von,
      strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.von, knotenarme),
    });
    kv?.moeglicheVerbindungenIds.push(verkehrsbeziehung.von);
  } else {
    // Erstbefüllung noch nicht vorhandener nach-Knotenarm
    const kv: KnotenarmVerbindungen = {
      knotenarm: {
        nummer: verkehrsbeziehung.nach,
        strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.nach, knotenarme),
      },
      moeglicheVerbindungen: [
        alle,
        {
          nummer: verkehrsbeziehung.von,
          strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.von, knotenarme),
        },
      ],
      moeglicheVerbindungenIds: [alle.nummer, verkehrsbeziehung.von],
    };
    moeglicheBeziehungenNach.value.set(verkehrsbeziehung.nach, kv);
  }

  let alreadyExists = false;
  alleEingehendeKnotenarmeNach.forEach((value) => {
    alreadyExists = alreadyExists || value.nummer === verkehrsbeziehung.von;
  });

  if (!alreadyExists) {
    alleEingehendeKnotenarmeNach.add({
      nummer: verkehrsbeziehung.von,
      strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.von, knotenarme),
    });
  }
}

/**
 * true falls die aktuelle Zählung eine Kreuzung darstellt, andernfalls false.
 */
function isZaehlungForKreuzung(): boolean {
  return (
    activeZaehlung.value.kreisverkehr !== undefined &&
    !activeZaehlung.value.kreisverkehr
  );
}

/**
 * Die Methode extrahiert für den Knotenarm im Parameter folgende Knotenarmbezeichnung:
 *
 * "NUMMER_KNOTENARM - STRASSENNAME"
 *
 * Ist in der Map der gegebene Knotenarm nicht vorhanden,
 * so wird der Fluchtwert "Kein Knotenarm gefunden" zurückgegeben.
 *
 * @param knotenarm für den der Knotenarmbezeichner erstellt werden soll.
 * @param knotenarme Map bestehend aus dem Knotenarmbezeichnung je Knotenarm
 */
function getKnotenarmBezeichnung(
  knotenarm: number,
  knotenarme: Map<number, string>
): string {
  const strassenname: string | undefined = knotenarme.get(knotenarm);
  return strassenname === undefined ? "Kein Knotenarm gefunden" : strassenname;
}

/**
 * Auswahl geändert? Event zum Aktualisieren des Optionsobjektes schicken!
 * @param n gewählter Knotenarm
 */
watch(von, (n: number) => {
  let vonCopy = [n];
  if (n === 0) {
    const nachK = moeglicheBeziehungenNach.value.get(von.value);
    if (nachK) {
      // werden die möglichen Zielknoten übergeben
      vonCopy = nachK.moeglicheVerbindungenIds;
    }
  }
  if (vonCopy.length > 1) {
    chosenOptionsCopy.value.vonKnotenarm = null;
  } else {
    chosenOptionsCopy.value.vonKnotenarm = vonCopy[0];
  }
  chosenOptionsCopy.value.vonIds = vonCopy.filter((value) => value !== 0);
});

/**
 * Auswahl geändert? Event zum Aktualisieren des Optionsobjektes schicken!
 * @param n gewählter Knotenarm
 */
watch(nach, (n: number) => {
  let nachCopy = [n];
  // wenn das Ziel "alle" sind...
  if (n === 0) {
    const vonK = moeglicheBeziehungenVon.value.get(von.value);
    if (vonK) {
      // werden die möglichen Zielknoten übergeben
      nachCopy = vonK.moeglicheVerbindungenIds;
    }
  }
  if (nachCopy.length > 1) {
    chosenOptionsCopy.value.nachKnotenarm = null;
  } else {
    chosenOptionsCopy.value.nachKnotenarm = nachCopy[0];
  }
  chosenOptionsCopy.value.nachIds = nachCopy.filter((value) => value !== 0);
});

onMounted(() => {
  initVerkehrsbeziehungen();
  // Von und nach Werte auf die Werte aus dem Options Objekt aus dem Store setzen.
  //
  // Es ist wichtig, dass diese Funktion ausgeführt wird, nachdem die Verkehrsbeziehungen
  // aufbereitet wurden, da durch das Setzen von "von" und "nach" in den entspechenden
  // watch Methoden automatisch die richtigen "vonIds" und "nachIds" gesetzt werden. Damit
  // ist sichergestellt, dass bei einer 1 : n Beziehung alle "nach" Knotenarme in der
  // ZaehlungInfo angezeigt werden.
  reset();
});
</script>
