import FetchService from "@/api/service/FetchService";
import SucheComplexSuggestsDTO from "@/types/suche/SucheComplexSuggestsDTO";
import ZaehlstelleKarteDTO from "@/types/zaehlstelle/ZaehlstelleKarteDTO";

export default class SucheService {

  private static readonly ENDPOINT: string = "api/dave-backend-service";

  static getSuggestions(query: string): Promise<SucheComplexSuggestsDTO> {
    return FetchService.getData(
        `${this.ENDPOINT}/suggest-datenportal?query=${query}`,
        "Beim Lesen der Vorschläge ist ein Fehler aufgetreten."
    );
  }

  static searchZaehlstelle(query: string): Promise<Array<ZaehlstelleKarteDTO>> {
    return FetchService.getData(
        `${this.ENDPOINT}/search-datenportal?query=${query}`,
        "Beim Suchen von Zählstellen ist ein Fehler aufgetreten."
    );
  }

}
