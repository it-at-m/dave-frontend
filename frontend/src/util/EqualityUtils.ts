import type QuerungsverkehrDTO from "@/types/zaehlung/QuerungsverkehrDTO";
import type LaengsverkehrDTO from "@/types/zaehlung/LaengsverkehrDTO";
import type VerkehrsbeziehungDTO from "@/types/zaehlung/VerkehrsbeziehungDTO";

import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import {existsQuerungOnKnotenarmInRichtung} from "@/util/Querungspruefung";

/**
 * Vergleicht zwei Arrays von Querungsverkehren.
 * Rückgabe true, wenn beide Arrays dieselben Einträgen enthalten (Reihenfolge wird ignoriert).
 */
export function areQuVerkehrsbeziehungenEqual(
  querungsA: QuerungsverkehrDTO[] | undefined,
  querungsB: QuerungsverkehrDTO[] | undefined
): boolean {
  const a = querungsA ?? [];
  const b = querungsB ?? [];

  if (a.length !== b.length) {
    return false;
  }

  return a.every((q) =>
      existsQuerungOnKnotenarmInRichtung(b, q.knotenarm, q.richtung)
  );
}

/**
 * Prüft, ob ein Laengsverkehr für eine bestimmte Knotenarmnummer, Straßenseite und Richtung im Array existiert.
 * @param laengsverkehr Array Laengsverkehren
 * @param knNummer Knotenarmnummer
 * @param strassenseite Himmelsrichtung
 * @param richtung Bewegungsrichtung
 * @returns Boolean, ob der Laengsverkehr existiert
 */
function existsLaengsverkehr(
  laengsverkehr: LaengsverkehrDTO[] | undefined,
  knNummer: number,
  strassenseite: Himmelsrichtung,
  richtung: Bewegungsrichtung
): boolean {
  if (!laengsverkehr || laengsverkehr.length === 0) {
    return false;
  }
  return laengsverkehr.some(
    (l) =>
      l.knotenarm === knNummer &&
      l.strassenseite === strassenseite &&
      l.richtung === richtung
  );
}

/**
 * Vergleicht zwei Arrays von Laengsverkehren.
 * Rückgabe true, wenn beide Arrays dieselben Einträgen enthalten (Reihenfolge wird ignoriert).
 */
export function areFjsVerkehrsbeziehungenEqual(
  laengsA: LaengsverkehrDTO[] | undefined,
  laengsB: LaengsverkehrDTO[] | undefined
): boolean {
  const a = laengsA ?? [];
  const b = laengsB ?? [];

  if (a.length !== b.length) {
    return false;
  }

  return a.every((l) =>
    existsLaengsverkehr(b, l.knotenarm, l.strassenseite, l.richtung)
  );
}

/**
 * Prüft, ob eine QJS-Verkehrsbeziehung mit bestimmten von, nach und Straßenseite im Array existiert.
 * @param verkehrsbeziehungen Array QJS-Verkehrsbeziehungen
 * @param von Knotenarmnummer
 * @param nach Knotenarmnummer
 * @param strassenseite String
 * @returns Boolean, ob die Verkehrsbeziehung existiert
 */
function existsQJSVerkehrsbeziehung(
  verkehrsbeziehungen: VerkehrsbeziehungDTO[] | undefined,
  von: number,
  nach: number,
  strassenseite: string
): boolean {
  if (!verkehrsbeziehungen || verkehrsbeziehungen.length === 0) {
    return false;
  }
  return verkehrsbeziehungen.some(
    (v) =>
      v.von === von && v.nach === nach && v.strassenseite === strassenseite
  );
}

/**
 * Vergleicht zwei Arrays von QJS-Verkehrsbeziehungen.
 * Rückgabe true, wenn beide Arrays dieselben Einträgen enthalten (Reihenfolge wird ignoriert).
 */
export function areQjsVerkehrsbeziehungenEqual(
  qjsA: VerkehrsbeziehungDTO[] | undefined,
  qjsB: VerkehrsbeziehungDTO[] | undefined
): boolean {
  const a = qjsA ?? [];
  const b = qjsB ?? [];

  if (a.length !== b.length) {
    return false;
  }

  return a.every((v) =>
    existsQJSVerkehrsbeziehung(b, v.von, v.nach, v.strassenseite)
  );
}
