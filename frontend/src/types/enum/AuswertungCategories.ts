import Himmelsrichtungen from "@/types/enum/Himmelsrichtungen";

export enum Monate {
    JANUAR = "Januar",
    FEBRUAR = "Februar",
    MAERZ = "März",
    APRIL = "April",
    MAI = "Mai",
    JUNI = "Juni",
    JULI = "Juli",
    AUGUST = "August",
    SEPTEMBER = "September",
    OKTOBER = "Oktober",
    NOVEMBER = "November",
    DEZEMBER = "Dezember",
}

export enum Quartale {
    QUARTAL_1 = "1. Quartal (Jan - März)",
    QUARTAL_2 = "2. Quartal (Apr - Juni)",
    QUARTAL_3 = "3. Quartal (Juli - Sept)",
    QUARTAL_4 = "4. Quartal (Okt - Dez)",
}

export enum Halbjahre {
    HALBJAHR_1 = "1. Halbjahr (Jan - Juni)",
    HALBJAHR_2 = "2. Halbjahr (Juli - Dez)",
}

export enum ZeitintervallCategories {
    JAHRE = "Jahre",
    HALBJAHRE = "Halbjahre",
    QUARTALE = "Quartale",
    MONATE = "Monate",
}

export const categorieAsNumber: Map<string, number> = new Map<string, number>([
    [Monate.JANUAR, 0],
    [Monate.FEBRUAR, 1],
    [Monate.MAERZ, 2],
    [Monate.APRIL, 3],
    [Monate.MAI, 4],
    [Monate.JUNI, 5],
    [Monate.JULI, 6],
    [Monate.AUGUST, 7],
    [Monate.SEPTEMBER, 8],
    [Monate.OKTOBER, 9],
    [Monate.NOVEMBER, 10],
    [Monate.DEZEMBER, 11],
    [Quartale.QUARTAL_1, 2],
    [Quartale.QUARTAL_1, 2],
    [Quartale.QUARTAL_1, 2],
    [Quartale.QUARTAL_1, 2],
    [Halbjahre.HALBJAHR_1, 5],
    [Halbjahre.HALBJAHR_2, 11],
]);
