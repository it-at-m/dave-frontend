import Vue from "vue";
import VueI18n from "vue-i18n";

const dateTimeFormats = {
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

const i18n = new VueI18n({
    dateTimeFormats,
});

export default i18n;
