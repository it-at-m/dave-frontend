<template>
  <v-app>
    <the-snackbar />

    <v-app-bar color="primary">
      <router-link
        to="/"
        @click.native="clear"
      >
        <v-toolbar-title class="text-white">
          <span class="font-weight-medium">DAVe</span>
          <span class="font-weight-thin"> | Mobilitätsreferat</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-autocomplete
        id="suchfeld"
        v-model="selectedSuggestion"
        v-model:search-input="searchQuery"
        :items="suggestions"
        clearable
        color="black"
        flat
        hide-details
        label="Suche"
        no-filter
        prepend-inner-icon="mdi-magnify"
        return-object
        variant="solo-inverted"
        @keyup.enter="searchOrShowSelectedSuggestion"
        @keyup.delete="deleteChar"
        @update:list-index="updateSearchQuery"
        @update:search="suggest"
        @click:clear="clear"
      >
        <template #no-data>
          <v-list class="pa-3">
            <v-list-item-title> Keine Suchvorschläge... </v-list-item-title>
          </v-list>
        </template>
        <template #item="{ item }">
          <v-list-item-title
            v-if="item.value.type === SUGGESTION_TYPE_SEARCH_TEXT"
            @click="searchForSuggestion(item.value.text)"
          >
            <v-icon size="small">mdi-format-text</v-icon>
            {{ item.value.text }}
          </v-list-item-title>
          <v-list-item-title
            v-if="item.value.type === SUGGESTION_TYPE_VORSCHLAG"
            @click="searchForSuggestion(item.value.text)"
          >
            <v-icon size="small">mdi-magnify</v-icon>
            {{ item.value.text }}
          </v-list-item-title>
          <v-list-item-title
            v-if="item.value.type === SUGGESTION_TYPE_ZAEHLSTELLE"
            @click="showZaehlstelle(item.value)"
          >
            <v-icon size="small">mdi-map-marker</v-icon>
            {{ item.value.text }}
          </v-list-item-title>
          <v-list-item-title
            v-if="item.value.type === SUGGESTION_TYPE_ZAEHLUNG"
            @click="showZaehlung(item.value)"
          >
            <v-icon size="small">mdi-counter</v-icon>
            {{ item.value.text }}
          </v-list-item-title>
          <v-list-item-title
            v-if="item.value.type === SUGGESTION_TYPE_MESSSTELLE"
            @click="showMessstelle(item.value)"
          >
            <v-icon size="small">mdi-cards-diamond</v-icon>
            {{ item.value.text }}
          </v-list-item-title>
        </template>
      </v-autocomplete>
      <v-tooltip
        v-model="showtooltip"
        location="bottom"
        nudge-right="180"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="ml-2"
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
          <!--            Es fehlt noch: Wetter, Schulzeit, (erweiterte) Zählsituation-->
        </span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-tooltip location="bottom">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="mr-2"
            icon="mdi-clipboard-pulse-outline"
            size="small"
            to="/auswertung"
          >
          </v-btn>
        </template>
        <span> Gesamtauswertungen </span>
      </v-tooltip>
      <v-tooltip location="bottom">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-file-chart"
            size="small"
            to="/pdfreport"
          >
          </v-btn>
        </template>
        <span> PDF-Report </span>
      </v-tooltip>
      <visit-history />
      <info-message />
      <v-tooltip location="bottom">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="ml-2 mr-2"
            icon="mdi-clippy"
            size="small"
            @click="navigateToHandbuch"
          >
          </v-btn>
        </template>
        <span> Anwenderhandbuch </span>
      </v-tooltip>
      <span> {{ loggedInUser }} </span>
    </v-app-bar>
    <v-main>
      <v-fade-transition mode="out-in">
        <!--    Damit Seite auch bei ID Aenderung reloadet wird muss der :key angegeben werden -->
        <router-view :key="$route.fullPath"></router-view>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import type SucheComplexSuggestsDTO from "@/types/suche/SucheComplexSuggestsDTO";
import type SucheMessstelleSuggestDTO from "@/types/suche/SucheMessstelleSuggestDTO";
import type SucheWordSuggestDTO from "@/types/suche/SucheWordSuggestDTO";
import type SucheZaehlstelleSuggestDTO from "@/types/suche/SucheZaehlstelleSuggestDTO";
import type SucheZaehlungSuggestDTO from "@/types/suche/SucheZaehlungSuggestDTO";

