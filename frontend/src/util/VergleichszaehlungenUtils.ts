import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeVerkehrsbeziehungDTO from "@/types/zaehlung/LadeVerkehrsbeziehungDTO";

import { unionBy } from "lodash";

export function useVergleichszaehlungenUtils() {
  /**
   * Mergt die Knotenarme einer Zählung mit den Knotenarmen einer Vergleichszählung
   * und gibt das Ergebnis zurück.
   */
  function mergeKnotenarmeOfVergleichszaehlungen(
    knotenarmeOfZaehlung: LadeKnotenarmDTO[],
    knotenarmeOfVergleichszaehlung?: LadeKnotenarmDTO[]
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
    verkehrsbeziehungenOfZaehlung: LadeVerkehrsbeziehungDTO[],
    verkehrsbeziehungenOfVergleichszaehlung?: LadeVerkehrsbeziehungDTO[]
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
