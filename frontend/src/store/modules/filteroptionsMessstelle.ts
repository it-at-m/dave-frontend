import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import TagesTyp from "@/types/enum/TagesTyp";

export interface FilteroptionsMessstelle {
    messstelleFilterOptions: MessstelleOptionsDTO;
    direction: string;
    history: boolean;
    belastungsplanMinSize: string;
    belastungsplanMaxSize: string;
    belastungsplanChosenSize: number;
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
            messquerschnittIds: [],
            blocksumme: true,
            tagessumme: true,
            stundensumme: true,
            spitzenstunde: true,
            ganglinieYAchse2MaxValue: null,
            ganglinieYAchse1MaxValue: null,
            blackPrintMode: false,
            werteHundertRunden: false,
        } as MessstelleOptionsDTO,
        direction: "",
        belastungsplanMinSize: "",
        belastungsplanChosenSize: 1,
        history: false,
    },
    getters: {
        getFilteroptions(state: FilteroptionsMessstelle): MessstelleOptionsDTO {
            return state.messstelleFilterOptions;
        },
        getDirection(state: FilteroptionsMessstelle): string {
            return state.direction;
        },
        isHistory(state: FilteroptionsMessstelle): boolean {
            return state.history;
        },
        getBelastungsplanMinSize(state: FilteroptionsMessstelle): string {
            return state.belastungsplanMinSize;
        },
        getBelastungsplanMaxSize(state: FilteroptionsMessstelle): string {
            return state.belastungsplanMinSize;
        },
        getBelastungsplanChosenSize(state: FilteroptionsMessstelle): number {
            return state.belastungsplanChosenSize;
        },
    },
    mutations: {
        setFilteroptions(
            state: FilteroptionsMessstelle,
            payload: MessstelleOptionsDTO
        ) {
            state.messstelleFilterOptions = payload;
            state.history = false;
        },
        setFilteroptionsHistory(
            state: FilteroptionsMessstelle,
            payload: MessstelleOptionsDTO
        ) {
            state.messstelleFilterOptions = payload;
            state.history = true;
        },
        setDirection(state: FilteroptionsMessstelle, payload: string) {
            state.direction = payload;
        },
        reloadFilteroptions(state: FilteroptionsMessstelle) {
            state.messstelleFilterOptions = Object.assign(
                {},
                state.messstelleFilterOptions
            );
        },
        setBelastungsplanMinSize(
            state: FilteroptionsMessstelle,
            payload: string
        ) {
            state.belastungsplanMinSize = payload;
        },
        setBelastungsplanMaxSize(
            state: FilteroptionsMessstelle,
            payload: string
        ) {
            state.belastungsplanMinSize = payload;
        },
        setBelastungsplanChosenSize(
            state: FilteroptionsMessstelle,
            payload: number
        ) {
            state.belastungsplanChosenSize = payload;
        },
    },
};
