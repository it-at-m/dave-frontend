import type DetektierteVerkehrsart from "@/types/enum/DetektierteVerkehrsart";

export default interface TooltipMessstelleDTO {
  mstId: string;
  standort: string;
  stadtbezirk: string;
  stadtbezirknummer: number;
  realisierungsdatum: string;
  abbaudatum: string;
  datumLetztePlausibleMessung: string;
  detektierteVerkehrsart: DetektierteVerkehrsart;
}
