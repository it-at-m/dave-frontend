import { describe, expect, it } from "vitest";
import { ref } from "vue";

import { useQjs } from "@/util/QjsUtils";

describe("QjsUtils", () => {
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
    const { patternsArrowOne, matchesArrowPattern, hasAnyArrowPatternIn } =
      useQjs();

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
