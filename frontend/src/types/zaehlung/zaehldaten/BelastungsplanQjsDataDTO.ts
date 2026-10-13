import type AbstractBelastungsplanDataDTO from "@/types/zaehlung/zaehldaten/AbstractBelastungsplanDataDTO";

import Himmelsrichtung from "@/types/enum/Himmelsrichtung";

export default interface BelastungsplanQjsDataDTO
  extends AbstractBelastungsplanDataDTO {
  sumAll: number;
  valuesStrassenseite: { strassenseite: Himmelsrichtung; value: number }[];
  valuesVerkehrsbeziehungen: {
    von: number;
    nach: number;
    strassenseite: Himmelsrichtung;
    value: number;
  }[];
}
