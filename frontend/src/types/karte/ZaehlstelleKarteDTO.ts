import type AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";
import type TooltipZaehlstelleDTO from "@/types/karte/TooltipZaehlstelleDTO";
import type ZaehlartenKarteDTO from "@/types/zaehlstelle/ZaehlartenKarteDTO";

export default interface ZaehlstelleKarteDTO extends AnzeigeKarteDTO {
  letzteZaehlungId: string;
  tooltip: TooltipZaehlstelleDTO;
  zaehlartenKarte: Array<ZaehlartenKarteDTO>;
}
