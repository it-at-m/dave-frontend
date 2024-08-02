import type LadeProcessedMessdatenDTO from "@/types/messstelle/LadeProcessedMessdatenDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import FetchService from "@/api/service/FetchService";

export default class LadeMessdatenService {
  private static readonly ENDPOINT_LADE_MESSDATEN_PROCESSED: string =
    "api/dave-backend-service/lade-messwerte";

  public static ladeMessdatenProcessed(
    messstelleId: string,
    options: MessstelleOptionsDTO
  ): Promise<LadeProcessedMessdatenDTO> {
    return FetchService.postData(
      options,
      `${this.ENDPOINT_LADE_MESSDATEN_PROCESSED}?messstelle_id=${messstelleId}`,
      "Beim Laden der aufbreiteteten Messdaten ist ein Fehler aufgetreten."
    );
  }
}
