<template>

  <v-text-field
      class="bg-surface-light"
      hide-details="auto"
      label="Suche"
      @click="openSearchDialog"
      @focus="openSearchDialog"
  ></v-text-field>

  <!-- Vuetify 3 Dialog: Links Suggestions, Rechts Filter -->
  <VDialog v-model="searchDialogOpen" width="900">
    <VCard >
      <VCardTitle class="d-flex justify-space-between align-center bg-surface-light">
        <div>Suche & Filter</div>
        <VBtn icon variant="text" @click="closeSearchDialog">
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>

      <VCardText>
        <VRow align="stretch">
          <!-- Linke Spalte: Suggestions -->
          <VCol cols="6" >
<!--            <v-autocomplete-->
<!--                ref="autocompleteRef"-->
<!--                id="suchfeld"-->
<!--                v-model:menu="autocompleteMenuOpen"-->
<!--            :menu-props="{ closeOnContentClick: false }"-->
<!--                :filter-keys="['text', 'type', 'zaehlstelleId']"-->
<!--            @update:menu="onAutocompleteMenuUpdate"-->
<!--            :items="filteredSuggestions2"-->
<!--                density="compact"-->
<!--                clearable-->
<!--                flat-->
<!--                item-title="text"-->
<!--                hide-details-->
<!--                placeholder="Suche"-->
<!--                prepend-inner-icon="mdi-magnify"-->
<!--                return-object-->
<!--                variant="solo"-->
<!--                @keyup.enter="searchOrShowSelectedSuggestion"-->
<!--                @keyup.delete="deleteChar"-->
<!--                @click:clear="clearSearch"-->
<!--            >-->
<!--              <template #no-data>-->
<!--                <v-list class="pa-3">-->
<!--                  <v-list-item-title> Keine Suchvorschläge... </v-list-item-title>-->
<!--                </v-list>-->
<!--              </template>-->
<!--              <template #item="{ props, item, index }">-->
<!--                <v-list-item-->
<!--                    v-bind="props"-->
<!--                    density="compact"-->
<!--                    :prepend-icon="iconOfSuggestion(item.raw.type)"-->
<!--                    :title="item.raw.text"-->
<!--                    @click="searchOrShowSelectedSuggestion"-->
<!--                    @focus="updateSearchQuery(index)"-->
<!--                />-->
<!--              </template>-->
<!--              <template #append>-->
<!--                <v-tooltip-->
<!--                    v-model="showtooltip"-->
<!--                    location="bottom start"-->
<!--                    :open-on-hover="false"-->
<!--                >-->
<!--                  <template #activator="{ props }">-->
<!--                    <v-btn-->
<!--                        v-bind="props"-->
<!--                        density="compact"-->
<!--                        icon="mdi-information"-->
<!--                        @click="showtooltip = !showtooltip"-->
<!--                    >-->
<!--                    </v-btn>-->
<!--                  </template>-->
<!--                  <span>-->
<!--          <b>Beispiele, wonach gesucht werden kann:</b><br />-->
<!--          * Zählstellnummer / -art (123456, 123456T, ...)<br />-->
<!--          * Schlagwörter (Bahn, Isar, Tunnel, Brücke, ...)<br />-->
<!--          * Monat (Januar, Februar, ...)<br />-->
<!--          * Jahreszeit (Frühling, Sommer, ...)<br />-->
<!--          * Projektname / -nummer (U1022, VZ Stadtgrenzen 2019, ...)<br />-->
<!--          * Straßen- / Platzname (Rosenheimerplatz, Dachauer Straße, ...)<br />-->
<!--          * Datumsbereich (von TT.MM.YYYY bis TT.MM.YYYY)<br />-->
<!--          * Messstellennummer / -name (4000,...)<br />-->
<!--        </span>-->
<!--                </v-tooltip>-->
<!--              </template>-->
<!--            </v-autocomplete>-->

            <v-autocomplete
                ref="autocompleteRef"
                :search="searchQuery3"
                @update:search="onUpdateSearch3"
                v-model:menu="autocompleteMenuOpen"
                :items="filteredSuggestions3"
                prepend-inner-icon="mdi-magnify"
                :menu-props="{ closeOnContentClick: false }"
                clearable
                density="compact"
                hide-details
                placeholder="Suche"
                variant="solo"
                @click:clear="onClearAutocomplete"
            />

