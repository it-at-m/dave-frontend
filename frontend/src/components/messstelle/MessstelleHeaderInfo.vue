<template>
  <v-sheet
    width="100%"
    color="transparent"
    class="pa-4"
    :min-height="minheight"
    :height="height"
  >
    <span class="text-caption">
      Messstelle
      <v-tooltip
        :text="lageplanVorhanden ? 'Lageplan' : 'Kein Lageplan vorhanden'"
      >
        <template #activator="{ props }">
          <span v-bind="props">
            <v-btn :disabled="!lageplanVorhanden" class="ma-0 pa-0"
                   color="secondary"
                   min-width="0"
                   variant="text"
                   @click="loadLageplan">
              <template v-slot:default>
                <v-icon size="x-large">mdi-map</v-icon>
              </template>
            </v-btn>
          </span>
        </template>
      </v-tooltip>
    </span>
    <br />
    <span class="text-h5">{{ mstId }}</span>
    <br />
    <span class="text-caption">{{ standort }} </span>
    <br />
    <span class="text-caption"
      >Stadtbezirk {{ stadtbezirkNummer }}, {{ stadtbezirk }}
    </span>
  </v-sheet>
</template>
<script setup lang="ts">
import type LageplanDTO from "@/types/messstelle/lageplan/LageplanDTO";

import { ref } from "vue";

import LageplanService from "@/api/service/LageplanService";
import { useSnackbarStore } from "@/store/SnackbarStore";

interface Props {
  mstId: string;
  stadtbezirkNummer: number;
  stadtbezirk: string;
  standort?: string;
  height: string;
  minheight: string;
  lageplanVorhanden: boolean;
}

const props = defineProps<Props>();
const snackbarStore = useSnackbarStore();
const lageplanLoading = ref(false);

function loadLageplan() {
  lageplanLoading.value = true;
  LageplanService.loadLageplan(props.mstId)
    .then((result: LageplanDTO) => {
      window.open(result.url);
    })
    .catch((error) => {
      snackbarStore.showApiError(error);
    })
    .finally(() => {
      lageplanLoading.value = false;
    });
}
</script>
