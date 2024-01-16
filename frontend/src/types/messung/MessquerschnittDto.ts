import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";

export default interface MessquerschnittDto {
    mqId: string;
    mstId: string;
    strassenname: string;
    lageMessquerschnitt: string;
    fahrtrichtung: string;
    anzahlFahrspuren: number;
    fahrzeugKlassen: string;
    detektierteVerkehrsarten: DetektierteFahrzeugart;
    hersteller: string;
    anzahlDetektoren: number;
    xcoordinate: number;
    ycoordinate: number;
}
