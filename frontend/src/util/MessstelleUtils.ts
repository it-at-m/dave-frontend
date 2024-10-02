import type FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";

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

  function hasSelectedVerkehrsarten(fahrzeugOptions: FahrzeugOptions) {
    return (
      fahrzeugOptions.kraftfahrzeugverkehr ||
      fahrzeugOptions.schwerverkehr ||
      fahrzeugOptions.gueterverkehr ||
      fahrzeugOptions.schwerverkehrsanteilProzent ||
      fahrzeugOptions.gueterverkehrsanteilProzent ||
      fahrzeugOptions.radverkehr ||
      fahrzeugOptions.fussverkehr
    );
  }

  function hasSelectedFahrzeugkategorie(fahrzeugOptions: FahrzeugOptions) {
    return (
      fahrzeugOptions.kraftraeder ||
      fahrzeugOptions.lastzuege ||
      fahrzeugOptions.lastkraftwagen ||
      fahrzeugOptions.busse ||
      fahrzeugOptions.lieferwagen ||
      fahrzeugOptions.personenkraftwagen
    );
  }

  return {
    alleRichtungen,
    isZeitauswahlSpitzenstunde,
    hasSelectedFahrzeugkategorie,
    hasSelectedVerkehrsarten,
  };
}
