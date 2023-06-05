export default {
    state: {
        changetabevent: 0,
    },
    getters: {
        getChangetabevent: (state: any) => {
            return state.changetabevent;
        },
    },
    mutations: {
        changetabevent(state: any, payload: number) {
            state.changetabevent = payload;
        },
    },
    actions: {
        setChangetabevent(context: any, payload: number) {
            context.commit("changetabevent", payload);
        },
    },
};
