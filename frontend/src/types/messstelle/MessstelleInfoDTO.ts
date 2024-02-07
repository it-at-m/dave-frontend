import BaseEntity from "@/types/BaseEntity";
import MessquerschnittInfoDTO from "@/types/messung/MessquerschnittInfoDTO";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";

export default interface MessstelleInfoDTO extends BaseEntity {
    mstId: string;
    name: string;
    stadtbezirkNummer: number;
    stadtbezirk: string;
    standort: string;
    latitude: number;
    longitude: number;
    kommentar: string;
    fahrzeugKlassen: string;
    detektierteVerkehrsarten: DetektierteFahrzeugart;
    hersteller: string;
    sichtbarDatenportal: boolean;
    messquerschnitte: MessquerschnittInfoDTO[];
    datumLetztePlausibleMessung: string;
    abbaudatum: string;
    realisierungsdatum: string;
}
