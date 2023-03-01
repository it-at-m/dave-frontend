import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";

export default class BaseAsset {
  type: AssetTypesEnum
  id: number

  constructor(type: AssetTypesEnum) {
    this.type = type;
    this.id = Date.now() * Math.random()
  }
}