import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import AbstractHistoryItem from "@/types/app/AbstractHistoryItem";

export default class ZaehlstelleHistoryItem extends AbstractHistoryItem {
    zaehlungId: string;
    zaehlungDatum: Date;
    zaehlungProjektName: string;
    zaehlstelleNr: string;
    zaehlstelleId: string;
    optionsEinstellungen?: OptionsDTO;

    constructor(
        zaehlungId: string,
        zaehlungDatum: string,
        zaehlungProjektName: string,
        zaehlstelleNr: string,
        zaehlstellId: string,
        options?: OptionsDTO
    ) {
        super(zaehlungId, "mdi-map-marker");
        this.zaehlungId = zaehlungId;
        if (!Date.parse(zaehlungDatum)) {
            this.zaehlungDatum = new Date();
        } else {
            this.zaehlungDatum = new Date(zaehlungDatum);
        }
        this.zaehlungProjektName = zaehlungProjektName;
        this.zaehlstelleNr = zaehlstelleNr;
        this.zaehlstelleId = zaehlstellId;
        if (options) {
            this.optionsEinstellungen = options;
        }
    }
}
