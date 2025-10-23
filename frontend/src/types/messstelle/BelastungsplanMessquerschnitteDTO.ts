import type LadeBelastungsplanMessqueschnittDataDTO from "./LadeBelastungsplanMessqueschnittDataDTO";

export default interface BelastungsplanMessquerschnitteDTO {
  ladeBelastungsplanMessquerschnittDataDTOList: LadeBelastungsplanMessqueschnittDataDTO[];
  strassenname: string;
  stadtbezirkNummer: string;
  mstId: string;
  totalKfz: number;
  totalSv: number;
  totalGv: number;
  totalRad: number;
  totalPercentSv: number;
  totalPercentGv: number;
  startUhrzeitSpitzenstunde: string;
  endeUhrzeitSpitzenstunde: string;
}
