import BaseEntity from "@/types/BaseEntity";

export default interface MessstelleDTO extends BaseEntity {
    mstId: string;
    name: string;
    stadtbezirkNummer: number;
    lat: number;
    lng: number;
    customSuchwoerter: string[];
    kommentar: string;
    sichtbarDatenportal: boolean;
}
