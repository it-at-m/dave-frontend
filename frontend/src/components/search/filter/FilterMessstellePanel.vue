<template>
  <v-expansion-panel-text>
    <panel-header
      font-size="0.875rem"
      font-weight="bold"
      header-text="Messstellen"
    />
    <panel-header
      font-size="small"
      font-weight="normal"
      header-text="Welche Verkehrsarten sollen durchsucht werden?"
    />
    <v-row
      align="start"
      justify="center"
      dense
      no-gutters
    >
      <v-col cols="6">
        <v-autocomplete
          v-model="searchAndFilterOptions.messstelleVerkehrsart"
          multiple
          :items="selectableVerkehrsarten"
          density="compact"
          chips
          closable-chips
        />
      </v-col>
      <v-spacer />
    </v-row>
  </v-expansion-panel-text>
</template>

<script lang="ts" setup>
import type { SearchAndFilterOptionsDTO } from "@/api/client";

import { computed } from "vue";

import { Verkehrsart } from "@/api/client";
import PanelHeader from "@/components/common/PanelHeader.vue";

const searchAndFilterOptions = defineModel<SearchAndFilterOptionsDTO>({
  required: true,
});

const selectableVerkehrsarten = computed<Array<unknown>>(() => {
  const result: Array<unknown> = [];
  result.push({
    title: `Kfz`,
    value: Verkehrsart.Kfz,
  });
  result.push({
    title: `Rad`,
    value: Verkehrsart.Rad,
  });
  return result;
});
</script>
