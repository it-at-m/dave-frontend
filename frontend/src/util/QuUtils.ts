// Hilfsfunktion für die Darstellung von Qu-Zählungen

import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";

import KnotenarmComparator from "./KnotenarmComparator";
import type QuerungsverkehrDTO from "@/types/zaehlung/QuerungsverkehrDTO";
import type Himmelsrichtung from "@/types/enum/Himmelsrichtung";

export function useQu() {
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

  /**
   * Prüft, ob ein Querungsverkehr für eine bestimmte Knotenarmnummer und Richtung im Array existiert.
   * @param querungsverkehr Array Querungsverkehr-Daten
   * @param knNummer Knotenarmnummer
   * @param richtung Himmelsrichtung
   * @returns Boolean, ob der Querungsverkehr existiert
   */
  function existsQuerungsverkehr(
      querungsverkehr: QuerungsverkehrDTO[] | undefined,
      knNummer: number,
      richtung: Himmelsrichtung
  ): boolean {
    if (!querungsverkehr || querungsverkehr.length === 0) {
      return false;
    }
    return querungsverkehr.some(
        (q) => q.knotenarm === knNummer && q.richtung === richtung
    );
  }

  /**
   * Vergleicht zwei Arrays von Querungsverkehren.
   * Rückgabe true, wenn beide Arrays dieselben Einträgen enthalten (Reihenfolge wird ignoriert).
   */
  function areQuerungsverkehreEqual(
      querungsA: QuerungsverkehrDTO[] | undefined,
      querungsB: QuerungsverkehrDTO[] | undefined
  ): boolean {
    const a = querungsA ?? [];
    const b = querungsB ?? [];

    if (a.length !== b.length) {
      return false;
    }

    return a.every((q) =>
        existsQuerungsverkehr(b, q.knotenarm, q.richtung)
    );
  }

  return {
    computeAvailableKnotenarme,
    existsQuerungsverkehr,
    areQuerungsverkehreEqual,
  };
}
