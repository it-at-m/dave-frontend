import type ZaehlartenKarteDTO from "@/types/zaehlstelle/ZaehlartenKarteDTO";
import type TooltipZaehlstelleDTO from "@/types/karte/TooltipZaehlstelleDTO";
import type AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";

export default interface ZaehlstelleKarteDTO extends AnzeigeKarteDTO {
    letzteZaehlungId: string;
    tooltip: TooltipZaehlstelleDTO;
    zaehlartenKarte: Array<ZaehlartenKarteDTO>;
}
