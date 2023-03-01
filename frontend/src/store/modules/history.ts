import HistoryItem from "@/types/app/HistoryItem";
import HistoryItemComperator from "@/types/app/HistoryItemComperator";

export default {
  state: {
    items: [] as HistoryItem[]
  },
  getters: {
    getHistoryItems: (state: any) => {
      return state.items;
    }
  },
  mutations: {
    addHistoryItem(state: any, payload: HistoryItem) {
      // Einträge nach Datum sortieren
      const oldItems = state.items.sort(HistoryItemComperator.sortByTime);
      const newItems = new Array<HistoryItem>();
      newItems.push(payload);
      // Der Eintrag sollte nicht doppelt vorkommen
      oldItems.forEach((item: HistoryItem) => {
        if ((newItems.length < 10) && !(item.zaehlungId === payload.zaehlungId)) {
          newItems.push(item);
        }
      })
      // Die neu Liste wird gesetzt
      state.items = newItems.sort(HistoryItemComperator.sortByTime);
    }
  },
  actions: {
    addHistoryItem(context: any, payload: HistoryItem) {
      context.commit('addHistoryItem', payload);
    }
  }
}