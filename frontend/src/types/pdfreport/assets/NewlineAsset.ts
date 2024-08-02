import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import BaseAsset from "@/types/pdfreport/assets/BaseAsset";

export default class NewlineAsset extends BaseAsset {
  constructor() {
    super(AssetTypesEnum.NEWLINE);
  }
}
