import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import TagesTyp from "@/types/enum/TagesTyp";

export interface FilteroptionsMessstelle {
    messstelleFilterOptions: MessstelleOptionsDTO;
    direction: string;
}
export default {
    namespaced: true,
    state: {
        messstelleFilterOptions: {
            zeitraum: [],
            fahrzeuge: {} as FahrzeugOptions,
            zeitauswahl: "",
            zeitblock: "",
            tagesTyp: "" as TagesTyp,
            intervall: "" as ZaehldatenIntervall,
            messquerschnitte: [],
        } as MessstelleOptionsDTO,
        direction: "",
    },
    getters: {
        getFilteroptions(state: FilteroptionsMessstelle): MessstelleOptionsDTO {
            return state.messstelleFilterOptions;
        },
        getDirection(state: FilteroptionsMessstelle): string {
            return state.direction;
        },
    },
    mutations: {
        setFilteroptions(
            state: FilteroptionsMessstelle,
            payload: MessstelleOptionsDTO
        ) {
            state.messstelleFilterOptions = payload;
        },
        setDirection(state: FilteroptionsMessstelle, payload: string) {
            state.direction = payload;
        },
    },
};
