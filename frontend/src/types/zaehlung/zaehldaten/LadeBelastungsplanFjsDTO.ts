import type AbstractLadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/AbstractLadeBelastungsplanDTO";
import type BelastungsplanFjsDataDTO from "@/types/zaehlung/zaehldaten/BelastungsplanFjsDataDTO";

export default interface LadeBelastungsplanFjsDTO
  extends AbstractLadeBelastungsplanDTO {
  value1: BelastungsplanFjsDataDTO;
  value2: BelastungsplanFjsDataDTO;
  value3: BelastungsplanFjsDataDTO;
}
