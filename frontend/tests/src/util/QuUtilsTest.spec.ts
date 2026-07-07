import { describe, expect, it } from "vitest";

import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
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

  describe("areVerkehrsbeziehungenEqual", () => {
    const { areQuerungsverkehreEqual } = useQu();
    it("returns true for two identical arrays", () => {
      const a = [
        { knotenarm: 1, richtung: Himmelsrichtung.N },
        { knotenarm: 2, richtung: Himmelsrichtung.O },
      ] as any;
      const b = [
        { knotenarm: 1, richtung: Himmelsrichtung.N },
        { knotenarm: 2, richtung: Himmelsrichtung.O },
      ] as any;
      expect(areQuerungsverkehreEqual(a, b)).toBe(true);
    });

    it("is order independent", () => {
      const a = [
        { knotenarm: 1, richtung: Himmelsrichtung.N },
        { knotenarm: 2, richtung: Himmelsrichtung.O },
      ] as any;
      const b = [
        { knotenarm: 2, richtung: Himmelsrichtung.O },
        { knotenarm: 1, richtung: Himmelsrichtung.N },
      ] as any;
      expect(areQuerungsverkehreEqual(a, b)).toBe(true);
    });

    it("treats undefined as empty array", () => {
      expect(areQuerungsverkehreEqual(undefined, [])).toBe(true);
      expect(areQuerungsverkehreEqual([], undefined)).toBe(true);
      expect(areQuerungsverkehreEqual(undefined, undefined)).toBe(true);
    });

    it("returns false for different lengths", () => {
      const a = [{ knotenarm: 1, richtung: Himmelsrichtung.N }] as any;
      const b = [
        { knotenarm: 1, richtung: Himmelsrichtung.N },
        { knotenarm: 2, richtung: Himmelsrichtung.O },
      ] as any;
      expect(areQuerungsverkehreEqual(a, b)).toBe(false);
    });

    it("returns false when richtung differs", () => {
      const a = [{ knotenarm: 1, richtung: Himmelsrichtung.N }] as any;
      const c = [{ knotenarm: 1, richtung: Himmelsrichtung.O }] as any; // different richtung
      expect(areQuerungsverkehreEqual(a, c)).toBe(false);
    });

    it("returns false when knotenarm differs", () => {
      const a = [{ knotenarm: 1, richtung: Himmelsrichtung.N }] as any;
      const d = [{ knotenarm: 2, richtung: Himmelsrichtung.N }] as any; // different knotenarm
      expect(areQuerungsverkehreEqual(a, d)).toBe(false);
    });
  });
});
