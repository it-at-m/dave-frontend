import type MessstelleAuswertungDTO from "@/types/messstelle/auswertung/MessstelleAuswertungDTO";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import FetchService from "@/api/service/FetchService";
import type AuswertungMessstelleWithFileDTO from "@/types/messstelle/auswertung/AuswertungMessstelleWithFileDTO";

export default class MessstelleAuswertungService {
  private static readonly ENDPOINT: string =
    "api/dave-backend-service/auswertung/messstelle";
  static getAllVisibleMessstellen(): Promise<Array<MessstelleAuswertungDTO>> {
    return FetchService.getData(
      `${this.ENDPOINT}/getAllVisibleMessstellen`,
      "Beim Laden der Messstellen ist ein Fehler aufgetreten."
    );
  }
  static generate(options: MessstelleAuswertungOptionsDTO): Promise<AuswertungMessstelleWithFileDTO> {
    return FetchService.postData(
      options,
      `${this.ENDPOINT}`,
      "Beim Laden der Auswertung ist ein Fehler aufgetreten."
    );
  }
}
