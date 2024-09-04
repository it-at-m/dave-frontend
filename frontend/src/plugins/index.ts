import type { App } from "vue";

import i18n from "./i18n";
import pinia from "./pinia";
import router from "./router";
import vuetify from "./vuetify";

export function registerPlugins(app: App) {
  app.use(vuetify);
  app.use(router);
  app.use(i18n);
  app.use(pinia);
}
