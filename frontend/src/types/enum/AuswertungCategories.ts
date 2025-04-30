import type KeyValSortable from "@/types/common/KeyValSortable";

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

export const monate = new Map<string, KeyValSortable>([
  [
    AuswertungsZeitraum.JANUAR,
    { title: "Januar", value: AuswertungsZeitraum.JANUAR, sortingIndex: 0 },
  ],
  [
    AuswertungsZeitraum.FEBRUAR,
    { title: "Februar", value: AuswertungsZeitraum.FEBRUAR, sortingIndex: 1 },
  ],
  [
    AuswertungsZeitraum.MAERZ,
    { title: "März", value: AuswertungsZeitraum.MAERZ, sortingIndex: 2 },
  ],
  [
    AuswertungsZeitraum.APRIL,
    { title: "April", value: AuswertungsZeitraum.APRIL, sortingIndex: 3 },
  ],
  [
    AuswertungsZeitraum.MAI,
    { title: "Mai", value: AuswertungsZeitraum.MAI, sortingIndex: 4 },
  ],
  [
    AuswertungsZeitraum.JUNI,
    { title: "Juni", value: AuswertungsZeitraum.JUNI, sortingIndex: 5 },
  ],
  [
    AuswertungsZeitraum.JULI,
    { title: "Juli", value: AuswertungsZeitraum.JULI, sortingIndex: 6 },
  ],
  [
    AuswertungsZeitraum.AUGUST,
    { title: "August", value: AuswertungsZeitraum.AUGUST, sortingIndex: 7 },
  ],
  [
    AuswertungsZeitraum.SEPTEMBER,
    {
      title: "September",
      value: AuswertungsZeitraum.SEPTEMBER,
      sortingIndex: 8,
    },
  ],
  [
    AuswertungsZeitraum.OKTOBER,
    { title: "Oktober", value: AuswertungsZeitraum.OKTOBER, sortingIndex: 9 },
  ],
  [
    AuswertungsZeitraum.NOVEMBER,
    {
      title: "November",
      value: AuswertungsZeitraum.NOVEMBER,
      sortingIndex: 10,
    },
  ],
  [
    AuswertungsZeitraum.DEZEMBER,
    {
      title: "Dezember",
      value: AuswertungsZeitraum.DEZEMBER,
      sortingIndex: 11,
    },
  ],
]);
export const quartale = new Map<string, KeyValSortable>([
  [
    AuswertungsZeitraum.QUARTAL_1,
    {
      title: "1. Quartal (Jan - März)",
      value: AuswertungsZeitraum.QUARTAL_1,
      sortingIndex: 0,
    },
  ],
  [
    AuswertungsZeitraum.QUARTAL_2,
    {
      title: "2. Quartal (Apr - Juni)",
      value: AuswertungsZeitraum.QUARTAL_2,
      sortingIndex: 1,
    },
  ],
  [
    AuswertungsZeitraum.QUARTAL_3,
    {
      title: "3. Quartal (Juli - Sept)",
      value: AuswertungsZeitraum.QUARTAL_3,
      sortingIndex: 2,
    },
  ],
  [
    AuswertungsZeitraum.QUARTAL_4,
    {
      title: "4. Quartal (Okt - Dez)",
      value: AuswertungsZeitraum.QUARTAL_4,
      sortingIndex: 3,
    },
  ],
]);
export const halbjahre = new Map<string, KeyValSortable>([
  [
    AuswertungsZeitraum.HALBJAHR_1,
    {
      title: "1. Halbjahr (Jan - Juni)",
      value: AuswertungsZeitraum.HALBJAHR_1,
      sortingIndex: 0,
    },
  ],
  [
    AuswertungsZeitraum.HALBJAHR_2,
    {
      title: "2. Halbjahr (Juli - Dez)",
      value: AuswertungsZeitraum.HALBJAHR_2,
      sortingIndex: 1,
    },
  ],
]);
export const jahre = new Map<string, KeyValSortable>([
  [
    AuswertungsZeitraum.JAHRE,
    { title: "Jahre", value: AuswertungsZeitraum.JAHRE, sortingIndex: 0 },
  ],
]);

export const auswertungszeitraumToText = new Map<string, KeyValSortable>([
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
