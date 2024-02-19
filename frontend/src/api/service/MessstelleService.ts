import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import FetchService from "@/api/service/FetchService";

export default class MessstelleService {
    private static readonly ENDPOINT: string =
        "api/dave-backend-service/messstelle";
    static getMessstelleById(id: string): Promise<MessstelleInfoDTO> {
        return FetchService.getData(
            `${this.ENDPOINT}/info?id=${id}`,
            "Beim Holen der Messstelle ist ein Fehler aufgetreten."
        );
    }
}
