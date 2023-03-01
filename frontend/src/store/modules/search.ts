export default {
  namespaced: true,
  state: {
    result: [],
    lastSearchQuery: ""
  },
  getters: {
    result: (state: any) => {
      return state.result;
    },
    lastSearchQuery: (state: any) => {
      return state.lastSearchQuery;
    },
  },
  mutations: {
    result(state: any, payload: number[]) {
      state.result = payload;
    },
    lastSearchQuery(state: any, payload: string) {
      state.lastSearchQuery = payload;
    }
  },
  actions: {
    result(context: any, payload: number[]) {
      context.commit('result', payload);
    },
    lastSearchQuery(context: any, payload: string) {
      context.commit('lastSearchQuery', payload);
    }
  }
}