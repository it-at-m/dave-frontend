import type { Verkehrsart } from "@/api/client";

export default interface TooltipMessstelleDTO {
  mstId: string;
  standort: string;
  stadtbezirk: string;
  stadtbezirknummer: number;
  realisierungsdatum: string;
  abbaudatum: string;
  datumLetztePlausibleMessung: string;
  detektierteVerkehrsart: Verkehrsart;
}
