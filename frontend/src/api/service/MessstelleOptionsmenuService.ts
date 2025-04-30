import type AuffaelligeTageDTO from "@/types/messstelle/AuffaelligeTageDTO";
import type ValidatedZeitraumAndTagestypDTO from "@/types/messstelle/ValidatedZeitraumAndTagestypDTO";
import type ValidateZeitraumAndTagestypForMessstelleDTO from "@/types/messstelle/ValidateZeitraumAndTagestypForMessstelleDTO";

import FetchService from "@/api/service/FetchService";

export default class MessstelleOptionsmenuService {
  private static readonly ENDPOINT: string =
    "api/dave-backend-service/messstelle-optionsmenu";

  static getAuffaelligeTage(mstId: string): Promise<AuffaelligeTageDTO> {
    return FetchService.getData(
      `${this.ENDPOINT}/auffaellige-tage?mst_id=${mstId}`,
      "Beim Laden der auffälligen Tage ist ein Fehler aufgetreten."
    );
  }

  static validateZeitraumAndTagestyp(
    data: ValidateZeitraumAndTagestypForMessstelleDTO
  ): Promise<ValidatedZeitraumAndTagestypDTO> {
    return FetchService.postData(
      data,
      `${this.ENDPOINT}/validate-zeitraum-and-tagestyp`,
      "Beim Validieren des Zeitraums und Tagestyps ist ein Fehler aufgetreten."
    );
  }
}
