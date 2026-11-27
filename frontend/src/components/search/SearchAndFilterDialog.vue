<template>
  <v-text-field
    class="bg-surface-light"
    hide-details="auto"
    label="Suche"
    :disabled="isOpen || loadingSearchResults"
    @click="openSearchDialog"
    @focus="openSearchDialog"
  />

  <v-dialog
    v-model="isOpen"
    max-width="900"
    :max-height="getContentSheetHeight"
    @after-enter="focusSuchfeld"
  >
    <v-card
      class="d-flex flex-column"
      :height="getContentSheetHeight"
      :max-height="getContentSheetHeight"
    >
      <v-card-title
        class="d-flex justify-space-between align-center bg-primary text-white"
      >
        <v-icon
          start
          icon="$searchAndFilter"
        />

        <div>Suche & Filter</div>

        <v-spacer />
      </v-card-title>

      <v-card-text
        class="d-flex flex-column flex-grow-1 overflow-hidden"
        style="min-height: 0"
      >
        <div
          class="d-flex flex-grow-1"
          style="gap: 12px; min-height: 0"
        >
          <div
            class="d-flex flex-column flex-grow-1 align-self-stretch"
            style="min-height: 0"
          >
            <v-text-field
              id="suchfeld"
              ref="suchfeld"
              v-model="searchQuery"
              class="flex-grow-0 flex-shrink-0"
              label="Suche"
              prepend-inner-icon="mdi-magnify"
              clearable
              @keyup.delete="deleteChar"
              @keyup.enter="adoptSearchAndFilterOptions"
              @click:clear="clearSearch()"
            >
              <template #append>
                <v-tooltip
                  v-model="showTooltip"
                  location="bottom start"
                  :open-on-hover="false"
                >
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      density="compact"
                      icon="mdi-information"
                      @click="showTooltip = !showTooltip"
                    >
                    </v-btn>
                  </template>
                  <span>
                    <b>Beispiele, wonach gesucht werden kann:</b><br />
                    * Zählstellnummer (123456, ...)<br />
                    * Schlagwörter (Bahn, Isar, Tunnel, Brücke, ...)<br />
                    * Projektname / -nummer (U1022, VZ Stadtgrenzen 2019,
                    ...)<br />
                    * Straßen- / Platzname (Rosenheimerplatz, Dachauer Straße,
                    ...)<br />
                    * Messstellennummer / -name (4000,...)<br />
                  </span>
                </v-tooltip>
              </template>
            </v-text-field>

            <!-- Trefferliste -->
            <div
              v-if="loadingSuggestions"
              style="margin-top: 8px"
            >
              <v-progress-linear
                indeterminate
                color="primary"
              />
            </div>

            <v-list
              v-if="suggestions.length && !loadingSuggestions"
              class="flex-grow-1 overflow-y-auto mt-2"
              style="min-height: 0"
              two-line
              dense
            >
              <v-list-item
                v-for="item in suggestions"
                :key="item.zaehlstelleId"
                :prepend-icon="iconOfSuggestion(item.type)"
                @click="searchOrShowSelectedSuggestion(item)"
              >
                <v-list-item-title
                  v-html="highlightQuery(item.text || '')"
                ></v-list-item-title>
              </v-list-item>
            </v-list>
            <div
              v-if="!loadingSuggestions && !suggestions.length"
              style="margin-top: 8px; color: rgba(0, 0, 0, 0.6)"
            >
              Keine Suchvorschläge...
            </div>

            <!-- Filter-Einstellungen1 -->
            <div class="position-sticky bottom-0 mt-auto bg-surface">
              <v-divider
                horizontal
                class="mx-2"
                style="align-self: stretch"
              />
              <v-row no-gutters
                ><div class="filter-panel-title">
                  Welche Erhebungsstellen sollen durchsucht werden?
                </div></v-row
              >
              <v-row no-gutters>
                <v-col cols="6">
                  <v-checkbox
                    v-model="searchAndFilterOptions.searchInZaehlstellen"
                    label="Zählstellen"
                  />
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="searchAndFilterOptions.searchInMessstellen"
                    label="Messstellen"
                  />
                </v-col>
              </v-row>

              <!-- TODO (FV-714): v-if stadtbezirke.length > 0; items, etc. -->
              <v-select
                v-model="searchAndFilterOptions.stadtbezirkNummern"
                style="max-width: 350px"
                :items="stadtbezirkeItems"
                label="Stadtbezirke"
                multiple
                hide-details
                clearable
                chips
                closable-chips
              />
            </div>
          </div>

          <v-divider
            vertical
            class="mx-3"
            style="align-self: stretch"
          />

          <div
            class="overflow-y-auto align-self-stretch"
            style="width: 320px; min-height: 0"
          >
            <v-expansion-panels
              v-model="expandedFilterSections"
              multiple
              variant="accordion"
            >
              <v-expansion-panel
                value="zaehlstellen"
                :disabled="!searchAndFilterOptions.searchInZaehlstellen"
              >
                <v-expansion-panel-title class="filter-panel-title">
                  Weitere Filtereinstellungen (Zählstellen)
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="d-flex flex-column ga-4 pt-2">
                    <v-select
                      v-model="searchAndFilterOptions.zaehlarten"
                      :items="zaehlartenDropDown"
                      label="Zählarten"
                      :disabled="!searchAndFilterOptions.searchInZaehlstellen"
                      multiple
                      hide-details
                      clearable
                      chips
                      closable-chips
                    />

                    <v-row no-gutters>
                      <v-col
                        cols="6"
                        class="d-flex flex-column"
                      >
                        <v-checkbox
                          v-model="searchAndFilterOptions.kreisverkehr"
                          label="Kreisverkehr"
                          dense
                          hide-details
                          :disabled="
                            !searchAndFilterOptions.searchInZaehlstellen
                          "
                        />
                      </v-col>
                      <v-col>
                        <v-checkbox
                          v-model="searchAndFilterOptions.sonderzaehlung"
                          label="Sonderzählung"
                          dense
                          hide-details
                          :disabled="
                            !searchAndFilterOptions.searchInZaehlstellen
                          "
                        />
                      </v-col>
                    </v-row>

                    <v-select
                      v-model="searchAndFilterOptions.zaehldauern"
                      :items="zaehldauerDropDown"
                      label="Zähldauern"
                      :disabled="!searchAndFilterOptions.searchInZaehlstellen"
                      multiple
                      hide-details
                      clearable
                      chips
                      closable-chips
                    />

                    <v-menu
                      v-model="dateRangeMenuOpen"
                      :close-on-content-click="false"
                    >
                      <template #activator="{ props }">
                        <v-text-field
                          v-bind="props"
                          style="max-width: 280px"
                          label="Zählzeitraum"
                          :model-value="formattedRange"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          clearable
                          :disabled="
                            !searchAndFilterOptions.searchInZaehlstellen
                          "
                          @click:clear="zaehlzeitRange = []"
                        />
                      </template>

                      <v-date-picker
                        v-model="zaehlzeitRange"
                        multiple="range"
                        show-adjacent-months
                      />
                    </v-menu>

                    <v-select
                      v-model="searchAndFilterOptions.verkehrsarten"
                      :items="verkehrsartItems"
                      label="Verkehrsarten"
                      :disabled="!searchAndFilterOptions.searchInZaehlstellen"
                      multiple
                      hide-details
                      clearable
                      chips
                      closable-chips
                    />

                    <v-select
                      v-model="searchAndFilterOptions.zaehlJahreszeiten"
                      :items="jahreszeitItems"
                      label="Jahreszeiten"
                      :disabled="!searchAndFilterOptions.searchInZaehlstellen"
                      multiple
                      hide-details
                      clearable
                      chips
                      closable-chips
                    />

                    <v-select
                      v-model="searchAndFilterOptions.zaehlMonate"
                      :items="monatItems"
                      label="Monate"
                      :disabled="!searchAndFilterOptions.searchInZaehlstellen"
                      multiple
                      hide-details
                      clearable
                      chips
                      closable-chips
                    />

                    <v-select
                      v-model="searchAndFilterOptions.wetter"
                      :items="wetterDropDown"
                      label="Wetter"
                      :disabled="!searchAndFilterOptions.searchInZaehlstellen"
                      multiple
                      hide-details
                      clearable
                      chips
                      closable-chips
                    />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel
                value="messstellen"
                :disabled="!searchAndFilterOptions.searchInMessstellen"
              >
                <v-expansion-panel-title class="filter-panel-title">
                  Weitere Filtereinstellungen (Messstellen)
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="d-flex flex-column ga-4 pt-2">
                    <v-select
                      v-model="searchAndFilterOptions.fahrzeugklassen"
                      :items="fahrzeugklassenItems"
                      label="Fahrzeugklassen"
                      :disabled="!searchAndFilterOptions.searchInMessstellen"
                      multiple
                      hide-details
                      clearable
                      chips
                      closable-chips
                    />

                    <v-select
                      v-model="searchAndFilterOptions.tagesTypen"
                      :items="tagesTypItems"
                      label="Tagestypen"
                      :disabled="!searchAndFilterOptions.searchInMessstellen"
                      multiple
                      hide-details
                      clearable
                      chips
                      closable-chips
                    />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="flex-shrink-0 justify-center flex-wrap ga-4 pa-4">
        <v-btn
          color="secondary"
          text="Übernehmen"
          variant="elevated"
          @click="adoptSearchAndFilterOptions"
        />
        <v-btn
          color="tertiary"
          text="Zurücksetzen"
          variant="elevated"
          @click="resetSearchAndFilterOptions"
        />
        <v-btn
          color="tertiary"
          text="Abbrechen"
          variant="elevated"
          @click="resetAndClose"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type {
  SearchAndFilterOptionsDTO,
  SucheComplexSuggestsDTO,
  SucheMessstelleSuggestDTO,
  SucheWordSuggestDTO,
  SucheZaehlstelleSuggestDTO,
  SucheZaehlungSuggestDTO,
} from "@/api/client";
import type KeyVal from "@/types/common/KeyVal";

