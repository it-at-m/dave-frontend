import BaseAsset from "@/types/pdfreport/assets/BaseAsset";
import {stat} from "fs";

/**
 * Dieser Store ist eine Art Queue, um ein oder mehrere Assets in die ReportView zu bringen. Die Datenhaltung erfolgt
 * dann in der Queue selbst. Der Store muss nach jedem Sortiervorgang, hinzufügen, löschen etc. wieder geupdated werden.
 */
export default {
  state: {
    assets: [] as BaseAsset[],
    hasTitlePage: false as boolean
  },
  getters: {
    getAssets: (state: any) => {
      return state.assets;
    },
    hasTitlePage: (state: any) => {
      return state.hasTitlePage
    }
  },
  mutations: {
    addasset(state: any, payload: BaseAsset) {
      state.assets.push(payload)
    },
    addassets(state: any, payload: BaseAsset[]) {
      payload.forEach(a => {
        state.assets.push(a)
      })
    },
    setassets(state: any, payload: BaseAsset[]) {
      state.assets = payload;
    },
    hasTitlePage(state: any) {
      state.hasTitlePage = true
    }
  },
  actions: {
    addAsset(context: any, payload: BaseAsset) {
      context.commit('addasset', payload)
    },
    addAssets(context: any, payload: BaseAsset[]) {
      context.commit('addassets', payload)
    },
    setAssets(context: any, payload: BaseAsset[]) {
      context.commit('setassets', payload)
    },
    hasTitlePage(context: any) {
      context.commit('hasTitlePage')
    }
  }
}
