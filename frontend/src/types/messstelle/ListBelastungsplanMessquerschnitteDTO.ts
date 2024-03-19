import LadeBelastungsplanMessqueschnittDataDTO from "./LadeBelastungsplanMessqueschnittDataDTO";

export default interface ListBelastungsplanMessquerschnitteDTO {
    ladeBelastungsplanMessquerschnittDataDTOList: LadeBelastungsplanMessqueschnittDataDTO[];
    strassenname: string;
    totalKfz: number;
    totalSv: number;
    totalGv: number;
    totalPercentSv: number;
    totalPercentGv: number;
}