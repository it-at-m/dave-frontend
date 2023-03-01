import KeyVal from "@/types/KeyVal";

enum Zeitblock {

  ZB_00_06 = 'ZB_00_06',
  ZB_06_10 = 'ZB_06_10',
  ZB_10_15 = 'ZB_10_15',
  ZB_15_19 = 'ZB_15_19',
  ZB_19_24 = 'ZB_19_24',
  ZB_00_24 = 'ZB_00_24',
  ZB_06_19 = 'ZB_06_19',
  ZB_06_22 = 'ZB_06_22',

}

export const zeitblockInfo = new Map<string, KeyVal>([
  [Zeitblock.ZB_00_06, {text: "0 - 6 Uhr", value: Zeitblock.ZB_00_06}],
  [Zeitblock.ZB_06_10, {text: "6 - 10 Uhr", value: Zeitblock.ZB_06_10}],
  [Zeitblock.ZB_10_15, {text: "10 - 15 Uhr", value: Zeitblock.ZB_10_15}],
  [Zeitblock.ZB_15_19, {text: "15 - 19 Uhr", value: Zeitblock.ZB_15_19}],
  [Zeitblock.ZB_19_24, {text: "19 - 24 Uhr", value: Zeitblock.ZB_19_24}],
  [Zeitblock.ZB_00_24, {text: "0 - 24 Uhr", value: Zeitblock.ZB_00_24}],
  [Zeitblock.ZB_06_19, {text: "6 - 19 Uhr", value: Zeitblock.ZB_06_19}],
  [Zeitblock.ZB_06_22, {text: "6 - 22 Uhr", value: Zeitblock.ZB_06_22}],
]);

export const BeschreibungToZeitblock = new Map([...zeitblockInfo].reverse());

export default Zeitblock;