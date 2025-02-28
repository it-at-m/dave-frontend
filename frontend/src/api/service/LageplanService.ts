import type LageplanDTO from "@/types/messstelle/lageplan/LageplanDTO";

import FetchService from "@/api/service/FetchService";

export default class LageplanService {
  private static readonly ENDPOINT: string =
    "api/dave-backend-service/lageplan";

  static loadLageplan(messstelleId: string): Promise<LageplanDTO> {
    return FetchService.getData(
      `${this.ENDPOINT}?mstId=${messstelleId}`,
      "Beim Laden des Lageplans ist ein Fehler aufgetreten."
    );
  }
}
