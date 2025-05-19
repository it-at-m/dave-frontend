import type OptionsmenueSettingsDTO from "@/types/common/OptionsmenueSettingsDTO";

import FetchService from "@/api/service/FetchService";

export default class OptionsmenueSettingsService {
  private static readonly ENDPOINT: string =
    "api/dave-backend-service/settings-optionsmenue/messstelle/all";

  static getAllOptionsmenueSettingsForMessstellen(): Promise<
    Array<OptionsmenueSettingsDTO>
  > {
    return FetchService.getData(
      this.ENDPOINT,
      "Beim Holen der Einstellungen des Optionsmenüs ist ein Fehler aufgetreten."
    );
  }
}
