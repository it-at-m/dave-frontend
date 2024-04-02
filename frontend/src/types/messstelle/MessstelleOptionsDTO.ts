import FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

export default interface MessstelleOptionsDTO {
    zeitraum: string[];
    fahrzeuge: FahrzeugOptions;
    zeitauswahl: string;
    zeitblock: string;
    tagesTyp: string;
    intervall: ZaehldatenIntervall;
    messquerschnittIds: string[];
    // Darstellungsoptionen
    werteHundertRunden: boolean;
    blackPrintMode: boolean;
    // Ganglinie
    ganglinieYAchse1MaxValue: number | null;
    ganglinieYAchse2MaxValue: number | null;
    // Listenausgabe
    stundensumme: boolean;
    blocksumme: boolean;
    tagessumme: boolean;
    spitzenstunde: boolean;
}
