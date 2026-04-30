import type AbstractBelastungsplanDataDTO from "@/types/zaehlung/zaehldaten/AbstractBelastungsplanDataDTO";

import Himmelsrichtung from "@/types/enum/Himmelsrichtung";

export default interface BelastungsplanFjsDataDTO
  extends AbstractBelastungsplanDataDTO {
  sumAll: number;
  valuesStrassenseite: { strassenseite: Himmelsrichtung; value: number }[];
  valuesLaengsverkehr: {
    von: number;
    strassenseite: Himmelsrichtung;
    value: number;
  }[];
}
