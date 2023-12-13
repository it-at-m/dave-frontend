import ZaehlartenKarteDTO from "@/types/zaehlstelle/ZaehlartenKarteDTO";
import TooltipDTO from "@/types/TooltipDTO";
import AnzeigeKarteDTO from "@/types/AnzeigeKarteDTO";

export default interface ZaehlstelleKarteDTO extends AnzeigeKarteDTO {
    nummer: string;

    letzteZaehlungId: string;

    tooltip: TooltipDTO;

    zaehlartenKarte: Array<ZaehlartenKarteDTO>;

    sichtbarDatenportal: boolean;
}
