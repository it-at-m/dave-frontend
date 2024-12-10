import FetchService from "@/api/service/FetchService";

export default class GeneratePdfService {
  private static readonly ENDPOINT: string =
    "api/dave-backend-service/generate-pdf";

  static postPdfCustomFetchTemplateZaehlung(
    charttype: string,
    zaehlungId: string,
    data: FormData
  ): Promise<Blob> {
    return this.postPdfCustomFetchTemplate(
      "zaehlung",
      charttype,
      zaehlungId,
      data
    );
  }

  static postPdfCustomFetchTemplateMessstelle(
    charttype: string,
    messstelleId: string,
    data: FormData
  ): Promise<Blob> {
    return this.postPdfCustomFetchTemplate(
      "messstelle",
      charttype,
      messstelleId,
      data
    );
  }
  static postPdfCustomFetchTemplateGesamtauswertung(
    data: FormData
  ): Promise<Blob> {
    return FetchService.postForPdf(
      data,
      `${this.ENDPOINT}/auswertung`,
      "Beim Generieren der PDF ist ein Fehler aufgetreten."
    );
  }

  private static postPdfCustomFetchTemplate(
    type: string,
    charttype: string,
    fachId: string,
    data: FormData
  ): Promise<Blob> {
    return FetchService.postForPdf(
      data,
      `${this.ENDPOINT}/${type}?charttype=${charttype}&fach_id=${fachId}`,
      "Beim generieren der PDF ist ein Fehler aufgetreten."
    );
  }

  static postPdfCustomFetchReport(data: FormData): Promise<Blob> {
    return FetchService.postForPdf(
      data,
      `${this.ENDPOINT}/report`,
      "Beim generieren der PDF ist ein Fehler aufgetreten."
    );
  }
}
