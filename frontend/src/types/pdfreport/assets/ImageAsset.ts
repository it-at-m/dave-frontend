import BaseAsset from "@/types/pdfreport/assets/BaseAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";

export default class ImageAsset extends BaseAsset {
    caption?: string;
    image?: string;
    width?: number;

    constructor(caption: string, image: string) {
        super(AssetTypesEnum.IMAGE);
        this.caption = caption;
        this.image = image;
    }
}
