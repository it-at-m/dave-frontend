export default interface LadeZaehldatenHeatmapDTO {

  legend: Array<string>;

  rangeMin: number;

  rangeMax: number;

  xaxisDataFirstChart: Array<string>;

  seriesEntriesFirstChart: Array<Array<number>>;

  // xxisDataSecondChart und seriesEntriesSecondChart sind null, wenn nur ein Chart benötigt wird.
  // Wenn der Graph gesplitted wird (bei 2x4-Stunden-Zählungen) dann werden diese Variablen befüllt.
  xaxisDataSecondChart: Array<string> | null;

  seriesEntriesSecondChart: Array<Array<number>> | null;

}