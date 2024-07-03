import type LadeZaehldatenTableDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenTableDTO";
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import type LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import type BelastungsplanMessquerschnitteDTO from "@/types/messstelle/BelastungsplanMessquerschnitteDTO";

export default interface LadeProcessedMessdatenDTO {
    zaehldatenTable: LadeZaehldatenTableDTO;

    zaehldatenStepline: LadeZaehldatenSteplineDTO;

    zaehldatenHeatmap: LadeZaehldatenHeatmapDTO;

    belastungsplanMessquerschnitte: BelastungsplanMessquerschnitteDTO;
}
