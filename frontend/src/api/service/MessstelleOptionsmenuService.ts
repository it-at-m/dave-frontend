import type AuffaelligeTageDTO from "@/types/messstelle/AuffaelligeTageDTO";
import type ChosenTagesTypValidDTO from "@/types/messstelle/ChosenTagesTypValidDTO";
import type ChosenTagesTypValidRequestDTO from "@/types/messstelle/ChosenTagesTypValidRequestDTO";

import FetchService from "@/api/service/FetchService";

export default class MessstelleOptionsmenuService {
  private static readonly ENDPOINT: string = "api/dave-backend-service";

  static isTagesTypValid(
    chosenTagesTypValidRequestDto: ChosenTagesTypValidRequestDTO
  ): Promise<ChosenTagesTypValidDTO> {
    return FetchService.postData(
      chosenTagesTypValidRequestDto,
      `${this.ENDPOINT}/messstelleOptionsmenu/validateTagesTyp`,
      "Beim Lesen ob der Tagestyp valide ist, ist ein Fehler aufgetreten."
    );
  }

  static getAuffaelligeTage(mstId: string): Promise<AuffaelligeTageDTO> {
    return FetchService.getData(
      `${this.ENDPOINT}/messstelleOptionsmenu/auffaellige-tage?mst_id=${mstId}`,
      "Beim Laden der auffälligen Tage ist ein Fehler aufgetreten."
    );
  }
}
