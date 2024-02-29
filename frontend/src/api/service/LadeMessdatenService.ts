import FetchService from "@/api/service/FetchService";
import LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import LadeProcessedZaehldatenDTO from "@/types/zaehlung/zaehldaten/LadeProcessedZaehldatenDTO";
import LadeZaehldatenZeitreiheDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenZeitreiheDTO";
import LadePrcessedMessdatenDTO from "@/types/messstelle/LadePrcessedMessdatenDTO";

export default class LadeMessdatenService {
    private static readonly ENDPOINT_LADE_MESSDATEN_PROCESSED: string =
        "api/dave-backend-service/lade-messwerte";

    private static readonly ENDPOINT_LADE_BELSTUNGSPLAN: string =
        "api/dave-backend-service/lade-belastungsplan";

    private static readonly ENDPOINT_LADE_ZEITREIHE: string =
        "api/dave-backend-service/lade-zeitreihe";

    public static ladeMessdatenProcessed(
        messstelleId: string
    ): Promise<LadePrcessedMessdatenDTO> {
        return FetchService.getData(
            `${this.ENDPOINT_LADE_MESSDATEN_PROCESSED}?messstelle_id=${messstelleId}`,
            "Beim Laden der aufbreiteteten Messdaten ist ein Fehler aufgetreten."
        );
    }

    public static ladeBelastungsplan(
        id: string,
        options: OptionsDTO
    ): Promise<LadeBelastungsplanDTO> {
        return FetchService.postData(
            options,
            `${this.ENDPOINT_LADE_BELSTUNGSPLAN}?zaehlung_id=${id}`,
            "Beim Laden der Daten für den Belastungsplan ist ein Fehler aufgetreten."
        );
    }

    public static ladeZeitreihe(
        zaehlstelleId: string,
        zaehlungId: string,
        options: OptionsDTO
    ): Promise<LadeZaehldatenZeitreiheDTO> {
        return FetchService.postData(
            options,
            `${this.ENDPOINT_LADE_ZEITREIHE}?zaehlstelle_id=${zaehlstelleId}&zaehlung_id=${zaehlungId}`,
            "Beim Laden der Daten für die Zeitreihe ist ein Fehler aufgetreten."
        );
    }
}
