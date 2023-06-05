export default {
    namespaced: true,
    state: {
        noSecurity: false,
    },
    getters: {
        isNoSecurityActive: (state: { noSecurity: boolean }) => {
            return state.noSecurity;
        },
    },
    mutations: {},
    actions: {},
};
