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
    max-width="850"
    :max-height="getContentSheetHeight"
    @after-enter="focusSuchfeld"
  >
    <v-card>
      <VCardTitle
        class="d-flex justify-space-between align-center bg-surface-light"
      >
        <v-icon
          start
          icon="$searchAndFilter"
        />

        <div>Suche & Filter</div>

        <v-spacer />
        <v-btn
          icon
          @click="close"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </VCardTitle>

      <v-card-text>
        <div
          class="search-row"
          style="display: flex; gap: 12px; align-items: flex-start"
        >
          <div style="flex: 1">
            <v-text-field
              ref="suchfeld"
              id="suchfeld"
              v-model="searchQuery"
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
            <!--              :icon="speedDialOpen ? 'mdi-close-thick' : 'mdi-file'"-->
            <v-list
              two-line
              dense
              v-if="suggestions.length && !loadingSuggestions"
              style="margin-top: 8px; max-height: 340px; overflow: auto"
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
                <!--                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>-->
              </v-list-item>
            </v-list>
            <div
              v-if="!loadingSuggestions && !suggestions.length"
              style="margin-top: 8px; color: rgba(0, 0, 0, 0.6)"
            >
              Keine Treffer
            </div>
          </div>

          <VDivider
            vertical
            class="mx-3"
            style="align-self: stretch"
          />

          <div
            style="
              width: 260px;
              display: flex;
              flex-direction: column;
              gap: 8px;
            "
          >
            <v-row
              ><v-icon icon="mdi-filter"></v-icon>
              <h3>Filtereinstellungen</h3></v-row
            >
            <v-row
              ><div
                style="
                  font-size: 0.875rem;
                  font-weight: bold;
                  padding: 10 0 0 0;
                "
              >
                Welche Erhebungsstellen sollen durchsucht werden?
              </div></v-row
            >
            <v-row>
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

            <v-row
              ><div
                style="
                  font-size: 0.875rem;
                  font-weight: bold;
                  padding: 10 0 0 0;
                "
              >
                Weitere Filterkriterien
              </div></v-row
            >
            <v-select
              v-model="searchAndFilterOptions.zaehlarten"
              :items="zaehlartItems"
              label="Zählart"
              density="compact"
              dense
              multiple
              hide-details
              clearable
            />

            <v-select
              v-model="searchAndFilterOptions.zaehldauern"
              :items="zaehldauerDropDown"
              label="Zähldauer"
              density="compact"
              dense
              multiple
              hide-details
              clearable
            />

            <v-checkbox
              v-model="searchAndFilterOptions.kreisverkehr"
              label="Kreisverkehr"
              dense
              hide-details
            />
            <v-checkbox
              v-model="searchAndFilterOptions.sonderzaehlung"
              label="Sonderzählung"
              dense
              hide-details
            />

            <v-select
              :items="[
                'Altstadt-Lehel',
                'Ludwigsvorstadt',
                'Schwabing',
                'Neuhausen',
              ]"
              label="Stadtbezirk"
              density="compact"
              multiple
              dense
              clearable
            />

            <v-autocomplete
              label="Verkehrsarten"
              v-model="searchAndFilterOptions.verkehrsarten"
              multiple
              :items="verkehrsartItems"
              density="compact"
              chips
              closable-chips
            />

            <div style="display: flex; gap: 8px; align-items: center">
              <!-- TODO siehe ZeitPanel.vue: -->
              <!--              <date-range-picker-->
              <!--                  v-model="zeitraumStartAndEndDate"-->
              <!--                  :min-date="minDate"-->
              <!--                  :min-date-description="minDateDescription"-->
              <!--                  :max-date="maxDate"-->
              <!--                  :max-date-description="maxDateDescription"-->
              <!--              />-->
            </div>
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="resetSearchAndFilterOptions"
          >Zurücksetzen</v-btn
        >
        <v-btn
          color="primary"
          @click="adoptSearchAndFilterOptions"
          >Übernehmen</v-btn
        >
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

