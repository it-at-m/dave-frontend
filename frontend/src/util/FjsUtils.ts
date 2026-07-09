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

  /**
   * Prüft, ob ein Laengsverkehr für eine bestimmte Knotenarmnummer, Richtung und Straßenseite im Array existiert.
   * @param laengsverkehr Array Laengsverkehre
   * @param knNummer Knotenarmnummer
   * @param strassenseite Straßenseite
   * @param richtung Himmelsrichtung
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
      (q) =>
        q.knotenarm === knNummer &&
        q.strassenseite === strassenseite &&
        q.richtung === richtung
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

    // Kopiere b in ein veränderbares Array 'remaining'.
    // Für jedes Element q aus 'a' suchen wir in 'remaining' nach einem Eintrag
    // mit derselben Kombination aus `knotenarm`, `strassenseite` und `richtung`. Wird ein Treffer
    // gefunden, entfernen wir ihn aus 'remaining', damit doppelte Einträge
    // korrekt berücksichtigt werden. Fehlt ein Treffer, sind die Arrays nicht gleich.
    const remaining = [...b];
    return a.every((q) => {
      const idx = remaining.findIndex(
        (r) =>
          r.knotenarm === q.knotenarm &&
          r.strassenseite === q.strassenseite &&
          r.richtung === q.richtung
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
    computeAvailableKnotenarmNummernFromZaehlung,
    existsLaengsverkehr,
    areLaengsverkehreEqual,
  };
}
