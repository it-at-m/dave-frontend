import type {
  AuswertungsZeitraum,
  FahrzeugOptionsDTO,
  MessstelleAuswertungIdDTO,
  TagesTyp,
} from "@/api/client";

import { AuswertungsZeitraumFromJSON } from "@/api/client";
import { useEnumUtils } from "@/util/EnumUtils";

export class MessstelleAuswertungOptionsMapper {
  static toBackend(frontendData: {
    jahre: string[]; // oder number[], je nach Frontend
    tagesTyp: TagesTyp;
    zeitraum: Array<AuswertungsZeitraum>;
    messstelleAuswertungIds: Array<MessstelleAuswertungIdDTO>;
    fahrzeuge: FahrzeugOptionsDTO;
  }): any {
    frontendData.zeitraum.forEach((z) => {
      console.log(z);
      const z1 = AuswertungsZeitraumFromJSON(z);
      console.log("z1: " + z1);
    });

    return {
      jahre: frontendData.jahre.map((jahr) => parseInt(jahr, 10)), // falls jahre als string
      tagesTyp: useEnumUtils().toTagesTyp(frontendData.tagesTyp),
      zeitraum: frontendData.zeitraum, // bereits Array<AuswertungsZeitraum>
      messstelleAuswertungIds: new Set(frontendData.messstelleAuswertungIds),
      fahrzeuge: frontendData.fahrzeuge,
    };
  }
}
