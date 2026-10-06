import type InfoMessageDTO from "@/types/app/InfoMessageDTO";

import { InfoMessageControllerApi } from "@/api/client/apis";
import { Configuration } from "@/api/client/runtime";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class InfoMessageService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new InfoMessageControllerApi(
    new Configuration({ basePath: this.ENDPOINT })
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