import { cloneDeep, isEmpty, isEqual, isNil } from "lodash";
import { computed, ref, useTemplateRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";

import { Verkehrsart } from "@/api/client";
import SucheService from "@/api/service/SucheService";
import { useMapOptionsStore } from "@/store/MapOptionsStore";
import { useSearchStore } from "@/store/SearchStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import Zaehlart from "@/types/enum/Zaehlart";
import { zaehldauerDropDown } from "@/types/enum/ZaehldauerText";
import Suggest from "@/types/suche/Suggest";
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

const route = useRoute();
const router = useRouter();
const snackbarStore = useSnackbarStore();
const searchStore = useSearchStore();
const mapOptionsStore = useMapOptionsStore();

const isOpen = ref(false);

const verkehrsartItems = [
  { title: "KFZ", value: Verkehrsart.Kfz },
  { title: "RAD", value: Verkehrsart.Rad },
];

const zaehlartItems = [
  { title: "N", value: Zaehlart.N },
  { title: "T", value: Zaehlart.T },
  { title: "QJS", value: Zaehlart.QJS },
  { title: "FJS", value: Zaehlart.FJS },
];

// const zaehlDatumRange = ref<[string | null, string | null]>([null, null]);

// const datePickerMenu = ref(false);

// Formatierte Anzeige im Textfeld (z. B. "01.01.2023 — 07.01.2023")
// const zaehlDatumFormatted = computed({
//   get: () => {
//     if (!zaehlDatumRange.value || !zaehlDatumRange.value[0]) return "";
//     const [von, bis] = zaehlDatumRange.value;
//     if (von && bis) {
//       return formatDate(von) + " — " + formatDate(bis);
//     } else if (von) {
//       return formatDate(von);
//     } else if (bis) {
//       return formatDate(bis);
//     } else {
//       return "";
//     }
//   },
//   set: (v: string) => {
//     // readonly input; set wird hier nicht benötigt, falls dennoch gebraucht, kann man parsen
//   },
// });

let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 300; // TODO: für SB evtl. auf 500?

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
  console.log("suggest");
  if (!isEmpty(searchQuery.value)) {
    lastSuggestQuery.value = searchQuery.value ?? "";
    loadingSuggestions.value = true;
    SucheService.getSuggestions(
      searchQuery.value ?? "",
      searchAndFilterOptions.value
    )
      .then((response: SucheComplexSuggestsDTO) => {
        console.log("res: " + response.zaehlstellenSuggests.length);
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
  } else if (!isEmpty(lastSuggestQuery.value)) {
    lastSuggestQuery.value = searchQuery.value ?? "";
    suggestions.value = [];
  }
}

function clearSearch(): void {
  console.log("clearSearch");
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
  console.log(
    "searchOrShowSelectedSuggestion: " + selectedSuggestion.value.type
  );
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
  console.log("search");
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
    searchAndFilterOptionsStore.value.query ?? "",
    searchAndFilterOptionsStore.value
  )
    .then((result) => {
      searchStore.setSearchResult(result);
    })
    .catch((error) => {
      snackbarStore.showApiError(error);
    })
    .finally(() => (loadingSearchResults.value = false));
}

// function searchForSuggestion(query: string) {
//   searchQuery.value = query;
//   search();
// }

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
    console.log("changed: query.value");
    if (!isOpen.value) return;
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      if ((newVal || "").trim().length >= 3) {
        suggest();
      }
    }, DEBOUNCE_MS);
  }
);

function deleteChar() {
  if (!isNil(selectedSuggestion.value)) {
    selectedSuggestion.value.type = "";
  }
  suggest();
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

// Hilfsfunktion: Datum im gewünschten Format (TT.MM.YYYY). Anpassbar.
// function formatDate(isoDate: string): string {
//   if (!isoDate) return "";
//   const d = new Date(isoDate);
//   if (Number.isNaN(d.getTime())) return isoDate;
//   const dd = String(d.getDate()).padStart(2, "0");
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const yyyy = d.getFullYear();
//   return `${dd}.${mm}.${yyyy}`;
// }

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

const searchAndFilterOptionsStore = computed({
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
    console.log("changed searchStore.triggerSearch");
    searchQuery.value = searchStore.getLastSearchQuery;
    searchAndFilterOptions.value = searchStore.getSearchAndFilterOptions;
    selectedSuggestion.value = undefined;
    search();
  }
);

function close() {
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
    return "680px";
  }
  return "400px";
});

/**
 * Triggerd by @click:Übernehmen oder enter oder searchOrShowSelectedSuggestion
 */
function adoptSearchAndFilterOptions(): void {
  console.log("adoptSearchAndFilterOptions: " + searchQuery.value);
  selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
  searchStore.setSearchAndFilterOptions(searchAndFilterOptions.value);
  searchStore.setLastSearchQuery(searchQuery.value?.trim());
  search();
  isOpen.value = false;
}

/** Triggered by @click:zurücksetzen
 * Zurücksetzen: bereits übernommene Suche soll auf Standard zurückgesetzt werden
 * im Gegensatz zu dialog:close: im Store gespeicherte Suchkriterien wurden lokal beararbeitet
 * und Bearb. soll abgebrochen werden
 * -> zurücksetzen auf letzte Suchkriterien
 */
function resetSearchAndFilterOptions(): void {
  console.log("resetSearchAndFilterOptions");
  searchStore.resetSearchAndFilterOptions();
  searchStore.setLastSearchQuery("");
  searchAndFilterOptions.value = searchAndFilterOptionsStore.value;
  searchQuery.value = searchStore.getLastSearchQuery;
  suggestions.value = [];
  selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
  search();
  close();
}
</script>
