import type { InfoMessageDTO } from "@/api/client";

import { InfoMessageControllerApi } from "@/api/client/apis";
import createBackendApiConfiguration from "@/api/util/BackendApiConfiguration";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class InfoMessageService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new InfoMessageControllerApi(
    createBackendApiConfiguration(this.ENDPOINT)
  );

  static getActiveInfoMessage(): Promise<InfoMessageDTO> {
    return handleOpenApiError(
      this.API.getActiveInfoMessageRaw().then((response) =>
        response.raw.json()
      ),
      "Beim Laden der Infonachricht ist ein Fehler aufgetreten."
    );
  }
}
