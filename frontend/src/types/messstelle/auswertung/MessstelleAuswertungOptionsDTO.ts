import type FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";

export default interface MessstelleAuswertungOptionsDTO {
  jahre: Array<string>;
  tagesTyp: string;
  zeitintervalle: Array<string>;
  mstIds: Array<string>;
  mqIds: Array<string>;
  fahrzeuge: FahrzeugOptions;

  // Nicht fuer das Backend
  verfuegbareVerkehrsarten: Array<string>;
}
