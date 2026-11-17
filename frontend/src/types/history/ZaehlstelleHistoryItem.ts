import type Options from "@/types/zaehlung/Options";

import AbstractHistoryItem from "@/types/history/AbstractHistoryItem";

export default class ZaehlstelleHistoryItem extends AbstractHistoryItem {
  zaehlungId: string;
  zaehlungDatum: Date;
  zaehlungProjektName: string;
  zaehlstelleNr: string;
  zaehlstelleId: string;
  optionsEinstellungen?: Options;

  constructor(
    zaehlungId: string,
    zaehlungDatum: string,
    zaehlungProjektName: string,
    zaehlstelleNr: string,
    zaehlstellId: string,
    options?: Options
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
