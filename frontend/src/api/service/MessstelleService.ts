import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";

import { MessstelleControllerApi } from "@/api/client/apis";
import { Configuration } from "@/api/client/runtime";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class MessstelleService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new MessstelleControllerApi(
    new Configuration({ basePath: this.ENDPOINT })
  );

  static getMessstelleById(id: string): Promise<MessstelleInfoDTO> {
    return handleOpenApiError(
      this.API.readMessstelleInfoByMstIdRaw({ id, mstid: "" }).then(
        (response) => response.raw.json()
      ),
      "Beim Holen der Messstelle ist ein Fehler aufgetreten."
    );
  }

  static getMessstelleByMstId(mstid: string): Promise<MessstelleInfoDTO> {
    return handleOpenApiError(
      this.API.readMessstelleInfoByMstIdRaw({ id: "", mstid }).then(
        (response) => response.raw.json()
      ),
      "Beim Holen der Messstelle ist ein Fehler aufgetreten."
    );
  }
}
