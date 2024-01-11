import MessstelleDTO from "@/types/MessstelleDTO";
import FetchService from "@/api/service/FetchService";

export default class MessstelleService {
    private static readonly ENDPOINT: string =
        "api/dave-backend-service/messstelle";
    static getMessstelleById(id: string): Promise<MessstelleDTO> {
        return FetchService.getData(
            `${this.ENDPOINT}/byId?id=${id}`,
            "Beim holen der Zählstelle ist ein Fehler aufgetreten."
        );
    }
}
