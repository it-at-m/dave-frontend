import FetchService from "@/api/service/FetchService";
import type InfoMessageDTO from "@/types/app/InfoMessageDTO";

export default class InfoMessageService {
    private static readonly ENDPOINT: string =
        "api/dave-backend-service/infomessage";

    static getActiveInfoMessage(): Promise<InfoMessageDTO> {
        return FetchService.getData(
            `${this.ENDPOINT}/active`,
            "Beim Laden der Infonachricht ist ein Fehler aufgetreten."
        );
    }
}
