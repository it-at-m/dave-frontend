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
          v-model="searchAndFilterOptions.verkehrsart"
          multiple
          :items="selectableVerkehrsarten"
          density="compact"
        />
      </v-col>
      <v-spacer />
    </v-row>
  </v-expansion-panel-text>
</template>

<script lang="ts" setup>
import type SearchAndFilterOptionsDTO from "@/types/suche/SearchAndFilterOptionsDTO";

import { computed } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import Verkehrsart from "@/types/enum/Verkehrsart";

const searchAndFilterOptions = defineModel<SearchAndFilterOptionsDTO>({
  required: true,
});

const selectableVerkehrsarten = computed<Array<unknown>>(() => {
  const result: Array<unknown> = [];
  result.push({
    title: `Kfz`,
    value: Verkehrsart.KFZ,
  });
  result.push({
    title: `Rad`,
    value: Verkehrsart.RAD,
  });
  return result;
});
</script>
