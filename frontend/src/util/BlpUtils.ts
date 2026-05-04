// Hilfsfunktion für die Darstellung von Qjs-Zählungen
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";

export function useBlp() {
  /**
   * Extrahiert und splittet den Straßennamen eines Knotenarms
   * @param knotenarm optionaler Knotenarm DTO
   * @returns Array<string> mit einem oder zwei Elementen (falls gesplittet)
   */
  function getStreetname(
    knotenarm: LadeKnotenarmDTO | undefined
  ): Array<string> {
    let strasse = "";
    if (knotenarm && knotenarm.strassenname) {
      strasse = knotenarm.strassenname;
    }
    let pieces = [strasse];
    const zeichen = strasse.length;
    // Anzahl Zeichen
    if (zeichen > 17) {
      pieces = ["", ""];
      // Straße
      if (strasse.endsWith("str.")) {
        const index = strasse.indexOf("str.");
        pieces[0] = strasse.substring(0, zeichen - "str.".length);
        pieces[1] = strasse.substring(index);
      }
      if (strasse.endsWith("straße")) {
        const index = strasse.indexOf("straße");
        pieces[0] = strasse.substring(0, zeichen - "straße".length);
        pieces[1] = strasse.substring(index);
      }
      // Platz
      if (strasse.endsWith("pl.")) {
        const index = strasse.indexOf("pl.");
        pieces[0] = strasse.substring(0, zeichen - "pl.".length);
        pieces[1] = strasse.substring(index);
      }
      if (strasse.endsWith("platz")) {
        const index = strasse.indexOf("platz");
        pieces[0] = strasse.substring(0, zeichen - "platz".length);
        pieces[1] = strasse.substring(index);
      }
      // Weg
      if (strasse.endsWith("weg")) {
        const index = strasse.indexOf("weg");
        pieces[0] = strasse.substring(0, zeichen - "weg".length);
        pieces[1] = strasse.substring(index);
      }
      // Bindestrich
      if (strasse.includes("-")) {
        const index = strasse.indexOf("-");
        pieces[0] = strasse.substring(0, index + "-".length);
        pieces[1] = strasse.substring(index + 1);
      }
      // Leerzeichen
      else if (strasse.includes(" ")) {
        const index = strasse.indexOf(" ");
        pieces[0] = strasse.substring(0, index + " ".length);
        pieces[1] = strasse.substring(index + 1);
      }
    }
    return pieces;
  }

  return {
    getStreetname,
  };
}
