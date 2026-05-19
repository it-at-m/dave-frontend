import type BelastungsplanTyp from "@/types/enum/BelastungsplanTyp";

export default interface AbstractLadeBelastungsplanDTO {
  streets: string[];
  kreisverkehr: boolean;
  belastungsplanTyp: BelastungsplanTyp;
}
