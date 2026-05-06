import type AbstractLadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/AbstractLadeBelastungsplanDTO";
import type BelastungsplanDataDTO from "@/types/zaehlung/zaehldaten/BelastungsplanDataDTO";

export default interface LadeBelastungsplanDTO
  extends AbstractLadeBelastungsplanDTO {
  value1: BelastungsplanDataDTO;
  value2: BelastungsplanDataDTO;
  value3: BelastungsplanDataDTO;
}
