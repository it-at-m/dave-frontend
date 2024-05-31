import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";
import AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";

export const useSearchStore = defineStore("searchStore", () => {
    // ref()s become state properties
    const searchResult: Ref<Array<AnzeigeKarteDTO>> = ref([]);
    const lastSearchQuery: Ref<string> = ref("");
    // computed()s become getters
    const getSearchResult = computed(() => searchResult.value);
    const getLastSearchQuery = computed(() => lastSearchQuery.value);
    // function()s become actions
    function setSearchResult(payload: Array<AnzeigeKarteDTO>) {
        searchResult.value = payload;
    }
    function setLastSearchQuery(payload: string) {
        lastSearchQuery.value = payload;
    }

    return {
        getSearchResult,
        getLastSearchQuery,
        setSearchResult,
        setLastSearchQuery,
    };
});
