import Vue, {VNode} from 'vue';
import 'babel-polyfill';
import Vuetify from "./plugins/vuetify";
import store from './store';
import i18n from "./i18n"
import App from './App.vue';
import router from "./router";
import moment from "moment";
import './directives/infinitescroll';
import './plugins/leafletmaps';
import ECharts from 'vue-echarts';
import './registerServiceWorker'

import 'roboto-fontface/css/roboto/roboto-fontface.css'

Vue.config.productionTip = false;

Vue.component('v-chart', ECharts)

moment.locale(window.navigator.language);

new Vue({
  router,
  store: store,
  vuetify: Vuetify,
  i18n,
  render: (h): VNode => h(App),
}).$mount('#app');
