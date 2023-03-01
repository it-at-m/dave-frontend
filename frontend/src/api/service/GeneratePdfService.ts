import FetchService from "@/api/service/FetchService";


export default class GeneratePdfService {

  private static readonly ENDPOINT: string = "api/dave-backend-service/generate-pdf";

  static postPdfCustomFetchTemplate(type: string, zaehlungId: string, data: FormData): Promise<Response> {
    return FetchService.postForPdf(
        data,
        `${this.ENDPOINT}/?type=${type}&zaehlung_id=${zaehlungId}`,
        "Beim generieren der PDF ist ein Fehler aufgetreten."
    );
  }

  static postPdfCustomFetchReport(data: FormData): Promise<Response> {
    return FetchService.postForPdf(
        data,
        `${this.ENDPOINT}/report`,
        "Beim generieren der PDF ist ein Fehler aufgetreten."
    );
  }

}