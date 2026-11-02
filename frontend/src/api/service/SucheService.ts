import type {
  ErhebungsstelleKarteDTO,
  SearchAndFilterOptionsDTO as GeneratedSearchAndFilterOptionsDTO,
  SearchAndFilterOptionsDTO,
  SucheComplexSuggestsDTO,
} from "@/api/client";

import { SucheControllerApi } from "@/api/client/apis";
import createBackendApiConfiguration from "@/api/util/BackendApiConfiguration";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class SucheService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new SucheControllerApi(
    createBackendApiConfiguration(this.ENDPOINT)
  );

  static getSuggestions(
    query: string,
    searchAndFilterOptions: SearchAndFilterOptionsDTO
  ): Promise<SucheComplexSuggestsDTO> {
    return handleOpenApiError(
      this.API.suggestDatenportalRaw({
        query,
        searchAndFilterOptionsDTO:
          searchAndFilterOptions as unknown as GeneratedSearchAndFilterOptionsDTO,
      }).then((response) => response.raw.json()),
      "Beim Lesen der Vorschläge ist ein Fehler aufgetreten."
    );
  }

  static searchErhebungsstelle(
    query: string,
    searchAndFilterOptions: SearchAndFilterOptionsDTO
  ): Promise<Array<ErhebungsstelleKarteDTO>> {
    return handleOpenApiError(
      this.API.searchErhebungsstelleForMapDatenportalRaw({
        query,
        searchAndFilterOptionsDTO:
          searchAndFilterOptions as unknown as GeneratedSearchAndFilterOptionsDTO,
      }).then((response) => response.raw.json()),
      "Beim Suchen von Zähl-/Messstellen ist ein Fehler aufgetreten."
    );
  }
}
