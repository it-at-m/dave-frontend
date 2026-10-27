import type {
  GenerateMessstellePdfRequest,
  GeneratePdfAuswertungRequest,
  GeneratePdfReportRequest,
  GenerateZaehlungPdfRequest,
} from "@/api/client";

import { GeneratePdfControllerApi } from "@/api/client/apis";
import { Configuration } from "@/api/client/runtime";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class GeneratePdfService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new GeneratePdfControllerApi(
    new Configuration({ basePath: this.ENDPOINT })
  );

  static postPdfCustomFetchTemplateZaehlung(
    charttype: string,
    zaehlungId: string,
    data: FormData
  ): Promise<Blob> {
    return handleOpenApiError(
      this.API.generateZaehlungPdfRaw(
        {
          fachId: zaehlungId,
          charttype,
          generateZaehlungPdfRequest: {} as GenerateZaehlungPdfRequest,
        },
        { body: data, headers: {} }
      ).then((response) => response.raw.blob()),
      "Beim generieren der PDF ist ein Fehler aufgetreten."
    );
  }

  static postPdfCustomFetchTemplateMessstelle(
    charttype: string,
    messstelleId: string,
    data: FormData
  ): Promise<Blob> {
    return handleOpenApiError(
      this.API.generateMessstellePdfRaw(
        {
          fachId: messstelleId,
          charttype,
          generateMessstellePdfRequest: {} as GenerateMessstellePdfRequest,
        },
        { body: data, headers: {} }
      ).then((response) => response.raw.blob()),
      "Beim Generieren der PDF ist ein Fehler aufgetreten."
    );
  }
  static postPdfCustomFetchTemplateGesamtauswertung(
    data: FormData
  ): Promise<Blob> {
    return handleOpenApiError(
      this.API.generatePdfAuswertungRaw(
        { generatePdfAuswertungRequest: {} as GeneratePdfAuswertungRequest },
        { body: data, headers: {} }
      ).then((response) => response.raw.blob()),
      "Beim Generieren der PDF ist ein Fehler aufgetreten."
    );
  }

  static postPdfCustomFetchReport(data: FormData): Promise<Blob> {
    return handleOpenApiError(
      this.API.generatePdfReportRaw(
        { generatePdfReportRequest: {} as GeneratePdfReportRequest },
        { body: data, headers: {} }
      ).then((response) => response.raw.blob()),
      "Beim Generieren der PDF ist ein Fehler aufgetreten."
    );
  }
}
