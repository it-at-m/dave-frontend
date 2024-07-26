import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { useAlternateRowColor } from "@/util/alternateRowColorComposable";

describe("alternateRowColorComposable.ts", () => {
  let vuetify: ReturnType<typeof createVuetify>;

  const { calcRowColor } = useAlternateRowColor();

  beforeAll(() => {
    createVuetify();
  });

  beforeEach(() => {
    vuetify = createVuetify({
      components,
      directives,
    });
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
