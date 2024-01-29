import ZaehlartenKarteDTO from "@/types/zaehlstelle/ZaehlartenKarteDTO";
import TooltipZaehlstelleDTO from "@/types/TooltipZaehlstelleDTO";
import AnzeigeKarteDTO from "@/types/AnzeigeKarteDTO";

export default interface ZaehlstelleKarteDTO extends AnzeigeKarteDTO {
    nummer: string;

    letzteZaehlungId: string;

    tooltip: TooltipZaehlstelleDTO;

    zaehlartenKarte: Array<ZaehlartenKarteDTO>;

    sichtbarDatenportal: boolean;
}
