import { ref } from "vue";
import { describe, it, expect } from "vitest";

import { useQjs } from "@/util/QjsUtils";

describe("QjsUtils", () => {

  // getStreetname ------------------------------------
  it("getStreetname: kurze Straße bleibt ein Element", () => {
    const { getStreetname } = useQjs();
    const result = getStreetname({ strassenname: "Hauptstr." } as any);
    expect(result).toEqual(["Hauptstr."]);
  });

  it("getStreetname: lange Straße mit 'str.' wird gesplittet", () => {
    const { getStreetname } = useQjs();
    const long = "SehrlangeBeispielstr.";
    const r = getStreetname({ strassenname: long } as any);
    expect(r.length).toBe(2);
    expect(r.join("")).toContain("str.");
  });

  it("getStreetname: kurzer Name mit Leerzeichen (<= 17 Zeichen) bleibt ein Element", () => {
    const { getStreetname } = useQjs();
    const res = getStreetname({ strassenname: "Kleine Allee" } as any);
    expect(res).toEqual(["Kleine Allee"]);
  });

  it("getStreetname: langer Name mit Leerzeichen (> 17 Zeichen) wird am ersten Leerzeichen gesplittet", () => {
    const { getStreetname } = useQjs();
    const longWithSpace = "VeryLongStreetname ExampleStreet";
    // length > 17 -> should split at first space
    const res = getStreetname({ strassenname: longWithSpace } as any);
    expect(res.length).toBe(2);
    expect(res[0].endsWith(" ")).toBe(true); // first part keeps trailing space
    expect(res[1]).toBe("ExampleStreet");
  });

  it("getStreetname: langer Name mit Bindestrich wird am Bindestrich gesplittet (Bindestrich bleibt im ersten Teil)", () => {
    const { getStreetname } = useQjs();
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
    const { getStreetname } = useQjs();
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
    const { getStreetname } = useQjs();
    const res = getStreetname(undefined);
    expect(res).toEqual([""]);
  });

  it("getStreetname: leerer strassenname liefert ein Array mit einem leeren String", () => {
    const { getStreetname } = useQjs();
    const res = getStreetname({ strassenname: "" } as any);
    expect(res).toEqual([""]);
  });

  // rotateSvgFor ----------------------------------
  it("rotateSvgFor: liefert korrekte Rotationen", () => {
    const { rotateSvgFor } = useQjs();

    const r1 = rotateSvgFor(ref([1]));
    expect(r1.value).toBe("rotate(-90,700,700)");

    const r2 = rotateSvgFor(ref([2]));
    expect(r2.value).toBe("rotate(0,700,700)");

    const r5 = rotateSvgFor(ref([5]));
    expect(r5.value).toBe("rotate(-45,700,700)");

    // Kombination: spätere Bedingungen überschreiben frühere
    const rCombo = rotateSvgFor(ref([1, 5]));
    // nach der Implementierung: 5 überschreibt 1 -> -45
    expect(rCombo.value).toBe("rotate(-45,700,700)");
  });

  // matchesArrowPattern ---------------------------------------
  it("matchesArrowPattern / hasAnyArrowPatternIn", () => {
    const { patternsArrowOne, matchesArrowPattern, hasAnyArrowPatternIn } = useQjs();

    const p = patternsArrowOne[0];
    expect(matchesArrowPattern(p, p)).toBe(true);

    const list = [{ von: p.von, nach: p.nach, strassenseite: p.strassenseite }];
    expect(hasAnyArrowPatternIn(list as any, patternsArrowOne)).toBe(true);

    // negatives Beispiel
    expect(hasAnyArrowPatternIn([], patternsArrowOne)).toBe(false);
  });

  // computeAvailableKnotenarmNummernFromZaehlung -----------------------------------
  it("computeAvailableKnotenarmNummernFromZaehlung: filtert und sortiert absteigend", () => {
    const { computeAvailableKnotenarmNummernFromZaehlung } = useQjs();

    const zaehlung = {
      knotenarme: [
        { nummer: 1, strassenname: "A" },
        { nummer: 3, strassenname: "C" },
        { nummer: 2, strassenname: "B" },
      ],
      verkehrsbeziehungen: [{ von: 1 }, { von: 2 }],
    } as any;

    const nums = computeAvailableKnotenarmNummernFromZaehlung(zaehlung);
    // Erwartet: nur 1 und 2, sortiert absteigend -> [2,1]
    expect(nums).toEqual([2, 1]);
  });
});