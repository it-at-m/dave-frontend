import ZaehlstelleKarteDTO from "@/types/karte/ZaehlstelleKarteDTO";
import Suggest from "@/types/suche/Suggest";
import { StartEndeUhrzeitIntervalls } from "@/store/modules/zaehlung";
import TooltipZaehlstelleDTO from "@/types/karte/TooltipZaehlstelleDTO";
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import InfoMessageDTO from "@/types/app/InfoMessageDTO";
import Wetter from "@/types/enum/Wetter";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Quelle from "@/types/enum/Quelle";
import FahrbeziehungenDTO from "@/types/zaehlung/FahrbeziehungenDTO";
import ZeitauswahlDTO from "@/types/zaehlung/ZeitauswahlDTO";

export default class DefaultObjectCreator {
    public static createDefaultZaehlstelleKarte(): ZaehlstelleKarteDTO {
        return {
            id: "",
            nummer: "",
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
            latitude: 0,
            longitude: 0,
            kommentar: "",
            sichtbarDatenportal: true,
            messquerschnitte: [],
            datumLetztePlausibleMessung: "",
            abbaudatum: "",
            realisierungsdatum: "",
        };
    }

    public static createDefaultFahrzeugOptions(kfz: boolean): FahrzeugOptions {
        return {
            kraftfahrzeugverkehr: kfz,
            schwerverkehr: false,
            gueterverkehr: false,
            schwerverkehrsanteilProzent: false,
            gueterverkehrsanteilProzent: false,
            radverkehr: !kfz,
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
            blocksumme: false,
            ganglinieYAchse1MaxValue: null,
            ganglinieYAchse2MaxValue: null,
            spitzenstunde: false,
            stundensumme: false,
            tagessumme: false,
            werteHundertRunden: false,
            fahrzeuge: this.createDefaultFahrzeugOptions(true),
            intervall: ZaehldatenIntervall.STUNDE_KOMPLETT,
            messquerschnittIds: [],
            tagesTyp: "",
            zeitauswahl: "",
            zeitblock: "",
            zeitraum: [],
        };
    }

    public static createDefaultMessstelleAuswertungOptions(): MessstelleAuswertungOptionsDTO {
        return {
            jahre: [],
            tagesTyp: "",
            zeitintervalle: [],
            mstIds: [],
            mqIds: [],
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

    public static createDefaultZaehlstelleHeaderDTO() {
        return {
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
}
