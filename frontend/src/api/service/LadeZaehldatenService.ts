import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import type LadeProcessedZaehldatenDTO from "@/types/zaehlung/zaehldaten/LadeProcessedZaehldatenDTO";

import FetchService from "@/api/service/FetchService";

export default class LadeZaehldatenService {
  private static readonly ENDPOINT_LADE_ZAEHLDATEN_PROCESSED: string =
    "api/dave-backend-service/lade-zaehldaten-processed";

  public static ladeZaehldatenProcessed(
    zaehlungId: string,
    options: OptionsDTO
  ): Promise<LadeProcessedZaehldatenDTO> {
    return FetchService.postData(
      options,
      `${this.ENDPOINT_LADE_ZAEHLDATEN_PROCESSED}?zaehlung_id=${zaehlungId}`,
      "Beim Laden der Aufbreiteteten Zählungsdaten ist ein Fehler aufgetreten."
    );
  }
}
