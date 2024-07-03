import type LadeZaehldatenTableDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenTableDTO";
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import type LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";

export default interface LadeProcessedZaehldatenDTO {
    zaehldatenTable: LadeZaehldatenTableDTO;

    zaehldatenStepline: LadeZaehldatenSteplineDTO;

    zaehldatenHeatmap: LadeZaehldatenHeatmapDTO;
}
