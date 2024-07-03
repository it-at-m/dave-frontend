import Himmelsrichtungen from "@/types/enum/Himmelsrichtungen";

export default interface MessquerschnittInfoDTO {
    mstId: string;
    mqId: string;
    strassenname: string;
    lageMessquerschnitt: string;
    fahrtrichtung: Himmelsrichtungen;
    anzahlFahrspuren: number;
    anzahlDetektoren: number;
    standort: string;
}
