import BaseEntity from "@/types/BaseEntity";
import MessquerschnittDto from "@/types/messung/MessquerschnittDto";

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
    messquerschnitte: MessquerschnittDto[];
    datumLetztePlausibleMessung: string;
    abbaudatum: string;
    realisierungsdatum: string;
}
