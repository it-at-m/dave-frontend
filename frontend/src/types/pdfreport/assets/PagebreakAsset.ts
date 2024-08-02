import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import BaseAsset from "@/types/pdfreport/assets/BaseAsset";

export default class PagebreakAsset extends BaseAsset {
  constructor() {
    super(AssetTypesEnum.PAGEBREAK);
  }
}
