import type { Rounding, ZaehldatenIntervall } from "@/api/client";
import type { MessstelleOptionsDTO } from "@/api/client/models/MessstelleOptionsDTO"; // Backend-DTO

import type FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";

import StartAndEndDate from "@/types/common/StartAndEndDate";

export default class MessstelleOptionsMapper {
  /**
   * Wandelt das Backend-DTO in das Frontend-Format um.
   * @param backendData Das MessstelleOptionsDTO vom Backend
   * @returns Das umgewandelte Frontend-Objekt
   */
  static toFrontend(backendData: MessstelleOptionsDTO): {
    zeitraumStartAndEndDate: StartAndEndDate;
    zeitraum: string[];
    fahrzeuge: FahrzeugOptions;
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
  } {
    // Zeitraum in StartAndEndDate umwandeln
    const zeitraumStartAndEndDate: StartAndEndDate = new StartAndEndDate(
      new Date(backendData.zeitraum[0]),
      new Date(backendData.zeitraum[1])
    );

    // Optional: Formatierung der Daten in Strings, falls gewünscht
    const zeitraumStrings = backendData.zeitraum.map((date) =>
      new Date(date).toISOString()
    );

    return {
      zeitraumStartAndEndDate,
      zeitraum: zeitraumStrings,
      fahrzeuge: backendData.fahrzeuge,
      zeitauswahl: backendData.zeitauswahl,
      zeitblock: JSON.stringify(backendData.zeitblock), // oder direkt das Objekt verwenden
      tagesTyp: JSON.stringify(backendData.tagesTyp),
      intervall: backendData.intervall,
      messquerschnittIds: Array.from(backendData.messquerschnittIds),
      rounding: backendData.rounding,
      blackPrintMode: false, // Standardwert, anpassen falls notwendig
      ganglinieYAchse1MaxValue: null,
      ganglinieYAchse2MaxValue: null,
      stundensumme: backendData.stundensumme,
      blocksumme: backendData.blocksumme,
      tagessumme: backendData.tagessumme,
      spitzenstunde: backendData.spitzenstunde,
    };
  }
}
