export default interface LadeZaehldatumDTO {
  type: string;
  startUhrzeit: string;
  endeUhrzeit: string;
  pkw: number;
  lkw: number;
  lastzuege: number;
  busse: number;
  kraftraeder: number;
  fahrradfahrer: number;
  fussgaenger: number;
  pkwEinheiten: number;
  gesamt: number;
  kfz: number;
  schwerverkehr: number;
  gueterverkehr: number;
  anteilSchwerverkehrAnKfzProzent: string;
  anteilGueterverkehrAnKfzProzent: string;
}
