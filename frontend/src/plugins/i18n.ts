import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  datetimeFormats: {
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
  },
});

export default i18n;
