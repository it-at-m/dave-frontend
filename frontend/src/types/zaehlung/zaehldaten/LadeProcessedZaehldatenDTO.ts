import LadeZaehldatenTableDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenTableDTO";
import LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";

export default interface LadeProcessedZaehldatenDTO {

  zaehldatenTable: LadeZaehldatenTableDTO;

  zaehldatenStepline: LadeZaehldatenSteplineDTO;

  zaehldatenHeatmap: LadeZaehldatenHeatmapDTO;

}