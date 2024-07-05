import type { App } from "vue";

import pinia from "./pinia";
import vuetify from "./vuetify";
import i18n from "./i18n";
import router from "./router";

export function registerPlugins(app: App) {
  app.use(vuetify);
  app.use(router);
  app.use(i18n);
  app.use(pinia);
}
