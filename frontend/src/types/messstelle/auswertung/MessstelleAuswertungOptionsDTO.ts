import type { MessstelleAuswertungIdDTO } from "@/api/client";
import type FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";

import { AuswertungsZeitraum } from "@/types/enum/AuswertungCategories";
import TagesTyp from "@/types/enum/TagesTyp";

export default interface MessstelleAuswertungOptionsDTO {
  jahre: Array<string>;
  tagesTyp: TagesTyp;
  zeitraumCategorie: string;
  zeitraum: Array<AuswertungsZeitraum>;
  messstelleAuswertungIds: Array<MessstelleAuswertungIdDTO>;
  fahrzeuge: FahrzeugOptions;

  // Nicht fuer das Backend
  verfuegbareVerkehrsarten: Array<string>;
}
