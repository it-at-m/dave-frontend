import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import FahrzeugOptions from "../messstelle/FahrzeugOptions";

export default interface MessstelleOptionsDTO {
    zeitraum: string[];
    fahrzeuge: FahrzeugOptions;
    zeitauswahl: string;
    zeitblock: string;
    wochentag: string;
    intervall: ZaehldatenIntervall;
}
