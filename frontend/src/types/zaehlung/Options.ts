import type { Rounding, ZaehldatenIntervall, Zeitblock } from "@/api/client";
import type LaengsverkehrDTO from "@/types/zaehlung/LaengsverkehrDTO";
import type QuerungsverkehrDTO from "@/types/zaehlung/QuerungsverkehrDTO";
import type VerkehrsbeziehungDTO from "@/types/zaehlung/VerkehrsbeziehungDTO";

import { Zaehldauer } from "@/api/client";

export default interface Options {
  zaehldauer: Zaehldauer;
  intervall: ZaehldatenIntervall;
  zeitblock: Zeitblock;
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
  rounding: Rounding;
  differenzdatenDarstellen: boolean;
  zeitreiheGesamt: boolean;
  vergleichszaehlungsId: string | null;
  beideRichtungen: boolean;
  vonKnotenarm: number | null;
  nachKnotenarm: number | null;
  chosenVerkehrsbeziehungen: Array<VerkehrsbeziehungDTO>;
  chosenLaengsverkehre: Array<LaengsverkehrDTO>;
  chosenQuerungsverkehre: Array<QuerungsverkehrDTO>;
  idVergleichszaehlungZeitreihe: string | null;

  vonIds: Array<number>;
  nachIds: Array<number>;
  blackPrintMode: boolean;
  ganglinieYAchse1MaxValue: number | null;
  ganglinieYAchse2MaxValue: number | null;
}
