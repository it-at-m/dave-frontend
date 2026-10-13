import type Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import type AbstractBelastungsplanDataDTO from "@/types/zaehlung/zaehldaten/AbstractBelastungsplanDataDTO";

export default interface BelastungsplanQuDataDTO
  extends AbstractBelastungsplanDataDTO {
  valuesKnotenarme: {
    knotenarm: number;
    sumKnotenarm: number;
    valuesQuerungsverkehre: {
      richtung: Himmelsrichtung;
      value: number;
    }[];
  }[];
}
