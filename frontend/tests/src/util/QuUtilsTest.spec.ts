import { describe, expect, it } from "vitest";

import { useQu } from "@/util/QuUtils";

describe("QuUtils", () => {
  it("computeAvailableKnotenarme: entfernt Duplikate und sortiert aufsteigend", () => {
    const { computeAvailableKnotenarme } = useQu();

    const zaehlung = {
      knotenarme: [
        { nummer: 3, strassenname: "C" },
        { nummer: 1, strassenname: "A" },
        { nummer: 2, strassenname: "B" },
        // Duplikat-Nummer: sollte das letzte Element mit dieser Nummer übernehmen
        { nummer: 2, strassenname: "B-dup" },
      ],
    } as any;

    const result = computeAvailableKnotenarme(zaehlung);

    // Erwartet: Nummern aufsteigend und Duplikate entfernt
    expect(result.map((k) => k.nummer)).toEqual([1, 2, 3]);

    // Das Element mit nummer 2 ist das zuletzt auftretende (B-dup)
    const item2 = result.find((k) => k.nummer === 2);
    expect(item2).toBeDefined();
    expect(item2?.strassenname).toBe("B-dup");
  });

  it("computeAvailableKnotenarme: liefert leeres Array wenn keine Knotenarme vorhanden", () => {
    const { computeAvailableKnotenarme } = useQu();

    const zaehlung = { knotenarme: [] } as any;
    const result = computeAvailableKnotenarme(zaehlung);
    expect(result).toEqual([]);
  });
});
