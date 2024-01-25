import SucheComplexSuggestsDTO from "@/types/suche/SucheComplexSuggestsDTO";
import FetchService from "@/api/service/FetchService";
import NichtPlausibleTageDTO from "@/types/NichtPlausibleTageDTO";

export default class TagesaggregatMessquerschnitt {
    private static readonly ENDPOINT: string = "api/dave-backend-service";

    static getNichtPlausibleTage(
        messquerschnittId: string
    ): Promise<NichtPlausibleTageDTO> {
        return FetchService.getData(
            `${this.ENDPOINT}/tagesaggregat/nichtPlausibleTage?messquerschnittId=${messquerschnittId}`,
            "Beim Lesen der nicht plausiblen Tage ist ein Fehler aufgetreten."
        );
    }
}
