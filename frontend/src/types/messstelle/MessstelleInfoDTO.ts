import type BaseEntity from "@/types/common/BaseEntity";
import type MessfaehigkeitDTO from "@/types/messstelle/MessfaehigkeitDTO";
import type MessquerschnittInfoDTO from "@/types/messstelle/MessquerschnittInfoDTO";

import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";
import Verkehrsart from "@/types/enum/Verkehrsart";

export default interface MessstelleInfoDTO extends BaseEntity {
  mstId: string;
  name: string;
  stadtbezirkNummer: number;
  stadtbezirk: string;
  standort: string;
  latitude: string;
  longitude: string;
  kommentar: string;
  fahrzeugklasse: Fahrzeugklasse | string;
  detektierteVerkehrsart: Verkehrsart;
  hersteller: string;
  sichtbarDatenportal: boolean;
  messquerschnitte: MessquerschnittInfoDTO[];
  datumLetztePlausibleMessung: string;
  abbaudatum: string;
  realisierungsdatum: string;
  messfaehigkeiten: Array<MessfaehigkeitDTO>;
  lageplanVorhanden: boolean;
}
