import FetchService from "@/api/service/FetchService";
import NichtPlausibleTageDTO from "@/types/NichtPlausibleTageDTO";
import ChosenTagesTypValidDTO from "@/types/messstelle/ChosenTagesTypValidDTO";
import ChosenTagesTypValidRequestDTO from "@/types/messstelle/ChosenTagesTypValidRequestDTO";

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
        chosenTagesTypValidRequestDto: ChosenTagesTypValidRequestDTO
    ): Promise<ChosenTagesTypValidDTO> {
        return FetchService.postData(
            chosenTagesTypValidRequestDto,
            `${this.ENDPOINT}/messstelleOptionsmenu/validateTagesTyp`,
            "Beim Lesen ob der Tagestyp valide ist, ist ein Fehler aufgetreten."
        );
    }
}
