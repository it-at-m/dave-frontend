import type AbstractBelastungsplanDataDTO from "@/types/zaehlung/zaehldaten/AbstractBelastungsplanDataDTO";

import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";

export default interface BelastungsplanFjsDataDTO
  extends AbstractBelastungsplanDataDTO {
  valuesKnotenarme: {
    knotenarm: number;
    sumKnotenarm: number;
    valuesStrassenseiten: {
      strassenseite: Himmelsrichtung;
      sumStrassenseite: number;
      valuesLaengsverkehre: {
        richtung: Bewegungsrichtung;
        value: number;
      }[];
    }[];
  }[];
}
