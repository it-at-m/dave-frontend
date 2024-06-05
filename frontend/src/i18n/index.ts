import Vue from "vue";
import VueI18n from "vue-i18n";
import DateTimeFormats = VueI18n.DateTimeFormats;
import { createI18n } from "vue-i18n-composable";

const dateTimeFormats: DateTimeFormats = {
    "de-DE": {
        short: {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        },
        long: {
            year: "numeric",
            month: "short",
            day: "numeric",
        },
        time: {
            hour: "numeric",
            minute: "numeric",
        },
    },
};

Vue.use(VueI18n);

const i18n = createI18n({
    dateTimeFormats,
});

export default i18n;
