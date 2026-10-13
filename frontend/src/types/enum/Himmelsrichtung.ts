enum Himmelsrichtung {
  N = "N",
  NO = "NO",
  O = "O",
  SO = "SO",
  S = "S",
  SW = "SW",
  W = "W",
  NW = "NW",
}

export default Himmelsrichtung;

export const himmelsRichtungenTextLong: Map<string, string> = new Map<
  string,
  string
>([
  [Himmelsrichtung.N, "Nord"],
  [Himmelsrichtung.NO, "Nordost"],
  [Himmelsrichtung.O, "Ost"],
  [Himmelsrichtung.SO, "Südost"],
  [Himmelsrichtung.S, "Süd"],
  [Himmelsrichtung.SW, "Südwest"],
  [Himmelsrichtung.W, "West"],
  [Himmelsrichtung.NW, "Nordwest"],
]);

export const himmelsRichtungenTextShort: Map<string, string> = new Map<
  string,
  string
>([
  [Himmelsrichtung.N, "N"],
  [Himmelsrichtung.NO, "NO"],
  [Himmelsrichtung.O, "O"],
  [Himmelsrichtung.SO, "SO"],
  [Himmelsrichtung.S, "S"],
  [Himmelsrichtung.SW, "SW"],
  [Himmelsrichtung.W, "W"],
  [Himmelsrichtung.NW, "NW"],
]);
