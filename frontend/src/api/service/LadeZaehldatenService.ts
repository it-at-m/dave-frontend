import FetchService from "@/api/service/FetchService";
import type LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import type LadeProcessedZaehldatenDTO from "@/types/zaehlung/zaehldaten/LadeProcessedZaehldatenDTO";
import type LadeZaehldatenZeitreiheDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenZeitreiheDTO";

export default class LadeZaehldatenService {
    private static readonly ENDPOINT_LADE_ZAEHLDATEN_PROCESSED: string =
        "api/dave-backend-service/lade-zaehldaten-processed";

    private static readonly ENDPOINT_LADE_BELSTUNGSPLAN: string =
        "api/dave-backend-service/lade-belastungsplan";

    private static readonly ENDPOINT_LADE_ZEITREIHE: string =
        "api/dave-backend-service/lade-zeitreihe";

    public static ladeZaehldatenProcessed(
        zaehlungId: string,
        options: OptionsDTO
    ): Promise<LadeProcessedZaehldatenDTO> {
        return FetchService.postData(
            options,
            `${this.ENDPOINT_LADE_ZAEHLDATEN_PROCESSED}?zaehlung_id=${zaehlungId}`,
            "Beim Laden der aufbreiteteten Zählungsdaten ist ein Fehler aufgetreten."
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
