import type {
  GenerateMessstellePdfRequest,
  GeneratePdfAuswertungRequest,
  GeneratePdfReportRequest,
  GenerateZaehlungPdfRequest,
} from "@/api/client";

import { GeneratePdfControllerApi } from "@/api/client/apis";
import createBackendApiConfiguration from "@/api/util/BackendApiConfiguration";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

function getRequiredFormDataString(data: FormData, key: string): string {
  const value = data.get(key);
  if (typeof value !== "string") {
    throw new Error(`PDF-Requestfeld "${key}" fehlt.`);
  }
  return value;
}

async function getRequiredFormDataJson<T>(
  data: FormData,
  key: string
): Promise<T> {
  const value = data.get(key);
  if (!(value instanceof Blob)) {
    throw new Error(`PDF-Requestfeld "${key}" fehlt oder ist kein JSON-Blob.`);
  }
  return JSON.parse(await value.text()) as T;
}

async function getOptionalFormDataText(
  data: FormData,
  key: string
): Promise<string | undefined> {
  const value = data.get(key);
  if (value == null) {
    return undefined;
  }
  return typeof value === "string" ? value : value.text();
}

export default class GeneratePdfService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new GeneratePdfControllerApi(
    createBackendApiConfiguration(this.ENDPOINT)
  );

  static postPdfCustomFetchTemplateZaehlung(
    charttype: string,
    zaehlungId: string,
    data: FormData
  ): Promise<Blob> {
    return handleOpenApiError(
      (async () => {
        const generateZaehlungPdfRequest: GenerateZaehlungPdfRequest = {
          fachId: zaehlungId,
          charttype,
          department: getRequiredFormDataString(data, "department"),
          options: await getRequiredFormDataJson<
            GenerateZaehlungPdfRequest["options"]
          >(data, "options"),
          chartAsBase64Png: await getOptionalFormDataText(
            data,
            "chartAsBase64Png"
          ),
          schematischeUebersichtAsBase64Png: await getOptionalFormDataText(
            data,
            "schematischeUebersichtAsBase64Png"
          ),
        };
        const response = await this.API.generateZaehlungPdfRaw(
          generateZaehlungPdfRequest,
          { body: data, headers: {} }
        );
        return response.raw.blob();
      })(),
      "Beim Generieren des PDF ist ein Fehler aufgetreten."
    );
  }

  static postPdfCustomFetchTemplateMessstelle(
    charttype: string,
    messstelleId: string,
    data: FormData
  ): Promise<Blob> {
    return handleOpenApiError(
      (async () => {
        const generateMessstellePdfRequest: GenerateMessstellePdfRequest = {
          fachId: messstelleId,
          charttype,
          department: getRequiredFormDataString(data, "department"),
          options: await getRequiredFormDataJson<
            GenerateMessstellePdfRequest["options"]
          >(data, "options"),
          messswerte: await getRequiredFormDataJson<
            GenerateMessstellePdfRequest["messswerte"]
          >(data, "messswerte"),
          chartAsBase64Png: await getOptionalFormDataText(
            data,
            "chartAsBase64Png"
          ),
          schematischeUebersichtAsBase64Png: await getOptionalFormDataText(
            data,
            "schematischeUebersichtAsBase64Png"
          ),
        };
        const response = await this.API.generateMessstellePdfRaw(
          generateMessstellePdfRequest,
          { body: data, headers: {} }
        );
        return response.raw.blob();
      })(),
      "Beim Generieren des PDF ist ein Fehler aufgetreten."
    );
  }
  static postPdfCustomFetchTemplateGesamtauswertung(
    data: FormData
  ): Promise<Blob> {
    return handleOpenApiError(
      (async () => {
        const generatePdfAuswertungRequest: GeneratePdfAuswertungRequest = {
          department: getRequiredFormDataString(data, "department"),
          options: await getRequiredFormDataJson<
            GeneratePdfAuswertungRequest["options"]
          >(data, "options"),
          auswertung: await getRequiredFormDataJson<
            GeneratePdfAuswertungRequest["auswertung"]
          >(data, "auswertung"),
          chartAsBase64Png: await getOptionalFormDataText(
            data,
            "chartAsBase64Png"
          ),
        };
        const response = await this.API.generatePdfAuswertungRaw(
          generatePdfAuswertungRequest,
          { body: data, headers: {} }
        );
        return response.raw.blob();
      })(),
      "Beim Generieren des PDF ist ein Fehler aufgetreten."
    );
  }

  static postPdfCustomFetchReport(data: FormData): Promise<Blob> {
    return handleOpenApiError(
      (async () => {
        const generatePdfReportRequest: GeneratePdfReportRequest = {
          department: getRequiredFormDataString(data, "department"),
          assets: await getRequiredFormDataJson<
            GeneratePdfReportRequest["assets"]
          >(data, "assets"),
        };

        const response = await this.API.generatePdfReportRaw(
          generatePdfReportRequest,
          { body: data, headers: {} }
        );
        return response.raw.blob();
      })(),
      "Beim Generieren des PDF ist ein Fehler aufgetreten."
    );
  }
}
