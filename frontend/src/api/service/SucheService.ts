import FetchService from "@/api/service/FetchService";
import SucheComplexSuggestsDTO from "@/types/suche/SucheComplexSuggestsDTO";
import MessstelleKarteDTO from "@/types/MessstelleKarteDTO";
import AnzeigeKarteDTO from "@/types/AnzeigeKarteDTO";

export default class SucheService {
    private static readonly ENDPOINT: string = "api/dave-backend-service";

    static getSuggestions(query: string): Promise<SucheComplexSuggestsDTO> {
        return FetchService.getData(
            `${this.ENDPOINT}/suggest-datenportal?query=${query}`,
            "Beim Lesen der Vorschläge ist ein Fehler aufgetreten."
        );
    }

    static searchZaehlstelle(query: string): Promise<Array<AnzeigeKarteDTO>> {
        return FetchService.getData(
            `${this.ENDPOINT}/search-datenportal?query=${query}`,
            "Beim Suchen von Zählstellen ist ein Fehler aufgetreten."
        );
    }

    static getMockMessstelleKarte(): AnzeigeKarteDTO[] {
        const mstOne: MessstelleKarteDTO = {
            type: "messstelle",
            id: "randomID",
            latitude: 48.1887227,
            longitude: 11.4290655,
            tooltip: {
                mstId: "MSTID1",
                standortDatenportal: "StandortDatenportal1",
                stadtbezirk: 13,
                realisierungsdatum: "01.01.2023",
                abbaudatum: "01.02.2023",
                datumLetzteMessung: "15.01.2023",
                kfz: true,
            },
        };

        const msttwo: MessstelleKarteDTO = {
            type: "messstelle",
            id: "randomID2",
            latitude: 48.1316995,
            longitude: 11.6227731,
            tooltip: {
                mstId: "MSTID2",
                standortDatenportal: "StandortDatenportal2",
                stadtbezirk: 13,
                realisierungsdatum: "02.01.2020",
                abbaudatum: "04.04.2020",
                datumLetzteMessung: "31.03.2020",
                kfz: true,
            },
        };

        const mstthree: MessstelleKarteDTO = {
            type: "messstelle",
            id: "randomID",
            latitude: 48.1315995,
            longitude: 11.6217731,
            tooltip: {
                mstId: "MSTID3",
                standortDatenportal: "StandortDatenportal3",
                stadtbezirk: 13,
                realisierungsdatum: "01.01.2023",
                abbaudatum: "01.01.2023",
                datumLetzteMessung: "01.03.2023",
                kfz: true,
            },
        };

        return [mstOne, msttwo, mstthree];
    }
}
