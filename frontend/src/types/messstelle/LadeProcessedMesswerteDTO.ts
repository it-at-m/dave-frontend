import type { LadeZaehldatenHeatmapDTO } from "@/api/client";
import type TagesTyp from "@/types/enum/TagesTyp";
import type BelastungsplanMessquerschnitteDTO from "@/types/messstelle/BelastungsplanMessquerschnitteDTO";
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import type LadeZaehldatenTableDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenTableDTO";

export default interface LadeProcessedMesswerteDTO {
  zaehldatenTable: LadeZaehldatenTableDTO;

  zaehldatenStepline: LadeZaehldatenSteplineDTO;

  zaehldatenHeatmap: LadeZaehldatenHeatmapDTO;

  belastungsplanMessquerschnitte: BelastungsplanMessquerschnitteDTO;

  requestedMeasuringDays: number;
  includedMeasuringDays: number;

  tagesTyp: TagesTyp;
}
