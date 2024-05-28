import LadeZaehldatenTableDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenTableDTO";
import LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import BelastungsplanMessquerschnitteDTO from "@/types/messstelle/BelastungsplanMessquerschnitteDTO";

export default interface LadeProcessedMessdatenDTO {
    zaehldatenTable: LadeZaehldatenTableDTO;

    zaehldatenStepline: LadeZaehldatenSteplineDTO;

    zaehldatenHeatmap: LadeZaehldatenHeatmapDTO;

    belastungsplanMessquerschnitte: BelastungsplanMessquerschnitteDTO;
}
