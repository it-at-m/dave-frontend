import type StepLineSeriesEntryDTO from "@/types/zaehlung/zaehldaten/StepLineSeriesEntryDTO";

export default interface LadeZaehldatenSteplineDTO {
  legend: Array<string>;

  rangeMax: number;

  rangeMaxPercent: number;

  xaxisDataFirstChart: Array<string>;

  xaxisDataSecondChart: Array<string> | null;

  seriesEntriesFirstChart: Array<StepLineSeriesEntryDTO>;

  seriesEntriesSecondChart: Array<StepLineSeriesEntryDTO> | null;
}
