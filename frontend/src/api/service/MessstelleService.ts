import type MessstelleInfoType from "@/types/messstelle/MessstelleInfoType";

import { MessstelleControllerApi } from "@/api/client/apis";
import createBackendApiConfiguration from "@/api/util/BackendApiConfiguration";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class MessstelleService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new MessstelleControllerApi(
    createBackendApiConfiguration(this.ENDPOINT)
  );

  static getMessstelleById(id: string): Promise<MessstelleInfoType> {
    return handleOpenApiError(
      this.API.readMessstelleInfoByIdRaw({ id }).then((response) =>
        response.raw.json()
      ),
      "Beim Holen der Messstelle ist ein Fehler aufgetreten."
    );
  }

  static getMessstelleByMstId(mstid: string): Promise<MessstelleInfoType> {
    return handleOpenApiError(
      this.API.readMessstelleInfoByMstIdRaw({ mstid }).then((response) =>
        response.raw.json()
      ),
      "Beim Holen der Messstelle ist ein Fehler aufgetreten."
    );
  }
}
