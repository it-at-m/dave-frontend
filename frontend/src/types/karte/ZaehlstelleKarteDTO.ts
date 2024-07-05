import ZaehlartenKarteDTO from "@/types/zaehlstelle/ZaehlartenKarteDTO";
import TooltipZaehlstelleDTO from "@/types/karte/TooltipZaehlstelleDTO";
import AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";

export default interface ZaehlstelleKarteDTO extends AnzeigeKarteDTO {
    letzteZaehlungId: string;
    tooltip: TooltipZaehlstelleDTO;
    zaehlartenKarte: Array<ZaehlartenKarteDTO>;
}
