
import FetchService from "@/api/service/FetchService";

export default class ZaehlstellenImageService {
  private static readonly ENDPOINT: string =
    "api/dave-backend-service/zaehlstelleimage";

  static getByZaehlstelleId(id: string): Promise<string> {
    return FetchService.getData(
      `${this.ENDPOINT}/${id}`,
      "Beim holen des Bildes der Zählstelle ist ein Fehler aufgetreten."
    );
  }

  static getByZaehlstelleIdAsFile(id: string): Promise<Blob> {
    return FetchService.getForBlob(
      `${this.ENDPOINT}/as-file/${id}`,
      "Beim Holen des Bildes der Zählstelle als Datei ist ein Fehler aufgetreten."
    );
  }

}