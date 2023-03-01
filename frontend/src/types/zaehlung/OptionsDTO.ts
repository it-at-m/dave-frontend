import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import Zaehldauer from "@/types/enum/Zaehldauer";

export default interface OptionsDTO {

  zaehldauer: Zaehldauer;
  intervall: ZaehldatenIntervall;
  zeitblock: string;
  zeitauswahl: string;
  kraftfahrzeugverkehr: boolean;
  schwerverkehr: boolean;
  gueterverkehr: boolean;
  radverkehr: boolean;
  fussverkehr: boolean;
  schwerverkehrsanteilProzent: boolean;
  gueterverkehrsanteilProzent: boolean;
  pkwEinheiten: boolean;
  personenkraftwagen: boolean;
  lastkraftwagen: boolean;
  lastzuege: boolean;
  busse: boolean;
  kraftraeder: boolean;
  stundensumme: boolean;
  blocksumme: boolean;
  tagessumme: boolean;
  spitzenstunde: boolean;
  spitzenstundeKfz: boolean;
  spitzenstundeRad: boolean;
  spitzenstundeFuss: boolean;
  mittelwert: boolean;
  fahrzeugklassenStapeln: boolean;
  beschriftung: boolean;
  datentabelle: boolean;
  werteHundertRunden: boolean;
  differenzdatenDarstellen: boolean;
  vergleichszaehlungsId: string | null;
  vonKnotenarm: number | null;
  vonIds: Array<number>;
  nachKnotenarm: number | null;
  nachIds: Array<number>;
  beideRichtungen: boolean;
  blackPrintMode: boolean;
  ganglinieYAchse1MaxValue: number | null;
  ganglinieYAchse2MaxValue: number | null;
  idVergleichszaehlungZeitreihe: string | null;
  zeitreiheGesamt: boolean;
}