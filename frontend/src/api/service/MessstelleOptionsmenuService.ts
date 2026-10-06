import type {
  AuffaelligeTageDTO,
  ValidateZeitraumAndTagestypForMessstelleDTO as GeneratedValidateZeitraumAndTagestypForMessstelleDTO,
} from "@/api/client";
import type ValidatedZeitraumAndTagestypDTO from "@/types/messstelle/ValidatedZeitraumAndTagestypDTO";
import type ValidateZeitraumAndTagestypForMessstelleDTO from "@/types/messstelle/ValidateZeitraumAndTagestypForMessstelleDTO";

import { MessstelleOptionsmenuControllerApi } from "@/api/client/apis";
import { Configuration } from "@/api/client/runtime";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class MessstelleOptionsmenuService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new MessstelleOptionsmenuControllerApi(
    new Configuration({ basePath: this.ENDPOINT })
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
