import type AbstractLadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/AbstractLadeBelastungsplanDTO";
import type BelastungsplanQuDataDTO from "@/types/zaehlung/zaehldaten/BelastungsplanQuDataDTO";

export default interface LadeBelastungsplanQuDTO
  extends AbstractLadeBelastungsplanDTO {
  value1: BelastungsplanQuDataDTO;
  value2: BelastungsplanQuDataDTO;
  value3: BelastungsplanQuDataDTO;
}
