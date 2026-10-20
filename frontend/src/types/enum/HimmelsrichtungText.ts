import { Himmelsrichtung } from "@/api/client";


export const himmelsRichtungenTextLong: Map<Himmelsrichtung, string> = new Map<
  Himmelsrichtung,
  string
>([
  [Himmelsrichtung.N, "Nord"],
  [Himmelsrichtung.No, "Nordost"],
  [Himmelsrichtung.O, "Ost"],
  [Himmelsrichtung.So, "Südost"],
  [Himmelsrichtung.S, "Süd"],
  [Himmelsrichtung.Sw, "Südwest"],
  [Himmelsrichtung.W, "West"],
  [Himmelsrichtung.Nw, "Nordwest"],
]);

export const himmelsRichtungenTextShort: Map<Himmelsrichtung, string> = new Map<
  Himmelsrichtung,
  string
>([
  [Himmelsrichtung.N, "N"],
  [Himmelsrichtung.No, "NO"],
  [Himmelsrichtung.O, "O"],
  [Himmelsrichtung.So, "SO"],
  [Himmelsrichtung.S, "S"],
  [Himmelsrichtung.Sw, "SW"],
  [Himmelsrichtung.W, "W"],
  [Himmelsrichtung.Nw, "NW"],
]);
