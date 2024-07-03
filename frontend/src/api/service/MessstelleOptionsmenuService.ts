import FetchService from "@/api/service/FetchService";
import type NichtPlausibleTageDTO from "@/types/messstelle/NichtPlausibleTageDTO";
import type ChosenTagesTypValidDTO from "@/types/messstelle/ChosenTagesTypValidDTO";
import type ChosenTagesTypValidRequestDTO from "@/types/messstelle/ChosenTagesTypValidRequestDTO";
import type { ValidWochentageInPeriodRequestDto } from "@/types/messstelle/ValidWochentageInPeriodRequestDto";

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

    static getValidWochentageInPeriod(
        validWochentageinPeriodRequestDto: ValidWochentageInPeriodRequestDto
    ) {
        return FetchService.postData(
            validWochentageinPeriodRequestDto,
            `${this.ENDPOINT}/messstelleOptionsmenu/validWochentageInPeriod`,
            "Beim Lesen ob der Tagestyp valide ist, ist ein Fehler aufgetreten."
        );
    }
}
