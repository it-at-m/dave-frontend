import type {
  FahrzeugOptionsDTO,
  MessstelleAuswertungIdDTO,
  TagesTyp,
} from "@/api/client";

import { AuswertungsZeitraum } from "@/types/enum/AuswertungCategories";

export default interface MessstelleAuswertungOptions {
  jahre: Array<string>; // Array<number>
  tagesTyp: TagesTyp;
  zeitraumCategorie: string; // gibts nicht
  zeitraum: Array<AuswertungsZeitraum>;
  messstelleAuswertungIds: Array<MessstelleAuswertungIdDTO>; // Set<MessstelleAuswertungIdDTO>
  fahrzeuge: FahrzeugOptionsDTO; // FahrzeugOptionsDTO

  // Nicht fuer das Backend
  verfuegbareVerkehrsarten: Array<string>; // gibts nicht
}
