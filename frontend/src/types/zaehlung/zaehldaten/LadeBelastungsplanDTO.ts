import type BelastungsplanDataDTO from "@/types/zaehlung/zaehldaten/BelastungsplanDataDTO";
import type BelastungsplanQJSDataDTO from "@/types/zaehlung/zaehldaten/BelastungsplanQJSDataDTO";

export default interface LadeBelastungsplanDTO {
  value1: BelastungsplanDataDTO | BelastungsplanQJSDataDTO;
  value2: BelastungsplanDataDTO | BelastungsplanQJSDataDTO;
  value3: BelastungsplanDataDTO | BelastungsplanQJSDataDTO;
  streets: string[];
  kreisverkehr: boolean;
}
