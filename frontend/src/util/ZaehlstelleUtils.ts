import type LadeZaehlung from "@/types/zaehlung/LadeZaehlung";
import type Options from "@/types/zaehlung/Options";

import { isEmpty } from "lodash";

export function useZaehlstelleUtils() {
  /**
   * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
   * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
   */
  function isTypeDisabled(type: string, zaehlung: LadeZaehlung): boolean {
    if (zaehlung === undefined || zaehlung.kategorien === undefined) {
      return true;
    }
    return !zaehlung.kategorien.includes(type);
  }

  function hasSelectedVerkehrsarten(options: Options) {
    // Im Fall der Auswahl von Differenzdatendarstellung muss mind. eine Verkehrsart KEIN Anteil sein
    if (
      options.differenzdatenDarstellen &&
      !isEmpty(options.vergleichszaehlungsId)
    ) {
      return (
        options.kraftfahrzeugverkehr ||
        options.schwerverkehr ||
        options.gueterverkehr ||
        options.radverkehr ||
        options.fussverkehr
      );
    }
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

  function hasSelectedFahrzeugkategorie(options: Options) {
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
