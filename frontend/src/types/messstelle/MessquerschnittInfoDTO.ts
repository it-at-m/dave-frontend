import Himmelsrichtung from "@/types/enum/Himmelsrichtung";

export default interface MessquerschnittInfoDTO {
  mstId: string;
  mqId: string;
  strassenname: string;
  lageMessquerschnitt: string;
  fahrtrichtung: Himmelsrichtung;
  anzahlFahrspuren: number;
  anzahlDetektoren: number;
  standort: string;
}
