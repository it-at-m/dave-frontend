import type {
  BelastungsplanMessquerschnitteDTO,
  LadeMesswerteListenausgabeDTO,
  LadeProcessedMesswerteDTO,
  MapConfigurationDTO,
  TenantConfigurationDTO,
  ZaehlstelleConfigurationDTO,
} from "@/api/client";
import type { ConfigurationDTO } from "@/api/client/models/ConfigurationDTO";
import type { FahrzeugOptionsDTO } from "@/api/client/models/FahrzeugOptionsDTO";
import type { InfoMessageDTO } from "@/api/client/models/InfoMessageDTO";
import type { LadeZaehldatenHeatmapDTO } from "@/api/client/models/LadeZaehldatenHeatmapDTO";
import type { LadeZaehldatenSteplineDTO } from "@/api/client/models/LadeZaehldatenSteplineDTO";
import type { LadeZaehldatenTableDTO } from "@/api/client/models/LadeZaehldatenTableDTO";
import type { LeseZaehlstelleDTO } from "@/api/client/models/LeseZaehlstelleDTO";
import type { LeseZaehlungDTO } from "@/api/client/models/LeseZaehlungDTO";
import type { SearchAndFilterOptionsDTO } from "@/api/client/models/SearchAndFilterOptionsDTO";
import type { ZaehlstelleKarteDTO } from "@/api/client/models/ZaehlstelleKarteDTO";
import type { ZaehlstelleTooltipDTO } from "@/api/client/models/ZaehlstelleTooltipDTO";
import type { ZeitauswahlDTO } from "@/api/client/models/ZeitauswahlDTO";
import type MessstelleAuswertungOptions from "@/types/messstelle/auswertung/MessstelleAuswertungOptions";
import type Messfaehigkeit from "@/types/messstelle/Messfaehigkeit";
import type MessstelleInfoType from "@/types/messstelle/MessstelleInfoType";
import type MessstelleOptions from "@/types/messstelle/MessstelleOptions";
import type LadeZaehlung from "@/types/zaehlung/LadeZaehlung";
import type Options from "@/types/zaehlung/Options";
import type { StartEndeUhrzeitIntervalls } from "@/types/zaehlung/StartEndeUhrzeitIntervalls";
import type Verkehrsbeziehungen from "@/types/zaehlung/Verkehrsbeziehungen";

import { Fahrzeugklasse, ZaehldatenIntervall, Zaehldauer } from "@/api/client";
import { Rounding } from "@/api/client/models/Rounding";
import { TagesTyp } from "@/api/client/models/TagesTyp";
import { Verkehrsart } from "@/api/client/models/Verkehrsart";
import { Zeitblock } from "@/api/client/models/Zeitblock";
import StartAndEndDate from "@/types/common/StartAndEndDate";
import Quelle from "@/types/enum/Quelle";
import Wetter from "@/types/enum/Wetter";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Suggest from "@/types/suche/Suggest";

export default class DefaultObjectCreator {
  public static createDefaultZaehlstelleKarte(): ZaehlstelleKarteDTO {
    return {
      fachId: "",
      type: "",
      id: "",
      letzteZaehlungId: "",
      tooltip: {} as ZaehlstelleTooltipDTO,
      latitude: 0,
      longitude: 0,
      zaehlartenKarte: new Set(),
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

  public static createDefaultMessstelleInfoDTO(): MessstelleInfoType {
    return {
      messfaehigkeiten: [],
      detektierteVerkehrsart: Verkehrsart.Kfz,
      fahrzeugklasse: "",
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

  public static createDefaultFahrzeugOptions(): FahrzeugOptionsDTO {
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
    } as FahrzeugOptionsDTO;
  }

  public static createDefaultMessstelleOptions(): MessstelleOptions {
    return {
      blackPrintMode: false,
      blocksumme: true,
      ganglinieYAchse1MaxValue: null,
      ganglinieYAchse2MaxValue: null,
      spitzenstunde: true,
      stundensumme: true,
      tagessumme: true,
      rounding: Rounding.None,
      fahrzeuge: this.createDefaultFahrzeugOptions(),
      intervall: "" as ZaehldatenIntervall,
      messquerschnittIds: [],
      tagesTyp: TagesTyp.Unspecified,
      zeitauswahl: "",
      zeitblock: "",
      zeitraumStartAndEndDate: new StartAndEndDate(undefined, undefined),
      zeitraum: [],
    };
  }

  public static createDefaultMessstelleAuswertungOptions(): MessstelleAuswertungOptions {
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
      } as FahrzeugOptionsDTO,
      verfuegbareVerkehrsarten: [],
    };
  }

  public static createDefaultZaehlstelleHeaderDTO(): LeseZaehlstelleDTO {
    return {
      id: "",
      nummer: "",
      name: "",
      stadtbezirk: "",
      stadtbezirkNummer: 0,
      lat: 0,
      lng: 0,
      zaehlungen: [] as Array<LeseZaehlungDTO>,
      kommentar: "",
    };
  }

  public static createDefaultInfoMessageDto(): InfoMessageDTO {
    return {
      content: "",
      gueltig: false,
      id: "",
      gueltigVon: new Date(),
      gueltigBis: new Date(),
    };
  }

  public static createDefaultLadeZaehlungDto(): LadeZaehlung {
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
      zaehldauer: Zaehldauer.Sonstige,
      quelle: Quelle.MANUALLY,
      schulZeiten: "",
      kommentar: "",
      knotenarme: [],
      verkehrsbeziehungen: [],
      auswaehlbareVerkehrsbeziehungen: {} as Verkehrsbeziehungen,
      zeitauswahl: {} as ZeitauswahlDTO,
      kategorien: [],
      pkwEinheit: [],
      id: "",
      entityVersion: 0,
      createdTime: "",
      laengsverkehr: [],
      querungsverkehr: [],
    };
  }

