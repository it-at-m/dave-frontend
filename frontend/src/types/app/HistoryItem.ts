import OptionsDTO from "@/types/zaehlung/OptionsDTO";

export default class HistoryItem {
  zaehlungId: string
  zaehlungDatum: Date
  zaehlungProjektName: string
  zaehlstelleNr: string
  zaehlstelleId: string
  viewtime: Date
  optionsEinstellungen?: OptionsDTO

  constructor(zaehlungId: string, zaehlungDatum: Date, zaehlungProjektName: string, zaehlstelleNr: string, zaehlstellId: string) {
    this.zaehlungId = zaehlungId;
    this.zaehlungDatum = zaehlungDatum;
    this.zaehlungProjektName = zaehlungProjektName;
    this.zaehlstelleNr = zaehlstelleNr;
    this.zaehlstelleId = zaehlstellId;

    this.viewtime = new Date()
  }

}