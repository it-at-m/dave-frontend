import type BaseEntity from "@/types/common/BaseEntity";
import type MessfaehigkeitDTO from "@/types/messstelle/MessfaehigkeitDTO";
import type MessquerschnittInfoDTO from "@/types/messstelle/MessquerschnittInfoDTO";

import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";

export default interface MessstelleInfoDTO extends BaseEntity {
  mstId: string;
  name: string;
  stadtbezirkNummer: number;
  stadtbezirk: string;
  standort: string;
  latitude: string;
  longitude: string;
  kommentar: string;
  fahrzeugKlassen: string;
  detektierteVerkehrsarten: DetektierteFahrzeugart;
  hersteller: string;
  sichtbarDatenportal: boolean;
  messquerschnitte: MessquerschnittInfoDTO[];
  datumLetztePlausibleMessung: string;
  abbaudatum: string;
  realisierungsdatum: string;
  messfaehigkeiten: Array<MessfaehigkeitDTO>;
  lageplanVorhanden: boolean;
}
