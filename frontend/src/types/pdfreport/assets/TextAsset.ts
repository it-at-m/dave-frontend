import BaseAsset from "@/types/pdfreport/assets/BaseAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";

export default class TextAsset extends BaseAsset {
    text?: string;
    size?: string;

    constructor(text: string, size?: string) {
        super(AssetTypesEnum.TEXT);
        this.text = text;
        if (size) {
            this.size = size;
        } else {
            this.size = "medium";
        }
    }
}
