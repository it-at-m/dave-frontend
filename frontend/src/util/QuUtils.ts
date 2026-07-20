// Hilfsfunktion für die Darstellung von Qu-Zählungen

import type Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type QuerungsverkehrDTO from "@/types/zaehlung/QuerungsverkehrDTO";

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

    // Kopiere b in ein veränderbares Array 'remaining'.
    // Für jedes Element q aus 'a' suchen wir in 'remaining' nach einem Eintrag
    // mit derselben Kombination aus `knotenarm` und `richtung`. Wird ein Treffer
    // gefunden, entfernen wir ihn aus 'remaining', damit doppelte Einträge
    // korrekt berücksichtigt werden. Fehlt ein Treffer, sind die Arrays nicht gleich.
    const remaining = [...b];
    return a.every((q) => {
      const idx = remaining.findIndex(
        (r) => r.knotenarm === q.knotenarm && r.richtung === q.richtung
      );
      if (idx === -1) {
        return false;
      }
      remaining.splice(idx, 1);
      return true;
    });
  }

  return {
    computeAvailableKnotenarme,
    existsQuerungsverkehr,
    areQuerungsverkehreEqual,
  };
}
