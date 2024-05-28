import Vue, { VNode } from "vue";
import Vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import store from "./store";
import "./directives/infinitescroll";
import "./plugins/leafletmaps";
import i18n from "./i18n";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.config.productionTip = false;

moment.locale(window.navigator.language);

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
    router,
    pinia,
    store: store,
    vuetify: Vuetify,
    i18n,
    render: (h): VNode => h(App),
}).$mount("#app");
