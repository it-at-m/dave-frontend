import type StartAndEndDate from "@/types/common/StartAndEndDate";

export default interface SearchAndFilterOptionsDTO {
  searchInMessstellen: boolean;
  searchInZaehlstellen: boolean;
  zeitraum: StartAndEndDate;
}
