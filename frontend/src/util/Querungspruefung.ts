import type QuerungsverkehrDTO from "@/types/zaehlung/QuerungsverkehrDTO";



import Himmelsrichtung from "@/types/enum/Himmelsrichtung";


/**
 * Prüft, ob eine Querung für eine bestimmte Knotenarmnummer und Richtung existiert bzw. zur Zaehlung beauftragt ist.
 * @param querungsverkehr Array mit Querungsverkehr-Daten Zaehlung beauftragt
 * @param knNummer Knotenarmnummer
 * @param richtung Himmelsrichtung
 * @returns Boolean, ob die Querung existiert
 */
export function existsQuerungOnKnotenarmInRichtung(
  querungsverkehr: QuerungsverkehrDTO[] | undefined,
  knNummer: number,
  richtung: Himmelsrichtung
): boolean {
  return (
    existsQuerungsverkehr(querungsverkehr, knNummer, richtung)
  );
}

/**
 * Prüft, ob eine Querung für eine bestimmte Knotenarmnummer und Richtung gefiltert ist.
 * @param chosenQuerungsverkehr Array mit Querungsverkehr-Daten gefiltert
 * @param knNummer Knotenarmnummer
 * @param richtung Himmelsrichtung
 * @returns Boolean, ob die Querung existiert
 */
export function isQuerungOnKnotenarmInRichtungActive(
  chosenQuerungsverkehr: QuerungsverkehrDTO[] | undefined,
  knNummer: number,
  richtung: Himmelsrichtung
): boolean {
  return existsQuerungsverkehr(chosenQuerungsverkehr, knNummer, richtung);
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
