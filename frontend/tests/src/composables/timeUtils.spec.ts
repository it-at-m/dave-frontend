import {useTimeUtils} from "@/util/TimeUtils";
import {expect} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import Vue from "vue";
import i18n from "@/i18n";

describe("test", () => {
    beforeAll(() => {
        Vue.set(i18n, "i18n", i18n);
    });
    
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("ZeitraumGroesserFuenfJahre", () => {
        const timeUtils = useTimeUtils();
        const result = timeUtils.isDateRangeBiggerFiveYears([
            "2023-09-20",
            "2015-09-20",
        ]);
        const expected = true;

        expect(result).toBe(expected);
    });

    it("ZeitraumKleinerFuenfJahre", () => {
        const timeUtils = useTimeUtils();
        const result = timeUtils.isDateRangeBiggerFiveYears([
            "2023-09-20",
            "2020-09-21",
        ]);
        const expected = false;

        expect(result).toBe(expected);
    });

    it("ZeitraumExaktFuenfJahre", () => {
        const timeUtils = useTimeUtils();
        const result = timeUtils.isDateRangeBiggerFiveYears([
            "2023-09-20",
            "2018-09-20",
        ]);
        const expected = true;

        expect(result).toBe(expected);
    });

    it("ZeitraumKleinerFuenfJahreAtLimit", () => {
        const timeUtils = useTimeUtils();
        const result = timeUtils.isDateRangeBiggerFiveYears([
            "2023-09-20",
            "2018-09-21",
        ]);
        const expected = false;

        expect(result).toBe(expected);
    });

    it("ZeitraumLengthTooBig", () => {
        const timeUtils = useTimeUtils();
        const result = timeUtils.isDateRangeBiggerFiveYears([
            "2023-09-20",
            "2016-09-21",
            "2010-09-21",
        ]);
        const expected = false;

        expect(result).toBe(expected);
    });

    it("ZeitraumLengthTooShort", () => {
        const timeUtils = useTimeUtils();
        const result = timeUtils.isDateRangeBiggerFiveYears([
            "2023-09-20"
        ]);
        const expected = false;

        expect(result).toBe(expected);
    });
});
