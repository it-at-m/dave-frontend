import { describe, expect, it } from "vitest";

import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
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

  // isLaengsverkehrAvailable -----------------------------------
  it("isLaengsverkehrAvailable: für ausgewählte pfeile wird korrekt true/false zurückgegeben", () => {
    const { isLaengsverkehrAvailable } = useFjs();

    const laengsverkehr = [
      { knotenarm: 1, richtung: "AUS", strassenseite: "W" },
      { knotenarm: 1, richtung: "AUS", strassenseite: "O" },
      { knotenarm: 1, richtung: "EIN", strassenseite: "W" },
      { knotenarm: 1, richtung: "EIN", strassenseite: "O" },
      { knotenarm: 3, richtung: "AUS", strassenseite: "O" },
      { knotenarm: 3, richtung: "EIN", strassenseite: "W" },
    ] as any;

    expect(
      isLaengsverkehrAvailable(
        1,
        Himmelsrichtung.W,
        Bewegungsrichtung.AUS,
        laengsverkehr
      )
    ).toBe(true);
    expect(
      isLaengsverkehrAvailable(
        1,
        Himmelsrichtung.O,
        Bewegungsrichtung.AUS,
        laengsverkehr
      )
    ).toBe(true);
    expect(
      isLaengsverkehrAvailable(
        1,
        Himmelsrichtung.W,
        Bewegungsrichtung.EIN,
        laengsverkehr
      )
    ).toBe(true);
    expect(
      isLaengsverkehrAvailable(
        1,
        Himmelsrichtung.O,
        Bewegungsrichtung.EIN,
        laengsverkehr
      )
    ).toBe(true);
    expect(
      isLaengsverkehrAvailable(
        3,
        Himmelsrichtung.O,
        Bewegungsrichtung.AUS,
        laengsverkehr
      )
    ).toBe(true);
    expect(
      isLaengsverkehrAvailable(
        3,
        Himmelsrichtung.W,
        Bewegungsrichtung.EIN,
        laengsverkehr
      )
    ).toBe(true);

    expect(
      isLaengsverkehrAvailable(
        3,
        Himmelsrichtung.W,
        Bewegungsrichtung.AUS,
        laengsverkehr
      )
    ).toBe(false);
  });

  it("isLaengsverkehrAvailable: knotenarm nicht vorhanden; sollte false zurückgeben", () => {
    const { isLaengsverkehrAvailable } = useFjs();

    const laengsverkehr = [
      { knotenarm: 1, richtung: "AUS", strassenseite: "W" },
      { knotenarm: 1, richtung: "EIN", strassenseite: "O" },
    ] as any;

    expect(
      isLaengsverkehrAvailable(
        2,
        Himmelsrichtung.W,
        Bewegungsrichtung.AUS,
        laengsverkehr
      )
    ).toBe(false);
  });
});
