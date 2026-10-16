import type { Fahrzeugklasse, Verkehrsart } from "@/api/client";
import type BaseEntity from "@/types/common/BaseEntity";
import type Messfaehigkeit from "@/types/messstelle/Messfaehigkeit";
import type MessquerschnittInfo from "@/types/messstelle/MessquerschnittInfo";

export default interface MessstelleInfo extends BaseEntity {
  mstId: string;
  standort: string;
  name: string;
  stadtbezirkNummer: number;
  stadtbezirk: string;
  latitude: string;
  longitude: string;
  kommentar: string;
  fahrzeugklasse: Fahrzeugklasse | string;
  detektierteVerkehrsart: Verkehrsart;
  hersteller: string;
  sichtbarDatenportal: boolean;
  messquerschnitte: MessquerschnittInfo[];
  datumLetztePlausibleMessung: string;
  abbaudatum: string;
  realisierungsdatum: string;
  messfaehigkeiten: Array<Messfaehigkeit>;
  lageplanVorhanden: boolean;
}
