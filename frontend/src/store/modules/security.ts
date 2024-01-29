import SsoUserInfoResponse from "@/types/SsoUserInfoResponse";

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
    mutations: {
        setNoSecurity(state: any, payload: boolean) {
            state.noSecurity = payload;
        },
    },
    actions: {},
};
