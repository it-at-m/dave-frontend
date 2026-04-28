import type QuerungsverkehrDTO from "@/types/zaehlung/QuerungsverkehrDTO";

import Himmelsrichtung from "@/types/enum/Himmelsrichtung";

/**
 * Prüft, ob eine Querung für eine bestimmte Knotenarmnummer und Richtung existiert.
 * @param querungsverkehr Array mit Querungsverkehr-Daten
 * @param knNummer Knotenarmnummer
 * @param richtung Himmelsrichtung
 * @returns Boolean, ob die Querung existiert
 */
export function existsQuerungOnKnotenarmInRichtung(
  querungsverkehr: QuerungsverkehrDTO[] | undefined,
  chosenQuerungsverkehr: QuerungsverkehrDTO[] | undefined,
  knNummer: number,
  richtung: Himmelsrichtung
): boolean {
  if (!querungsverkehr || querungsverkehr.length === 0) {
    return false;
  }
  if (!chosenQuerungsverkehr || chosenQuerungsverkehr.length === 0) {
    return false;
  }
  return (
    querungsverkehr.some(
      (q) => q.knotenarm === knNummer && q.richtung === richtung
    ) &&
    chosenQuerungsverkehr.some(
      (q) => q.knotenarm === knNummer && q.richtung === richtung
    )
  );
}
