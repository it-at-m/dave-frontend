import BaseEntity from "@/types/BaseEntity";
import Wetter from "@/types/enum/Wetter";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Quelle from "@/types/enum/Quelle";

export default interface ZaehlungTimelineDTO extends BaseEntity {
    datum: string;

    /**
     * Wochenende, Wochentag, Feiertag
     */
    tagesTyp: string;
    projektNummer: string;
    projektName: string;
    sonderzaehlung: string;
    zaehlIntervall: number;
    artDerZaehlung: string;
    wetter: Wetter;
    zaehldauer: Zaehldauer;
    quelle: Quelle;

    /**
     * Ferien, Schule
     */
    schulZeiten: string;
    filterWoerter: string;
}
