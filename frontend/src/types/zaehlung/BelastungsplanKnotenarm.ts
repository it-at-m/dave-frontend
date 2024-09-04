/**
 * In dieser Klasse befinden sich alle Informationen zum Knotenarm.
 */
export default class BelastungsplanKnotenarm {
  constructor(strasse: string, knotenarmNummer: number) {
    this.cleanseStrasse(strasse);
    this._knotenarmNummer = knotenarmNummer;
  }

  private _knotenarmNummer: number;

  // Das sind die Ausgleichswerte für Knotenarme, die sich gegenüber liegen und durch eine
  // gerade Fahrbeziehung verbunden sind. Das ist immer dann ein Problem, wenn links und/oder
  // rechts von der geraden Fahrbeziehung eine ungleiche Anzahl an Fahrbeziehungen vorhanden
  // ist. Das muss dann auf der "NACH" Seite ausgegliechen werden.
  private _ausgleich = 0;

  // eingehende Fahrbeziehungstypen
  private _nachFahrbeziehungsTypen: number[] = [];
  // ausgehende Fahrbeziehungstypen
  private _vonFahrbeziehungsTypen: number[] = [];

  // Anzahl der Fahrzeuge nach Fahrtrichtung ("_vonTotal[Typ]" / "_nachTotal[Typ]") und
  // nach Knotenarm ("_total[Typ]").

  // Wert 1
  private _vonTotalValue1 = 0;
  private _nachTotalValue1 = 0;
  private _totalValue1 = 0;
  private _is1Filled = false;

  // Wert 2
  private _vonTotalValue2 = 0;
  private _nachTotalValue2 = 0;
  private _totalValue2 = 0;
  private _is2Filled = false;

  // Wert 3
  private _vonTotalValue3 = 0;
  private _nachTotalValue3 = 0;
  private _totalValue3 = 0;
  private _is3Filled = false;

  /**
   * Gibt die "nach" Position des Fahrbeziehungstypes in der (für diesen Knotenarm)
   * eingehenden Fahrtrichtung zurück.
   * @param fahrbeziehungsTyp
   */
  findFahrbeziehungsNachPosition(fahrbeziehungsTyp: number): number {
    const typen = this._nachFahrbeziehungsTypen.sort() as number[];
    if (!typen.includes(fahrbeziehungsTyp)) {
      return -1;
    }
    return typen.indexOf(fahrbeziehungsTyp) + this.ausgleich;
  }

  /**
   * Gibt die Position des Fahrbeziehungstypes in der (für diesen Knotenarm)
   * ausgehenden Fahrtrichtung zurück.
   *
   * @param fahrbeziehungsTyp
   */
  findFahrbeziehungVonPosition(fahrbeziehungsTyp: number): number {
    const typen = this._vonFahrbeziehungsTypen.sort() as number[];
    if (!typen.includes(fahrbeziehungsTyp)) {
      return -1;
    }
    return typen.indexOf(fahrbeziehungsTyp);
  }

  /**
   * Falls der Starßenname nicht abgekürzt ankommt,
   * dann wird er hier abgekürzt.
   *
   * @param strasse
   */
  cleanseStrasse(strasse: string) {
    if (strasse) {
      if (strasse.toLowerCase().includes("straße")) {
        strasse.replace("traße", "tr.");
      }

      if (strasse.toLowerCase().includes("platz")) {
        strasse.replace("latz", "l.");
      }
    }

    this._strasse = strasse;
  }

  get is1Filled(): boolean {
    return this._is1Filled;
  }

  set is1Filled(value: boolean) {
    this._is1Filled = value;
  }

  get is2Filled(): boolean {
    return this._is2Filled;
  }

  set is2Filled(value: boolean) {
    this._is2Filled = value;
  }

  get is3Filled(): boolean {
    return this._is3Filled;
  }

  set is3Filled(value: boolean) {
    this._is3Filled = value;
  }

  get knotenarmNummer(): number {
    return this._knotenarmNummer;
  }

  set knotenarmNummer(value: number) {
    this._knotenarmNummer = value;
  }

  get ausgleich(): number {
    return this._ausgleich;
  }

  set ausgleich(value: number) {
    this._ausgleich = value;
  }

  get vonFahrbeziehungsTypen(): number[] {
    return this._vonFahrbeziehungsTypen;
  }

  addVonFahrbeziehungsType(value: number) {
    this._vonFahrbeziehungsTypen.push(value);
  }

  get nachFahrbeziehungsTypen(): number[] {
    return this._nachFahrbeziehungsTypen;
  }

  addNachFahrbeziehungsTyp(value: number) {
    this._nachFahrbeziehungsTypen.push(value);
  }

  get vonTotalValue1(): number {
    return this._vonTotalValue1;
  }

  set vonTotalValue1(value: number) {
    this._vonTotalValue1 = value;
  }

  get nachTotalValue1(): number {
    return this._nachTotalValue1;
  }

  set nachTotalValue1(value: number) {
    this._nachTotalValue1 = value;
  }

  get totalValue1(): number {
    return this._totalValue1;
  }

  set totalValue1(value: number) {
    this._totalValue1 = value;
  }

  get vonTotalValue2(): number {
    return this._vonTotalValue2;
  }

  set vonTotalValue2(value: number) {
    this._vonTotalValue2 = value;
  }

  get nachTotalValue2(): number {
    return this._nachTotalValue2;
  }

  set nachTotalValue2(value: number) {
    this._nachTotalValue2 = value;
  }

  get totalValue2(): number {
    return this._totalValue2;
  }

  set totalValue2(value: number) {
    this._totalValue2 = value;
  }

  get vonTotalValue3(): number {
    return this._vonTotalValue3;
  }

  set vonTotalValue3(value: number) {
    this._vonTotalValue3 = value;
  }

  get nachTotalValue3(): number {
    return this._nachTotalValue3;
  }

  set nachTotalValue3(value: number) {
    this._nachTotalValue3 = value;
  }

  get totalValue3(): number {
    return this._totalValue3;
  }

  set totalValue3(value: number) {
    this._totalValue3 = value;
  }

  private _strasse!: string;

  // Anzahl der Fahrbeziehungen, die aus diesem Knotenarm heraus gehen
  private _anzahlVonFahrbeziehungen = 0;
  // Anzahl der Fahrbeziehungen, die in diesen Knotenarm hinein gehen
  private _anzahlNachFahrbeziehungen = 0;

  /**
   * Die Anzahl der ausgehenden Fahrbeziehungen.
   */
  get anzahlVonFahrbeziehungen(): number {
    return this._anzahlVonFahrbeziehungen;
  }

  /**
   * Den Zähler für ausgehende Fahrbeziehungen um 1 erhöhen.
   */
  plusFahrbeziehungenVon() {
    this._anzahlVonFahrbeziehungen = this._anzahlVonFahrbeziehungen + 1;
  }

  /**
   * Die Anzahl der eingehenden Fahrbeziehungen.
   */
  get anzahlNachFahrbeziehungen(): number {
    return this._anzahlNachFahrbeziehungen;
  }

  /**
   * Den Zähler für eingehende Fahrbeziehungen um 1 erhöhen.
   */
  plusFahrbeziehungenNach() {
    this._anzahlNachFahrbeziehungen = this._anzahlNachFahrbeziehungen + 1;
  }

  get strasse(): string {
    return this._strasse;
  }
}
