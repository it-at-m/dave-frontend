<template>
  <span v-if="kommentar">
    <v-tooltip location="bottom">
      <template #activator="{ props }">
        <v-btn
          color="secondary"
          icon
          height="20px"
          class="ml-n2"
          v-bind="props"
          @click="showDialog = true"
        >
          <v-icon size="small">mdi-comment-text</v-icon>
        </v-btn>
      </template>
      <span>Kommentar anzeigen</span>
    </v-tooltip>
    <v-dialog
      v-model="showDialog"
      max-width="600px"
    >
      <v-card class="rounded-0">
        <v-card-title class="text-h5 bg-grey-lighten-2">
          <v-icon start>mdi-comment-multiple</v-icon>
          Informationen
        </v-card-title>
        <br />
        <v-card-text> {{ kommentar }} </v-card-text>
      </v-card>

      <v-footer>
        <v-spacer></v-spacer>
        <v-btn
          color="grey-lighten-1"
          @click="showDialog = false"
        >
          Schließen
        </v-btn>
        <v-spacer></v-spacer>
      </v-footer>
    </v-dialog>
  </span>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  kommentar?: string;
}

defineProps<Props>();

const showDialog = ref(false);
</script>
