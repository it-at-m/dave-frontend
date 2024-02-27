import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

export interface FilteroptionsMessstelle {
    messstelleFilterOptions: MessstelleOptionsDTO;
}
export default {
    namespaced: true,
    state: {
        messstelleFilterOptions: {
            zeitraum: [],
            fahrzeuge: {} as FahrzeugOptions,
            zeitauswahl: "",
            zeitblock: "",
            tagesTyp: "",
            intervall: "" as ZaehldatenIntervall,
            messquerschnitte: [],
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
