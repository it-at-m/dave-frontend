import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
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

    static getPlausibleMesstage(id: string): string[] {
        return [
            "2023-01-12",
            "2023-02-15",
            "2023-03-21",
            "2023-04-08",
            "2023-05-02",
            "2023-06-19",
            "2023-07-04",
            "2023-08-22",
            "2023-09-10",
            "2023-10-24",
            "2023-11-05",
            "2023-12-17",
        ];
    }
}
