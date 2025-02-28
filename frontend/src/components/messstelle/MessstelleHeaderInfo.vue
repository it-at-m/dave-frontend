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
        <template v-slot:activator="{ props }">
          <span v-bind="props">
            <v-btn
              icon="mdi-map-outline"
              variant="plain"
              :disabled="!lageplanVorhanden"
              @click="loadLageplan"
            ></v-btn>
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
