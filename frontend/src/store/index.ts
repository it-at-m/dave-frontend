import Vue from "vue";
import Vuex from "vuex";
import zaehlung from "./modules/zaehlung";

Vue.use(Vuex);
const debug = import.meta.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules: {
        zaehlung,
    },
    strict: debug,
});
