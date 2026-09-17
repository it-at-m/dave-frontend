import type AnzeigeKarteDTO from "@/types/karte/AnzeigeKarteDTO";
import type SearchAndFilterOptionsDTO from "@/types/suche/SearchAndFilterOptionsDTO";

import { isEqual } from "lodash";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import Zaehlart from "@/types/enum/Zaehlart";
import Erhebungsstelle from "@/types/enum/Erhebungsstelle";
import Zaehldauer from "@/types/enum/Zaehldauer";

type SearchResultItem = {
  id: string;
  title?: string;
  subtitle?: string;
  kreisverkehr?: boolean;
  zaehlart?: Zaehlart | string | null;
  typ?: Erhebungsstelle;
};

export const useSearchStore = defineStore("searchStore", () => {
  const searchResult = ref<Array<AnzeigeKarteDTO>>([]);
  const lastSearchQuery = ref("");
  const isSearchTriggered = ref(false);
  const loading = ref(false);
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

  const results = ref<Array<SearchResultItem>>([]);

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

  function search(criteria: any){
    console.log("search: " + criteria.query)

    if (!criteria.query && !criteria.zaehlart && !criteria.kreisverkehr && !criteria.sonderzaehlung)
      return;

    const treffer = [
      {
        id: "32001",
        title: "32001 Harras",
        subtitle: "Messstelle QJS",
        kreisverkehr: false,
        sonderzaehlung: false,
        zaehlart: Zaehlart.QJS,
        zaehldauer: Zaehldauer.DAUER_2_X_4_STUNDEN,
        typ: Erhebungsstelle.MESSSTELLE
      },
      {
        id: "32002",
        title: "32002 Harras",
        subtitle: "Zählstelle Kreis Fuss",
        kreisverkehr: true,
        sonderzaehlung: false,
        zaehlart: Zaehlart.FJS,
        zaehldauer: Zaehldauer.DAUER_2_X_4_STUNDEN,
        typ: Erhebungsstelle.ZAEHLSTELLE
      },
      {
        id: "32003",
        title: "32003 Lehel",
        subtitle: "Zählstelle",
        kreisverkehr: false,
        sonderzaehlung: false,
        zaehlart: Zaehlart.N,
        zaehldauer: Zaehldauer.DAUER_2_X_4_STUNDEN,
        typ: Erhebungsstelle.ZAEHLSTELLE
      },
      {
        id: "32004",
        title: "32004 Lehel",
        subtitle: "Zählstelle Fuss",
        kreisverkehr: false,
        sonderzaehlung: false,
        zaehlart: Zaehlart.QJS,
        zaehldauer: Zaehldauer.DAUER_2_X_4_STUNDEN,
        typ: Erhebungsstelle.ZAEHLSTELLE
      },
      {
        id: "32005",
        title: "32005 Thalkirchen",
        subtitle: "Zählstelle",
        kreisverkehr: false,
        sonderzaehlung: false,
        zaehlart: Zaehlart.N,
        zaehldauer: Zaehldauer.DAUER_2_X_4_STUNDEN,
        typ: Erhebungsstelle.ZAEHLSTELLE
      },
      {
        id: "32006",
        title: "32006 Thalkirchen",
        subtitle: "Zählstelle Kreis",
        kreisverkehr: true,
        sonderzaehlung: false,
        zaehlart: Zaehlart.N,
        zaehldauer: Zaehldauer.DAUER_2_X_4_STUNDEN,
        typ: Erhebungsstelle.ZAEHLSTELLE
      },
      {
        id: "32007",
        title: "32007 Berg-Am-Laim",
        subtitle: "Zählstelle",
        kreisverkehr: false,
        sonderzaehlung: false,
        zaehlart: Zaehlart.T,
        zaehldauer: Zaehldauer.DAUER_2_X_4_STUNDEN,
        typ: Erhebungsstelle.ZAEHLSTELLE
      },
      {
        id: "32008",
        title: "32008 Berg-Am-Laim",
        subtitle: "Zählstelle Kreis",
        kreisverkehr: true,
        sonderzaehlung: false,
        zaehlart: Zaehlart.N,
        zaehldauer: Zaehldauer.DAUER_2_X_4_STUNDEN,
        typ: Erhebungsstelle.ZAEHLSTELLE
      },
      {
        id: "32009",
        title: "32009 Sendling",
        subtitle: "Messstelle",
        kreisverkehr: false,
        sonderzaehlung: false,
        zaehlart: Zaehlart.N,
        zaehldauer: Zaehldauer.DAUER_2_X_4_STUNDEN,
        typ: Erhebungsstelle.MESSSTELLE
      },
    ];
    const q = (criteria?.query ?? "").toString().trim().toLowerCase();

    results.value = treffer.filter((t) => {
      // 1) Query-Filter: wenn Query gesetzt, muss sie in id, title oder subtitle vorkommen
      if (q && q.length > 0) {
        const haystack = `${t.id ?? ""} ${t.title ?? ""} ${t.subtitle ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      // 2) Boolean- / enum- / exact-Felder: nur prüfen, wenn das Kriterium gesetzt/aktiv ist
      if (criteria.kreisverkehr === true && !t.kreisverkehr) return false;
      if (criteria.sonderzaehlung === true && !t.sonderzaehlung) return false;
      if (criteria.zaehlart != null && criteria.zaehlart !== "" && t.zaehlart != criteria.zaehlart) return false;
      if (criteria.zaehldauer != null && criteria.zaehldauer !== "" && t.zaehldauer != criteria.zaehldauer) return false;
      if (criteria.zaehlstelle === false && t.typ === Erhebungsstelle.ZAEHLSTELLE) return false;
      if (criteria.messstelle === false && t.typ === Erhebungsstelle.MESSSTELLE) return false;


      // wenn alle Prüfungen bestanden sind, einschließen
      return true;
    });
  }

  function clearResults(){
    console.log("clearResults")
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
    results,
    search,
    loading,
    clearResults
  };
});
