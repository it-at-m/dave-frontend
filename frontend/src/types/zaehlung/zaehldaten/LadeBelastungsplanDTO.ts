import type BelastungsplanData from "@/types/zaehlung/zaehldaten/BelastungsplanData";

export default interface LadeBelastungsplanDTO {
  value1: BelastungsplanData;
  value2: BelastungsplanData;
  value3: BelastungsplanData;
  streets: string[];
  kreisverkehr: boolean;
}
