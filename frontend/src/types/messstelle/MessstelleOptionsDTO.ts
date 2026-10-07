import type {
  FahrzeugOptionsDTO,
  Rounding,
  ZaehldatenIntervall,
} from "@/api/client";
import type StartAndEndDate from "@/types/common/StartAndEndDate";

export default interface MessstelleOptionsDTO {
  zeitraumStartAndEndDate: StartAndEndDate; //
  zeitraum: string[];
  fahrzeuge: FahrzeugOptionsDTO;
  zeitauswahl: string;
  zeitblock: string;
  tagesTyp: string;
  intervall: ZaehldatenIntervall;
  messquerschnittIds: string[];
  // Darstellungsoptionen
  rounding: Rounding;
  blackPrintMode: boolean;
  // Ganglinie
  ganglinieYAchse1MaxValue: number | null;
  ganglinieYAchse2MaxValue: number | null;
  // Listenausgabe
  stundensumme: boolean;
  blocksumme: boolean;
  tagessumme: boolean;
  spitzenstunde: boolean;
}
