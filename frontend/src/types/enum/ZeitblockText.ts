import type KeyVal from "@/types/common/KeyVal";

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
  [Zeitblock.ZB_00_01, { value: Zeitblock.ZB_00_01, title: "0 - 1 Uhr" }],
  [Zeitblock.ZB_01_02, { value: Zeitblock.ZB_01_02, title: "1 - 2 Uhr" }],
  [Zeitblock.ZB_02_03, { value: Zeitblock.ZB_02_03, title: "2 - 3 Uhr" }],
  [Zeitblock.ZB_03_04, { value: Zeitblock.ZB_03_04, title: "3 - 4 Uhr" }],
  [Zeitblock.ZB_04_05, { value: Zeitblock.ZB_04_05, title: "4 - 5 Uhr" }],
  [Zeitblock.ZB_05_06, { value: Zeitblock.ZB_05_06, title: "5 - 6 Uhr" }],
  [Zeitblock.ZB_06_07, { value: Zeitblock.ZB_06_07, title: "6 - 7 Uhr" }],
  [Zeitblock.ZB_07_08, { value: Zeitblock.ZB_07_08, title: "7 - 8 Uhr" }],
  [Zeitblock.ZB_08_09, { value: Zeitblock.ZB_08_09, title: "8 - 9 Uhr" }],
  [Zeitblock.ZB_09_10, { value: Zeitblock.ZB_09_10, title: "9 - 10 Uhr" }],
  [Zeitblock.ZB_10_11, { value: Zeitblock.ZB_10_11, title: "10 - 11 Uhr" }],
  [Zeitblock.ZB_11_12, { value: Zeitblock.ZB_11_12, title: "11 - 12 Uhr" }],
  [Zeitblock.ZB_12_13, { value: Zeitblock.ZB_12_13, title: "12 - 13 Uhr" }],
  [Zeitblock.ZB_13_14, { value: Zeitblock.ZB_13_14, title: "13 - 14 Uhr" }],
  [Zeitblock.ZB_14_15, { value: Zeitblock.ZB_14_15, title: "14 - 15 Uhr" }],
  [Zeitblock.ZB_15_16, { value: Zeitblock.ZB_15_16, title: "15 - 16 Uhr" }],
  [Zeitblock.ZB_16_17, { value: Zeitblock.ZB_16_17, title: "16 - 17 Uhr" }],
  [Zeitblock.ZB_17_18, { value: Zeitblock.ZB_17_18, title: "17 - 18 Uhr" }],
  [Zeitblock.ZB_18_19, { value: Zeitblock.ZB_18_19, title: "18 - 19 Uhr" }],
  [Zeitblock.ZB_19_20, { value: Zeitblock.ZB_19_20, title: "19 - 20 Uhr" }],
  [Zeitblock.ZB_20_21, { value: Zeitblock.ZB_20_21, title: "20 - 21 Uhr" }],
  [Zeitblock.ZB_21_22, { value: Zeitblock.ZB_21_22, title: "21 - 22 Uhr" }],
  [Zeitblock.ZB_22_23, { value: Zeitblock.ZB_22_23, title: "22 - 23 Uhr" }],
  [Zeitblock.ZB_23_24, { value: Zeitblock.ZB_23_24, title: "23 - 24 Uhr" }],
]);

export const BeschreibungToZeitblockStuendlich = new Map(
  [...zeitblockStuendlichInfo].reverse()
);
