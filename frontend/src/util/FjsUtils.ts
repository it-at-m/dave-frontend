// Hilfsfunktion für die Darstellung von Fjs-Zählungen

import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import KnotenarmComparator from "./KnotenarmComparator";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import type LaengsverkehrDTO from "@/types/zaehlung/LaengsverkehrDTO";

export function useFjs() {
  /**
   * Extrahiert und splittet den Straßennamen eines Knotenarms
   * @param knotenarm optionaler Knotenarm DTO
   * @returns Array<string> mit einem oder zwei Elementen (falls gesplittet)
   */
  function getStreetname(
    knotenarm: LadeKnotenarmDTO | undefined
  ): Array<string> {
    let strasse = "";
    if (knotenarm && knotenarm.strassenname) {
      strasse = knotenarm.strassenname;
    }
    let pieces = [strasse];
    const zeichen = strasse.length;
    // Anzahl Zeichen
    if (zeichen > 17) {
      pieces = ["", ""];
      if (strasse.endsWith("str.")) {
        const index = strasse.indexOf("str.");
        pieces[0] = strasse.substring(0, zeichen - 4);
        pieces[1] = strasse.substring(index);
      }
      // Platz
      if (strasse.endsWith("pl.")) {
        const index = strasse.indexOf("pl.");
        pieces[0] = strasse.substring(0, zeichen - 3);
        pieces[1] = strasse.substring(index);
      }
      // Bindestrich
      if (strasse.includes("-")) {
        const index = strasse.indexOf("-");
        pieces[0] = strasse.substring(0, index + 1);
        pieces[1] = strasse.substring(index + 1);
      }
      // Leerzeichen
      else if (strasse.includes(" ")) {
        const index = strasse.indexOf(" ");
        pieces[0] = strasse.substring(0, index + 1);
        pieces[1] = strasse.substring(index + 1);
      }
    }
    return pieces;
  }

  function computeAvailableKnotenarme(
    activeZaehlung: LadeZaehlungDTO
  ): LadeKnotenarmDTO[] {
    const knotenarmeByNumber = new Map(
      activeZaehlung.knotenarme.map((kn) => [kn.nummer, kn] as const)
    );
    return Array.from(knotenarmeByNumber.values())
      .sort(KnotenarmComparator.sortByNumber);
  }

  function computeAvailableKnotenarmNummernFromZaehlung(
    activeZaehlung: LadeZaehlungDTO
  ): number[] {
    return computeAvailableKnotenarme(activeZaehlung).map((a) => a.nummer);
  }

  function computeSelectedArrowsOfNode(
    node: number,
    laengsverkehr: LaengsverkehrDTO[]
  ): Map<Himmelsrichtung, Array<Bewegungsrichtung>> {
    const selectedArrows = new Map<Himmelsrichtung, Array<Bewegungsrichtung>>();

    laengsverkehr
      .filter((arrow) => arrow.knotenarm === node)
      .forEach((arrow) => {
        const richtungen = new Array<Bewegungsrichtung>(arrow.richtung);
        selectedArrows.set(
          arrow.strassenseite,
          richtungen.concat(selectedArrows.get(arrow.strassenseite) ?? [])
        );
      });

    return selectedArrows;
  }

  return {
    getStreetname,
    computeAvailableKnotenarme,
    computeAvailableKnotenarmNummernFromZaehlung,
    computeSelectedArrowsOfNode,
  };
}
