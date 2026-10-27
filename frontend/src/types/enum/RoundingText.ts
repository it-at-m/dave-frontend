import { Rounding } from "@/api/client";

export const roundingLabels: Record<Rounding, string> = {
  [Rounding.None]: "keine",
  [Rounding.R10]: "auf 10er",
  [Rounding.R100]: "auf 100er",
};

export const roundingItems = Object.values(Rounding).map((value) => ({
  key: value as Rounding,
  label: roundingLabels[value as Rounding],
}));
