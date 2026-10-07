import type {
  AuswertungsZeitraum,
  FahrzeugOptionsDTO,
  MessstelleAuswertungIdDTO,
  TagesTyp,
} from "@/api/client";

export class MessstelleAuswertungOptionsMapper {
  static toBackend(frontendData: {
    jahre: string[]; // oder number[], je nach Frontend
    tagesTyp: TagesTyp;
    zeitraum: Array<AuswertungsZeitraum>;
    messstelleAuswertungIds: Array<MessstelleAuswertungIdDTO>;
    fahrzeuge: FahrzeugOptionsDTO;
  }): any {
    return {
      jahre: frontendData.jahre.map((jahr) => parseInt(jahr, 10)), // falls jahre als string
      tagesTyp: frontendData.tagesTyp,
      zeitraum: frontendData.zeitraum, // bereits Array<AuswertungsZeitraum>
      messstelleAuswertungIds: new Set(frontendData.messstelleAuswertungIds),
      fahrzeuge: frontendData.fahrzeuge,
    };
  }
}
