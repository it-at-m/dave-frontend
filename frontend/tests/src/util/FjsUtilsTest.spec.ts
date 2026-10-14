import { describe, expect, it } from "vitest";

import { Bewegungsrichtung, Himmelsrichtung } from "@/api/client";
import { useFjs } from "@/util/FjsUtils";

describe("FjsUtils", () => {
  // computeAvailableKnotenarmNummernFromZaehlung -----------------------------------
  it("computeAvailableKnotenarmNummernFromZaehlung", () => {
    const { computeAvailableKnotenarmNummernFromZaehlung } = useFjs();

    const zaehlung = {
      knotenarme: [
        { nummer: 1, strassenname: "Straße A" },
        { nummer: 3, strassenname: "Straße B" },
      ],
    } as any;

    const nums = computeAvailableKnotenarmNummernFromZaehlung(zaehlung);
    // Erwartet: 1 und 3, aufsteigend sortiert -> [1,3]
    expect(nums).toEqual([1, 3]);
  });

  // existsLaengsverkehr -----------------------------------
  it("existsLaengsverkehr: für ausgewählte pfeile wird korrekt true/false zurückgegeben", () => {
    const { existsLaengsverkehr } = useFjs();

    const laengsverkehr = [
      { knotenarm: 1, richtung: "AUS", strassenseite: "W" },
      { knotenarm: 1, richtung: "AUS", strassenseite: "O" },
      { knotenarm: 1, richtung: "EIN", strassenseite: "W" },
      { knotenarm: 1, richtung: "EIN", strassenseite: "O" },
      { knotenarm: 3, richtung: "AUS", strassenseite: "O" },
      { knotenarm: 3, richtung: "EIN", strassenseite: "W" },
    ] as any;

    expect(
      existsLaengsverkehr(
        laengsverkehr,
        1,
        Himmelsrichtung.W,
        Bewegungsrichtung.Aus
      )
    ).toBe(true);
    expect(
      existsLaengsverkehr(
        laengsverkehr,
        1,
        Himmelsrichtung.O,
        Bewegungsrichtung.Aus
      )
    ).toBe(true);
    expect(
      existsLaengsverkehr(
        laengsverkehr,
        1,
        Himmelsrichtung.W,
        Bewegungsrichtung.Ein
      )
    ).toBe(true);
    expect(
      existsLaengsverkehr(
        laengsverkehr,
        1,
        Himmelsrichtung.O,
        Bewegungsrichtung.Ein
      )
    ).toBe(true);
    expect(
      existsLaengsverkehr(
        laengsverkehr,
        3,
        Himmelsrichtung.O,
        Bewegungsrichtung.Aus
      )
    ).toBe(true);
    expect(
      existsLaengsverkehr(
        laengsverkehr,
        3,
        Himmelsrichtung.W,
        Bewegungsrichtung.Ein
      )
    ).toBe(true);

    expect(
      existsLaengsverkehr(
        laengsverkehr,
        3,
        Himmelsrichtung.W,
        Bewegungsrichtung.Aus
      )
    ).toBe(false);
  });

  it("existsLaengsverkehr: knotenarm nicht vorhanden; sollte false zurückgeben", () => {
    const { existsLaengsverkehr } = useFjs();

    const laengsverkehr = [
      { knotenarm: 1, richtung: "AUS", strassenseite: "W" },
      { knotenarm: 1, richtung: "EIN", strassenseite: "O" },
    ] as any;

    expect(
      existsLaengsverkehr(
        laengsverkehr,
        2,
        Himmelsrichtung.W,
        Bewegungsrichtung.Aus
      )
    ).toBe(false);
  });

  describe("areLaengsverkehreEqual", () => {
    const { areLaengsverkehreEqual } = useFjs();
    it("returns true for identical laengsverkehr entries", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.Ein,
        },
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.Aus,
        },
      ] as any;
      const b = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.Ein,
        },
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.Aus,
        },
      ] as any;
      expect(areLaengsverkehreEqual(a, b)).toBe(true);
    });

    it("is order independent for laengsverkehr", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.Ein,
        },
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.Aus,
        },
      ] as any;
      const b = [
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.Aus,
        },
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.Ein,
        },
      ] as any;
      expect(areLaengsverkehreEqual(a, b)).toBe(true);
    });

    it("handles undefined/empty", () => {
      expect(areLaengsverkehreEqual(undefined, [])).toBe(true);
      expect(areLaengsverkehreEqual([], undefined)).toBe(true);
      expect(areLaengsverkehreEqual(undefined, undefined)).toBe(true);
    });

    it("returns false for different lengths", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.Ein,
        },
      ] as any;
      const b = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.Ein,
        },
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.Aus,
        },
      ] as any;
      expect(areLaengsverkehreEqual(a, b)).toBe(false);
    });

    it("returns false when richtung differs", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.Ein,
        },
      ] as any;
      const b = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.Aus,
        },
      ] as any;
      expect(areLaengsverkehreEqual(a, b)).toBe(false);
    });

    it("returns false when knotenarm differs", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.Ein,
        },
      ] as any;
      const b = [
        {
          knotenarm: 2,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.Ein,
        },
      ] as any;
      expect(areLaengsverkehreEqual(a, b)).toBe(false);
    });

    it("returns false when strassenseite differs", () => {
      const a = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.W,
          richtung: Bewegungsrichtung.Ein,
        },
      ] as any;
      const b = [
        {
          knotenarm: 1,
          strassenseite: Himmelsrichtung.N,
          richtung: Bewegungsrichtung.Ein,
        },
      ] as any;
      expect(areLaengsverkehreEqual(a, b)).toBe(false);
    });
  });
});
