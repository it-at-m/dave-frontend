import type BaseEntity from "@/types/common/BaseEntity";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";

export default interface ZaehlstelleHeaderDTO extends BaseEntity {
  nummer: string;
  name: string;
  stadtbezirk: string;
  stadtbezirkNummer: string;
  lat: string;
  lng: string;
  zaehlungen: LadeZaehlungDTO[];
  kommentar: string;
}
