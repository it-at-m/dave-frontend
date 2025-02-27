<template>
  <v-sheet
    :id="sheetId"
    :height="dimension"
    :width="dimension"
  />
</template>

<script setup lang="ts">
import type ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import type LadeFahrbeziehungDTO from "@/types/zaehlung/LadeFahrbeziehungDTO";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import type { StartEndeUhrzeitIntervalls } from "@/types/zaehlung/StartEndeUhrzeitIntervalls";
import type LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import type { Ref } from "vue";

import * as SVG from "@svgdotjs/svg.js";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

import { useBelastungsplanMethods } from "@/components/zaehlstelle/charts/BelastungsplanMethods";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import BelastungsplanFahrbeziehung from "@/types/zaehlung/BelastungsplanFahrbeziehung";
import BelastungsplanKnotenarm from "@/types/zaehlung/BelastungsplanKnotenarm";
import BerechnungsMatrix from "@/types/zaehlung/BerechnungsMatrix";
import LadeKnotenarmComperator from "@/types/zaehlung/LadeKnotenarmComperator";
import { useDateUtils } from "@/util/DateUtils";

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
const belastungsplanMethods = useBelastungsplanMethods();

const sheetId = "belastungsplan-zaehlstelle";

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

const zaehlstelle = computed<ZaehlstelleHeaderDTO>(() => {
  return zaehlstelleStore.getZaehlstelleHeader;
});

const optionen = computed<OptionsDTO>(() => {
  return zaehlstelleStore.getFilteroptions;
});

const line = computed(() => {
  return lineWidth.value + belastungsplanMethods.lineGap;
});

/**
 * Wenn der Nutzer auf den Tabs navigiert, dann bekommt die Belastungsplan
 * Komponente das als Event mit. Dies ist notwendig, da es Probleme gibt,
 * das SVG zu zeichen, wenn der Tab mit dem Diagramm nicht sichtbar ist.
 */
