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
            <v-autocomplete
                ref="autocompleteRef"
                id="suchfeld"
                v-model="selectedSuggestion"
                v-model:search="searchQuery"
                v-model:menu="autocompleteMenuOpen"
            :menu-props="{ closeOnContentClick: false }"
            @update:menu="onAutocompleteMenuUpdate"
            :items="suggestions"
                density="compact"
                clearable
                flat
                item-title="text"
                hide-details
                placeholder="Suche"
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
                  <template #activator="{ props }">
                    <v-btn
                        v-bind="props"
                        density="compact"
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
          * Messstellennummer / -name (4000,...)<br />
        </span>
                </v-tooltip>
              </template>
            </v-autocomplete>

          </VCol>

          <VDivider vertical class="mx-3" style="align-self: stretch;" />

          <!-- Rechte Spalte: Filter/Steuerung -->
          <VCol cols="5">
            <VForm>
              <VRow dense>
                <VCol cols="6">
                  <VSelect
                      label="Zählart"
                      :items="geraetOptions"
                      v-model="geraetSelection"
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
import { computed, ref, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

import SucheService from "@/api/service/SucheService";
import { useMapOptionsStore } from "@/store/MapOptionsStore";
import { useSearchStore } from "@/store/SearchStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import Suggest from "@/types/suche/Suggest";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

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
const searchAndFilterDialogOpen = ref(false);
const searchAndFilterOptions = ref(
  DefaultObjectCreator.createDefaultSearchAndFilterOptionsDTO()
);
const searchDialogOpen = ref(false);
const autocompleteRef = ref<any>(null);

// Formularfelder im Dialog
const dauerOptions = ["13h", "16h", "2x4"];
const dauerSelection = ref<string | null>(null);

const sonderzaehlung = ref(false);
const kreisverkehr = ref(false);

const geraetOptions = ["FJS", "QU", "QJS", "T"];
const geraetSelection = ref<string | null>(null);

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

// Optional: watch auf kreisverkehr, damit die Trefferliste sofort aktualisiert wird,
// auch wenn gerade keine neue Eingabe gemacht wurde.
watch(
    () => kreisverkehr.value,
    (isChecked) => {
      // wenn aktiviert: erzeuge Treffer basierend auf aktueller Suche
      if (isChecked) {
        suggestions.value = buildKreisverkehrSuggestions(searchQuery.value);
        suggestions.value.unshift(
            new Suggest(searchQuery.value, SUGGESTION_TYPE_SEARCH_TEXT, "", "", "")
        );
        // falls Autocomplete-Menü manuell gesteuert wird: open it
        if (typeof autocompleteMenuOpen !== "undefined") {
          autocompleteMenuOpen.value = true;
        }
      } else {
        // Wenn deaktiviert: lösche die statischen Ergebnisse oder re-suggesten
        suggestions.value = [];
        // optional: rufe suggest(searchQuery.value) um die API-Vorschläge wiederherzustellen
        if (searchQuery.value) {
          suggest(searchQuery.value);
        }
      }
    }
);
</script>
