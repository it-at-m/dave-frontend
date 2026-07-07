// Hilfsfunktion für die Darstellung von Fjs-Zählungen

import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type LaengsverkehrDTO from "@/types/zaehlung/LaengsverkehrDTO";

import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import KnotenarmComparator from "./KnotenarmComparator";

export function useFjs() {
  function computeAvailableKnotenarme(
    activeZaehlung: LadeZaehlungDTO
  ): LadeKnotenarmDTO[] {
    const knotenarmeByNumber = new Map(
      activeZaehlung.knotenarme.map((kn) => [kn.nummer, kn] as const)
    );
    return Array.from(knotenarmeByNumber.values()).sort(
      KnotenarmComparator.sortByNumber
    );
  }

  function computeAvailableKnotenarmNummernFromZaehlung(
    activeZaehlung: LadeZaehlungDTO
  ): number[] {
    return computeAvailableKnotenarme(activeZaehlung).map((a) => a.nummer);
  }

  function isLaengsverkehrAvailable(
    node: number,
    strassenseite: Himmelsrichtung,
    richtung: Bewegungsrichtung,
    laengsverkehr: LaengsverkehrDTO[]
  ): boolean {
    return laengsverkehr.some(
      (element) =>
        element.knotenarm === node &&
        element.strassenseite === strassenseite &&
        element.richtung === richtung
    );
  }

  /**
   * Vergleicht zwei Arrays von Laengsverkehren.
   * Rückgabe true, wenn beide Arrays dieselben Einträgen enthalten (Reihenfolge wird ignoriert).
   */
  function areLaengsverkehreEqual(
    laengsA: LaengsverkehrDTO[] | undefined,
    laengsB: LaengsverkehrDTO[] | undefined
  ): boolean {
    const a = laengsA ?? [];
    const b = laengsB ?? [];

    if (a.length !== b.length) {
      return false;
    }

    return a.every((l) =>
      isLaengsverkehrAvailable(l.knotenarm, l.strassenseite, l.richtung, b)
    );
  }

  return {
    computeAvailableKnotenarme,
    computeAvailableKnotenarmNummernFromZaehlung,
    isLaengsverkehrAvailable,
    areLaengsverkehreEqual,
  };
}
