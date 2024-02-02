export enum Himmelsrichtungen {
    NORD = "N",
    SUED = "S",
    OST = "O",
    WEST = "W",
    NORDOST = "NO",
    NORDWEST = "NW",
    SUEDOST = "SO",
    SUEDWEST = "SW",
}

export default Himmelsrichtungen;

export const himmelsrichtungText = new Map<string, string>([
    [Himmelsrichtungen.NORD, "Nord"],
    [Himmelsrichtungen.SUED, "Süd"],
    [Himmelsrichtungen.OST, "Ost"],
    [Himmelsrichtungen.WEST, "West"],
    [Himmelsrichtungen.NORDOST, "Nordost"],
    [Himmelsrichtungen.NORDWEST, "Nordwest"],
    [Himmelsrichtungen.SUEDOST, "Südost"],
    [Himmelsrichtungen.SUEDWEST, "Südwest"],
]);
