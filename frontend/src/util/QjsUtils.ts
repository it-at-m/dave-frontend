// Hilfsfunktion für die Darstellung von Qjs-Zählungen
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type VerkehrsbeziehungDTO from "@/types/zaehlung/VerkehrsbeziehungDTO";
import type { ComputedRef, Ref } from "vue";

import { computed } from "vue";

import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import KnotenarmComparator from "@/util/KnotenarmComparator";

export function useQjs() {
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
  const patternsArrowOne: VerkehrsbeziehungDTO[] = [
    { von: 1, nach: 3, strassenseite: Himmelsrichtung.W },
    { von: 2, nach: 4, strassenseite: Himmelsrichtung.N },
    { von: 5, nach: 7, strassenseite: Himmelsrichtung.NW },
    { von: 6, nach: 8, strassenseite: Himmelsrichtung.NO },
  ];

  const patternsArrowTwo: VerkehrsbeziehungDTO[] = [
    { von: 3, nach: 1, strassenseite: Himmelsrichtung.W },
    { von: 4, nach: 2, strassenseite: Himmelsrichtung.N },
    { von: 7, nach: 5, strassenseite: Himmelsrichtung.NW },
    { von: 8, nach: 6, strassenseite: Himmelsrichtung.NO },
  ];

  const patternsArrowThree: VerkehrsbeziehungDTO[] = [
    { von: 1, nach: 3, strassenseite: Himmelsrichtung.O },
    { von: 2, nach: 4, strassenseite: Himmelsrichtung.S },
    { von: 5, nach: 7, strassenseite: Himmelsrichtung.SO },
    { von: 6, nach: 8, strassenseite: Himmelsrichtung.SW },
  ];

  const patternsArrowFour: VerkehrsbeziehungDTO[] = [
    { von: 3, nach: 1, strassenseite: Himmelsrichtung.O },
    { von: 4, nach: 2, strassenseite: Himmelsrichtung.S },
    { von: 7, nach: 5, strassenseite: Himmelsrichtung.SO },
    { von: 8, nach: 6, strassenseite: Himmelsrichtung.SW },
  ];

  function matchesArrowPattern(
    verkehrsbeziehung: VerkehrsbeziehungDTO,
    arrowPattern: VerkehrsbeziehungDTO
  ) {
    return (
      verkehrsbeziehung.von === arrowPattern.von &&
      verkehrsbeziehung.nach === arrowPattern.nach &&
      verkehrsbeziehung.strassenseite === arrowPattern.strassenseite
    );
  }

  function hasAnyArrowPatternIn(
    verkehrsbeziehungen: Array<VerkehrsbeziehungDTO>,
    arrowPatterns: VerkehrsbeziehungDTO[]
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
