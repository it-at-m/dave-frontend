import SucheComplexSuggestsDTO from "@/types/suche/SucheComplexSuggestsDTO";
import FetchService from "@/api/service/FetchService";
import NichtPlausibleTageDTO from "@/types/NichtPlausibleTageDTO";

export default class TagesaggregatMessquerschnitt {
    private static readonly ENDPOINT: string = "api/dave-backend-service";

    static getNichtPlausibleTage(
        messquerschnittId: string
    ): Promise<NichtPlausibleTageDTO> {
        return FetchService.getData(
            `${this.ENDPOINT}/tagesaggregat/plausibleTage?messquerschnittId=${messquerschnittId}`,
            "Beim Lesen der Vorschläge ist ein Fehler aufgetreten."
        );
    }
}
