import AbstractHistoryItem from "@/types/history/AbstractHistoryItem";
import HistoryItemComperator from "@/types/history/HistoryItemComperator";
import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";

export const useHistoryStore = defineStore("history", () => {
    // ref()s become state properties
    const items: Ref<Array<AbstractHistoryItem>> = ref([]);
    // computed()s become getters
    const historyItems = computed(() => items.value);
    // function()s become actions
    function addHistoryItem(payload: AbstractHistoryItem) {
        // Einträge nach Datum sortieren
        const oldItems = items.value.sort(
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
        items.value = newItems.sort(HistoryItemComperator.sortByTimeAbstract);
    }

    return { historyItems, addHistoryItem };
});
