import type { OptionsmenueSettingsDTO } from "@/api/client";

import { OptionsmenueSettingsControllerApi } from "@/api/client/apis";
import { Configuration } from "@/api/client/runtime";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import { handleOpenApiError } from "@/api/util/OpenApiErrorHandler";

export default class OptionsmenueSettingsService {
  private static readonly ENDPOINT = `${BaseUrlProvider.getBaseUrl()}/api/dave-backend-service`;
  private static readonly API = new OptionsmenueSettingsControllerApi(
    new Configuration({ basePath: this.ENDPOINT })
  );

  static getAllOptionsmenueSettingsForMessstellen(): Promise<
    Array<OptionsmenueSettingsDTO>
  > {
    return handleOpenApiError(
      this.API.getAllOptionsmenueSettingsForMessstellenRaw().then((response) =>
        response.raw.json()
      ),
      "Beim Holen der Einstellungen des Optionsmenüs ist ein Fehler aufgetreten."
    );
  }
}
