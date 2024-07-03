import type BaseEntity from "@/types/common/BaseEntity";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeFahrbeziehungDTO from "@/types/zaehlung/LadeFahrbeziehungDTO";
import Wetter from "@/types/enum/Wetter";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Quelle from "@/types/enum/Quelle";
import type FahrbeziehungenDTO from "@/types/zaehlung/FahrbeziehungenDTO";
import type ZeitauswahlDTO from "@/types/zaehlung/ZeitauswahlDTO";

export default interface LadeZaehlungDTO extends BaseEntity {
    // Zeit
    datum: string;
    jahr: string;
    monat: string;
    jahreszeit: string;

    zaehlart: string;
    lat: string;
    lng: string;
    tagesTyp: string;
    projektNummer: string;
    projektName: string;
    kreuzungsname: string;
    sonderzaehlung: boolean;
    kreisverkehr: boolean;
    zaehlsituation: string;
    zaehlsituationErweitert: string;
    zaehlIntervall: string;
    wetter: Wetter;
    zaehldauer: Zaehldauer;
    quelle: Quelle;
    schulZeiten: string;
    kommentar: string;
    knotenarme: LadeKnotenarmDTO[];
    fahrbeziehungen: LadeFahrbeziehungDTO[];
    auswaehlbareFahrbeziehungen: FahrbeziehungenDTO;
    zeitauswahl: ZeitauswahlDTO;
    kategorien: string[];
    pkwEinheit: string[];
}
