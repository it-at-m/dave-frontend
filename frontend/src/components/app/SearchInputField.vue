<template>
  <v-autocomplete
    id="suchfeld"
    v-model="selectedSuggestion"
    v-model:search="searchQuery"
    :items="suggestions"
    density="compact"
    clearable
    flat
    item-title="text"
    hide-details
    label="Suche"
    no-filter
    prepend-inner-icon="mdi-magnify"
    return-object
    variant="solo"
    @keyup.enter="searchOrShowSelectedSuggestion"
    @keyup.delete="deleteChar"
    @update:search="suggest"
    @click:clear="clearSearch"
  >
    <template #no-data>
      <v-list class="pa-3">
        <v-list-item-title> Keine Suchvorschläge... </v-list-item-title>
      </v-list>
    </template>
    <template #item="{ props, item, index }">
      <v-list-item
        v-bind="props"
        density="compact"
        :prepend-icon="iconOfSuggestion(item.raw.type)"
        :title="item.raw.text"
        @click="searchOrShowSelectedSuggestion"
        @focus="updateSearchQuery(index)"
      />
    </template>
    <template #append>
      <v-tooltip
        v-model="showtooltip"
        location="bottom start"
        :open-on-hover="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-information"
            @click="showtooltip = !showtooltip"
          >
          </v-btn>
        </template>
        <span>
          <b>Beispiele, wonach gesucht werden kann:</b><br />
          * Zählstellnummer / -art (123456, 123456T, ...)<br />
          * Schlagwörter (Bahn, Isar, Tunnel, Brücke, ...)<br />
          * Monat (Januar, Februar, ...)<br />
          * Jahreszeit (Frühling, Sommer, ...)<br />
          * Projektname / -nummer (U1022, VZ Stadtgrenzen 2019, ...)<br />
          * Straßen- / Platzname (Rosenheimerplatz, Dachauer Straße, ...)<br />
          * Datumsbereich (von TT.MM.YYYY bis TT.MM.YYYY)<br />
          * Messstellennummer / -name (4203,...)<br />
        </span>
      </v-tooltip>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import type SucheComplexSuggestsDTO from "@/types/suche/SucheComplexSuggestsDTO";
import type SucheMessstelleSuggestDTO from "@/types/suche/SucheMessstelleSuggestDTO";
import type SucheWordSuggestDTO from "@/types/suche/SucheWordSuggestDTO";
import type SucheZaehlstelleSuggestDTO from "@/types/suche/SucheZaehlstelleSuggestDTO";
import type SucheZaehlungSuggestDTO from "@/types/suche/SucheZaehlungSuggestDTO";

import {onMounted, ref, watch} from "vue";
import { useRoute, useRouter } from "vue-router";

import SucheService from "@/api/service/SucheService";
import { useSearchStore } from "@/store/SearchStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import Suggest from "@/types/suche/Suggest";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import {isEmpty, isNil} from "lodash";

const SUGGESTION_TYPE_SEARCH_TEXT = "searchtext";
const SUGGESTION_TYPE_VORSCHLAG = "vorschlag";
const SUGGESTION_TYPE_ZAEHLSTELLE = "zaehlstelle";
const SUGGESTION_TYPE_ZAEHLUNG = "zaehlung";
const SUGGESTION_TYPE_MESSSTELLE = "messstelle";

const searchQuery = ref<string>("");
const suggestions = ref<Array<Suggest>>([]);
const selectedSuggestion = ref<Suggest | undefined>(undefined);
const lastSuggestQuery = ref("");
const showtooltip = ref(false);

const route = useRoute();
const router = useRouter();
const snackbarStore = useSnackbarStore();
const searchStore = useSearchStore();

onMounted(() => {
  clearSearch();
});

