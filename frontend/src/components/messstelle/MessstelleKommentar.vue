<template>
  <div v-if="kommentar">
    <v-btn
      v-tooltip:bottom="'Kommentar anzeigen'"
      color="secondary"
      icon="mdi-comment-text"
      size="small"
      height="20px"
      class="ml-n2 mb-1"
      variant="text"
      @click="showDialog = true"
    />
    <v-dialog
      v-model="showDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title class="bg-grey-lighten-2">
          <v-icon
            start
            size="small"
            color="grey-darken-2"
            icon="mdi-comment-multiple"
          />
          <span style="font-size: x-large">Informationen</span>
        </v-card-title>
        <v-card-text>
          <div
            class="text-grey-darken-2"
            style="font-size: small"
          >
            {{ kommentar }}
          </div>
        </v-card-text>

        <v-card-actions class="bg-grey-lighten-4">
          <v-spacer />
          <v-btn
            class="text-none bg-grey-lighten-1"
            text="Schließen"
            @click="showDialog = false"
          />
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  kommentar?: string;
}

defineProps<Props>();

const showDialog = ref(false);
</script>
