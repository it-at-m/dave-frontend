import type InfoMessageDTO from "@/types/app/InfoMessageDTO";
import type TooltipZaehlstelleDTO from "@/types/karte/TooltipZaehlstelleDTO";
import type ZaehlstelleKarteDTO from "@/types/karte/ZaehlstelleKarteDTO";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import type BelastungsplanMessquerschnitteDTO from "@/types/messstelle/BelastungsplanMessquerschnitteDTO";
import type FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";
import type MessfaehigkeitDTO from "@/types/messstelle/MessfaehigkeitDTO";
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import type SearchAndFilterOptionsDTO from "@/types/suche/SearchAndFilterOptionsDTO";
import type ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import type FahrbeziehungenDTO from "@/types/zaehlung/FahrbeziehungenDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import type { StartEndeUhrzeitIntervalls } from "@/types/zaehlung/StartEndeUhrzeitIntervalls";
import type LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import type ZeitauswahlDTO from "@/types/zaehlung/ZeitauswahlDTO";

import StartAndEndDate from "@/types/common/StartAndEndDate";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";
import Quelle from "@/types/enum/Quelle";
import TagesTyp from "@/types/enum/TagesTyp";
import Wetter from "@/types/enum/Wetter";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock from "@/types/enum/Zeitblock";
import Suggest from "@/types/suche/Suggest";
import type MapConfigDTO from "@/types/init/MapConfigDTO";
import type MapOptions from "@/types/karte/MapOptions";

export default class DefaultObjectCreator {
  public static createDefaultZaehlstelleKarte(): ZaehlstelleKarteDTO {
    return {
      fachId: "",
      type: "",
      id: "",
      letzteZaehlungId: "",
      tooltip: {} as TooltipZaehlstelleDTO,
      latitude: 0,
      longitude: 0,
      zaehlartenKarte: [],
      sichtbarDatenportal: true,
    };
  }

  public static createDefaultSuggestion(): Suggest {
    return {
      text: "",
      type: "",
      zaehlstelleId: "",
      zaehlungId: "",
      mstId: "",
      props: {},
    };
  }

  public static createDefaultStartEndeUhrzeitIntervalls(): StartEndeUhrzeitIntervalls {
    return {
      startUhrzeitIntervalls: "",
      endeUhrzeitIntervalls: "",
    };
  }

  public static createDefaultMessstelleInfoDTO(): MessstelleInfoDTO {
    return {
      messfaehigkeiten: [],
      detektierteVerkehrsarten: DetektierteFahrzeugart.KFZ,
      fahrzeugKlassen: "",
      hersteller: "",
      id: "",
      entityVersion: 0,
      createdTime: "",
      mstId: "",
      name: "",
      stadtbezirkNummer: 0,
      stadtbezirk: "",
      standort: "",
      latitude: "",
      longitude: "",
      kommentar: "",
      sichtbarDatenportal: true,
      messquerschnitte: [],
      datumLetztePlausibleMessung: "",
      abbaudatum: "",
      realisierungsdatum: "",
      lageplanVorhanden: false,
    };
  }

  public static createDefaultFahrzeugOptions(): FahrzeugOptions {
    return {
      kraftfahrzeugverkehr: false,
      schwerverkehr: false,
      gueterverkehr: false,
      schwerverkehrsanteilProzent: false,
      gueterverkehrsanteilProzent: false,
      radverkehr: false,
      fussverkehr: false,
      lastkraftwagen: false,
      lastzuege: false,
      busse: false,
      kraftraeder: false,
      personenkraftwagen: false,
      lieferwagen: false,
    } as FahrzeugOptions;
  }

  public static createDefaultMessstelleOptions(): MessstelleOptionsDTO {
    return {
      blackPrintMode: false,
      blocksumme: true,
      ganglinieYAchse1MaxValue: null,
      ganglinieYAchse2MaxValue: null,
      spitzenstunde: true,
      stundensumme: true,
      tagessumme: true,
      werteHundertRunden: false,
      fahrzeuge: this.createDefaultFahrzeugOptions(),
      intervall: "" as ZaehldatenIntervall,
      messquerschnittIds: [],
      tagesTyp: TagesTyp.UNSPECIFIED,
      zeitauswahl: "",
      zeitblock: "",
      zeitraumStartAndEndDate: new StartAndEndDate(undefined, undefined),
      zeitraum: [],
    };
  }

  public static createDefaultMessstelleAuswertungOptions(): MessstelleAuswertungOptionsDTO {
    return {
      jahre: [],
      tagesTyp: "" as TagesTyp,
      zeitraumCategorie: "",
      zeitraum: [],
      messstelleAuswertungIds: [],
      fahrzeuge: {
        kraftfahrzeugverkehr: false,
        schwerverkehr: false,
        gueterverkehr: false,
        schwerverkehrsanteilProzent: false,
        gueterverkehrsanteilProzent: false,
        radverkehr: false,
        fussverkehr: false,
        lastkraftwagen: false,
        lastzuege: false,
        busse: false,
        kraftraeder: false,
        personenkraftwagen: false,
        lieferwagen: false,
      } as FahrzeugOptions,
      verfuegbareVerkehrsarten: [],
    };
  }

  public static createDefaultZaehlstelleHeaderDTO(): ZaehlstelleHeaderDTO {
    return {
      id: "",
      entityVersion: 0,
      createdTime: "",
      nummer: "",
      name: "",
      stadtbezirk: "",
      stadtbezirkNummer: "",
      lat: "",
      lng: "",
      zaehlungen: [] as Array<LadeZaehlungDTO>,
      kommentar: "",
    };
  }

