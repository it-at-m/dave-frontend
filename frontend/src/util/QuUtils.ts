// Hilfsfunktion für die Darstellung von Qu-Zählungen

import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";

import KnotenarmComparator from "./KnotenarmComparator";

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

  return {
    computeAvailableKnotenarme,
  };
}
