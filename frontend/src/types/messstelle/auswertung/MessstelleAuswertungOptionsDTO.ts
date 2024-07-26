import type FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";

import { AuswertungsZeitraum } from "@/types/enum/AuswertungCategories";
import TagesTyp from "@/types/enum/TagesTyp";

export default interface MessstelleAuswertungOptionsDTO {
  jahre: Array<string>;
  tagesTyp: TagesTyp;
  zeitraum: Array<AuswertungsZeitraum>;
  mstIds: Array<string>;
  mqIds: Array<string>;
  fahrzeuge: FahrzeugOptions;

  // Nicht fuer das Backend
  verfuegbareVerkehrsarten: Array<string>;
}