<!--            <v-autocomplete-->
<!--                ref="autocompleteRef"-->
<!--                :search="searchQuery3"-->
<!--                v-model:menu="autocompleteMenuOpen"-->
<!--                @update:search="onUpdateSearch3"-->
<!--                @update:focused="onAutocompleteFocused"-->
<!--                :items="filteredSuggestions3"-->
<!--                item-title="id"-->
<!--                label="Zählstelle"-->
<!--                :menu-props="{ closeOnContentClick: false }"-->
<!--                open-on-focus-->
<!--                clearable-->
<!--                @click:clear="onClearAutocomplete"-->
<!--            />-->

          </VCol>

          <VDivider vertical class="mx-3" style="align-self: stretch;" />

          <!-- Rechte Spalte: Filter/Steuerung -->
          <VCol cols="5">
            <VForm>
              <VRow dense>
                <VCol cols="6">
                  <VCheckbox
                      label="Zählstelle"
                      density="compact"
                  />
                </VCol>
                <VCol cols="6">
                  <VCheckbox
                      label="Messstelle"
                      density="compact"
                  />
                </VCol>
                <VCol cols="6">
                  <VSelect
                      label="Zählart"
                      :items="geraetOptions"
                      v-model="zaehlartSelection"
                      density="compact"
                      clearable
                  />
                </VCol>
                <VCol cols="6">
                  <VSelect
                      label="Zähldauer"
                      :items="dauerOptions"
                      v-model="dauerSelection"
                      density="compact"
                      clearable
                  />
                </VCol>

                <VCol cols="6">
                  <VCheckbox
                      v-model="kreisverkehr"
                      label="Kreisverkehr"
                      density="compact"
                  />
                </VCol>
                <VCol cols="6">
                  <VCheckbox
                      v-model="sonderzaehlung"
                      label="Sonderzählung"
                      density="compact"
                  />
                </VCol>

                <v-col cols="12">
                  <v-autocomplete
                      label="Verkehrsarten"
                      v-model="verkehrsarten"
                      multiple
                      :items="['KFZ', 'RAD']"
                      density="compact"
                      chips
                      closable-chips
                  />
                </v-col>


                <VCol cols="12">
                  <!-- Datum (Von-Bis) mit VMenu als Activator für VDatePicker (range) -->
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
                          @click:clear="clearZaehldatumRange"
                      />
                    </template>

                    <VCard flat>
                      <!-- Vuetify 3: DatePicker im Range-Modus -->
                      <VDatePicker
                          v-model="zaehlDatumRange"
                          range
                          @update:modelValue="onDateRangePicked"
                      />
                      <VCardActions>
                        <VSpacer />
                        <VBtn text @click="datePickerMenu = false">Fertig</VBtn>
                      </VCardActions>
                    </VCard>
                  </VMenu>
                </VCol>

                <VCol cols="6">
                  <VSelect
                      label="Jahreszeit"
                      :items="jahreszeitOptions"
                      v-model="jahreszeitSelection"
                      density="compact"
                      clearable
                  />
                </VCol>

                <VCol cols="6">
                  <VSelect
                      label="Tagestyp"
                      :items="tagestypOptions"
                      v-model="tagestypSelection"
                      density="compact"
                      clearable
                  />
                </VCol>
              </VRow>
            </VForm>
          </VCol>
        </VRow>
      </VCardText>

      <VCardActions>
        <div class="flex-grow-1" />
        <VBtn variant="text" @click="closeSearchDialog">Abbrechen</VBtn>
        <VBtn color="primary" @click="applyDialogFilters">Übernehmen</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import type SearchAndFilterOptionsDTO from "@/types/suche/SearchAndFilterOptionsDTO";
import type SucheComplexSuggestsDTO from "@/types/suche/SucheComplexSuggestsDTO";
import type SucheMessstelleSuggestDTO from "@/types/suche/SucheMessstelleSuggestDTO";
import type SucheWordSuggestDTO from "@/types/suche/SucheWordSuggestDTO";
import type SucheZaehlstelleSuggestDTO from "@/types/suche/SucheZaehlstelleSuggestDTO";
import type SucheZaehlungSuggestDTO from "@/types/suche/SucheZaehlungSuggestDTO";

