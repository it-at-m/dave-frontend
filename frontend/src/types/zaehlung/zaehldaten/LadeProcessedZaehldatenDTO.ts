import type LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import type LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import type LadeZaehldatenTableDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenTableDTO";
import type LadeZaehldatenZeitreiheDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenZeitreiheDTO";

export default interface LadeProcessedZaehldatenDTO {
  zaehldatenTable: LadeZaehldatenTableDTO;

  zaehldatenStepline: LadeZaehldatenSteplineDTO;

  zaehldatenHeatmap: LadeZaehldatenHeatmapDTO;

  zaehldatenBelastungsplan: LadeBelastungsplanDTO;

  zaehldatenZeitreihe: LadeZaehldatenZeitreiheDTO;
}
