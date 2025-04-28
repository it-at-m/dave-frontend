import type MapConfigDTO from "@/types/karte/MapConfigDTO";

import FetchService from "@/api/service/FetchService";

export default class MapConfigService {
  private static readonly ENDPOINT: string =
    "api/dave-backend-service/mapconfig";

  static getMapConfig(): Promise<MapConfigDTO> {
    return FetchService.getData(
      `${this.ENDPOINT}`,
      "Beim Laden der Kartenkonfiguration ist ein Fehler aufgetreten."
    );
  }
}
