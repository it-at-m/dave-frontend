import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";

export default interface MessquerschnittInfoDTO {
    mstId: string;
    mqId: string;
    strassenname: string;
    lageMessquerschnitt: string;
    fahrtrichtung: string;
    anzahlFahrspuren: number;
    fahrzeugKlassen: string;
    detektierteVerkehrsarten: DetektierteFahrzeugart;
    anzahlDetektoren: number;
}
