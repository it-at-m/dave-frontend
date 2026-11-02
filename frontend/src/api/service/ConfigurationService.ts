import type { ConfigurationDTO } from "@/api/client";

import { ConfigurationControllerApi } from "@/api/client/apis";
import createBackendApiConfiguration from "@/api/util/BackendApiConfiguration";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class ConfigurationService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new ConfigurationControllerApi(
    createBackendApiConfiguration(this.ENDPOINT)
  );

  static getConfiguration(): Promise<ConfigurationDTO> {
    return handleOpenApiError(
      this.API.getConfigurationRaw().then((response) => response.raw.json()),
      "Beim Laden der Anwendungskonfiguration ist ein Fehler aufgetreten."
    );
  }
}
