import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";

export interface FilteroptionsMessstelle {
    messstelleFilterOptions: MessstelleOptionsDTO;
}
export default {
    namespaced: true,
    state: {
        messstelleFilterOptions: {
            zeitraum: [],
            fahrzeuge: {} as FahrzeugOptions,
        } as MessstelleOptionsDTO,
    },
    getters: {
        getFilteroptions(state: FilteroptionsMessstelle): MessstelleOptionsDTO {
            return state.messstelleFilterOptions;
        },
    },
    mutations: {
        setFilteroptions(
            state: FilteroptionsMessstelle,
            payload: MessstelleOptionsDTO
        ) {
            state.messstelleFilterOptions = payload;
        },
    },
    actions: {
        resetFilteroptions(context: any) {
            context.commit("setFilteroptions", {
                zeitraum: [],
                fahrzeuge: {} as FahrzeugOptions,
            });
        },
    },
};
