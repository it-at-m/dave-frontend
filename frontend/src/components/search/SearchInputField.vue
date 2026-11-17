<template>
    <v-text-field
        class="bg-surface-light"
        hide-details="auto"
        label="Suche"
        @click="openSearchDialog"
        @focus="openSearchDialog"
    />

    <v-dialog v-model="isOpen" max-width="700">
      <v-card>
          <VCardTitle class="d-flex justify-space-between align-center bg-surface-light">
            <div>Suche & Filter</div>

            <v-spacer />
          <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
          </VCardTitle>

        <v-card-text>
          <div class="search-row" style="display:flex; gap:12px; align-items:flex-start;">
            <div style="flex:1;">
              <v-text-field
                  v-model="criteria.query"
                  label="Suche"
                  prepend-inner-icon="mdi-magnify"
                  clearable
              />
              <!-- Trefferliste -->
              <div v-if="store.loading" style="margin-top:8px;">
                <v-progress-linear indeterminate color="primary" />
              </div>
<!--              :icon="speedDialOpen ? 'mdi-close-thick' : 'mdi-file'"-->
              <v-list two-line dense v-if="store.results.length && !store.loading" style="margin-top:8px; max-height:340px; overflow:auto;">
                <v-list-item v-for="item in store.results" :key="item.id" @click="selectItem(item)" >
                  <template v-slot:prepend>
                    <v-icon :icon="item.typ === Erhebungsstelle.ZAEHLSTELLE ? 'mdi-map-marker' : 'mdi-map-marker-star'"></v-icon>
                  </template>
                    <v-list-item-title v-html="highlightQuery(item.title)"></v-list-item-title>
                    <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
              <div v-if="!store.loading && !store.results.length" style="margin-top:8px; color: rgba(0,0,0,0.6);">
                Keine Treffer
              </div>
            </div>

            <VDivider vertical class="mx-3" style="align-self: stretch;" />

            <div style="width:260px; display:flex; flex-direction:column; gap:8px;">
              <v-row>
              <v-col cols="6">
              <v-checkbox v-model="criteria.zaehlstelle" label="Zählstellen" />
              </v-col>
              <v-col cols="6">
              <v-checkbox v-model="criteria.messstelle" label="Messstellen" />
              </v-col>
              </v-row>
              <v-select
                  v-model="criteria.zaehlart"
                  :items="zaehlartItems"
                  label="Zählart"
                  dense
                  hide-details
                  clearable
              />

              <v-select
                  v-model="criteria.zaehldauer"
                  :items="zaehldauerItems"
                  label="Zähldauer"
                  dense
                  hide-details
                  clearable
              />



              <v-checkbox v-model="criteria.kreisverkehr" label="Kreisverkehr" dense hide-details />
              <v-checkbox v-model="criteria.sonderzaehlung" label="Sonderzählung" dense hide-details />

              <v-select
                  :items="['Altstadt-Lehel', 'Ludwigsvorstadt', 'Schwabing', 'Neuhausen']"
                  label="Stadtbezirk"
                  dense
                  clearable
              />


              <v-autocomplete
                  label="Verkehrsarten"
                  v-model="verkehrsarten"
                  multiple
                  :items="['KFZ', 'RAD']"
                  density="compact"
                  chips
                  closable-chips
              />

              <div style="display:flex; gap:8px; align-items:center;">
                <VMenu
                    v-model="datePickerMenu"
                    :close-on-content-click="false"
                    offset-y
                    transition="scale-transition"
                >
                  <template #activator="{ props }">
                    <VTextField
                        v-bind="props"
                        label="Zähldatum (Von – Bis)"
                        v-model="zaehlDatumFormatted"
                        readonly
                        density="compact"
                        clearable
                    />
                  </template>

                  <VCard flat>
                    <!-- Vuetify 3: DatePicker im Range-Modus -->
                    <VDatePicker
                        v-model="zaehlDatumRange"
                        range
                    />
                    <VCardActions>
                      <VSpacer />
                      <VBtn text >Fertig</VBtn>
                    </VCardActions>
                  </VCard>
                </VMenu>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="clearAll">Zurücksetzen</v-btn>
          <v-btn color="primary" @click="applyAndClose">Übernehmen</v-btn>
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
import { reactive, computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import SucheService from "@/api/service/SucheService";
import SearchAndFilterOptionsCard from "@/components/search/filter/SearchAndFilterOptionsCard.vue";
import { useMapOptionsStore } from "@/store/MapOptionsStore";
import { useSearchStore } from "@/store/SearchStore";
import Zaehlart from "@/types/enum/Zaehlart";
import Zaehldauer from "@/types/enum/Zaehldauer";
import Erhebungsstelle from "@/types/enum/Erhebungsstelle";
import { useSnackbarStore } from "@/store/SnackbarStore";
import Suggest from "@/types/suche/Suggest";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

const SUGGESTION_TYPE_SEARCH_TEXT = "searchtext";
const SUGGESTION_TYPE_VORSCHLAG = "vorschlag";
const SUGGESTION_TYPE_ZAEHLSTELLE = "zaehlstelle";
const SUGGESTION_TYPE_ZAEHLUNG = "zaehlung";
const SUGGESTION_TYPE_MESSSTELLE = "messstelle";

const emit = defineEmits(['update:modelValue', 'select'])

const searchQuery = ref<string>("");
const suggestions = ref<Array<Suggest>>([]);
const selectedSuggestion = ref<Suggest | undefined>(undefined);
const lastSuggestQuery = ref("");
const showtooltip = ref(false);
const searchAndFilterDialogOpen = ref(false);
const searchAndFilterOptions = ref(
  DefaultObjectCreator.createDefaultSearchAndFilterOptionsDTO()
);

const route = useRoute();
const router = useRouter();
const snackbarStore = useSnackbarStore();
const searchStore = useSearchStore();
const mapOptionsStore = useMapOptionsStore();

const isOpen = ref(false)
// watch(() => (props as any).modelValue, v => isOpen.value = v)
watch(isOpen, v => emit('update:modelValue', v))

const verkehrsarten = ref(['KFZ', 'RAD']);

const zaehlartItems = [
  { title: 'N', value: Zaehlart.N },
  { title: 'T', value: Zaehlart.T },
  { title: 'QJS', value: Zaehlart.QJS },
  { title: 'FJS', value: Zaehlart.FJS },
]

const zaehldauerItems = [
  { title: '2x4', value: Zaehldauer.DAUER_2_X_4_STUNDEN },
  { title: '13h', value: Zaehldauer.DAUER_13_STUNDEN },
  { title: '16h', value: Zaehldauer.DAUER_16_STUNDEN },
]

const criteria = reactive({
  query: '',
  kreisverkehr: false,
  sonderzaehlung: false,
  zaehlart: null as string | null,
  zaehldauer: null as string | null,
  zaehlstelle: true,
  messstelle: true,
})

const zaehlDatumRange = ref<[string | null, string | null]>([null, null]);

const datePickerMenu = ref(false);

// Formatierte Anzeige im Textfeld (z. B. "01.01.2023 — 07.01.2023")
const zaehlDatumFormatted = computed({
  get: () => {
    if (!zaehlDatumRange.value || !zaehlDatumRange.value[0])
      return "";
    const [von, bis] = zaehlDatumRange.value;
    if (von && bis) {
      return formatDate(von) + " — " + formatDate(bis);
    } else if (von) {
      return formatDate(von);
    } else if (bis) {
      return formatDate(bis);
    } else {
      return "";
    }
  },
  set: (v: string) => {
    // readonly input; set wird hier nicht benötigt, falls dennoch gebraucht, kann man parsen
  },
});


let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null
const DEBOUNCE_MS = 300

function suggest(query: string) {
  if (!isEmpty(query)) {
    lastSuggestQuery.value = query;
    SucheService.getSuggestions(query, searchStore.getSearchAndFilterOptions)
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
  searchStore.resetAndTriggerSearch();
}

function searchOrShowSelectedSuggestion() {
  mapOptionsStore.resetMapOptions();
  if (isNil(selectedSuggestion.value)) {
    selectSuggestionTypeSearchText();
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
    selectSuggestionTypeSearchText();
    search();
  }
}

function selectSuggestionTypeSearchText() {
  // Es wurde keine Suggestion ausgewählt, also wird zur Anzeige der Suggestion-Type Text genutzt
  selectedSuggestion.value = suggestions.value.filter(
    (value) => value.type === SUGGESTION_TYPE_SEARCH_TEXT
  )[0];
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

  SucheService.searchErhebungsstelle(
    searchQuery.value,
    searchAndFilterOptionsStore.value
  )
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

// Hilfsfunktion: baut die Kriterien-Objekt, evtl. Filter rausnehmen wenn leer
function buildCriteria() {
  return {
    query: criteria.query?.trim() ?? '',
    kreisverkehr: !!criteria.kreisverkehr,
    sonderzaehlung: !!criteria.sonderzaehlung,
    zaehlart: criteria.zaehlart,
    zaehldauer: criteria.zaehldauer,
    zaehlstelle: !!criteria.zaehlstelle,
    messstelle: !!criteria.messstelle,
  }
}

// Wenn Suchfeld mindestens 3 Zeichen (nach Debounce) => Suche auslösen
watch(() => criteria.query, (newVal) => {
  if (searchDebounceTimer) clearTimeout(searchDebounceTimer)
  searchDebounceTimer = setTimeout(() => {
    if ((newVal || '').trim().length >= 3) {
      store.search(buildCriteria())
    }
  }, DEBOUNCE_MS)
})

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

// Wenn ein beliebiges Filter-Control geändert wird, dann sofort eine Suche auslösen
watch(
  () => [criteria.zaehlart, criteria.zaehldauer, criteria.zaehlstelle, criteria.messstelle, criteria.kreisverkehr, criteria.sonderzaehlung],
  () => {
    // sofort suchen (auch wenn query < 3)
    store.search(buildCriteria())
  },
  { deep: false }
)

// Hilfsfunktion: Datum im gewünschten Format (TT.MM.YYYY). Anpassbar.
function formatDate(isoDate: string): string {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function iconOfSuggestion(type: string) {
  let icon = "";
  switch (type) {
    case SUGGESTION_TYPE_SEARCH_TEXT:
      icon = "mdi-magnify";
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

function hasFilterChanged(): boolean {
  return isEqual(
    searchAndFilterOptionsStore.value,
    searchAndFilterOptions.value
  );
}

const isDefaultFilter = computed(() => {
  return !searchStore.areSearchAndFilterOptionsDirty;
});

function openSearchAndFilterDialog(): void {
  searchAndFilterOptions.value = searchAndFilterOptionsStore.value;
  searchAndFilterDialogOpen.value = true;
}

function handleAdoptSearchAndFilterOptions(): void {
  searchAndFilterOptionsStore.value = searchAndFilterOptions.value;
  searchAndFilterDialogOpen.value = false;
  if (hasFilterChanged()) {
    search();
  }
}

function handleResetSearchAndFilterOptions(): void {
  searchAndFilterOptions.value =
    DefaultObjectCreator.createDefaultSearchAndFilterOptionsDTO();
  handleAdoptSearchAndFilterOptions();
}

const searchAndFilterOptionsStore = computed({
  get() {
    return cloneDeep(searchStore.getSearchAndFilterOptions);
  },
  set(payload: SearchAndFilterOptionsDTO) {
    searchStore.setSearchAndFilterOptions(cloneDeep(payload));
  },
});

watch(
  () => searchStore.triggerSearch,
  () => {
    searchQuery.value = searchStore.getLastSearchQuery;
    selectedSuggestion.value = undefined;
    search();
  }
);

// Exposed helpers
function selectItem(item: any) {
  emit('select', item)
  // optional Dialog schließen
  isOpen.value = false
}

function close() {
  isOpen.value = false
}

function clearAll() {
  criteria.query = ''
  criteria.kreisverkehr = false
  criteria.sonderzaehlung = false
  criteria.zaehlart = null
  criteria.zaehldauer = null
  criteria.zaehlstelle = false
  criteria.messstelle = false
  store.clearResults()
}

function applyAndClose() {
  store.search(buildCriteria())
  isOpen.value = false
}

function highlightQuery(text: string) {
  const q = criteria.query?.trim()
  if (!q || q.length < 1) return text
  // einfache Hervorhebung (nicht sicher gegen XSS in realer App)
  return text.replace(new RegExp(`(${escapeRegExp(q)})`, 'ig'), '<mark>$1</mark>')
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Öffnen/Schließen
function openSearchDialog() {
  isOpen.value = true;
}

</script>
