import type {
  FahrzeugOptionsDTO,
  Rounding,
  ZaehldatenIntervall, Zaehldauer,
} from "@/api/client";
import type LaengsverkehrDTO from "@/types/zaehlung/LaengsverkehrDTO";
import type QuerungsverkehrDTO from "@/types/zaehlung/QuerungsverkehrDTO";
import type VerkehrsbeziehungDTO from "@/types/zaehlung/VerkehrsbeziehungDTO";

export default class ZaehlstelleOptionsMapper {
  /**
   * Wandelt das Frontend-Objekt in das Backend-DTO um.
   * @param frontendData Das Frontend-Objekt
   * @returns Das Backend-DTO
   */
  static toBackend(frontendData: {
    zaehldauer: Zaehldauer;
    intervall: ZaehldatenIntervall;
    zeitblock: string; // Zeitblock
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
    chosenLaengsverkehre: Array<LaengsverkehrDTO>;
    chosenQuerungsverkehre: Array<QuerungsverkehrDTO>;
    chosenVerkehrsbeziehungen: Array<VerkehrsbeziehungDTO>;
  }): any {

    return {
      zaehldauer,
      intervall,
      zeitblock,
      zeitauswahl,
      kraftfahrzeugverkehr,
      schwerverkehr,
      gueterverkehr,
      radverkehr,
      fussverkehr,
      schwerverkehrsanteilProzent,
      gueterverkehrsanteilProzent,
      pkwEinheiten,
      personenkraftwagen,
      lastkraftwagen,
      lastzuege,
      busse,
      kraftraeder,
      stundensumme,
      blocksumme,
      tagessumme,
      spitzenstunde,
      spitzenstundeKfz,
      spitzenstundeRad,
      spitzenstundeFuss,
      mittelwert,
      fahrzeugklassenStapeln,
      beschriftung,
      datentabelle,
      rounding,
      differenzdatenDarstellen,
      zeitreiheGesamt,
      vergleichszaehlungsId,
      beideRichtungen,
      vonKnotenarm,
      nachKnotenarm,
      chosenVerkehrsbeziehungen,
      chosenLaengsverkehre,
      chosenQuerungsverkehre,
      idVergleichszaehlungZeitreihe,
    };
  }
}
