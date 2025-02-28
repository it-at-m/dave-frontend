<template>
  <v-card flat>
    <v-card-title>
      <v-icon start>mdi-filter-outline</v-icon>
      Sucheinstellungen
    </v-card-title>

    <v-card-text>
      <v-sheet
        width="100%"
        class="overflow-y-auto"
        :max-height="getContentSheetHeight"
      >
        <v-expansion-panels
          v-model="panels"
          variant="accordion"
        >
          <search-panel v-model="searchAndFilterOptions" />
        </v-expansion-panels>
      </v-sheet>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="secondary"
        style="width: 200px"
        variant="flat"
        @click="adoptSearchAndFilterOptions"
      >
        Übernehmen
      </v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        style="width: 200px"
        variant="flat"
        @click="resetSearchAndFilterOptions"
      >
        Zurücksetzen
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type SearchAndFilterOptionsDTO from "@/types/suche/SearchAndFilterOptionsDTO";

import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

import SearchPanel from "@/components/search/filter/SearchPanel.vue";

interface Emits {
  (event: "adopt-search-and-filter-options", value: void): void;
  (event: "reset-search-and-filter-options", value: void): void;
}

const { xl } = useDisplay();
/**
 * Der default Panel welcher beim Öffnen der Such- und Filtereinstellungen aufgeklappt ist.
 */
const panels = ref<Array<number>>([0]);
const emit = defineEmits<Emits>();

const searchAndFilterOptions = defineModel<SearchAndFilterOptionsDTO>({
  required: true,
});

const getContentSheetHeight = computed(() => {
  if (xl.value) {
    return "650px";
  }
  return "400px";
});

function adoptSearchAndFilterOptions(): void {
  emit("adopt-search-and-filter-options");
}

function resetSearchAndFilterOptions(): void {
  emit("reset-search-and-filter-options");
}
</script>
