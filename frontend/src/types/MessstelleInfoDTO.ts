import BaseEntity from "@/types/BaseEntity";
import MessquerschnittInfoDTO from "@/types/messung/MessquerschnittInfoDTO";

export default interface MessstelleInfoDTO extends BaseEntity {
    mstId: string;
    name: string;
    stadtbezirkNummer: number;
    stadtbezirk: string;
    standort: string;
    lat: number;
    lng: number;
    kommentar: string;
    sichtbarDatenportal: boolean;
    messquerschnitte: MessquerschnittInfoDTO[];
    datumLetztePlausibleMessung: string;
    abbaudatum: string;
    realisierungsdatum: string;
}
