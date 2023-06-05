import BaseAsset from "@/types/pdfreport/assets/BaseAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";

export default class HeadingAsset extends BaseAsset {
    text?: string;

    constructor(text: string, type: AssetTypesEnum) {
        super(type);
        this.text = text;
    }
}
