import BaseEntity from "@/types/BaseEntity";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";

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