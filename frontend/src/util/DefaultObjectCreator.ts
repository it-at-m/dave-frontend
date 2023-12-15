import ZaehlstelleKarteDTO from "@/types/zaehlstelle/ZaehlstelleKarteDTO";
import Suggest from "@/types/Suggest";
import { StartEndeUhrzeitIntervalls } from "@/store/modules/zaehlung";
import TooltipDTO from "@/types/TooltipDTO";

export default class DefaultObjectCreator {
    public static createDefaultZaehlstelleKarte(): ZaehlstelleKarteDTO {
        return {
            id: "",
            nummer: "",
            letzteZaehlungId: "",
            tooltip: {} as TooltipDTO,
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
        };
    }

    public static createDefaultStartEndeUhrzeitIntervalls(): StartEndeUhrzeitIntervalls {
        return {
            startUhrzeitIntervalls: "",
            endeUhrzeitIntervalls: "",
        };
    }
}
