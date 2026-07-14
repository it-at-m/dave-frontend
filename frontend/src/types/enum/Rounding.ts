export enum Rounding {
  // keine Rundung
  NONE = "NONE",
  // auf 10er
  R10 = "R10",
  // auf 100er
  R100 = "R100",
}

export const roundingLabels: Record<Rounding, string> = {
  [Rounding.NONE]: "keine",
  [Rounding.R10]: "auf 10er",
  [Rounding.R100]: "auf 100er",
};

export const roundingList = Object.values(Rounding).map((value) => ({
  key: value as Rounding,
  label: roundingLabels[value as Rounding],
}));

export default Rounding;
