import type CsvDTO from "@/types/common/CsvDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import FetchService from "@/api/service/FetchService";

export default class GenerateCsvService {
  private static readonly ENDPOINT: string =
    "api/dave-backend-service/generate-csv";

  public static generateCsv(
    zaehlungId: string,
    options: ZaehlstelleOptionsDTO
  ): Promise<CsvDTO> {
    return FetchService.postData(
      options,
      `${this.ENDPOINT}?zaehlung_id=${zaehlungId}`,
      "Beim Erzeugen der CSV ist ein Fehler aufgetreten."
    );
  }
  public static generateCsvMst(
    messstelleId: string,
    options: MessstelleOptionsDTO
  ): Promise<CsvDTO> {
    return FetchService.postData(
      options,
      `${this.ENDPOINT}-mst?messstelle_id=${messstelleId}`,
      "Beim Erzeugen der CSV ist ein Fehler aufgetreten."
    );
  }
}
