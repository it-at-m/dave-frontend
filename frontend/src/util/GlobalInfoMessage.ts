export function useGlobalInfoMessage() {
  const NO_BELASTUNGSPLAN =
    "Bei fehlender Auswahl der Verkehrsart ist eine Anzeige des Belastungsplans nicht möglich.";

  const ZEITRAUM_GROESSER_FUENF_JAHRE =
    "Da der Zeitraum größer als 5 Jahre ist steht die Anzeige nicht zur Verfügung";

  const NO_DATA_AVAILABLE =
    "Für den angegebenen Zeitpunkt / Zeitraum liegen keine Daten vor.";

  return {
    NO_BELASTUNGSPLAN,
    ZEITRAUM_GROESSER_FUENF_JAHRE,
    NO_DATA_AVAILABLE,
  };
}
