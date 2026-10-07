import { ZaehldatenIntervall } from "@/api/client";

export const ZaehldatenIntervallToBeschreibung = new Map<string, string>([
  [ZaehldatenIntervall.StundeViertel, "15 Min"],
  [ZaehldatenIntervall.StundeHalb, "30 Min"],
  [ZaehldatenIntervall.StundeKomplett, "60 Min"],
]);

export const ZaehldatenIntervallToSelect = [
  { title: "15 Minuten", value: ZaehldatenIntervall.StundeViertel },
  { title: "30 Minuten", value: ZaehldatenIntervall.StundeHalb },
  { title: "60 Minuten", value: ZaehldatenIntervall.StundeKomplett },
];

export const BeschreibungToZaehldatenIntervall = new Map(
  [...ZaehldatenIntervallToBeschreibung].reverse()
);
