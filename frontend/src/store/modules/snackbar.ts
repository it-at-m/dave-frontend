import {ApiError, Levels} from "@/api/error";

export interface SnackbarState {
  snackbarTextPart1: string | undefined,
  snackbarTextPart2: string | undefined,
  level: Levels,
  switch: boolean
}

export default {
  namespaced: true,
  state: {
    snackbarTextPart1: undefined,
    snackbarTextPart2: undefined,
    level: Levels.INFO,
    switch: false
  } as SnackbarState,
  getters: {},
  mutations: {
    SET_TOAST(state: SnackbarState, toast: SnackbarState) {
      state.snackbarTextPart1 = toast.snackbarTextPart1;
      state.snackbarTextPart2 = toast.snackbarTextPart2;
      state.level = toast.level;
      state.switch = !state.switch;
    },
  },
  actions: {
    showToast(context: any, toast: SnackbarState) {
      context.commit('SET_TOAST', toast);
    },
    showError(context: any, apiError: ApiError) {
      let toast: SnackbarState = {} as SnackbarState;
      toast.level = apiError.level;
      let split = apiError.message.split('µ');
      toast.snackbarTextPart1 = split[0];
      if (split.length === 2) {
        toast.snackbarTextPart2 = split[1];
      }
      context.commit('SET_TOAST', toast);
    }
  }
}