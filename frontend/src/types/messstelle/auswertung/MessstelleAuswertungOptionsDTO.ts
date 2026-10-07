import type {
  FahrzeugOptionsDTO,
  MessstelleAuswertungIdDTO,
} from "@/api/client";

import { AuswertungsZeitraum } from "@/types/enum/AuswertungCategories";
import TagesTyp from "@/types/enum/TagesTyp";

export default interface MessstelleAuswertungOptionsDTO {
  jahre: Array<string>; // Array<number>
  tagesTyp: TagesTyp;
  zeitraumCategorie: string; // gibts nicht
  zeitraum: Array<AuswertungsZeitraum>;
  messstelleAuswertungIds: Array<MessstelleAuswertungIdDTO>; // Set<MessstelleAuswertungIdDTO>
  fahrzeuge: FahrzeugOptionsDTO; // FahrzeugOptionsDTO

  // Nicht fuer das Backend
  verfuegbareVerkehrsarten: Array<string>; // gibts nicht
}
