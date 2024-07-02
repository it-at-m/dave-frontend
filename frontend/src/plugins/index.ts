import type { App } from "vue";

import i18n from "@/i18n";
import router from "@/router";
import pinia from "./pinia";
import vuetify from "./vuetify";

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(i18n).use(pinia);
}
