import type BelastungsplanDataDTO from "@/types/zaehlung/zaehldaten/BelastungsplanDataDTO";
import type AbstractLadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/AbstractLadeBelastungsplanDTO";

export default interface LadeBelastungsplanDTO extends AbstractLadeBelastungsplanDTO{
  value1: BelastungsplanDataDTO;
  value2: BelastungsplanDataDTO;
  value3: BelastungsplanDataDTO;
}
