import type AbstractLadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/AbstractLadeBelastungsplanDTO";
import type BelastungsplanQJSDataDTO from "@/types/zaehlung/zaehldaten/BelastungsplanQJSDataDTO";

export default interface LadeBelastungsplanQjsDTO
  extends AbstractLadeBelastungsplanDTO {
  value1: BelastungsplanQJSDataDTO;
  value2: BelastungsplanQJSDataDTO;
  value3: BelastungsplanQJSDataDTO;
}
