import {Himmelsrichtung} from "@/api/client";

export const himmelsRichtungenTextLong: Map<string, string> = new Map<
  string,
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

export const himmelsRichtungenTextShort: Map<string, string> = new Map<
  string,
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
