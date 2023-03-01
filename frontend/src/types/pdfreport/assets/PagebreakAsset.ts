import BaseAsset from "@/types/pdfreport/assets/BaseAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";

export default class PagebreakAsset extends BaseAsset {

  constructor() {
    super(AssetTypesEnum.PAGEBREAK);
  }
}