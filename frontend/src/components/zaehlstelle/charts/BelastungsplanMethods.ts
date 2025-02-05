import type BelastungsplanKnotenarm from "@/types/zaehlung/BelastungsplanKnotenarm";
import type BerechnungsMatrix from "@/types/zaehlung/BerechnungsMatrix";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import type LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";

import * as SVG from "@svgdotjs/svg.js";
import { computed } from "vue";

import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Fahrtrichtungsarten from "@/types/enum/Fahrtrichtungsarten";
import BelastungsplanFahrbeziehung from "@/types/zaehlung/BelastungsplanFahrbeziehung";
import BelastungsplanFahrbeziehungComperator from "@/types/zaehlung/BelastungsplanFahrbeziehungComperator";

export function useBelastungsplanMethods() {
  const zaehlstelleStore = useZaehlstelleStore();

  const rotation = new Map<number, number>([
    [1, 90],
    [2, 180],
    [3, 270],
    [4, 0],
    [5, 135],
    [6, 225],
    [7, 315],
    [8, 45],
  ]);

  const farben = new Map<number, string>([
    [1, "#000000"],
    [2, "#F44336"],
    [3, "#4CAF50"],
    [4, "#2196F3"],
    [5, "#CDDC39"],
    [6, "#9C27B0"],
    [7, "#FF9800"],
    [8, "#795548"],
  ]);

  const rotationLabel = new Map<number, number>([
    [1, 270],
    [2, 0],
    [3, 270],
    [4, 0],
    [5, 315],
    [6, 45],
    [7, 315],
    [8, 45],
  ]);

  const rotationNumber = new Map<number, number>([
    [1, 270],
    [2, 180],
    [3, 90],
    [4, 0],
    [5, 225],
    [6, 135],
    [7, 45],
    [8, 315],
  ]);

  // Soll die Geometrieauswahl im Belastungsplan gezeigt werden
  const geometrieMode: boolean = true;
  const shadowOpacity = 0.5;
  // Exported Functions and Constants
  // die Basis Werte zum Errechnen der Positionen
  const viewbox = 1400;
  const fontfamily = "Roboto, Arial, Helvetica, sans-serif";
  // Grafischer Modus, um zu dokumentieren, wie die Winkelverbindungen
  // 45° / 135° errechnet werden.
  const docMode: boolean = false;
  const lineGap = 3;
  const maxlineWidth = 20;
  const maxLegendLineWidth = 25;
  // Farben Differenzdatendarstellung
  const zunahmeValueColor: string = "#F44336";
  const abnahmeValueColor: string = "#4CAF50";
  const gleichValueColor: string = "#000000";
  const shadowColor = "#E0E0E0";
  const legendColor = "#757575";
  const inaktivColor = "#E0E0E0";
  // Prozentwerte um die Strecken zu errechnen
  const prozentDiagram = 0.6;
  const prozentSpalt = 0.05;
  const prozentMaxFahrtrichtungWidth = 0.12;

  const optionen = computed<OptionsDTO>(() => {
    return zaehlstelleStore.getFilteroptions;
  });

  const isBlackPrintMode = computed(() => {
    return zaehlstelleStore.isBlackprintMode;
  });

  const vonIds = computed(() => {
    return optionen.value.vonIds;
  });

  const nachIds = computed(() => {
    return optionen.value.nachIds;
  });

  const beideRichtungen = computed(() => {
    return optionen.value.beideRichtungen;
  });

  const isDifferenzdatendarstellung = computed(() => {
    return zaehlstelleStore.isDifferenzdatenDarstellung;
  });

  const seite = computed(() => {
    return viewbox * prozentDiagram;
  });

  const maxFahrtrichtungWidth = computed(() => {
    return seite.value * prozentMaxFahrtrichtungWidth;
  });

  /**
   * Die "Mitte" ist immer die Seite des regelmäßigen Achteckes.
   */
  const mitte = computed(() => {
    return seite.value / (1 + Math.sqrt(2));
  });

  const ecke = computed(() => {
    return (seite.value - mitte.value) / 2;
  });

  const basis = computed(() => {
    return mitte.value - spalt.value * 2;
  });

  const chartPosition = computed(() => {
    return (viewbox - seite.value) / 2;
  });

  const spalt = computed(() => {
    return seite.value * prozentSpalt;
  });

  /**
   * Prüft, ob sich zwei Knotenarme gegenüber liegen.
   */
  function isGegenueber(von: number, nach: number): boolean {
    return (
      (von === 1 && nach === 3) ||
      (von === 5 && nach === 7) ||
      (von === 2 && nach === 4) ||
      (von === 6 && nach === 8) ||
      (von === 3 && nach === 1) ||
      (von === 7 && nach === 5) ||
      (von === 4 && nach === 2) ||
      (von === 8 && nach === 6)
    );
  }

  /**
   * Wandelt eine negative Zahl in eine positive um. Das ist bei der Differenzdatendarstellung notwendig,
   * da eine Linie mit -200 genauso breit dargestellt werden muss, wie eine Linie mit +200.
   *
   * @param num   Anzahl der Fahrzeuge
   */
  function positiveNumber(num: number): number {
    if (num < 0) {
      return num * -1;
    }
    return num;
  }

  /**
   * Füllt die Marker, welche Werte überhaupt angezeigt werden.
   *
   * @param knotenarm   Knotenarm
   * @param data        Belastungsplandaten
   */
  function anzeigeWerte(
    knotenarm: BelastungsplanKnotenarm | undefined,
    data: LadeBelastungsplanDTO
  ) {
    if (knotenarm) {
      knotenarm.is1Filled = data.value1.filled;
      knotenarm.is2Filled = data.value2.filled;
      knotenarm.is3Filled = data.value3.filled;
    }
  }

  /**
   * Berechnet die Lage der neuen Punkte anhand der SVG Berechnungs Matrix und den
   * alten Koordinanten.
   *
   * @param matrix  SVG Berechnungsmatrix
   * @param x       alter X Wert
   * @param y       alter Y Wert
   */
  function matrix(matrix: BerechnungsMatrix, x: number, y: number): number[] {
    const nx = matrix.a! * x + matrix.c! * y + matrix.e!;
    const ny = matrix.b! * x + matrix.d! * y + matrix.f!;
    return [nx, ny];
  }

  /**
   * Erzeugt einen neuen SVG Pfad als String.
   *
   * @param svgMatrix   SVG Berechnungsmatrix
   * @param pathArray   der alte Pfad als Path Array
   */
  function recreatePath(
    svgMatrix: BerechnungsMatrix,
    pathArray: SVG.PathArray
  ): string {
    let path = "";
    // Jeden Eintrag des Path Arrays auslesen, umrechnen und an den neuen Pfadstring
    // dran hängen.
    pathArray.forEach((item) => {
      // M und L - Gerade
      if (item[0] === "M" || item[0] === "L") {
        const xy = matrix(svgMatrix, item[1], item[2]);
        path = `${path} ${item[0]}${xy[0]} ${xy[1]}`;
      }
      // Q - Kurven
      if (item[0] === "Q") {
        const xy1 = matrix(svgMatrix, item[1], item[2]);
        const xy2 = matrix(svgMatrix, item[3], item[4]);
        path = `${path} ${item[0]}${xy1[0]} ${xy1[1]} ${xy2[0]} ${xy2[1]}`;
      }
    });
    return path.trim();
  }

  /**
   * Säubert die Pfade so, dass sie keine Transformationen mehr benötigen. Das hat beim PDF
   * Druck zu Problemen geführt.
   *
   */
  function cleansePaths(
    source: SVG.G,
    matrix: BerechnungsMatrix,
    canvas: SVG.Svg
  ): SVG.G {
    const sink = canvas.group();
    source.children().forEach((child) => {
      // In den Gruppen sind die Pfade. Diese werden neu gebaut
      if (child instanceof SVG.G) {
        // Gruppe für die Pfade erstellen
        const pg = sink.group();
        // Alle Kinder der Pfadgruppe durch gehen
        child.children().forEach((sub) => {
          if (sub instanceof SVG.Path) {
            // Fahrbeziehung klonen, damit eigenschaften wie Linienstärke, Farbe usw. erhalten bleiben
            const clone = sub.clone();
            // Den Pfad für Position nach der Drehung berechnen
            const path = recreatePath(matrix, clone.array());
            // Den Pfad erneuern (alle anderen Eigenschaften bleiben bei plot erhalten).
            clone.plot(path);
            // Zur neuen Gruppe hinzufügen.
            pg.add(clone);
          }
        });
        child.remove();
      }
    });
    return sink;
  }

  /**
   * Um die Lücken auszugleichen, wird ein Ausgleichswert berechnet. Im Prinzip ist das die Differenz zwischen
   * den gegenüberliegenden Seiten. Dieser Ausgleichswert wird im "NACH" Knotenarm gespeichert und dann zur
   * Berrechnung hinzugezogen. Per Default ist dieser Ausgleichswert 0 (es muss in der Regel nichts ausgeglichen
   * werden). Nur bei den Problemfällen ist er größer oder kleiner 0.
   *
   * @param von   "von" Knotenarm
   * @param nach  "nach" Knotenarm
   */
  function ausgleichBerechnen(
    von: BelastungsplanKnotenarm,
    nach: BelastungsplanKnotenarm
  ) {
    // Der Index der Geraden Fahrbeziehung muss voneinander abweichen, um ein Problem zu sein.
    const indexVon = von.vonFahrbeziehungsTypen
      .sort()
      .indexOf(Fahrtrichtungsarten.GERADE);
    const indexNach = nach.findFahrbeziehungsNachPosition(
      Fahrtrichtungsarten.GERADE
    );
    if (indexVon != indexNach) {
      // Ein Problem in der Anzeige tritt aber erst dann auf, wenn auf den gegenüber liegenden Knotenarmen
      // rechte und/oder linke Fahrtrichtungen abweichen.
      nach.ausgleich = indexVon - indexNach;
    }
  }

  /**
   * Die Fahrbeziehungen sollen so ausgerichtet werden, dass keine Lücken entstehen. Das passiert
   * immer dann, wenn es eine gerade Fahrbeziehung zwischen zwei Knotenarmen gibt und links oder rechts von der
   * Geraden unterschiedlich viele Fahrbeziehung plaziert sind.
   *
   * @param von   "von" Knotenarm
   * @param nach  "nach" Knotenarm
   */
  function fahrbeziehungenAusrichten(
    von: BelastungsplanKnotenarm,
    nach: BelastungsplanKnotenarm
  ) {
    if (
      nach.nachFahrbeziehungsTypen.includes(Fahrtrichtungsarten.GERADE) &&
      isGegenueber(von.knotenarmNummer, nach.knotenarmNummer)
    ) {
      // Muss für beide Seiten ein Ausgleich erzeugt werden
      ausgleichBerechnen(von, nach);
      ausgleichBerechnen(nach, von);
    }
  }

  /**
   * Berechnet - abhängig vom Knotenarm - die Rotation um die Mitte.
   *
   * @param knotenarmnummer
   */
  function calcRotation(knotenarmnummer: number): number {
    let r = rotation.get(knotenarmnummer);
    if (!r) {
      r = 0;
    }
    return r;
  }

  /**
   * Berechnet die Rotation für die Labels
   *
   * @param knotenarmnummer
   */
  function calcLabelRotation(knotenarmnummer: number): number {
    let r = rotationLabel.get(knotenarmnummer);
    if (!r) {
      r = 0;
    }
    return r;
  }

  /**
   * Typen der ausgehenden Fahrbeziehungen je Knotenarm werden ermittelt. Dies passiert, indem abgefragt wird, wie
   * welche knotenarme miteinander verbunden sind.
   *
   * @param von     "von" Knotenarmnummer
   * @param nach    "nach" Knotenarmnummer
   */
  function calcFahrbeziehungstype(von: number, nach: number): number {
    // Uturn
    if (von === nach) {
      return Fahrtrichtungsarten.UTURN;
    }

    // gerade aus
    if (isGegenueber(von, nach)) {
      return Fahrtrichtungsarten.GERADE;
    }

    // rechts 45°
    if (
      ([2, 3, 4].includes(von) && von + 3 === nach) ||
      ([5, 6, 7, 8].includes(von) && von - 4 === nach) ||
      (von === 1 && nach === 8)
    ) {
      return Fahrtrichtungsarten.RECHTS45;
    }

    // rechts 90°
    if (
      ([4, 3, 2, 6, 7, 8].includes(von) && von - 1 === nach) ||
      (von === 1 && nach === 4) ||
      (von === 5 && nach === 8)
    ) {
      return Fahrtrichtungsarten.RECHTS90;
    }

    // rechts 135°
    if (
      (von === 1 && nach === 7) ||
      (von === 2 && nach === 8) ||
      (von === 3 && nach === 5) ||
      (von === 4 && nach === 6) ||
      (von === 5 && nach === 4) ||
      (von === 6 && nach === 1) ||
      (von === 7 && nach === 2) ||
      (von === 8 && nach === 3)
    ) {
      return Fahrtrichtungsarten.RECHTS135;
    }

    // links 45°
    if (
      ([1, 2, 3, 4].includes(von) && von + 4 === nach) ||
      ([5, 6, 7].includes(von) && von - 3 === nach) ||
      (von === 8 && nach === 1)
    ) {
      return Fahrtrichtungsarten.LINKS45;
    }

    // links 90°
    if (
      ([1, 2, 3, 5, 6, 7].includes(von) && von + 1 === nach) ||
      (von === 4 && nach === 1) ||
      (von === 8 && nach === 5)
    ) {
      return Fahrtrichtungsarten.LINKS90;
    }

    // links 135°
    if (
      ([1, 2, 3].includes(von) && von + 5 === nach) ||
      (von === 4 && nach === 5) ||
      ([5, 6].includes(von) && nach === von - 2) ||
      (von === 7 && nach === 1) ||
      (von === 8 && nach === 2)
    ) {
      return Fahrtrichtungsarten.LINKS135;
    }
    return -1;
  }

  function fahrtrichtungVon(
    knotenarmnummer: number,
    canvas: SVG.Svg,
    knotenarme: Map<number, BelastungsplanKnotenarm>,
    fahrbeziehungsTypen: Map<number, Array<BelastungsplanFahrbeziehung>>,
    prozentWerte: Map<number, boolean>,
    lineWidth: number,
    line: number,
    documentationGroup: SVG.G,
    lineFactor: number,
    schema: boolean
  ): SVG.G {
    // Es wird alles gruppiert, damit wir es später einfach so drehen können, dass der Knotenarm richtig sitzt.
    const knotenarmGroup = canvas.group() as SVG.G;

    // Knotenarm Infos
    const knotenarm = knotenarme.get(knotenarmnummer);

    // Einstellungen
    // die Transparenz der Hilfsquadrate. Sollte in der Regel 0.0 sein
    const opacity = 0.0;

    if (fahrbeziehungsTypen.has(knotenarmnummer) && knotenarm) {
      // Gruppe für alle Fahrbeziehungen eines Knotenarms
      const fahrbeziehungsGroup = canvas.group() as SVG.G;
      fahrbeziehungsGroup
        .rect(viewbox, viewbox)
        .fill({ color: "white", opacity: opacity });
      // hier werden die Schattenlinien der Fahrbeziehungen je Knotenarm gesammelt
      const shadowGroup = canvas.group() as SVG.G;
      shadowGroup
        .rect(viewbox, viewbox)
        .fill({ color: "white", opacity: opacity });
      shadowGroup.back();

      // Die Sortierung ist wichtig, weil sie vorgibt, in welcher Reihenfolge die Fahrbeziehungen auf der
      // Fahrtrichtung angeordnet werden.
      const fbts = fahrbeziehungsTypen
        .get(knotenarmnummer)
        ?.sort(
          BelastungsplanFahrbeziehungComperator.sortByFahrtrichtungsart
        ) as BelastungsplanFahrbeziehung[];

      // Jede Fahrbeziehung des Knotenarms wird durchiteriert. Je nach Fahrbeziehungstyp (Rechtsabbieger 90°,
      // geradeaus, usw.) wird die Linie gezeichnet. Je Fahrbeziehung hat genau einen Fahrbeziehungstypen.
      fbts.forEach((fbt) => {
        // Die Position der Fahrbeziehung in der Fahrtrichtung "von"
        const vonPosition = knotenarme
          .get(knotenarmnummer)!
          .findFahrbeziehungVonPosition(fbt.fahrbeziehungsTyp);

        // Die Position der Fahrbeziehung in der Fahrtrichtung "nach"
        const nachPosition = knotenarme
          .get(fbt.nach)!
          .findFahrbeziehungsNachPosition(fbt.fahrbeziehungsTyp);

        // Der Startpunkt
        const startX = chartPosition.value;
        const startY = viewbox / 2 + basis.value / 2 - vonPosition * line;

        // rechts 45°
        if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.RECHTS45) {
          const start = new SVG.Point(startX, startY);
          const achteck1 = new SVG.Point(
            chartPosition.value,
            chartPosition.value + ecke.value + mitte.value
          );
          const achteck2 = new SVG.Point(
            chartPosition.value + ecke.value + mitte.value,
            chartPosition.value
          );
          const path = zielPunkt(
            achteck1,
            new SVG.Point(achteck1.x + ecke.value, achteck1.y + ecke.value),
            achteck2,
            new SVG.Point(achteck2.x + ecke.value, achteck2.y + ecke.value),
            start,
            nachPosition,
            ecke.value / 4,
            true,
            line,
            documentationGroup
          );
          fahrbeziehungsGroup
            .path(path)
            .stroke({
              width: calcLineWidth(fbt.total, lineFactor, schema, lineWidth),
              color: lineColor(knotenarmnummer, fbt.nach, fbt.total, schema),
            })
            .attr("fill", "none");
          shadowGroup
            .path(path)
            .stroke({
              width: lineWidth,
              color: shadowColor,
              opacity: shadowOpacity,
            })
            .attr("fill", "none");
        }

        // rechts 90°
        if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.RECHTS90) {
          const zielX = startX + ecke.value + spalt.value + nachPosition * line;
          const zielY = viewbox - chartPosition.value;
          const path = `M${startX} ${startY}
                        L${startX + ecke.value + nachPosition * line} ${startY}
                        Q${zielX} ${startY}
                         ${zielX} ${startY + spalt.value}
                        L${zielX} ${zielY}`;
          fahrbeziehungsGroup
            .path(path)
            .stroke({
              width: calcLineWidth(fbt.total, lineFactor, schema, lineWidth),
              color: lineColor(knotenarmnummer, fbt.nach, fbt.total, schema),
            })
            .attr("fill", "none");
          shadowGroup
            .path(path)
            .stroke({
              width: lineWidth,
              color: shadowColor,
              opacity: shadowOpacity,
            })
            .attr("fill", "none");
        }

        // rechts 135°
        if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.RECHTS135) {
          const start = new SVG.Point(startX, startY);
          const achteck1 = new SVG.Point(
            chartPosition.value + ecke.value + mitte.value,
            chartPosition.value + seite.value
          );
          const achteck2 = new SVG.Point(
            chartPosition.value,
            chartPosition.value + ecke.value
          );
          const path = zielPunkt(
            achteck1,
            new SVG.Point(achteck1.x + ecke.value, achteck1.y - ecke.value),
            achteck2,
            new SVG.Point(achteck2.x + ecke.value, achteck2.y - ecke.value),
            start,
            nachPosition,
            ecke.value + spalt.value,
            false,
            line,
            documentationGroup
          );
          fahrbeziehungsGroup
            .path(path)
            .stroke({
              width: calcLineWidth(fbt.total, lineFactor, schema, lineWidth),
              color: lineColor(knotenarmnummer, fbt.nach, fbt.total, schema),
            })
            .attr("fill", "none");
          shadowGroup
            .path(path)
            .stroke({
              width: lineWidth,
              color: shadowColor,
              opacity: shadowOpacity,
            })
            .attr("fill", "none");
        }

        // geradeaus
        if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.GERADE) {
          const path = `M${startX} ${startY} L${startX + seite.value} ${startY}`;
          fahrbeziehungsGroup.path(path).stroke({
            width: calcLineWidth(fbt.total, lineFactor, schema, lineWidth),
            color: lineColor(knotenarmnummer, fbt.nach, fbt.total, schema),
          });
          shadowGroup.path(path).stroke({
            width: lineWidth,
            color: shadowColor,
            opacity: shadowOpacity,
          });
        }

        // links 45°
        if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.LINKS45) {
          const start = new SVG.Point(startX, startY);
          const achteck1 = new SVG.Point(
            chartPosition.value + ecke.value,
            chartPosition.value
          );
          const achteck2 = new SVG.Point(
            chartPosition.value + seite.value,
            chartPosition.value + ecke.value + mitte.value
          );
          const path = zielPunkt(
            achteck1,
            new SVG.Point(achteck1.x - ecke.value, achteck1.y + ecke.value),
            achteck2,
            new SVG.Point(achteck2.x - ecke.value, achteck2.y + ecke.value),
            start,
            nachPosition,
            ecke.value - spalt.value,
            false,
            line,
            documentationGroup
          );
          fahrbeziehungsGroup
            .path(path)
            .stroke({
              width: calcLineWidth(fbt.total, lineFactor, schema, lineWidth),
              color: lineColor(knotenarmnummer, fbt.nach, fbt.total, schema),
            })
            .attr("fill", "none");
          shadowGroup
            .path(path)
            .stroke({
              width: lineWidth,
              color: shadowColor,
              opacity: shadowOpacity,
            })
            .attr("fill", "none");
        }

        // links 90°
        if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.LINKS90) {
          const zielX =
            startX +
            seite.value -
            ecke.value -
            spalt.value -
            nachPosition * line;
          const path = `M${startX} ${startY}
                        L${
                          startX + seite.value / 2 - seite.value * 0.07
                        } ${startY}
                        Q${zielX} ${startY}
                         ${zielX} ${startY - mitte.value / 2}
                        L${zielX} ${chartPosition.value}`;
          fahrbeziehungsGroup
            .path(path)
            .stroke({
              width: calcLineWidth(fbt.total, lineFactor, schema, lineWidth),
              color: lineColor(knotenarmnummer, fbt.nach, fbt.total, schema),
            })
            .attr("fill", "none");
          shadowGroup
            .path(path)
            .stroke({
              width: lineWidth,
              color: shadowColor,
              opacity: shadowOpacity,
            })
            .attr("fill", "none");
        }

        // links 135°
        if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.LINKS135) {
          const start = new SVG.Point(startX, startY);
          const achteck1 = new SVG.Point(
            chartPosition.value + seite.value,
            chartPosition.value + ecke.value
          );
          const achteck2 = new SVG.Point(
            chartPosition.value + ecke.value,
            chartPosition.value + seite.value
          );
          const path = zielPunkt(
            achteck1,
            new SVG.Point(achteck1.x - ecke.value, achteck1.y - ecke.value),
            achteck2,
            new SVG.Point(achteck2.x - ecke.value, achteck2.y - ecke.value),
            start,
            nachPosition,
            seite.value / 2 - spalt.value,
            false,
            line,
            documentationGroup
          );
          fahrbeziehungsGroup
            .path(path)
            .stroke({
              width: calcLineWidth(fbt.total, lineFactor, schema, lineWidth),
              color: lineColor(knotenarmnummer, fbt.nach, fbt.total, schema),
            })
            .attr("fill", "none");
          shadowGroup
            .path(path)
            .stroke({
              width: lineWidth,
              color: shadowColor,
              opacity: shadowOpacity,
            })
            .attr("fill", "none");
        }

        // Uturn
        if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.UTURN) {
          const wendeX = startX + ecke.value * 0.75;
          const querX = wendeX + spalt.value;
          const zielY =
            chartPosition.value +
            ecke.value +
            spalt.value +
            nachPosition * line;
          const path = `M${startX} ${startY}
                        L${wendeX} ${startY}
                        Q${querX} ${startY}
                         ${querX} ${startY - spalt.value}
                        L${querX} ${zielY + spalt.value}
                        Q${querX} ${zielY}
                         ${wendeX} ${zielY}
                        L${startX} ${zielY}`;
          fahrbeziehungsGroup
            .path(path)
            .stroke({
              width: calcLineWidth(fbt.total, lineFactor, schema, lineWidth),
              color: lineColor(knotenarmnummer, fbt.nach, fbt.total, schema),
            })
            .attr("fill", "none");
          shadowGroup
            .path(path)
            .stroke({
              width: lineWidth,
              color: shadowColor,
              opacity: shadowOpacity,
            })
            .attr("fill", "none");
        }
      });

      knotenarmGroup.add(shadowGroup).add(fahrbeziehungsGroup);

      // ================================
      // Beschriftungen
      // ================================

      // Knotenarm Nummer
      let r = rotationNumber.get(knotenarmnummer);
      if (!r) {
        r = 0;
      }
      const factor = schema ? 4 : 1.5;
      const knotenarmnummerSize = schema ? 60 : lineWidth;
      const knotenarmnummerCx =
        chartPosition.value + ecke.value - spalt.value * factor;
      knotenarmGroup
        .text((add) => {
          add.tspan(knotenarmnummer + "");
        })
        .font({
          size: knotenarmnummerSize,
          family: fontfamily,
          anchor: "middle",
        })
        .attr("alignment-baseline", "central")
        .cx(knotenarmnummerCx) // Radius des Kreises
        .cy(viewbox / 2) // Einrückungstiefe der Nummer
        .rotate(r);
      knotenarmGroup
        .circle(knotenarmnummerSize + 4)
        .stroke({ width: 2, color: "black" })
        .fill("none")
        .cx(knotenarmnummerCx)
        .cy(viewbox / 2);

      // Labels
      // Spaltenbreite
      const colWidth = Math.ceil((chartPosition.value - lineGap * 5 - 15) / 3);

      // Für die Beschriftung der Fahrbeziehungen wird eine eigene Gruppe erzeugt
      const fahrbeziehungenLabelRotationGroup = canvas.group();
      // Ein Rechteck, so groß wie der Viewport, um einen Drehpunkt um die Mitte zu haben
      fahrbeziehungenLabelRotationGroup
        .rect(viewbox, viewbox)
        .fill({ color: "white", opacity: opacity });

      // ========
      // Nach Labels
      // ========

      // Die Fahrbeziehungen 1, 2, 5, 6 werden rechts beschriftet und dann gedreht
      const ausgleich = knotenarm.ausgleich * line;
      let yNach =
        chartPosition.value +
        ecke.value +
        spalt.value +
        basis.value -
        (knotenarm.anzahlNachFahrbeziehungen * lineWidth) / 2 -
        lineGap -
        ausgleich;
      let yD1 =
        chartPosition.value +
        ecke.value +
        spalt.value +
        basis.value +
        line / 2 -
        ausgleich;
      let yD2 =
        chartPosition.value +
        ecke.value +
        spalt.value +
        basis.value -
        knotenarm.anzahlNachFahrbeziehungen * lineWidth +
        lineGap -
        ausgleich;
      let yVonSumme =
        chartPosition.value +
        ecke.value +
        spalt.value +
        knotenarm.anzahlVonFahrbeziehungen * line -
        lineGap * 2;
      let yVon = chartPosition.value + ecke.value + spalt.value;
      const yKnotenarm = chartPosition.value + seite.value / 2 - line / 2;
      let xText =
        chartPosition.value +
        seite.value -
        (ecke.value - spalt.value * 1.5) / 2 +
        5;
      let xc1 = chartPosition.value + seite.value + colWidth;
      let xc2 = chartPosition.value + seite.value + colWidth * 2;
      let xc3 = chartPosition.value + seite.value + colWidth * 3;
      let xD1 = xc1 - colWidth + lineGap;
      let xD2 = xD1 + 20;
      let links = false;

      // Die Fahrbeziehungen 3, 4, 7, 8 werden links beschriftet und dann gedreht
      if ([3, 4, 7, 8].includes(knotenarmnummer)) {
        yNach =
          chartPosition.value +
          ecke.value +
          spalt.value +
          (knotenarm.anzahlNachFahrbeziehungen * lineWidth) / 2 -
          lineWidth +
          lineGap +
          ausgleich;
        yD1 =
          chartPosition.value +
          ecke.value +
          spalt.value -
          lineWidth / 2 +
          ausgleich;
        yD2 =
          chartPosition.value +
          ecke.value +
          spalt.value +
          knotenarm.anzahlNachFahrbeziehungen * lineWidth +
          ausgleich;
        yVonSumme =
          chartPosition.value +
          ecke.value +
          spalt.value +
          basis.value +
          lineWidth / 2 +
          lineGap;
        yVon =
          chartPosition.value +
          ecke.value +
          spalt.value +
          basis.value -
          knotenarm.anzahlVonFahrbeziehungen * line +
          line;
        xc1 = colWidth;
        xc2 = colWidth * 2;
        xc3 = colWidth * 3;
        xD1 = xc3 + chartPosition.value - colWidth * 3 - lineGap;
        xD2 = xD1 - 20;
        xText = chartPosition.value + (ecke.value - spalt.value * 1.5) / 2 - 5;
        links = true;
      }

      // Knotenarmname
      if (!schema) {
        createKnotenarmname(
          fahrbeziehungenLabelRotationGroup,
          knotenarm,
          xText,
          yKnotenarm,
          lineWidth,
          line
        );
      }

      // Knotenarmsumme
      if (!schema) {
        labelZeileErstellen(
          fahrbeziehungenLabelRotationGroup,
          yKnotenarm,
          fillValueArray(knotenarm, [
            knotenarm.totalValue1,
            knotenarm.totalValue2,
            knotenarm.totalValue3,
          ]),
          calculateLabelPosition(knotenarm, [xc1, xc2, xc3], links),
          prozentWerte,
          lineWidth,
          "bold"
        );
      }
      // ========
      // NACH Labels
      // ========
      if (knotenarm.anzahlNachFahrbeziehungen > 0) {
        // Dreieck
        const dreieck = `M${xD1} ${yD1} L${xD2} ${
          yNach + line / 2
        } L${xD1} ${yD2} z`;
        fahrbeziehungenLabelRotationGroup
          .path(dreieck)
          .stroke({ width: 2, color: "black" })
          .attr("fill", "none");

        // Die Werte für die "nach" Fahrbeziehungen des Knotenarmes werden ausgegeben
        if (!schema) {
          labelZeileErstellen(
            fahrbeziehungenLabelRotationGroup,
            yNach,
            fillValueArray(knotenarm, [
              knotenarm.nachTotalValue1,
              knotenarm.nachTotalValue2,
              knotenarm.nachTotalValue3,
            ]),
            calculateLabelPosition(knotenarm, [xc1, xc2, xc3], links),
            prozentWerte,
            lineWidth,
            "bold"
          );
        }
      }

      // ========
      // VON Labels
      // ========
      if (!schema) {
        let vonLine = 0;
        if ([3, 4, 7, 8].includes(knotenarmnummer)) {
          vonLine = knotenarm.anzahlVonFahrbeziehungen - 1;
        }

        fbts.forEach((fbt) => {
          const y = yVon - lineWidth / 2 + line * vonLine;
          labelZeileErstellen(
            fahrbeziehungenLabelRotationGroup,
            y,
            fillValueArray(knotenarm, [fbt.value1, fbt.value2, fbt.value3]),
            calculateLabelPosition(knotenarm, [xc1, xc2, xc3], links),
            prozentWerte,
            lineWidth
          );

          if ([3, 4, 7, 8].includes(knotenarmnummer)) {
            vonLine--;
          } else {
            vonLine++;
          }
        });

        // "Von" Summen
        if (knotenarm.anzahlVonFahrbeziehungen > 0) {
          labelZeileErstellen(
            fahrbeziehungenLabelRotationGroup,
            yVonSumme,
            fillValueArray(knotenarm, [
              knotenarm.vonTotalValue1,
              knotenarm.vonTotalValue2,
              knotenarm.vonTotalValue3,
            ]),
            calculateLabelPosition(knotenarm, [xc1, xc2, xc3], links),
            prozentWerte,
            lineWidth,
            "bold"
          );
          // Summenlinie
          let faktorRechts = 2;
          // Die Länge der Summenlinie wird nach der Anzahl der angezeigten Werte ausgerichtet
          if (!links) {
            if (!knotenarm.is2Filled) faktorRechts--;
            if (!knotenarm.is3Filled) faktorRechts--;
          }
          let linieStartX = xc1 - colWidth + 10;
          if (links) {
            if (!knotenarm.is2Filled) linieStartX = xc1;
            if (!knotenarm.is3Filled) linieStartX = xc2;
          }
          fahrbeziehungenLabelRotationGroup
            .line(
              linieStartX,
              yVonSumme,
              xc1 + colWidth * faktorRechts,
              yVonSumme
            )
            .stroke({ width: 1, color: "black" });
        }
      }

      // fahrbeziehungenLabelRotationGroup.add(fahrbeziehungenLabelGroup)
      fahrbeziehungenLabelRotationGroup.rotate(
        calcLabelRotation(knotenarmnummer)
      );
    }
    return knotenarmGroup;
  }

  /**
   * Erstellt eine Label Zeile zu einer Fahrbeziehung, bzw. einer Summe.
   *
   * @param group   Die Label Gruppe (g).
   * @param y       Der y Wert zum Ausrichten der Zeile.
   * @param vs      Die Werte der Knotenarme als Array (wichtig - richtige Reihenfolge!).
   * @param xs      Die x Werte der einzelnen Spalten als Array.
   * @param prozentWerte  Prozentwerte pro Knotenarm.
   * @param lineWidth   LineWisth
   * @param weight  Optional kann die Schriftstärke angegeben werden.
   */
  function labelZeileErstellen(
    group: SVG.G,
    y: number,
    vs: number[],
    xs: number[],
    prozentWerte: Map<number, boolean>,
    lineWidth: number,
    weight?: string
  ) {
    // default font weight ist "normal"
    if (!weight) {
      weight = "normal";
    }

    for (let i = 0; i < vs.length; i++) {
      let v = `${vs[i]}`;
      if (prozentWerte.get(i)) {
        // Beim Differenzdatenvergleich dürfen die % Werte nicht angezeigt werden.
        if (isDifferenzdatendarstellung.value) {
          v = "--";
        } else {
          // wenn es sich um einen Prozentwert handelt, dann eine Nachkommastelle und ein
          // Prozentzeichen
          v = `${vs[i].toFixed(1)}%`;
        }
      }
      group
        .text((add) => {
          if (i === 1) {
            // die zweite Spalte wird durch Klammern gekennzeichnet
            add.tspan(`(${v})`).x(xs[i]);
          } else {
            add.tspan(`${v}`).x(xs[i]);
          }
        })
        .font({
          family: fontfamily,
          size: lineWidth,
          weight: weight,
          anchor: "end",
        })
        .x(0)
        .y(y);
    }
  }

  function calculateLabelPosition(
    knotenarm: BelastungsplanKnotenarm,
    werte: number[],
    links: boolean
  ): number[] {
    if (links) {
      // es ist nur bei den links ausgerichteten Labels notwendig,
      // die nach innen zu schieben.
      const is1 = knotenarm.is1Filled;
      const is2 = knotenarm.is2Filled;
      const is3 = knotenarm.is3Filled;

      // alle Werte da? Dann werden sie so angeordnet, wie gedacht
      if (is1 && is2 && is3) {
        return werte;
      }

      // zwei Werte
      if (is1 && is2 && !is3) {
        return [werte[1], werte[2]];
      }

      // ein Wert
      if (is1 && !is2 && !is3) {
        return [werte[2]];
      }
    }

    return werte;
  }

  /**
   * Prüft ob die Zählwerte geliefert wurden und bestückt das Rückgabe Array entsprechend.
   *
   * @param knotenarm   Knotenarm
   * @param werte       Ein Array mit den Anzeigewerten.
   */
  function fillValueArray(
    knotenarm: BelastungsplanKnotenarm,
    werte: number[]
  ): number[] {
    const result = [werte[0]];
    if (knotenarm.is2Filled) result[1] = werte[1];
    if (knotenarm.is3Filled) result[2] = werte[2];
    return result;
  }

  /**
   * Der Knotenarmname wird so angepasst, dass er in die Lücke zwischen Nummern
   * und Summe passt.
   *
   * @param group       Labelgruppe
   * @param knotenarm   Der zu bearbeitende Knotenarm.
   * @param x           X-Position
   * @param y           Y-Position
   * @param lineWidth   lineWidth
   * @param line        Line
   */
  function createKnotenarmname(
    group: SVG.G,
    knotenarm: BelastungsplanKnotenarm,
    x: number,
    y: number,
    lineWidth: number,
    line: number
  ) {
    // Der Knotenarmname wird umgebrochen, wenn er zu lang ist. Als
    // Merkmal werden hier vorerst nur die Bindestriche genommen.
    let strasse = "";
    if (knotenarm.strasse) {
      strasse = knotenarm.strasse;
    }
    let zweiteZeile = 0;
    let pieces = [strasse];
    let trenner = "";
    const zeichen = strasse.length;
    // Anzahl Zeichen
    if (zeichen > 17) {
      trenner = "-";
      if (strasse.endsWith("str.")) {
        const i = strasse.indexOf("str.");
        pieces[0] = strasse.substring(0, zeichen - 4);
        pieces[1] = strasse.substring(i, 4);
      }
      // Platz
      if (strasse.endsWith("pl.")) {
        const i = strasse.indexOf("pl.");
        pieces[0] = strasse.substring(0, zeichen - 3);
        pieces[1] = strasse.substring(i, 3);
      }
    }
    // Bindestrich
    if (strasse.includes("-")) {
      trenner = "-";
      pieces = strasse.split(trenner);
    }
    // Leerzeichen
    if (strasse.includes(" ")) {
      trenner = " ";
      pieces = strasse.split(trenner);
    }

    if (pieces.length > 1) {
      zweiteZeile = line / 2;
    }
    group
      .text((add) => {
        if (pieces.length > 1) {
          const firstAndSecondLineOfStreetnames: Array<string> =
            getFirstAndSecondLineOfStreetname(trenner, pieces);
          add.tspan(firstAndSecondLineOfStreetnames[0]).x(x).dy(line);
          add.tspan(firstAndSecondLineOfStreetnames[1]).x(x).dy(line);
        } else {
          add.tspan(strasse).x(x);
        }
      })
      .font({
        size: lineWidth,
        family: fontfamily,
        anchor: "middle",
      })
      .y(y - zweiteZeile);
  }

  /**
   * Verteilt den Straßennamen anhand der getrenten Wörter auf die erste und zweite Zeile
   * zur Anzeige im Belastungsplan.
   *
   * @param trenner Trennzeichen der einzelnen Wörter (pieces)
   * @param pieces einzelne Wörter des Straßennames
   * @return [firsLine, SecondLine]
   */
  function getFirstAndSecondLineOfStreetname(
    trenner: string,
    pieces: Array<string>
  ): Array<string> {
    let firstLine: string;
    let secondLine: string;

    // In der Mitte teilen
    // Math.floor wirft die Nachkommastellen weg -> 3/2 = 1
    const index: number = Math.floor(pieces.length / 2);
    const streetnames: Array<string> = getStreetnames(index, trenner, pieces);
    firstLine = streetnames[0];
    secondLine = streetnames[1];

    // Ungerade Anzahl -> schauen, wie es am Besten passt
    // FirstLine oder SecondLine mehr Wörter?
    if (pieces.length % 2 === 1) {
      // Variante 1: firstLine weniger Worte als secondLine
      // default -> wurde vor dem <<if (pieces.length % 2 === 1) {>> schon berechnet

      // Variante 2: firstLine mehr Worte als secondLine -> Index aufrunden
      // 3/2 = 1.5 -> 2
      const index: number = Number.parseInt((pieces.length / 2).toFixed(0));
      const streetnames: Array<string> = getStreetnames(index, trenner, pieces);
      const firstLineVariante2: string = streetnames[0];
      const secondLineVariante2: string = streetnames[1];

      // Wenn die erste Zeile der zweiten Variante kürzer ist, als die zweite Zeile der ersten Variante,
      // dann wird die zweite Variante verwendet.
      if (firstLineVariante2.length < secondLine.length) {
        firstLine = firstLineVariante2;
        secondLine = secondLineVariante2;
      }
    }
    return [firstLine, secondLine];
  }

  // Verteilt die Teile (pieces) der Straßennamen auf die first and second Line
  // Der index gibt dabei vor, wieviele Teile wohin gehören
  function getStreetnames(
    index: number,
    trenner: string,
    pieces: Array<string>
  ): Array<string> {
    let firstLine = "";
    let secondLine = "";
    for (let i = 0; i < index; i++) {
      firstLine = firstLine + pieces[i] + trenner;
    }

    for (let i = index; i < pieces.length; i++) {
      // Nur ein Trennzeichen hinzufügen, wenn Text vorhanden
      // am Anfang von Zeile 2 soll kein Trennzeichen stehen
      if (secondLine !== "") {
        secondLine = secondLine + trenner;
      }
      secondLine = secondLine + pieces[i];
    }
    return [firstLine, secondLine];
  }

  /**
   * Hier wird der Pfad für die ungeraden Winkelverbindungen (links/rechts 45°/135°) berrechnet. Dazu wird im
   * virtuellen Achteck (wir haben ja eine Kreuzung mit 8 Knotenarmen) eine Gerade zwischen dem Startpunkt (VON) und
   * dem gegenüberliegenden Punkt gezeichnet.
   *
   * Dann wird auf der Seite des Achtecks, auf die die Fahrbeziehung treffen soll (NACH) eine Linie von der einen
   * Achteck-Ecke zur Anderen gezogen. Auf dieser Linie wird dann der Abstand zum Zielpunkt genommen (pointAt).
   * Auf der gegenüberliegenden Seite wird das selbe gemacht (wichtig ist, dass man wirklich den Punkt gegenüber
   * und nicht schräg versetzt ermittelt. Ausschlaggeben ist, von welcher Seite der Pfad gezeichnet wird.). Zwischen
   * den beiden Punkten wird eine Gerade gezogen.
   *
   * Bei den beiden Geraden ist es wichtig, dass sie immer ausgehend vom Ziel bzw. Startpunkt gezeichnet werden,
   * damit später mit "pointAt" die Wendepunkte für die quaadratische kurve abgenommen werden können.
   *
   * An dem Punkt, an dem sich die beiden Geraden treffen ist der Wendepunkt für die quadratische Kurve (Q).
   *
   * Um das grafisch zu veranschaulichen, kann an der Komponente der Doc-Mode aktiviert und an einem (oder auch
   * an mehreren - dann wird es aber schnell unübersichtlich) der vier Fahrtrichtungstypen "doc" auf "true" gesetzt
   * werden. Ruft man jetzt eine Kreuzung auf, die den ausgewählten Fahrtrichtungstyp enthält, so wird das ober
   * Erklärte auch grafisch im Digramm dargestellt.
   *
   * @param achteck1      Der Startpunkt für die "Ziellinie" (muss auf der Seite der eingehenden Fahrbeziehungen des Knotenarms liegen).
   * @param achteck2      Der Zielpunkt für die "Ziellinie".
   * @param achteck3      Der Startpunkt für die der "Ziellinie" gegenüberliegende Gerade (muss dem Startpunkt gegenüber liegen).
   * @param achteck4      Der Zielpunkt für die gegenüberliegende Gerade.
   * @param startPunkt    Der Punkt, an der Pfad der Fahrbeziehung startet.
   * @param positionNach  Die Position, die die aktuelle Fahrbezihungen unter allen "NACH" Fahrbeziehungen des "NACH" Knotenarms einnimmt.
   * @param distanz       Die Entfernung zwischen Start / Ziel Punkt und dem Start der quadratischen Kurve.
   * @param doc           Soll die Berechnung der Punkte grafisch dargestellt werden?
   * @param line          Line
   * @param documentationGroup Gruppe fuer die Dokumentation
   */
  function zielPunkt(
    achteck1: SVG.Point,
    achteck2: SVG.Point,
    achteck3: SVG.Point,
    achteck4: SVG.Point,
    startPunkt: SVG.Point,
    positionNach: number,
    distanz: number,
    doc: boolean,
    line: number,
    documentationGroup: SVG.G
  ): string {
    const positionZielpunkt = spalt.value + positionNach * line;
    // Linie am Zielpunkt
    const aZielVon = documentationGroup.path(`M${achteck1.x} ${achteck1.y}
               L${achteck2.x} ${achteck2.y}`);
    // Zielpunkt
    const point1 = aZielVon.pointAt(positionZielpunkt) as SVG.Point;
    // Linie auf der gegenüberliegenden Seite des Ziels
    const aZielNach = documentationGroup.path(`M${achteck3.x} ${achteck3.y}
               L${achteck4.x} ${achteck4.y}`);
    // Punkt auf den die Zielpunktgerade trifft
    const point2 = aZielNach.pointAt(positionZielpunkt) as SVG.Point;
    // Zielgerade ziehen
    const pathZiel = documentationGroup.path(`M${point1.x} ${point1.y}
               L${point2.x} ${point2.y}`);

    // Schnittpunkt zwischen Start- und Ziellinie berechnen
    // Startlinie
    const startX1 = startPunkt.x;
    const startX2 = startPunkt.x + seite.value;
    const startY1 = startPunkt.y;
    const startY2 = startPunkt.y;
    const startM = (startY2 - startY1) / (startX2 - startX1);
    const startN = startY2 - startM * startX2;

    // Ziellinie
    const zielX1 = point1.x;
    const zielX2 = point2.x;
    const zielY1 = point1.y;
    const zielY2 = point2.y;
    const zielM = (zielY2 - zielY1) / (zielX2 - zielX1);
    const zielN = zielY2 - zielM * zielX2;

    // Schnittpunkte
    const sx = ((zielN - startN) * -1) / (zielM - startM);
    const sy = startM * sx + startN;

    // die Punkte für die Kurven berechnen
    const pathStart = documentationGroup.path(`M${startX1} ${startY1}
               L${startX2} ${startY2}`);
    const startKurvenPunkt = pathStart.pointAt(distanz);
    const zielKurvenPunkt = pathZiel.pointAt(distanz);

    // Den Pfad für die Fahrtrichtung erstellen.
    const path = `M${startX1} ${startY1}
                  L${startKurvenPunkt.x} ${startKurvenPunkt.y}
                  Q${sx} ${sy}
                   ${zielKurvenPunkt.x} ${zielKurvenPunkt.y}
                  L${zielX1} ${zielY1}`;

    // Für Dokumentationszwecke können diese Linen in das Diagram gezeichnet werden. In der
    // Regel wird das nicht der Fall sein.
    if (docMode && doc) {
      pathStart.stroke({ width: 1, color: "black" }).attr("fill", "none");
      aZielVon.stroke({ width: 2, color: "black" }).attr("fill", "none");
      aZielNach.stroke({ width: 2, color: "black" }).attr("fill", "none");
      pathZiel.stroke({ width: 1, color: "black" }).attr("fill", "none");
      documentationGroup
        .circle(10)
        .fill({ color: "green" })
        .move(point1.x - 5, point1.y - 5);
      documentationGroup
        .circle(10)
        .fill({ color: "green" })
        .move(startX1 - 5, startY1 - 5);
      documentationGroup
        .circle(6)
        .fill({ color: "#f06" })
        .move(point2.x - 3, point2.y - 3);
      documentationGroup
        .circle(6)
        .fill({ color: "#f06" })
        .move(startX2 - 3, startY2 - 3);
      documentationGroup
        .circle(10)
        .fill({ color: "green" })
        .move(sx - 5, sy - 5);
      documentationGroup
        .circle(10)
        .fill({ color: "green" })
        .move(startKurvenPunkt.x - 5, startKurvenPunkt.y - 5);
      documentationGroup
        .circle(10)
        .fill({ color: "green" })
        .move(zielKurvenPunkt.x - 5, zielKurvenPunkt.y - 5);
    }
    return path;
  }

  /**
   * Ermittelt die Farbe der Fahrbeziehung. Diese hängt vom Knotenarm ab, aber auch von der
   * Anzeige Auswahl, die der Nutzer im Optionsmenü getroffen hat.
   *
   * @param vonKnotenarm
   * @param nachKnotenarm
   * @param vonWert         der Wert, den die Fahrbeziehung repräsentiert
   * @param schema Soll das Schema gezeichnet werden?
   */
  function lineColor(
    vonKnotenarm: number,
    nachKnotenarm: number,
    vonWert: number,
    schema: boolean
  ): string {
    // Die Standardfarbe des Knotenarms
    let color = farben.get(vonKnotenarm)!;

    if (schema) {
      color = inaktivColor;
      if (
        vonIds.value.includes(vonKnotenarm) &&
        nachIds.value.includes(nachKnotenarm)
      ) {
        color = "#000000";
      }
      return color;
    }

    // Bei der Differenzdatendarstellung werden Fahrbeziehungen
    // mit zunehmendem Verkehr Rot, mit abnehmenden Verkehr Grün und
    // alle die gleich geblieben sind mit Schwarz eingefärbt. Die
    // Nummer des Knotenarms spielt hier keine Rolle.
    if (isDifferenzdatendarstellung.value) {
      if (vonWert > 0) color = zunahmeValueColor;
      if (vonWert < 0) color = abnahmeValueColor;
      if (vonWert === 0) color = gleichValueColor;
    }

    // Wenn der schwarz weiß Modus angeschaltet ist, dann werden alle aktiven Fahrbeziehungen
    // schwarz gedruckt.
    if (isBlackPrintMode.value) {
      return "#000000";
    }

    // Wenn die Geometrieauswahl im Belastungsplan angezeigt werden soll ("Zeige von Knotenarm, nach Knotenarm"),
    // Dann werden inaktive Fahrbeziehungen anders eingefärbt, als die aktive Fahrbeziehung.
    if (geometrieMode && vonIds.value.length > 0) {
      if (
        !(
          vonIds.value.includes(vonKnotenarm) &&
          nachIds.value.includes(nachKnotenarm)
        )
      ) {
        if (
          !(
            beideRichtungen.value &&
            vonIds.value.includes(nachKnotenarm) &&
            nachIds.value.includes(vonKnotenarm)
          )
        ) {
          color = inaktivColor;
        }
      }
    }
    return color;
  }

  /**
   * Die Linienstärke der jeweiligen Fahrbeziehung wird im Verhältnis zur
   * Fahrbeziehung mit der höchsten Anzahl an KFZ berrechnet.
   *
   * @param counts    Die Anzahl der Fahrbeziehungen.
   * @param lineFactor
   * @param schema
   * @param lineWidth
   */
  function calcLineWidth(
    counts: number,
    lineFactor: number,
    schema: boolean,
    lineWidth: number
  ): number {
    if (schema) {
      return lineWidth * 0.8;
    }
    if (counts === 0) {
      return 1.0;
    }
    const lw = positiveNumber(counts) * lineFactor;
    // Linien, die dünner als 1.0 Pixel sind, machen
    // wenig Sinn.
    if (lw < 1.0) {
      return 1.0;
    }
    return lw;
  }

  /**
   * Prüft, ob in der Geometrieauswahl des Optionsmenüs dieser Knotenarm ausgewählt wurde.
   *
   * @param knotenarmnummer
   */
  function isSelectedKnotenarm(knotenarmnummer: number): boolean {
    return (
      geometrieMode &&
      vonIds.value.length === 1 &&
      vonIds.value.includes(knotenarmnummer)
    );
  }

  return {
    docMode,
    viewbox,
    lineGap,
    chartPosition,
    spalt,
    ecke,
    legendColor,
    maxlineWidth,
    maxLegendLineWidth,
    fontfamily,
    abnahmeValueColor,
    zunahmeValueColor,
    maxFahrtrichtungWidth,
    fahrtrichtungVon,
    positiveNumber,
    anzeigeWerte,
    cleansePaths,
    calcFahrbeziehungstype,
    calcRotation,
    fahrbeziehungenAusrichten,
    isSelectedKnotenarm,
  };
}
