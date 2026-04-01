// Hilfsfunktion für die Darstellung von Qjs-Zählungen

import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type VerkehrsbeziehungQJS from "@/types/zaehlung/VerkehrsbeziehungQJS";
import type { ComputedRef, Ref } from "vue";

import { computed } from "vue";

import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import KnotenarmComparator from "@/util/KnotenarmComparator";

export function useQjs() {
  /**
   * Extrahiert und splittet den Straßennamen eines Knotenarms
   * @param knotenarm optionaler Knotenarm DTO
   * @returns Array<string> mit einem oder zwei Elementen (falls gesplittet)
   */
  function getStreetname(
    knotenarm: LadeKnotenarmDTO | undefined
  ): Array<string> {
    let strasse = "";
    if (knotenarm && knotenarm.strassenname) {
      strasse = knotenarm.strassenname;
    }
    let pieces = [strasse];
    const zeichen = strasse.length;
    // Anzahl Zeichen
    if (zeichen > 17) {
      pieces = ["", ""];
      // Straße
      if (strasse.endsWith("str.")) {
        const index = strasse.indexOf("str.");
        pieces[0] = strasse.substring(0, zeichen - "str.".length);
        pieces[1] = strasse.substring(index);
      }
      if (strasse.endsWith("straße")) {
        const index = strasse.indexOf("straße");
        pieces[0] = strasse.substring(0, zeichen - "straße".length);
        pieces[1] = strasse.substring(index);
      }
      // Platz
      if (strasse.endsWith("pl.")) {
        const index = strasse.indexOf("pl.");
        pieces[0] = strasse.substring(0, zeichen - "pl.".length);
        pieces[1] = strasse.substring(index);
      }
      if (strasse.endsWith("platz")) {
        const index = strasse.indexOf("platz");
        pieces[0] = strasse.substring(0, zeichen - "platz".length);
        pieces[1] = strasse.substring(index);
      }
      // Weg
      if (strasse.endsWith("weg")) {
        const index = strasse.indexOf("weg");
        pieces[0] = strasse.substring(0, zeichen - "weg".length);
        pieces[1] = strasse.substring(index);
      }
      // Bindestrich
      if (strasse.includes("-")) {
        const index = strasse.indexOf("-");
        pieces[0] = strasse.substring(0, index + "-".length);
        pieces[1] = strasse.substring(index + 1);
      }
      // Leerzeichen
      else if (strasse.includes(" ")) {
        const index = strasse.indexOf(" ");
        pieces[0] = strasse.substring(0, index + " ".length);
        pieces[1] = strasse.substring(index + 1);
      }
    }
    return pieces;
  }

  /**
   * Liefert ein computed-Ref für die SVG-Rotation basierend auf den verfügbaren Knotenarm-Nummern.
   * @param availableKnotenarmNummern Ref oder ComputedRef mit number[]
   * @returns ComputedRef<string> z.B. "rotate(-90,700,700)"
   */
  function rotateSvgFor(
    availableKnotenarmNummern: Ref<number[]> | ComputedRef<number[]>
  ): ComputedRef<string> {
    return computed(() => {
      // Default: keine Rotation
      let rotation = "rotate(0,700,700)";
      // Reihenfolge wie in den Komponenten: spätere Bedingungen überschreiben frühere
      if (availableKnotenarmNummern?.value?.includes(1)) {
        rotation = "rotate(-90,700,700)";
      }
      if (availableKnotenarmNummern?.value?.includes(2)) {
        rotation = "rotate(0,700,700)";
      }
      if (availableKnotenarmNummern?.value?.includes(5)) {
        rotation = "rotate(-45,700,700)";
      }
      if (availableKnotenarmNummern?.value?.includes(6)) {
        rotation = "rotate(45,700,700)";
      }
      return rotation;
    });
  }

  // --- Arrow pattern constants ---
  const patternsArrowOne: VerkehrsbeziehungQJS[] = [
    { von: 1, nach: 3, strassenseite: Himmelsrichtung.W },
    { von: 2, nach: 4, strassenseite: Himmelsrichtung.N },
    { von: 5, nach: 7, strassenseite: Himmelsrichtung.NW },
    { von: 6, nach: 8, strassenseite: Himmelsrichtung.NO },
  ];

  const patternsArrowTwo: VerkehrsbeziehungQJS[] = [
    { von: 3, nach: 1, strassenseite: Himmelsrichtung.W },
    { von: 4, nach: 2, strassenseite: Himmelsrichtung.N },
    { von: 7, nach: 5, strassenseite: Himmelsrichtung.NW },
    { von: 8, nach: 6, strassenseite: Himmelsrichtung.NO },
  ];

  const patternsArrowThree: VerkehrsbeziehungQJS[] = [
    { von: 1, nach: 3, strassenseite: Himmelsrichtung.O },
    { von: 2, nach: 4, strassenseite: Himmelsrichtung.S },
    { von: 5, nach: 7, strassenseite: Himmelsrichtung.SO },
    { von: 6, nach: 8, strassenseite: Himmelsrichtung.SW },
  ];

  const patternsArrowFour: VerkehrsbeziehungQJS[] = [
    { von: 3, nach: 1, strassenseite: Himmelsrichtung.O },
    { von: 4, nach: 2, strassenseite: Himmelsrichtung.S },
    { von: 7, nach: 5, strassenseite: Himmelsrichtung.SO },
    { von: 8, nach: 6, strassenseite: Himmelsrichtung.SW },
  ];

  function matchesArrowPattern(
    verkehrsbeziehung: VerkehrsbeziehungQJS,
    arrowPattern: VerkehrsbeziehungQJS
  ) {
    return (
      verkehrsbeziehung.von === arrowPattern.von &&
      verkehrsbeziehung.nach === arrowPattern.nach &&
      verkehrsbeziehung.strassenseite === arrowPattern.strassenseite
    );
  }

  function hasAnyArrowPatternIn(
    verkehrsbeziehungen: Array<VerkehrsbeziehungQJS>,
    arrowPatterns: VerkehrsbeziehungQJS[]
  ) {
    return !!verkehrsbeziehungen?.some((vb) =>
      arrowPatterns.some((p) => matchesArrowPattern(vb, p))
    );
  }

  function computeAvailableKnotenarme(
    activeZaehlung: LadeZaehlungDTO
  ): LadeKnotenarmDTO[] {
    const knotenarmeByNumber = new Map(
      activeZaehlung.knotenarme.map((kn) => [kn.nummer, kn] as const)
    );
    const nodes = new Map<number, LadeKnotenarmDTO>();
    activeZaehlung.verkehrsbeziehungen.forEach((vb) => {
      const kn = knotenarmeByNumber.get(vb.von);
      if (kn) {
        nodes.set(kn.nummer, kn);
      }
    });
    return Array.from(nodes.values())
      .sort(KnotenarmComparator.sortByNumber)
      .reverse();
  }

  function computeAvailableKnotenarmNummernFromZaehlung(
    activeZaehlung: LadeZaehlungDTO
  ): number[] {
    return computeAvailableKnotenarme(activeZaehlung).map((a) => a.nummer);
  }

  return {
    getStreetname,
    rotateSvgFor,
    patternsArrowOne,
    patternsArrowTwo,
    patternsArrowThree,
    patternsArrowFour,
    matchesArrowPattern,
    hasAnyArrowPatternIn,
    computeAvailableKnotenarme,
    computeAvailableKnotenarmNummernFromZaehlung,
  };
}
