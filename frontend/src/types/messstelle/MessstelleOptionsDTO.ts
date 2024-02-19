import FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";

export default interface MessstelleOptionsDTO {
    zeitraum: string[];
    fahrzeuge: FahrzeugOptions;
}