import { cloneDeep, isEmpty, isEqual, isNil } from "lodash";
import {computed, ref, watch, nextTick, onMounted} from "vue";
import { useRoute, useRouter } from "vue-router";

import SucheService from "@/api/service/SucheService";
import { useMapOptionsStore } from "@/store/MapOptionsStore";
import { useSearchStore } from "@/store/SearchStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import Suggest from "@/types/suche/Suggest";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import Zaehlart from "@/types/enum/Zaehlart";
import Erhebungsstelle from "@/types/enum/Erhebungsstelle";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";

const SUGGESTION_TYPE_SEARCH_TEXT = "searchtext";
const SUGGESTION_TYPE_VORSCHLAG = "vorschlag";
const SUGGESTION_TYPE_ZAEHLSTELLE = "zaehlstelle";
const SUGGESTION_TYPE_ZAEHLUNG = "zaehlung";
const SUGGESTION_TYPE_MESSSTELLE = "messstelle";

const searchQuery = ref<string>("");
const searchQuery2 = ref<string>("");
const searchQuery3 = ref<string>("");
const suggestions = ref<Array<Suggest>>([]);
const suggestions2 = ref<Array<Suggest>>([]);
const selectedSuggestion = ref<Suggest | undefined>(undefined);
const lastSuggestQuery = ref("");
const showtooltip = ref(false);
const searchAndFilterDialogOpen = ref(false);
const searchAndFilterOptions = ref(
  DefaultObjectCreator.createDefaultSearchAndFilterOptionsDTO()
);
const searchDialogOpen = ref(false);
const autocompleteRef = ref<any>(null);
const verkehrsarten = ref(['KFZ', 'RAD']);

const suggestions3 = ref([
  { title: '328401 Leuchtenbergring', type: SUGGESTION_TYPE_ZAEHLSTELLE, zaehlart: Zaehlart.QJS, kreisverkehr: false, sonderzaehlung: false },
  { title: '328402  Kieselbachplatz', type: SUGGESTION_TYPE_ZAEHLSTELLE, zaehlart: Zaehlart.N,kreisverkehr: true, sonderzaehlung: false },
  { title: '328403  Kieselbachplatz', type: SUGGESTION_TYPE_ZAEHLSTELLE, zaehlart: Zaehlart.T,kreisverkehr: true, sonderzaehlung: false },
  { title: '328404  Harras', type: SUGGESTION_TYPE_ZAEHLSTELLE, zaehlart: Zaehlart.FJS,kreisverkehr: false, sonderzaehlung: true },
  { title: '328405  Harras', type: SUGGESTION_TYPE_ZAEHLSTELLE, zaehlart: Zaehlart.N, kreisverkehr: false, sonderzaehlung: false },
  { title: '328406  Thalkirchen', type: SUGGESTION_TYPE_ZAEHLSTELLE, zaehlart: Zaehlart.N, kreisverkehr: false, sonderzaehlung: false },
  { title: '328407  Thalkirchen', type: SUGGESTION_TYPE_ZAEHLSTELLE, zaehlart: Zaehlart.QJS, kreisverkehr: false, sonderzaehlung: false },
  { title: '328408  Sendling-West', type: SUGGESTION_TYPE_ZAEHLSTELLE, zaehlart: Zaehlart.FJS, kreisverkehr: false, sonderzaehlung: false },
  { title: '4001 Berg-am-Laim', type: SUGGESTION_TYPE_MESSSTELLE, zaehlart: null,kreisverkehr: false, sonderzaehlung: false },
]);

// Formularfelder im Dialog
const dauerOptions = ["13h", "16h", "2x4"];
const dauerSelection = ref<string | null>(null);

const sonderzaehlung = ref(false);
const kreisverkehr = ref(false);

const geraetOptions = ["FJS", "QU", "QJS", "T"];
const zaehlartSelection = ref<string | null>(null);

const zaehlDatum = ref<string | null>(null);
const datePickerMenu = ref(false);
const autocompleteMenuOpen = ref(false);
const zaehlDatumRange = ref<[string | null, string | null]>([null, null]);

