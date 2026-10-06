import type { Verkehrsart } from "@/api/client";

export default interface SearchAndFilterOptionsDTO {
  searchInMessstellen: boolean;
  searchInZaehlstellen: boolean;
  messstelleVerkehrsart: Array<Verkehrsart>;
}
