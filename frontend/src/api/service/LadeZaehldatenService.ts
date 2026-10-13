import type LadeProcessedZaehldatenDTO from "@/types/zaehlung/zaehldaten/LadeProcessedZaehldatenDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import FetchService from "@/api/service/FetchService";

export default class LadeZaehldatenService {
  private static readonly ENDPOINT_LADE_ZAEHLDATEN_PROCESSED: string =
    "api/dave-backend-service/lade-zaehldaten-processed";

  public static ladeZaehldatenProcessed(
    zaehlungId: string,
    options: ZaehlstelleOptionsDTO
  ): Promise<LadeProcessedZaehldatenDTO> {
    return FetchService.postData(
      options,
      `${this.ENDPOINT_LADE_ZAEHLDATEN_PROCESSED}?zaehlung_id=${zaehlungId}`,
      "Beim Laden der aufbereiteten Zählungsdaten ist ein Fehler aufgetreten."
    );
  }
}
