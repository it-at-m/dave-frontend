import type {
  AuffaelligeTageDTO,
  ValidateZeitraumAndTagestypForMessstelleDTO as GeneratedValidateZeitraumAndTagestypForMessstelleDTO,
  ValidatedZeitraumAndTagestypDTO,
  ValidateZeitraumAndTagestypForMessstelleDTO,
} from "@/api/client";

import { MessstelleOptionsmenuControllerApi } from "@/api/client/apis";
import createBackendApiConfiguration from "@/api/util/BackendApiConfiguration";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class MessstelleOptionsmenuService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new MessstelleOptionsmenuControllerApi(
    createBackendApiConfiguration(this.ENDPOINT)
  );

  static getAuffaelligeTage(mstId: string): Promise<AuffaelligeTageDTO> {
    return handleOpenApiError(
      this.API.getAuffaelligeTageRaw({ mstId }).then((response) =>
        response.raw.json()
      ),
      "Beim Laden der auffälligen Tage ist ein Fehler aufgetreten."
    );
  }

  static validateZeitraumAndTagestyp(
    data: ValidateZeitraumAndTagestypForMessstelleDTO
  ): Promise<ValidatedZeitraumAndTagestypDTO> {
    return handleOpenApiError(
      this.API.validateZeitraumAndTagestypRaw({
        validateZeitraumAndTagestypForMessstelleDTO:
          data as unknown as GeneratedValidateZeitraumAndTagestypForMessstelleDTO,
      }).then((response) => response.raw.json()),
      "Beim Validieren des Zeitraums und Tagestyps ist ein Fehler aufgetreten."
    );
  }
}
