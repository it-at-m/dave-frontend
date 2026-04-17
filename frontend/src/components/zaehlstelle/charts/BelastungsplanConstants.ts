export const BelastungsplanConstants = {
  // Farben der Knotenarme
  farben: new Map<number, string>([
    [1, "#000000"],
    [2, "#F44336"],
    [3, "#4CAF50"],
    [4, "#2196F3"],
    [5, "#CDDC39"],
    [6, "#9C27B0"],
    [7, "#FF9800"],
    [8, "#795548"],
  ]),

  fontfamily: "Roboto, Arial, Helvetica, sans-serif",

  // Farben Differenzdatendarstellung
  zunahmeValueColor: "#F44336",
  abnahmeValueColor: "#4CAF50",
  gleichValueColor: "#000000",
  inaktivColor: "#E0E0E0",

  // kleinstmögliche Skalierung eines Pfeils, damit er überhaupt angezeigt wird
  minimum_arrow_scale: 0.005
} as const;
