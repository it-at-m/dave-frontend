import MessungOptionsDTO from "@/types/messung/MessstelleOptionsDTO";

export interface FilteroptionsMessstelle {
    messstelleFilterOptions: MessungOptionsDTO;
}
export default {
    namespaced: true,
    state: {
        messstelleFilterOptions: {
            zeitraum: [],
        },
    },
    getters: {
        getFilteroptions(state: FilteroptionsMessstelle): MessungOptionsDTO {
            return state.messstelleFilterOptions;
        },
    },
    mutations: {
        setFilteroptions(
            state: FilteroptionsMessstelle,
            payload: MessungOptionsDTO
        ) {
            state.messstelleFilterOptions = payload;
        },
    },
    actions: {
        resetFilteroptions(context: any) {
            context.commit("setFilteroptions", {
                zeitraum: [],
            });
        },
    },
};