  public static createDefaultInfoMessageDto(): InfoMessageDTO {
    return {
      content: "",
      gueltig: false,
      id: "",
      entityVersion: 0,
      createdTime: "",
    };
  }

  public static createDefaultLadeZaehlungDto(): LadeZaehlungDTO {
    return {
      datum: "",
      jahr: "",
      monat: "",
      jahreszeit: "",
      zaehlart: "",
      lat: "",
      lng: "",
      tagesTyp: "",
      projektNummer: "",
      projektName: "",
      kreuzungsname: "",
      sonderzaehlung: false,
      kreisverkehr: false,
      zaehlsituation: "",
      zaehlsituationErweitert: "",
      zaehlIntervall: "",
      wetter: Wetter.NO_INFORMATION,
      zaehldauer: Zaehldauer.SONSTIGE,
      quelle: Quelle.MANUALLY,
      schulZeiten: "",
      kommentar: "",
      knotenarme: [],
      fahrbeziehungen: [],
      auswaehlbareFahrbeziehungen: {} as FahrbeziehungenDTO,
      zeitauswahl: {} as ZeitauswahlDTO,
      kategorien: [],
      pkwEinheit: [],
      id: "",
      entityVersion: 0,
      createdTime: "",
    };
  }

  public static createDefaultZaehlstelleOptionsDto(): OptionsDTO {
    return {
      beideRichtungen: false,
      vergleichszaehlungsId: null,
      zaehldauer: Zaehldauer.DAUER_24_STUNDEN,
      intervall: ZaehldatenIntervall.STUNDE_VIERTEL,
      zeitblock: Zeitblock.ZB_00_24,
      zeitauswahl: Zeitauswahl.TAGESWERT,
      kraftfahrzeugverkehr: false,
      schwerverkehr: false,
      gueterverkehr: false,
      schwerverkehrsanteilProzent: false,
      gueterverkehrsanteilProzent: false,
      radverkehr: false,
      fussverkehr: false,
      lastkraftwagen: false,
      lastzuege: false,
      busse: false,
      kraftraeder: false,
      personenkraftwagen: false,
      pkwEinheiten: false,
      stundensumme: true,
      blocksumme: true,
      tagessumme: true,
      spitzenstunde: true,
      spitzenstundeKfz: true,
      spitzenstundeRad: false,
      spitzenstundeFuss: false,
      mittelwert: false,
      beschriftung: false,
      datentabelle: false,
      fahrzeugklassenStapeln: false,
      werteHundertRunden: false,
      differenzdatenDarstellen: false,
      vonKnotenarm: null,
      // Setzen aller möglichen Knotenarme als Defaultwert da "vonKnotenarm" gleich "null"
      vonIds: [1, 2, 3, 4, 5, 6, 7, 8],
      nachKnotenarm: null,
      // Setzen aller möglichen Knotenarme als Defaultwert da "nachKnotenarm" gleich "null"
      nachIds: [1, 2, 3, 4, 5, 6, 7, 8],
      blackPrintMode: false,
      ganglinieYAchse1MaxValue: null,
      ganglinieYAchse2MaxValue: null,
      idVergleichszaehlungZeitreihe: null,
      zeitreiheGesamt: false,
    };
  }

  public static createDefaultMessfaehigkeitDTO(): MessfaehigkeitDTO {
    return {
      fahrzeugklassen: Fahrzeugklasse.ACHT_PLUS_EINS,
      gueltigAb: "",
      gueltigBis: "",
      intervall: ZaehldatenIntervall.STUNDE_VIERTEL_EINGESCHRAENKT,
    } as MessfaehigkeitDTO;
  }

  public static createDefaultBelastungsplanMessquerschnitteDTO(): BelastungsplanMessquerschnitteDTO {
    return {
      ladeBelastungsplanMessquerschnittDataDTOList: [],
      strassenname: "",
      stadtbezirkNummer: "",
      mstId: "",
      totalKfz: 0,
      totalSv: 0,
      totalGv: 0,
      totalRad: 0,
      totalPercentSv: 0,
      totalPercentGv: 0,
    } as BelastungsplanMessquerschnitteDTO;
  }

  public static createDefaultLadeZaehldatenSteplineDTO(): LadeZaehldatenSteplineDTO {
    return {
      legend: [],
      rangeMax: 0,
      rangeMaxPercent: 0,
      xaxisDataFirstChart: [],
      xaxisDataSecondChart: null,
      seriesEntriesFirstChart: [],
      seriesEntriesSecondChart: null,
    } as LadeZaehldatenSteplineDTO;
  }

  public static createDefaultLadeZaehldatenHeatmapDTO(): LadeZaehldatenHeatmapDTO {
    return {
      legend: [],
      rangeMin: 0,
      rangeMax: 0,
      xaxisDataFirstChart: [],
      seriesEntriesFirstChart: [],
      xaxisDataSecondChart: null,
      seriesEntriesSecondChart: null,
    } as LadeZaehldatenHeatmapDTO;
  }

  public static createDefaultSearchAndFilterOptionsDTO(): SearchAndFilterOptionsDTO {
    return {
      searchInMessstellen: true,
      searchInZaehlstellen: true,
    } as SearchAndFilterOptionsDTO;
  }

    // public static createMapOptions(): MapOptions {
    //   return {
    //     latitude: "48.137227",
    //     longitude: "11.575517",
    //     zoom: 8
    //   }
    // }
  public static createMapConfig(): MapConfigDTO {
    return {
      lat: "48.137227",
      lng: "11.575517",
      zoom: 8
    }
  }
}
