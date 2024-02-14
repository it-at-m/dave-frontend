import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";

export interface MessstelleState {
    messstelleInfo: MessstelleInfoDTO;
    activeTab: number;
}

export default {
    namespaced: true,
    state: {
        messstelleInfo: {} as MessstelleInfoDTO,
        activeTab: 0,
    } as MessstelleState,
    getters: {
        getMessstelleInfo(state: MessstelleState): MessstelleInfoDTO {
            return state.messstelleInfo;
        },
        getActiveTab: (state: MessstelleState) => {
            return state.activeTab;
        },
        isKfzMessstelle: (state: MessstelleState) => {
            return (
                state.messstelleInfo.messquerschnitte[0]
                    .detektierteVerkehrsarten === DetektierteFahrzeugart.KFZ
            );
        },
    },
    mutations: {
        SET_MESSSTELLE_INFO(
            state: MessstelleState,
            payload: MessstelleInfoDTO
        ): void {
            state.messstelleInfo = payload;
        },
        SET_ACTIVE_TAB(state: MessstelleState, payload: number) {
            state.activeTab = payload;
        },
    },
    actions: {
        setMessstelleInfo(
            context: any,
            messstelleInfo: MessstelleInfoDTO
        ): void {
            context.commit("SET_MESSSTELLE_INFO", messstelleInfo);
        },
        setActiveTab(context: any, activeTab: number) {
            context.commit("SET_ACTIVE_TAB", activeTab);
        },
    },
};
