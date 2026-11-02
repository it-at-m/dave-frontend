import type { DocumentDto } from "@/api/client";

import { LageplanControllerApi } from "@/api/client/apis";
import createBackendApiConfiguration from "@/api/util/BackendApiConfiguration";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class LageplanService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new LageplanControllerApi(
    createBackendApiConfiguration(this.ENDPOINT)
  );

  static loadLageplan(messstelleId: string): Promise<DocumentDto> {
    return handleOpenApiError(
      this.API.loadLageplanRaw({ mstId: messstelleId }).then((response) =>
        response.raw.json()
      ),
      "Beim Laden des Lageplans ist ein Fehler aufgetreten."
    );
  }
}