function suggest(query: string) {
  if (!isEmpty(query)) {
    lastSuggestQuery.value = query;
    SucheService.getSuggestions(query)
      .then((response: SucheComplexSuggestsDTO) => {
        suggestions.value = [];

        suggestions.value.push(
          new Suggest(query, SUGGESTION_TYPE_SEARCH_TEXT, "", "", "")
        );

        response.wordSuggests.forEach((word: SucheWordSuggestDTO) => {
          suggestions.value.push(
            new Suggest(word.text, SUGGESTION_TYPE_VORSCHLAG, "", "", "")
          );
        });

        response.zaehlungenSuggests.forEach(
          (zaehlung: SucheZaehlungSuggestDTO) => {
            suggestions.value.push(
              new Suggest(
                zaehlung.text,
                SUGGESTION_TYPE_ZAEHLUNG,
                zaehlung.zaehlstelleId,
                zaehlung.id,
                ""
              )
            );
          }
        );

        response.zaehlstellenSuggests.forEach(
          (zaehlstelle: SucheZaehlstelleSuggestDTO) => {
            suggestions.value.push(
              new Suggest(
                zaehlstelle.text,
                SUGGESTION_TYPE_ZAEHLSTELLE,
                zaehlstelle.id,
                "",
                ""
              )
            );
          }
        );

        response.messstellenSuggests.forEach(
          (messstelle: SucheMessstelleSuggestDTO) => {
            suggestions.value.push(
              new Suggest(
                messstelle.text,
                SUGGESTION_TYPE_MESSSTELLE,
                "",
                "",
                messstelle.id
              )
            );
          }
        );
      })
      .catch((error) => snackbarStore.showApiError(error));
  } else if (!isEmpty(lastSuggestQuery.value)) {
    lastSuggestQuery.value = query;
    suggestions.value = [];
  }
}

function clearSearch(): void {
  searchQuery.value = "";
  selectedSuggestion.value = undefined;
  searchStore.setLastSearchQuery(searchQuery.value);
  search();
}

function searchOrShowSelectedSuggestion() {
  if (isNil(selectedSuggestion.value)) {
    search();
  } else if (selectedSuggestion.value.type === SUGGESTION_TYPE_VORSCHLAG) {
    searchForSuggestion(selectedSuggestion.value.text);
  } else if (selectedSuggestion.value.type === SUGGESTION_TYPE_ZAEHLSTELLE) {
    showZaehlstelle(selectedSuggestion.value);
  } else if (selectedSuggestion.value.type === SUGGESTION_TYPE_ZAEHLUNG) {
    showZaehlung(selectedSuggestion.value);
  } else if (selectedSuggestion.value.type === SUGGESTION_TYPE_MESSSTELLE) {
    showMessstelle(selectedSuggestion.value);
  } else {
    search();
  }
}

function search() {
  if (isNil(searchQuery.value)) {
    searchQuery.value = "";
  }
  searchStore.setLastSearchQuery(searchQuery.value);
  const routeName = route.name;
  if (
    (routeName === "zaehlstelle" ||
      routeName === "messstelle" ||
      routeName === "pdfreport" ||
      routeName === "auswertung") &&
      searchQuery.value !== ""
  ) {
    router.push(`/`);
  }

  SucheService.searchErhebungsstelle(searchQuery.value)
    .then((result) => {
      searchStore.setSearchResult(result);
    })
    .catch((error) => {
      snackbarStore.showApiError(error);
    });
}

function searchForSuggestion(query: string) {
  searchQuery.value = query;
  search();
}

function showZaehlstelle(item: Suggest) {
  selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
  router.push(`/zaehlstelle/${item.zaehlstelleId}`);
}

function showZaehlung(item: Suggest) {
  selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
  router.push(`/zaehlstelle/${item.zaehlstelleId}/${item.zaehlungId}`);
}

function showMessstelle(item: Suggest) {
  selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
  router.push(`/messstelle/${item.mstId}`);
}

function deleteChar() {
  if (!isNil(selectedSuggestion.value)) {
    selectedSuggestion.value.type = "";
  }
  suggest(searchQuery.value);
}

function updateSearchQuery(itemIndex: number) {
  if (itemIndex >= 0) {
    searchQuery.value = suggestions.value[itemIndex].text;
  }
}

function iconOfSuggestion(type: string) {
  let icon = "";
  switch (type) {
    case SUGGESTION_TYPE_SEARCH_TEXT:
      icon = "mdi-format-text";
      break;
    case SUGGESTION_TYPE_VORSCHLAG:
      icon = "mdi-magnify";
      break;
    case SUGGESTION_TYPE_ZAEHLSTELLE:
      icon = "mdi-map-marker";
      break;
    case SUGGESTION_TYPE_ZAEHLUNG:
      icon = "mdi-counter";
      break;
    case SUGGESTION_TYPE_MESSSTELLE:
      icon = "mdi-cards-diamond";
      break;
  }
  return icon;
}

watch(() => searchStore.getLastSearchQuery, () => {
  searchQuery.value = searchStore.getLastSearchQuery;
  search();
});
</script>
