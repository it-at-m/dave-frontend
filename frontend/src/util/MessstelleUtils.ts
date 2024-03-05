import MessquerschnittInfoDTO from "@/types/messstelle/MessquerschnittInfoDTO";
import Zeitauswahl from "@/types/enum/Zeitauswahl";

export function useMessstelleUtils() {
    const alleRichtungen = "Alle Richtungen";
    function getDirectionOfMessquerschnitt(
        messquerschnitt: MessquerschnittInfoDTO
    ): string {
        let direction;
        switch (messquerschnitt.fahrtrichtung.toUpperCase()) {
            case "N":
                direction = "Norden";
                break;
            case "O":
                direction = "Osten";
                break;
            case "S":
                direction = "Süden";
                break;
            case "W":
                direction = "Westen";
                break;
            default:
                direction = messquerschnitt.fahrtrichtung;
        }
        return direction;
    }

    function isZeitauswahlSpitzenstunde(zeitauswahl: string): boolean {
        return (
            zeitauswahl == Zeitauswahl.SPITZENSTUNDE_KFZ ||
            zeitauswahl == Zeitauswahl.SPITZENSTUNDE_RAD ||
            zeitauswahl == Zeitauswahl.SPITZENSTUNDE_FUSS
        );
    }

    return {
        alleRichtungen,
        getDirectionOfMessquerschnitt,
        isZeitauswahlSpitzenstunde,
    };
}
