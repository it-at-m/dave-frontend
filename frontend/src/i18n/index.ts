import Vue from "vue";
import VueI18n from "vue-i18n";
import DateTimeFormats = VueI18n.DateTimeFormats;

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
    },
};

Vue.use(VueI18n);

const i18n = new VueI18n({
    dateTimeFormats,
});

export default i18n;
