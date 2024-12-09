import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";

export default interface AuswertungMessstelleWithFileDTO {
  zaehldatenMessstellen: LadeZaehldatenSteplineDTO;
  spreadsheetBase64Encoded: string;
}
