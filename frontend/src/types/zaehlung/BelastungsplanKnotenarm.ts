/**
 * In dieser Klasse befinden sich alle Informationen zum Knotenarm.
 */
export default class BelastungsplanKnotenarm {


  constructor(strasse: string, knotenarmNummer: number) {
    this.cleanseStrasse(strasse)
    this._knotenarmNummer = knotenarmNummer
  }

  private _knotenarmNummer: number

  // Das sind die Ausgleichswerte für Knotenarme, die sich gegenüber liegen und durch eine
  // gerade Fahrbeziehung verbunden sind. Das ist immer dann ein Problem, wenn links und/oder
  // rechts von der geraden Fahrbeziehung eine ungleiche Anzahl an Fahrbeziehungen vorhanden
  // ist. Das muss dann auf der "NACH" Seite ausgegliechen werden.
  private _ausgleich = 0

  // eingehende Fahrbeziehungstypen
  private _nachFahrbeziehungsTypen: number[] = new Array()
  // ausgehende Fahrbeziehungstypen
  private _vonFahrbeziehungsTypen: number[] = new Array()

  // Anzahl der Fahrzeuge nach Fahrtrichtung ("_vonTotal[Typ]" / "_nachTotal[Typ]") und
  // nach Knotenarm ("_total[Typ]").

  // Wert 1
  private _vonTotalValue1: number = 0
  private _nachTotalValue1: number = 0
  private _totalValue1: number = 0
  private _is1Filled: boolean = false

  // Wert 2
  private _vonTotalValue2: number = 0
  private _nachTotalValue2: number = 0
  private _totalValue2: number = 0
  private _is2Filled: boolean = false

  // Wert 3
  private _vonTotalValue3: number = 0
  private _nachTotalValue3: number = 0
  private _totalValue3: number = 0
  private _is3Filled: boolean = false

  /**
   * Gibt die "nach" Position des Fahrbeziehungstypes in der (für diesen Knotenarm)
   * eingehenden Fahrtrichtung zurück.
   * @param fahrbeziehungsTyp
   */
  findFahrbeziehungsNachPosition(fahrbeziehungsTyp: number): number {
    let typen = this._nachFahrbeziehungsTypen.sort() as number[]
    if (!typen.includes(fahrbeziehungsTyp)) {
      console.warn(`Für den Typ ${fahrbeziehungsTyp} konnte in den "Nach" Beziehungen im Knotenerm ${this._strasse} kein Eintrag gefunden werden: `, typen)
      return -1
    }
    return typen.indexOf(fahrbeziehungsTyp) + this.ausgleich
  }

  /**
   * Gibt die Position des Fahrbeziehungstypes in der (für diesen Knotenarm)
   * ausgehenden Fahrtrichtung zurück.
   *
   * @param fahrbeziehungsTyp
   */
  findFahrbeziehungVonPosition(fahrbeziehungsTyp: number): number {
    let typen = this._vonFahrbeziehungsTypen.sort() as number[]
    if (!typen.includes(fahrbeziehungsTyp)) {
      console.warn(`Für den Typ ${fahrbeziehungsTyp} konnte in den "Von" Beziehungen im Knotenerm ${this._strasse} kein Eintrag gefunden werden: `, typen)
      return -1
    }
    return typen.indexOf(fahrbeziehungsTyp)
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
        strasse.replace("traße", "tr.")
      }

      if (strasse.toLowerCase().includes("platz")) {
        strasse.replace("latz", "l.")
      }
    }

    this._strasse = strasse
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
    this._vonFahrbeziehungsTypen.push(value)
  }

  get nachFahrbeziehungsTypen(): number[] {
    return this._nachFahrbeziehungsTypen;
  }

  addNachFahrbeziehungsTyp(value: number) {
    this._nachFahrbeziehungsTypen.push(value);
  }

  set vonTotalValue1(value: number) {
    this._vonTotalValue1 = value;
  }

  set nachTotalValue1(value: number) {
    this._nachTotalValue1 = value;
  }

  set totalValue1(value: number) {
    this._totalValue1 = value;
  }

  set vonTotalValue2(value: number) {
    this._vonTotalValue2 = value;
  }

  set nachTotalValue2(value: number) {
    this._nachTotalValue2 = value;
  }

  set totalValue2(value: number) {
    this._totalValue2 = value;
  }

  set vonTotalValue3(value: number) {
    this._vonTotalValue3 = value;
  }

  set nachTotalValue3(value: number) {
    this._nachTotalValue3 = value;
  }

  set totalValue3(value: number) {
    this._totalValue3 = value;
  }

  get vonTotalValue1(): number {
    return this._vonTotalValue1;
  }

  get nachTotalValue1(): number {
    return this._nachTotalValue1;
  }

  get totalValue1(): number {
    return this._totalValue1;
  }

  get vonTotalValue2(): number {
    return this._vonTotalValue2;
  }

  get nachTotalValue2(): number {
    return this._nachTotalValue2;
  }

  get totalValue2(): number {
    return this._totalValue2;
  }

  get vonTotalValue3(): number {
    return this._vonTotalValue3;
  }

  get nachTotalValue3(): number {
    return this._nachTotalValue3;
  }

  get totalValue3(): number {
    return this._totalValue3;
  }

  private _strasse!: string

  // Anzahl der Fahrbeziehungen, die aus diesem Knotenarm heraus gehen
  private _anzahlVonFahrbeziehungen: number = 0
  // Anzahl der Fahrbeziehungen, die in diesen Knotenarm hinein gehen
  private _anzahlNachFahrbeziehungen: number = 0

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