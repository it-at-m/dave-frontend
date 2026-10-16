import type {
  MessstelleOptionsDTO as GeneratedMessstelleOptionsDTO,
  LadeProcessedMesswerteDTO,
} from "@/api/client";
import type MessstelleOptions from "@/types/messstelle/MessstelleOptions";

import { MesswerteMessquerschnittControllerApi } from "@/api/client/apis";
import { Configuration } from "@/api/client/runtime";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";
import MessstelleOptionsMapper from "@/types/messstelle/MessstelleOptionsMapper";

export default class LadeMessdatenService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new MesswerteMessquerschnittControllerApi(
    new Configuration({ basePath: this.ENDPOINT })
  );

  public static ladeMessdatenProcessed(
    messstelleId: string,
    options: MessstelleOptions
  ): Promise<LadeProcessedMesswerteDTO> {
    const messstelleOptionsDTO = MessstelleOptionsMapper.toBackend(options);
    return handleOpenApiError(
      this.API.ladeMesswerteRaw({
        messstelleId,
        messstelleOptionsDTO,
      }).then((response) => response.raw.json()),
      "Beim Laden der aufbreiteteten Messdaten ist ein Fehler aufgetreten."
    );
  }
}
