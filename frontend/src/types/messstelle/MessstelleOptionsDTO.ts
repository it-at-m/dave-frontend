import FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

export default interface MessstelleOptionsDTO {
    zeitraum: string[];
    fahrzeuge: FahrzeugOptions;
    zeitauswahl: string;
    zeitblock: string;
    wochentag: string;
    intervall: ZaehldatenIntervall;
}
