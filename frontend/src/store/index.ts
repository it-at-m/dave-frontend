import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import filteroptions from "./modules/filteroptions";
import zaehlung from "./modules/zaehlung";
import filteroptionsMessstelle from "@/store/modules/filteroptionsMessstelle";
import messstelleInfo from "@/store/modules/messstelle";

Vue.use(Vuex);
const debug = import.meta.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules: {
        user,
        filteroptions,
        zaehlung,
        filteroptionsMessstelle,
        messstelleInfo,
    },
    strict: debug,
});
