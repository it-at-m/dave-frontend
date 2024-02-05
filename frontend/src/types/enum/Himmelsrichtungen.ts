export enum Himmelsrichtungen {
    NORD = "N",
    SUED = "S",
    OST = "O",
    WEST = "W",
}

export default Himmelsrichtungen;

export const himmelsrichtungText = new Map<string, string>([
    [Himmelsrichtungen.NORD, "Nord"],
    [Himmelsrichtungen.SUED, "Süd"],
    [Himmelsrichtungen.OST, "Ost"],
    [Himmelsrichtungen.WEST, "West"],
]);
