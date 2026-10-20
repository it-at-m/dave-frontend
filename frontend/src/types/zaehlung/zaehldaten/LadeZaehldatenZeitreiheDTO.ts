import type Fahrzeug from "@/types/enum/Fahrzeug";

export default interface LadeZaehldatenZeitreiheDTO {
  datum: string[];
  fehlendeWerteMeldung: string[];
  tageswertNichtVorhanden: Fahrzeug[][];
  kfz: Array<number | null>;
  sv: Array<number | null>;
  gv: Array<number | null>;
  rad: Array<number | null>;
  fuss: Array<number | null>;
  svAnteilInProzent: Array<number | null>;
  gvAnteilInProzent: Array<number | null>;
  gesamt: Array<number | null>;
}
