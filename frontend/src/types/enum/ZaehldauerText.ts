import { Zaehldauer } from "@/api/client";

export const zaehldauerText = new Map<string, string>([
  [
    Zaehldauer.Dauer2X4Stunden,
    "2 x 4 Stunden (Kurzzeiterhebung 6 bis 10 Uhr und 15 bis 19 Uhr)",
  ],
  [Zaehldauer.Dauer24Stunden, "24 Stunden"],
  [Zaehldauer.Dauer16Stunden, "16 Stunden"],
  [Zaehldauer.Dauer13Stunden, "13 Stunden (Kurzzeiterhebung 6 bis 19Uhr)"],
  [Zaehldauer.Sonstige, "Sonstige"],
]);
