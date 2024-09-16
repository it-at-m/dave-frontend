import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";

export function useZaehlstelleUtils() {
  /**
   * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
   * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
   */
  function isTypeDisabled(type: string, zaehlung: LadeZaehlungDTO): boolean {
    if (zaehlung === undefined || zaehlung.kategorien === undefined) {
      return true;
    }
    return !zaehlung.kategorien.includes(type);
  }

  function hasSelectedVerkehrsarten(options: OptionsDTO) {
    return (
      options.kraftfahrzeugverkehr ||
      options.schwerverkehr ||
      options.gueterverkehr ||
      options.schwerverkehrsanteilProzent ||
      options.gueterverkehrsanteilProzent ||
      options.radverkehr ||
      options.fussverkehr
    );
  }

  function hasSelectedFahrzeugkategorie(options: OptionsDTO) {
    return (
      options.pkwEinheiten ||
      options.kraftraeder ||
      options.lastzuege ||
      options.lastkraftwagen ||
      options.busse ||
      options.personenkraftwagen
    );
  }

  return {
    isTypeDisabled,
    hasSelectedFahrzeugkategorie,
    hasSelectedVerkehrsarten,
  };
}
