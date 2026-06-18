export interface FahrbeziehungKeyDTO {
  von: number;
  nach: number;
}

export interface FahrbeziehungWerteDTO {
  pkw: number;
  lkw: number;
  lastzuege: number;
  busse: number;
  kraftraeder: number;
  fahrradfahrer: number;
  fussgaenger: number;
  kfz: number;
}

export interface ZeitintervallRowDTO {
  startUhrzeit: string;
  endeUhrzeit: string;
  wertByFahrbeziehung: Record<string, FahrbeziehungWerteDTO>;
}

export interface DrilldownDTO {
  fahrbeziehungen: FahrbeziehungKeyDTO[];
  zeitintervalle: ZeitintervallRowDTO[];
  spaltensummen: Record<string, FahrbeziehungWerteDTO>;
}