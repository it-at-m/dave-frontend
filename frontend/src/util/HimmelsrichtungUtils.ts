;
// Hilfsfunktion für die Darstellung von Qjs-Zählungen

import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";



import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
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

  function computeAvailableKnotenarmNummernFromZaehlung(
    activeZaehlung: LadeZaehlungDTO
  ): number[] {
    return computeAvailableKnotenarme(activeZaehlung).map((a) => a.nummer);
  }

  function computeSelectedArrowsOfNode(
    node: number,
    activeZaehlung: LadeZaehlungDTO
  ): Map<Himmelsrichtung, Array<Bewegungsrichtung>> {
    const laengsverkehr = activeZaehlung.laengsverkehr;
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
    computeAvailableKnotenarme,
    computeAvailableKnotenarmNummernFromZaehlung,
    computeSelectedArrowsOfNode,
  };


}