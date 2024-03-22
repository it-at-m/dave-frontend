import LadeBelastungsplanMessqueschnittDataDTO from "./LadeBelastungsplanMessqueschnittDataDTO";

export default interface ListBelastungsplanMessquerschnitteDTO {
    ladeBelastungsplanMessquerschnittDataDTOList: LadeBelastungsplanMessqueschnittDataDTO[];
    strassenname: string;
    stadtbezirkNummer: string;
    messstelleId: string;
    totalKfz: number;
    totalSv: number;
    totalGv: number;
    totalRad: number;
    totalPercentSv: number;
    totalPercentGv: number;
}