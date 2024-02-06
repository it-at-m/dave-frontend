import MessungOptionsDTO from "@/types/messung/MessungOptionsDTO";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";

export default {
    namespaced: true,
    state: {
        messstelleFilterOptions: {},
    },
    getters: {
        getFilteroptions(state: any): MessungOptionsDTO {
            return state.messstelleFilterOptions;
        },
    },
    mutations: {
        setFilteroptions(state: any, payload: MessungOptionsDTO) {
            state.messstelleFilterOptions = payload;
        },
    },
    actions: {
        resetFilteroptions(context: any) {
            context.commit("setFilteroptions", {
                zeitraum: "",
            });
        },
    },
};