const activeTab = computed(() => {
  return zaehlstelleStore.getActiveTab;
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
const getLegendLineWidth = computed(() => {
  // Wenn alles gefüllt ist, dann die maxLineWidth
  if (
    props.data &&
    props.data.value1.filled &&
    props.data.value2.filled &&
    props.data.value3.filled
  ) {
    return belastungsplanMethods.maxlineWidth;
  } else {
    // sonst geht mehr
    return belastungsplanMethods.maxLegendLineWidth;
  }
});

/**
 * Über diesen Wert wird die Liniendicke gesteuert, wenn zu wenig Platz vorhanden ist.
 */
const lineFactor = computed(() => {
  return lineWidth.value / highestFahrbeziehungsValue.value;
});

const isDifferenzdatendarstellung = computed(() => {
  return zaehlstelleStore.isDifferenzdatenDarstellung;
});

/**
 * Holt sich bei einer Diffenzdatendarstellung die Vergleichszählung
 */
const vergleichsZaehlung = computed(() => {
  if (
    isDifferenzdatendarstellung.value &&
    optionen.value.vergleichszaehlungsId
  ) {
    return zaehlstelleStore.getZaehlungById(
      optionen.value.vergleichszaehlungsId
    );
  }
  return undefined;
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
          lineFactor.value,
          false
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

  // Legende erstellen
  legendeNordPfeil();
  legendeLinienStaerke();
  legendeSpalten();
  legendeZaehlstellenInfo();

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
 * Erzeugt einen Nordpfeil in der linken oberen Ecke.
 */
function legendeNordPfeil() {
  const nord = canvas.value.group();
  const startX = belastungsplanMethods.chartPosition.value / 3;
  const startY = belastungsplanMethods.chartPosition.value / 3;
  const path = `M${belastungsplanMethods.chartPosition.value / 3} ${startY}
                  L${startX + (2 * belastungsplanMethods.spalt.value) / 3} ${startY}
                  L${startX + belastungsplanMethods.spalt.value / 3} ${startY - belastungsplanMethods.spalt.value * 1.5}
                  z`;
  nord
    .path(path)
    .stroke({ width: 2, color: belastungsplanMethods.legendColor })
    .attr("fill", "none");

  nord
    .text((add) => {
      add
        .tspan("N")
        .x(startX + belastungsplanMethods.spalt.value / 3)
        .dy(startY - belastungsplanMethods.maxlineWidth / 2);
    })
    .font({
      family: belastungsplanMethods.fontfamily,
      size: belastungsplanMethods.maxlineWidth,
      anchor: "middle",
      fill: belastungsplanMethods.legendColor,
    });
}

/**
 * Zeigt die Informationen zur Zählstelle rechts oben in der Ecke an.
 */
function legendeZaehlstellenInfo() {
  const info = canvas.value.group();
  const startX =
    belastungsplanMethods.viewbox -
    belastungsplanMethods.ecke.value -
    belastungsplanMethods.spalt.value;
  const startY = belastungsplanMethods.chartPosition.value / 7;

  info
    .text((add) => {
      add.tspan(`Zählstelle ${zaehlstelle.value.nummer}`).font({
        weight: "bold",
      });
      add.tspan(`Stadtbezirk ${zaehlstelle.value.stadtbezirkNummer}`).newLine();
      add
        .tspan(
          `Zähldatum: ${dateUtils.getShortVersionOfDate(
            new Date(zaehlung.value.datum)
          )}`
        )
        .newLine();
      if (isDifferenzdatendarstellung.value && vergleichsZaehlung.value) {
        const localdate = dateUtils.getShortVersionOfDate(
          new Date(vergleichsZaehlung.value.datum)
        );
        add.tspan(`Vergleichszählung: ${localdate}`).newLine();
      }
    })
    .font({
      family: belastungsplanMethods.fontfamily,
      size: belastungsplanMethods.maxlineWidth,
    })
    .x(startX)
    .y(startY);
}

/**
 * Erzeugt die Benennung der Datenspalten und die entsprechenden Formeln.
 */
function legendeSpalten() {
  const spalten = canvas.value.group();
  const startX = belastungsplanMethods.chartPosition.value / 5;
  const startY =
    belastungsplanMethods.viewbox - belastungsplanMethods.spalt.value * 4.5;
  const formeln = new Map<string, string>();
  if (isDifferenzdatendarstellung.value) {
    formeln.set("KFZ", "KFZ = KFZ (Basis) - KFZ (Vergleich)");
    formeln.set("SV", "SV = SV (Basis) - SV (Vergleich)");
    formeln.set("GV", "GV = GV (Basis) - GV (Vergleich)");
    formeln.set("SV%", "kein SV% beim Vergleich");
    formeln.set("GV%", "kein GV% beim Vergleich");
    formeln.set("RAD", "RAD = RAD (Basis) - RAD (Vergleich)");
    formeln.set(
      "RAD (KI-Hochrechnung)",
      "RAD-KI = RAD-KI (Basis) - RAD-KI (Vergleich)"
    );
    formeln.set("FUSS", "FUSS = KFZ (Basis) - FUSS (Vergleich)");
  } else {
    formeln.set("KFZ", "KFZ = Pkw + Lkw + Lz + Bus + Krad");
    formeln.set("SV", "SV = Lkw + Lz + Bus");
    formeln.set("GV", "GV = Lkw + Lz");
    formeln.set("SV%", "SV-Anteil = SV : KFZ x 100(%)");
    formeln.set("GV%", "GV-Anteil = GV : KFZ x 100(%)");
    formeln.set("RAD", "");
    formeln.set("RAD (KI-Hochrechnung)", "");
    formeln.set("FUSS", "");
  }

  // Zählzeit
  const zeitauswahl: string = optionen.value.zeitauswahl;
  const zaehlzeitFirstLine: string = zeitauswahl;
  let zaehlzeitSecondLine = "";
  if (zeitauswahl === Zeitauswahl.TAGESWERT) {
    zaehlzeitSecondLine = `${
      zaehlung.value.zaehldauer === Zaehldauer.DAUER_24_STUNDEN
        ? zeitblockInfo.get(Zeitblock.ZB_00_24)?.title
        : "hochgerechnet"
    }`;
  } else if (zeitauswahl === Zeitauswahl.BLOCK) {
    zaehlzeitSecondLine = `${
      zeitblockInfo.get(optionen.value.zeitblock)?.title
    }`;
  } else if (zeitauswahl === Zeitauswahl.STUNDE) {
    zaehlzeitSecondLine = `${
      zeitblockStuendlichInfo.get(optionen.value.zeitblock)?.title
    }`;
  } else if (
    zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ ||
    zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
    zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
  ) {
    const startEndeUhrzeitIntervalls: StartEndeUhrzeitIntervalls =
      zaehlstelleStore.getStartEndeUhrzeitIntervalls;
    zaehlzeitSecondLine = `${startEndeUhrzeitIntervalls.startUhrzeitIntervalls} - ${startEndeUhrzeitIntervalls.endeUhrzeitIntervalls} Uhr`;
  }

  spalten
    .text((add) => {
      add.tspan(`${zaehlzeitFirstLine}`).font({ weight: "bold" }).x(startX);
      add.tspan(`${zaehlzeitSecondLine}`).newLine().x(startX);
      add.tspan(``).newLine().x(startX);

      // Spaltenüberschriften
      add
        .tspan(`${props.data.value1.label}`)
        .font({ weight: "bold" })
        .newLine()
        .x(startX);
      // Datenblock 2 gefüllt?
      if (props.data.value2.filled) {
        add
          .tspan(`(${props.data.value2.label})`)
          .font({ weight: "bold" })
          .x(startX + 60);
      }
      // Datenblock 3 gefüllt?
      if (props.data.value3.filled) {
        add
          .tspan(`${props.data.value3.label}`)
          .font({ weight: "bold" })
          .x(startX + 120);
      }

      // Formeln
      add
        .tspan(`${formeln.get(props.data.value1.label)}`)
        .newLine()
        .x(startX);
      // Datenblock 2 gefüllt?
      if (props.data.value2.filled) {
        add
          .tspan(`${formeln.get(props.data.value2.label)}`)
          .newLine()
          .x(startX);
      }
      // Datenblock 3 gefüllt?
      if (props.data.value3.filled) {
        add
          .tspan(`${formeln.get(props.data.value3.label)}`)
          .newLine()
          .x(startX);
      }
    })
    .font({
      family: belastungsplanMethods.fontfamily,
      size: getLegendLineWidth.value,
    })
    .x(startX)
    .y(startY);
}

/**
 * Erzeugt die Legende für die Linienstärke.
 */
function legendeLinienStaerke() {
  const size = canvas.value.group();
  const startX =
    belastungsplanMethods.viewbox - belastungsplanMethods.spalt.value * 5;
  const startY =
    belastungsplanMethods.viewbox - belastungsplanMethods.spalt.value * 2.5;
  const path = `M${startX} ${startY}
                  L${startX + 3 * belastungsplanMethods.spalt.value} ${startY}
                  L${startX + 3 * belastungsplanMethods.spalt.value} ${startY - belastungsplanMethods.maxlineWidth}
                  z`;
  // Legende für die Farbgebung der Linien bei Differenzdatendarstellung
  // rot = Zunahme
  // grün = Abnahme
  if (isDifferenzdatendarstellung.value) {
    size
      .rect(lineWidth.value, lineWidth.value)
      .fill(belastungsplanMethods.zunahmeValueColor)
      .x(startX)
      .y(startY + 35);
    size
      .rect(lineWidth.value, lineWidth.value)
      .fill(belastungsplanMethods.abnahmeValueColor)
      .x(startX)
      .y(startY + 35 + 5 + lineWidth.value);

    size
      .text((add) => {
        add
          .tspan("Zunahme")
          .x(startX + 28)
          .dy(startY + 35 + lineWidth.value);
      })
      .font({
        family: belastungsplanMethods.fontfamily,
        size: belastungsplanMethods.maxlineWidth,
      });

    size
      .text((add) => {
        add
          .tspan("Abnahme")
          .x(startX + 28)
          .dy(startY + 35 + 5 + lineWidth.value * 2);
      })
      .font({
        family: belastungsplanMethods.fontfamily,
        size: belastungsplanMethods.maxlineWidth,
      });
  }

  size
    .path(path)
    .stroke({ width: 2, color: belastungsplanMethods.legendColor })
    .attr("fill", "none");

  const path2 = `M${startX + 1.5 * belastungsplanMethods.spalt.value} ${startY}
                   L${startX + 1.5 * belastungsplanMethods.spalt.value} ${
                     startY - belastungsplanMethods.maxlineWidth / 2
                   }`;
  size
    .path(path2)
    .stroke({ width: 2, color: belastungsplanMethods.legendColor })
    .attr("fill", "none");

  const high =
    highestFahrbeziehungsValue.value +
    (100 - (highestFahrbeziehungsValue.value % 1000));
  size
    .text((add) => {
      add
        .tspan(`${high}`)
        .x(startX + 3 * belastungsplanMethods.spalt.value)
        .dy(startY + belastungsplanMethods.maxlineWidth);
    })
    .font({
      family: belastungsplanMethods.fontfamily,
      size: belastungsplanMethods.maxlineWidth,
      anchor: "middle",
    });

  size
    .text((add) => {
      add
        .tspan(`${high / 2}`)
        .x(startX + 1.5 * belastungsplanMethods.spalt.value)
        .dy(startY + belastungsplanMethods.maxlineWidth);
    })
    .font({
      family: belastungsplanMethods.fontfamily,
      size: belastungsplanMethods.maxlineWidth,
      anchor: "middle",
    });
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
 * Diese Methode zeichnet den Balastungsplan immer dann, wenn von einem anderen Tab auf
 * den Belastungsplan Tab gewechselt wird.
 */
watch(activeTab, (tab: number) => {
  if (tab === 0 && !props.data.kreisverkehr) {
    redraw();
  }
});
/**
 * Diese Methode zeichnet den Belastungsplan, wenn er in den Tabs angezeigt wird. Also Tab0
 * aktiv und damit auch sichtbar ist.
 */
watch(
  () => props.data,
  (data: LadeBelastungsplanDTO) => {
    if (activeTab.value === 0 && !data.kreisverkehr) {
      redraw();
    }
  }
);
</script>
