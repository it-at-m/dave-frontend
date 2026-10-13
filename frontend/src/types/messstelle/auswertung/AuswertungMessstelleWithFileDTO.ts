import type { LadeZaehldatenSteplineDTO } from "@/api/client";

export default interface AuswertungMessstelleWithFileDTO {
  zaehldatenMessstellen: LadeZaehldatenSteplineDTO;
  spreadsheetBase64Encoded: string;
}