const jahreszeitOptions = ["Frühling", "Sommer", "Herbst", "Winter"];
const jahreszeitSelection = ref<string | null>(null);

const tagestypOptions = ["Mo/Fr", "Di-Do", "Ferien"];
const tagestypSelection = ref<string | null>(null);

// Öffnen/Schließen
function openSearchDialog() {
  // ggf. overlay/menü schließen
  // overlayOpen.value = false;
  // autocompleteMenuOpen.value = false;
  // evtl. vor Befüllung: kopiere aktuelle Filterzustände
  searchDialogOpen.value = true;
}
function closeSearchDialog() {
  searchDialogOpen.value = false;
}

// Wenn ein Vorschlag in Dialog-Liste gewählt wird
function onDialogSelect(item: any) {
  searchQuery.value = item.text ?? item;
  selectedSuggestion.value = item;
  closeSearchDialog();
  searchOrShowSelectedSuggestion();
}

// Datumsauswahl handler
function onDatePicked(value: string) {
  zaehlDatum.value = value;
  datePickerMenu.value = false;
}

// Übernehmen-Button: wende Filter an (hier ein Beispiel, je nach store-API anpassen)
function applyDialogFilters() {
  // Beispiel: setze searchAndFilterOptions entsprechend oder rufe handleAdoptSearchAndFilterOptions
  // searchAndFilterOptions.value.dauer = dauerSelection.value;
  // searchAndFilterOptions.value.sonderzaehlung = sonderzaehlung.value;
  // ...
  // Für jetzt: nur Dialog schließen und ggf. eine Suche auslösen
  closeSearchDialog();
  // falls Filteränderung -> search()
}

const route = useRoute();
const router = useRouter();
const snackbarStore = useSnackbarStore();
const searchStore = useSearchStore();
const mapOptionsStore = useMapOptionsStore();

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

const filteredSuggestions3 = computed(() => {
  if (!searchQuery3.value && !zaehlartSelection.value && !kreisverkehr.value && !sonderzaehlung.value)
    return [];
  const sug = suggestions3.value.filter((s) => {
    return s.kreisverkehr === kreisverkehr.value &&
        s.sonderzaehlung === sonderzaehlung.value &&
        (!zaehlartSelection.value || zaehlartSelection.value === s.zaehlart)
  });
  return sug;
});

