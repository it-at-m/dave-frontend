import FetchService from "@/api/service/FetchService";
import SucheComplexSuggestsDTO from "@/types/suche/SucheComplexSuggestsDTO";
import AnzeigeKarteDTO from "@/types/AnzeigeKarteDTO";

export default class SucheService {
    private static readonly ENDPOINT: string = "api/dave-backend-service";

    static getSuggestions(query: string): Promise<SucheComplexSuggestsDTO> {
        return FetchService.getData(
            `${this.ENDPOINT}/suggest-datenportal?query=${query}`,
            "Beim Lesen der Vorschläge ist ein Fehler aufgetreten."
        );
    }

    static searchErhebungsstelle(
        query: string
    ): Promise<Array<AnzeigeKarteDTO>> {
        return FetchService.getData(
            `${this.ENDPOINT}/search-datenportal?query=${query}`,
            "Beim Suchen von Zählstellen ist ein Fehler aufgetreten."
        );
    }
}
