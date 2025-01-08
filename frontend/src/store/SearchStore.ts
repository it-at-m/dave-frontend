import type AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";

import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSearchStore = defineStore("searchStore", () => {
  const searchResult = ref<Array<AnzeigeKarteDTO>>([]);
  const lastSearchQuery = ref("");
  const isSearchTriggered = ref(false);

  const getSearchResult = computed(() => searchResult.value);
  const getLastSearchQuery = computed(() => lastSearchQuery.value);
  const triggerSearch = computed(() => isSearchTriggered.value);

  function setSearchResult(payload: Array<AnzeigeKarteDTO>) {
    searchResult.value = payload;
  }
  function setLastSearchQuery(payload: string) {
    lastSearchQuery.value = payload;
  }
  function resetAndTriggerSearch() {
    setSearchResult([]);
    setLastSearchQuery("");
    isSearchTriggered.value = !isSearchTriggered.value;
  }

  return {
    getSearchResult,
    getLastSearchQuery,
    triggerSearch,
    setSearchResult,
    setLastSearchQuery,
    resetAndTriggerSearch,
  };
});
