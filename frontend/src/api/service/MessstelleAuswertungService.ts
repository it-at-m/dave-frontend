import FetchService from "@/api/service/FetchService";
import type MessstelleAuswertungDTO from "@/types/messstelle/auswertung/MessstelleAuswertungDTO";

export default class MessstelleAuswertungService {
    private static readonly ENDPOINT: string =
        "api/dave-backend-service/auswertung/messstelle";
    static getAllVisibleMessstellen(): Promise<Array<MessstelleAuswertungDTO>> {
        return FetchService.getData(
            `${this.ENDPOINT}/getAllVisibleMessstellen`,
            "Beim Laden der Messstellen ist ein Fehler aufgetreten."
        );
    }
}
