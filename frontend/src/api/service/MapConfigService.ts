import FetchService from "@/api/service/FetchService";
import type MapConfigDTO from "@/types/karte/MapConfigDTO";

export default class MapConfigService {
  private static readonly ENDPOINT: string =
      "api/dave-backend-service/map";

  static getMapConfig(): Promise<MapConfigDTO> {
    return FetchService.getData(
        `${this.ENDPOINT}`,
        "Beim Laden der Kartenkonfiguration ist ein Fehler aufgetreten."
    );
  }
}
