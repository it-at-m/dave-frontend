import type {
  MessstelleOptionsDTO as GeneratedMessstelleOptionsDTO,
  OptionsDTO,
} from "@/api/client";
import type CsvDTO from "@/types/common/CsvDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { GenerateCsvControllerApi } from "@/api/client/apis";
import { Configuration } from "@/api/client/runtime";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class GenerateCsvService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new GenerateCsvControllerApi(
    new Configuration({ basePath: this.ENDPOINT })
  );

  public static generateCsv(
    zaehlungId: string,
    options: ZaehlstelleOptionsDTO
  ): Promise<CsvDTO> {
    return handleOpenApiError(
      this.API.generateCSVRaw({
        zaehlungId,
        optionsDTO: options as OptionsDTO,
      }).then((response) => response.raw.json()),
      "Beim Erzeugen der CSV ist ein Fehler aufgetreten."
    );
  }
  public static generateCsvMst(
    messstelleId: string,
    options: MessstelleOptionsDTO
  ): Promise<CsvDTO> {
    return handleOpenApiError(
      this.API.generateCSVMessstelleRaw({
        messstelleId,
        messstelleOptionsDTO:
          options as unknown as GeneratedMessstelleOptionsDTO,
      }).then((response) => response.raw.json()),
      "Beim Erzeugen der CSV ist ein Fehler aufgetreten."
    );
  }
}
