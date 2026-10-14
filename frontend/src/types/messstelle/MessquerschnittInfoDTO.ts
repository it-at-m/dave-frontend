import { Himmelsrichtung } from "@/api/client";

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
