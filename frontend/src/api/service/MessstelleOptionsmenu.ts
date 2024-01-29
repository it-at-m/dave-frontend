import FetchService from "@/api/service/FetchService";
import NichtPlausibleTageDTO from "@/types/NichtPlausibleTageDTO";

export default class MessstelleOptionsmenu {
    private static readonly ENDPOINT: string = "api/dave-backend-service";

    static getNichtPlausibleTage(
        messquerschnittId: string
    ): Promise<NichtPlausibleTageDTO> {
        return FetchService.getData(
            `${this.ENDPOINT}/messstelleOptionsmenu/nichtPlausibleTage?messstelle_id=${messquerschnittId}`,
            "Beim Lesen der nicht plausiblen Tage ist ein Fehler aufgetreten."
        );
    }
}
