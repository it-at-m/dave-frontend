
import { Configuration } from "@/api/client/runtime";
import { LadeZaehldatenControllerApi } from "@/api/client/apis";
import type {LadeProcessedZaehldatenDTO, OptionsDTO} from "@/api/client";

export default class LadeZaehldatenService {
  private static readonly BASE_PATH = "/api/dave-backend-service";

  public static async ladeZaehldatenProcessed(
    zaehlungId: string,
    options: OptionsDTO
  ): Promise<LadeProcessedZaehldatenDTO> {
    const config = new Configuration({ basePath: this.BASE_PATH });
    const api = new LadeZaehldatenControllerApi(config);

    return api.ladeZaehldatenProcessed({ zaehlungId, optionsDTO: options });
  }
}
