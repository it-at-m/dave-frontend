import type {
  BelastungsplanMessquerschnitteDTO,
  LadeZaehldatenHeatmapDTO,
  LadeZaehldatenSteplineDTO,
  LadeZaehldatenTableDTO,
} from "@/api/client";
import type TagesTyp from "@/types/enum/TagesTyp";

export default interface LadeProcessedMesswerteDTO {
  zaehldatenTable: LadeZaehldatenTableDTO;

  zaehldatenStepline: LadeZaehldatenSteplineDTO;

  zaehldatenHeatmap: LadeZaehldatenHeatmapDTO;

  belastungsplanMessquerschnitte: BelastungsplanMessquerschnitteDTO;

  requestedMeasuringDays: number;
  includedMeasuringDays: number;

  tagesTyp: TagesTyp;
}
