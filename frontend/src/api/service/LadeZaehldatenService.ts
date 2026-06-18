import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import type LadeProcessedZaehldatenDTO from "@/types/zaehlung/zaehldaten/LadeProcessedZaehldatenDTO";

import FetchService from "@/api/service/FetchService";
import type { DrilldownDTO } from "@/types/zaehlung/zaehldaten/DrillDownDTO";

export default class LadeZaehldatenService {
  private static readonly ENDPOINT_LADE_ZAEHLDATEN_PROCESSED: string =
    "api/dave-backend-service";

  public static ladeZaehldatenProcessed(
    zaehlungId: string,
    options: OptionsDTO
  ): Promise<LadeProcessedZaehldatenDTO> {
    return FetchService.postData(
      options,
      `${this.ENDPOINT_LADE_ZAEHLDATEN_PROCESSED}/lade-zaehldaten-processed?zaehlung_id=${zaehlungId}`,
      "Beim Laden der Aufbreiteteten Zählungsdaten ist ein Fehler aufgetreten."
    );
  }

  public static ladeZaehldatenDrillDown(
    zaehlungId: string,
    options: OptionsDTO
  ): Promise<DrilldownDTO> {
    return FetchService.postData(
      options,
      `${this.ENDPOINT_LADE_ZAEHLDATEN_PROCESSED}/load-count-with-direction?zaehlung_id=${zaehlungId}`,
      "Beim Laden der Aufbreiteteten Zählungsdaten ist ein Fehler aufgetreten."
    );
  }
}
