import type ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";

import { ZaehlstelleControllerApi } from "@/api/client/apis";
import { Configuration } from "@/api/client/runtime";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class ZaehlstellenService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new ZaehlstelleControllerApi(
    new Configuration({ basePath: this.ENDPOINT })
  );

  static getById(id: string): Promise<ZaehlstelleHeaderDTO> {
    return handleOpenApiError(
      this.API.getZaehlstelleHeaderRaw({ id }).then((response) =>
        response.raw.json()
      ),
      "Beim holen der Zählstelle ist ein Fehler aufgetreten."
    );
  }
}
