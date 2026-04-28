import { describe, expect, it } from "vitest";

import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import { useFjs } from "@/util/FjsUtils";

describe("FjsUtils", () => {
  // getStreetname ------------------------------------
  it("getStreetname: kurze Straße bleibt ein Element", () => {
    const { getStreetname } = useFjs();
    const result = getStreetname({ strassenname: "Hauptstr." } as any);
    expect(result).toEqual(["Hauptstr."]);
  });

  it("getStreetname: lange Straße mit 'str.' wird gesplittet", () => {
    const { getStreetname } = useFjs();
    const long = "SehrlangeBeispielstr.";
    const r = getStreetname({ strassenname: long } as any);
    expect(r.length).toBe(2);
    expect(r.join("")).toContain("str.");
  });

  it("getStreetname: kurzer Name mit Leerzeichen (<= 17 Zeichen) bleibt ein Element", () => {
    const { getStreetname } = useFjs();
    const res = getStreetname({ strassenname: "Kleine Allee" } as any);
    expect(res).toEqual(["Kleine Allee"]);
  });

  it("getStreetname: langer Name mit Leerzeichen (> 17 Zeichen) wird am ersten Leerzeichen gesplittet", () => {
    const { getStreetname } = useFjs();
    const longWithSpace = "VeryLongStreetname ExampleStreet";
    // length > 17 -> should split at first space
    const res = getStreetname({ strassenname: longWithSpace } as any);
    expect(res.length).toBe(2);
    expect(res[0].endsWith(" ")).toBe(true); // first part keeps trailing space
    expect(res[1]).toBe("ExampleStreet");
  });

  it("getStreetname: langer Name mit Bindestrich wird am Bindestrich gesplittet (Bindestrich bleibt im ersten Teil)", () => {
    const { getStreetname } = useFjs();
    const langeMitBindestrich = "EinSehrLanger-TeilRest";
    expect(langeMitBindestrich.length).toBeGreaterThan(17);

    const res = getStreetname({ strassenname: langeMitBindestrich } as any);

    expect(res.length).toBe(2);
    // Der erste Teil soll den Bindestrich am Ende enthalten
    expect(res[0].endsWith("-")).toBe(true);
    // Der zweite Teil ist alles hinter dem Bindestrich
    expect(res[1]).toBe("TeilRest");
  });

  it("getStreetname: wenn sowohl Bindestrich als auch Leerzeichen vorhanden sind, hat der Bindestrich Vorrang", () => {
    const { getStreetname } = useFjs();
    // Enthält sowohl "-" als auch " ", Länge > 17 -> erwartet Split am Bindestrich
    const both = "SehrLanger-Teil MitWeiterem";
    expect(both.length).toBeGreaterThan(17);

    const res = getStreetname({ strassenname: both } as any);

    expect(res.length).toBe(2);
    // Überprüfe, dass tatsächlich am Bindestrich geteilt wurde
    expect(res[0].endsWith("-")).toBe(true);
    // Der zweite Teil darf keine führenden Leerzeichen haben (es ist das direkte Substring nach "-")
    expect(res[1]).toBe("Teil MitWeiterem");
  });

  it("getStreetname: undefined knotenarm liefert ein Array mit einem leeren String", () => {
    const { getStreetname } = useFjs();
    const res = getStreetname(undefined);
    expect(res).toEqual([""]);
  });

  it("getStreetname: leerer strassenname liefert ein Array mit einem leeren String", () => {
    const { getStreetname } = useFjs();
    const res = getStreetname({ strassenname: "" } as any);
    expect(res).toEqual([""]);
  });

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