import { cloneDeep, isEqual, isNil } from "lodash";
import { computed, ref, useTemplateRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";

import { Fahrzeugklasse, TagesTyp, Verkehrsart } from "@/api/client";
import SucheService from "@/api/service/SucheService";
import { useMapOptionsStore } from "@/store/MapOptionsStore";
import { useSearchStore } from "@/store/SearchStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import tagesTypText from "@/types/enum/TagesTypText";
import { wetterDropDown } from "@/types/enum/WetterText";
import { zaehlartenDropDown } from "@/types/enum/ZaehlartText";
import { zaehldauerDropDown } from "@/types/enum/ZaehldauerText";
import Suggest from "@/types/suche/Suggest";
import { useDateUtils } from "@/util/DateUtils";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

const SUGGESTION_TYPE_WORTVORSCHLAG = "wortvorschlag";
const SUGGESTION_TYPE_ZAEHLSTELLE = "zaehlstelle";
const SUGGESTION_TYPE_ZAEHLUNG = "zaehlung";
const SUGGESTION_TYPE_MESSSTELLE = "messstelle";

const { xl } = useDisplay();
const suchfeld = useTemplateRef("suchfeld");

const searchQuery = ref<string>(""); // getippter text (über v-model zugewiesen)
const suggestions = ref<Array<Suggest>>([]);
const selectedSuggestion = ref<Suggest | undefined>(undefined);
const lastSuggestQuery = ref("");
const showTooltip = ref(false);
const searchAndFilterOptions = ref(
  DefaultObjectCreator.createDefaultSearchAndFilterOptionsDTO()
);
const loadingSuggestions = ref(false);
const loadingSearchResults = ref(false);

const dateRangeMenuOpen = ref(false);
const zaehlzeitRange = ref<Array<Date>>([]);
const expandedFilterSections = ref<Array<string>>([]);

watch(
  () => [
    searchAndFilterOptions.value.searchInZaehlstellen,
    searchAndFilterOptions.value.searchInMessstellen,
  ],
  ([searchInZaehlstellen, searchInMessstellen]) => {
    const expandedSections: Array<string> = [];
    if (searchInZaehlstellen) expandedSections.push("zaehlstellen");
    if (searchInMessstellen) expandedSections.push("messstellen");
    expandedFilterSections.value = expandedSections;
  },
  { immediate: true }
);

const route = useRoute();
const router = useRouter();
const snackbarStore = useSnackbarStore();
const searchStore = useSearchStore();
const mapOptionsStore = useMapOptionsStore();

const isOpen = ref(false);

// TODO: siehe TagestypenItems
const verkehrsartItems = [
  { title: "KFZ", value: Verkehrsart.Kfz },
  { title: "RAD", value: Verkehrsart.Rad },
];

// TODO: siehe TagestypenItems
const fahrzeugklassenItems = [
  { title: "Summe KFZ", value: Fahrzeugklasse.SummeKfz },
  { title: "2 + 1", value: Fahrzeugklasse.ZweiPlusEins },
  { title: "8 + 1", value: Fahrzeugklasse.AchtPlusEins },
  { title: "RAD", value: Fahrzeugklasse.Rad },
];

const jahreszeitItems = ["Frühling", "Sommer", "Herbst", "Winter"];

const monatItems = [
  { title: "Jan", value: 1 },
  { title: "Feb", value: 2 },
  { title: "Mär", value: 3 },
  { title: "Apr", value: 4 },
  { title: "Mai", value: 5 },
  { title: "Jun", value: 6 },
  { title: "Jul", value: 7 },
  { title: "Aug", value: 8 },
  { title: "Sep", value: 9 },
  { title: "Okt", value: 10 },
  { title: "Nov", value: 11 },
  { title: "Dez", value: 12 },
];

// TODO (FV-714): create dynamically
const stadtbezirkeItems = [
  { title: "1 Altstadt-Lehel ", value: "1" },
  { title: "2 Ludwigsvorstadt-Isarvorstadt ", value: "2" },
  { title: "3 Maxvorstadt ", value: "3" },
  { title: "4 Schwabing-West ", value: "4" },
  { title: "5 Au-Haidhausen ", value: "5" },
  { title: "6 Sendling ", value: "6" },
  { title: "7 Sendling-Westpark ", value: "7" },
  { title: "8 Schwanthalerhöhe ", value: "8" },
  { title: "9 Neuhausen-Nymphenburg ", value: "9" },
  { title: "10 Moosach ", value: "10" },
  { title: "11 Milbertshofen-Am Hart ", value: "11" },
  { title: "12 Schwabing-Freimann ", value: "12" },
  { title: "13 Bogenhausen ", value: "13" },
  { title: "14 Berg am Laim ", value: "14" },
  { title: "15 Trudering-Riem ", value: "15" },
  { title: "16 Ramersdorf-Perlach ", value: "16" },
  { title: "17 Obergiesing-Fasangarten ", value: "17" },
  { title: "18 Untergiesing-Harlaching ", value: "18" },
  {
    title: "19 Thalkirchen-Obersendling-Forstenried-Fürstenried-Solln ",
    value: "19",
  },
  { title: "20 Hadern ", value: "20" },
  { title: "21 Pasing-Obermenzing ", value: "21" },
  { title: "22 Aubing-Lochhausen-Langwied ", value: "22" },
  { title: "23 Allach-Untermenzing ", value: "23" },
  { title: "24 Feldmoching-Hasenbergl ", value: "24" },
  { title: "25 Laim ", value: "25" },
  { title: "32 Außerhalb der Stadtgrenze ", value: "32" },
];

const formattedRange = computed(() => {
  if (!zaehlzeitRange.value.length) return "";

  const start = useDateUtils().getShortVersionOfDate(zaehlzeitRange.value[0]);
  const end = useDateUtils().getShortVersionOfDate(
    zaehlzeitRange.value[zaehlzeitRange.value.length - 1]
  );

  return start === end ? start : `${start} – ${end}`;
});

const tagesTypItems = computed(() => {
  const tagestypen: Array<KeyVal> = [];
  tagesTypText.forEach((value, key) => {
    if (key !== TagesTyp.Unspecified) {
      tagestypen.push({
        title: value,
        value: key,
      });
    }
  });
  return tagestypen;
});

let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 500;

const isDefaultFilter = computed(() => {
  return isEqual(
    searchAndFilterOptions.value,
    DefaultObjectCreator.createDefaultSearchAndFilterOptionsDTO()
  );
});

function focusSuchfeld() {
  suchfeld.value?.focus();
}

function suggest() {
  const query = searchQuery.value.trim();

  if (query) {
    lastSuggestQuery.value = query;
    loadingSuggestions.value = true;
    SucheService.getSuggestions(query, searchAndFilterOptions.value)
      .then((response: SucheComplexSuggestsDTO) => {
        suggestions.value = [];

        response.wordSuggests.forEach((word: SucheWordSuggestDTO) => {
          suggestions.value.push(
            new Suggest(word.text, SUGGESTION_TYPE_WORTVORSCHLAG, "", "", "")
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
      .catch((error) => snackbarStore.showApiError(error))
      .finally(() => (loadingSuggestions.value = false));
  } else if (lastSuggestQuery.value) {
    lastSuggestQuery.value = "";
    suggestions.value = [];
  }
}

function clearSearch(): void {
  searchQuery.value = "";
  selectedSuggestion.value = undefined;
  suggestions.value = [];
  if (!isDefaultFilter.value) {
    suggest();
  }
}

/**
 * Triggered by @click:item
 */
function searchOrShowSelectedSuggestion(item: Suggest) {
  selectedSuggestion.value = item;
  isOpen.value = false;
  if (selectedSuggestion.value.type === SUGGESTION_TYPE_WORTVORSCHLAG) {
    searchQuery.value = selectedSuggestion.value.text;
    adoptSearchAndFilterOptions();
  } else if (selectedSuggestion.value.type === SUGGESTION_TYPE_ZAEHLSTELLE) {
    showZaehlstelle(selectedSuggestion.value);
  } else if (selectedSuggestion.value.type === SUGGESTION_TYPE_ZAEHLUNG) {
    showZaehlung(selectedSuggestion.value);
  } else if (selectedSuggestion.value.type === SUGGESTION_TYPE_MESSSTELLE) {
    showMessstelle(selectedSuggestion.value);
  }
}

/**
 * Triggered by searchOrShowSelectedSuggestion() + watch store.triggerSearch
 */
function search() {
  mapOptionsStore.resetMapOptions();

  searchStore.setLastSearchQuery(searchQuery.value || "");
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

  loadingSearchResults.value = true;
  SucheService.searchErhebungsstelle(
    searchStore.getLastSearchQuery ?? "",
    searchAndFilterOptionsStored.value
  )
    .then((result) => {
      searchStore.setSearchResult(result);
    })
    .catch((error) => {
      snackbarStore.showApiError(error);
    })
    .finally(() => (loadingSearchResults.value = false));
}

function showZaehlstelle(item: Suggest) {
  mapOptionsStore.resetMapOptions();
  selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
  router.push(`/zaehlstelle/${item.zaehlstelleId}`);
}

function showZaehlung(item: Suggest) {
  mapOptionsStore.resetMapOptions();
  selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
  router.push(`/zaehlstelle/${item.zaehlstelleId}/${item.zaehlungId}`);
}

function showMessstelle(item: Suggest) {
  mapOptionsStore.resetMapOptions();
  selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
  router.push(`/messstelle/${item.mstId}`);
}

/**
 * Wenn Suchfeld mindestens 3 Zeichen (nach Debounce) => Suche auslösen
 */
watch(
  () => searchQuery.value,
  (newVal) => {
    if (!isOpen.value) return;
    debounceSuggest(newVal || "");
  }
);

watch(
  () => zaehlzeitRange.value,
  (newVal) => {
    searchAndFilterOptions.value.zaehldatumVon = newVal[0];
    searchAndFilterOptions.value.zaehldatumBis = newVal[newVal.length - 1];
  }
);

function deleteChar() {
  if (!isNil(selectedSuggestion.value)) {
    selectedSuggestion.value.type = "";
  }
  debounceSuggest(searchQuery.value);
}

function debounceSuggest(query: string) {
  if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    if (query.trim().length >= 3) {
      suggest();
    }
  }, DEBOUNCE_MS);
}

/**
 * Wenn ein beliebiges Filter-Control geändert wird, dann sofort eine Suche auslösen
 */
watch(
  searchAndFilterOptions,
  () => {
    if (isOpen.value) suggest();
  },
  { deep: true }
);

function iconOfSuggestion(type: string) {
  let icon = "";
  switch (type) {
    case SUGGESTION_TYPE_WORTVORSCHLAG:
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

// Wrapper, um Options-Referenzen zw. dieser Komponente und dem Store zu trennen.
const searchAndFilterOptionsStored = computed({
  get() {
    return cloneDeep(searchStore.getSearchAndFilterOptions);
  },
  set(payload: SearchAndFilterOptionsDTO) {
    searchStore.setSearchAndFilterOptions(cloneDeep(payload));
  },
});

/**
 * Triggered by App.vue
 */
watch(
  () => searchStore.triggerSearch,
  () => {
    searchQuery.value = searchStore.getLastSearchQuery;
    searchAndFilterOptions.value = searchAndFilterOptionsStored.value;
    selectedSuggestion.value = undefined;
    search();
  }
);

function resetAndClose() {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = null;
  }

  const storedOptions = searchAndFilterOptionsStored.value;
  searchAndFilterOptions.value = storedOptions;
  searchQuery.value = searchStore.getLastSearchQuery;
  zaehlzeitRange.value = [
    storedOptions.zaehldatumVon,
    storedOptions.zaehldatumBis,
  ].filter((date): date is Date => !isNil(date));
  suggestions.value = [];
  isOpen.value = false;
}

function highlightQuery(text: string) {
  const q = searchQuery.value?.trim();
  if (!q || q.length < 1) return text;
  // einfache Hervorhebung (nicht sicher gegen XSS in realer App)
  return text.replace(
    new RegExp(`(${escapeRegExp(q)})`, "ig"),
    "<mark>$1</mark>"
  );
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Öffnen/Schließen
 */
function openSearchDialog() {
  if (loadingSearchResults.value) return;
  isOpen.value = true;
}

const getContentSheetHeight = computed(() => {
  if (xl.value) {
    return "775px";
  }
  return "400px";
});

/**
 * Triggerd by @click:Übernehmen oder enter oder searchOrShowSelectedSuggestion
 */
function adoptSearchAndFilterOptions(): void {
  selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
  searchAndFilterOptionsStored.value = searchAndFilterOptions.value;
  search();
  isOpen.value = false;
}

/** Triggered by @click:zurücksetzen
 * Zurücksetzen: bereits übernommene Suche soll auf Standard zurückgesetzt werden
 * Im Gegensatz zu dialog:close: im Store gespeicherte Suchkriterien wurden lokal beararbeitet
 * und Bearb. soll abgebrochen werden -> zurücksetzen auf letzte Suchkriterien
 */
function resetSearchAndFilterOptions(): void {
  searchAndFilterOptionsStored.value =
    DefaultObjectCreator.createDefaultSearchAndFilterOptionsDTO();
  searchStore.setLastSearchQuery("");
  selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
  resetAndClose();
  search();
}
</script>

<style scoped>
.filter-panel-title {
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 0.875rem;
  font-weight: bold;
}
</style>
