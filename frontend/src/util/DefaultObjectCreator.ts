import ZaehlstelleKarteDTO from "@/types/zaehlstelle/ZaehlstelleKarteDTO";
import Suggest from "@/types/Suggest";
import { StartEndeUhrzeitIntervalls } from "@/store/modules/zaehlung";
import TooltipZaehlstelleDTO from "@/types/TooltipZaehlstelleDTO";
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";

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
            id: "",
            entityVersion: 0,
            createdTime: "",
            mstId: "",
            name: "",
            stadtbezirkNummer: 0,
            stadtbezirk: "",
            standort: "",
            lat: 0,
            lng: 0,
            kommentar: "",
            sichtbarDatenportal: true,
            messquerschnitte: [],
            datumLetztePlausibleMessung: "",
            abbaudatum: "",
            realisierungsdatum: "",
        };
    }
}
