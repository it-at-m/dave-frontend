<script setup lang="ts">
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";

import { computed } from "vue";

interface Props {
  messstelle: MessstelleInfoDTO;
}

const props = defineProps<Props>();

const doMesssquerschnitteExist = computed(() => {
  return props.messstelle.messquerschnitte.length > 0;
});
</script>

<template>
  <v-container
    class="py-2 px-4"
    fluid
  >
    <v-sheet
      v-if="!doMesssquerschnitteExist"
      id="empty"
      class="d-flex align-center justify-center"
      color="transparent"
    >
      <h4 class="text-caption font-weight-bold">
        Für diese Messstelle sind keine weiteren Messquerschnitte vorhanden.
      </h4>
    </v-sheet>
    <v-sheet
      v-else
      color="transparent"
    >
      <h4 v-if="props.messstelle.messquerschnitte.length > 1">
        Informationen zu Messquerschnitten
      </h4>
      <h4 v-else>Informationen zum Messquerschnitt</h4>
    </v-sheet>
  </v-container>
</template>
