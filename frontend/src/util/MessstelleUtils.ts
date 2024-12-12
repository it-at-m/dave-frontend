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

  function getSelectedVerkehrsartAsText(fahrzeugOptions: FahrzeugOptions) {
    let selectedVerkehrsartAsText = "unbekannt";
    if (fahrzeugOptions.busse) {
      selectedVerkehrsartAsText = "Bus";
    } else if (fahrzeugOptions.fussverkehr) {
      selectedVerkehrsartAsText = "Fuß";
    } else if (fahrzeugOptions.gueterverkehr) {
      selectedVerkehrsartAsText = "GV";
    } else if (fahrzeugOptions.kraftraeder) {
      selectedVerkehrsartAsText = "Krad";
    } else if (fahrzeugOptions.lastzuege) {
      selectedVerkehrsartAsText = "Lz";
    } else if (fahrzeugOptions.gueterverkehrsanteilProzent) {
      selectedVerkehrsartAsText = "GV_Anteil";
    } else if (fahrzeugOptions.kraftfahrzeugverkehr) {
      selectedVerkehrsartAsText = "Kfz";
    } else if (fahrzeugOptions.lastkraftwagen) {
      selectedVerkehrsartAsText = "Lkw";
    } else if (fahrzeugOptions.lieferwagen) {
      selectedVerkehrsartAsText = "Lfw";
    } else if (fahrzeugOptions.personenkraftwagen) {
      selectedVerkehrsartAsText = "Pkw";
    } else if (fahrzeugOptions.radverkehr) {
      selectedVerkehrsartAsText = "Rad";
    } else if (fahrzeugOptions.schwerverkehr) {
      selectedVerkehrsartAsText = "SV";
    } else if (fahrzeugOptions.schwerverkehrsanteilProzent) {
      selectedVerkehrsartAsText = "SV_Anteil";
    }
    return selectedVerkehrsartAsText;
  }

  return {
    alleRichtungen,
    isZeitauswahlSpitzenstunde,
    hasSelectedFahrzeugkategorie,
    hasSelectedVerkehrsarten,
    getSelectedVerkehrsartAsText,
  };
}
