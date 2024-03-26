import FetchService from "@/api/service/FetchService";
import LadeProcessedZaehldatenDTO from "@/types/zaehlung/zaehldaten/LadeProcessedZaehldatenDTO";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import LadeProcessedMessdatenDTO from "@/types/messstelle/LadeProcessedMessdatenDTO";

export default class LadeMessdatenService {
    private static readonly ENDPOINT_LADE_MESSDATEN_PROCESSED: string =
        "api/dave-backend-service/lade-messwerte";

    public static ladeMessdatenProcessed(
        messstelleId: string,
        options: MessstelleOptionsDTO
    ): Promise<LadeProcessedMessdatenDTO> {
        return FetchService.postData(
            options,
            `${this.ENDPOINT_LADE_MESSDATEN_PROCESSED}?messstelle_id=${messstelleId}`,
            "Beim Laden der aufbreiteteten Messdaten ist ein Fehler aufgetreten."
        );
    }
}
