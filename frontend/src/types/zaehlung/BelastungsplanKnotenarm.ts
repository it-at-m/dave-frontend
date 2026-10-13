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
  // gerade Verkehrsbeziehung verbunden sind. Das ist immer dann ein Problem, wenn links und/oder
  // rechts von der geraden Verkehrsbeziehung eine ungleiche Anzahl an Verkehrsbeziehungen vorhanden
  // ist. Das muss dann auf der "NACH" Seite ausgegliechen werden.
  private _ausgleich = 0;

  // eingehende Verkehrsbeziehungstypen
  private _nachVerkehrsbeziehungsTypen: number[] = [];
  // ausgehende Verkehrsbeziehungstypen
  private _vonVerkehrsbeziehungsTypen: number[] = [];

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
   * Gibt die "nach" Position des Verkehrsbeziehungstypes in der (für diesen Knotenarm)
   * eingehenden Fahrtrichtung zurück.
   * @param verkehrsbeziehungsTyp
   */
  findVerkehrsbeziehungNachPosition(verkehrsbeziehungsTyp: number): number {
    const typen = this._nachVerkehrsbeziehungsTypen.sort() as number[];
    if (!typen.includes(verkehrsbeziehungsTyp)) {
      return -1;
    }
    return typen.indexOf(verkehrsbeziehungsTyp) + this.ausgleich;
  }

  /**
   * Gibt die Position des Verkehrsbeziehungstypes in der (für diesen Knotenarm)
   * ausgehenden Fahrtrichtung zurück.
   *
   * @param verkehrsbeziehungsTyp
   */
  findVerkehrsbeziehungVonPosition(verkehrsbeziehungsTyp: number): number {
    const typen = this._vonVerkehrsbeziehungsTypen.sort() as number[];
    if (!typen.includes(verkehrsbeziehungsTyp)) {
      return -1;
    }
    return typen.indexOf(verkehrsbeziehungsTyp);
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

  get vonVerkehrsbeziehungsTypen(): number[] {
    return this._vonVerkehrsbeziehungsTypen;
  }

  addVonVerkehrsbeziehungsType(value: number) {
    this._vonVerkehrsbeziehungsTypen.push(value);
  }

  get nachVerkehrsbeziehungsTypen(): number[] {
    return this._nachVerkehrsbeziehungsTypen;
  }

  addNachVerkehrsbeziehungsTyp(value: number) {
    this._nachVerkehrsbeziehungsTypen.push(value);
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

  // Anzahl der Verkehrsbeziehungen, die aus diesem Knotenarm heraus gehen
  private _anzahlVonVerkehrsbeziehungen = 0;
  // Anzahl der Verkehrsbeziehung, die in diesen Knotenarm hinein gehen
  private _anzahlNachVerkehrsbeziehungen = 0;

  /**
   * Die Anzahl der ausgehenden Verkehrsbeziehungen.
   */
  get anzahlVonVerkehrsbeziehungen(): number {
    return this._anzahlVonVerkehrsbeziehungen;
  }

  /**
   * Den Zähler für ausgehende Verkehrsbeziehungen um 1 erhöhen.
   */
  plusVerkehrsbeziehungenVon() {
    this._anzahlVonVerkehrsbeziehungen = this._anzahlVonVerkehrsbeziehungen + 1;
  }

  /**
   * Die Anzahl der eingehenden Verkehrsbeziehungen.
   */
  get anzahlNachVerkehrsbeziehungen(): number {
    return this._anzahlNachVerkehrsbeziehungen;
  }

  /**
   * Den Zähler für eingehende Verkehrsbeziehungen um 1 erhöhen.
   */
  plusVerkehrsbeziehungenNach() {
    this._anzahlNachVerkehrsbeziehungen =
      this._anzahlNachVerkehrsbeziehungen + 1;
  }

  get strasse(): string {
    return this._strasse;
  }
}
