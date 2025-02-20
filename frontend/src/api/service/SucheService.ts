import type AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";
import type SearchAndFilterOptionsDTO from "@/types/suche/SearchAndFilterOptionsDTO";
import type SucheComplexSuggestsDTO from "@/types/suche/SucheComplexSuggestsDTO";

import FetchService from "@/api/service/FetchService";

export default class SucheService {
  private static readonly ENDPOINT: string = "api/dave-backend-service";

  static getSuggestions(query: string): Promise<SucheComplexSuggestsDTO> {
    return FetchService.getData(
      `${this.ENDPOINT}/suggest-datenportal?query=${query}`,
      "Beim Lesen der Vorschläge ist ein Fehler aufgetreten."
    );
  }

  static searchErhebungsstelle(query: string): Promise<Array<AnzeigeKarteDTO>> {
    return FetchService.getData(
      `${this.ENDPOINT}/search-datenportal?query=${query}`,
      "Beim Suchen von Zähl-/Messstellen ist ein Fehler aufgetreten."
    );
  }

  static searchErhebungsstelle2(
    query: string,
    searchAndFilterOptions: SearchAndFilterOptionsDTO
  ): Promise<Array<AnzeigeKarteDTO>> {
    return FetchService.postData(
      searchAndFilterOptions,
      `${this.ENDPOINT}/search-datenportal?query=${query}`,
      "Beim Suchen von Zähl-/Messstellen ist ein Fehler aufgetreten."
    );
  }
}
