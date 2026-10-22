import type { LadeProcessedZaehldatenDTO, OptionsDTO } from "@/api/client";

import { LadeZaehldatenControllerApi } from "@/api/client/apis";
import { Configuration } from "@/api/client/runtime";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new LadeZaehldatenControllerApi(
    new Configuration({ basePath: this.ENDPOINT })
  );

  public static async ladeZaehldatenProcessed(
    zaehlungId: string,
    options: OptionsDTO
  ): Promise<LadeProcessedZaehldatenDTO> {
    return handleOpenApiError(
      this.API.ladeZaehldatenProcessed({ zaehlungId, optionsDTO: options }),
      "Beim Laden der aufbereiteten Zähldaten ist ein Fehler aufgetreten."
    );
  }
}
