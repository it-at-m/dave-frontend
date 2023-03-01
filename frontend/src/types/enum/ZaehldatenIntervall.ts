export enum ZaehldatenIntervall {

  STUNDE_VIERTEL = 'STUNDE_VIERTEL',
  STUNDE_HALB = 'STUNDE_HALB',
  STUNDE_KOMPLETT = 'STUNDE_KOMPLETT'

}

export const ZaehldatenIntervallToBeschreibung = new Map<string, string>([
  [ZaehldatenIntervall.STUNDE_VIERTEL, '15 Min'],
  [ZaehldatenIntervall.STUNDE_HALB, '30 Min'],
  [ZaehldatenIntervall.STUNDE_KOMPLETT, '60 Min'],
])

export const ZaehldatenIntervallToSelect = [
  {text: "15 Minuten", value: ZaehldatenIntervall.STUNDE_VIERTEL},
  {text: "30 Minuten", value: ZaehldatenIntervall.STUNDE_HALB},
  {text: "60 Minuten", value: ZaehldatenIntervall.STUNDE_KOMPLETT}
]


export const BeschreibungToZaehldatenIntervall = new Map([...ZaehldatenIntervallToBeschreibung].reverse());

export default ZaehldatenIntervall;