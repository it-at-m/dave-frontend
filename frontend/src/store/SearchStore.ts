import type AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";

import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSearchStore = defineStore("searchStore", () => {
  const searchResult = ref<Array<AnzeigeKarteDTO>>([]);
  const lastSearchQuery = ref("");

  const getSearchResult = computed(() => searchResult.value);
  const getLastSearchQuery = computed(() => lastSearchQuery.value);

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
