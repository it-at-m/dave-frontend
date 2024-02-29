import LadeZaehldatenTableDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenTableDTO";
import LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import ListBelastungsplanMessquerschnitteDTO from "@/types/messstelle/ListBelastungsplanMessquerschnitteDTO";

export default interface LadePrcessedMessdatenDTO {
    zaehldatenTable: LadeZaehldatenTableDTO;

    zaehldatenStepline: LadeZaehldatenSteplineDTO;

    zaehldatenHeatmap: LadeZaehldatenHeatmapDTO;

    listBelastungsplanMessquerschnitteDTO: ListBelastungsplanMessquerschnitteDTO;
}
