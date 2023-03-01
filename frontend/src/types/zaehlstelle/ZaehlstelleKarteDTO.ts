import ZaehlartenKarteDTO from "@/types/zaehlstelle/ZaehlartenKarteDTO";
import TooltipDTO from "@/types/TooltipDTO";

export default interface ZaehlstelleKarteDTO {

  id: string;

  nummer: string;

  letzteZaehlungId: string;

  longitude: string;

  latitude: string;

  tooltip: TooltipDTO;

  zaehlartenKarte: Array<ZaehlartenKarteDTO>;

  sichtbarDatenportal: boolean;

}