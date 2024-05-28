import BaseAsset from "@/types/pdfreport/assets/BaseAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

export default class MessstelleDatatableAsset extends BaseAsset {
    options?: MessstelleOptionsDTO;
    mstId?: string;
    text?: string;

    constructor(options: MessstelleOptionsDTO, mstId: string, text: string) {
        super(AssetTypesEnum.DATATABLE_MESSSTELLE);
        this.options = options;
        this.mstId = mstId;
        this.text = text;
    }
}
