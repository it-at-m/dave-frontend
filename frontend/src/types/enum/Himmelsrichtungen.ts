enum Himmelsrichtungen {
  NORD = "N",
  SUED = "S",
  OST = "O",
  WEST = "W",
}

export default Himmelsrichtungen;

export const himmelsRichtungenTextLong: Map<string, string> = new Map<
  string,
  string
>([
  [Himmelsrichtungen.NORD, "Nord"],
  [Himmelsrichtungen.OST, "Ost"],
  [Himmelsrichtungen.SUED, "Süd"],
  [Himmelsrichtungen.WEST, "West"],
]);

export const himmelsRichtungenTextShort: Map<string, string> = new Map<
  string,
  string
>([
  [Himmelsrichtungen.NORD, "N"],
  [Himmelsrichtungen.OST, "O"],
  [Himmelsrichtungen.SUED, "S"],
  [Himmelsrichtungen.WEST, "W"],
]);
