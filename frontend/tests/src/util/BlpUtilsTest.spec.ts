import { describe, expect, it } from "vitest";

import { useBlp } from "@/util/BlpUtils";

describe("BlpUtils", () => {
  // getStreetname ------------------------------------
  it("getStreetname: kurze Straße bleibt ein Element", () => {
    const { getStreetname } = useBlp();
    const result = getStreetname({ strassenname: "Hauptstr." } as any);
    expect(result).toEqual(["Hauptstr."]);
  });

  it("getStreetname: lange Straße mit 'str.' wird gesplittet", () => {
    const { getStreetname } = useBlp();
    const long = "SehrlangeBeispielstr.";
    const r = getStreetname({ strassenname: long } as any);
    expect(r.length).toBe(2);
    expect(r.join("")).toContain("str.");
  });

  it("getStreetname: kurzer Name mit Leerzeichen (<= 17 Zeichen) bleibt ein Element", () => {
    const { getStreetname } = useBlp();
    const res = getStreetname({ strassenname: "Kleine Allee" } as any);
    expect(res).toEqual(["Kleine Allee"]);
  });

  it("getStreetname: langer Name mit Leerzeichen (> 17 Zeichen) wird am ersten Leerzeichen gesplittet", () => {
    const { getStreetname } = useBlp();
    const longWithSpace = "VeryLongStreetname ExampleStreet";
    // length > 17 -> should split at first space
    const res = getStreetname({ strassenname: longWithSpace } as any);
    expect(res.length).toBe(2);
    expect(res[0].endsWith(" ")).toBe(true); // first part keeps trailing space
    expect(res[1]).toBe("ExampleStreet");
  });

  it("getStreetname: langer Name mit Bindestrich wird am Bindestrich gesplittet (Bindestrich bleibt im ersten Teil)", () => {
    const { getStreetname } = useBlp();
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
    const { getStreetname } = useBlp();
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
    const { getStreetname } = useBlp();
    const res = getStreetname(undefined);
    expect(res).toEqual([""]);
  });

  it("getStreetname: leerer strassenname liefert ein Array mit einem leeren String", () => {
    const { getStreetname } = useBlp();
    const res = getStreetname({ strassenname: "" } as any);
    expect(res).toEqual([""]);
  });
});
