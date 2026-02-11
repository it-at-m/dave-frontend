import Himmelsrichtung from "@/types/enum/Himmelsrichtung";

export default interface MessquerschnittAuswertungDTO {
  mqId: string;
  standort: string;
  fahrtrichtung: Himmelsrichtung;
}
