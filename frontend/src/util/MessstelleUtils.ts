import MessquerschnittInfoDTO from "@/types/messstelle/MessquerschnittInfoDTO";

export function useMessstelleUtils() {
    function getDirectionOfMessquerschnitt(
        messquerschnitt: MessquerschnittInfoDTO
    ): string {
        let direction = "";
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

    return {
        getDirectionOfMessquerschnitt,
    };
}
