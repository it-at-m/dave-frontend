import type Verkehrsart from "@/types/enum/Verkehrsart";

export default interface SearchAndFilterOptionsDTO {
  searchInMessstellen: boolean;
  searchInZaehlstellen: boolean;
  messstelleVerkehrsart: Array<Verkehrsart>;
}