const filteredSuggestions2 = computed(() => {
  // const filteredSuggestions = suggestions2.value.filter(
  //     (s) => {
  //       return s.verkehr === kreisverkehr.value;
  //     }
  // );
  const filteredSuggestions = [];
  if (searchQuery2.value === "" && !kreisverkehr.value && !zaehlartSelection.value && !dauerSelection.value && !sonderzaehlung.value)
    return [];
  if (searchQuery2.value === "" && kreisverkehr.value && !zaehlartSelection.value && !dauerSelection.value && !sonderzaehlung.value) {
    filteredSuggestions.push(new Suggest("Zählstelle Drei mit Kreisverkehr", SUGGESTION_TYPE_ZAEHLSTELLE, "14001", "1", ""));
    filteredSuggestions.push(new Suggest("Noch ein Kreisverkehr Vier", SUGGESTION_TYPE_ZAEHLSTELLE, "14003", "1", ""));
  }
  if (searchQuery2.value === "" && !kreisverkehr.value && zaehlartSelection.value === Zaehlart.QJS && !dauerSelection.value && !sonderzaehlung.value) {
    filteredSuggestions.push(new Suggest("Zählstelle Eins (QJS)", SUGGESTION_TYPE_ZAEHLSTELLE, "14002", "1", ""));
    filteredSuggestions.push(new Suggest("Zählstelle Zwei (QJS)", SUGGESTION_TYPE_ZAEHLSTELLE, "14004", "1", ""));
  }
  if (searchQuery2.value !== "" && kreisverkehr.value && !zaehlartSelection.value && !dauerSelection.value && !sonderzaehlung.value) {
    filteredSuggestions.push(new Suggest("Zählstelle "+ searchQuery2.value +" mit Kreisverkehr", SUGGESTION_TYPE_ZAEHLSTELLE, "14001", "1", ""));
  }
  if (searchQuery2.value !== "" && !kreisverkehr.value && zaehlartSelection.value === Zaehlart.QJS && !dauerSelection.value && !sonderzaehlung.value) {
    filteredSuggestions.push(new Suggest("Zählstelle " + searchQuery2.value + " (QJS)", SUGGESTION_TYPE_ZAEHLSTELLE, "14002", "1", ""));
  }
  if (searchQuery2.value !== "" && !kreisverkehr.value && !zaehlartSelection.value && !dauerSelection.value && !sonderzaehlung.value) {
    filteredSuggestions.push(new Suggest("Zählstelle " + searchQuery2.value + " (QJS)", SUGGESTION_TYPE_ZAEHLSTELLE, "14002", "1", ""));
    filteredSuggestions.push(new Suggest("Zählstelle " + searchQuery2.value + " (FJS)", SUGGESTION_TYPE_ZAEHLSTELLE, "14002", "1", ""));
    filteredSuggestions.push(new Suggest("Zählstelle " + searchQuery2.value, SUGGESTION_TYPE_MESSSTELLE, "14002", "1", ""));
  }
  return filteredSuggestions;
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

// vorhandene searchDialogOpen watchen und Fokus setzen
watch(
    () => searchDialogOpen.value,
    (open) => {
      if (open) {
        // nextTick stellt sicher, dass das Autocomplete gerendert ist
        nextTick(() => {
          // bevorzugt: Aufruf der Komponentenmethode focus()
          if (autocompleteRef.value?.focus) {
            autocompleteRef.value.focus();
            return;
          }
          // Fallback: direkt das native input fokussieren
          const inputEl =
              autocompleteRef.value?.$el?.querySelector?.("input") ??
              autocompleteRef.value?.$el?.querySelector?.("input");
          if (inputEl) {
            inputEl.focus();
            // optional: kursorsetztung ans Ende
            const len = inputEl.value?.length ?? 0;
            try {
              inputEl.setSelectionRange(len, len);
            } catch (e) {
              // ignore falls nicht unterstützt
            }
          }
        });
      }
    }
);

// fokus: watch auf selection, schließe Dialog und verarbeite Auswahl
watch(
    () => selectedSuggestion.value,
    (newVal, oldVal) => {
      // nur reagieren, wenn wirklich eine Auswahl gesetzt wurde
      if (newVal && newVal !== oldVal) {
        closeSearchDialog();
        // falls du die gleiche Logik wie bei Klick willst:
        searchOrShowSelectedSuggestion();
      }
    }
);

// onMounted(() => {
//   suggestions2.value.push({name: "Zählstelle Pasing", type: Erhebungsstelle.ZAEHLSTELLE, zaehlstelleId: "14000", kreisverkehr: false, sondernzaehlung: false, zaehlart: Zaehlart.QJS});
//   suggestions2.value.push({name: "Zählstelle Lehel", type: Erhebungsstelle.ZAEHLSTELLE, zaehlstelleId: "14001", kreisverkehr: false, sondernzaehlung: false, zaehlart: Zaehlart.QJS});
//   suggestions2.value.push({name: "Zählstelle Schwabing", type: Erhebungsstelle.ZAEHLSTELLE, zaehlstelleId: "14002", kreisverkehr: false, sondernzaehlung: false, zaehlart: Zaehlart.QJS});
// });


watch(
    () => searchDialogOpen.value,
    (open) => {
      if (open) {
        // nextTick, damit das Autocomplete/DOM gemountet ist
        nextTick(() => {
          autocompleteMenuOpen.value = true;
        });
      } else {
        // optional: Menü beim Schließen des Dialogs schließen
        autocompleteMenuOpen.value = false;
      }
    }
);

// optional: falls Vuetify versucht, das Menü zu schließen, wieder öffnen
function onAutocompleteMenuUpdate(val: boolean) {
  // Wenn Du wirklich immer offen bleiben willst, zwinge es wieder auf true.
  // Wenn nur während des Dialogs offen sein soll, prüfe searchDialogOpen:
  if (searchDialogOpen.value) {
    // Erzwinge offen (verhindert z. B. Schließen durch Blur)
    if (!val) {
      nextTick(() => (autocompleteMenuOpen.value = true));
    }
  } else {
    // außerhalb des Dialogs normales Verhalten erlauben
    autocompleteMenuOpen.value = val;
  }
}

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

// Handler, wenn Datum/Range im Picker geändert wird
function onDateRangePicked(value: [string | null, string | null]) {
  zaehlDatumRange.value = value;
  // falls Du möchtest, das Menü nach Auswahl schließt:
  // datePickerMenu.value = false;

  // optional: wenn Du die Werte in Such-/Filter-DTO übertragen willst:
  // searchAndFilterOptions.value.zaehlDatumVon = value[0];
  // searchAndFilterOptions.value.zaehlDatumBis = value[1];
}

// Clear-Funktion für das Textfeld
function clearZaehldatumRange() {
  zaehlDatumRange.value = [null, null];
  // Bei Bedarf auch die DTO-Felder zurücksetzen:
  // searchAndFilterOptions.value.zaehlDatumVon = null;
  // searchAndFilterOptions.value.zaehlDatumBis = null;
}

// Hilfsfunktion: erstelle drei Beispielsuggestions, ggf. anhand der Query
function buildKreisverkehrSuggestions(query: string): Array<Suggest> {
  const base = query ? query.trim() : "Kreisverkehr";
  return [
    new Suggest(`${base} - Zufahrt`, SUGGESTION_TYPE_VORSCHLAG, "", "", ""),
    new Suggest(`${base} - Innenring`, SUGGESTION_TYPE_VORSCHLAG, "", "", ""),
    new Suggest(`${base} - Außenring`, SUGGESTION_TYPE_VORSCHLAG, "", "", ""),
  ];
}

// Angepasste suggest-Funktion: nutze lokale Vorschläge, wenn kreisverkehr aktiviert ist
function suggest(query: string) {
  // Wenn kreisverkehr aktiv: sofort drei Treffer liefern, kein API-Call
  if (kreisverkehr.value) {
    // Optional: setze auch lastSuggestQuery, damit das Verhalten konsistent bleibt
    lastSuggestQuery.value = query ?? "";
    // Erstelle die drei Vorschläge (ggf. basierend auf query)
    suggestions.value = buildKreisverkehrSuggestions(query);
    // ggf. eine Such-Option (SearchText) an den Anfang setzen, wie zuvor
    suggestions.value.unshift(
        new Suggest(query, SUGGESTION_TYPE_SEARCH_TEXT, "", "", "")
    );
    return;
  }

  // ursprüngliches Verhalten, wenn kreisverkehr nicht aktiv ist
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

// fokus: watch auf selection, schließe Dialog und verarbeite Auswahl
// watch(
//     () => zaehlartSelection.value,
//     (newVal, oldVal) => {
//       // nur reagieren, wenn wirklich eine Auswahl gesetzt wurde
//       if (newVal === 'FJS')
//         suggestions.value = [
//           new Suggest(`Eine FJS-Zählung`, SUGGESTION_TYPE_VORSCHLAG, "", "", ""),
//           new Suggest(`Noch eine`, SUGGESTION_TYPE_VORSCHLAG, "", "", ""),
//         ];
//     }
// );


// Optional: watch auf kreisverkehr, damit die Trefferliste sofort aktualisiert wird,
// auch wenn gerade keine neue Eingabe gemacht wurde.
// watch(
//     () => kreisverkehr.value,
//     (isChecked) => {
//       // wenn aktiviert: erzeuge Treffer basierend auf aktueller Suche
//       if (isChecked) {
//         suggestions.value = buildKreisverkehrSuggestions(searchQuery.value);
//         suggestions.value.unshift(
//             new Suggest(searchQuery.value, SUGGESTION_TYPE_SEARCH_TEXT, "", "", "")
//         );
//         // falls Autocomplete-Menü manuell gesteuert wird: open it
//         if (typeof autocompleteMenuOpen !== "undefined") {
//           autocompleteMenuOpen.value = true;
//         }
//       } else {
//         // Wenn deaktiviert: lösche die statischen Ergebnisse oder re-suggesten
//         suggestions.value = [];
//         // optional: rufe suggest(searchQuery.value) um die API-Vorschläge wiederherzustellen
//         if (searchQuery.value) {
//           suggest(searchQuery.value);
//         }
//       }
//     }
// );



function onUpdateSearch(val: string) {
  console.log("onUpdateSearch")
  return;
  // Beispiel-Policy: nur setzen, wenn das Autocomplete-Menü offen ist
  // if (autocompleteMenuOpen.value) {
  //   searchQuery.value = val;
  //   suggest(val);
  //   return;
  // }

  // oder: nur setzen, wenn val nicht leer ist
  if (val !== "") {
    searchQuery2.value = val;
    suggest(val);
  }
  // sonst: ignore (verhindert das Leeren beim Blur)
}

// Neuer Clear-Handler: entfernt nur die Auswahl, löscht nicht die Query
function onClearAutocomplete() {
  selectedSuggestion.value = undefined;   // Auswahl zurücksetzen
  // searchQuery3.value beibehalten — damit das Eingabefeld erhalten bleibt
  autocompleteMenuOpen.value = true;      // Menü offen lassen
}

watch(searchQuery3, (val, oldVal) => {
  console.debug("searchQuery3 changed:", { oldVal, val });
});
watch(kreisverkehr, (v) => {
  console.debug("kreisverkehr toggled:", v);
});

function isAutocompleteInputFocused(): boolean {
  try {
    const inputEl =
        autocompleteRef.value?.$el?.querySelector?.("input") ??
        autocompleteRef.value?.$el?.querySelector?.("input");
    return !!inputEl && inputEl === document.activeElement;
  } catch (e) {
    return false;
  }
}

function onUpdateSearch3(val: string) {
  // Ignoriere leere Updates, die typischerweise beim Blur / Schließen / items-Update kommen,
  // sofern das Eingabefeld nicht aktiv/fokussiert ist.
  if (val === "") {
    console.debug("update:search('') erhalten — focused:", isAutocompleteInputFocused(), "menuOpen:", autocompleteMenuOpen.value);
    console.trace();
    // Wenn Menü offen ist, darf das leere Update möglicherweise relevant sein (z. B. echte Löschung).
    // Wir akzeptieren das leere Update nur, wenn das Eingabefeld fokussiert ist oder das Menü offen ist.
    if (!autocompleteMenuOpen.value && !isAutocompleteInputFocused()) {
      // Ignoriere das leere Update
      console.debug("Ignoriere update:search(\"\") weil Menü geschlossen und Input nicht fokussiert.");
      return;
    }
    return;
  }

  // Setze die Ref korrekt
  searchQuery3.value = val;

  // Falls Du bei jeder Änderung Vorschläge erzeugen willst:
  // suggest(searchQuery3.value);
}

// Hilfsfunktion: Input-Element des Autocomplete sicher finden
function getAutocompleteInputEl(): HTMLInputElement | null {
  try {
    // autocompleteRef kann entweder die Komponente oder deren $el sein
    const compEl = autocompleteRef.value?.$el ?? autocompleteRef.value;
    const input = compEl?.querySelector?.("input");
    return input ?? null;
  } catch (e) {
    return null;
  }
}

// Funktion, die das Input sichtbar mit dem aktuellen Suchtext setzt
function restoreAutocompleteInputValue() {
  const input = getAutocompleteInputEl();
  if (!input) return;
  const val = (searchQuery3 && typeof searchQuery3 === "object" ? searchQuery3.value : searchQuery3) ?? "";
  try {
    input.value = val;
    // optional: cursor ans Ende setzen
    const len = (val?.length ?? 0);
    input.setSelectionRange(len, len);
  } catch (e) {
    // ignore (z. B. wenn setSelectionRange nicht unterstützt)
  }
}

// Handler für Fokusänderungen: bei Blur das Input mehrfach wiederherstellen
function onAutocompleteFocused(focused: boolean) {
  if (!focused) {
    // Sofort versuchen
    restoreAutocompleteInputValue();
    // nextTick und rAF + timeout, um asynchrone Re-renders zu überdecken
    nextTick(() => restoreAutocompleteInputValue());
    requestAnimationFrame(() => restoreAutocompleteInputValue());
    setTimeout(() => restoreAutocompleteInputValue(), 0);
    // evtl. ein weiterer Timeout falls Vuetify noch später schreibt
    setTimeout(() => restoreAutocompleteInputValue(), 50);
  }
}

</script>
