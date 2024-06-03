import AbstractHistoryItem from "@/types/history/AbstractHistoryItem";
import HistoryItemComperator from "@/types/history/HistoryItemComperator";

export interface HistoryState {
    items: Array<AbstractHistoryItem>;
}

export default {
    namespaced: true,
    state: {
        items: [] as Array<AbstractHistoryItem>,
    } as HistoryState,
    getters: {
        getHistoryItems: (state: HistoryState) => {
            return state.items;
        },
    },
    mutations: {
        addHistoryItem(state: HistoryState, payload: AbstractHistoryItem) {
            // Einträge nach Datum sortieren
            const oldItems = state.items.sort(
                HistoryItemComperator.sortByTimeAbstract
            );
            const newItems = new Array<AbstractHistoryItem>();
            newItems.push(payload);
            // Der Eintrag sollte nicht doppelt vorkommen
            oldItems.forEach((item: AbstractHistoryItem) => {
                if (
                    newItems.length < 10 &&
                    item.identifier !== payload.identifier
                ) {
                    newItems.push(item);
                }
            });
            // Die neu Liste wird gesetzt
            state.items = newItems.sort(
                HistoryItemComperator.sortByTimeAbstract
            );
        },
    },
};
