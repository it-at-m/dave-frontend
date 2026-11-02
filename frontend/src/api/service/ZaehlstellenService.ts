import type { LeseZaehlstelleDTO } from "@/api/client";

import { ZaehlstelleControllerApi } from "@/api/client/apis";
import createBackendApiConfiguration from "@/api/util/BackendApiConfiguration";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class ZaehlstellenService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new ZaehlstelleControllerApi(
    createBackendApiConfiguration(this.ENDPOINT)
  );

  static getById(id: string): Promise<LeseZaehlstelleDTO> {
    return handleOpenApiError(
      this.API.getZaehlstelleHeaderRaw({ id }).then((response) =>
        response.raw.json()
      ),
      "Beim holen der Zählstelle ist ein Fehler aufgetreten."
    );
  }
}
