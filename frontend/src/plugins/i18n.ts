import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  datetimeFormats: {
    "de-DE": {
      short: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
      long: {
        year: "numeric",
        month: "short",
        day: "2-digit",
      },
      time: {
        hour: "2-digit",
        minute: "2-digit",
      },
    },
  },
});

export default i18n;
