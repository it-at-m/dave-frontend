const state = {
    sizeBelastungsplanSvg: 0,
    maxSizeBelastungsplanSvg: 0,
    minSizeBelastungsplanSvg: 0,
    sizeBelastungsplanSvgSchematischeUebersicht: 0,
    maxSizeBelastungsplanSvgSchematischeUebersicht: 0,
    minSizeBelastungsplanSvgSchematischeUebersicht: 0,
};

const getters = {
    getSizeBelastungsplanSvg(state: any): number {
        return state.sizeBelastungsplanSvg;
    },
    getMaxSizeBelastungsplanSvg(state: any): number {
        return state.maxSizeBelastungsplanSvg;
    },
    getMinSizeBelastungsplanSvg(state: any): number {
        return state.minSizeBelastungsplanSvg;
    },
    getSizeBelastungsplanSvgSchematischeUebersicht(state: any): number {
        return state.sizeBelastungsplanSvgSchematischeUebersicht;
    },
    getMaxSizeBelastungsplanSvgSchematischeUebersicht(state: any): number {
        return state.maxSizeBelastungsplanSvgSchematischeUebersicht;
    },
    getMinSizeBelastungsplanSvgSchematischeUebersicht(state: any): number {
        return state.minSizeBelastungsplanSvgSchematischeUebersicht;
    },
};

const mutations = {
    setSizeBelastungsplanSvg(state: any, payload: number) {
        state.sizeBelastungsplanSvg = payload;
    },
    setMaxSizeBelastungsplanSvg(state: any, payload: number) {
        state.maxSizeBelastungsplanSvg = payload;
    },
    setMinSizeBelastungsplanSvg(state: any, payload: number) {
        state.minSizeBelastungsplanSvg = payload;
    },
    resetSizeBelastungsplanSvg(state: any) {
        state.sizeBelastungsplanSvg = state.minSizeBelastungsplanSvg;
    },
    setSizeBelastungsplanSvgSchematischeUebersicht(
        state: any,
        payload: number
    ) {
        state.sizeBelastungsplanSvgSchematischeUebersicht = payload;
    },
    setMaxSizeBelastungsplanSvgSchematischeUebersicht(
        state: any,
        payload: number
    ) {
        state.maxSizeBelastungsplanSvgSchematischeUebersicht = payload;
    },
    setMinSizeBelastungsplanSvgSchematischeUebersicht(
        state: any,
        payload: number
    ) {
        state.minSizeBelastungsplanSvgSchematischeUebersicht = payload;
    },
    resetSizeBelastungsplanSvgSchematischeUebersicht(state: any) {
        state.sizeBelastungsplanSvgSchematischeUebersicht =
            state.minSizeBelastungsplanSvgSchematischeUebersicht;
    },
};

const actions = {
    setSizeBelastungsplanSvg(context: any, payload: number) {
        context.commit("setSizeBelastungsplanSvg", payload);
    },
    setMaxSizeBelastungsplanSvg(context: any, payload: number) {
        context.commit("setMaxSizeBelastungsplanSvg", payload);
    },
    setMinSizeBelastungsplanSvg(context: any, payload: number) {
        context.commit("setMinSizeBelastungsplanSvg", payload);
    },
    resetSizeBelastungsplanSvg(context: any) {
        context.commit("resetSizeBelastungsplanSvg");
    },
    setSizeBelastungsplanSvgSchematischeUebersicht(
        context: any,
        payload: number
    ) {
        context.commit(
            "setSizeBelastungsplanSvgSchematischeUebersicht",
            payload
        );
    },
    setMaxSizeBelastungsplanSvgSchematischeUebersicht(
        context: any,
        payload: number
    ) {
        context.commit(
            "setMaxSizeBelastungsplanSvgSchematischeUebersicht",
            payload
        );
    },
    setMinSizeBelastungsplanSvgSchematischeUebersicht(
        context: any,
        payload: number
    ) {
        context.commit(
            "setMinSizeBelastungsplanSvgSchematischeUebersicht",
            payload
        );
    },
    resetSizeBelastungsplanSvgSchematischeUebersicht(context: any) {
        context.commit("resetSizeBelastungsplanSvgSchematischeUebersicht");
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
