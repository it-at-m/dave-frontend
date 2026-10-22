import { TagesTyp, Zeitblock } from "@/api/client";

export function useEnumUtils() {
  /**
   * Versucht, aus einem beliebigen String eine Zeitblock-Konstante zu ermitteln.
   */
  function toZeitblock(input: string | undefined): Zeitblock | undefined {
    if (!input) {
      return undefined;
    }

    // Alle Schlüssel in Zeitblock durchgehen
    for (const value of Object.values(Zeitblock)) {
      if (value === input) {
        return value;
      }
    }
    // Falls kein Match gefunden wird, undefined zurückgeben
    return undefined;
  }

  /**
   * Versucht, aus einem beliebigen String eine TagesTyp-Konstante zu ermitteln.
   */
  function toTagesTyp(input: string | undefined): TagesTyp | undefined {
    if (!input) {
      return undefined;
    }

    // Alle Schlüssel in Zeitblock durchgehen
    for (const value of Object.values(TagesTyp)) {
      if (value === input) {
        return value;
      }
    }
    // Falls kein Match gefunden wird, undefined zurückgeben
    return undefined;
  }

  return {
    toZeitblock,
    toTagesTyp,
  };
}
