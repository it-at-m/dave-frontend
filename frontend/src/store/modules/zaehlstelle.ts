import ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";

const state = {
    zaehlstelle: {} as ZaehlstelleHeaderDTO,
};

const getters = {
    getZaehlstelle(state: any) {
        return state.zaehlstelle;
    },
};

const mutations = {
    setZaehlstelle(state: any, payload: ZaehlstelleHeaderDTO) {
        // Zählungen sind in einem anderen VueX Store Modul vorhanden und werden hier nicht mitgespeichert
        payload.zaehlungen = [];
        state.zaehlstelle = payload;
    },
};

export default {
    state,
    getters,
    mutations,
};
