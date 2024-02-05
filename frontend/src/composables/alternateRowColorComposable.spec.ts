import { useAlternateRowColor } from "@/composables/alternateRowColorComposable";
import Vuetify from "vuetify";
import Vue from "vue";

describe("alternateRowColorComposable.ts", () => {
    let vuetify: any;

    const { calcRowColor } = useAlternateRowColor();

    beforeAll(() => {
        Vue.use(Vuetify);
    });

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    it("returns 'grey lighten-4' when index is odd", () => {
        const index = 3;
        const color = calcRowColor(index);

        expect(color).toBe("grey lighten-4");
    });

    it("returns 'grey lighten-2' when index is even", () => {
        const index = 4;
        const color = calcRowColor(index);

        expect(color).toBe("grey lighten-2");
    });
});
