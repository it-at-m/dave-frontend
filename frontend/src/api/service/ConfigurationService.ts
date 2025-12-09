import type ConfigurationDTO from "@/types/configuration/ConfigurationDTO";

import FetchService from "@/api/service/FetchService";

export default class ConfigurationService {
  private static readonly ENDPOINT: string =
    "api/dave-backend-service/configuration";

  static getConfiguration(): Promise<ConfigurationDTO> {
    return FetchService.getData(
      `${this.ENDPOINT}`,
      "Beim Laden der Anwendungskonfiguration ist ein Fehler aufgetreten."
    );
  }
}
