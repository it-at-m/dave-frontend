import ZaehlartenKarteDTO from "@/types/zaehlstelle/ZaehlartenKarteDTO";
import TooltipZaehlstelleDTO from "@/types/TooltipZaehlstelleDTO";
import AnzeigeKarteDTO from "@/types/AnzeigeKarteDTO";

export default interface ZaehlstelleKarteDTO extends AnzeigeKarteDTO {
    letzteZaehlungId: string;
    tooltip: TooltipZaehlstelleDTO;
    zaehlartenKarte: Array<ZaehlartenKarteDTO>;
}
