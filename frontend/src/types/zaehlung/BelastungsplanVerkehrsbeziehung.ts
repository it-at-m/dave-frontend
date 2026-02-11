/**
 * In dieser Klasse befinden sich alle Informationen, um eine Verkehrsbeziehung
 * im Belastungsplan anzuzeigen.
 */
export default class BelastungsplanVerkehrsbeziehung {
  constructor(verkehrsbeziehungsTyp: number, nach: number) {
    this._verkehrsbeziehungsTyp = verkehrsbeziehungsTyp;
    this._nach = nach;
    this._total = 0;
  }

  private _verkehrsbeziehungsTyp!: number;
  private _nach!: number;

  // Zahlen
  private _value1 = 0;
  private _value2 = 0;
  private _value3 = 0;
  private _total!: number;

  set value1(value: number) {
    this._total = this._total + value;
    this._value1 = value;
  }

  get value1(): number {
    return this._value1;
  }

  set value2(value: number) {
    this._total = this._total + value;
    this._value2 = value;
  }

  get value2(): number {
    return this._value2;
  }

  set value3(value: number) {
    this._total = this._total + value;
    this._value3 = value;
  }

  get value3(): number {
    return this._value3;
  }

  get verkehrsbeziehungsTyp(): number {
    return this._verkehrsbeziehungsTyp;
  }

  get nach(): number {
    return this._nach;
  }

  get total(): number {
    return this._total;
  }
}
