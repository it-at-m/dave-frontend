import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";

export const useSearchStore = defineStore("searchStore", () => {
    // ref()s become state properties
    const searchResult = ref<Array<AnzeigeKarteDTO>>([]);
    const lastSearchQuery = ref("");
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
