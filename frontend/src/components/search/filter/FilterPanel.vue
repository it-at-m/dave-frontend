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
    <v-expansion-panel-text>
      <date-range-picker
        v-model="searchAndFilterOptions.zeitraum"
        :is-search-filter="true"
      />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import type SearchAndFilterOptionsDTO from "@/types/suche/SearchAndFilterOptionsDTO";

import DateRangePicker from "@/components/common/DateRangePicker.vue";

const searchAndFilterOptions = defineModel<SearchAndFilterOptionsDTO>({
  required: true,
});
</script>
