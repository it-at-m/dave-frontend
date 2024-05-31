import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import search from "./modules/search";
import filteroptions from "./modules/filteroptions";
import zaehlung from "./modules/zaehlung";
import pdfreport from "@/store/modules/pdfreport";
import filteroptionsMessstelle from "@/store/modules/filteroptionsMessstelle";
import messstelleInfo from "@/store/modules/messstelle";

Vue.use(Vuex);
const debug = import.meta.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules: {
        user,
        search,
        filteroptions,
        zaehlung,
        pdfreport,
        filteroptionsMessstelle,
        messstelleInfo,
    },
    strict: debug,
});
