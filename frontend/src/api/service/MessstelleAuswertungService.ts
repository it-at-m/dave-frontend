import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import FetchService from "@/api/service/FetchService";

export default class MessstelleAuswertungService {
    private static readonly ENDPOINT: string =
        "api/dave-backend-service/auswertung/messstelle";
    static getAllVisibleMessstellen(): Promise<Array<MessstelleInfoDTO>> {
        return FetchService.getData(
            `${this.ENDPOINT}/getAllVisibleMessstellen`,
            "Beim Laden der Messstellen ist ein Fehler aufgetreten."
        );
    }
}
