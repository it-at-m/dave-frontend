import type KeyVal from "@/types/common/KeyVal";

export enum AuswertungsZeitraum {
  // Monate
  JANUAR = "JANUAR",
  FEBRUAR = "FEBRUAR",
  MAERZ = "MAERZ",
  APRIL = "APRIL",
  MAI = "MAI",
  JUNI = "JUNI",
  JULI = "JULI",
  AUGUST = "AUGUST",
  SEPTEMBER = "SEPTEMBER",
  OKTOBER = "OKTOBER",
  NOVEMBER = "NOVEMBER",
  DEZEMBER = "DEZEMBER",
  // Quartale
  QUARTAL_1 = "QUARTAL_1",
  QUARTAL_2 = "QUARTAL_2",
  QUARTAL_3 = "QUARTAL_3",
  QUARTAL_4 = "QUARTAL_4",
  // Halbjahre
  HALBJAHR_1 = "HALBJAHR_1",
  HALBJAHR_2 = "HALBJAHR_2",
  // Jahr
  JAHRE = "JAHRE",
}

export const monate = new Map<string, KeyVal>([
  [
    AuswertungsZeitraum.JANUAR,
    { title: "Januar", value: AuswertungsZeitraum.JANUAR },
  ],
  [
    AuswertungsZeitraum.FEBRUAR,
    { title: "Februar", value: AuswertungsZeitraum.FEBRUAR },
  ],
  [
    AuswertungsZeitraum.MAERZ,
    { title: "März", value: AuswertungsZeitraum.MAERZ },
  ],
  [
    AuswertungsZeitraum.APRIL,
    { title: "April", value: AuswertungsZeitraum.APRIL },
  ],
  [AuswertungsZeitraum.MAI, { title: "Mai", value: AuswertungsZeitraum.MAI }],
  [
    AuswertungsZeitraum.JUNI,
    { title: "Juni", value: AuswertungsZeitraum.JUNI },
  ],
  [
    AuswertungsZeitraum.JULI,
    { title: "Juli", value: AuswertungsZeitraum.JULI },
  ],
  [
    AuswertungsZeitraum.AUGUST,
    { title: "August", value: AuswertungsZeitraum.AUGUST },
  ],
  [
    AuswertungsZeitraum.SEPTEMBER,
    { title: "September", value: AuswertungsZeitraum.SEPTEMBER },
  ],
  [
    AuswertungsZeitraum.OKTOBER,
    { title: "Oktober", value: AuswertungsZeitraum.OKTOBER },
  ],
  [
    AuswertungsZeitraum.NOVEMBER,
    { title: "November", value: AuswertungsZeitraum.NOVEMBER },
  ],
  [
    AuswertungsZeitraum.DEZEMBER,
    { title: "Dezember", value: AuswertungsZeitraum.DEZEMBER },
  ],
]);
export const quartale = new Map<string, KeyVal>([
  [
    AuswertungsZeitraum.QUARTAL_1,
    {
      title: "1. Quartal (Jan - März)",
      value: AuswertungsZeitraum.QUARTAL_1,
    },
  ],
  [
    AuswertungsZeitraum.QUARTAL_2,
    {
      title: "2. Quartal (Apr - Juni)",
      value: AuswertungsZeitraum.QUARTAL_2,
    },
  ],
  [
    AuswertungsZeitraum.QUARTAL_3,
    {
      title: "3. Quartal (Juli - Sept)",
      value: AuswertungsZeitraum.QUARTAL_3,
    },
  ],
  [
    AuswertungsZeitraum.QUARTAL_4,
    {
      title: "4. Quartal (Okt - Dez)",
      value: AuswertungsZeitraum.QUARTAL_4,
    },
  ],
]);
export const halbjahre = new Map<string, KeyVal>([
  [
    AuswertungsZeitraum.HALBJAHR_1,
    {
      title: "1. Halbjahr (Jan - Juni)",
      value: AuswertungsZeitraum.HALBJAHR_1,
    },
  ],
  [
    AuswertungsZeitraum.HALBJAHR_2,
    {
      title: "2. Halbjahr (Juli - Dez)",
      value: AuswertungsZeitraum.HALBJAHR_2,
    },
  ],
]);
export const jahre = new Map<string, KeyVal>([
  [
    AuswertungsZeitraum.JAHRE,
    { title: "Jahre", value: AuswertungsZeitraum.JAHRE },
  ],
]);

export const auswertungszeitraumToText = new Map<string, KeyVal>([
  ...monate,
  ...quartale,
  ...halbjahre,
  ...jahre,
]);

export enum ZeitintervallCategories {
  JAHRE = "Jahre",
  HALBJAHRE = "Halbjahre",
  QUARTALE = "Quartale",
  MONATE = "Monate",
}
