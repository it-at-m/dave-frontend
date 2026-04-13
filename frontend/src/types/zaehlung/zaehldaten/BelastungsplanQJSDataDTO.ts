import type AbstractBelastungsplanDataDTO from "@/types/zaehlung/zaehldaten/AbstractBelastungsplanDataDTO";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import type VerkehrsbeziehungDTO from "@/types/zaehlung/VerkehrsbeziehungDTO";

export default interface BelastungsplanQJSDataDTO extends AbstractBelastungsplanDataDTO{
  sumAll: number;
  sumStrassenseite: Map<Himmelsrichtung,number>;
  valuesVerkehrsbeziehungen: Map<VerkehrsbeziehungDTO,number>;
}
