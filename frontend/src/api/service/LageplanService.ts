import type LageplanDTO from "@/types/messstelle/lageplan/LageplanDTO";

import { LageplanControllerApi } from "@/api/client/apis";
import { Configuration } from "@/api/client/runtime";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class LageplanService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new LageplanControllerApi(
    new Configuration({ basePath: this.ENDPOINT })
  );

  static loadLageplan(messstelleId: string): Promise<LageplanDTO> {
    return handleOpenApiError(
      this.API.loadLageplanRaw({ mstId: messstelleId }).then((response) =>
        response.raw.json()
      ),
      "Beim Laden des Lageplans ist ein Fehler aufgetreten."
    );
  }
}
