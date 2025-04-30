import { ApiError, Levels } from "@/api/error";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import FetchUtils from "@/api/util/FetchUtils";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default class FetchService {
  private static readonly RESPONSE_TYPE_OPAQUE_REDIRECT: string =
    "opaqueredirect";

  private static readonly BASE: string = BaseUrlProvider.getBaseUrl();

  static getData(endpoint: string, errorMessage: string): Promise<any> {
    const url = `${this.BASE}/${endpoint}`;
    const request = FetchUtils.getGETConfig();
    return FetchService.sendRequestForJson(url, request, errorMessage);
  }

  static postData(
    dataToSave: any,
    endpoint: string,
    errorMessage: string
  ): Promise<any> {
    const url = `${this.BASE}/${endpoint}`;
    const request = FetchUtils.getPOSTConfig(dataToSave);
    return FetchService.sendRequestForJson(url, request, errorMessage);
  }

  static postForPdf(
    dataToSave: any,
    endpoint: string,
    errorMessage: string
  ): Promise<Blob> {
    const url = `${this.BASE}/${endpoint}`;
    const request = FetchUtils.getPdfPOSTConfig(dataToSave);
    return FetchService.sendRequestForBlob(url, request, errorMessage);
  }

  static postForBlob(
    dataToSave: any,
    endpoint: string,
    errorMessage: string
  ): Promise<Blob> {
    const url = `${this.BASE}/${endpoint}`;
    const request = FetchUtils.getPOSTConfig(dataToSave);
    return FetchService.sendRequestForBlob(url, request, errorMessage);
  }

  static patchData(
    dataToSave: any,
    endpoint: string,
    errorMessage: string
  ): Promise<any> {
    const url = `${this.BASE}/${endpoint}`;
    const request = FetchUtils.getPATCHConfig(dataToSave);
    return FetchService.sendRequestForJson(url, request, errorMessage);
  }

  static putData(
    dataToSave: any,
    endpoint: string,
    errorMessage: string
  ): Promise<any> {
    const url = `${this.BASE}/${endpoint}`;
    const request = FetchUtils.getPUTConfig(dataToSave);
    return FetchService.sendRequestForJson(url, request, errorMessage);
  }

  private static sendRequestForJson(
    url: string,
    request: RequestInit,
    errorMessage: string
  ): Promise<any> {
    return this.sendRequest(url, request, errorMessage).then((response) => {
      return response.json();
    });
  }

  private static sendRequestForBlob(
    url: string,
    request: RequestInit,
    errorMessage: string
  ): Promise<Blob> {
    return this.sendRequest(url, request, errorMessage).then((response) => {
      return response.blob();
    });
  }

  private static sendRequest(
    url: string,
    request: RequestInit,
    errorMessage: string
  ): Promise<Response> {
    return fetch(url, request)
      .catch((error) => {
        throw new ApiError(
          Levels.ERROR,
          `Die Verbindung zum Service konnte nicht aufgebaut werden.`,
          error
        );
      })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            throw new ApiError(
              Levels.ERROR,
              errorMessage,
              `Fehlerhafte Anfrage an das Backend geschickt, HTTP: 400.`
            );
          } else if (response.status === 403) {
            throw new ApiError(
              Levels.ERROR,
              `Sie haben nicht die nötigen Rechte um diese Aktion durchzuführen.`
            );
          } else if (response.status === 409) {
            throw new ApiError(
              Levels.ERROR,
              errorMessage,
              `Eine Zählstelle mit der angegebenen Zählstellennummer und Zählart existiert bereits.`
            );
          } else if (response.status === 412) {
            location.reload();
            throw new ApiError(
              Levels.ERROR,
              `Die Daten wurden in der Zwischenzeit verändert. Die Seite wird neu geladen.`
            );
          } else if (
            response.type === FetchService.RESPONSE_TYPE_OPAQUE_REDIRECT
          ) {
            location.reload();
          }
          throw new ApiError(
            Levels.ERROR,
            errorMessage,
            `Fehler: ${response.status} ${response.statusText}`
          );
        }
        return response;
      });
  }
}
