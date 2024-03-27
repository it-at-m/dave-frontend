import FetchService from "@/api/service/FetchService";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import CsvDTO from "@/types/CsvDTO";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

export default class GenerateCsvService {
    private static readonly ENDPOINT: string =
        "api/dave-backend-service/generate-csv";

    public static generateCsv(
        zaehlungId: string,
        options: OptionsDTO
    ): Promise<CsvDTO> {
        return FetchService.postData(
            options,
            `${this.ENDPOINT}?zaehlung_id=${zaehlungId}`,
            "Beim Erzeugen der CSV ist ein Fehler aufgetreten."
        );
    }
    public static generateCsvMst(
        messstelleId: string,
        options: MessstelleOptionsDTO
    ): Promise<CsvDTO> {
        return FetchService.postData(
            options,
            `${this.ENDPOINT}-mst?messstelle_id=${messstelleId}`,
            "Beim Erzeugen der CSV ist ein Fehler aufgetreten."
        );
    }
}
