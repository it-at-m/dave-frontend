import type ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";

import FetchService from "@/api/service/FetchService";

export default class ZaehlstellenService {
  private static readonly ENDPOINT: string =
    "api/dave-backend-service/zaehlstelle";

  static getById(id: string): Promise<ZaehlstelleHeaderDTO> {
    return FetchService.getData(
      `${this.ENDPOINT}/byId?id=${id}`,
      "Beim holen der Zählstelle ist ein Fehler aufgetreten."
    );
  }
}
