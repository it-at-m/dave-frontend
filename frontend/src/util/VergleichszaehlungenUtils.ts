import type { BearbeiteKnotenarmDTO } from "@/api/client";
import type LadeVerkehrsbeziehung from "@/types/zaehlung/LadeVerkehrsbeziehung";

import { unionBy } from "lodash";

export function useVergleichszaehlungenUtils() {
  /**
   * Mergt die Knotenarme einer Zählung mit den Knotenarmen einer Vergleichszählung
   * und gibt das Ergebnis zurück.
   */
  function mergeKnotenarmeOfVergleichszaehlungen(
    knotenarmeOfZaehlung: BearbeiteKnotenarmDTO[],
    knotenarmeOfVergleichszaehlung?: BearbeiteKnotenarmDTO[]
  ) {
    return unionBy(
      knotenarmeOfZaehlung,
      knotenarmeOfVergleichszaehlung,
      "nummer"
    );
  }

  /**
   * Mergt die Verkehrsbeziehungen einer Zählung mit den Verkehrsbeziehungen einer Vergleichszählung
   * und gibt das Ergebnis zurück.
   */
  function mergeVerkehrsbeziehungenOfVergleichszaehlungen(
    verkehrsbeziehungenOfZaehlung: LadeVerkehrsbeziehung[],
    verkehrsbeziehungenOfVergleichszaehlung?: LadeVerkehrsbeziehung[]
  ) {
    return unionBy(
      verkehrsbeziehungenOfZaehlung,
      verkehrsbeziehungenOfVergleichszaehlung,
      (vb) => `${vb.von}:${vb.nach}`
    );
  }

  return {
    mergeKnotenarmeOfVergleichszaehlungen,
    mergeVerkehrsbeziehungenOfVergleichszaehlungen,
  };
}
