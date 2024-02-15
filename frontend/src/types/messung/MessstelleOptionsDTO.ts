import FahrzeugOptions from "@/types/messung/FahrzeugOptions";

export default interface MessstelleOptionsDTO {
    zeitraum: string[];
    fahrzeuge: FahrzeugOptions;
}
