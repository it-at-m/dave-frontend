enum Bewegungsrichtung {
  EIN = "EIN",
  AUS = "AUS",
}

export default Bewegungsrichtung;

export const himmelsRichtungenTextLong: Map<string, string> = new Map<
  string,
  string
>([
  [Bewegungsrichtung.EIN, "Ein"],
  [Bewegungsrichtung.AUS, "Aus"],
]);

export const himmelsRichtungenTextShort: Map<string, string> = new Map<
  string,
  string
>([
  [Bewegungsrichtung.EIN, "Ein"],
  [Bewegungsrichtung.AUS, "Aus"],
]);
