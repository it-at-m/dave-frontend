import BaseEntity from "@/types/BaseEntity";
import MessquerschnittDto from "@/types/messung/MessquerschnittDto";

export default interface MessstelleDTO extends BaseEntity {
    mstId: string;
    name: string;
    stadtbezirkNummer: number;
    standort: string;
    lat: number;
    lng: number;
    customSuchwoerter: string[];
    kommentar: string;
    sichtbarDatenportal: boolean;
    messquerschnitte: MessquerschnittDto[];
    datumLetztePlausibleMessung: string;
    abbaudatum?: string;
    realisierungsdatum: string;
}
