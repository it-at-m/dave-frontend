import Zeitauswahl from "@/types/enum/Zeitauswahl";

export function useMessstelleUtils() {
  const alleRichtungen = "Alle Richtungen";

  function isZeitauswahlSpitzenstunde(zeitauswahl: string): boolean {
    return (
      zeitauswahl == Zeitauswahl.SPITZENSTUNDE_KFZ ||
      zeitauswahl == Zeitauswahl.SPITZENSTUNDE_RAD ||
      zeitauswahl == Zeitauswahl.SPITZENSTUNDE_FUSS
    );
  }

  return {
    alleRichtungen,
    isZeitauswahlSpitzenstunde,
  };
}
