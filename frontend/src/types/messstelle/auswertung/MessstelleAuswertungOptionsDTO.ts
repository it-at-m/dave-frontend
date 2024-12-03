import type MessstelleAuswertungIdDTO from "@/types/messstelle/auswertung/MessstelleAuswertungIdDTO";
import type FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";

import {AuswertungsZeitraum, ZeitintervallCategories} from "@/types/enum/AuswertungCategories";
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
