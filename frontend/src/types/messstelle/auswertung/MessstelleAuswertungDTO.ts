import BaseEntity from "@/types/BaseEntity";
import MessquerschnittAuswertungDTO from "@/types/messstelle/auswertung/MessquerschnittAuswertungDTO";

export default interface MessstelleAuswertungDTO extends BaseEntity {
    mstId: string;
    standort: string;
    messquerschnitte: MessquerschnittAuswertungDTO[];
    detektierteVerkehrsarten: string;
}
