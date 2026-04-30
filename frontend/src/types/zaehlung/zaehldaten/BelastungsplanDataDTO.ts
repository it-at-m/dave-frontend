import type AbstractBelastungsplanDataDTO from "@/types/zaehlung/zaehldaten/AbstractBelastungsplanDataDTO";

export default interface BelastungsplanDataDTO
  extends AbstractBelastungsplanDataDTO {
  values: number[][];
  percent: boolean;

  sumIn: number[];
  sumOut: number[];
  sum: number[];
}
