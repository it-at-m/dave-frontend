import FetchService from "@/api/service/FetchService";
import NichtPlausibleTageDTO from "@/types/NichtPlausibleTageDTO";
import ChosenTagesTypValidDTO from "@/types/messstelle/ChosenTagesTypValidDTO";

export default class MessstelleOptionsmenuService {
    private static readonly ENDPOINT: string = "api/dave-backend-service";

    static getNichtPlausibleTage(
        messquerschnittId: string
    ): Promise<NichtPlausibleTageDTO> {
        return FetchService.getData(
            `${this.ENDPOINT}/messstelleOptionsmenu/nichtPlausibleTage?messstelle_id=${messquerschnittId}`,
            "Beim Lesen der nicht plausiblen Tage ist ein Fehler aufgetreten."
        );
    }

    static isTagesTypValid(
        startDate: string,
        endDate: string,
        tagesTyp: string
    ): Promise<ChosenTagesTypValidDTO> {
        return FetchService.getData(
            `${this.ENDPOINT}/messstelleOptionsmenu/validateTagesTyp?start_date=${startDate}&end_date=${endDate}&tages_typ=${tagesTyp}`,
            "Beim Lesen ob der Tagestyp valide ist, ist ein Fehler aufgetreten."
        );
    }
}
