import type AbstractLadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/AbstractLadeBelastungsplanDTO";
import type BelastungsplanQjsDataDTO from "@/types/zaehlung/zaehldaten/BelastungsplanQjsDataDTO";

export default interface LadeBelastungsplanQjsDTO
  extends AbstractLadeBelastungsplanDTO {
  value1: BelastungsplanQjsDataDTO;
  value2: BelastungsplanQjsDataDTO;
  value3: BelastungsplanQjsDataDTO;
}
