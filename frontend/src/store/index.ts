import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import snackbar from "./modules/snackbar";
import security from "./modules/security";
import search from "./modules/search";
import filteroptions from "./modules/filteroptions";
import zaehlung from "./modules/zaehlung";
import zaehlstelle from "./modules/zaehlstelle";
import eventbus from "@/store/modules/eventbus";
import history from "@/store/modules/history";
import pdfreport from "@/store/modules/pdfreport";
import belastungsplanSize from "@/store/modules/belastungsplanSize";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules: {
        user,
        snackbar,
        security,
        search,
        filteroptions,
        zaehlung,
        zaehlstelle,
        eventbus,
        history,
        pdfreport,
        belastungsplanSize,
    },
    strict: debug,
});
