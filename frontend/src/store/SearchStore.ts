import type AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";
import type SearchAndFilterOptionsDTO from "@/types/suche/SearchAndFilterOptionsDTO";

import { isEqual } from "lodash";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import DefaultObjectCreator from "@/util/DefaultObjectCreator";

export const useSearchStore = defineStore("searchStore", () => {
  const searchResult = ref<Array<AnzeigeKarteDTO>>([]);
  const lastSearchQuery = ref("");
  const isSearchTriggered = ref(false);
  const searchAndFilterOptions = ref(
    DefaultObjectCreator.createDefaultSearchAndFilterOptionsDTO()
  );

  const getSearchResult = computed(() => searchResult.value);
  const getLastSearchQuery = computed(() => lastSearchQuery.value);
  const triggerSearch = computed(() => isSearchTriggered.value);
  const getSearchAndFilterOptions = computed(
    () => searchAndFilterOptions.value
  );
  const areSearchAndFilterOptionsDirty = computed(() => {
    return !isEqual(
      searchAndFilterOptions.value,
      DefaultObjectCreator.createDefaultSearchAndFilterOptionsDTO()
    );
  });

  function setSearchResult(payload: Array<AnzeigeKarteDTO>) {
    searchResult.value = payload;
  }
  function setLastSearchQuery(payload: string) {
    lastSearchQuery.value = payload;
  }
  function setSearchAndFilterOptions(payload: SearchAndFilterOptionsDTO) {
    searchAndFilterOptions.value = payload;
  }
  function resetSearchAndFilterOptions() {
    searchAndFilterOptions.value =
      DefaultObjectCreator.createDefaultSearchAndFilterOptionsDTO();
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
    getSearchAndFilterOptions,
    areSearchAndFilterOptionsDirty,
    setSearchResult,
    setLastSearchQuery,
    setSearchAndFilterOptions,
    resetAndTriggerSearch,
    resetSearchAndFilterOptions,
  };
});
