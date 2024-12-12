import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

export function useMessfaehigkeitRanking() {

    let rankingFahrzeugklassen: Fahrzeugklasse[] = [Fahrzeugklasse.SUMME_KFZ, Fahrzeugklasse.ZWEI_PLUS_EINS, Fahrzeugklasse.ACHT_PLUS_EINS];
    let rankingIntervall: ZaehldatenIntervall[] = [ZaehldatenIntervall.STUNDE_KOMPLETT, ZaehldatenIntervall.STUNDE_HALB, ZaehldatenIntervall.STUNDE_VIERTEL_EINGESCHRAENKT, ZaehldatenIntervall.STUNDE_VIERTEL];

    function getMinFahrzeugklassen(fahrzeugklassen1: Fahrzeugklasse, fahrzeugklassen2: Fahrzeugklasse): Fahrzeugklasse {
        if (!fahrzeugklassen1) {
            return fahrzeugklassen2;
        }
        if (!fahrzeugklassen2) {
            return fahrzeugklassen1;
        }
        if (fahrzeugklassen1 === Fahrzeugklasse.RAD || fahrzeugklassen2 === Fahrzeugklasse.RAD){
            return Fahrzeugklasse.RAD;
        }
        return rankingFahrzeugklassen.findIndex(fzklassen => fzklassen === fahrzeugklassen1) < rankingFahrzeugklassen.findIndex(fzklassen => fzklassen === fahrzeugklassen2) ? fahrzeugklassen1 : fahrzeugklassen2;
    }

    function getMinIntervall(intervall1: ZaehldatenIntervall, intervall2: ZaehldatenIntervall): ZaehldatenIntervall {
        if (!intervall1) {
            return intervall2;
        }
        if (!intervall2) {
            return intervall1;
        }
        return rankingIntervall.findIndex(interv => interv === intervall1) < rankingIntervall.findIndex(interv => interv === intervall2) ? intervall1 : intervall2;
    }

    return {
        getMinFahrzeugklassen,
        getMinIntervall
    };
}
