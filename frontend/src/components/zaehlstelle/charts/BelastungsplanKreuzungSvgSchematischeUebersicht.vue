<template>
  <v-sheet
    :id="sheetId"
    :height="dimension"
    :width="dimension"
  />
</template>

<script setup lang="ts">
import type LadeFahrbeziehungDTO from "@/types/zaehlung/LadeFahrbeziehungDTO";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import type { Ref } from "vue";

import * as SVG from "@svgdotjs/svg.js";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import { useBelastungsplanMethods } from "@/components/zaehlstelle/charts/BelastungsplanMethods";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import BelastungsplanFahrbeziehung from "@/types/zaehlung/BelastungsplanFahrbeziehung";
import BelastungsplanKnotenarm from "@/types/zaehlung/BelastungsplanKnotenarm";
import BerechnungsMatrix from "@/types/zaehlung/BerechnungsMatrix";
import LadeKnotenarmComperator from "@/types/zaehlung/LadeKnotenarmComperator";

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
const belastungsplanMethods = useBelastungsplanMethods();

const sheetId = "belastungsplan-zaehlstelle-schema";

// werden initial errechnet und sind dann gesetzt
const vonMaxValue = ref(0);
const nachMaxValue = ref(0);
const lineWidth = ref(0);
const fahrtrichtungWidth = ref(0);
const highestFahrbeziehungsValue = ref(0);
const lowestFahrbeziehungsValue = ref(1000000);

const fahrbeziehungsTypen = ref<Map<number, BelastungsplanFahrbeziehung[]>>(
  new Map<number, BelastungsplanFahrbeziehung[]>()
) as Ref<Map<number, BelastungsplanFahrbeziehung[]>>;
const knotenarme = ref<Map<number, BelastungsplanKnotenarm>>(
  new Map<number, BelastungsplanKnotenarm>()
) as Ref<Map<number, BelastungsplanKnotenarm>>;
const prozentWerte = ref<Map<number, boolean>>(new Map<number, boolean>());

const canvas = ref<SVG.Svg>(SVG.SVG());
const documentationGroup = ref<SVG.G>(canvas.value.group());

onMounted(() => {
  canvas.value = SVG.SVG()
    .addTo(`#${sheetId}`)
    .size(props.dimension, props.dimension)
    .viewbox(
      0,
      0,
      belastungsplanMethods.viewbox,
      belastungsplanMethods.viewbox
    );

  zaehlstelleStore.setSizeBelastungsplanSvg(
    Number.parseInt(sizeBelastungsplan.value.replace("px", ""))
  );
  zaehlstelleStore.setMaxSizeBelastungsplanSvg(maxSizeBelastungsplan.value);
  zaehlstelleStore.setMinSizeBelastungsplanSvg(minSizeBelastungsplan.value);
});

const zaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

