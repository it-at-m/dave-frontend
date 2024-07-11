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

export const text2Monat = new Map<string, Monate>([
  [Monate.JANUAR, Monate.JANUAR],
  [Monate.FEBRUAR, Monate.FEBRUAR],
  [Monate.MAERZ, Monate.MAERZ],
  [Monate.APRIL, Monate.APRIL],
  [Monate.MAI, Monate.MAI],
  [Monate.JUNI, Monate.JUNI],
  [Monate.JULI, Monate.JULI],
  [Monate.AUGUST, Monate.AUGUST],
  [Monate.SEPTEMBER, Monate.SEPTEMBER],
  [Monate.OKTOBER, Monate.OKTOBER],
  [Monate.NOVEMBER, Monate.NOVEMBER],
  [Monate.DEZEMBER, Monate.DEZEMBER],
]);

export enum Quartale {
  QUARTAL_1 = "1. Quartal (Jan - März)",
  QUARTAL_2 = "2. Quartal (Apr - Juni)",
  QUARTAL_3 = "3. Quartal (Juli - Sept)",
  QUARTAL_4 = "4. Quartal (Okt - Dez)",
}

export const text2Quartal = new Map<string, Quartale>([
  [Quartale.QUARTAL_1, Quartale.QUARTAL_1],
  [Quartale.QUARTAL_2, Quartale.QUARTAL_2],
  [Quartale.QUARTAL_3, Quartale.QUARTAL_3],
  [Quartale.QUARTAL_4, Quartale.QUARTAL_4],
]);

export enum Halbjahre {
  HALBJAHR_1 = "1. Halbjahr (Jan - Juni)",
  HALBJAHR_2 = "2. Halbjahr (Juli - Dez)",
}

export const text2HalbJahr = new Map<string, Halbjahre>([
  [Halbjahre.HALBJAHR_1, Halbjahre.HALBJAHR_1],
  [Halbjahre.HALBJAHR_1, Halbjahre.HALBJAHR_2],
]);

export enum ZeitintervallCategories {
  JAHRE = "Jahre",
  HALBJAHRE = "Halbjahre",
  QUARTALE = "Quartale",
  MONATE = "Monate",
}
