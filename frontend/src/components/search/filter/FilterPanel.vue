<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div>
        <v-icon
          start
          icon="mdi-filter-outline"
        />
        Filtereinstellungen
      </div>
    </v-expansion-panel-title>
    <filter-messstelle-panel v-model="searchAndFilterOptions" />
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import type SearchAndFilterOptionsDTO from "@/types/suche/SearchAndFilterOptionsDTO";

import FilterMessstellePanel from "@/components/search/filter/FilterMessstellePanel.vue";

const searchAndFilterOptions = defineModel<SearchAndFilterOptionsDTO>({
  required: true,
});
</script>
