import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import BaseAsset from "@/types/pdfreport/assets/BaseAsset";

export default class ZaehlungskenngroessenAsset extends BaseAsset {
  text?: string;
  zaehlungId?: string;

  constructor(text: string, zaehlungId: string) {
    super(AssetTypesEnum.ZAEHLUNGSKENNGROESSEN);
    this.text = text;
    this.zaehlungId = zaehlungId;
  }
}