import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import goldTrophy from "@/../public/easteregg/trophy-outline-gold.svg";
import silverTrophy from "@/../public/easteregg/trophy-outline-silver.svg";
import SsoUserInfoService from "@/api/service/SsoUserInfoService";
import SucheService from "@/api/service/SucheService";
import VersionInfoService from "@/api/service/VersionInfoService";
import InfoMessage from "@/components/app/InfoMessage.vue";
import VisitHistory from "@/components/app/VisitHistory.vue";
import TheSnackbar from "@/components/common/TheSnackbar.vue";
import { useSearchStore } from "@/store/search";
import { useSnackbarStore } from "@/store/snackbar";
import { useUserStore } from "@/store/user";
import SsoUserInfoResponse from "@/types/app/SsoUserInfoResponse";
import VersionInfoResponse from "@/types/app/VersionInfoResponse";
import Suggest from "@/types/suche/Suggest";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

const SUGGESTION_TYPE_SEARCH_TEXT = "searchtext";

const SUGGESTION_TYPE_VORSCHLAG = "vorschlag";

const SUGGESTION_TYPE_ZAEHLSTELLE = "zaehlstelle";

const SUGGESTION_TYPE_ZAEHLUNG = "zaehlung";

const SUGGESTION_TYPE_MESSSTELLE = "messstelle";
const URL_HANDBUCH_LINK =
  "https://wilma.muenchen.de/web/senders/af10dc2a-8da5-4d24-815a-b6a9df4c686b/documents/330c5be9-2ee3-4438-8623-6557755260d3";

const showtooltip = ref(false);
const loggedInUser = ref("no-security");
const backendVersion = ref("");
const frontendVersion = ref("");
const searchQuery = ref("");
const lastSuggestQuery = ref("");
const suggestions = ref<Array<Suggest>>([]);
const selectedSuggestion = ref<Suggest | null>(
  DefaultObjectCreator.createDefaultSuggestion()
);

const snackbarStore = useSnackbarStore();
const searchStore = useSearchStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

created();

function created() {
  SsoUserInfoService.getUserInfo()
    .then((ssoUserInfoResponse: SsoUserInfoResponse) => {
      userStore.setSsoUserInfoResponse(ssoUserInfoResponse);
      loggedInUser.value = userStore.getName;
    })
    .catch((error) => {
      snackbarStore.showApiError(error);
      return false;
    });
  VersionInfoService.getFrontendInfo()
    .then((frontendInfoResponse: VersionInfoResponse) => {
      frontendVersion.value = frontendInfoResponse.application.version;
    })
    .catch(() => {
      frontendVersion.value = "error";
    });
  VersionInfoService.getBackendInfo()
    .then((backendInfoResponse: VersionInfoResponse) => {
      backendVersion.value = backendInfoResponse.application.version;
    })
    .catch(() => {
      backendVersion.value = "error";
    });
  window.addEventListener("keypress", shortCuts);
}

function suggest(query: string) {
  if (query !== "" && query != null) {
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
  } else if (lastSuggestQuery.value !== "" && lastSuggestQuery.value != null) {
    lastSuggestQuery.value = query;
    suggestions.value = [];
  }
}

function clear() {
  searchQuery.value = "";
  selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
  searchStore.setLastSearchQuery(searchQuery.value);
  search();
}

function searchOrShowSelectedSuggestion() {
  if (selectedSuggestion.value == null) {
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
  if (searchQuery.value == null) {
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

function updateSearchQuery(itemIndex: number) {
  if (itemIndex >= 0) {
    searchQuery.value = suggestions.value[itemIndex].text;
  }
}

function deleteChar() {
  if (selectedSuggestion.value != null) {
    selectedSuggestion.value.type = "";
  }
  suggest(searchQuery.value);
}

function navigateToHandbuch() {
  window.open(URL_HANDBUCH_LINK);
}

// Easter Egg
const easterEgg = ref<Array<string>>([]);
const easterEggReq = ref<Array<string>>(["B", "o", "u", "l", "e"]);
function shortCuts(event: KeyboardEvent) {
  const location = window.location.host;
  if (location.includes("localhost") || location.includes("muenchen")) {
    if (easterEggReq.value.includes(event.key)) {
      easterEgg.value.push(event.key);
      if (
        easterEgg.value.length === easterEggReq.value.length &&
        easterEgg.value.join() === easterEggReq.value.join()
      ) {
        const split = loggedInUser.value.split(" ");
        if (
          split.length === 2 &&
          split[0].startsWith("R") &&
          split[1].startsWith("B")
        ) {
          window.open(goldTrophy, "Image", "width=700,height=700");
        } else {
          window.open(silverTrophy, "Image", "width=700,height=700");
        }
        easterEgg.value = [];
      }
    } else {
      easterEgg.value = [];
    }
  }
}
</script>

<style>
/* Alle Hinweise werden nun rot eingefärbt */
.v-messages {
  color: #e57373 !important;
}
</style>
