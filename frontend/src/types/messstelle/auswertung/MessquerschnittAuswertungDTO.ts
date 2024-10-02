import Himmelsrichtungen from "@/types/enum/Himmelsrichtungen";

export default interface MessquerschnittAuswertungDTO {
  mqId: string;
  standort: string;
  fahrtrichtung: Himmelsrichtungen;
}
