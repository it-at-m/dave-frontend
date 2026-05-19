import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";

export function useStrassennameUtils() {
  /**
   * Extrahiert und splittet den Straßennamen eines Knotenarms
   * @param knotenarm optionaler Knotenarm DTO
   * @param maxChars maximale Zeichenanzahl in der ersten Zeile (Default: 20)
   * @returns Array<string> mit einem oder zwei Elementen (falls gesplittet)
   */
  function getStreetname(
    knotenarm: LadeKnotenarmDTO | undefined,
    maxChars = 17
  ): Array<string> {
    const strasse = (knotenarm?.strassenname ?? "").trim();
    if (!strasse) {
      return [""];
    }

    // Kurzfall: passt komplett
    if (strasse.length <= maxChars) {
      return [strasse];
    }

    // 1) Fallback: An Leerstelle trennen falls vorhanden
    const lastSpaceBefore = strasse.lastIndexOf(" ");
    if (lastSpaceBefore > 0 && lastSpaceBefore < strasse.length - 1) {
      return [
        strasse.substring(0, lastSpaceBefore + 1).trim(),
        strasse.substring(lastSpaceBefore + 1).trim(),
      ];
    }

    const lower = strasse.toLowerCase();

    // 2) Bekannte Suffixe (ähnlich wie bisher), wenn am Ende vorhanden
    const suffixes = [
      "str.",
      "strasse",
      "straße",
      "str",
      "pl.",
      "platz",
      "allee",
      "ring",
      "weg",
      "brücke",
      "damm",
    ];
    for (const suf of suffixes) {
      if (lower.endsWith(suf)) {
        const idx = lower.lastIndexOf(suf);
        if (idx > 0) {
          const value = strasse.substring(0, idx).trim();
          return [
            value.endsWith("-") ? value : value + "-",
            strasse.substring(idx).trim(),
          ];
        }
      }
    }

    // 3) Split an existierendem Bindestrich (macht Sinn bei Komposita)
    const hyphenPos = strasse.indexOf("-");
    if (hyphenPos > 0 && hyphenPos < strasse.length - 1) {
      return [
        strasse.substring(0, hyphenPos + 1).trim(), // Bindestrich am Ende der ersten Zeile
        strasse.substring(hyphenPos + 1).trim(),
      ];
    }

    // 4) Intelligentes Wort-Batching über Intl.Segmenter (wenn verfügbar)
    try {
      // Segmenter liefert Wort-/Whitespace-Sequenzen, die wir aneinanderfügen können
      // Ziel: so viele ganze Segmente in Zeile 1 packen wie möglich (<= maxChars)
      // Rest in Zeile 2
      // Für German locale; kann ggf. parametrisiert werden
      // @ts-ignore - Intl.Segmenter Type ggf. nicht vorhanden in TS-Lib
      if (typeof Intl !== "undefined" && (Intl as any).Segmenter) {
        // 'word' granularity gibt uns sinnvolle Wort/Trennstellen
        const seg = new (Intl as any).Segmenter("de", { granularity: "word" });
        const segments = Array.from(seg.segment(strasse)).map(
          (s: any) =>
            // s.segment enthält das Textstück (inkl. ggf. spaces/punct)
            s.segment
        );

        let first = "";
        let i = 0;
        while (
          i < segments.length &&
          (first + segments[i]).length <= maxChars
        ) {
          first += segments[i];
          i++;
        }

        // Falls nicht einmal ein Segment passt (sehr langes Wort), fallback weiter unten
        if (i > 0) {
          const rest = segments.slice(i).join("").trim();
          return [first.trim(), rest];
        }
      }
    } catch (e) {
      // Segmenter ggf. nicht verfügbar — einfach weitermachen zu Fallbacks
    }

    // 5) Letzte Rettung: mittig schneiden (mit optionaler Silbentrennung würde das verbessert)
    const mid = Math.ceil(strasse.length / 2);
    return [
      strasse.substring(0, mid).trim() + "-",
      strasse.substring(mid).trim(),
    ];
  }

  function balanceLines(streetnameTokens: string[], separator = " ") {
    // Wenn getStreetname.maxChars nicht überschritten wird
    if (streetnameTokens.length === 1) return streetnameTokens;

    const firstLine = streetnameTokens[0];
    // Prüfe, ob die erste Zeile mit einem Trenner endet
    const firstLineEndsWithSeparator = /[ -]$/.test(firstLine);
    const separatorAtEnd = firstLineEndsWithSeparator
      ? firstLine.slice(-1)
      : "";

    // Extrahiere alle Token (ohne Trenner am Ende der ersten Zeile)
    const allTokens = streetnameTokens.flatMap((line) =>
      line
        .replace(/[ -]$/, "")
        .split(/[ -]+/)
        .filter((token) => token.length > 0)
    );

    // Ziel: beide Zeilen sollen so kurz wie möglich und gleich lang sein
    let bestSplitIndex = 0;
    let minMaxLength = Infinity;

    // Durch alle möglichen Aufteilungen iterieren
    for (let i = 0; i <= allTokens.length; i++) {
      const firstLineTokens = allTokens.slice(0, i);
      const secondLineTokens = allTokens.slice(i);

      const firstLineLength = firstLineTokens.join("").length;
      const secondLineLength = secondLineTokens.join("").length;
      const maxLength = Math.max(firstLineLength, secondLineLength);

      // Prüfe, ob diese Aufteilung besser ist
      if (maxLength < minMaxLength) {
        minMaxLength = maxLength;
        bestSplitIndex = i;
      }
    }

    // Erstelle die beiden Zeilen mit dem angegebenen Trenner
    let firstLineResult = allTokens.slice(0, bestSplitIndex).join(separator);
    const secondLineResult = allTokens.slice(bestSplitIndex).join(separator);

    // Füge den Trenner am Ende der ersten Zeile hinzu, falls er im Input vorhanden war
    if (firstLineEndsWithSeparator) {
      firstLineResult += separatorAtEnd;
    }

    return [firstLineResult, secondLineResult];
  }

  function getMostFrequentSeparator(array: string[]) {
    let spaceCount = 0;
    let dashCount = 0;

    for (const line of array) {
      // Zähle Leerzeichen
      spaceCount += (line.match(/ /g) || []).length;
      // Zähle Bindestriche
      dashCount += (line.match(/-/g) || []).length;
    }

    return spaceCount >= dashCount ? " " : "-";
  }

  /**
   * Liefert die beiden Zeilen (first/second) direkt für einen Knotenarm.
   * Intern ruft diese Funktion die Tokenisierung (getStreetname / Segmenter) und dann
   * balanceLines auf.
   */
  function getStreetLines(
    knotenarm: LadeKnotenarmDTO | undefined,
    maxChars?: number
  ): Array<string> {
    const pieces = getStreetname(knotenarm, maxChars);
    return balanceLines(pieces, getMostFrequentSeparator(pieces));
  }

  return {
    getStreetLines,
  };
}
