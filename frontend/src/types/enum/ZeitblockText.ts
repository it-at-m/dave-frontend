import type KeyVal from "@/types/common/KeyVal";

import { Zeitblock } from "@/api/client";

export const zeitblockInfo = new Map<string, KeyVal>([
  [Zeitblock.Zb0006, { title: "0 - 6 Uhr", value: Zeitblock.Zb0006 }],
  [Zeitblock.Zb0610, { title: "6 - 10 Uhr", value: Zeitblock.Zb0610 }],
  [Zeitblock.Zb1015, { title: "10 - 15 Uhr", value: Zeitblock.Zb1015 }],
  [Zeitblock.Zb1519, { title: "15 - 19 Uhr", value: Zeitblock.Zb1519 }],
  [Zeitblock.Zb1922, { title: "19 - 22 Uhr", value: Zeitblock.Zb1922 }],
  [Zeitblock.Zb1924, { title: "19 - 24 Uhr", value: Zeitblock.Zb1924 }],
  [Zeitblock.Zb0024, { title: "0 - 24 Uhr", value: Zeitblock.Zb0024 }],
  [Zeitblock.Zb0619, { title: "6 - 19 Uhr", value: Zeitblock.Zb0619 }],
  [Zeitblock.Zb0622, { title: "6 - 22 Uhr", value: Zeitblock.Zb0622 }],
]);

export const zeitblockOrder = [
  Zeitblock.Zb0024,
  Zeitblock.Zb0622,
  Zeitblock.Zb0619,
  Zeitblock.Zb0610,
  Zeitblock.Zb1015,
  Zeitblock.Zb1519,
  Zeitblock.Zb0006,
  Zeitblock.Zb1922,
  Zeitblock.Zb1924,
];

export const BeschreibungToZeitblock = new Map([...zeitblockInfo].reverse());

export const zeitblockStuendlichInfo = new Map<string, KeyVal>([
  [Zeitblock.Zb0001, { value: Zeitblock.Zb0001, title: "0 - 1 Uhr" }],
  [Zeitblock.Zb0102, { value: Zeitblock.Zb0102, title: "1 - 2 Uhr" }],
  [Zeitblock.Zb0203, { value: Zeitblock.Zb0203, title: "2 - 3 Uhr" }],
  [Zeitblock.Zb0304, { value: Zeitblock.Zb0304, title: "3 - 4 Uhr" }],
  [Zeitblock.Zb0405, { value: Zeitblock.Zb0405, title: "4 - 5 Uhr" }],
  [Zeitblock.Zb0506, { value: Zeitblock.Zb0506, title: "5 - 6 Uhr" }],
  [Zeitblock.Zb0607, { value: Zeitblock.Zb0607, title: "6 - 7 Uhr" }],
  [Zeitblock.Zb0708, { value: Zeitblock.Zb0708, title: "7 - 8 Uhr" }],
  [Zeitblock.Zb0809, { value: Zeitblock.Zb0809, title: "8 - 9 Uhr" }],
  [Zeitblock.Zb0910, { value: Zeitblock.Zb0910, title: "9 - 10 Uhr" }],
  [Zeitblock.Zb1011, { value: Zeitblock.Zb1011, title: "10 - 11 Uhr" }],
  [Zeitblock.Zb1112, { value: Zeitblock.Zb1112, title: "11 - 12 Uhr" }],
  [Zeitblock.Zb1213, { value: Zeitblock.Zb1213, title: "12 - 13 Uhr" }],
  [Zeitblock.Zb1314, { value: Zeitblock.Zb1314, title: "13 - 14 Uhr" }],
  [Zeitblock.Zb1415, { value: Zeitblock.Zb1415, title: "14 - 15 Uhr" }],
  [Zeitblock.Zb1516, { value: Zeitblock.Zb1516, title: "15 - 16 Uhr" }],
  [Zeitblock.Zb1617, { value: Zeitblock.Zb1617, title: "16 - 17 Uhr" }],
  [Zeitblock.Zb1718, { value: Zeitblock.Zb1718, title: "17 - 18 Uhr" }],
  [Zeitblock.Zb1819, { value: Zeitblock.Zb1819, title: "18 - 19 Uhr" }],
  [Zeitblock.Zb1920, { value: Zeitblock.Zb1920, title: "19 - 20 Uhr" }],
  [Zeitblock.Zb2021, { value: Zeitblock.Zb2021, title: "20 - 21 Uhr" }],
  [Zeitblock.Zb2122, { value: Zeitblock.Zb2122, title: "21 - 22 Uhr" }],
  [Zeitblock.Zb2223, { value: Zeitblock.Zb2223, title: "22 - 23 Uhr" }],
  [Zeitblock.Zb2324, { value: Zeitblock.Zb2324, title: "23 - 24 Uhr" }],
]);

export const BeschreibungToZeitblockStuendlich = new Map(
  [...zeitblockStuendlichInfo].reverse()
);
