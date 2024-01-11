export default interface MessquerschnittDto {
    mqId: string;
    mstId: string;
    strassenname: string;
    lageMessquerschnitt: string;
    fahrtrichtung: string;
    anzahlFahrspuren: number;
    fahrzeugKlassen: string;
    detektierteVerkehrsarten: string;
    hersteller: string;
    anzahlDetektoren: number;
    xcoordinate: number;
    ycoordinate: number;
}
