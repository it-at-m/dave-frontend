import type KeyVal from "@/types/common/KeyVal";

enum ZeitblockStuendlich {
    ZB_00_01 = "ZB_00_01",
    ZB_01_02 = "ZB_01_02",
    ZB_02_03 = "ZB_02_03",
    ZB_03_04 = "ZB_03_04",
    ZB_04_05 = "ZB_04_05",
    ZB_05_06 = "ZB_05_06",
    ZB_06_07 = "ZB_06_07",
    ZB_07_08 = "ZB_07_08",
    ZB_08_09 = "ZB_08_09",
    ZB_09_10 = "ZB_09_10",
    ZB_10_11 = "ZB_10_11",
    ZB_11_12 = "ZB_11_12",
    ZB_12_13 = "ZB_12_13",
    ZB_13_14 = "ZB_13_14",
    ZB_14_15 = "ZB_14_15",
    ZB_15_16 = "ZB_15_16",
    ZB_16_17 = "ZB_16_17",
    ZB_17_18 = "ZB_17_18",
    ZB_18_19 = "ZB_18_19",
    ZB_19_20 = "ZB_19_20",
    ZB_20_21 = "ZB_20_21",
    ZB_21_22 = "ZB_21_22",
    ZB_22_23 = "ZB_22_23",
    ZB_23_24 = "ZB_23_24",
}

export const zeitblockStuendlichInfo = new Map<string, KeyVal>([
    [
        ZeitblockStuendlich.ZB_00_01,
        { value: ZeitblockStuendlich.ZB_00_01, title: "0 - 1 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_01_02,
        { value: ZeitblockStuendlich.ZB_01_02, title: "1 - 2 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_02_03,
        { value: ZeitblockStuendlich.ZB_02_03, title: "2 - 3 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_03_04,
        { value: ZeitblockStuendlich.ZB_03_04, title: "3 - 4 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_04_05,
        { value: ZeitblockStuendlich.ZB_04_05, title: "4 - 5 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_05_06,
        { value: ZeitblockStuendlich.ZB_05_06, title: "5 - 6 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_06_07,
        { value: ZeitblockStuendlich.ZB_06_07, title: "6 - 7 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_07_08,
        { value: ZeitblockStuendlich.ZB_07_08, title: "7 - 8 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_08_09,
        { value: ZeitblockStuendlich.ZB_08_09, title: "8 - 9 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_09_10,
        { value: ZeitblockStuendlich.ZB_09_10, title: "9 - 10 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_10_11,
        { value: ZeitblockStuendlich.ZB_10_11, title: "10 - 11 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_11_12,
        { value: ZeitblockStuendlich.ZB_11_12, title: "11 - 12 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_12_13,
        { value: ZeitblockStuendlich.ZB_12_13, title: "12 - 13 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_13_14,
        { value: ZeitblockStuendlich.ZB_13_14, title: "13 - 14 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_14_15,
        { value: ZeitblockStuendlich.ZB_14_15, title: "14 - 15 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_15_16,
        { value: ZeitblockStuendlich.ZB_15_16, title: "15 - 16 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_16_17,
        { value: ZeitblockStuendlich.ZB_16_17, title: "16 - 17 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_17_18,
        { value: ZeitblockStuendlich.ZB_17_18, title: "17 - 18 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_18_19,
        { value: ZeitblockStuendlich.ZB_18_19, title: "18 - 19 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_19_20,
        { value: ZeitblockStuendlich.ZB_19_20, title: "19 - 20 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_20_21,
        { value: ZeitblockStuendlich.ZB_20_21, title: "20 - 21 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_21_22,
        { value: ZeitblockStuendlich.ZB_21_22, title: "21 - 22 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_22_23,
        { value: ZeitblockStuendlich.ZB_22_23, title: "22 - 23 Uhr" },
    ],
    [
        ZeitblockStuendlich.ZB_23_24,
        { value: ZeitblockStuendlich.ZB_23_24, title: "23 - 24 Uhr" },
    ],
]);

export const BeschreibungToZeitblockStuendlich = new Map(
    [...zeitblockStuendlichInfo].reverse()
);

export default ZeitblockStuendlich;
