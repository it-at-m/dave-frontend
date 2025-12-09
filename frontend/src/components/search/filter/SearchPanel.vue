<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div>
        <v-icon
          start
          icon="mdi-magnify"
        />
        Sucheinstellungen
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10 0 0 0"
        header-text="Welche Erhebungsstellen sollen durchsucht werden?"
      />
      <v-row
        align="start"
        justify="center"
        dense
        no-gutters
      >
        <v-col cols="4">
          <v-checkbox
            v-model="searchAndFilterOptions.searchInMessstellen"
            :label="'Messstellen'"
            hide-details
            color="quaternary"
            density="compact"
          />
        </v-col>
        <v-col cols="4">
          <v-checkbox
            v-model="searchAndFilterOptions.searchInZaehlstellen"
            :label="'Zählstellen'"
            hide-details
            color="quaternary"
            density="compact"
          />
        </v-col>
        <v-spacer />
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import type SearchAndFilterOptionsDTO from "@/types/suche/SearchAndFilterOptionsDTO";

import PanelHeader from "@/components/common/PanelHeader.vue";

const searchAndFilterOptions = defineModel<SearchAndFilterOptionsDTO>({
  required: true,
});
</script>
