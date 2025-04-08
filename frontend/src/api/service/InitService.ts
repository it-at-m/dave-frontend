import FetchService from "@/api/service/FetchService";
import type InitDTO from "@/types/init/InitDTO";

export default class InitService {
  private static readonly ENDPOINT: string =
      "api/dave-backend-service/init";

  static getInit(): Promise<InitDTO> {
    return FetchService.getData(
        `${this.ENDPOINT}`,
        "Beim Laden des Init ist ein Fehler aufgetreten."
    );
  }
}
