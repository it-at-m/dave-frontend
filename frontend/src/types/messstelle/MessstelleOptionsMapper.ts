import type {
  FahrzeugOptionsDTO,
  MessstelleOptionsDTO,
  Rounding,
  ZaehldatenIntervall,
} from "@/api/client";
import type StartAndEndDate from "@/types/common/StartAndEndDate";

import { useEnumUtils } from "@/util/EnumUtils";

export default class MessstelleOptionsMapper {
  /**
   * Wandelt das Frontend-Objekt in das Backend-DTO um.
   * @param frontendData Das Frontend-Objekt
   * @returns Das Backend-DTO
   */
  static toBackend(frontendData: {
    zeitraumStartAndEndDate: StartAndEndDate;
    zeitraum: string[];
    fahrzeuge: FahrzeugOptionsDTO;
    zeitauswahl: string;
    zeitblock: string;
    tagesTyp: string;
    intervall: ZaehldatenIntervall;
    messquerschnittIds: string[];
    rounding: Rounding;
    blackPrintMode: boolean;
    ganglinieYAchse1MaxValue: number | null;
    ganglinieYAchse2MaxValue: number | null;
    stundensumme: boolean;
    blocksumme: boolean;
    tagessumme: boolean;
    spitzenstunde: boolean;
  }): MessstelleOptionsDTO {
    const { startDate, endDate } = frontendData.zeitraumStartAndEndDate;

    if (!startDate || !endDate) {
      throw new Error("Start- oder Enddatum ist undefined");
    }

    const zeitraum: Date[] = [startDate, endDate];
    const zeitblock = useEnumUtils().toZeitblock(frontendData.zeitblock);
    const tagesTyp = useEnumUtils().toTagesTyp(frontendData.tagesTyp);

    return {
      zeitraum: zeitraum,
      fahrzeuge: frontendData.fahrzeuge,
      zeitauswahl: frontendData.zeitauswahl,
      zeitblock: zeitblock ? zeitblock : undefined,
      tagesTyp: tagesTyp ? tagesTyp : undefined,
      intervall: frontendData.intervall,
      messquerschnittIds: new Set(frontendData.messquerschnittIds),
      rounding: frontendData.rounding,
      stundensumme: frontendData.stundensumme,
      blocksumme: frontendData.blocksumme,
      tagessumme: frontendData.tagessumme,
      spitzenstunde: frontendData.spitzenstunde,
    };
  }
}
