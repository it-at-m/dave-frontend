import type BaseEntity from "@/types/common/BaseEntity";
import type Verkehrsart from "@/types/enum/Verkehrsart";
import type MessquerschnittAuswertungDTO from "@/types/messstelle/auswertung/MessquerschnittAuswertungDTO";

export default interface MessstelleAuswertungDTO extends BaseEntity {
  mstId: string;
  standort: string;
  messquerschnitte: MessquerschnittAuswertungDTO[];
  detektierteVerkehrsart: Verkehrsart;
}
