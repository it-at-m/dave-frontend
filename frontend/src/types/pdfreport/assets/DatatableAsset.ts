import type OptionsDTO from "@/types/zaehlung/OptionsDTO";

import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import BaseAsset from "@/types/pdfreport/assets/BaseAsset";

export default class DatatableAsset extends BaseAsset {
  options?: OptionsDTO;
  zaehlungId?: string;
  text?: string;

  constructor(options: OptionsDTO, zaehlungId: string, text: string) {
    super(AssetTypesEnum.DATATABLE);
    this.options = options;
    this.zaehlungId = zaehlungId;
    this.text = text;
  }
}
