import { beforeAll, describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { useAlternateRowColor } from "@/util/AlternateRowColorUtil";

describe("AlternateRowColorUtil.ts", () => {
  const { calcRowColor } = useAlternateRowColor();

  beforeAll(() => {
    createVuetify();
  });

  it("returns 'grey-lighten-4' when index is odd", () => {
    const index = 3;
    const color = calcRowColor(index);

    expect(color).toBe("grey-lighten-4");
  });

  it("returns 'grey-lighten-2' when index is even", () => {
    const index = 4;
    const color = calcRowColor(index);

    expect(color).toBe("grey-lighten-2");
  });
});
