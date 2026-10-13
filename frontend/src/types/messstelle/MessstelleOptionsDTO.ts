import type StartAndEndDate from "@/types/common/StartAndEndDate";
import type Rounding from "@/types/enum/Rounding";
import type FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";

import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

export default interface MessstelleOptionsDTO {
  zeitraumStartAndEndDate: StartAndEndDate;
  zeitraum: string[];
  fahrzeuge: FahrzeugOptions;
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