const line = computed(() => {
  return lineWidth.value + belastungsplanMethods.lineGap;
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

const isDifferenzdatendarstellung = computed(() => {
  return zaehlstelleStore.isDifferenzdatenDarstellung;
});

/**
 * Diese Methode zeichnet den Belastungsplan
 */
function draw() {
  const cleanseMap = new Map<number, SVG.G>();
  canvas.value.clear();
  // ausgewählter Knotenarm bei Geometrieauswahl
  let selectedKnotenarm = 0;
  // Es wird eine Hilfs-Gruppe erstellt, mit der die Positionen der Fahrbeziehungen im Raum ermittelt werden können.
  // diese wird im Anschluss wieder gelöscht
  documentationGroup.value = canvas.value.group();
  documentationGroup.value
    .rect(belastungsplanMethods.viewbox, belastungsplanMethods.viewbox)
    .fill({
      color: "white",
      opacity: belastungsplanMethods.docMode ? 0.3 : 0.0,
    });

  // Die Knotenarme werden einzeln in das Diagramm eingefügt
  const knotenarmeInline = zaehlung.value.knotenarme as LadeKnotenarmDTO[];
  if (knotenarmeInline) {
    let ks = Object.assign(new Array<LadeKnotenarmDTO>(), knotenarmeInline);
    ks = ks.sort(LadeKnotenarmComperator.sortByNumber).reverse();
    ks.forEach((k) => {
      const r = belastungsplanMethods.calcRotation(k.nummer);
      const g = belastungsplanMethods
        .fahrtrichtungVon(
          k.nummer,
          canvas.value,
          knotenarme.value,
          fahrbeziehungsTypen.value,
          prozentWerte.value,
          lineWidth.value,
          line.value,
          documentationGroup.value,
          1,
          true
        )
        .rotate(r) as SVG.G;
      cleanseMap.set(k.nummer, g);
      // Wenn der Knotenarm ausgewählt wurde, dann merken wir uns die
      // Nummer, um ihn später nach oben setzen zu können.
      if (belastungsplanMethods.isSelectedKnotenarm(k.nummer)) {
        selectedKnotenarm = k.nummer;
      }
    });

    // Wenn die Säuberung zu schnell nach der Transformation erfolgte, sind
    // Fehler aufgetreten. Deshalb die eigene Liste.
    cleanseMap.forEach((group, knotenarmnummer) => {
      const matrix = group.transform();
      const m = new BerechnungsMatrix(
        matrix.a,
        matrix.b,
        matrix.c,
        matrix.d,
        matrix.e,
        matrix.f
      );
      const cleanGroup = belastungsplanMethods.cleansePaths(
        group,
        m,
        canvas.value
      ) as SVG.G;
      cleanseMap.set(knotenarmnummer, cleanGroup);
    });

    //  Wenn wir noch eine Geometrieauswahl haben, dann muss die ausgewählte Gruppe nach oben
    if (selectedKnotenarm > 0) {
      cleanseMap.get(selectedKnotenarm)!.front();
    }
  }
  // Wenn man die Dokumentation braucht, dann sollte sie ganz vorne sein
  if (belastungsplanMethods.docMode) {
    documentationGroup.value.front();
  } else {
    // ansonsten werden die Hilfspfade wieder aus dem Diagramm entfernt
    documentationGroup.value.remove();
  }

  // Druckdatei an übergeordnete Komponente übergeben. Die kann dann gedruckt werden oder auch nicht.
  // Die Datei wird automatisch ersetzt, sobald sich etwas am Chart verändert.
  //
  // Um den Belastungsplan in ein Bitmap umwandeln zu können, muss hier eine absolute Größe gesetzt werden.
  const size = sizeBelastungsplan.value;
  const ex = canvas.value
    .flatten(canvas.value)
    .size(size, size)
    .svg() as string;
  emits("print", new Blob([ex], { type: "image/svg+xml;charset=utf-8" }));
}

/**
 * Hier werden alle Daten gesammelt bzw. aufbereitet, die zur Anzeige des Diagramms notwendig sind. Diese
 * Methode wird aufgerufen, wenn über das Property "data" die Daten zur Darstellung des Belastungsplanes
 * erneuert werden.
 *
 * @param data  Die Anzeigedaten des Belastungsplanes.
 */
function calcFahrbeziehungen(data: LadeBelastungsplanDTO) {
  // alte Daten ggf. leeren
  knotenarme.value.clear();
  fahrbeziehungsTypen.value.clear();
  highestFahrbeziehungsValue.value = 0;
  lowestFahrbeziehungsValue.value = 0;
  // Die Datentypen der Werteblöcke werden extrahiert
  prozentWerte.value.set(0, data.value1.percent);
  prozentWerte.value.set(1, data.value2.percent);
  prozentWerte.value.set(2, data.value3.percent);
  // Aus der aktuellen Zählung (diese ist im $store) werden die Fahrbeziehungen geladen.
  const fbs = zaehlung.value.fahrbeziehungen as LadeFahrbeziehungDTO[];
  if (fbs && Array.isArray(fbs)) {
    // Für jede Fahrbeziehung werden die Daten aufbereitet
    fbs.forEach((fb) => {
      // Wenn es für den Knotenarm noch keinen Eintrag für die Fahrbeziehungstypen gibt,
      // dann muss dieser angelegt werden.
      if (!fahrbeziehungsTypen.value.has(fb.von)) {
        fahrbeziehungsTypen.value.set(
          fb.von,
          new Array<BelastungsplanFahrbeziehung>()
        );
      }

      // Für Knotenarme, die nur eingehende Fahrbeziehungen haben.
      if (!fahrbeziehungsTypen.value.has(fb.nach)) {
        fahrbeziehungsTypen.value.set(
          fb.nach,
          new Array<BelastungsplanFahrbeziehung>()
        );
      }

      // Wenn es für den Knotenarm noch keinen Eintrag in den Knotenarmen gibt,
      // dann muss dieser angelegt werden. Das muss sowohl für "von" als auch für
      // "nach" gemacht werden.

      // "von" checken und ggf. anlegen
      if (!knotenarme.value.has(fb.von)) {
        knotenarme.value.set(
          fb.von,
          new BelastungsplanKnotenarm(data.streets[fb.von - 1], fb.von)
        );
      }
      const knotenarmVon = knotenarme.value.get(fb.von);
      belastungsplanMethods.anzeigeWerte(knotenarmVon, data);
      // "nach" checken und ggf. anlegen
      if (!knotenarme.value.has(fb.nach)) {
        knotenarme.value.set(
          fb.nach,
          new BelastungsplanKnotenarm(data.streets[fb.nach - 1], fb.nach)
        );
      }
      const knotenarmNach = knotenarme.value.get(fb.nach);
      belastungsplanMethods.anzeigeWerte(knotenarmNach, data);

      // Fahrbeziehungstypen (Rechts-/Linksabbieger usw.) ermitteln
      const belastungsplanFahrbeziehungen = fahrbeziehungsTypen.value.get(
        fb.von
      ) as BelastungsplanFahrbeziehung[];
      const belastungsplanFahrbeziehung = new BelastungsplanFahrbeziehung(
        belastungsplanMethods.calcFahrbeziehungstype(fb.von, fb.nach),
        fb.nach
      ) as BelastungsplanFahrbeziehung;
      belastungsplanFahrbeziehungen.push(belastungsplanFahrbeziehung);

      const v = fb.von - 1;
      const n = fb.nach - 1;

      // Fahrwerte zu den einzelnen Fahrbeziehungen zuordnen
      belastungsplanFahrbeziehung.value1 = data.value1.values[v][n];
      if (data.value2.filled) {
        belastungsplanFahrbeziehung.value2 = data.value2.values[v][n];
      }
      if (data.value3.filled) {
        belastungsplanFahrbeziehung.value3 = data.value3.values[v][n];
      }

      if (knotenarmVon) {
        // von Zähler hoch setzen
        knotenarmVon.plusFahrbeziehungenVon();
        if (
          belastungsplanMethods.positiveNumber(
            knotenarmVon.anzahlVonFahrbeziehungen
          ) > vonMaxValue.value
        )
          vonMaxValue.value = belastungsplanMethods.positiveNumber(
            knotenarmVon.anzahlVonFahrbeziehungen
          );
        // den höchsten und niedrigsten Wert einer Fahrbeziehung ermitteln
        // (gilt hier nur der KFZ Verkehr?)
        if (
          belastungsplanMethods.positiveNumber(data.value1.values[v][n]) >
          highestFahrbeziehungsValue.value
        )
          highestFahrbeziehungsValue.value =
            belastungsplanMethods.positiveNumber(data.value1.values[v][n]);
        if (
          belastungsplanMethods.positiveNumber(data.value1.values[v][n]) <
          lowestFahrbeziehungsValue.value
        )
          lowestFahrbeziehungsValue.value =
            belastungsplanMethods.positiveNumber(data.value1.values[v][n]);
        // Fahrbeziehungstyp wird gesetzt um später die Position der Linien berrechnen zu können
        knotenarmVon.addVonFahrbeziehungsType(
          belastungsplanFahrbeziehung.fahrbeziehungsTyp
        );
      }

      if (knotenarmNach) {
        // nach Zähler hoch setzen
        knotenarmNach.plusFahrbeziehungenNach();
        if (
          belastungsplanMethods.positiveNumber(
            knotenarmNach.anzahlNachFahrbeziehungen
          ) > nachMaxValue.value
        )
          nachMaxValue.value = belastungsplanMethods.positiveNumber(
            knotenarmNach.anzahlNachFahrbeziehungen
          );
        // den Typ der eingehenden Verbindung speichern
        knotenarmNach.addNachFahrbeziehungsTyp(
          belastungsplanFahrbeziehung.fahrbeziehungsTyp
        );
      }
    });

    // Im Nachgang werden die Positionen der "geradeaus" Fahrbeziehungen ermittelt. Diese sind
    // wichtig, weil daran die anderen Fahrbeziehungen ausgerichtet werden. D.h. auf der "nach"
    // Seite muss ich wissen, auf welcher Position die gerade Fahrbeziehung im "von" plaziert ist, um die
    //  anderen eingehenden Fahrbeziehungen danach ausrichten zu können.
    knotenarme.value.forEach((k) => {
      let gegenueber = 0;
      if ([5, 2, 6, 1].includes(k.knotenarmNummer)) {
        gegenueber = k.knotenarmNummer + 2;
      }

      if ([8, 4, 7, 3].includes(k.knotenarmNummer)) {
        gegenueber = k.knotenarmNummer - 2;
      }
      if (knotenarme.value.has(gegenueber)) {
        belastungsplanMethods.fahrbeziehungenAusrichten(
          k,
          knotenarme.value.get(gegenueber)!
        );
      }

      // Es werden die Summen in die Knotenarem geschrieben
      const knummer = k.knotenarmNummer - 1;
      k.vonTotalValue1 = data.value1.sumIn[knummer];
      k.nachTotalValue1 = data.value1.sumOut[knummer];
      k.totalValue1 = data.value1.sum[knummer];
      // Soll Wert 2 dargestellt werden?
      if (
        data.value2.filled &&
        !(isDifferenzdatendarstellung.value && data.value2.percent)
      ) {
        k.vonTotalValue2 = data.value2.sumIn[knummer];
        k.nachTotalValue2 = data.value2.sumOut[knummer];
        k.totalValue2 = data.value2.sum[knummer];
      }
      // Soll Wert 3 dargestellt werden?
      if (
        data.value3.filled &&
        !(isDifferenzdatendarstellung.value && data.value3.percent)
      ) {
        k.vonTotalValue3 = data.value3.sumIn[knummer];
        k.nachTotalValue3 = data.value3.sumOut[knummer];
        k.totalValue3 = data.value3.sum[knummer];
      }
    });

    // maximale Linien Dicke berechnen
    calcMaxLineWidth();

    // Belastungsplan ausgeben
    draw();
  }
}

/**
 * Die maximale Dicke der Linien wird errechnet. Maßgeblich ist hierbei, ob die Summe des
 * größten "von" oder "nach" Knotenarms, mutlipliziert mit der maximalen Linien Stärke und
 * der jeweiligen Lücke zwischen den Linien, größer oder kleiner als die maximale Breite
 * einer Fahrtrichtung ist. Ist sie kleiner, so kann die maximale Linienbreite verwendet
 * werden, ist sie größer, so muss die Linienbreite so weit reduziert werden, dass alle
 * Fahrbeziehungen mit ihrer maximalen Breite aus eine Fahrtrichtung passen.
 */
function calcMaxLineWidth() {
  const mw = belastungsplanMethods.maxlineWidth + belastungsplanMethods.lineGap;
  let mv: number;
  if (vonMaxValue.value > nachMaxValue.value) {
    mv = vonMaxValue.value;
  } else {
    mv = nachMaxValue.value;
  }
  if (mv * mw > belastungsplanMethods.maxFahrtrichtungWidth.value) {
    // die maximale Breite der Linien muss reduziert werden

    // Der Platz, der nach Abzug der Lücke je Linie bleibt, muss durch die Anzahl
    // der maximalen linien geteilt werden. Die Breite der Linie wird abgerundet,
    // damit wir einen glatten Wert für die Textgröße haben.
    lineWidth.value = Math.ceil(
      (belastungsplanMethods.maxFahrtrichtungWidth.value -
        mv * belastungsplanMethods.lineGap) /
        mv
    );
    fahrtrichtungWidth.value =
      belastungsplanMethods.maxFahrtrichtungWidth.value;
  } else {
    // die maximale Breite der Linien kann so bleiben
    fahrtrichtungWidth.value = mv * mw;
    lineWidth.value = belastungsplanMethods.maxlineWidth;
  }
}

function redraw() {
  nextTick(() => {
    calcFahrbeziehungen(props.data);
  });
}

/**
 * Diese Methode zeichnet den Belastungsplan, wenn er in den Tabs angezeigt wird. Also Tab0
 * aktiv und damit auch sichtbar ist.
 */
watch(
  () => props.data,
  (data: LadeBelastungsplanDTO) => {
    if (!data.kreisverkehr) {
      redraw();
    }
  }
);
</script>
