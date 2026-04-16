import type BelastungsplanQJSDataDTO from "@/types/zaehlung/zaehldaten/BelastungsplanQJSDataDTO";
import type AbstractLadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/AbstractLadeBelastungsplanDTO";

export default interface LadeBelastungsplanQJSDTO extends AbstractLadeBelastungsplanDTO{
  value1: BelastungsplanQJSDataDTO;
  value2: BelastungsplanQJSDataDTO;
  value3: BelastungsplanQJSDataDTO;
}
