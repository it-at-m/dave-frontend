import BaseAsset from "@/types/pdfreport/assets/BaseAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

export default class MessstelleDatatableAsset extends BaseAsset {
    options?: MessstelleOptionsDTO;
    messstelleId?: string;
    text?: string;

    constructor(
        options: MessstelleOptionsDTO,
        messstelleId: string,
        text: string
    ) {
        super(AssetTypesEnum.DATATABLE);
        this.options = options;
        this.messstelleId = messstelleId;
        this.text = text;
    }
}
