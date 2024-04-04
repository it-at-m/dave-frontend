import ZaehlstelleKarteDTO from "@/types/zaehlstelle/ZaehlstelleKarteDTO";
import Suggest from "@/types/Suggest";
import { StartEndeUhrzeitIntervalls } from "@/store/modules/zaehlung";
import TooltipZaehlstelleDTO from "@/types/TooltipZaehlstelleDTO";
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/MessstelleAuswertungOptionsDTO";

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
        };
    }
}
