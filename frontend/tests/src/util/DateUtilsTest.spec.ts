import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { useDateUtils } from "@/util/DateUtils";

describe("DateUtilsTest", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("isGreaterThanFiveYears", () => {
    let startDate: Date | undefined = undefined;
    let endDate: Date | undefined = undefined;
    let result = useDateUtils().isGreaterThanFiveYears(startDate, endDate);
    expect(result).toBe(false);

    startDate = new Date(2020, 1, 24);
    endDate = undefined;
    result = useDateUtils().isGreaterThanFiveYears(startDate, endDate);
    expect(result).toBe(false);

    startDate = undefined;
    endDate = new Date(2025, 1, 25);
    result = useDateUtils().isGreaterThanFiveYears(startDate, endDate);
    expect(result).toBe(false);

    startDate = new Date(2020, 1, 24);
    endDate = new Date(2025, 1, 25);
    result = useDateUtils().isGreaterThanFiveYears(startDate, endDate);
    expect(result).toBe(true);

    startDate = new Date(2020, 1, 25);
    endDate = new Date(2025, 1, 25);
    result = useDateUtils().isGreaterThanFiveYears(startDate, endDate);
    expect(result).toBe(true);

    startDate = new Date(2020, 1, 26);
    endDate = new Date(2025, 1, 25);
    result = useDateUtils().isGreaterThanFiveYears(startDate, endDate);
    expect(result).toBe(false);

    startDate = new Date(2020, 1, 27);
    endDate = new Date(2025, 1, 25);
    result = useDateUtils().isGreaterThanFiveYears(startDate, endDate);
    expect(result).toBe(false);

    startDate = new Date(2020, 2, 17);
    endDate = new Date(2025, 2, 16);
    result = useDateUtils().isGreaterThanFiveYears(startDate, endDate);
    expect(result).toBe(false);

    startDate = new Date(2020, 2, 17);
    endDate = new Date(2025, 2, 17);
    result = useDateUtils().isGreaterThanFiveYears(startDate, endDate);
    expect(result).toBe(true);

    startDate = new Date(2020, 2, 17);
    endDate = new Date(2025, 2, 18);
    result = useDateUtils().isGreaterThanFiveYears(startDate, endDate);
    expect(result).toBe(true);
  });
});
