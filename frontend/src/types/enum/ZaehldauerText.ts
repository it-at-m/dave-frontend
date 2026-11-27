import type KeyVal from "@/types/common/KeyVal";

import { Zaehldauer } from "@/api/client";

export const zaehldauerText = new Map<Zaehldauer, string>([
  [
    Zaehldauer.Dauer2X4Stunden,
    "2 x 4 Stunden (Kurzzeiterhebung 6 bis 10 Uhr und 15 bis 19 Uhr)",
  ],
  [Zaehldauer.Dauer24Stunden, "24 Stunden"],
  [Zaehldauer.Dauer16Stunden, "16 Stunden"],
  [Zaehldauer.Dauer13Stunden, "13 Stunden (Kurzzeiterhebung 6 bis 19Uhr)"],
  [Zaehldauer.Sonstige, "Sonstige"],
]);

export const zaehldauerDropDown = new Array<KeyVal>(
  {
    value: Zaehldauer.Dauer2X4Stunden,
    title: "2 x 4 Stunden",
  },
  {
    value: Zaehldauer.Dauer13Stunden,
    title: "13 Stunden",
  },
  {
    value: Zaehldauer.Dauer16Stunden,
    title: "16 Stunden",
  },
  { value: Zaehldauer.Dauer24Stunden, title: "Ganztageszählung" },
  { value: Zaehldauer.Sonstige, title: "Sonderzähldauer" }
);
