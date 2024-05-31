import Vue from "vue";
import Vuex from "vuex";
import filteroptions from "./modules/filteroptions";
import zaehlung from "./modules/zaehlung";
import filteroptionsMessstelle from "@/store/modules/filteroptionsMessstelle";

Vue.use(Vuex);
const debug = import.meta.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules: {
        filteroptions,
        zaehlung,
        filteroptionsMessstelle,
    },
    strict: debug,
});
