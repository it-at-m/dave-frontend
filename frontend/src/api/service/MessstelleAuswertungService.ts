import type {
  MessstelleAuswertungOptionsDTO as GeneratedMessstelleAuswertungOptionsDTO,
  MessstelleAuswertungDTO,
} from "@/api/client";
import type AuswertungMessstelleWithFileDTO from "@/types/messstelle/auswertung/AuswertungMessstelleWithFileDTO";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import { AuswertungControllerApi } from "@/api/client/apis";
import { Configuration } from "@/api/client/runtime";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";
import { MessstelleAuswertungOptionsMapper } from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsMapper";

export default class MessstelleAuswertungService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new AuswertungControllerApi(
    new Configuration({ basePath: this.ENDPOINT })
  );

  static getAllVisibleMessstellen(): Promise<Array<MessstelleAuswertungDTO>> {
    return handleOpenApiError(
      this.API.getAllVisibleMessstellenRaw().then((response) =>
        response.raw.json()
      ),
      "Beim Laden der Messstellen ist ein Fehler aufgetreten."
    );
  }
  static generate(
    options: MessstelleAuswertungOptionsDTO
  ): Promise<AuswertungMessstelleWithFileDTO> {
    const messstelleAuswertungOptionsDTO =
      MessstelleAuswertungOptionsMapper.toBackend(options);
    return handleOpenApiError(
      this.API.getAuswertungMessstelleRaw({
        messstelleAuswertungOptionsDTO,
      }).then((response) => response.raw.json()),
      "Beim Laden der Auswertung ist ein Fehler aufgetreten."
    );
  }
}