  public static createDefaultZaehlstelleOptionsDto(): Options {
    return {
      beideRichtungen: false,
      vergleichszaehlungsId: null,
      zaehldauer: Zaehldauer.Dauer24Stunden,
      intervall: ZaehldatenIntervall.StundeViertel,
      zeitblock: Zeitblock.Zb0024,
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
      rounding: Rounding.None,
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
      chosenLaengsverkehre: [],
      chosenQuerungsverkehre: [],
      chosenVerkehrsbeziehungen: [],
    };
  }

  public static createDefaultMessfaehigkeitDTO(): Messfaehigkeit {
    return {
      fahrzeugklasse: Fahrzeugklasse.AchtPlusEins,
      gueltigAb: "",
      gueltigBis: "",
      intervall: ZaehldatenIntervall.StundeViertelEingeschraenkt,
    } as Messfaehigkeit;
  }

  public static createDefaultBelastungsplanMessquerschnitteDTO(): BelastungsplanMessquerschnitteDTO {
    return {
      ladeBelastungsplanMessquerschnittDataDTOList: [],
      strassenname: "",
      stadtbezirkNummer: 0,
      mstId: "",
      totalKfz: 0,
      totalSv: 0,
      totalGv: 0,
      totalRad: 0,
      totalPercentSv: 0,
      totalPercentGv: 0,
      startUhrzeitSpitzenstunde: "",
      endeUhrzeitSpitzenstunde: "",
    } as BelastungsplanMessquerschnitteDTO;
  }

  public static createDefaultLadeZaehldatenSteplineDTO(): LadeZaehldatenSteplineDTO {
    return {
      legend: [],
      rangeMax: 0,
      rangeMaxPercent: 0,
      xaxisDataFirstChart: [],
      seriesEntriesFirstChart: [],
    } as LadeZaehldatenSteplineDTO;
  }

  public static createDefaultLadeZaehldatenHeatmapDTO(): LadeZaehldatenHeatmapDTO {
    return {
      legend: [],
      rangeMin: 0,
      rangeMax: 0,
      xaxisDataFirstChart: [],
      seriesEntriesFirstChart: [],
    } as LadeZaehldatenHeatmapDTO;
  }

  public static createDefaultSearchAndFilterOptionsDTO(): SearchAndFilterOptionsDTO {
    return {
      searchInMessstellen: true,
      searchInZaehlstellen: true,
      messstelleVerkehrsart: [Verkehrsart.Kfz, Verkehrsart.Rad],
    } as SearchAndFilterOptionsDTO;
  }

  public static createDefaultConfigurationDTO(): ConfigurationDTO {
    return {
      zaehlstelle: this.createDefaultZaehlstelleConfigurationDTO(),
      tenant: this.createDefaultTenantConfigurationDTO(),
    };
  }

  public static createDefaultZaehlstelleConfigurationDTO(): ZaehlstelleConfigurationDTO {
    return {
      automaticNumberAssignment: true,
    };
  }

  public static createDefaultMapConfigurationDTO(): MapConfigurationDTO {
    return {
      // München Zentrum
      lat: "48.137227",
      lng: "11.575517",
      zoom: 12,
      baseLayers: [],
      overlayLayers: [],
    };
  }

  public static createDefaultLadeZaehldatenTableDTO(): LadeZaehldatenTableDTO {
    return { zaehldaten: [] } as LadeZaehldatenTableDTO;
  }

  public static createDefaultTenantConfigurationDTO(): TenantConfigurationDTO {
    return {
      datenportalHeader: "Datenportal",
      mapConfiguration: this.createDefaultMapConfigurationDTO(),
    };
  }

  public static createDefaultLadeProcessedMessdatenDTO(): LadeProcessedMesswerteDTO {
    return {
      zaehldatenTable:
        this.createDefaultLadeZaehldatenTableDTO() as unknown as LadeMesswerteListenausgabeDTO,
      zaehldatenStepline: this.createDefaultLadeZaehldatenSteplineDTO(),
      zaehldatenHeatmap: this.createDefaultLadeZaehldatenHeatmapDTO(),
      belastungsplanMessquerschnitte:
        this.createDefaultBelastungsplanMessquerschnitteDTO(),
      requestedMeasuringDays: -1,
      includedMeasuringDays: -1,
      tagesTyp: TagesTyp.Unspecified,
    } as LadeProcessedMesswerteDTO;
  }
}
